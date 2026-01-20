/**
 * Tests for useChat hook
 * Phase 7: Chat UI - Message-based architecture
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useChat } from './useChat';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('useChat hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockReset();
  });

  describe('initial state', () => {
    it('has initial intro messages', () => {
      const { result } = renderHook(() => useChat());

      // Should have 5 initial messages (intro-hi, intro-name, intro-title, intro-description, nav-links)
      expect(result.current.messages.length).toBe(5);
      expect(result.current.messages[0].id).toBe('intro-hi');
      expect(result.current.messages[1].id).toBe('intro-name');
      expect(result.current.messages[2].id).toBe('intro-title');
      expect(result.current.messages[3].id).toBe('intro-description');
      expect(result.current.messages[4].id).toBe('nav-links');
    });

    it('has isLoading false initially', () => {
      const { result } = renderHook(() => useChat());

      expect(result.current.isLoading).toBe(false);
    });

    it('has no error initially', () => {
      const { result } = renderHook(() => useChat());

      expect(result.current.error).toBeNull();
    });

    it('provides sendMessage function', () => {
      const { result } = renderHook(() => useChat());

      expect(typeof result.current.sendMessage).toBe('function');
    });

    it('provides clearMessages function', () => {
      const { result } = renderHook(() => useChat());

      expect(typeof result.current.clearMessages).toBe('function');
    });
  });

  describe('sendMessage', () => {
    it('adds user message immediately when called', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            answer: 'Test response',
            sources: [],
          }),
      });

      const { result } = renderHook(() => useChat());
      const initialLength = result.current.messages.length;

      await act(async () => {
        result.current.sendMessage('Hello');
      });

      // User message should be added after initial messages
      const userMessages = result.current.messages.filter(
        (m) => m.role === 'user'
      );
      expect(userMessages).toHaveLength(1);
      expect(userMessages[0].content).toBe('Hello');
    });

    it('calls API with the message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            answer: 'Test response',
            sources: [],
          }),
      });

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('What is your experience?');
      });

      expect(mockFetch).toHaveBeenCalledWith('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: 'What is your experience?' }),
      });
    });

    it('adds assistant response after API call completes', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            answer: 'I have 10 years of experience.',
            sources: [{ content: 'Source 1', source: 'about', similarity: 0.9 }],
          }),
      });

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('What is your experience?');
      });

      await waitFor(() => {
        // Find the non-intro assistant message
        const assistantResponses = result.current.messages.filter(
          (m) => m.role === 'assistant' && !m.variant
        );
        expect(assistantResponses).toHaveLength(1);
        expect(assistantResponses[0].content).toBe('I have 10 years of experience.');
        expect(assistantResponses[0].sources).toHaveLength(1);
      });
    });

    it('sets isLoading to true during API call', async () => {
      let resolvePromise: (value: unknown) => void;
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      mockFetch.mockReturnValueOnce(pendingPromise);

      const { result } = renderHook(() => useChat());

      act(() => {
        result.current.sendMessage('Test message');
      });

      // Should be loading while waiting
      expect(result.current.isLoading).toBe(true);

      // Resolve the promise
      await act(async () => {
        resolvePromise!({
          ok: true,
          json: () => Promise.resolve({ answer: 'Response', sources: [] }),
        });
      });

      // Should stop loading after response
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('generates unique IDs for each message', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ answer: 'Response 1', sources: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ answer: 'Response 2', sources: [] }),
        });

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('Message 1');
      });

      await act(async () => {
        await result.current.sendMessage('Message 2');
      });

      const ids = result.current.messages.map((m) => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('error handling', () => {
    it('sets error when API call fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Internal server error' }),
      });

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('Test message');
      });

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });
    });

    it('sets error when network request fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('Test message');
      });

      await waitFor(() => {
        expect(result.current.error).toBe('Network error');
      });
    });

    it('clears error on next successful message', async () => {
      // First call fails
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' }),
      });

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('First message');
      });

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });

      // Second call succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ answer: 'Success', sources: [] }),
      });

      await act(async () => {
        await result.current.sendMessage('Second message');
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });

    it('still adds user message even when API fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('My message');
      });

      const userMessages = result.current.messages.filter(
        (m) => m.role === 'user'
      );
      expect(userMessages).toHaveLength(1);
      expect(userMessages[0].content).toBe('My message');
    });
  });

  describe('clearMessages', () => {
    it('resets to initial messages', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ answer: 'Response', sources: [] }),
      });

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('Test');
      });

      // Should have more than initial messages
      expect(result.current.messages.length).toBeGreaterThan(5);

      act(() => {
        result.current.clearMessages();
      });

      // Should reset to initial 5 messages
      expect(result.current.messages.length).toBe(5);
      expect(result.current.messages[0].id).toBe('intro-hi');
    });

    it('clears error state', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Error'));

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('Test');
      });

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });

      act(() => {
        result.current.clearMessages();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('message timestamps', () => {
    it('adds timestamp to user messages', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ answer: 'Response', sources: [] }),
      });

      const beforeSend = new Date();

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('Test');
      });

      const userMessages = result.current.messages.filter(
        (m) => m.role === 'user'
      );
      expect(userMessages[0].timestamp).toBeInstanceOf(Date);
      expect(userMessages[0].timestamp.getTime()).toBeGreaterThanOrEqual(
        beforeSend.getTime()
      );
    });

    it('adds timestamp to assistant messages', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ answer: 'Response', sources: [] }),
      });

      const { result } = renderHook(() => useChat());

      await act(async () => {
        await result.current.sendMessage('Test');
      });

      await waitFor(() => {
        const assistantResponses = result.current.messages.filter(
          (m) => m.role === 'assistant' && !m.variant
        );
        expect(assistantResponses[0].timestamp).toBeInstanceOf(Date);
      });
    });
  });
});
