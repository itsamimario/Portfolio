-- Portfolio Database Schema
-- Requires PostgreSQL with pgvector extension

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Embeddings table for RAG chatbot
CREATE TABLE IF NOT EXISTS embeddings (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536), -- OpenAI/Claude embedding dimension
  metadata JSONB DEFAULT '{}',
  source VARCHAR(255), -- 'cv', 'case-study', 'playbook', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for vector similarity search using cosine distance
CREATE INDEX IF NOT EXISTS embeddings_vector_idx
  ON embeddings
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Index for filtering by source
CREATE INDEX IF NOT EXISTS embeddings_source_idx
  ON embeddings (source);

-- Index for metadata queries
CREATE INDEX IF NOT EXISTS embeddings_metadata_idx
  ON embeddings USING gin (metadata);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_embeddings_updated_at
  BEFORE UPDATE ON embeddings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE embeddings IS 'Stores text embeddings for RAG chatbot with vector similarity search';
COMMENT ON COLUMN embeddings.content IS 'Original text content that was embedded';
COMMENT ON COLUMN embeddings.embedding IS 'Vector embedding (1536 dimensions for Claude/OpenAI)';
COMMENT ON COLUMN embeddings.metadata IS 'Additional metadata (tags, titles, categories, etc.)';
COMMENT ON COLUMN embeddings.source IS 'Source type: cv, case-study, playbook, etc.';
