/**
 * Custom hook for chat functionality
 * Phase 7: Chat UI
 */

import { useState, useCallback } from 'react';
import type { ChatMessage, UseChatReturn } from '@/types/chat-ui';

/**
 * Initial greeting messages that appear when chat loads
 * Each line is a separate message to avoid layout shifts during typing animation
 */
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'intro-hi',
    role: 'assistant',
    content: "Hi!",
    timestamp: new Date(),
    variant: 'intro',
    isTyping: true,
  },
  {
    id: 'intro-name',
    role: 'assistant',
    content: "I'm Mario Bennekers",
    timestamp: new Date(),
    variant: 'intro',
    isTyping: true,
  },
  {
    id: 'intro-title',
    role: 'assistant',
    content: "Product Manager",
    timestamp: new Date(),
    variant: 'intro',
    isTyping: true,
  },
  {
    id: 'intro-description',
    role: 'assistant',
    content: "This is my portfolio, feel free to navigate through it or ask directly any question about myself.",
    timestamp: new Date(),
    variant: 'intro',
    isTyping: true,
  },
  {
    id: 'nav-links',
    role: 'assistant',
    content: "Or navigate directly to:",
    timestamp: new Date(),
    variant: 'nav-links',
    isTyping: true,
  },
];

/**
 * Custom hook for managing chat state and interactions
 *
 * @returns Chat state and methods
 */
export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string): Promise<void> => {
    // Clear any previous error
    setError(null);

    // Generate unique ID for user message
    const userMessageId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: content }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to send message';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // Response wasn't JSON, use default message
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Generate unique ID for assistant message
      const assistantMessageId = `assistant-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

      // Add assistant response with typing animation
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback((): void => {
    setMessages(INITIAL_MESSAGES);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
