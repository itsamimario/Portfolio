/**
 * ChatContainer component - main chat interface
 * Phase 7: Chat UI
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import type { ChatContainerProps } from '@/types/chat-ui';
import { useChat } from '@/lib/hooks/useChat';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';
import { NavigationLinks } from './NavigationLinks';

/**
 * Main chat container that orchestrates all chat components
 *
 * Features:
 * - All content rendered as messages (intro, nav, user messages, responses)
 * - User messages align right
 * - Assistant messages have typing animation
 * - Sticky nav header appears when nav-links message scrolls out of view
 * - Auto-scroll to bottom on new messages
 */
export function ChatContainer({}: ChatContainerProps): JSX.Element {
  const { messages, isLoading, error, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const [showStickyNav, setShowStickyNav] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Intersection observer to show/hide sticky nav
  useEffect(() => {
    if (!navLinksRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky nav when inline nav is NOT visible
        setShowStickyNav(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-60px 0px 0px 0px' }
    );

    observer.observe(navLinksRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex flex-col max-w-3xl mx-auto min-h-screen">
      <h1 className="sr-only">Mario Bennekers - Portfolio Chat</h1>

      {/* Sticky Navigation - appears when inline nav scrolls out of view */}
      {showStickyNav && (
        <div className="sticky top-0 z-10 bg-white border-b border-black">
          <NavigationLinks isSticky={true} />
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 flex flex-col justify-end p-4">
        <MessageList messages={messages} navLinksRef={navLinksRef} />

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 py-2 font-pixel text-black mt-4">
            <span className="text-lg">$</span>
            <span className="text-lg">processing</span>
            <span className="w-3 h-5 bg-black animate-pulse" />
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="py-2 font-pixel text-black mt-4">
            <span className="text-lg">[error] {error}</span>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - always visible at bottom */}
      <div className="sticky bottom-0 bg-white p-4">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </main>
  );
}
