/**
 * Types for Chat UI components
 * Phase 7: Chat UI
 */

import type { ChatSource } from './chat';

/**
 * Message variant types for special rendering
 */
export type MessageVariant = 'regular' | 'intro' | 'nav-links';

/**
 * Chat message from either user or assistant
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: ChatSource[];
  timestamp: Date;
  variant?: MessageVariant;
  isTyping?: boolean; // For typing animation state
}

/**
 * State for the useChat hook
 */
export interface UseChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Return type for useChat hook
 */
export interface UseChatReturn extends UseChatState {
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
}

/**
 * Props for MessageBubble component
 */
export interface MessageBubbleProps {
  message: ChatMessage;
  onTypingComplete?: () => void;
}

/**
 * Props for ChatInput component
 */
export interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  showCursor?: boolean;
}

/**
 * Props for NavigationLinks component
 */
export interface NavigationLinksProps {
  isSticky?: boolean;
}

/**
 * Props for MessageList component
 */
export interface MessageListProps {
  messages: ChatMessage[];
  navLinksRef?: React.RefObject<HTMLDivElement>;
  onTypingComplete?: (messageId: string) => void;
}

/**
 * Props for ChatContainer component
 */
export interface ChatContainerProps {
  initialMessages?: ChatMessage[];
}
