/**
 * Text formatting utility
 * Parses **bold** markdown syntax and returns JSX
 */

import React from 'react';

/**
 * Parse text with **bold** markers and return JSX
 * Example: "This is **bold** text" -> This is <strong>bold</strong> text
 */
export function formatText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    }
    return part;
  });
}
