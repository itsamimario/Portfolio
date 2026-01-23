/**
 * Custom hook for chat functionality
 * Phase 7: Chat UI
 */

import { useState, useCallback, useEffect } from 'react';
import type { ChatMessage, UseChatReturn } from '@/types/chat-ui';

const STORAGE_KEY = 'portfolio-chat-messages';

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
];

/**
 * Load messages from localStorage
 */
function loadMessagesFromStorage(): ChatMessage[] | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return parsed.map((msg: ChatMessage) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
      // Disable typing animation for restored messages
      isTyping: false,
    }));
  } catch {
    return null;
  }
}

/**
 * Save messages to localStorage
 */
function saveMessagesToStorage(messages: ChatMessage[]): void {
  if (typeof window === 'undefined') return;

  try {
    // Only save if there are messages beyond the initial intro
    const hasConversation = messages.some(
      (msg) => msg.role === 'user' || (!msg.variant && msg.role === 'assistant')
    );

    if (hasConversation) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  } catch {
    // Silently fail if localStorage is not available
  }
}

/**
 * Custom hook for managing chat state and interactions
 *
 * @returns Chat state and methods
 */
export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load messages from localStorage on mount (client-side only)
  useEffect(() => {
    const stored = loadMessagesFromStorage();
    if (stored && stored.length > 0) {
      setMessages(stored);
    }
    setIsHydrated(true);
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (isHydrated) {
      saveMessagesToStorage(messages);
    }
  }, [messages, isHydrated]);

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
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
