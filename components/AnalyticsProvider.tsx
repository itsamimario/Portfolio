'use client';

/**
 * Analytics Provider
 * Initializes Amplitude on mount
 */

import { useEffect } from 'react';
import { initAnalytics } from '@/lib/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }): JSX.Element {
  useEffect(() => {
    initAnalytics();
  }, []);

  return <>{children}</>;
}
