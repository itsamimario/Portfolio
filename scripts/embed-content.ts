#!/usr/bin/env npx ts-node

/**
 * CLI script to embed portfolio content into the database
 *
 * Usage:
 *   npx ts-node scripts/embed-content.ts           # Embed new content
 *   npx ts-node scripts/embed-content.ts --clear   # Clear and re-embed all
 *   npx ts-node scripts/embed-content.ts --dry-run # Preview without embedding
 */

import path from 'path';
import { loadAllContent } from '../lib/content-loader';
import { loadDataContent } from '../lib/data-content-loader';
import { chunkContentFile } from '../lib/chunker';
import {
  embedChunks,
  storeEmbeddings,
  checkExistingHash,
  clearAllEmbeddings,
} from '../lib/openai-embeddings';
import type { ContentChunk, EmbeddingSummary, ContentSource } from '../types/embeddings';

/**
 * Parse CLI arguments
 */
function parseArgs(): { clear: boolean; dryRun: boolean } {
  const args = process.argv.slice(2);
  return {
    clear: args.includes('--clear'),
    dryRun: args.includes('--dry-run'),
  };
}

/**
 * Main embedding function
 */
async function embedContent(): Promise<void> {
  const startTime = Date.now();
  const { clear, dryRun } = parseArgs();

  console.log('🚀 Starting content embedding...\n');

  // Check for required environment variable (not needed for dry-run)
  if (!dryRun && !process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY environment variable is not set');
    process.exit(1);
  }

  // Clear existing embeddings if requested
  if (clear && !dryRun) {
    console.log('🗑️  Clearing existing embeddings...');
    const deleted = await clearAllEmbeddings();
    console.log(`   Deleted ${deleted} existing embeddings\n`);
  }

  // Load markdown content files
  const contentDir = path.join(process.cwd(), 'content');
  console.log(`📂 Loading markdown content from ${contentDir}...`);
  const markdownFiles = await loadAllContent(contentDir);
  console.log(`   Found ${markdownFiles.length} markdown files`);

  // Load structured data content (case studies, timeline, bio, skills)
  console.log(`📂 Loading structured data content...`);
  const dataFiles = loadDataContent();
  console.log(`   Found ${dataFiles.length} data content files`);

  // Combine all content
  const files = [...markdownFiles, ...dataFiles];
  console.log(`   Total: ${files.length} content files\n`);

  if (files.length === 0) {
    console.log('⚠️  No content files found. Nothing to embed.');
    return;
  }

  // Chunk all content
  console.log('✂️  Chunking content...');
  const allChunks: ContentChunk[] = [];
  const bySource: Record<ContentSource, number> = {
    about: 0,
    timeline: 0,
    'case-study': 0,
    playbook: 0,
  };

  for (const file of files) {
    const chunks = chunkContentFile(file);
    allChunks.push(...chunks);
    bySource[file.source] += chunks.length;
    console.log(`   ${file.title}: ${chunks.length} chunks`);
  }

  console.log(`\n   Total chunks: ${allChunks.length}`);
  console.log(`   By source:`);
  Object.entries(bySource).forEach(([source, count]) => {
    if (count > 0) {
      console.log(`     - ${source}: ${count}`);
    }
  });
  console.log('');

  // Filter out already embedded chunks (unless --clear or --dry-run was used)
  let chunksToEmbed = allChunks;
  let skipped = 0;

  if (!clear && !dryRun) {
    console.log('🔍 Checking for existing embeddings...');
    const newChunks: ContentChunk[] = [];

    for (const chunk of allChunks) {
      try {
        const exists = await checkExistingHash(chunk.metadata.contentHash);
        if (exists) {
          skipped++;
        } else {
          newChunks.push(chunk);
        }
      } catch {
        // Database might not be available, embed anyway
        newChunks.push(chunk);
      }
    }

    chunksToEmbed = newChunks;
    console.log(`   Skipping ${skipped} already embedded chunks`);
    console.log(`   ${chunksToEmbed.length} new chunks to embed\n`);
  }

  if (chunksToEmbed.length === 0) {
    console.log('✅ All content is already embedded. Nothing to do.');
    return;
  }

  // Dry run mode - just show what would be done
  if (dryRun) {
    console.log('🔎 DRY RUN - Would embed the following chunks:\n');
    chunksToEmbed.forEach((chunk, i) => {
      console.log(`   ${i + 1}. [${chunk.metadata.source}] ${chunk.metadata.title}`);
      console.log(`      Chunk ${chunk.metadata.chunkIndex + 1}/${chunk.metadata.totalChunks}`);
      console.log(`      ~${chunk.metadata.tokenCount} tokens\n`);
    });
    return;
  }

  // Generate embeddings
  console.log('🧠 Generating embeddings (this may take a moment)...');
  const embeddedChunks = await embedChunks(chunksToEmbed);
  console.log(`   Generated ${embeddedChunks.length} embeddings\n`);

  // Store in database
  console.log('💾 Storing embeddings in database...');
  const ids = await storeEmbeddings(embeddedChunks);
  console.log(`   Stored ${ids.length} embeddings\n`);

  // Summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const summary: EmbeddingSummary = {
    totalFiles: files.length,
    totalChunks: allChunks.length,
    bySource,
    duration: parseFloat(duration),
    skipped,
  };

  console.log('=' .repeat(50));
  console.log('✅ EMBEDDING COMPLETE');
  console.log('=' .repeat(50));
  console.log(`   Files processed: ${summary.totalFiles}`);
  console.log(`   Total chunks: ${summary.totalChunks}`);
  console.log(`   Chunks embedded: ${ids.length}`);
  console.log(`   Chunks skipped: ${summary.skipped}`);
  console.log(`   Duration: ${summary.duration}s`);
  console.log('=' .repeat(50));
}

// Run the script
embedContent().catch(error => {
  console.error('❌ Embedding failed:', error);
  process.exit(1);
});
