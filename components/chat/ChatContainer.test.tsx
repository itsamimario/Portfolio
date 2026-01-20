/**
 * Tests for ChatContainer component
 * TDD: Write tests FIRST before implementation
 * Phase 7: Chat UI
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatContainer } from './ChatContainer';

// Mock the useChat hook
const mockSendMessage = jest.fn();
const mockClearMessages = jest.fn();

jest.mock('@/lib/hooks/useChat', () => ({
  useChat: () => ({
    messages: [],
    isLoading: false,
    error: null,
    sendMessage: mockSendMessage,
    clearMessages: mockClearMessages,
  }),
}));

// We need to be able to override useChat per test
let mockUseChatReturn = {
  messages: [] as Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: Array<{
      content: string;
      source: string;
      title?: string;
      similarity: number;
    }>;
  }>,
  isLoading: false,
  error: null as string | null,
  sendMessage: mockSendMessage,
  clearMessages: mockClearMessages,
};

jest.mock('@/lib/hooks/useChat', () => ({
  useChat: () => mockUseChatReturn,
}));

describe('ChatContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseChatReturn = {
      messages: [],
      isLoading: false,
      error: null,
      sendMessage: mockSendMessage,
      clearMessages: mockClearMessages,
    };
  });

  describe('initial state (no messages)', () => {
    it('shows TerminalText greeting when no messages', () => {
      render(<ChatContainer />);

      // TerminalText shows the typing effect greeting
      expect(screen.getByTestId('terminal-text')).toBeInTheDocument();
    });

    it('shows ChatInput', () => {
      render(<ChatContainer />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('shows NavigationLinks', () => {
      render(<ChatContainer />);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('NavigationLinks are not sticky initially', () => {
      const { container } = render(<ChatContainer />);

      const nav = container.querySelector('nav');
      expect(nav).not.toHaveClass('sticky');
    });

    it('does not show MessageList when no messages', () => {
      render(<ChatContainer />);

      expect(screen.queryByRole('log')).not.toBeInTheDocument();
    });
  });

  describe('with messages', () => {
    beforeEach(() => {
      mockUseChatReturn = {
        messages: [
          {
            id: 'user-1',
            role: 'user',
            content: 'Hello',
            timestamp: new Date(),
          },
          {
            id: 'assistant-1',
            role: 'assistant',
            content: 'Hi there!',
            timestamp: new Date(),
            sources: [],
          },
        ],
        isLoading: false,
        error: null,
        sendMessage: mockSendMessage,
        clearMessages: mockClearMessages,
      };
    });

    it('hides TerminalText when messages exist', () => {
      render(<ChatContainer />);

      expect(screen.queryByTestId('terminal-text')).not.toBeInTheDocument();
    });

    it('shows MessageList when messages exist', () => {
      render(<ChatContainer />);

      expect(screen.getByRole('log')).toBeInTheDocument();
    });

    it('displays user messages', () => {
      render(<ChatContainer />);

      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('displays assistant messages', () => {
      render(<ChatContainer />);

      expect(screen.getByText('Hi there!')).toBeInTheDocument();
    });

    it('NavigationLinks become sticky after first message', () => {
      const { container } = render(<ChatContainer />);

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('sticky');
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
      mockUseChatReturn = {
        ...mockUseChatReturn,
        isLoading: true,
      };

      render(<ChatContainer />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('error handling', () => {
    it('displays error message when error exists', () => {
      mockUseChatReturn = {
        ...mockUseChatReturn,
        error: 'Something went wrong',
      };

      render(<ChatContainer />);

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    it('error message has appropriate styling', () => {
      mockUseChatReturn = {
        ...mockUseChatReturn,
        error: 'API error',
      };

      render(<ChatContainer />);

      const errorElement = screen.getByText(/api error/i);
      expect(errorElement.className).toMatch(/text-red|bg-red/);
    });
  });

  describe('example questions', () => {
    it('shows example questions when no messages', () => {
      render(<ChatContainer />);

      // Should show clickable example questions
      expect(screen.getByText(/what.*experience/i)).toBeInTheDocument();
    });

    it('clicking example question sends it as message', async () => {
      const user = userEvent.setup();
      render(<ChatContainer />);

      const exampleQuestion = screen.getByText(/what.*experience/i);
      await user.click(exampleQuestion);

      expect(mockSendMessage).toHaveBeenCalled();
    });

    it('hides example questions when messages exist', () => {
      mockUseChatReturn = {
        ...mockUseChatReturn,
        messages: [
          {
            id: 'user-1',
            role: 'user',
            content: 'Hello',
            timestamp: new Date(),
          },
        ],
      };

      render(<ChatContainer />);

      // Example questions should be hidden
      const exampleButtons = screen.queryAllByRole('button', {
        name: /what.*experience/i,
      });
      expect(exampleButtons).toHaveLength(0);
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

      // Should have a heading for the chat section
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
