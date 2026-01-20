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
    ? 'sticky top-0 bg-white shadow-sm z-10'
    : '';

  return (
    <nav
      aria-label="Portfolio navigation"
      className={`flex gap-6 py-3 px-4 ${stickyClasses}`}
    >
      <a
        href="#about"
        className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-colors"
      >
        About
      </a>
      <a
        href="#case-studies"
        className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-colors"
      >
        Case Studies
      </a>
      <a
        href="#playbook"
        className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-colors"
      >
        Product Playbook
      </a>
    </nav>
  );
}
