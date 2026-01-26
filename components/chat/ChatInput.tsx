/**
 * ChatInput component for message input
 * Phase 7: Chat UI
 */

'use client';

import { useState, useRef, useEffect, useCallback, FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import type { ChatInputProps } from '@/types/chat-ui';

const MAX_LINES = 6;
const LINE_HEIGHT_PX = 28;
const MAX_HEIGHT_PX = MAX_LINES * LINE_HEIGHT_PX;

/**
 * Input component for chat messages with send button
 * Auto-grows up to 6 lines, then scrolls internally.
 */
export function ChatInput({
  onSend,
  disabled = false,
  showCursor: showCursorProp = true,
}: ChatInputProps): JSX.Element {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea on mount (only when cursor should be shown)
  useEffect(() => {
    if (showCursorProp) {
      textareaRef.current?.focus();
    }
  }, [showCursorProp]);

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_HEIGHT_PX)}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [message, resizeTextarea]);

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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 font-pixel text-gray-500 dark:text-gray-400">
      <span className="text-lg leading-7">&gt;</span>
      <div className="flex-1 min-w-0 flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything here"
          disabled={disabled}
          maxLength={2000}
          rows={1}
          aria-label="Chat message input"
          className="w-full resize-none bg-transparent border-none outline-none text-lg leading-7 text-gray-500 dark:text-gray-400 overflow-y-auto placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:cursor-not-allowed p-0"
          style={{ maxHeight: `${MAX_HEIGHT_PX}px` }}
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        aria-label="Send message"
        aria-busy={disabled}
        className="px-3 py-1 border-2 border-black dark:border-white text-black dark:text-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm shrink-0"
      >
        SEND
      </button>
    </form>
  );
}
