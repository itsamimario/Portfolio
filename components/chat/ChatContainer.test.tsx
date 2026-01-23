/**
 * Tests for ChatContainer component
 * Phase 7: Chat UI - Message-based architecture
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatContainer } from './ChatContainer';

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = jest.fn();

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock the useChat hook
const mockSendMessage = jest.fn();
const mockClearMessages = jest.fn();

// Default mock return with initial messages
// Note: All intro messages have isTyping: false for tests so they render immediately
// In production, they animate sequentially with isTyping: true
const createMockUseChatReturn = (overrides = {}) => ({
  messages: [
    {
      id: 'intro-hi',
      role: 'assistant' as const,
      content: "Hi!",
      timestamp: new Date(),
      variant: 'intro' as const,
      isTyping: false,
    },
    {
      id: 'intro-name',
      role: 'assistant' as const,
      content: "I'm Mario Bennekers",
      timestamp: new Date(),
      variant: 'intro' as const,
      isTyping: false,
    },
    {
      id: 'intro-title',
      role: 'assistant' as const,
      content: "Product Manager",
      timestamp: new Date(),
      variant: 'intro' as const,
      isTyping: false,
    },
    {
      id: 'intro-description',
      role: 'assistant' as const,
      content: "This is my portfolio, feel free to navigate through it or ask directly any question about myself.",
      timestamp: new Date(),
      variant: 'intro' as const,
      isTyping: false,
    },
  ],
  isLoading: false,
  error: null as string | null,
  sendMessage: mockSendMessage,
  clearMessages: mockClearMessages,
  ...overrides,
});

let mockUseChatReturn = createMockUseChatReturn();

jest.mock('@/lib/hooks/useChat', () => ({
  useChat: () => mockUseChatReturn,
}));

describe('ChatContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseChatReturn = createMockUseChatReturn();
  });

  describe('initial state with intro messages', () => {
    it('shows intro greeting content', () => {
      render(<ChatContainer />);

      expect(screen.getByText(/Hi!/)).toBeInTheDocument();
      // Mario Bennekers appears in multiple places, just check one exists
      expect(screen.getAllByText(/Mario Bennekers/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Product Manager/)).toBeInTheDocument();
    });

    it('shows intro description', () => {
      render(<ChatContainer />);

      expect(screen.getByText(/This is my portfolio/)).toBeInTheDocument();
    });

    it('shows ChatInput', () => {
      render(<ChatContainer />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('shows inline navigation links', () => {
      render(<ChatContainer />);

      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Case Studies')).toBeInTheDocument();
      expect(screen.getByText('Product Playbook')).toBeInTheDocument();
    });

    it('shows message list with initial messages', () => {
      render(<ChatContainer />);

      expect(screen.getByRole('log')).toBeInTheDocument();
    });
  });

  describe('with user messages', () => {
    beforeEach(() => {
      mockUseChatReturn = createMockUseChatReturn({
        messages: [
          ...createMockUseChatReturn().messages,
          {
            id: 'user-1',
            role: 'user' as const,
            content: 'Hello',
            timestamp: new Date(),
          },
          {
            id: 'assistant-1',
            role: 'assistant' as const,
            content: 'Hi there!',
            timestamp: new Date(),
            sources: [],
          },
        ],
      });
    });

    it('displays user messages', () => {
      render(<ChatContainer />);

      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('displays assistant messages', () => {
      render(<ChatContainer />);

      expect(screen.getByText('Hi there!')).toBeInTheDocument();
    });
  });

  describe('sending messages', () => {
    it('calls sendMessage when user submits input', async () => {
      const user = userEvent.setup();
      render(<ChatContainer />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Test message{Enter}');

      expect(mockSendMessage).toHaveBeenCalledWith('Test message');
    });

    it('disables input while loading', () => {
      mockUseChatReturn = createMockUseChatReturn({ isLoading: true });

      render(<ChatContainer />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('loading state', () => {
    it('shows processing indicator when loading', () => {
      mockUseChatReturn = createMockUseChatReturn({ isLoading: true });

      render(<ChatContainer />);

      expect(screen.getByText('processing')).toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('displays error message when error exists', () => {
      mockUseChatReturn = createMockUseChatReturn({
        error: 'Something went wrong',
      });

      render(<ChatContainer />);

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    it('error message has terminal-style formatting', () => {
      mockUseChatReturn = createMockUseChatReturn({
        error: 'API error',
      });

      render(<ChatContainer />);

      expect(screen.getByText(/\[error\]/i)).toBeInTheDocument();
      expect(screen.getByText(/api error/i)).toBeInTheDocument();
    });
  });

  describe('layout and styling', () => {
    it('has appropriate container styling', () => {
      const { container } = render(<ChatContainer />);

      const chatContainer = container.firstChild as HTMLElement;
      expect(chatContainer.className).toMatch(/flex|grid/);
    });

    it('has max-width for readability', () => {
      const { container } = render(<ChatContainer />);

      const chatContainer = container.firstChild as HTMLElement;
      expect(chatContainer.className).toMatch(/max-w-/);
    });

    it('centers container on page', () => {
      const { container } = render(<ChatContainer />);

      const chatContainer = container.firstChild as HTMLElement;
      expect(chatContainer.className).toMatch(/mx-auto/);
    });
  });

  describe('accessibility', () => {
    it('has main landmark role', () => {
      render(<ChatContainer />);

      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('has appropriate heading structure', () => {
      render(<ChatContainer />);

      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('focuses input after sending message', async () => {
      const user = userEvent.setup();
      render(<ChatContainer />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Test{Enter}');

      await waitFor(() => {
        expect(document.activeElement).toBe(input);
      });
    });
  });
});
