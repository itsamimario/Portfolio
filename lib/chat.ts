/**
 * Chat service for RAG chatbot
 * Implements semantic search with vector embeddings and Claude-powered responses
 */

import Anthropic from '@anthropic-ai/sdk';
import { generateEmbedding } from './openai-embeddings';
import { vectorSearch } from './db';
import type { ChatResponse, ChatSource, SearchResult } from '../types/chat';

/**
 * Get Anthropic client instance
 */
function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
  return new Anthropic({ apiKey });
}

/**
 * Search for relevant content based on query
 * Embeds the query and performs vector similarity search
 */
export async function searchRelevantContent(
  query: string,
  limit: number = 5,
  source?: string
): Promise<SearchResult[]> {
  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(query);

  // Search for similar content in the database
  const results = await vectorSearch(queryEmbedding, limit, source);

  return results;
}

/**
 * Build system prompt for the RAG chatbot
 */
function buildSystemPrompt(): string {
  return `You are a helpful AI assistant for Mario Bennekers' portfolio website. You answer questions about Mario's professional background, experience, skills, and projects.

Key guidelines:
- Be conversational, professional, and helpful
- Only answer questions based on the provided context
- If the context doesn't contain relevant information, politely say you don't have that information
- Keep responses concise but informative
- When mentioning projects or case studies, provide specific details from the context
- Don't make up information not present in the context`;
}

/**
 * Build user prompt with context from vector search
 */
function buildUserPrompt(question: string, context: SearchResult[]): string {
  if (context.length === 0) {
    return `Question: ${question}

No relevant context was found in the portfolio. Please let the user know you don't have information to answer their question.`;
  }

  const contextText = context
    .map((result, i) => {
      const source = result.metadata?.title || result.source || 'Unknown';
      return `[Source ${i + 1}: ${source}]\n${result.content}`;
    })
    .join('\n\n');

  return `Context from Mario's portfolio:
${contextText}

Question: ${question}

Please answer the question based on the context provided above.`;
}

/**
 * Convert search results to chat sources
 */
function toSources(results: SearchResult[]): ChatSource[] {
  return results.map((result) => ({
    content: result.content,
    source: result.source || 'unknown',
    title: result.metadata?.title,
    similarity: result.similarity,
  }));
}

/**
 * Generate a chat response using Claude with RAG context
 */
export async function generateChatResponse(
  question: string
): Promise<ChatResponse> {
  // Search for relevant content
  const searchResults = await searchRelevantContent(question);

  // Build prompts
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(question, searchResults);

  // Call Claude API
  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  // Extract answer from response
  const textBlock = response.content.find((block) => block.type === 'text');
  const answer = textBlock?.type === 'text' ? textBlock.text : '';

  return {
    answer,
    sources: toSources(searchResults),
  };
}

/**
 * Main chat function - handles full flow from question to answer
 */
export async function chat(question: string): Promise<ChatResponse> {
  // Validate question
  if (!question || question.trim().length === 0) {
    throw new Error('Question cannot be empty');
  }

  // Generate response
  return generateChatResponse(question.trim());
}
