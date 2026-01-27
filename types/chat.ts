/**
 * Types for chat API and service
 */

import type { EmbeddingRow } from '../lib/db';

/**
 * Source information for chat response
 */
export interface ChatSource {
  content: string;
  source: string;
  title?: string;
  similarity: number;
}

/**
 * Response from the chat service
 */
export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
  suggestions?: string[];
}

/**
 * Request body for chat API
 */
export interface ChatRequest {
  question: string;
  sessionId?: string;
}

/**
 * Error response from chat API
 */
export interface ChatErrorResponse {
  error: string;
  code: 'INVALID_REQUEST' | 'EMPTY_QUESTION' | 'QUESTION_TOO_LONG' | 'RATE_LIMITED' | 'SERVICE_ERROR';
}

/**
 * Vector search result with similarity score
 */
export interface SearchResult extends EmbeddingRow {
  similarity: number;
}
