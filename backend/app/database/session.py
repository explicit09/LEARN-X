import os
from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.schema import DDL
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Create SQLAlchemy engine with connection pooling for better performance
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,  # Verify connections before using them
    pool_recycle=300,    # Recycle connections after 5 minutes
    pool_size=5,         # Number of connections to keep open
    max_overflow=10,     # Max number of connections that can be opened beyond pool_size
    pool_timeout=30,     # Seconds to wait before giving up on getting a connection
    connect_args={
        'sslmode': 'require',  # Ensure SSL is required
        'connect_timeout': 30,  # 30 second connection timeout
        'keepalives': 1,        # Enable keepalive
        'keepalives_idle': 60,  # Idle time before sending keepalive
        'keepalives_interval': 30,  # Interval between keepalives
        'keepalives_count': 5,      # Number of keepalives before dropping connection
        'application_name': 'learnx-backend',  # Identify this connection
        'options': '-c statement_timeout=30000 -c search_path=learnx_schema,public',
    },
    # Increase timeouts for slow connections
    execution_options={
        'statement_timeout': 30000,  # 30 seconds
        'query_timeout': 30000,     # 30 seconds
    }
)

def create_schema():
    """Create the learnx_schema if it doesn't exist"""
    with engine.connect() as conn:
        # Create schema if it doesn't exist
        conn.execute(text('CREATE SCHEMA IF NOT EXISTS learnx_schema AUTHORIZATION "learn-x db_owner"'))
        # Grant all privileges on schema to the user
        conn.execute(text('GRANT ALL ON SCHEMA learnx_schema TO "learn-x db_owner"'))
        # Set default privileges for future tables in this schema
        conn.execute(text('ALTER DEFAULT PRIVILEGES IN SCHEMA learnx_schema GRANT ALL ON TABLES TO "learn-x db_owner"'))
        # Set the search path for this connection
        conn.execute(text('SET search_path TO learnx_schema, public'))
        conn.commit()

# Initialize pgvector extension on first connection if not in Neon
# Note: In Neon, you need to enable the pgvector extension in the dashboard first
# This is a no-op in Neon since extensions must be enabled through the dashboard
try:
    if 'neon.tech' not in DATABASE_URL:
        event.listen(
            engine, 
            "first_connect",
            DDL("CREATE EXTENSION IF NOT EXISTS vector")
        )
except Exception as e:
    import logging
    logging.warning(f"Could not set up pgvector extension listener: {e}")

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
