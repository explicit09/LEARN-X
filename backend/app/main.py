import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from .database.session import get_db, engine
from .models import Base
from .api.v1.router import api_router

# Load environment variables
load_dotenv()

# Create all database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Learn-X API",
    description="API for Learn-X student learning platform",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Configure CORS
allowed_origins = [os.getenv("FRONTEND_URL", "http://localhost:3000")]
if os.getenv("LEARNX_ENV") == "dev":
    allowed_origins.append("*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")

# Create uploads directory if it doesn't exist
uploads_dir = os.path.join(os.getcwd(), "uploads")
os.makedirs(uploads_dir, exist_ok=True)

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# Root endpoint redirects to API docs
@app.get("/")
async def root():
    return {
        "name": "Learn-X API",
        "version": "0.1.0",
        "description": "API for Learn-X student learning platform",
        "docs": "/api/docs"
    }

# Simple health check route
@app.get("/health")
async def health() -> dict[str, str]:
    """Return application health status."""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
