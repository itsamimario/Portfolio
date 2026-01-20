/**
 * ChatInput component for message input
 * Phase 7: Chat UI
 */

'use client';

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import type { ChatInputProps } from '@/types/chat-ui';

/**
 * Input component for chat messages with send button
 *
 * @param onSend - Callback when message is sent
 * @param disabled - Whether input is disabled (e.g., during loading)
 * @param placeholder - Custom placeholder text
 */
export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Ask me a question...',
}: ChatInputProps): JSX.Element {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSend(trimmedMessage);
      setMessage('');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Always prevent default Enter behavior in the input
      e.preventDefault();
      // Only send on plain Enter (without Shift)
      if (!e.shiftKey) {
        handleSend();
      }
      // Shift+Enter: prevent submission but allow for future multiline support
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={2000}
        aria-label="Chat message input"
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={disabled}
        aria-label="Send message"
        aria-busy={disabled}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}
