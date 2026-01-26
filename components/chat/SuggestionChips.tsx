/**
 * SuggestionChips component for chat follow-up suggestions
 * Renders clickable chips above the chat input
 */

'use client';

import { useRef, useEffect } from 'react';
import type { SuggestionChipsProps } from '@/types/chat-ui';

/**
 * Displays suggestion chips that users can click to send a message.
 * Chips fade in after bot responses and disappear when clicked.
 */
export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps): JSX.Element | null {
  const sentRef = useRef(false);

  useEffect(() => {
    sentRef.current = false;
  }, [suggestions]);

  if (suggestions.length === 0) {
    return null;
  }

  const handleClick = (suggestion: string) => {
    if (sentRef.current) return;
    sentRef.current = true;
    onSelect(suggestion);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={suggestion}
          type="button"
          onClick={() => handleClick(suggestion)}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-pixel text-sm hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors opacity-0 animate-fade-in"
          style={{ animationDelay: `${index * 250}ms`, animationFillMode: 'forwards' }}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
