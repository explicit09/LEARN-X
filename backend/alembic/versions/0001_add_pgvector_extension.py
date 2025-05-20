"""Add pgvector extension and embedding column

Revision ID: 0001
Revises: 
Create Date: 2025-05-20 02:50:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.schema import DDL
from sqlalchemy import Column, Text
import os
import sys

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

# Import the Vector type from our application
from app.database.vector import Vector


# revision identifiers, used by Alembic
revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Create the pgvector extension
    op.execute('CREATE EXTENSION IF NOT EXISTS vector')
    
    # Add the embedding column to document_chunk table
    # We need to use batch_alter_table because Vector is a custom type
    with op.batch_alter_table('document_chunk') as batch_op:
        batch_op.add_column(Column('embedding', Vector(768), nullable=True))
    
    # Create an index for vector similarity search
    op.execute(
        'CREATE INDEX IF NOT EXISTS document_chunk_embedding_idx ON document_chunk USING ivfflat (embedding vector_l2_ops)'
    )


def downgrade():
    # Remove the index
    op.execute('DROP INDEX IF EXISTS document_chunk_embedding_idx')
    
    # Remove the embedding column
    with op.batch_alter_table('document_chunk') as batch_op:
        batch_op.drop_column('embedding')
    
    # Note: We don't drop the pgvector extension as it might be used by other applications
