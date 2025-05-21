import os
import logging
import time
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError, SQLAlchemyError
from sqlalchemy import text
from dotenv import load_dotenv

from .database.session import get_db, engine, Base, SessionLocal
from .api.v1.router import api_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def init_db():
    """Initialize database with retry logic"""
    max_retries = 5
    retry_delay = 5  # seconds
    
    for attempt in range(max_retries):
        try:
            # Try to create all tables
            logger.info(f"Attempting to connect to the database (attempt {attempt + 1}/{max_retries})...")
            
            # First create the schema and set permissions
            create_schema()
            logger.info("Database schema created and permissions set")
            
            # Test the connection
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
                logger.info("Database connection test successful")
                
                # Enable pgvector extension if not enabled
                try:
                    conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
                    logger.info("pgvector extension enabled")
                except Exception as e:
                    logger.warning(f"Could not enable pgvector extension: {e}")
                
                # Create tables if they don't exist
                Base.metadata.create_all(bind=engine)
                logger.info("Database tables created/verified")
                    
            logger.info("Database initialization completed successfully")
            return True
            
        except (OperationalError, ProgrammingError) as e:
            if attempt < max_retries - 1:
                logger.warning(f"Database connection failed (attempt {attempt + 1}/{max_retries}): {str(e)}")
                time.sleep(retry_delay * (attempt + 1))  # Exponential backoff
                continue
            logger.error(f"❌ Failed to connect to database after {max_retries} attempts")
            logger.error("Please check your database connection settings in .env")
            logger.error(f"DATABASE_URL: {os.environ.get('DATABASE_URL', 'Not set')}")
            raise
            
        except Exception as e:
            logger.error(f"❌ Error initializing database: {str(e)}")
            logger.error("Please check your database configuration and ensure the database is accessible")
            if hasattr(e, 'orig') and hasattr(e.orig, 'pgerror'):
                logger.error(f"Database error: {e.orig.pgerror}")
            raise

# Initialize database with retry logic
init_db()

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

@app.get("/")
async def health():
    """Health check endpoint"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
