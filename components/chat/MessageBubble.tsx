/**
 * MessageBubble component for displaying chat messages
 * Phase 7: Chat UI
 */

import type { MessageBubbleProps } from '@/types/chat-ui';

/**
 * Displays a single chat message with appropriate styling
 * based on whether it's from the user or assistant.
 *
 * @param message - The chat message to display
 */
export function MessageBubble({ message }: MessageBubbleProps): JSX.Element {
  const isUser = message.role === 'user';

  return (
    <div
      role="article"
      aria-label={`${message.role} message`}
      className="w-full font-pixel text-black"
    >
      <div className="flex gap-2">
        <span className="text-lg shrink-0">{isUser ? '>' : '$'}</span>
        <div className="flex-1">
          <p className="whitespace-pre-wrap text-lg">{message.content}</p>

          {/* Sources section for assistant messages */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-black">
              <p className="text-sm mb-1">[sources]</p>
              <ul className="text-sm">
                {message.sources.map((source, index) => (
                  <li key={index} className="mb-1">
                    - {source.title || source.source}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
