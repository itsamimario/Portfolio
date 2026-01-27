import { StickyNav } from '@/components/about/StickyNav';
import { WorkList } from '@/components/work';
import { caseStudies } from '@/data/caseStudies';

// Sort case studies by start year (newest first)
// Extracts first year from period like "2024 - Present" or "2019 - 2022"
const sortedCaseStudies = [...caseStudies].sort((a, b) => {
  const getStartYear = (period: string) => parseInt(period.match(/\d{4}/)?.[0] || '0', 10);
  return getStartYear(b.period) - getStartYear(a.period);
});

export default function Work() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 font-pixel">
      <StickyNav />

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <h1 className="text-4xl md:text-5xl font-pixel mb-8 text-black dark:text-white">
          Work
        </h1>

        <WorkList caseStudies={sortedCaseStudies} />
      </div>
    </main>
  );
}
