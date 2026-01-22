/**
 * Tests for chat service
 * TDD: Write tests FIRST before implementation
 */

import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Set environment variables before imports
process.env.OPENAI_API_KEY = 'test-openai-key';
process.env.ANTHROPIC_API_KEY = 'test-anthropic-key';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';

// Mock OpenAI
const mockOpenAICreate = jest.fn();
jest.mock('openai', () => {
  const MockOpenAI = function () {
    return {
      embeddings: {
        create: mockOpenAICreate,
      },
    };
  };
  return { default: MockOpenAI, __esModule: true };
});

// Mock Anthropic
const mockAnthropicCreate = jest.fn();
jest.mock('@anthropic-ai/sdk', () => {
  const MockAnthropic = function () {
    return {
      messages: {
        create: mockAnthropicCreate,
      },
    };
  };
  return { default: MockAnthropic, __esModule: true };
});

// Mock database
const mockVectorSearch = jest.fn();
jest.mock('./db', () => ({
  vectorSearch: mockVectorSearch,
  query: jest.fn(),
  getPool: jest.fn(),
}));

describe('chat service', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock for OpenAI embeddings
    mockOpenAICreate.mockResolvedValue({
      data: [{ embedding: new Array(1536).fill(0.1) }],
    });

    // Default mock for vector search results
    mockVectorSearch.mockResolvedValue([
      {
        id: 1,
        content: 'Mario is a Product Manager with experience in AI.',
        metadata: { source: 'about', title: 'About' },
        similarity: 0.92,
      },
      {
        id: 2,
        content: 'He worked at RatedPower building solar design software.',
        metadata: { source: 'case-study', title: 'RatedPower' },
        similarity: 0.85,
      },
    ]);

    // Default mock for Claude response
    mockAnthropicCreate.mockResolvedValue({
      content: [
        {
          type: 'text',
          text: 'Based on the portfolio, Mario is an experienced Product Manager.',
        },
      ],
    });
  });

  describe('searchRelevantContent', () => {
    it('embeds the query and searches for similar content', async () => {
      const { searchRelevantContent } = await import('./chat');
      const query = 'What is Mario experience?';

      const results = await searchRelevantContent(query);

      expect(mockOpenAICreate).toHaveBeenCalled();
      expect(mockVectorSearch).toHaveBeenCalled();
      expect(results.length).toBeGreaterThan(0);
    });

    it('returns content with similarity scores', async () => {
      const { searchRelevantContent } = await import('./chat');
      const query = 'Tell me about RatedPower';

      const results = await searchRelevantContent(query);

      expect(results[0]).toHaveProperty('content');
      expect(results[0]).toHaveProperty('similarity');
      expect(results[0].similarity).toBeGreaterThan(0);
    });

    it('limits results to specified count', async () => {
      const { searchRelevantContent } = await import('./chat');

      await searchRelevantContent('test query', 3);

      expect(mockVectorSearch).toHaveBeenCalledWith(
        expect.any(Array),
        3,
        undefined
      );
    });
  });

  describe('generateChatResponse', () => {
    it('generates response using Claude with context', async () => {
      const { generateChatResponse } = await import('./chat');
      const question = 'What is Mario background?';

      const response = await generateChatResponse(question);

      expect(mockAnthropicCreate).toHaveBeenCalled();
      expect(response).toHaveProperty('answer');
      expect(response.answer.length).toBeGreaterThan(0);
    });

    it('includes sources in response', async () => {
      const { generateChatResponse } = await import('./chat');
      const question = 'What projects has Mario worked on?';

      const response = await generateChatResponse(question);

      expect(response).toHaveProperty('sources');
      expect(Array.isArray(response.sources)).toBe(true);
    });

    it('passes context from vector search to Claude', async () => {
      const { generateChatResponse } = await import('./chat');
      const question = 'Tell me about Mario';

      await generateChatResponse(question);

      // Verify Claude was called with context in the prompt
      expect(mockAnthropicCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining('Mario is a Product Manager'),
            }),
          ]),
        })
      );
    });
  });

  describe('chat', () => {
    it('handles full chat flow from question to answer', async () => {
      const { chat } = await import('./chat');
      const question = 'What experience does Mario have?';

      const response = await chat(question);

      expect(response).toHaveProperty('answer');
      expect(response).toHaveProperty('sources');
      expect(mockOpenAICreate).toHaveBeenCalled();
      expect(mockVectorSearch).toHaveBeenCalled();
      expect(mockAnthropicCreate).toHaveBeenCalled();
    });

    it('throws error for empty question', async () => {
      const { chat } = await import('./chat');

      await expect(chat('')).rejects.toThrow();
    });

    it('handles questions with no relevant content gracefully', async () => {
      mockVectorSearch.mockResolvedValueOnce([]);

      const { chat } = await import('./chat');
      const response = await chat('Random unrelated question');

      expect(response).toHaveProperty('answer');
    });
  });

  describe('isGreeting', () => {
    it('detects simple greetings', async () => {
      const { isGreeting } = await import('./chat');

      expect(isGreeting('hi')).toBe(true);
      expect(isGreeting('hello')).toBe(true);
      expect(isGreeting('hey')).toBe(true);
      expect(isGreeting('Hi!')).toBe(true);
      expect(isGreeting('Hello there')).toBe(true);
    });

    it('does not detect questions as greetings', async () => {
      const { isGreeting } = await import('./chat');

      expect(isGreeting('What is your experience?')).toBe(false);
      expect(isGreeting('Tell me about Mario')).toBe(false);
      expect(isGreeting('Hi, what projects have you worked on?')).toBe(false);
    });

    it('handles edge cases', async () => {
      const { isGreeting } = await import('./chat');

      expect(isGreeting('hiya')).toBe(true);
      expect(isGreeting('howdy')).toBe(true);
      expect(isGreeting('good morning')).toBe(true);
      expect(isGreeting('good afternoon')).toBe(true);
      expect(isGreeting('hola')).toBe(true); // Spanish greeting
      expect(isGreeting('yo')).toBe(true);
      expect(isGreeting('heya')).toBe(true);
    });
  });

  describe('greeting responses', () => {
    it('responds to greetings without RAG search', async () => {
      const { chat } = await import('./chat');

      mockAnthropicCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: "Hello! I'm happy to help you learn about Mario's work.",
          },
        ],
      });

      const response = await chat('hi');

      // Should NOT call vector search for greetings
      expect(mockVectorSearch).not.toHaveBeenCalled();
      expect(mockOpenAICreate).not.toHaveBeenCalled();
      expect(response.answer).toBeTruthy();
      expect(response.sources).toHaveLength(0);
    });

    it('uses greeting-specific prompt for greetings', async () => {
      const { chat } = await import('./chat');

      await chat('hello');

      // Verify Claude was called with greeting-specific instructions
      expect(mockAnthropicCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining('greeting'),
            }),
          ]),
        })
      );
    });
  });

  describe('personality and tone', () => {
    it('system prompt includes Mario personality', async () => {
      const { generateChatResponse } = await import('./chat');

      await generateChatResponse('What is your background?');

      expect(mockAnthropicCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          system: expect.stringContaining('Mario'),
        })
      );
    });

    it('system prompt encourages first-person voice', async () => {
      const { generateChatResponse } = await import('./chat');

      await generateChatResponse('Tell me about yourself');

      expect(mockAnthropicCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          system: expect.stringMatching(/first.person|speak as Mario|I am Mario/i),
        })
      );
    });
  });
});
