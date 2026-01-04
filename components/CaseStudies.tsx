import { CaseStudiesProps } from '@/types/content';
import { CaseStudy } from './CaseStudy';

/**
 * CaseStudies Component
 * Displays a grid of case study cards
 */
export function CaseStudies({
  caseStudies,
  title = 'Case Studies',
  description,
}: CaseStudiesProps) {
  // Don't render anything if there are no case studies
  if (caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy) => (
            <CaseStudy key={caseStudy.id} caseStudy={caseStudy} variant="card" />
          ))}
        </div>
      </div>
    </section>
  );
}
