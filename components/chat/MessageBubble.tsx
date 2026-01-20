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
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>

        {/* Sources section for assistant messages */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-300">
            <p className="text-xs text-gray-600 mb-1">Sources:</p>
            <ul className="text-xs text-gray-600">
              {message.sources.map((source, index) => (
                <li key={index} className="mb-1">
                  {source.title || source.source}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
