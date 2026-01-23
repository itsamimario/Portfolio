/**
 * Tests for ChatInput component
 * TDD: Write tests FIRST before implementation
 * Phase 7: Chat UI
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from './ChatInput';

describe('ChatInput', () => {
  const mockOnSend = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders an input field', () => {
      render(<ChatInput onSend={mockOnSend} />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders a send button', () => {
      render(<ChatInput onSend={mockOnSend} />);

      expect(
        screen.getByRole('button', { name: /send/i })
      ).toBeInTheDocument();
    });

    it('has terminal-style prompt character', () => {
      render(<ChatInput onSend={mockOnSend} />);

      // Terminal style uses > as prompt
      expect(screen.getByText('>')).toBeInTheDocument();
    });

    it('has placeholder text', () => {
      render(<ChatInput onSend={mockOnSend} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'type something here');
    });
  });

  describe('sending messages', () => {
    it('calls onSend when send button is clicked', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={mockOnSend} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Hello world');

      const sendButton = screen.getByRole('button', { name: /send/i });
      await user.click(sendButton);

      expect(mockOnSend).toHaveBeenCalledWith('Hello world');
    });

    it('calls onSend when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={mockOnSend} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Test message{Enter}');

      expect(mockOnSend).toHaveBeenCalledWith('Test message');
    });

    it('clears input after sending', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={mockOnSend} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Message to send');
      await user.click(screen.getByRole('button', { name: /send/i }));

      expect(input).toHaveValue('');
    });

    it('does not call onSend when message is empty', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={mockOnSend} />);

      const sendButton = screen.getByRole('button', { name: /send/i });
      await user.click(sendButton);

      expect(mockOnSend).not.toHaveBeenCalled();
    });

    it('does not call onSend when message is only whitespace', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={mockOnSend} />);

      const input = screen.getByRole('textbox');
      await user.type(input, '   ');
      await user.click(screen.getByRole('button', { name: /send/i }));

      expect(mockOnSend).not.toHaveBeenCalled();
    });

    it('trims whitespace before sending', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={mockOnSend} />);

      const input = screen.getByRole('textbox');
      await user.type(input, '  Hello world  ');
      await user.click(screen.getByRole('button', { name: /send/i }));

      expect(mockOnSend).toHaveBeenCalledWith('Hello world');
    });

    it('does not send on Shift+Enter (allows multiline)', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={mockOnSend} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Line 1{Shift>}{Enter}{/Shift}Line 2');

      expect(mockOnSend).not.toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('disables input when disabled prop is true', () => {
      render(<ChatInput onSend={mockOnSend} disabled={true} />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('disables send button when disabled prop is true', () => {
      render(<ChatInput onSend={mockOnSend} disabled={true} />);

      expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
    });

    it('does not call onSend when disabled', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={mockOnSend} disabled={true} />);

      // Try clicking the button (even though it's disabled)
      const sendButton = screen.getByRole('button', { name: /send/i });
      await user.click(sendButton).catch(() => {});

      expect(mockOnSend).not.toHaveBeenCalled();
    });

    it('shows loading indicator when disabled', () => {
      render(<ChatInput onSend={mockOnSend} disabled={true} />);

      // Should show some indication of loading state
      expect(
        screen.getByRole('button', { name: /send/i })
      ).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('accessibility', () => {
    it('has accessible label for input', () => {
      render(<ChatInput onSend={mockOnSend} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAccessibleName();
    });

    it('has accessible label for send button', () => {
      render(<ChatInput onSend={mockOnSend} />);

      const button = screen.getByRole('button', { name: /send/i });
      expect(button).toHaveAccessibleName();
    });

    it('form can be submitted with keyboard', async () => {
      const user = userEvent.setup();
      render(<ChatInput onSend={mockOnSend} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Keyboard test{Enter}');

      expect(mockOnSend).toHaveBeenCalledWith('Keyboard test');
    });

    it('focuses input on initial render', () => {
      render(<ChatInput onSend={mockOnSend} />);

      // Note: This might need autoFocus prop or ref.focus() in implementation
      const input = screen.getByRole('textbox');
      expect(document.activeElement).toBe(input);
    });
  });

  describe('styling', () => {
    it('has appropriate container styling', () => {
      const { container } = render(<ChatInput onSend={mockOnSend} />);

      // Should have flex layout for input and button
      const form = container.querySelector('form');
      expect(form).toHaveClass('flex');
    });

    it('input takes available width', () => {
      render(<ChatInput onSend={mockOnSend} />);

      const input = screen.getByRole('textbox');
      expect(input.className).toMatch(/flex-1|grow|w-full/);
    });

    it('has border styling on send button', () => {
      render(<ChatInput onSend={mockOnSend} />);

      const button = screen.getByRole('button', { name: /send/i });
      expect(button.className).toMatch(/border/);
    });
  });
});
