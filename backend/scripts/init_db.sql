-- Initialize the database and enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable Debugging messages
SET client_min_messages TO 'notice';

-- Notification that the script has run successfully
DO $$
BEGIN
    RAISE NOTICE 'PostgreSQL initialized with pgvector extension enabled';
END
$$;
