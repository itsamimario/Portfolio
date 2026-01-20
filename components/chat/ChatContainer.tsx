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
            <div className="mt-8 font-pixel text-black">
              <p className="text-lg mb-3">[try asking]</p>
              <div className="flex flex-col gap-2">
                {EXAMPLE_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="text-left text-lg hover:underline"
                  >
                    &gt; {question}
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
          <div className="flex items-center gap-2 py-2 font-pixel text-black">
            <span className="text-lg">$</span>
            <span className="text-lg">processing</span>
            <span className="w-3 h-5 bg-black animate-pulse" />
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="py-2 font-pixel text-black">
            <span className="text-lg">[error] {error}</span>
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
