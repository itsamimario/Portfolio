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
  const stickyClasses = isSticky
    ? 'sticky top-0 bg-white border-b border-black z-10'
    : '';

  return (
    <nav
      aria-label="Portfolio navigation"
      className={`flex gap-6 py-3 font-pixel text-black text-lg ${stickyClasses}`}
    >
      <a
        href="/about"
        className="hover:underline focus:outline-none focus:underline"
      >
        About
      </a>
      <a
        href="/case-studies"
        className="hover:underline focus:outline-none focus:underline"
      >
        Case Studies
      </a>
      <a
        href="/playbook"
        className="hover:underline focus:outline-none focus:underline"
      >
        Product Playbook
      </a>
    </nav>
  );
}
