from sentence_transformers import SentenceTransformer
import os
from typing import List, Union, Dict, Any
import numpy as np
from sqlalchemy import text
from sqlalchemy.orm import Session

# Load the model name from environment variables or use a default
MODEL_NAME = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

# Initialize the model (lazy-loaded on first use)
_model = None

def get_model():
    """Get or initialize the sentence transformer model"""
    global _model
    if _model is None:
        _model = SentenceTransformer(MODEL_NAME)
    return _model

def get_embeddings(texts: Union[str, List[str]]) -> Union[np.ndarray, List[np.ndarray]]:
    """Generate embeddings for a text or list of texts
    
    Args:
        texts: A single text string or a list of text strings
        
    Returns:
        Embeddings as numpy arrays
    """
    model = get_model()
    
    # Handle both single texts and lists
    if isinstance(texts, str):
        return model.encode(texts)
    else:
        return model.encode(texts)
    
def get_embedding_dimension() -> int:
    """Get the dimension of the embeddings from the model"""
    model = get_model()
    return model.get_sentence_embedding_dimension()


def search_similar_chunks(query: str, db: Session, document_id: int = None, limit: int = 5) -> List[Dict[str, Any]]:
    """Search for document chunks similar to the query using vector similarity
    
    Args:
        query: The search query
        db: Database session
        document_id: Optional filter for specific document
        limit: Maximum number of results to return
    
    Returns:
        List of similar document chunks with metadata
    """
    # Generate embedding for the query
    query_embedding = get_embeddings(query)
    
    # Convert numpy array to list for SQL query
    embedding_list = query_embedding.tolist()
    
    # Construct the SQL query with vector similarity search
    sql = text(
        """
        SELECT 
            dc.id,
            dc.content,
            dc.page_number,
            d.title as document_title,
            d.id as document_id,
            1 - (dc.embedding <-> :embedding) as similarity
        FROM 
            document_chunk dc
        JOIN 
            document d ON dc.document_id = d.id
        WHERE 
            dc.embedding IS NOT NULL
        """
    )
    
    # Add document filter if provided
    if document_id is not None:
        sql = text(sql.text + " AND dc.document_id = :document_id")
    
    # Add ordering and limit
    sql = text(
        sql.text + """
        ORDER BY 
            dc.embedding <-> :embedding
        LIMIT :limit
        """
    )
    
    # Execute the query with parameters
    params = {
        "embedding": str(embedding_list),
        "limit": limit
    }
    
    if document_id is not None:
        params["document_id"] = document_id
    
    result = db.execute(sql, params)
    
    # Process results
    chunks = []
    for row in result:
        chunks.append({
            "id": row.id,
            "content": row.content,
            "page_number": row.page_number,
            "document_title": row.document_title,
            "document_id": row.document_id,
            "similarity": float(row.similarity)
        })
    
    return chunks
