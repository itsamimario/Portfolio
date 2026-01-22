/**
 * Text chunking utilities for RAG
 * Splits content into appropriately sized chunks with overlap
 */

import crypto from 'crypto';
import type {
  ContentFile,
  ContentChunk,
  ChunkOptions,
  ChunkMetadata,
  DEFAULT_CHUNK_OPTIONS,
} from '../types/embeddings';

/**
 * Default chunking options
 */
const DEFAULTS: Required<ChunkOptions> = {
  maxTokens: 800,
  overlapTokens: 100,
  preserveParagraphs: true,
};

/**
 * Estimate token count for text
 * Uses ~4 characters per token as approximation
 */
export function estimateTokens(text: string): number {
  if (!text || text.length === 0) {
    return 0;
  }
  // Rough estimate: ~4 characters per token for English text
  // This is a simplification - actual tokenization varies by model
  return Math.ceil(text.length / 4);
}

/**
 * Generate content hash for deduplication
 */
function generateHash(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 12);
}

/**
 * Split text by paragraphs (double newline)
 */
function splitByParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
}

/**
 * Split text by sentences
 */
function splitBySentences(text: string): string[] {
  // Split on sentence boundaries while keeping the delimiter
  return text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

/**
 * Chunk text into appropriately sized pieces
 */
export function chunkText(
  text: string,
  options: ChunkOptions = {}
): string[] {
  const opts = { ...DEFAULTS, ...options };
  const { maxTokens, overlapTokens, preserveParagraphs } = opts;

  // Handle empty or whitespace-only text
  const trimmed = text.trim();
  if (!trimmed) {
    return [];
  }

  // If text is small enough, return as single chunk
  if (estimateTokens(trimmed) <= maxTokens) {
    return [trimmed];
  }

  const chunks: string[] = [];

  // Split into words for more granular control
  const words = trimmed.split(/\s+/);
  let currentWords: string[] = [];
  let currentTokens = 0;

  for (const word of words) {
    const wordTokens = estimateTokens(word + ' ');

    if (currentTokens + wordTokens > maxTokens && currentWords.length > 0) {
      // Current chunk is full, save it
      chunks.push(currentWords.join(' '));

      // Calculate overlap - take last N words
      if (overlapTokens > 0) {
        const overlapWords = Math.ceil(overlapTokens / 1.3); // ~1.3 tokens per word
        const overlap = currentWords.slice(-Math.min(overlapWords, currentWords.length));
        currentWords = [...overlap, word];
        currentTokens = estimateTokens(currentWords.join(' '));
      } else {
        currentWords = [word];
        currentTokens = wordTokens;
      }
    } else {
      currentWords.push(word);
      currentTokens += wordTokens;
    }
  }

  // Add remaining content
  if (currentWords.length > 0) {
    chunks.push(currentWords.join(' '));
  }

  return chunks;
}

/**
 * Get overlap text from end of chunk
 */
function getOverlapText(chunks: string[], overlapTokens: number): string {
  const fullText = chunks.join(' ');
  const words = fullText.split(/\s+/);

  // Estimate words needed for overlap (~1.3 tokens per word average)
  const wordsNeeded = Math.ceil(overlapTokens / 1.3);

  if (words.length <= wordsNeeded) {
    return fullText;
  }

  return words.slice(-wordsNeeded).join(' ');
}

/**
 * Chunk a content file into ContentChunks with metadata
 */
export function chunkContentFile(
  file: ContentFile,
  options: ChunkOptions = {}
): ContentChunk[] {
  const textChunks = chunkText(file.content, options);

  return textChunks.map((content, index) => ({
    content,
    metadata: {
      source: file.source,
      sourceFile: file.path,
      title: file.title,
      chunkIndex: index,
      totalChunks: textChunks.length,
      contentHash: generateHash(content),
      tokenCount: estimateTokens(content),
    } as ChunkMetadata,
  }));
}
