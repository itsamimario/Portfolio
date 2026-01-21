/**
 * ImpactHighlights component
 * Displays key impact metrics in a grid layout
 */

import { highlights } from '@/data/highlights';
import { valueProposition } from '@/data/contact';

export function ImpactHighlights(): JSX.Element {
  return (
    <section className="py-12 border-b border-gray-200">
      <h2 className="text-3xl md:text-4xl font-pixel mb-8">Impact</h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        {highlights.map((highlight) => (
          <div
            key={highlight.label}
            className="border border-gray-200 p-4 md:p-6 text-center"
          >
            <div className="text-3xl md:text-4xl font-pixel text-black mb-1">
              {highlight.metric}
            </div>
            <div className="text-sm md:text-base font-pixel text-gray-700 mb-1">
              {highlight.label}
            </div>
            <div className="text-xs text-gray-500">
              {highlight.context}
            </div>
          </div>
        ))}
      </div>

      {/* Value Proposition */}
      <div className="bg-gray-50 border border-gray-200 p-6">
        <p className="text-gray-700 leading-relaxed">
          {valueProposition}
        </p>
      </div>
    </section>
  );
}
