-- Chat logs table for tracking conversations
-- Run this migration on both local and Supabase databases

CREATE TABLE IF NOT EXISTS chat_logs (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(36),
  question TEXT NOT NULL,
  response TEXT NOT NULL,
  sources JSONB DEFAULT '[]',
  suggestions JSONB DEFAULT '[]',
  source_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for querying by session
CREATE INDEX IF NOT EXISTS chat_logs_session_idx ON chat_logs (session_id);

-- Index for querying by date
CREATE INDEX IF NOT EXISTS chat_logs_created_idx ON chat_logs (created_at DESC);

-- Comments
COMMENT ON TABLE chat_logs IS 'Stores chat conversations for analysis and debugging';
COMMENT ON COLUMN chat_logs.session_id IS 'UUID to group messages from same visitor session';
COMMENT ON COLUMN chat_logs.question IS 'User question/message';
COMMENT ON COLUMN chat_logs.response IS 'AI response';
COMMENT ON COLUMN chat_logs.sources IS 'Retrieved context sources used for the response';
COMMENT ON COLUMN chat_logs.suggestions IS 'Follow-up suggestions provided';
