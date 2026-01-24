/**
 * Data content loader for RAG chatbot
 * Converts structured data (case studies, timeline, etc.) into ContentFile objects
 * that can be chunked and embedded alongside markdown content
 */

import type { ContentFile } from '../types/embeddings';
import { caseStudies } from '../data/caseStudies';
import { timeline, education } from '../data/timeline';
import { skillCategories } from '../data/skills';
import { contact, tagline, description, valueProposition } from '../data/contact';
import { highlights } from '../data/highlights';
import type { CaseStudy } from '../types/content';

/**
 * Convert a case study into a formatted text document
 */
function formatCaseStudy(cs: CaseStudy): string {
  const lines: string[] = [];

  lines.push(`# ${cs.title}`);
  lines.push(`Role: ${cs.role} | Company: ${cs.company} | Period: ${cs.period}`);
  lines.push('');
  lines.push(cs.tagline);
  lines.push('');

  // Results
  if (cs.results && cs.results.length > 0) {
    lines.push('## Results');
    if (cs.resultsDescription) {
      lines.push(cs.resultsDescription);
    }
    for (const result of cs.results) {
      const desc = result.description ? ` (${result.description})` : '';
      lines.push(`- ${result.metric}: ${result.value}${desc}`);
    }
    lines.push('');
  }

  // Challenge
  if (cs.challenge) {
    lines.push('## Challenge');
    lines.push(cs.challenge);
    lines.push('');
  }

  // Approach
  if (cs.approach && cs.approach.length > 0) {
    lines.push('## Approach');
    for (const step of cs.approach) {
      lines.push(`### ${step.title}`);
      lines.push(step.description);
      lines.push('');
    }
  }

  // Key Decisions
  if (cs.keyDecisions && cs.keyDecisions.length > 0) {
    lines.push('## Key Decisions');
    for (const decision of cs.keyDecisions) {
      lines.push(`- ${decision}`);
    }
    lines.push('');
  }

  // Learnings
  if (cs.learnings && cs.learnings.length > 0) {
    lines.push('## Learnings');
    for (const learning of cs.learnings) {
      lines.push(`- ${learning}`);
    }
    lines.push('');
  }

  // Tech Stack
  if (cs.techStack && cs.techStack.length > 0) {
    lines.push(`## Tech Stack`);
    lines.push(cs.techStack.join(', '));
  }

  return lines.join('\n');
}

/**
 * Convert timeline entries into a formatted text document
 */
function formatTimeline(): string {
  const lines: string[] = [];

  lines.push('# Work Experience - Mario Bennekers');
  lines.push('');

  for (const entry of timeline) {
    lines.push(`## ${entry.company}`);
    if (entry.companyDescription) {
      lines.push(entry.companyDescription);
    }
    lines.push(`${entry.role} | ${entry.period} | ${entry.location}`);
    lines.push('');
    lines.push(entry.description);
    lines.push('');
  }

  // Education
  lines.push('## Education');
  lines.push(`Degree: ${education.degree}`);
  for (const uni of education.universities) {
    lines.push(`- ${uni.name} (${uni.period}) - ${uni.location}`);
  }

  return lines.join('\n');
}

/**
 * Convert about/bio data into a formatted text document
 */
function formatAbout(): string {
  const lines: string[] = [];

  lines.push('# About Mario Bennekers');
  lines.push('');
  lines.push(`## Title`);
  lines.push(tagline);
  lines.push('');
  lines.push('## Bio');
  lines.push(description);
  lines.push('');
  lines.push('## Value Proposition');
  lines.push(valueProposition);
  lines.push('');
  lines.push('## Contact');
  lines.push(`- Email: ${contact.email}`);
  lines.push(`- LinkedIn: ${contact.linkedin}`);
  lines.push(`- GitHub: ${contact.github}`);
  lines.push(`- Location: ${contact.location}`);
  lines.push(`- Timezone: ${contact.timezone}`);
  lines.push('');
  lines.push('## Impact Highlights');
  for (const h of highlights) {
    lines.push(`- ${h.metric} ${h.label} (${h.context})`);
  }

  return lines.join('\n');
}

/**
 * Convert skills data into a formatted text document
 */
function formatSkills(): string {
  const lines: string[] = [];

  lines.push('# Skills - Mario Bennekers');
  lines.push('');

  for (const category of skillCategories) {
    lines.push(`## ${category.title}`);
    for (const skill of category.skills) {
      lines.push(`- ${skill.name}: ${skill.proficiency}%`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Load all structured data as ContentFile objects
 * These complement the markdown files in the content/ directory
 */
export function loadDataContent(): ContentFile[] {
  const files: ContentFile[] = [];

  // Case studies from data/caseStudies.ts
  for (const cs of caseStudies) {
    files.push({
      path: `data/caseStudies/${cs.id}`,
      content: formatCaseStudy(cs),
      source: 'case-study',
      title: cs.title,
    });
  }

  // Timeline / work experience
  files.push({
    path: 'data/timeline',
    content: formatTimeline(),
    source: 'timeline',
    title: 'Work Experience',
  });

  // About / bio / contact
  files.push({
    path: 'data/contact',
    content: formatAbout(),
    source: 'about',
    title: 'About Mario Bennekers',
  });

  // Skills
  files.push({
    path: 'data/skills',
    content: formatSkills(),
    source: 'about',
    title: 'Skills',
  });

  return files;
}
