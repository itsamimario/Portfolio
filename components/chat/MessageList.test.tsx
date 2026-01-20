/**
 * Tests for MessageList component
 * TDD: Write tests FIRST before implementation
 * Phase 7: Chat UI
 */

import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';
import type { ChatMessage } from '@/types/chat-ui';

describe('MessageList', () => {
  const mockMessages: ChatMessage[] = [
    {
      id: 'user-1',
      role: 'user',
      content: 'Hello',
      timestamp: new Date('2026-01-20T10:00:00'),
    },
    {
      id: 'assistant-1',
      role: 'assistant',
      content: 'Hi there!',
      timestamp: new Date('2026-01-20T10:00:05'),
      sources: [],
    },
    {
      id: 'user-2',
      role: 'user',
      content: 'How are you?',
      timestamp: new Date('2026-01-20T10:00:10'),
    },
  ];

  describe('rendering', () => {
    it('renders all messages', () => {
      render(<MessageList messages={mockMessages} />);

      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('Hi there!')).toBeInTheDocument();
      expect(screen.getByText('How are you?')).toBeInTheDocument();
    });

    it('renders messages in order', () => {
      const { container } = render(<MessageList messages={mockMessages} />);

      const articles = container.querySelectorAll('[role="article"]');
      expect(articles).toHaveLength(3);
    });

    it('renders empty state when no messages', () => {
      const { container } = render(<MessageList messages={[]} />);

      // Should still render the container but be empty
      const list = container.firstChild;
      expect(list).toBeInTheDocument();
      expect(container.querySelectorAll('[role="article"]')).toHaveLength(0);
    });
  });

  describe('scrolling behavior', () => {
    it('has container with overflow-y scroll', () => {
      const { container } = render(<MessageList messages={mockMessages} />);

      const list = container.firstChild as HTMLElement;
      expect(list.className).toMatch(/overflow-y/);
    });

    it('has max height for scrollable area', () => {
      const { container } = render(<MessageList messages={mockMessages} />);

      const list = container.firstChild as HTMLElement;
      expect(list.className).toMatch(/max-h-|h-/);
    });
  });

  describe('accessibility', () => {
    it('uses semantic list structure', () => {
      const { container } = render(<MessageList messages={mockMessages} />);

      // Could be a div with role="log" or similar
      const list = container.firstChild;
      expect(list).toHaveAttribute('role', 'log');
    });

    it('has appropriate aria-live for new messages', () => {
      const { container } = render(<MessageList messages={mockMessages} />);

      const list = container.firstChild;
      expect(list).toHaveAttribute('aria-live', 'polite');
    });

    it('has accessible label', () => {
      const { container } = render(<MessageList messages={mockMessages} />);

      const list = container.firstChild;
      expect(list).toHaveAttribute('aria-label', expect.stringMatching(/message/i));
    });
  });

  describe('styling', () => {
    it('has appropriate spacing between messages', () => {
      const { container } = render(<MessageList messages={mockMessages} />);

      const list = container.firstChild as HTMLElement;
      expect(list.className).toMatch(/space-y-|gap-/);
    });

    it('has padding for content', () => {
      const { container } = render(<MessageList messages={mockMessages} />);

      const list = container.firstChild as HTMLElement;
      expect(list.className).toMatch(/p-|px-|py-/);
    });
  });
});
