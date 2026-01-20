/**
 * NavigationLinks component for chat section navigation
 * Phase 7: Chat UI
 */

import type { NavigationLinksProps } from '@/types/chat-ui';

/**
 * Navigation links that appear in the chat section
 * Can be sticky after first message is sent
 *
 * @param isSticky - Whether to apply sticky positioning
 */
export function NavigationLinks({
  isSticky = false,
}: NavigationLinksProps): JSX.Element {
  // Sticky header: add left padding to align with message content
  const stickyClasses = isSticky ? 'pl-4' : '';

  return (
    <nav
      aria-label="Portfolio navigation"
      className={`flex gap-6 py-3 font-pixel text-lg ${stickyClasses}`}
    >
      <a
        href="/about"
        className="text-blue-600 underline hover:text-blue-800 focus:outline-none"
      >
        About
      </a>
      <a
        href="/case-studies"
        className="text-blue-600 underline hover:text-blue-800 focus:outline-none"
      >
        Case Studies
      </a>
      <a
        href="/playbook"
        className="text-blue-600 underline hover:text-blue-800 focus:outline-none"
      >
        Product Playbook
      </a>
    </nav>
  );
}
