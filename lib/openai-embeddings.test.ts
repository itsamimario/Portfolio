/**
 * Tests for openai-embeddings module
 * TDD: Write tests FIRST before implementation
 */

import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import type { ContentChunk, ChunkMetadata } from '../types/embeddings';

// Set environment variable before any imports
process.env.OPENAI_API_KEY = 'test-api-key';

// Mock OpenAI
const mockCreate = jest.fn();
jest.mock('openai', () => {
  const MockOpenAI = function() {
    return {
      embeddings: {
        create: mockCreate,
      },
    };
  };
  return { default: MockOpenAI, __esModule: true };
});

// Mock database
const mockQuery = jest.fn();
jest.mock('./db', () => ({
  query: mockQuery,
  getPool: jest.fn(),
}));

describe('openai-embeddings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock response for embeddings
    mockCreate.mockResolvedValue({
      data: [{ embedding: new Array(1536).fill(0.1) }],
    });
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('generateEmbedding', () => {
    it('generates embedding for single text', async () => {
      const { generateEmbedding } = await import('./openai-embeddings');
      const text = 'This is a test sentence for embedding.';

      const embedding = await generateEmbedding(text);

      expect(Array.isArray(embedding)).toBe(true);
      expect(embedding.length).toBe(1536);
    });

    it('throws error for empty text', async () => {
      const { generateEmbedding } = await import('./openai-embeddings');

      await expect(generateEmbedding('')).rejects.toThrow();
    });

    it('returns array of numbers', async () => {
      const { generateEmbedding } = await import('./openai-embeddings');
      const text = 'Test embedding generation';

      const embedding = await generateEmbedding(text);

      expect(embedding.every(n => typeof n === 'number')).toBe(true);
    });
  });

  describe('generateEmbeddings (batch)', () => {
    it('generates embeddings for multiple texts', async () => {
      mockCreate.mockResolvedValue({
        data: [
          { embedding: new Array(1536).fill(0.1) },
          { embedding: new Array(1536).fill(0.2) },
          { embedding: new Array(1536).fill(0.3) },
        ],
      });

      const { generateEmbeddings } = await import('./openai-embeddings');
      const texts = [
        'First text for embedding',
        'Second text for embedding',
        'Third text for embedding',
      ];

      const embeddings = await generateEmbeddings(texts);

      expect(embeddings.length).toBe(3);
      expect(embeddings.every(e => e.length === 1536)).toBe(true);
    });

    it('handles empty array', async () => {
      const { generateEmbeddings } = await import('./openai-embeddings');

      const embeddings = await generateEmbeddings([]);

      expect(embeddings).toEqual([]);
    });

    it('processes in batches for large inputs', async () => {
      // Mock to return different data for each batch call
      mockCreate
        .mockResolvedValueOnce({
          data: Array.from({ length: 100 }, () => ({ embedding: new Array(1536).fill(0.1) })),
        })
        .mockResolvedValueOnce({
          data: Array.from({ length: 50 }, () => ({ embedding: new Array(1536).fill(0.2) })),
        });

      const { generateEmbeddings } = await import('./openai-embeddings');
      // Create 150 texts (should be 2 batches with default 100)
      const texts = Array.from({ length: 150 }, (_, i) => `Text number ${i}`);

      const embeddings = await generateEmbeddings(texts);

      expect(embeddings.length).toBe(150);
      expect(mockCreate).toHaveBeenCalledTimes(2);
    });
  });

  describe('embedChunk', () => {
    it('embeds a single ContentChunk', async () => {
      const { embedChunk } = await import('./openai-embeddings');
      const chunk: ContentChunk = {
        content: 'Test chunk content for embedding',
        metadata: {
          source: 'case-study',
          sourceFile: 'content/case-studies/test.md',
          title: 'Test Case Study',
          chunkIndex: 0,
          totalChunks: 1,
          contentHash: 'abc123',
          tokenCount: 10,
        },
      };

      const result = await embedChunk(chunk);

      expect(result).toHaveProperty('content', chunk.content);
      expect(result).toHaveProperty('embedding');
      expect(result).toHaveProperty('metadata');
      expect(result.embedding.length).toBe(1536);
    });

    it('preserves metadata in result', async () => {
      const { embedChunk } = await import('./openai-embeddings');
      const metadata: ChunkMetadata = {
        source: 'about',
        sourceFile: 'content/about.md',
        title: 'About Me',
        chunkIndex: 2,
        totalChunks: 5,
        contentHash: 'def456',
        tokenCount: 25,
      };
      const chunk: ContentChunk = {
        content: 'About section content',
        metadata,
      };

      const result = await embedChunk(chunk);

      expect(result.metadata).toEqual(metadata);
    });
  });

  describe('embedChunks (batch)', () => {
    it('embeds multiple chunks', async () => {
      mockCreate.mockResolvedValue({
        data: [
          { embedding: new Array(1536).fill(0.1) },
          { embedding: new Array(1536).fill(0.2) },
        ],
      });

      const { embedChunks } = await import('./openai-embeddings');
      const chunks: ContentChunk[] = [
        {
          content: 'First chunk content',
          metadata: {
            source: 'case-study',
            sourceFile: 'test1.md',
            title: 'Test 1',
            chunkIndex: 0,
            totalChunks: 2,
            contentHash: 'hash1',
            tokenCount: 5,
          },
        },
        {
          content: 'Second chunk content',
          metadata: {
            source: 'case-study',
            sourceFile: 'test1.md',
            title: 'Test 1',
            chunkIndex: 1,
            totalChunks: 2,
            contentHash: 'hash2',
            tokenCount: 5,
          },
        },
      ];

      const results = await embedChunks(chunks);

      expect(results.length).toBe(2);
      expect(results[0].metadata.chunkIndex).toBe(0);
      expect(results[1].metadata.chunkIndex).toBe(1);
    });

    it('returns empty array for empty input', async () => {
      const { embedChunks } = await import('./openai-embeddings');

      const results = await embedChunks([]);

      expect(results).toEqual([]);
    });
  });

  describe('storeEmbedding', () => {
    it('stores embedding in database', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [{ id: 1 }],
        rowCount: 1,
        command: 'INSERT',
        oid: 0,
        fields: [],
      });

      const { storeEmbedding } = await import('./openai-embeddings');
      const result = {
        content: 'Test content',
        embedding: new Array(1536).fill(0.1),
        metadata: {
          source: 'about' as const,
          sourceFile: 'content/about.md',
          title: 'About',
          chunkIndex: 0,
          totalChunks: 1,
          contentHash: 'testhash',
          tokenCount: 5,
        },
      };

      const id = await storeEmbedding(result);

      expect(id).toBe(1);
      expect(mockQuery).toHaveBeenCalled();
    });
  });

  describe('storeEmbeddings (batch)', () => {
    it('stores multiple embeddings', async () => {
      mockQuery
        .mockResolvedValueOnce({
          rows: [{ id: 1 }],
          rowCount: 1,
          command: 'INSERT',
          oid: 0,
          fields: [],
        })
        .mockResolvedValueOnce({
          rows: [{ id: 2 }],
          rowCount: 1,
          command: 'INSERT',
          oid: 0,
          fields: [],
        });

      const { storeEmbeddings } = await import('./openai-embeddings');
      const results = [
        {
          content: 'Content 1',
          embedding: new Array(1536).fill(0.1),
          metadata: {
            source: 'about' as const,
            sourceFile: 'test.md',
            title: 'Test',
            chunkIndex: 0,
            totalChunks: 2,
            contentHash: 'hash1',
            tokenCount: 5,
          },
        },
        {
          content: 'Content 2',
          embedding: new Array(1536).fill(0.2),
          metadata: {
            source: 'about' as const,
            sourceFile: 'test.md',
            title: 'Test',
            chunkIndex: 1,
            totalChunks: 2,
            contentHash: 'hash2',
            tokenCount: 5,
          },
        },
      ];

      const ids = await storeEmbeddings(results);

      expect(ids.length).toBe(2);
      expect(mockQuery).toHaveBeenCalledTimes(2);
    });

    it('returns empty array for empty input', async () => {
      const { storeEmbeddings } = await import('./openai-embeddings');

      const ids = await storeEmbeddings([]);

      expect(ids).toEqual([]);
    });
  });

  describe('checkExistingHash', () => {
    it('returns true for existing hash', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [{ exists: true }],
        rowCount: 1,
        command: 'SELECT',
        oid: 0,
        fields: [],
      });

      const { checkExistingHash } = await import('./openai-embeddings');

      const exists = await checkExistingHash('existinghash');

      expect(exists).toBe(true);
    });

    it('returns false for non-existing hash', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [{ exists: false }],
        rowCount: 1,
        command: 'SELECT',
        oid: 0,
        fields: [],
      });

      const { checkExistingHash } = await import('./openai-embeddings');

      const exists = await checkExistingHash('newhash');

      expect(exists).toBe(false);
    });
  });

  describe('clearAllEmbeddings', () => {
    it('clears all embeddings from database', async () => {
      mockQuery.mockResolvedValueOnce({
        rows: [],
        rowCount: 10,
        command: 'DELETE',
        oid: 0,
        fields: [],
      });

      const { clearAllEmbeddings } = await import('./openai-embeddings');

      const count = await clearAllEmbeddings();

      expect(count).toBe(10);
      expect(mockQuery).toHaveBeenCalledWith('DELETE FROM embeddings');
    });
  });
});
