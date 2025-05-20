from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship

from .base import BaseModel
from ..database.session import Base


class User(Base, BaseModel):
    """User model for authentication and profile"""
    
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    
    # Relationships
    documents = relationship("Document", back_populates="owner")
    conversations = relationship("Conversation", back_populates="user")
