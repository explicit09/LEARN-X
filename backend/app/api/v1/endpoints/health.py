from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ....database.session import get_db

router = APIRouter()


@router.get("/")
async def health_check(db: Session = Depends(get_db)):
    """Health check endpoint with database connection verification"""
    try:
        # Verify database connection
        db.execute("SELECT 1")
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "status": "ok",
        "database": db_status,
        "version": "0.1.0"
    }
