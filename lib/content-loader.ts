/**
 * Content loader for RAG chatbot
 * Loads and parses markdown files from the content directory
 */

import fs from 'fs/promises';
import path from 'path';
import type { ContentFile, ContentSource } from '../types/embeddings';

/**
 * Files to skip (contain mostly TODOs or are not useful for RAG)
 */
const SKIP_FILES = ['map.md'];

/**
 * Regex patterns for content filtering
 */
const TODO_PATTERNS = [
  /\[TODO[^\]]*\]/gi,         // [TODO: something] or [TODO]
  /TODO:/gi,                   // TODO: something
  /\*\*TODO\*\*/gi,           // **TODO**
];

/**
 * Determine content source from file path
 */
export function getSourceFromPath(filePath: string): ContentSource {
  const normalizedPath = filePath.toLowerCase();

  if (normalizedPath.includes('case-studies') || normalizedPath.includes('case-study')) {
    return 'case-study';
  }
  if (normalizedPath.includes('timeline')) {
    return 'timeline';
  }
  if (normalizedPath.includes('playbook')) {
    return 'playbook';
  }
  if (normalizedPath.includes('about')) {
    return 'about';
  }

  // Default fallback
  return 'about';
}

/**
 * Extract title from markdown content
 * Priority: frontmatter title > first H1 > filename
 */
export function extractTitle(content: string, filePath: string): string {
  // Try frontmatter title first
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const titleMatch = frontmatterMatch[1].match(/^title:\s*(.+)$/m);
    if (titleMatch) {
      return titleMatch[1].trim().replace(/^["']|["']$/g, '');
    }
  }

  // Try first H1 heading
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }

  // Fall back to filename without extension
  const filename = path.basename(filePath, '.md');
  return filename;
}

/**
 * Filter out TODO placeholders from content
 */
function filterTodos(content: string): string {
  let filtered = content;

  for (const pattern of TODO_PATTERNS) {
    filtered = filtered.replace(pattern, '');
  }

  // Remove empty lines that might result from filtering
  filtered = filtered.replace(/\n{3,}/g, '\n\n');

  return filtered.trim();
}

/**
 * Load a single markdown file
 */
export async function loadMarkdownFile(filePath: string): Promise<ContentFile> {
  const rawContent = await fs.readFile(filePath, 'utf-8');
  const content = filterTodos(rawContent);
  const source = getSourceFromPath(filePath);
  const title = extractTitle(rawContent, filePath);

  return {
    path: filePath,
    content,
    source,
    title,
  };
}

/**
 * Check if a file should be skipped
 */
function shouldSkipFile(filename: string): boolean {
  return SKIP_FILES.includes(filename.toLowerCase());
}

/**
 * Recursively load all markdown files from a directory
 */
export async function loadAllContent(contentDir: string): Promise<ContentFile[]> {
  const results: ContentFile[] = [];

  async function processDirectory(dirPath: string): Promise<void> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Skip certain files
        if (shouldSkipFile(entry.name)) {
          continue;
        }

        try {
          const contentFile = await loadMarkdownFile(fullPath);
          results.push(contentFile);
        } catch (error) {
          console.error(`Failed to load ${fullPath}:`, error);
        }
      }
    }
  }

  try {
    await processDirectory(contentDir);
  } catch (error) {
    // Directory doesn't exist or is empty
    console.error(`Failed to read directory ${contentDir}:`, error);
  }

  return results;
}
