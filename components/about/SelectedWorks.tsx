/**
 * SelectedWorks component
 * Displays case studies list on the About page
 */

import { WorkList } from '@/components/work';
import { caseStudies } from '@/data/caseStudies';

// Sort case studies by start year (newest first)
const sortedCaseStudies = [...caseStudies].sort((a, b) => {
  const getStartYear = (period: string) => parseInt(period.match(/\d{4}/)?.[0] || '0', 10);
  return getStartYear(b.period) - getStartYear(a.period);
});

export function SelectedWorks(): JSX.Element {
  return (
    <section id="work" className="py-12 scroll-mt-16">
      <h2 className="text-3xl md:text-4xl font-pixel mb-8">Selected Work</h2>
      <WorkList caseStudies={sortedCaseStudies} />
    </section>
  );
}
