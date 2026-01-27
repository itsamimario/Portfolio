/**
 * Chat service for RAG chatbot
 * Implements semantic search with vector embeddings and Claude-powered responses
 */

import Anthropic from '@anthropic-ai/sdk';
import { generateEmbedding } from './openai-embeddings';
import { vectorSearch } from './db';
import type { ChatResponse, ChatSource, SearchResult } from '../types/chat';

/**
 * Greeting patterns for detection
 * Matches common greetings but NOT greetings followed by questions
 */
const GREETING_PATTERNS = [
  /^hi\s*!*$/i, // hi, hi!, hi!!
  /^hi\s+there$/i, // hi there
  /^hello(\s+there)?$/i, // hello, hello there
  /^hey\s*!*$/i, // hey, hey!, hey!!
  /^heya$/i,
  /^hiya$/i,
  /^howdy$/i,
  /^yo\s*!*$/i, // yo, yo!
  /^good\s+(morning|afternoon|evening)$/i,
  /^greetings$/i,
  /^what'?s\s+up\??$/i, // what's up, whats up?
  /^sup\??$/i, // sup, sup?
  /^hola$/i, // Spanish greeting (Mario speaks Spanish)
];

// Max length for a greeting (longest: "good afternoon" = 14 chars, with margin)
const MAX_GREETING_LENGTH = 30;

/**
 * Check if a message is a simple greeting (not a greeting + question)
 */
export function isGreeting(message: string): boolean {
  const trimmed = message.trim().toLowerCase();

  // If message contains a question mark, it's likely a question not just a greeting
  if (trimmed.includes('?')) {
    return false;
  }

  // If message is too long, it's probably not just a greeting
  if (trimmed.length > MAX_GREETING_LENGTH) {
    return false;
  }

  return GREETING_PATTERNS.some((pattern) => pattern.test(trimmed));
}

/**
 * Get Anthropic client instance
 */
function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
  return new Anthropic({ apiKey });
}

/**
 * Search for relevant content based on query
 * Embeds the query and performs vector similarity search
 */
export async function searchRelevantContent(
  query: string,
  limit: number = 5,
  source?: string
): Promise<SearchResult[]> {
  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(query);

  // Search for similar content in the database
  const results = await vectorSearch(queryEmbedding, limit, source);

  return results;
}

/**
 * Build system prompt for the RAG chatbot
 * Establishes Mario's personality and communication style
 */
