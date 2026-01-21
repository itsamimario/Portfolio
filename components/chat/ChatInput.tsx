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

  // Show cursor when: not disabled (bot not typing), cursor enabled, and input has focus
  // Cursor stays visible while user types, only hidden during bot response
  const displayCursor = !disabled && showCursorProp && isFocused;

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 font-pixel text-black">
      <span className="text-lg">&gt;</span>
      <div className="flex-1 flex items-center relative">
        {/* Invisible input captures keystrokes */}
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
          className="absolute inset-0 w-full bg-transparent border-none outline-none text-lg text-transparent caret-transparent disabled:cursor-not-allowed"
        />
        {/* Placeholder when not focused and empty */}
        {!isFocused && message.length === 0 && showCursorProp && (
          <span className="text-lg text-gray-400">type something here</span>
        )}
        {/* Visible text display + cursor that follows text */}
        {(isFocused || message.length > 0) && (
          <>
            <span className="text-lg whitespace-pre">{message}</span>
            {displayCursor && (
              <span className="w-3 h-5 bg-black animate-pulse shrink-0" />
            )}
          </>
        )}
      </div>
      <button
        type="submit"
        disabled={disabled}
        aria-label="Send message"
        aria-busy={disabled}
        className="px-3 py-1 border-2 border-black text-black bg-transparent hover:bg-black hover:text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
      >
        SEND
      </button>
    </form>
  );
}
