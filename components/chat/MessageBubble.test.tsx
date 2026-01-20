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

    it('uses terminal prompt character > for user messages', () => {
      render(<MessageBubble message={baseUserMessage} />);

      // Terminal style uses > for user input
      expect(screen.getByText('>')).toBeInTheDocument();
    });

    it('applies black text color (terminal style)', () => {
      const { container } = render(<MessageBubble message={baseUserMessage} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/text-black/);
    });

    it('uses pixel font for terminal aesthetic', () => {
      const { container } = render(<MessageBubble message={baseUserMessage} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/font-pixel/);
    });

    it('does not show sources for user messages', () => {
      render(<MessageBubble message={baseUserMessage} />);

      // User messages only show content, not sources
      expect(screen.queryByText(/\[sources\]/i)).not.toBeInTheDocument();
    });
  });

  describe('assistant messages', () => {
    it('renders assistant message content', () => {
      render(<MessageBubble message={baseAssistantMessage} />);

      expect(
        screen.getByText('I am Mario, a Product Manager with AI experience.')
      ).toBeInTheDocument();
    });

    it('uses terminal prompt character $ for assistant messages', () => {
      render(<MessageBubble message={baseAssistantMessage} />);

      // Terminal style uses $ for system/assistant output
      expect(screen.getByText('$')).toBeInTheDocument();
    });

    it('applies black text color (terminal style)', () => {
      const { container } = render(
        <MessageBubble message={baseAssistantMessage} />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/text-black/);
    });

    it('uses pixel font for terminal aesthetic', () => {
      const { container } = render(
        <MessageBubble message={baseAssistantMessage} />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/font-pixel/);
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
    it('uses full width for terminal style', () => {
      const { container } = render(<MessageBubble message={baseUserMessage} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toMatch(/w-full/);
    });

    it('uses flex layout for prompt and content', () => {
      const { container } = render(<MessageBubble message={baseUserMessage} />);

      const inner = container.querySelector('.flex.gap-2');
      expect(inner).toBeInTheDocument();
    });

    it('has consistent text sizing', () => {
      render(<MessageBubble message={baseUserMessage} />);

      const content = screen.getByText('Hello, tell me about yourself');
      expect(content.className).toMatch(/text-lg/);
    });
  });
});
