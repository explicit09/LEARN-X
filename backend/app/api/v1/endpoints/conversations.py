from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
import os
from datetime import datetime
import json
import openai
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores.pgvector import PGVector
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.llms import OpenAI

from ....database.session import get_db
from ....models.user import User
from ....models.document import Document, DocumentChunk
from ....models.conversation import Conversation, Message
from .auth import get_current_active_user

router = APIRouter()

# LLM Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")
LEARNING_STYLES = ["visual", "textual", "example"]
COMPLEXITY_LEVELS = ["beginner", "intermediate", "advanced"]
TONE_STYLES = ["casual", "neutral", "formal"]


# Helper functions
def format_user_query(query: str, learning_style: str, complexity: str, tone: str) -> str:
    """Format the user query with learning preferences"""
    # Base prompt with learning style preferences
    style_map = {
        "visual": "Use visual descriptions and spatial analogies.",
        "textual": "Provide clear textual explanations with precise definitions.",
        "example": "Use practical examples and walk through concrete instances."
    }
    
    complexity_map = {
        "beginner": "Explain at a beginner level, assuming minimal prior knowledge.",
        "intermediate": "Explain at an intermediate level, balancing detail and simplicity.",
        "advanced": "Provide advanced explanations with full technical detail."
    }
    
    tone_map = {
        "casual": "Use a friendly, conversational tone.",
        "neutral": "Use a balanced, neutral tone.",
        "formal": "Use a formal, academic tone."
    }
    
    style_instruction = style_map.get(learning_style, style_map["textual"])
    complexity_instruction = complexity_map.get(complexity, complexity_map["intermediate"])
    tone_instruction = tone_map.get(tone, tone_map["neutral"])
    
    formatted_query = f"{query}\n\nAnswer based on the following preferences:\n- {style_instruction}\n- {complexity_instruction}\n- {tone_instruction}\n\nIf the answer is in the document, cite the specific page numbers, sections, or paragraphs where the information was found."
    
    return formatted_query


def setup_qa_system(document_id: int, db: Session):
    """Set up the QA system for a specific document"""
    # Get document chunks from database
    chunks = db.query(DocumentChunk).filter(DocumentChunk.document_id == document_id).all()
    
    if not chunks:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No chunks found for this document"
        )
    
    # Initialize OpenAI embeddings
    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    
    # Create a vector store with the document chunks
    connection_string = DATABASE_URL
    collection_name = f"document_{document_id}"
    
    # Check if vector store already exists
    try:
        # Try to load existing vector store
        vector_store = PGVector(
            collection_name=collection_name,
            connection_string=connection_string,
            embedding_function=embeddings
        )
    except Exception as e:
        # Create a new vector store if it doesn't exist
        texts = [chunk.content for chunk in chunks]
        metadatas = [{
            "page": chunk.page_number,
            "chunk_index": chunk.chunk_index,
            "document_id": document_id
        } for chunk in chunks]
        
        vector_store = PGVector.from_texts(
            texts=texts,
            metadatas=metadatas,
            embedding=embeddings,
            collection_name=collection_name,
            connection_string=connection_string
        )
    
    # Create conversation memory
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )
    
    # Create QA chain
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=OpenAI(temperature=0, openai_api_key=OPENAI_API_KEY),
        retriever=vector_store.as_retriever(search_kwargs={"k": 3}),
        memory=memory,
        return_source_documents=True
    )
    
    return qa_chain


