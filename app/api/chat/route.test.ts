/**
 * Tests for chat API route
 * TDD: Write tests FIRST before implementation
 *
 * @jest-environment node
 */

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NextRequest } from 'next/server';

// Set environment variables before imports
process.env.OPENAI_API_KEY = 'test-openai-key';
process.env.ANTHROPIC_API_KEY = 'test-anthropic-key';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';

// Mock the chat service
const mockChat = jest.fn();
jest.mock('../../../lib/chat', () => ({
  chat: mockChat,
}));

describe('POST /api/chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default successful response
    mockChat.mockResolvedValue({
      answer: 'Mario is an experienced Product Manager.',
      sources: [
        {
          content: 'Mario is a Product Manager with experience in AI.',
          source: 'about',
          title: 'About',
          similarity: 0.92,
        },
      ],
    });
  });

  it('returns 200 with chat response for valid question', async () => {
    const { POST } = await import('./route');

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ question: "What is Mario's experience?" }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('answer');
    expect(data).toHaveProperty('sources');
    expect(mockChat).toHaveBeenCalledWith("What is Mario's experience?");
  });

  it('returns 400 for missing question field', async () => {
    const { POST } = await import('./route');

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.code).toBe('INVALID_REQUEST');
  });

  it('returns 400 for empty question', async () => {
    const { POST } = await import('./route');

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ question: '' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.code).toBe('EMPTY_QUESTION');
  });

  it('returns 400 for whitespace-only question', async () => {
    const { POST } = await import('./route');

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ question: '   \n\t  ' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.code).toBe('EMPTY_QUESTION');
  });

  it('returns 400 for invalid JSON body', async () => {
    const { POST } = await import('./route');

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: 'not json',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.code).toBe('INVALID_REQUEST');
  });

  it('returns 500 when chat service throws error', async () => {
    mockChat.mockRejectedValueOnce(new Error('Service unavailable'));

    const { POST } = await import('./route');

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ question: 'Test question' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toHaveProperty('error');
    expect(data.code).toBe('SERVICE_ERROR');
  });

  it('trims question before processing', async () => {
    const { POST } = await import('./route');

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ question: "  What is Mario's experience?  " }),
      headers: { 'Content-Type': 'application/json' },
    });

    await POST(request);

    expect(mockChat).toHaveBeenCalledWith("What is Mario's experience?");
  });

  it('returns response with correct content-type header', async () => {
    const { POST } = await import('./route');

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ question: 'Test' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('includes sources array in successful response', async () => {
    const { POST } = await import('./route');

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ question: 'Tell me about RatedPower' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data.sources)).toBe(true);
    expect(data.sources[0]).toHaveProperty('content');
    expect(data.sources[0]).toHaveProperty('source');
    expect(data.sources[0]).toHaveProperty('similarity');
  });
});
