/**
 * OpenAI embeddings utilities for RAG
 * Generates and stores embeddings using text-embedding-3-small
 */

import OpenAI from 'openai';
import { query } from './db';
import type {
  ContentChunk,
  ChunkMetadata,
  EmbeddingConfig,
  DEFAULT_EMBEDDING_CONFIG,
} from '../types/embeddings';

/**
 * Default embedding configuration
 */
const CONFIG: EmbeddingConfig = {
  model: 'text-embedding-3-small',
  dimensions: 1536,
  batchSize: 100,
  delayMs: 100,
};

/**
 * Result of embedding a chunk (before database storage)
 */
interface EmbeddedChunk {
  content: string;
  embedding: number[];
  metadata: ChunkMetadata;
}

/**
 * Get OpenAI client instance
 */
function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  return new OpenAI({ apiKey });
}

/**
 * Delay helper for rate limiting
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate embedding for a single text
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  if (!text || text.trim().length === 0) {
    throw new Error('Cannot generate embedding for empty text');
  }

  const client = getClient();
  const response = await client.embeddings.create({
    model: CONFIG.model,
    input: text.trim(),
  });

  return response.data[0].embedding;
}

/**
 * Generate embeddings for multiple texts (with batching)
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) {
    return [];
  }

  const client = getClient();
  const results: number[][] = [];

  // Process in batches
  for (let i = 0; i < texts.length; i += CONFIG.batchSize) {
    const batch = texts.slice(i, i + CONFIG.batchSize);

    const response = await client.embeddings.create({
      model: CONFIG.model,
      input: batch.map(t => t.trim()),
    });

    results.push(...response.data.map(d => d.embedding));

    // Rate limiting delay between batches
    if (i + CONFIG.batchSize < texts.length) {
      await delay(CONFIG.delayMs);
    }
  }

  return results;
}

/**
 * Embed a single ContentChunk
 */
export async function embedChunk(chunk: ContentChunk): Promise<EmbeddedChunk> {
  const embedding = await generateEmbedding(chunk.content);

  return {
    content: chunk.content,
    embedding,
    metadata: chunk.metadata,
  };
}

/**
 * Embed multiple ContentChunks
 */
export async function embedChunks(chunks: ContentChunk[]): Promise<EmbeddedChunk[]> {
  if (chunks.length === 0) {
    return [];
  }

  const embeddings = await generateEmbeddings(chunks.map(c => c.content));

  return chunks.map((chunk, i) => ({
    content: chunk.content,
    embedding: embeddings[i],
    metadata: chunk.metadata,
  }));
}

/**
 * Store a single embedding in the database
 */
export async function storeEmbedding(result: EmbeddedChunk): Promise<number> {
  const { content, embedding, metadata } = result;

  const sql = `
    INSERT INTO embeddings (content, embedding, metadata, source, content_hash)
    VALUES ($1, $2::vector, $3, $4, $5)
    RETURNING id
  `;

  const response = await query(sql, [
    content,
    `[${embedding.join(',')}]`,
    JSON.stringify(metadata),
    metadata.source,
    metadata.contentHash,
  ]);

  return response.rows[0].id;
}

/**
 * Store multiple embeddings in the database
 */
export async function storeEmbeddings(results: EmbeddedChunk[]): Promise<number[]> {
  if (results.length === 0) {
    return [];
  }

  const ids: number[] = [];

  for (const result of results) {
    const id = await storeEmbedding(result);
    ids.push(id);
  }

  return ids;
}

/**
 * Check if a content hash already exists in the database
 */
export async function checkExistingHash(hash: string): Promise<boolean> {
  const sql = `
    SELECT EXISTS(SELECT 1 FROM embeddings WHERE content_hash = $1) as exists
  `;

  const response = await query(sql, [hash]);
  return response.rows[0].exists;
}

/**
 * Clear all embeddings from the database
 */
export async function clearAllEmbeddings(): Promise<number> {
  const response = await query('DELETE FROM embeddings');
  return response.rowCount ?? 0;
}
