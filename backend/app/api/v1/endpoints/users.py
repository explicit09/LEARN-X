from typing import Any, Dict

from fastapi import APIRouter, Body, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ....database.session import get_db
from ....models.user import User
from .auth import get_current_active_user

router = APIRouter()


@router.get("/preferences")
async def get_preferences(current_user: User = Depends(get_current_active_user)):
    return current_user.preferences or {}


@router.put("/preferences")
async def update_preferences(
    prefs: Dict[str, Any] = Body(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    current_user.preferences = {**(current_user.preferences or {}), **prefs}
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user.preferences or {}
