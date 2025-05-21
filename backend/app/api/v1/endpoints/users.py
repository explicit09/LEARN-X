from enum import Enum
from typing import Any, Dict, Optional

from fastapi import APIRouter, Body, Depends, HTTPException, status
from pydantic import BaseModel, Field, validator
from sqlalchemy.orm import Session

from ....database.session import get_db
from ....models.user import User
from .auth import get_current_active_user

class LearningStyle(str, Enum):
    VISUAL = "visual"
    AUDITORY = "auditory"
    READ_WRITE = "read_write"
    KINESTHETIC = "kinesthetic"

class TonePreference(str, Enum):
    FORMAL = "formal"
    CASUAL = "casual"
    PROFESSIONAL = "professional"
    FRIENDLY = "friendly"

class ComplexityLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"

class UserPreferences(BaseModel):
    learning_style: Optional[LearningStyle] = Field(
        None, 
        description="Preferred learning style for content delivery"
    )
    complexity: Optional[ComplexityLevel] = Field(
        None,
        description="Preferred complexity level of the content"
    )
    tone: Optional[TonePreference] = Field(
        None,
        description="Preferred tone of the content"
    )
    follow_ups: Optional[bool] = Field(
        None,
        description="Whether to enable follow-up questions and suggestions"
    )
    
    class Config:
        schema_extra = {
            "example": {
                "learning_style": "visual",
                "complexity": "intermediate",
                "tone": "friendly",
                "follow_ups": True
            }
        }

router = APIRouter()


@router.get(
    "/preferences",
    response_model=UserPreferences,
    summary="Get user preferences",
    description="Retrieve the current user's learning preferences"
)
async def get_preferences(current_user: User = Depends(get_current_active_user)):
    """
    Get the current user's learning preferences.
    
    Returns an object containing the user's preferred learning style, complexity level,
    tone, and follow-up settings.
    """
    return current_user.preferences or {}


@router.put(
    "/preferences",
    response_model=UserPreferences,
    summary="Update user preferences",
    description="Update the current user's learning preferences"
)
async def update_preferences(
    preferences: UserPreferences,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Update the current user's learning preferences.
    
    - **learning_style**: Preferred learning style (visual, auditory, read_write, kinesthetic)
    - **complexity**: Preferred complexity level (beginner, intermediate, advanced, expert)
    - **tone**: Preferred tone (formal, casual, professional, friendly)
    - **follow_ups**: Whether to enable follow-up questions and suggestions
    
    Note: Only the provided fields will be updated, others will remain unchanged.
    """
    # Convert Pydantic model to dict, removing None values
    update_data = preferences.dict(exclude_unset=True)
    
    # Merge with existing preferences
    current_prefs = current_user.preferences or {}
    current_user.preferences = {**current_prefs, **update_data}
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    
    return current_user.preferences or {}
