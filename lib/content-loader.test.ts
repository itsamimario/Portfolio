/**
 * Tests for content-loader module
 * TDD: Write tests FIRST before implementation
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  loadMarkdownFile,
  loadAllContent,
  getSourceFromPath,
  extractTitle,
} from './content-loader';
import path from 'path';

describe('content-loader', () => {
  describe('getSourceFromPath', () => {
    it('returns "about" for content/about.md', () => {
      expect(getSourceFromPath('content/about.md')).toBe('about');
      expect(getSourceFromPath('/path/to/content/about.md')).toBe('about');
    });

    it('returns "timeline" for content/timeline.md', () => {
      expect(getSourceFromPath('content/timeline.md')).toBe('timeline');
      expect(getSourceFromPath('/path/to/content/timeline.md')).toBe('timeline');
    });

    it('returns "case-study" for content/case-studies/*.md', () => {
      expect(getSourceFromPath('content/case-studies/catchit.md')).toBe('case-study');
      expect(getSourceFromPath('/path/to/content/case-studies/ratedpower.md')).toBe('case-study');
    });

    it('returns "playbook" for content/playbook.md', () => {
      expect(getSourceFromPath('content/playbook.md')).toBe('playbook');
      expect(getSourceFromPath('/path/to/content/playbook.md')).toBe('playbook');
    });

    it('defaults to "about" for unknown paths', () => {
      expect(getSourceFromPath('unknown/path.md')).toBe('about');
    });
  });

  describe('extractTitle', () => {
    it('extracts title from first H1 heading', () => {
      const content = '# My Title\n\nSome content here.';
      expect(extractTitle(content, 'test.md')).toBe('My Title');
    });

    it('extracts title from frontmatter if present', () => {
      const content = '---\ntitle: Frontmatter Title\n---\n\n# Heading\n\nContent';
      expect(extractTitle(content, 'test.md')).toBe('Frontmatter Title');
    });

    it('falls back to filename if no title found', () => {
      const content = 'No heading here, just content.';
      expect(extractTitle(content, 'my-document.md')).toBe('my-document');
    });

    it('handles multiple H1 headings (takes first)', () => {
      const content = '# First Title\n\n# Second Title\n\nContent';
      expect(extractTitle(content, 'test.md')).toBe('First Title');
    });

    it('trims whitespace from title', () => {
      const content = '#   Spaced Title   \n\nContent';
      expect(extractTitle(content, 'test.md')).toBe('Spaced Title');
    });
  });

  describe('loadMarkdownFile', () => {
    // These tests use actual files - integration style
    const contentDir = path.join(process.cwd(), 'content');

    it('loads about.md and returns ContentFile', async () => {
      const result = await loadMarkdownFile(path.join(contentDir, 'about.md'));

      expect(result.path).toContain('about.md');
      expect(result.source).toBe('about');
      expect(result.title).toBeTruthy();
      expect(result.content).toBeTruthy();
    });

    it('throws error for non-existent file', async () => {
      await expect(
        loadMarkdownFile(path.join(contentDir, 'nonexistent.md'))
      ).rejects.toThrow();
    });

    it('correctly identifies source type for case study', async () => {
      const caseStudyPath = path.join(contentDir, 'case-studies', 'portfolio.md');
      const result = await loadMarkdownFile(caseStudyPath);

      expect(result.source).toBe('case-study');
    });

    it('correctly identifies source type for timeline', async () => {
      const result = await loadMarkdownFile(path.join(contentDir, 'timeline.md'));
      expect(result.source).toBe('timeline');
    });
  });

  describe('loadAllContent', () => {
    const contentDir = path.join(process.cwd(), 'content');

    it('loads all markdown files from content directory', async () => {
      const results = await loadAllContent(contentDir);

      expect(results.length).toBeGreaterThan(0);
      expect(results.some(r => r.source === 'about')).toBe(true);
      expect(results.some(r => r.source === 'timeline')).toBe(true);
      expect(results.some(r => r.source === 'case-study')).toBe(true);
    });

    it('returns array with expected structure', async () => {
      const results = await loadAllContent(contentDir);

      for (const result of results) {
        expect(result).toHaveProperty('path');
        expect(result).toHaveProperty('content');
        expect(result).toHaveProperty('source');
        expect(result).toHaveProperty('title');
      }
    });

    it('skips map.md file', async () => {
      const results = await loadAllContent(contentDir);

      expect(results.some(r => r.path.includes('map.md'))).toBe(false);
    });

    it('returns empty array for non-existent directory', async () => {
      const results = await loadAllContent('/nonexistent/directory');
      expect(results).toEqual([]);
    });
  });
});