# Endpoints
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_conversation(
    document_id: int,
    title: Optional[str] = None,
    preferences: Optional[Dict[str, Any]] = Body(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new conversation"""
    # Verify that the document exists and belongs to the user
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Create default preferences if none provided
    if not preferences:
        preferences = {
            "learning_style": "textual",
            "complexity": "intermediate",
            "tone": "neutral",
            "follow_up_questions": True
        }
    
    # Create conversation record
    conversation = Conversation(
        title=title or f"Conversation about {document.title}",
        user_id=current_user.id,
        document_id=document_id,
        preferences=preferences
    )
    
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    
    return {
        "id": conversation.id,
        "title": conversation.title,
        "created_at": conversation.created_at,
        "document": {
            "id": document.id,
            "title": document.title
        },
        "preferences": conversation.preferences
    }


@router.get("/")
async def get_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all conversations for the current user"""
    conversations = db.query(Conversation).filter(
        Conversation.user_id == current_user.id
    ).order_by(Conversation.created_at.desc()).all()
    
    result = []
    for conv in conversations:
        document = None
        if conv.document_id:
            doc = db.query(Document).filter(Document.id == conv.document_id).first()
            if doc:
                document = {
                    "id": doc.id,
                    "title": doc.title
                }
        
        # Count messages
        message_count = db.query(Message).filter(Message.conversation_id == conv.id).count()
        
        result.append({
            "id": conv.id,
            "title": conv.title,
            "created_at": conv.created_at,
            "document": document,
            "message_count": message_count,
            "preferences": conv.preferences
        })
    
    return result


@router.get("/{conversation_id}")
async def get_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get a specific conversation with all messages"""
    conversation = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first()
    
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )
    
    # Get document info if it exists
    document = None
    if conversation.document_id:
        doc = db.query(Document).filter(Document.id == conversation.document_id).first()
        if doc:
            document = {
                "id": doc.id,
                "title": doc.title
            }
    
    # Get all messages for this conversation
    messages = db.query(Message).filter(
        Message.conversation_id == conversation_id
    ).order_by(Message.created_at).all()
    
    message_list = [{
        "id": msg.id,
        "content": msg.content,
        "role": msg.role,
        "created_at": msg.created_at,
        "citations": msg.citations
    } for msg in messages]
    
    return {
        "id": conversation.id,
        "title": conversation.title,
        "created_at": conversation.created_at,
        "document": document,
        "messages": message_list,
        "preferences": conversation.preferences
    }


@router.post("/{conversation_id}/message")
async def create_message(
    conversation_id: int,
    content: str = Body(..., embed=True),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Add a message to a conversation and get AI response"""
    # Verify conversation exists and belongs to user
    conversation = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first()
    
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )
    
    # Get document
    if not conversation.document_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This conversation is not associated with a document"
        )
    
    # Get preferences
    preferences = conversation.preferences or {}
    learning_style = preferences.get("learning_style", "textual")
    complexity = preferences.get("complexity", "intermediate")
    tone = preferences.get("tone", "neutral")
    
    # Format user query with preferences
    formatted_query = format_user_query(content, learning_style, complexity, tone)
    
    # Add user message to database
    user_message = Message(
        content=content,
        role="user",
        conversation_id=conversation_id,
        citations=None
    )
    db.add(user_message)
    db.commit()
    db.refresh(user_message)
    
    # Set up QA system
    try:
        qa_chain = setup_qa_system(conversation.document_id, db)
    except Exception as e:
        db.delete(user_message)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error setting up QA system: {str(e)}"
        )
    
    # Get previous messages for context (excluding the one just added)
    previous_messages = db.query(Message).filter(
        Message.conversation_id == conversation_id,
        Message.id != user_message.id
    ).order_by(Message.created_at).all()
    
    # Prepare chat history for QA chain
    chat_history = []
    for msg in previous_messages:
        if msg.role == "user":
            chat_history.append((msg.content, ""))
    
    # Get AI response
    try:
        response = qa_chain({"question": formatted_query, "chat_history": chat_history})
        answer = response["answer"]
        source_docs = response.get("source_documents", [])
        
        # Extract citations
        citations = []
        if source_docs:
            for i, doc in enumerate(source_docs):
                metadata = doc.metadata if hasattr(doc, "metadata") else {}
                page = metadata.get("page", "Unknown")
                citations.append({
                    "page": page,
                    "text": doc.page_content[:100] + "..."
                })
        
        # Add AI response to database
        ai_message = Message(
            content=answer,
            role="assistant",
            conversation_id=conversation_id,
            citations=citations
        )
        db.add(ai_message)
        db.commit()
        db.refresh(ai_message)
        
        return {
            "id": ai_message.id,
            "content": ai_message.content,
            "role": ai_message.role,
            "created_at": ai_message.created_at,
            "citations": ai_message.citations
        }
        
    except Exception as e:
        # If an error occurs, delete the user message to maintain conversation integrity
        db.delete(user_message)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error getting AI response: {str(e)}"
        )


@router.put("/{conversation_id}/preferences")
async def update_preferences(
    conversation_id: int,
    preferences: Dict[str, Any] = Body(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update conversation preferences"""
    conversation = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first()
    
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )
    
    # Validate preferences
    if "learning_style" in preferences and preferences["learning_style"] not in LEARNING_STYLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid learning style. Must be one of: {LEARNING_STYLES}"
        )
    
    if "complexity" in preferences and preferences["complexity"] not in COMPLEXITY_LEVELS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid complexity level. Must be one of: {COMPLEXITY_LEVELS}"
        )
    
    if "tone" in preferences and preferences["tone"] not in TONE_STYLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid tone style. Must be one of: {TONE_STYLES}"
        )
    
    # Update preferences
    current_prefs = conversation.preferences or {}
    current_prefs.update(preferences)
    conversation.preferences = current_prefs
    
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    
    return {
        "id": conversation.id,
        "preferences": conversation.preferences
    }


@router.delete("/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a conversation"""
    conversation = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first()
    
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )
    
    # Delete all messages first
    db.query(Message).filter(Message.conversation_id == conversation_id).delete()
    
    # Delete conversation
    db.delete(conversation)
    db.commit()
    
    return None
