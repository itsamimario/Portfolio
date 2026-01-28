/**
 * ChatContainer component - main chat interface
 * Phase 7: Chat UI
 */

'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import type { ChatContainerProps, ChatMessage } from '@/types/chat-ui';
import { useChat } from '@/lib/hooks/useChat';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';
import { SuggestionChips } from './SuggestionChips';

// IDs of intro messages that should animate sequentially
const INTRO_MESSAGE_IDS = ['intro-hi', 'intro-name', 'intro-title', 'intro-description'];

/**
 * Main chat container that orchestrates all chat components
 *
 * Features:
 * - All content rendered as messages (intro, user messages, responses)
 * - Sequential typing animation for intro messages
 * - User messages align right
 * - Assistant messages have typing animation
 * - Auto-scroll to bottom on new messages
 */
export function ChatContainer({}: ChatContainerProps): JSX.Element {
  const { messages, isLoading, error, sendMessage, clearMessages, suggestions } = useChat();

  // Check if there's a conversation (messages beyond intro)
  const hasConversation = messages.some(
    (msg) => msg.role === 'user' || (!msg.variant && msg.role === 'assistant')
  );

  // Wrap sendMessage to hide chips immediately on send
  const handleSend = useCallback((message: string) => {
    setChipsVisible(false);
    sendMessage(message);
  }, [sendMessage]);

  // Handle clear with animation reset
  const handleClear = useCallback(() => {
    clearMessages();
    setVisibleIntroCount(1);
    setCompletedIntroIds(new Set());
    setChipsVisible(false);
  }, [clearMessages]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Track how many intro messages have been revealed (start with 1 to show first)
  const [visibleIntroCount, setVisibleIntroCount] = useState(1);
  // Track which intro messages have completed typing
  const [completedIntroIds, setCompletedIntroIds] = useState<Set<string>>(new Set());
  // Track whether suggestion chips should be visible (after typing animation completes)
  const [chipsVisible, setChipsVisible] = useState(false);

  // Scroll to bottom during typing animation (throttled to avoid iOS Safari issues)
  const lastScrollRef = useRef<number>(0);
  const handleTypingUpdate = useCallback(() => {
    const now = Date.now();
    // Only scroll every 500ms to avoid scroll jank on iOS Safari
    if (now - lastScrollRef.current > 500) {
      lastScrollRef.current = now;
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Handle typing completion for intro and regular messages
  const handleTypingComplete = useCallback((messageId: string) => {
    // Track completed message
    setCompletedIntroIds((prev) => new Set(prev).add(messageId));

    // Find index of completed message in intro sequence
    const completedIndex = INTRO_MESSAGE_IDS.indexOf(messageId);
    if (completedIndex !== -1 && completedIndex < INTRO_MESSAGE_IDS.length - 1) {
      // Reveal next message after a small delay
      setTimeout(() => {
        setVisibleIntroCount((prev) => Math.max(prev, completedIndex + 2));
      }, 200);
    }

    // Show chips after last intro message or any regular assistant message (with delay)
    const isLastIntro = messageId === INTRO_MESSAGE_IDS[INTRO_MESSAGE_IDS.length - 1];
    const isRegularAssistant = !INTRO_MESSAGE_IDS.includes(messageId);
    if (isLastIntro || isRegularAssistant) {
      setTimeout(() => setChipsVisible(true), 400);
    }
  }, []);

  // Calculate visible messages - show intro messages sequentially, all other messages immediately
  const visibleMessages = useMemo(() => {
    return messages.map((message) => {
      const introIndex = INTRO_MESSAGE_IDS.indexOf(message.id);

      // Non-intro messages are always visible
      if (introIndex === -1) {
        return message;
      }

      // If message doesn't need animation (isTyping: false), show it immediately
      // This allows tests to render all messages without waiting for sequential animation
      if (!message.isTyping) {
        return message;
      }

      // Hide intro messages that haven't been revealed yet (only for animated messages)
      if (introIndex >= visibleIntroCount) {
        return null;
      }

      // For visible intro messages, set isTyping based on whether it's complete
      const isComplete = completedIntroIds.has(message.id);
      return {
        ...message,
        isTyping: message.isTyping && !isComplete,
      };
    }).filter((msg): msg is ChatMessage => msg !== null);
  }, [messages, visibleIntroCount, completedIntroIds]);

  // Check if all intro animations are complete
  // If no messages need animation (all isTyping: false), intro is complete immediately
  const animatingIntroMessages = INTRO_MESSAGE_IDS.filter(
    (id) => messages.find((m) => m.id === id && m.isTyping)
  );
  const isIntroComplete = animatingIntroMessages.length === 0 ||
    (completedIntroIds.size >= animatingIntroMessages.length && visibleIntroCount >= INTRO_MESSAGE_IDS.length);

  // Auto-scroll to bottom only when new messages are added (not during typing updates)
  const prevMessageCountRef = useRef(visibleMessages.length);
  useEffect(() => {
    if (visibleMessages.length > prevMessageCountRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevMessageCountRef.current = visibleMessages.length;
  }, [visibleMessages.length]);

  // Scroll up when chips appear so content isn't hidden behind the sticky area
  useEffect(() => {
    if (chipsVisible) {
      setTimeout(() => {
        window.scrollBy({ top: 120, behavior: 'smooth' });
      }, 50);
    }
  }, [chipsVisible]);


  return (
    <main className="flex flex-col max-w-3xl mx-auto min-h-[calc(100vh-3.5rem)] min-h-[calc(100dvh-3.5rem)]">
      <h1 className="sr-only">Mario Bennekers - Portfolio Chat</h1>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col justify-end p-4">
        <MessageList
          messages={visibleMessages}
          onTypingComplete={handleTypingComplete}
          onTypingUpdate={handleTypingUpdate}
        />

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 py-2 font-pixel text-black dark:text-white mt-4">
            <span className="text-lg">$</span>
            <span className="text-lg">processing</span>
            <span className="w-3 h-5 bg-black dark:bg-white animate-pulse" />
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="py-2 font-pixel text-black dark:text-white mt-4">
            <span className="text-lg">[error] {error}</span>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - always visible at bottom */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4">
        {/* Suggestion chips - shown after typing animation completes */}
        {chipsVisible && !isLoading && suggestions.length > 0 && (
          <div className="mb-3">
            <SuggestionChips suggestions={suggestions} onSelect={handleSend} />
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <ChatInput
              onSend={handleSend}
              disabled={isLoading}
              showCursor={isIntroComplete}
            />
          </div>
          {hasConversation && (
            <button
              onClick={handleClear}
              className="font-pixel text-sm text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors"
              aria-label="Clear conversation"
            >
              clear
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
