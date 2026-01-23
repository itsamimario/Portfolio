/**
 * MessageBubble component for displaying chat messages
 * Phase 7: Chat UI
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { MessageBubbleProps } from '@/types/chat-ui';

/**
 * Parse markdown links and render as Next.js Link components
 * Converts [text](url) to clickable links
 */
/**
 * Check if a URL is safe to render as a link
 * Only allows internal paths, http://, and https:// URLs
 */
function isSafeUrl(url: string): boolean {
  if (url.startsWith('/')) return true;
  if (url.startsWith('https://') || url.startsWith('http://')) return true;
  return false;
}

function renderWithLinks(text: string): React.ReactNode {
  // Regex to match markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const linkText = match[1];
    const url = match[2];

    // Skip unsafe URLs (javascript:, data:, etc.)
    if (!isSafeUrl(url)) {
      parts.push(linkText);
      lastIndex = match.index + match[0].length;
      continue;
    }

    // Check if it's an internal link (starts with /)
    if (url.startsWith('/')) {
      parts.push(
        <Link
          key={key++}
          href={url}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {linkText}
        </Link>
      );
    } else {
      // External link (http/https only)
      parts.push(
        <a
          key={key++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {linkText}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last link
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Typing animation hook for assistant messages
 */
function useTypingAnimation(
  content: string,
  enabled: boolean,
  speed: number = 20,
  onComplete?: () => void,
  onUpdate?: () => void
) {
  const [displayedText, setDisplayedText] = useState(enabled ? '' : content);
  const [isComplete, setIsComplete] = useState(!enabled);
  // Use refs for callbacks to avoid re-triggering effect when they change
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;
  // Track if this specific animation run has completed
  const animationIdRef = useRef(0);

  useEffect(() => {
    // Generate unique ID for this animation run
    const currentAnimationId = ++animationIdRef.current;

    if (!enabled) {
      setDisplayedText(content);
      setIsComplete(true);
      // Don't call onComplete when disabled - only when animation actually runs
      return;
    }

    setDisplayedText('');
    setIsComplete(false);
    let index = 0;

    const timer = setInterval(() => {
      if (index < content.length) {
        setDisplayedText(content.slice(0, index + 1));
        index++;
        // Call onUpdate to trigger scroll during typing
        if (onUpdateRef.current) {
          onUpdateRef.current();
        }
      } else {
        setIsComplete(true);
        clearInterval(timer);
        // Only call if this is still the current animation
        if (currentAnimationId === animationIdRef.current && onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [content, enabled, speed]); // Callbacks accessed via refs

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
 * - Special variant: 'intro' for big text
 */
export function MessageBubble({ message, onTypingComplete, onTypingUpdate }: MessageBubbleProps): JSX.Element {
  const isUser = message.role === 'user';
  const variant = message.variant || 'regular';
  const shouldAnimate = !isUser && message.isTyping;

  const { displayedText, isComplete } = useTypingAnimation(
    message.content,
    shouldAnimate || false,
    variant === 'intro' ? 30 : 15,
    onTypingComplete,
    onTypingUpdate
  );

  // Intro variant - each line is a separate message for smooth animation
  if (variant === 'intro') {
    const text = shouldAnimate ? displayedText : message.content;

    // Determine styling based on message ID
    // intro-hi: "Hi!" - 2 levels smaller
    if (message.id === 'intro-hi') {
      return (
        <div className="w-full font-pixel text-black">
          <div className="text-2xl md:text-3xl inline">
            {text}
          </div>
          {shouldAnimate && !isComplete && (
            <span className="inline-block w-2 h-5 bg-black ml-1 animate-pulse align-middle" />
          )}
        </div>
      );
    }

    // intro-name: "I'm Mario Bennekers" - main size, bold name
    if (message.id === 'intro-name') {
      // Handle typing animation - only bold when full name is visible
      const fullName = 'Mario Bennekers';
      const hasFullName = text.includes(fullName);

      return (
        <div className="w-full font-pixel text-black">
          <div className="text-4xl md:text-5xl inline">
            {hasFullName ? (
              <>
                {text.split(fullName)[0]}
                <span className="font-bold">{fullName}</span>
                {text.split(fullName)[1] || ''}
              </>
            ) : (
              text
            )}
          </div>
          {shouldAnimate && !isComplete && (
            <span className="inline-block w-3 h-8 bg-black ml-1 animate-pulse align-middle" />
          )}
        </div>
      );
    }

    // intro-title: "Product Manager" - 1 level smaller
    if (message.id === 'intro-title') {
      return (
        <div className="w-full font-pixel text-black">
          <div className="text-3xl md:text-4xl inline">
            {text}
          </div>
          {shouldAnimate && !isComplete && (
            <span className="inline-block w-3 h-6 bg-black ml-1 animate-pulse align-middle" />
          )}
        </div>
      );
    }

    // intro-description: Description text - smaller body text
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

  // Regular messages
  const text = shouldAnimate ? displayedText : message.content;

  // Render text with markdown links converted to actual links
  const renderedText = isUser ? text : renderWithLinks(text);

  return (
    <div
      role="article"
      aria-label={`${message.role} message`}
      className={`max-w-[90%] font-pixel ${isUser ? 'ml-auto w-fit text-gray-500' : 'mr-auto text-black'}`}
    >
      <div className="flex gap-2">
        <span className="text-lg shrink-0">{isUser ? '>' : '$'}</span>
        <div className="flex-1">
          <p className="whitespace-pre-wrap text-lg inline">
            {renderedText}
          </p>
          {shouldAnimate && !isComplete && (
            <span className="inline-block w-3 h-5 bg-black ml-1 animate-pulse align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}
