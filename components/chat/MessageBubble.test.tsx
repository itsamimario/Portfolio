/**
 * Tests for MessageBubble component
 * TDD: Write tests FIRST before implementation
 * Phase 7: Chat UI
 */

import { render, screen } from '@testing-library/react';
import { MessageBubble } from './MessageBubble';
import type { ChatMessage } from '@/types/chat-ui';

describe('MessageBubble', () => {
  const baseUserMessage: ChatMessage = {
    id: 'user-1',
    role: 'user',
    content: 'Hello, tell me about yourself',
    timestamp: new Date('2026-01-20T10:00:00'),
  };

  const baseAssistantMessage: ChatMessage = {
    id: 'assistant-1',
    role: 'assistant',
    content: 'I am Mario, a Product Manager with AI experience.',
    timestamp: new Date('2026-01-20T10:00:05'),
    sources: [
      {
        content: 'Mario is a Product Manager',
        source: 'about',
        title: 'About Me',
        similarity: 0.92,
      },
    ],
  };

  describe('user messages', () => {
    it('renders user message content', () => {
      render(<MessageBubble message={baseUserMessage} />);

      expect(
        screen.getByText('Hello, tell me about yourself')
      ).toBeInTheDocument();
    });

    it('applies right alignment for user messages', () => {
      const { container } = render(<MessageBubble message={baseUserMessage} />);

      // User messages should be right-aligned (justify-end or similar)
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('justify-end');
    });

    it('applies blue background for user messages', () => {
      render(<MessageBubble message={baseUserMessage} />);

      const messageBubble = screen.getByText(
        'Hello, tell me about yourself'
      ).closest('div');
      expect(messageBubble).toHaveClass('bg-blue-600');
    });

    it('applies white text color for user messages', () => {
      render(<MessageBubble message={baseUserMessage} />);

      const messageBubble = screen.getByText(
        'Hello, tell me about yourself'
      ).closest('div');
      expect(messageBubble).toHaveClass('text-white');
    });

    it('does not show sources for user messages', () => {
      render(<MessageBubble message={baseUserMessage} />);

      expect(screen.queryByText(/source/i)).not.toBeInTheDocument();
    });
  });

  describe('assistant messages', () => {
    it('renders assistant message content', () => {
      render(<MessageBubble message={baseAssistantMessage} />);

      expect(
        screen.getByText('I am Mario, a Product Manager with AI experience.')
      ).toBeInTheDocument();
    });

    it('applies left alignment for assistant messages', () => {
      const { container } = render(
        <MessageBubble message={baseAssistantMessage} />
      );

      // Assistant messages should be left-aligned (justify-start or similar)
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('justify-start');
    });

    it('applies gray background for assistant messages', () => {
      render(<MessageBubble message={baseAssistantMessage} />);

      const messageBubble = screen
        .getByText('I am Mario, a Product Manager with AI experience.')
        .closest('div');
      expect(messageBubble).toHaveClass('bg-gray-100');
    });

    it('applies dark text color for assistant messages', () => {
      render(<MessageBubble message={baseAssistantMessage} />);

      const messageBubble = screen
        .getByText('I am Mario, a Product Manager with AI experience.')
        .closest('div');
      expect(messageBubble).toHaveClass('text-gray-900');
    });

    it('shows sources when provided', () => {
      render(<MessageBubble message={baseAssistantMessage} />);

      expect(screen.getByText(/About Me/i)).toBeInTheDocument();
    });

    it('shows multiple sources when provided', () => {
      const messageWithMultipleSources: ChatMessage = {
        ...baseAssistantMessage,
        sources: [
          {
            content: 'Source 1 content',
            source: 'about',
            title: 'About Me',
            similarity: 0.92,
          },
          {
            content: 'Source 2 content',
            source: 'case-study',
            title: 'RatedPower',
            similarity: 0.85,
          },
        ],
      };

      render(<MessageBubble message={messageWithMultipleSources} />);

      expect(screen.getByText(/About Me/i)).toBeInTheDocument();
      expect(screen.getByText(/RatedPower/i)).toBeInTheDocument();
    });

    it('does not show sources section when sources array is empty', () => {
      const messageWithoutSources: ChatMessage = {
        ...baseAssistantMessage,
        sources: [],
      };

      render(<MessageBubble message={messageWithoutSources} />);

      expect(screen.queryByText(/sources/i)).not.toBeInTheDocument();
    });

    it('does not show sources section when sources is undefined', () => {
      const messageWithoutSources: ChatMessage = {
        id: 'assistant-2',
        role: 'assistant',
        content: 'Simple response without additional data',
        timestamp: new Date(),
      };

      render(<MessageBubble message={messageWithoutSources} />);

      expect(screen.queryByText(/sources/i)).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has appropriate semantic structure', () => {
      const { container } = render(
        <MessageBubble message={baseUserMessage} />
      );

      // Should use semantic element
      const article = container.querySelector('div[role="article"]');
      expect(article).toBeInTheDocument();
    });

    it('indicates message role for screen readers', () => {
      render(<MessageBubble message={baseUserMessage} />);

      // Should have aria-label or similar indicating it's a user message
      expect(screen.getByRole('article')).toHaveAttribute(
        'aria-label',
        expect.stringMatching(/user/i)
      );
    });

    it('indicates assistant role for screen readers', () => {
      render(<MessageBubble message={baseAssistantMessage} />);

      expect(screen.getByRole('article')).toHaveAttribute(
        'aria-label',
        expect.stringMatching(/assistant/i)
      );
    });
  });

  describe('styling', () => {
    it('applies rounded corners to message bubble', () => {
      render(<MessageBubble message={baseUserMessage} />);

      const bubble = screen
        .getByText('Hello, tell me about yourself')
        .closest('div');
      expect(bubble?.className).toMatch(/rounded/);
    });

    it('applies appropriate padding', () => {
      render(<MessageBubble message={baseUserMessage} />);

      const bubble = screen
        .getByText('Hello, tell me about yourself')
        .closest('div');
      expect(bubble?.className).toMatch(/p-/);
    });

    it('has max-width constraint for readability', () => {
      render(<MessageBubble message={baseUserMessage} />);

      const bubble = screen
        .getByText('Hello, tell me about yourself')
        .closest('div');
      expect(bubble?.className).toMatch(/max-w-/);
    });
  });
});
