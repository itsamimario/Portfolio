/**
 * ChatContainer component - main chat interface
 * Phase 7: Chat UI
 */

'use client';

import type { ChatContainerProps } from '@/types/chat-ui';
import { useChat } from '@/lib/hooks/useChat';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';
import { NavigationLinks } from './NavigationLinks';
import TerminalText from '@/components/TerminalText';

const EXAMPLE_QUESTIONS = [
  'What is your experience as a Product Manager?',
  'Tell me about your work at RatedPower',
  'What are your key skills?',
];

/**
 * Main chat container that orchestrates all chat components
 *
 * Features:
 * - Shows TerminalText greeting initially
 * - Displays MessageList when messages exist
 * - Manages sticky NavigationLinks after first message
 * - Shows example questions initially
 * - Handles loading and error states
 */
export function ChatContainer({}: ChatContainerProps): JSX.Element {
  const { messages, isLoading, error, sendMessage } = useChat();

  const hasMessages = messages.length > 0;

  const handleExampleClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <main className="flex flex-col max-w-3xl mx-auto min-h-screen p-4">
      <h1 className="sr-only">Mario Bennekers - Portfolio Chat</h1>

      {/* Navigation Links */}
      <NavigationLinks isSticky={hasMessages} />

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Initial state: Terminal greeting */}
        {!hasMessages && (
          <div className="flex-1 flex flex-col justify-center">
            <div data-testid="terminal-text">
              <TerminalText />
            </div>

            {/* Example Questions */}
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages state: Show message list */}
        {hasMessages && <MessageList messages={messages} />}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 p-4 text-gray-500">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm">Thinking...</span>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* Input area - always visible */}
      <div className="mt-4">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </main>
  );
}