function buildSystemPrompt(): string {
  return `You are Mario Bennekers' AI assistant on his portfolio website. You speak as Mario in first person ("I", "my", "me").

## Who Mario Is
- Product Manager & Technical Builder based in Madrid
- 6+ years leading cross-functional teams across 3 continents
- Currently Founder at CatchIT! (location-based gaming) and Interim Product Lead consultant
- Languages: Spanish (native), English (fluent), Dutch (fluent)

## Language Rules (CRITICAL)
- **Match the user's language**: If they write in Spanish, respond in Spanish. If English, respond in English.
- **Stay in their language**: Once they switch languages, continue in that language for all future responses.
- Spanish example: "¡Claro! Trabajé en [RatedPower](/case-studies/ratedpower-topography) durante 3 años..."

## Response Style
- **Be concise**: 2-3 sentences max for simple questions, 4-5 for complex ones
- **Conversational**: Like chatting with a colleague, not writing an essay
- **First person**: "I built..." not "Mario built..."
- **NEVER start with praise**: Do NOT say "Great question!", "That's a great question!", "Good question!" or similar. Just answer directly.
- **Team credit**: When describing achievements, say "my team and I" or "we built" rather than "I developed" alone. Product work is collaborative.
- **Stay professional**: Only mention personal background (hobbies, civil engineering degree, etc.) when directly relevant to the question. Don't volunteer personal details in professional questions.
- **Business impact first**: When discussing achievements, lead with business results (revenue, customer wins) not team size or process changes.
- **Tech stack accuracy**: When asked about tech stack for a SPECIFIC project (CatchIT, Maxem, RatedPower, etc.), use ONLY the techStack listed in that case study. When asked about general skills or "what technologies do you know", use the skills section. Never mix them up.
- **Skill levels**: NEVER mention exact percentages for skills (like "65% proficiency"). Instead, for skills at 90%+ say "I'm an expert in..." and for others say "I'm confident with..." or "I have solid experience in...".
- **Stay in character**: ALWAYS speak as Mario in first person. Never say "his experience" or "Mario's work" - always say "my experience" or "my work". You ARE Mario.

## Inline Links (ALWAYS USE)
ALWAYS link to relevant pages when mentioning them. Never mention a project without linking it.

Available links:
- About: [my background](/about) or [sobre mí](/about)
- CatchIT!: [CatchIT!](/case-studies/catchit-product-conceptualization)
- RatedPower: [topography tool](/case-studies/ratedpower-topography), [financial calculator](/case-studies/ratedpower-financial-calculator), [CRM integration](/case-studies/ratedpower-crm-integration)
- Maxem: [smart energy algorithm](/case-studies/maxem-smart-energy-algorithm), [portable battery system](/case-studies/maxem-portable-battery-system)
- This portfolio: [this portfolio](/case-studies/portfolio)
- CV download: [download my CV](/files/CV%20-%20Mario%20Bennekers.pdf)
- Contact: [mario.bennekers@gmail.com](mailto:mario.bennekers@gmail.com), [LinkedIn](https://www.linkedin.com/in/mariobennekers/), [GitHub](https://github.com/itsamimario)

**Link Rules:**
- NEVER repeat the same link twice in one response
- NEVER link to external sites (like react.dev) - only link to pages within this portfolio
- NEVER link /about when discussing a specific project - link to that project's case study instead
- When asked about CV, ALWAYS provide the download link
- When mentioning email/LinkedIn/GitHub, include the actual link
- NEVER link to case studies that are under construction (catchit-ai-chatbot is under construction)

Example good response:
"I led the [topography tool](/case-studies/ratedpower-topography) at RatedPower - it calculates earthwork costs for solar plants. Check out [my background](/about) for the full story!"

## Rules
- Answer ONLY from provided context
- NO bullet point lists - write flowing sentences
- NO "sources" section - integrate references as links
- ALWAYS include at least one relevant link in your response
- If unsure, suggest what you CAN talk about
- End with a light invite to ask more

## Follow-up Suggestions
After your answer, add EXACTLY this delimiter on its own line:
---SUGGESTIONS---
Then provide exactly 3 short follow-up questions (one per line) that the visitor might want to ask next. Keep each under 40 characters. Do NOT number them.

IMPORTANT for suggestions:
- Suggestions should BROADEN the conversation to new topics, NOT go deeper into what was just discussed
- If the question was about a specific skill (e.g., Python), suggest other areas (projects, experience, other skills)
- If the question was already detailed/technical, suggest lighter topics
- NEVER repeat or rephrase what was already answered
- Good pattern: answered about X → suggest Y and Z (different topics)
- ALWAYS use second person ("your") in suggestions, as if the visitor is asking Mario directly. Say "Tell me about your projects" NOT "Tell me about my projects"`;
}

/**
 * Build greeting prompt - used when user sends a simple greeting
 */
