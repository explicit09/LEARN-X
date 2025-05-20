from sqlalchemy import Column, String, Integer, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship

from .base import BaseModel
from ..database.session import Base


class Conversation(Base, BaseModel):
    """Conversation model for storing Q&A sessions"""
    
    title = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    document_id = Column(Integer, ForeignKey("document.id"), nullable=True)
    preferences = Column(JSON, nullable=True)  # Store user preferences for this conversation
    
    # Relationships
    user = relationship("User", back_populates="conversations")
    document = relationship("Document", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation")


class Message(Base, BaseModel):
    """Message model for storing individual Q&A exchanges"""
    
    content = Column(Text, nullable=False)
    role = Column(String, nullable=False)  # 'user' or 'assistant'
    conversation_id = Column(Integer, ForeignKey("conversation.id"), nullable=False)
    citations = Column(JSON, nullable=True)  # Store page numbers and sections as references
    
    # Relationships
    conversation = relationship("Conversation", back_populates="messages")
