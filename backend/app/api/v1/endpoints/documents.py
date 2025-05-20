from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
import tempfile
import pdfplumber
import magic
from datetime import datetime

from ....database.session import get_db
from ....models.user import User
from ....models.document import Document, DocumentChunk
from .auth import get_current_active_user

router = APIRouter()

# Configuration
UPLOAD_DIR = os.path.join(os.getcwd(), "uploads")
MAX_UPLOAD_SIZE = int(os.getenv("MAX_UPLOAD_SIZE", "10")) * 1024 * 1024  # Default 10MB

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)


# Helper functions
def validate_pdf(file_path: str) -> bool:
    """Validate if file is a PDF"""
    mime = magic.Magic(mime=True)
    file_type = mime.from_file(file_path)
    return file_type == "application/pdf"


def extract_text_from_pdf(file_path: str) -> List[str]:
    """Extract text from PDF, return list of pages"""
    pages = []
    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text() or ""
                pages.append(text)
    except Exception as e:
        print(f"Error extracting text: {e}")
        pages = []
    return pages


def chunk_text(text_pages: List[str], chunk_size: int = 1000, overlap: int = 200) -> List[dict]:
    """Chunk text into smaller pieces with page tracking"""
    chunks = []
    for page_num, page_text in enumerate(text_pages):
        if not page_text.strip():
            continue
        
        # Split text into chunks
        words = page_text.split()
        for i in range(0, len(words), chunk_size - overlap):
            chunk_words = words[i:i + chunk_size]
            if chunk_words:
                chunks.append({
                    "content": " ".join(chunk_words),
                    "page_number": page_num + 1,  # 1-based page numbering
                    "chunk_index": len(chunks)
                })
    return chunks


# Endpoints
@router.post("/", status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile = File(...),
    title: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Upload a PDF document"""
    # Validate file size
    if file.size and file.size > MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large. Maximum size is {MAX_UPLOAD_SIZE // (1024 * 1024)}MB"
        )
    
    # Create user upload directory if it doesn't exist
    user_upload_dir = os.path.join(UPLOAD_DIR, str(current_user.id))
    os.makedirs(user_upload_dir, exist_ok=True)
    
    # Generate a unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"{timestamp}_{file.filename}"
    file_path = os.path.join(user_upload_dir, file_name)
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Validate if the file is a PDF
    if not validate_pdf(file_path):
        os.remove(file_path)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is not a PDF"
        )
    
    # Extract file information
    file_size = os.path.getsize(file_path)
    document_title = title or file.filename
    
    # Extract text and get page count
    text_pages = extract_text_from_pdf(file_path)
    page_count = len(text_pages)
    
    # Create document record
    db_document = Document(
        title=document_title,
        file_path=file_path,
        file_size=file_size,
        page_count=page_count,
        user_id=current_user.id
    )
    
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    # Process text into chunks for vector database
    chunk_size = int(os.getenv("CHUNK_SIZE", "1000"))
    chunk_overlap = int(os.getenv("CHUNK_OVERLAP", "200"))
    text_chunks = chunk_text(text_pages, chunk_size, chunk_overlap)
    
    # Store chunks in database
    for chunk_data in text_chunks:
        db_chunk = DocumentChunk(
            content=chunk_data["content"],
            page_number=chunk_data["page_number"],
            chunk_index=chunk_data["chunk_index"],
            document_id=db_document.id
        )
        db.add(db_chunk)
    
    db.commit()
    
    return {
        "id": db_document.id,
        "title": db_document.title,
        "file_size": db_document.file_size,
        "page_count": db_document.page_count,
        "chunk_count": len(text_chunks),
        "created_at": db_document.created_at
    }


@router.get("/")
async def get_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all documents uploaded by the current user"""
    documents = db.query(Document).filter(Document.user_id == current_user.id).all()
    
    return [
        {
            "id": doc.id,
            "title": doc.title,
            "file_size": doc.file_size,
            "page_count": doc.page_count,
            "created_at": doc.created_at
        }
        for doc in documents
    ]


@router.get("/{document_id}")
async def get_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get document by ID"""
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    return {
        "id": document.id,
        "title": document.title,
        "file_size": document.file_size,
        "page_count": document.page_count,
        "created_at": document.created_at,
        "updated_at": document.updated_at
    }


@router.get("/{document_id}/download")
async def download_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Download document file"""
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    if not os.path.exists(document.file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found on server"
        )
    
    return FileResponse(
        path=document.file_path,
        filename=document.title,
        media_type="application/pdf"
    )


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete document by ID"""
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.user_id == current_user.id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Delete associated chunks
    db.query(DocumentChunk).filter(DocumentChunk.document_id == document_id).delete()
    
    # Delete document from database
    db.delete(document)
    db.commit()
    
    # Delete file from storage if it exists
    if os.path.exists(document.file_path):
        os.remove(document.file_path)
    
    return None
