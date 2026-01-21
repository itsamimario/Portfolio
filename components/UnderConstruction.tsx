/**
 * UnderConstruction component
 * Displays a placeholder for case studies that are not yet complete
 */

import Link from 'next/link';
import type { CaseStudy } from '@/types/content';

interface UnderConstructionProps {
  caseStudy: CaseStudy;
}

export function UnderConstruction({ caseStudy }: UnderConstructionProps): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <h1 className="font-pixel text-4xl md:text-5xl mb-4">{caseStudy.title}</h1>
      <p className="text-gray-500 mb-2">{caseStudy.company} | {caseStudy.role}</p>
      <p className="text-gray-500 mb-8">{caseStudy.period}</p>

      <div className="border-2 border-black p-8 mb-8">
        <p className="font-pixel text-2xl mb-4">Under Construction</p>
        <p className="text-gray-600 mb-6">{caseStudy.tagline}</p>
        <div className="flex justify-center gap-2">
          <span className="w-3 h-3 bg-black animate-pulse" />
          <span className="w-3 h-3 bg-black animate-pulse" style={{ animationDelay: '0.2s' }} />
          <span className="w-3 h-3 bg-black animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      <p className="text-gray-500 mb-8">
        This case study is being written. Check back soon for the full story.
      </p>

      <Link
        href="/about"
        className="text-blue-600 underline hover:text-blue-800"
      >
        ← Back to About
      </Link>
    </div>
  );
}
