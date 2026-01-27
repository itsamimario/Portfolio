#!/usr/bin/env npx tsx

/**
 * Eval Runner - Phase 1: Error Analysis
 * Runs test questions through the chatbot and saves results for review
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { chat } from '../lib/chat';

interface TestQuestion {
  id: number;
  question: string;
  category: string;
  language: string;
}

interface EvalResult {
  id: number;
  question: string;
  category: string;
  language: string;
  response: string;
  suggestions: string[];
  sources: number;
  timestamp: string;
  // To be filled by human reviewer:
  pass: boolean | null;
  failure_mode: string | null;
  critique: string | null;
}

async function runEval(): Promise<void> {
  const startTime = Date.now();

  // Load test questions
  const questionsPath = path.join(__dirname, 'test-questions.json');
  const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
  const questions: TestQuestion[] = questionsData.questions;

  console.log(`🧪 Running eval on ${questions.length} questions...\n`);

  const results: EvalResult[] = [];

  for (const q of questions) {
    process.stdout.write(`  [${q.id}/${questions.length}] "${q.question.slice(0, 40)}..." `);

    try {
      const response = await chat(q.question);

      results.push({
        id: q.id,
        question: q.question,
        category: q.category,
        language: q.language,
        response: response.answer,
        suggestions: response.suggestions || [],
        sources: response.sources?.length || 0,
        timestamp: new Date().toISOString(),
        // Human review fields
        pass: null,
        failure_mode: null,
        critique: null,
      });

      console.log('✓');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      results.push({
        id: q.id,
        question: q.question,
        category: q.category,
        language: q.language,
        response: `ERROR: ${errorMessage}`,
        suggestions: [],
        sources: 0,
        timestamp: new Date().toISOString(),
        pass: false,
        failure_mode: 'error',
        critique: errorMessage,
      });

      console.log('✗ ERROR');
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Save results
  const timestamp = new Date().toISOString().split('T')[0];
  const outputPath = path.join(__dirname, `results-${timestamp}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  // Also create a markdown file for easier review
  const mdPath = path.join(__dirname, `results-${timestamp}.md`);
  const mdContent = generateMarkdownReport(results);
  fs.writeFileSync(mdPath, mdContent);

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n✅ Eval complete in ${duration}s`);
  console.log(`   Results saved to:`);
  console.log(`   - ${outputPath} (JSON for processing)`);
  console.log(`   - ${mdPath} (Markdown for review)`);
}

function generateMarkdownReport(results: EvalResult[]): string {
  const lines: string[] = [];

  lines.push('# Eval Results - Human Review');
  lines.push('');
  lines.push('Review each response and mark:');
  lines.push('- **PASS** or **FAIL**');
  lines.push('- **Failure mode** (if failed)');
  lines.push('- **Critique** (why it failed)');
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const r of results) {
    lines.push(`## Q${r.id}: ${r.question}`);
    lines.push('');
    lines.push(`**Category:** ${r.category} | **Language:** ${r.language} | **Sources:** ${r.sources}`);
    lines.push('');
    lines.push('**Response:**');
    lines.push('');
    lines.push(`> ${r.response.replace(/\n/g, '\n> ')}`);
    lines.push('');
    if (r.suggestions.length > 0) {
      lines.push('**Suggestions:** ' + r.suggestions.join(' | '));
      lines.push('');
    }
    lines.push('**Review:**');
    lines.push('- [ ] PASS');
    lines.push('- [ ] FAIL');
    lines.push('- Failure mode: _______________');
    lines.push('- Critique: _______________');
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}

// Run
runEval().catch(console.error);