function buildGreetingPrompt(greeting: string): string {
  // Sanitize greeting to prevent prompt injection (defense in depth)
  const sanitizedGreeting = greeting.slice(0, 50).replace(/["\n\r]/g, '');

  return `The visitor just sent a greeting: "${sanitizedGreeting}"

Respond warmly as Mario's AI assistant. Introduce yourself briefly and invite them to ask about:
- My professional background and experience
- Case studies and projects I've worked on
- My skills in Product Management and technical building
- My current work at CatchIT!

Keep it friendly, concise (2-3 sentences), and welcoming.`;
}

/**
 * Sanitize user input before embedding in prompts
 * Strips control characters and null bytes
 */
function sanitizeInput(input: string): string {
  return input
    .replace(/\0/g, '') // null bytes
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // control chars (preserve \n \r \t)
}

/**
 * Build user prompt with context from vector search
 */
function buildUserPrompt(question: string, context: SearchResult[]): string {
  const sanitizedQuestion = sanitizeInput(question);
  if (context.length === 0) {
    return `The visitor asked the following question:
<user_question>${sanitizedQuestion}</user_question>

No relevant context was found in the portfolio. Please let the user know you don't have information to answer their question.`;
  }

  const contextText = context
    .map((result, i) => {
      const source = result.metadata?.title || result.source || 'Unknown';
      return `[Source ${i + 1}: ${source}]\n${result.content}`;
    })
    .join('\n\n');

  return `Context from Mario's portfolio:
${contextText}

The visitor asked the following question:
<user_question>${sanitizedQuestion}</user_question>

Please answer the question based on the context provided above.`;
}

/**
 * Parse suggestions from Claude's response using the delimiter
 * Returns the answer text and an array of suggestion strings
 */
function parseSuggestions(rawResponse: string): { answer: string; suggestions: string[] } {
  const delimiter = '---SUGGESTIONS---';
  const delimiterIndex = rawResponse.indexOf(delimiter);

  if (delimiterIndex === -1) {
    return { answer: rawResponse.trim(), suggestions: [] };
  }

  const answer = rawResponse.slice(0, delimiterIndex).trim();
  const suggestionsText = rawResponse.slice(delimiterIndex + delimiter.length).trim();
  const suggestions = suggestionsText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line.length <= 60)
    .slice(0, 3);

  return { answer, suggestions };
}

/**
 * Convert search results to chat sources
 */
function toSources(results: SearchResult[]): ChatSource[] {
  return results.map((result) => ({
    content: result.content,
    source: result.source || 'unknown',
    title: result.metadata?.title,
    similarity: result.similarity,
  }));
}

/**
 * Generate a chat response using Claude with RAG context
 */
export async function generateChatResponse(
  question: string
): Promise<ChatResponse> {
  // Search for relevant content
  const searchResults = await searchRelevantContent(question);

  // Build prompts
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(question, searchResults);

  // Call Claude API
  const client = getAnthropicClient();
  const response = await client.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  });

  // Extract answer from response and parse suggestions
  const textBlock = response.content.find((block) => block.type === 'text');
  const rawText = textBlock?.type === 'text' ? textBlock.text : '';
  const { answer, suggestions } = parseSuggestions(rawText);

  return {
    answer,
    sources: toSources(searchResults),
    suggestions,
  };
}

/**
 * Generate a greeting response without RAG search
 */
async function generateGreetingResponse(
  greeting: string
): Promise<ChatResponse> {
  try {
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildGreetingPrompt(greeting);

    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 512,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    const rawText = textBlock?.type === 'text' ? textBlock.text : '';
    const { answer, suggestions } = parseSuggestions(rawText);

    return {
      answer,
      sources: [], // No sources for greetings
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    };
  } catch (error) {
    // Fallback to a static greeting if API fails
    return {
      answer:
        "Hi there! I'm happy to help you learn about my experience, projects, and skills. What would you like to know?",
      sources: [],
      suggestions: ['What have you shipped?', 'How do you work?', 'Tell me about your AI experience'],
    };
  }
}

/**
 * Main chat function - handles full flow from question to answer
 */
export async function chat(question: string): Promise<ChatResponse> {
  // Validate question
  if (!question || question.trim().length === 0) {
    throw new Error('Question cannot be empty');
  }

  const trimmedQuestion = question.trim();

  // Handle greetings without RAG search
  if (isGreeting(trimmedQuestion)) {
    return generateGreetingResponse(trimmedQuestion);
  }

  // Generate response with RAG
  return generateChatResponse(trimmedQuestion);
}
