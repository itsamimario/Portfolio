/**
 * Types for content embedding and RAG chatbot
 */

/**
 * Source type for content classification
 */
export type ContentSource = 'about' | 'timeline' | 'case-study' | 'playbook';

/**
 * Represents a loaded content file
 */
export interface ContentFile {
  path: string;
  content: string;
  source: ContentSource;
  title: string;
}

/**
 * Metadata for a content chunk
 */
export interface ChunkMetadata {
  source: ContentSource;
  sourceFile: string;
  title: string;
  section?: string;
  headingPath?: string;
  company?: string;
  role?: string;
  period?: string;
  chunkIndex: number;
  totalChunks: number;
  contentHash: string;
  tokenCount: number;
}

/**
 * A chunk of content ready for embedding
 */
export interface ContentChunk {
  content: string;
  metadata: ChunkMetadata;
}

/**
 * Result of embedding a chunk (stored in database)
 */
export interface EmbeddingResult {
  id: number;
  content: string;
  embedding: number[];
  metadata: ChunkMetadata;
  createdAt: Date;
}

/**
 * Options for text chunking
 */
export interface ChunkOptions {
  maxTokens?: number;       // Default: 800
  overlapTokens?: number;   // Default: 100
  preserveParagraphs?: boolean; // Default: true
}

/**
 * Summary of embedding operation
 */
export interface EmbeddingSummary {
  totalFiles: number;
  totalChunks: number;
  bySource: Record<ContentSource, number>;
  duration: number;
  skipped: number;
}

/**
 * Configuration for embedding generation
 */
export interface EmbeddingConfig {
  model: string;
  dimensions: number;
  batchSize: number;
  delayMs: number;
}

/**
 * Default embedding configuration
 */
export const DEFAULT_EMBEDDING_CONFIG: EmbeddingConfig = {
  model: 'text-embedding-3-small',
  dimensions: 1536,
  batchSize: 100,
  delayMs: 100,
};

/**
 * Default chunk options
 */
export const DEFAULT_CHUNK_OPTIONS: Required<ChunkOptions> = {
  maxTokens: 800,
  overlapTokens: 100,
  preserveParagraphs: true,
};
