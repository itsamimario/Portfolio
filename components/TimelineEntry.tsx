/**
 * TimelineEntry component
 * Displays a single work experience entry in the timeline
 */

import Link from 'next/link';
import type { TimelineEntry as TimelineEntryType } from '@/types/timeline';

interface TimelineEntryProps {
  entry: TimelineEntryType;
}

export function TimelineEntry({ entry }: TimelineEntryProps): JSX.Element {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-8 mb-8 last:border-b-0 last:pb-0 last:mb-0">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-2xl md:text-3xl mb-1">{entry.company}</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">{entry.role}</p>
        <p className="text-gray-500 dark:text-gray-400">{entry.period} | {entry.location}</p>
      </div>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{entry.description}</p>

      {/* Case Studies */}
      {entry.caseStudies.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Case Studies:</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {entry.caseStudies.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.id}`}
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                {cs.title}
                {cs.status === 'under-construction' && (
                  <span className="text-gray-400 dark:text-gray-500 no-underline ml-1">(wip)</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
