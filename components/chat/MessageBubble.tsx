/**
 * MessageBubble component for displaying chat messages
 * Phase 7: Chat UI
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { MessageBubbleProps } from '@/types/chat-ui';

/**
 * Typing animation hook for assistant messages
 */
function useTypingAnimation(content: string, enabled: boolean, speed: number = 20) {
  const [displayedText, setDisplayedText] = useState(enabled ? '' : content);
  const [isComplete, setIsComplete] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(content);
      setIsComplete(true);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);
    let index = 0;

    const timer = setInterval(() => {
      if (index < content.length) {
        setDisplayedText(content.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [content, enabled, speed]);

  return { displayedText, isComplete };
}

/**
 * Displays a single chat message with appropriate styling
 * based on whether it's from the user or assistant.
 *
 * Features:
 * - User messages align right with '>' prefix
 * - Assistant messages align left with '$' prefix
 * - Typing animation for assistant messages
 * - Special variants: 'intro' for big text, 'nav-links' for navigation
 */
export function MessageBubble({ message }: MessageBubbleProps): JSX.Element {
  const isUser = message.role === 'user';
  const variant = message.variant || 'regular';
  const shouldAnimate = !isUser && message.isTyping;

  const { displayedText, isComplete } = useTypingAnimation(
    message.content,
    shouldAnimate || false,
    variant === 'intro' ? 30 : 15
  );

  // Intro variant - handles both title block and description text
  if (variant === 'intro') {
    const text = shouldAnimate ? displayedText : message.content;
    const hasNewlines = message.content.includes('\n');

    // Title block (Hi!, I'm Mario Bennekers, Product Manager)
    if (hasNewlines) {
      const lines = text.split('\n');
      return (
        <div className="w-full font-pixel text-black">
          {lines.map((line, idx) => {
            // "I'm Mario Bennekers" line - bold name
            if (line.includes('Mario Bennekers')) {
              const parts = line.split('Mario Bennekers');
              return (
                <div key={idx} className="text-4xl md:text-5xl">
                  {parts[0]}<span className="font-bold">Mario Bennekers</span>{parts[1] || ''}
                </div>
              );
            }
            // Other title lines (Hi!, Product Manager)
            return (
              <div key={idx} className="text-4xl md:text-5xl">
                {line}
              </div>
            );
          })}
          {shouldAnimate && !isComplete && (
            <span className="inline-block w-3 h-6 bg-black ml-1 animate-pulse align-middle" />
          )}
        </div>
      );
    }

    // Description text (single line intro, no $ prefix)
    return (
      <div className="w-full font-pixel text-black">
        <p className="text-lg md:text-xl inline">
          {text}
        </p>
        {shouldAnimate && !isComplete && (
          <span className="inline-block w-3 h-5 bg-black ml-1 animate-pulse align-middle" />
        )}
      </div>
    );
  }

  // Nav-links variant - navigation links
  if (variant === 'nav-links') {
    return (
      <div className="w-full font-pixel text-black">
        <div className="text-lg md:text-xl mb-4">{message.content}</div>
        <div className="flex gap-6 font-pixel text-lg">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/case-studies" className="hover:underline">
            Case Studies
          </Link>
          <Link href="/playbook" className="hover:underline">
            Product Playbook
          </Link>
        </div>
      </div>
    );
  }

  // Regular messages
  const text = shouldAnimate ? displayedText : message.content;

  return (
    <div
      role="article"
      aria-label={`${message.role} message`}
      className={`w-full font-pixel text-black ${isUser ? 'text-right' : ''}`}
    >
      <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
        <span className="text-lg shrink-0">{isUser ? '>' : '$'}</span>
        <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
          <p className="whitespace-pre-wrap text-lg inline">
            {text}
          </p>
          {shouldAnimate && !isComplete && (
            <span className="inline-block w-3 h-5 bg-black ml-1 animate-pulse align-middle" />
          )}

          {/* Sources section for assistant messages */}
          {!isUser && isComplete && message.sources && message.sources.length > 0 && (
            <div className="mt-2 pt-2 border-t border-black text-left">
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
