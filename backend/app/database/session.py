import os
import logging
from sqlalchemy import create_engine, event, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.schema import DDL
from sqlalchemy.pool import NullPool
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

# Debug print
print(f"Using DATABASE_URL: {DATABASE_URL}")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Create SQLAlchemy engine with configuration for local development
engine = create_engine(
    DATABASE_URL,
    # Use NullPool to disable connection pooling
    poolclass=NullPool,
    # Connection settings
    connect_args={
        'sslmode': 'disable',  # Disable SSL for local development
        'connect_timeout': 10,  # 10 second connection timeout
        'application_name': 'learnx-backend'  # Identify this connection
    }
)

# Initialize pgvector extension on first connection
# Note: In Neon, you need to enable the pgvector extension in the dashboard first
# This is a no-op in Neon since extensions must be enabled through the dashboard
try:
    if 'neon.tech' not in DATABASE_URL:
        def init_vector_extension(dbapi_connection, connection_record):
            """Initialize the pgvector extension if it's not already enabled"""
            try:
                # Check if pgvector extension exists
                with dbapi_connection.cursor() as cursor:
                    cursor.execute("SELECT 1 FROM pg_extension WHERE extname = 'vector'")
                    if not cursor.fetchone():
                        logging.info("Enabling pgvector extension...")
                        try:
                            cursor.execute("CREATE EXTENSION IF NOT EXISTS vector")
                            dbapi_connection.commit()
                            logging.info("pgvector extension enabled successfully")
                        except Exception as ext_e:
                            logging.warning(f"Could not enable pgvector extension: {ext_e}")
                            logging.warning("Continuing without pgvector extension - some vector functionality may be limited")
                            # Don't fail the transaction
                            dbapi_connection.rollback()
                    else:
                        logging.info("pgvector extension is already enabled")
            except Exception as e:
                logging.warning(f"Could not initialize pgvector extension: {e}")
                logging.warning("If you're using Neon, please enable the pgvector extension in your dashboard")
                # Don't fail the connection
                try:
                    dbapi_connection.rollback()
                except:
                    pass

        # Initialize pgvector extension when the engine first connects
        event.listens_for(engine, 'connect')(init_vector_extension)
except Exception as e:
    logging.warning(f"Error setting up pgvector extension: {e}")

# Configure session with connection pooling settings
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False  # Prevent detached instance errors
)

# Create base class for declarative models
Base = declarative_base()

# Function to get a database session
def get_db():
    """Dependency to get DB session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
