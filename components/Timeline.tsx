/**
 * Timeline component
 * Displays work experience in reverse chronological order
 */

import type { TimelineEntry as TimelineEntryType } from '@/types/timeline';
import { TimelineEntry } from './TimelineEntry';

interface TimelineProps {
  entries: TimelineEntryType[];
}

export function Timeline({ entries }: TimelineProps): JSX.Element {
  return (
    <section className="py-12 font-pixel">
      <h2 className="text-3xl md:text-4xl mb-8">Experience</h2>
      <div>
        {entries.map((entry) => (
          <TimelineEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
