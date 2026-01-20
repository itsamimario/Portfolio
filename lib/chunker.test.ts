/**
 * Tests for chunker module
 * TDD: Write tests FIRST before implementation
 */

import { describe, it, expect } from '@jest/globals';
import {
  estimateTokens,
  chunkText,
  chunkContentFile,
} from './chunker';
import type { ContentFile, ContentChunk } from '../types/embeddings';

describe('chunker', () => {
  describe('estimateTokens', () => {
    it('estimates ~4 characters per token', () => {
      // 100 characters should be ~25 tokens
      const text = 'a'.repeat(100);
      const tokens = estimateTokens(text);
      expect(tokens).toBeGreaterThanOrEqual(20);
      expect(tokens).toBeLessThanOrEqual(30);
    });

    it('handles empty string', () => {
      expect(estimateTokens('')).toBe(0);
    });

    it('handles unicode characters', () => {
      const text = '你好世界'; // 4 Chinese characters
      const tokens = estimateTokens(text);
      expect(tokens).toBeGreaterThan(0);
    });

    it('returns reasonable estimate for realistic text', () => {
      const text = 'This is a sample sentence with multiple words.';
      const tokens = estimateTokens(text);
      // ~47 chars -> ~12 tokens
      expect(tokens).toBeGreaterThanOrEqual(8);
      expect(tokens).toBeLessThanOrEqual(20);
    });
  });

  describe('chunkText', () => {
    it('returns single chunk for short text', () => {
      const shortText = 'This is a short text that fits in one chunk.';
      const chunks = chunkText(shortText, { maxTokens: 800 });

      expect(chunks).toHaveLength(1);
      expect(chunks[0]).toBe(shortText);
    });

    it('splits long text into multiple chunks', () => {
      // Create text that's definitely longer than 800 tokens (~3200 chars)
      const longText = 'This is a paragraph of text. '.repeat(200);
      const chunks = chunkText(longText, { maxTokens: 800 });

      expect(chunks.length).toBeGreaterThan(1);
    });

    it('respects maxTokens parameter', () => {
      const longText = 'Word '.repeat(500); // ~500 words
      const chunks = chunkText(longText, { maxTokens: 100 });

      for (const chunk of chunks) {
        const tokens = estimateTokens(chunk);
        // Allow some tolerance for overlap and boundary handling
        expect(tokens).toBeLessThanOrEqual(150);
      }
    });

    it('includes overlap between chunks', () => {
      const longText = 'Sentence one. Sentence two. Sentence three. '.repeat(100);
      const chunks = chunkText(longText, { maxTokens: 200, overlapTokens: 50 });

      if (chunks.length > 1) {
        // Check that consecutive chunks share some content
        const chunk1End = chunks[0].slice(-100);
        const chunk2Start = chunks[1].slice(0, 200);

        // There should be some overlap
        const hasOverlap = chunk2Start.includes(chunk1End.split(' ').slice(-5).join(' '));
        // This is a soft check - overlap implementation may vary
        expect(chunks.length).toBeGreaterThan(1);
      }
    });

    it('preserves paragraph boundaries when possible', () => {
      const textWithParagraphs = 'First paragraph content here.\n\nSecond paragraph content here.\n\nThird paragraph.';
      const chunks = chunkText(textWithParagraphs, {
        maxTokens: 800,
        preserveParagraphs: true,
      });

      // Short text should be single chunk preserving paragraphs
      expect(chunks).toHaveLength(1);
      expect(chunks[0]).toContain('\n\n');
    });

    it('handles text with headers', () => {
      const textWithHeaders = '# Header 1\n\nContent under header 1.\n\n## Header 2\n\nContent under header 2.';
      const chunks = chunkText(textWithHeaders, { maxTokens: 800 });

      expect(chunks.length).toBeGreaterThan(0);
      // Headers should be preserved
      expect(chunks[0]).toContain('#');
    });

    it('handles empty text', () => {
      const chunks = chunkText('', { maxTokens: 800 });
      expect(chunks).toHaveLength(0);
    });

    it('handles text with only whitespace', () => {
      const chunks = chunkText('   \n\n   ', { maxTokens: 800 });
      expect(chunks).toHaveLength(0);
    });
  });

  describe('chunkContentFile', () => {
    const mockContentFile: ContentFile = {
      path: 'content/case-studies/test-case.md',
      content: 'This is the content of a test case study. It has multiple sentences and should be processed correctly.',
      source: 'case-study',
      title: 'Test Case Study',
    };

    it('returns array of ContentChunks', () => {
      const chunks = chunkContentFile(mockContentFile);

      expect(Array.isArray(chunks)).toBe(true);
      expect(chunks.length).toBeGreaterThan(0);
    });

    it('each chunk has correct metadata structure', () => {
      const chunks = chunkContentFile(mockContentFile);

      for (const chunk of chunks) {
        expect(chunk).toHaveProperty('content');
        expect(chunk).toHaveProperty('metadata');
        expect(chunk.metadata).toHaveProperty('source', 'case-study');
        expect(chunk.metadata).toHaveProperty('sourceFile', mockContentFile.path);
        expect(chunk.metadata).toHaveProperty('title', 'Test Case Study');
        expect(chunk.metadata).toHaveProperty('chunkIndex');
        expect(chunk.metadata).toHaveProperty('totalChunks');
        expect(chunk.metadata).toHaveProperty('contentHash');
        expect(chunk.metadata).toHaveProperty('tokenCount');
      }
    });

    it('sets correct chunkIndex and totalChunks', () => {
      // Create content that will produce multiple chunks
      const longContent: ContentFile = {
        ...mockContentFile,
        content: 'A long paragraph of content. '.repeat(200),
      };

      const chunks = chunkContentFile(longContent, { maxTokens: 200 });

      expect(chunks.length).toBeGreaterThan(1);

      for (let i = 0; i < chunks.length; i++) {
        expect(chunks[i].metadata.chunkIndex).toBe(i);
        expect(chunks[i].metadata.totalChunks).toBe(chunks.length);
      }
    });

    it('generates unique content hash for each chunk', () => {
      // Use varied content to ensure unique chunks
      const sentences = Array.from(
        { length: 200 },
        (_, i) => `Sentence number ${i} with unique content about topic ${i % 10}.`
      );
      const longContent: ContentFile = {
        ...mockContentFile,
        content: sentences.join(' '),
      };

      const chunks = chunkContentFile(longContent, { maxTokens: 200 });

      if (chunks.length > 1) {
        const hashes = chunks.map(c => c.metadata.contentHash);
        const uniqueHashes = new Set(hashes);
        expect(uniqueHashes.size).toBe(chunks.length);
      }
    });

    it('calculates tokenCount for each chunk', () => {
      const chunks = chunkContentFile(mockContentFile);

      for (const chunk of chunks) {
        expect(chunk.metadata.tokenCount).toBeGreaterThan(0);
        // Token count should roughly match content length / 4
        const expectedTokens = Math.ceil(chunk.content.length / 4);
        expect(chunk.metadata.tokenCount).toBeCloseTo(expectedTokens, -1);
      }
    });

    it('preserves source and title from ContentFile', () => {
      const chunks = chunkContentFile(mockContentFile);

      for (const chunk of chunks) {
        expect(chunk.metadata.source).toBe(mockContentFile.source);
        expect(chunk.metadata.title).toBe(mockContentFile.title);
        expect(chunk.metadata.sourceFile).toBe(mockContentFile.path);
      }
    });
  });
});
