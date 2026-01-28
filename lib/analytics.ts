/**
 * Amplitude Analytics
 * Tracks page views and user interactions
 */

import * as amplitude from '@amplitude/analytics-browser';

let initialized = false;

/**
 * Initialize Amplitude with API key
 */
export function initAnalytics(): void {
  if (initialized || typeof window === 'undefined') return;

  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey) {
    console.warn('Amplitude API key not found');
    return;
  }

  amplitude.init(apiKey, {
    defaultTracking: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
      fileDownloads: true,
    },
  });

  initialized = true;
}

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (!initialized) return;
  amplitude.track(eventName, properties);
}

/**
 * Track page view (for client-side navigation)
 */
export function trackPageView(pageName: string, properties?: Record<string, unknown>): void {
  trackEvent('Page Viewed', {
    page: pageName,
    url: typeof window !== 'undefined' ? window.location.href : '',
    ...properties,
  });
}

/**
 * Track chat interaction
 */
export function trackChatMessage(question: string): void {
  trackEvent('Chat Message Sent', {
    questionLength: question.length,
  });
}

/**
 * Track link click
 */
export function trackLinkClick(linkName: string, destination: string): void {
  trackEvent('Link Clicked', {
    linkName,
    destination,
  });
}
