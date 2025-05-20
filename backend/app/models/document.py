from sqlalchemy import Column, String, Integer, ForeignKey, Text
from sqlalchemy.orm import relationship

from .base import BaseModel
from ..database.session import Base


class Document(Base, BaseModel):
    """Document model for storing uploaded PDFs"""
    
    title = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)  # Size in bytes
    page_count = Column(Integer, nullable=True)  # Number of pages in PDF
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    
    # Relationships
    owner = relationship("User", back_populates="documents")
    chunks = relationship("DocumentChunk", back_populates="document")
    conversations = relationship("Conversation", back_populates="document")


class DocumentChunk(Base, BaseModel):
    """Model for storing chunks of text extracted from documents with embeddings"""
    
    content = Column(Text, nullable=False)
    page_number = Column(Integer, nullable=True)
    chunk_index = Column(Integer, nullable=False)
    document_id = Column(Integer, ForeignKey("document.id"), nullable=False)
    # Add embedding column when using pgvector
    # embedding = Column(Vector(1536))  # Assuming OpenAI embedding dimension
    
    # Relationships
    document = relationship("Document", back_populates="chunks")
