/**
 * Chat API route
 * POST /api/chat - Send a question and get a RAG-powered response
 */

import { NextRequest, NextResponse } from 'next/server';
import { chat } from '../../../lib/chat';
import type { ChatRequest, ChatErrorResponse } from '../../../types/chat';

/**
 * Handle chat POST requests
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
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

    // Validate question is not empty
    const question = body.question.trim();
    if (question.length === 0) {
      const errorResponse: ChatErrorResponse = {
        error: 'Question cannot be empty',
        code: 'EMPTY_QUESTION',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Process the chat request
    const response = await chat(question);

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
