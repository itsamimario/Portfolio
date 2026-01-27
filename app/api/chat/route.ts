/**
 * Chat API route
 * POST /api/chat - Send a question and get a RAG-powered response
 */

import { NextRequest, NextResponse } from 'next/server';
import { chat } from '../../../lib/chat';
import { checkRateLimit } from '../../../lib/rate-limit';
import { logChat } from '../../../lib/chat-logs';
import type { ChatRequest, ChatErrorResponse } from '../../../types/chat';

/**
 * Handle chat POST requests
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Rate limiting (10 requests per minute per IP)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';
    const rateLimit = checkRateLimit(ip, 10, 60_000);

    if (!rateLimit.allowed) {
      const errorResponse: ChatErrorResponse = {
        error: `Too many requests. Please try again in ${rateLimit.resetInSeconds} seconds.`,
        code: 'RATE_LIMITED',
      };
      return NextResponse.json(errorResponse, { status: 429 });
    }

    // Parse request body
    let body: ChatRequest;
    try {
      body = await request.json();
    } catch {
      const errorResponse: ChatErrorResponse = {
        error: 'Invalid JSON in request body',
        code: 'INVALID_REQUEST',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate question field exists
    if (!body.question && body.question !== '') {
      const errorResponse: ChatErrorResponse = {
        error: 'Missing required field: question',
        code: 'INVALID_REQUEST',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate question is a string
    if (typeof body.question !== 'string') {
      const errorResponse: ChatErrorResponse = {
        error: 'Question must be a string',
        code: 'INVALID_REQUEST',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate question is not empty
    const question = body.question.trim();
    if (question.length === 0) {
      const errorResponse: ChatErrorResponse = {
        error: 'Question cannot be empty',
        code: 'EMPTY_QUESTION',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate question length
    if (question.length > 2000) {
      const errorResponse: ChatErrorResponse = {
        error: 'Question exceeds maximum length of 2000 characters',
        code: 'QUESTION_TOO_LONG',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Process the chat request
    const response = await chat(question);

    // Log the chat asynchronously (don't wait for it)
    logChat({
      sessionId: body.sessionId,
      question,
      response: response.answer,
      sources: response.sources,
      suggestions: response.suggestions || [],
    }).catch((err) => console.error('Chat logging failed:', err));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Chat API error:', error);

    const errorResponse: ChatErrorResponse = {
      error: 'An error occurred while processing your request',
      code: 'SERVICE_ERROR',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
