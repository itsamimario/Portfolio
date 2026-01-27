/**
 * Chat logging service
 * Logs conversations for analysis and debugging
 */

import { query } from './db';
import type { ChatResponse, ChatSource } from '../types/chat';

export interface ChatLogEntry {
  sessionId?: string;
  question: string;
  response: string;
  sources: ChatSource[];
  suggestions: string[];
}

/**
 * Log a chat conversation to the database
 * Runs asynchronously without blocking the response
 */
export async function logChat(entry: ChatLogEntry): Promise<void> {
  try {
    await query(
      `
      INSERT INTO chat_logs (session_id, question, response, sources, suggestions, source_count)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        entry.sessionId || null,
        entry.question,
        entry.response,
        JSON.stringify(entry.sources),
        JSON.stringify(entry.suggestions),
        entry.sources.length,
      ]
    );
  } catch (error) {
    // Log error but don't throw - logging should not break the chat
    console.error('Failed to log chat:', error);
  }
}

/**
 * Get recent chat logs for analysis
 */
export async function getRecentLogs(limit: number = 50): Promise<ChatLogEntry[]> {
  const result = await query<{
    session_id: string | null;
    question: string;
    response: string;
    sources: ChatSource[];
    suggestions: string[];
    created_at: Date;
  }>(
    `
    SELECT session_id, question, response, sources, suggestions, created_at
    FROM chat_logs
    ORDER BY created_at DESC
    LIMIT $1
    `,
    [limit]
  );

  return result.rows.map((row) => ({
    sessionId: row.session_id || undefined,
    question: row.question,
    response: row.response,
    sources: row.sources,
    suggestions: row.suggestions,
  }));
}

/**
 * Get chat logs by session ID
 */
export async function getLogsBySession(sessionId: string): Promise<ChatLogEntry[]> {
  const result = await query<{
    session_id: string | null;
    question: string;
    response: string;
    sources: ChatSource[];
    suggestions: string[];
    created_at: Date;
  }>(
    `
    SELECT session_id, question, response, sources, suggestions, created_at
    FROM chat_logs
    WHERE session_id = $1
    ORDER BY created_at ASC
    `,
    [sessionId]
  );

  return result.rows.map((row) => ({
    sessionId: row.session_id || undefined,
    question: row.question,
    response: row.response,
    sources: row.sources,
    suggestions: row.suggestions,
  }));
}
