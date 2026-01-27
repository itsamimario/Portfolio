/**
 * WorkItem component
 * Displays a single work entry in the work list
 */

import Link from 'next/link';
import type { CaseStudy } from '@/types/content';

interface WorkItemProps {
  caseStudy: CaseStudy;
}

/**
 * Strips markdown bold syntax from text
 */
function stripBold(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1');
}

export function WorkItem({ caseStudy }: WorkItemProps): JSX.Element {
  const { id, title, company, role, period, tagline } = caseStudy;

  return (
    <Link href={`/case-studies/${id}`}>
      <article className="border-b border-gray-200 dark:border-gray-700 py-8 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors -mx-4 px-4 cursor-pointer">
        <h2 className="font-pixel text-2xl md:text-3xl mb-2 text-black dark:text-white">
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-pixel text-sm mb-3">
          {company} · {role} · {period}
        </p>
        <p className="text-gray-700 dark:text-gray-300 font-pixel leading-relaxed">
          {stripBold(tagline)}
        </p>
      </article>
    </Link>
  );
}
