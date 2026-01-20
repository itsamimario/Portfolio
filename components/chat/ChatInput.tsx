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
 * @param showCursor - Whether to show the blinking cursor (default true)
 */
export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Ask me a question...',
  showCursor: showCursorProp = true,
}: ChatInputProps): JSX.Element {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount (only when cursor should be shown)
  useEffect(() => {
    if (showCursorProp) {
      inputRef.current?.focus();
    }
  }, [showCursorProp]);

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

  // Show cursor when: no text, not disabled, cursor enabled, and input has focus
  const displayCursor = message.length === 0 && !disabled && showCursorProp && isFocused;

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 font-pixel text-black">
      <span className="text-xl">&gt;</span>
      <div className="flex-1 flex items-center relative">
        {/* Blinking cursor on the left side (where user types) */}
        {displayCursor && (
          <span className="absolute left-0 w-3 h-6 bg-black animate-pulse" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=""
          disabled={disabled}
          maxLength={2000}
          aria-label="Chat message input"
          className="flex-1 bg-transparent border-none outline-none text-xl text-black placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed caret-transparent pl-1"
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        aria-label="Send message"
        aria-busy={disabled}
        className="px-3 py-1 border border-black text-black bg-transparent hover:bg-black hover:text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
      >
        SEND
      </button>
    </form>
  );
}
