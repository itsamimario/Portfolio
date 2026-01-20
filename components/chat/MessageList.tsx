/**
 * MessageList component for displaying chat messages
 * Phase 7: Chat UI
 */

'use client';

import { useEffect, useRef } from 'react';
import type { MessageListProps } from '@/types/chat-ui';
import { MessageBubble } from './MessageBubble';

/**
 * Displays a scrollable list of chat messages
 *
 * @param messages - Array of chat messages to display
 */
export function MessageList({ messages }: MessageListProps): JSX.Element {
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div
      ref={listRef}
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      className="overflow-y-auto h-96 space-y-4 p-4"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
