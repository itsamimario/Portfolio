/**
 * MessageBubble component for displaying chat messages
 * Phase 7: Chat UI
 */

'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import type { MessageBubbleProps } from '@/types/chat-ui';

/**
 * Content segment types for typed rendering
 */
interface TextSegment {
  type: 'text';
  content: string;
}

interface LinkSegment {
  type: 'link';
  text: string;
  url: string;
}

type ContentSegment = TextSegment | LinkSegment;

/**
 * Check if a URL is safe to render as a link
 * Only allows internal paths, http://, and https:// URLs
 */
function isSafeUrl(url: string): boolean {
  if (url.startsWith('/')) return true;
  if (url.startsWith('https://') || url.startsWith('http://')) return true;
  return false;
}

/**
 * Parse content string into segments of text and links
 */
function parseContentSegments(content: string): ContentSegment[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const segments: ContentSegment[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: content.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'link', text: match[1], url: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push({ type: 'text', content: content.slice(lastIndex) });
  }

  return segments;
}

/**
 * Get the visual length of content (link markdown replaced by link text)
 */
function getVisualLength(segments: ContentSegment[]): number {
  return segments.reduce((len, seg) => {
    return len + (seg.type === 'text' ? seg.content.length : seg.text.length);
  }, 0);
}

/**
 * Render segments up to a visual character count.
 * Links show as plain text while being typed, become clickable when fully typed.
 */
function renderTypedSegments(segments: ContentSegment[], visibleChars: number): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = visibleChars;
  let key = 0;

  for (const segment of segments) {
    if (remaining <= 0) break;

    if (segment.type === 'text') {
      const chars = Math.min(remaining, segment.content.length);
      parts.push(segment.content.slice(0, chars));
      remaining -= chars;
    } else {
      const chars = Math.min(remaining, segment.text.length);
      const isFullyTyped = chars >= segment.text.length;

      if (isFullyTyped && isSafeUrl(segment.url)) {
        const isFilePath = /\.(pdf|docx?|xlsx?|csv|zip|png|jpg|jpeg|gif|svg)(\?|$)/i.test(segment.url);
        if (segment.url.startsWith('/') && !isFilePath) {
          parts.push(
            <Link key={key++} href={segment.url} className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">
              {segment.text}
            </Link>
          );
        } else {
          parts.push(
            <a key={key++} href={segment.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">
              {segment.text}
            </a>
          );
        }
      } else {
        parts.push(segment.text.slice(0, chars));
      }
      remaining -= chars;
    }
  }

  return parts;
}

/**
 * Render full content with links (no animation)
 */
function renderWithLinks(text: string): React.ReactNode {
  const segments = parseContentSegments(text);
  return renderTypedSegments(segments, getVisualLength(segments));
}

/**
 * Typing animation hook for assistant messages
 * Types by visual characters (link markdown counts as link text length only)
 */
function useTypingAnimation(
  content: string,
  segments: ContentSegment[],
  enabled: boolean,
  speed: number = 20,
  onComplete?: () => void,
  onUpdate?: () => void
) {
  const visualLength = getVisualLength(segments);
  const [visibleChars, setVisibleChars] = useState(enabled ? 0 : visualLength);
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
      setVisibleChars(visualLength);
      setIsComplete(true);
      return;
    }

    setVisibleChars(0);
    setIsComplete(false);
    let index = 0;

    const timer = setInterval(() => {
      if (index < visualLength) {
        index++;
        setVisibleChars(index);
        if (onUpdateRef.current) {
          onUpdateRef.current();
        }
      } else {
        setIsComplete(true);
        clearInterval(timer);
        if (currentAnimationId === animationIdRef.current && onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [content, enabled, speed, visualLength]);

  return { visibleChars, isComplete };
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

  // Parse content into segments once
  const segments = useMemo(() => parseContentSegments(message.content), [message.content]);

  const { visibleChars, isComplete } = useTypingAnimation(
    message.content,
    segments,
    shouldAnimate || false,
    variant === 'intro' ? 30 : 15,
    onTypingComplete,
    onTypingUpdate
  );

  // Render content with proper link handling during typing
  const renderedContent = useMemo(() => {
    if (isUser) return message.content;
    return renderTypedSegments(segments, visibleChars);
  }, [isUser, segments, visibleChars, message.content]);

  // For intro messages that don't have links, get plain text
  const plainText = useMemo(() => {
    if (!shouldAnimate) return message.content;
    // Build plain text from segments up to visibleChars
    let remaining = visibleChars;
    let text = '';
    for (const seg of segments) {
      if (remaining <= 0) break;
      const segText = seg.type === 'text' ? seg.content : seg.text;
      const chars = Math.min(remaining, segText.length);
      text += segText.slice(0, chars);
      remaining -= chars;
    }
    return text;
  }, [shouldAnimate, message.content, segments, visibleChars]);

  // Intro variant - each line is a separate message for smooth animation
  if (variant === 'intro') {
    // Determine styling based on message ID
    // intro-hi: "Hi!" - 2 levels smaller
    if (message.id === 'intro-hi') {
      return (
        <div className="w-full font-pixel text-black dark:text-white">
          <div className="text-2xl md:text-3xl inline">
            {plainText}
          </div>
          {shouldAnimate && !isComplete && (
            <span className="inline-block w-2 h-5 bg-black dark:bg-white ml-1 animate-pulse align-middle" />
          )}
        </div>
      );
    }

    // intro-name: "I'm Mario Bennekers" - main size, bold name
    if (message.id === 'intro-name') {
      const fullName = 'Mario Bennekers';
      const hasFullName = plainText.includes(fullName);

      return (
        <div className="w-full font-pixel text-black dark:text-white">
          <div className="text-4xl md:text-5xl inline">
            {hasFullName ? (
              <>
                {plainText.split(fullName)[0]}
                <span className="font-bold">{fullName}</span>
                {plainText.split(fullName)[1] || ''}
              </>
            ) : (
              plainText
            )}
          </div>
          {shouldAnimate && !isComplete && (
            <span className="inline-block w-3 h-8 bg-black dark:bg-white ml-1 animate-pulse align-middle" />
          )}
        </div>
      );
    }

    // intro-title: "Product Manager" - 1 level smaller
    if (message.id === 'intro-title') {
      return (
        <div className="w-full font-pixel text-black dark:text-white">
          <div className="text-3xl md:text-4xl inline">
            {plainText}
          </div>
          {shouldAnimate && !isComplete && (
            <span className="inline-block w-3 h-6 bg-black dark:bg-white ml-1 animate-pulse align-middle" />
          )}
        </div>
      );
    }

    // intro-description: Description text with links
    return (
      <div className="w-full font-pixel text-black dark:text-white">
        <p className="text-lg md:text-xl inline">
          {renderedContent}
        </p>
        {shouldAnimate && !isComplete && (
          <span className="inline-block w-3 h-5 bg-black dark:bg-white ml-1 animate-pulse align-middle" />
        )}
      </div>
    );
  }

  // Regular messages
  return (
    <div
      role="article"
      aria-label={`${message.role} message`}
      className={`max-w-[90%] font-pixel ${isUser ? 'ml-auto w-fit text-gray-500 dark:text-gray-400' : 'mr-auto text-black dark:text-white'}`}
    >
      <div className="flex gap-2">
        <span className="text-lg shrink-0">{isUser ? '>' : '$'}</span>
        <div className="flex-1">
          <p className="whitespace-pre-wrap text-lg inline">
            {renderedContent}
          </p>
          {shouldAnimate && !isComplete && (
            <span className="inline-block w-3 h-5 bg-black dark:bg-white ml-1 animate-pulse align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}
