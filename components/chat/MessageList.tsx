/**
 * MessageList component for displaying chat messages
 * Phase 7: Chat UI
 */

'use client';

import type { MessageListProps } from '@/types/chat-ui';
import { MessageBubble } from './MessageBubble';

/**
 * Displays a list of chat messages
 * All messages scroll together - intro, nav, user messages, and responses
 *
 * @param messages - Array of chat messages to display
 * @param navLinksRef - Optional ref for the nav-links message (for intersection observer)
 * @param onTypingComplete - Callback when a message finishes typing animation
 */
export function MessageList({ messages, navLinksRef, onTypingComplete }: MessageListProps): JSX.Element {
  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      className="space-y-4"
    >
      {messages.map((message) => {
        const handleTypingComplete = message.isTyping
          ? () => onTypingComplete?.(message.id)
          : undefined;

        // Wrap nav-links message with ref for intersection observer
        if (message.variant === 'nav-links' && navLinksRef) {
          return (
            <div key={message.id} ref={navLinksRef}>
              <MessageBubble message={message} onTypingComplete={handleTypingComplete} />
            </div>
          );
        }
        return (
          <MessageBubble
            key={message.id}
            message={message}
            onTypingComplete={handleTypingComplete}
          />
        );
      })}
    </div>
  );
}
