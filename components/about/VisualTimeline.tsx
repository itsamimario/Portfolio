/**
 * VisualTimeline component
 * Displays work experience with a year ruler on the left side
 * Features subtle scroll-based animations
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import type { TimelineEntry } from '@/types/timeline';

interface VisualTimelineProps {
  entries: TimelineEntry[];
}

// Parse period string to get start and end years
function parseYears(period: string): { start: number; end: number } {
  const parts = period.split(' - ');
  const startMatch = parts[0].match(/\d{4}/);
  const endMatch = parts[1]?.match(/\d{4}/) || (parts[1] === 'Present' ? null : null);

  const start = startMatch ? parseInt(startMatch[0]) : 2015;
  const end = endMatch ? parseInt(endMatch[0]) : 2026;

  return { start, end };
}

interface TimelineEntryRowProps {
  entry: TimelineEntry;
  index: number;
}

function TimelineEntryRow({ entry, index }: TimelineEntryRowProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const entryRef = useRef<HTMLDivElement>(null);
  const isCareerPivot = entry.id === 'sabbatical';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add small stagger based on index
            setTimeout(() => setIsVisible(true), index * 100);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (entryRef.current) {
      observer.observe(entryRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={entryRef}
      className={`relative pl-8 md:pl-12 pb-8 border-l-2 border-gray-300 last:border-l-0 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-[-5px] top-1 w-2 h-2 bg-black rounded-full transition-transform duration-500 ${
          isVisible ? 'scale-100' : 'scale-0'
        }`}
      />

      {/* Year marker */}
      <div className="absolute left-[-60px] md:left-[-80px] top-0 text-sm md:text-base font-pixel text-gray-500 w-12 md:w-16 text-right">
        {parseYears(entry.period).start}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Header */}
        <div>
          {isCareerPivot ? (
            <h3 className="text-xl md:text-2xl font-pixel">
              <span className="inline-block text-xs font-pixel bg-gray-200 px-2 py-1 mr-2 align-middle">
                CAREER PIVOT
              </span>
              {entry.role}
            </h3>
          ) : (
            <h3 className="text-xl md:text-2xl font-pixel">
              {entry.company}
            </h3>
          )}
          {entry.companyDescription && (
            <p className="text-base font-pixel text-gray-500 mb-1">
              {entry.companyDescription}
            </p>
          )}
          {!isCareerPivot && (
            <p className="font-pixel text-gray-700">
              {entry.role}
            </p>
          )}
          <p className="text-base font-pixel text-gray-500">
            {entry.period} | {entry.location}
          </p>
        </div>

        {/* Description */}
        <p className="font-pixel text-gray-700 leading-relaxed">
          {entry.description}
        </p>

        {/* Case Studies - Terminal style */}
        {entry.caseStudies.length > 0 && (
          <div className="mt-4 font-pixel text-base bg-gray-50 border border-gray-200 p-4">
            <div className="text-gray-500 mb-2">case_studies/</div>
            {entry.caseStudies.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.id}`}
                className="block text-blue-600 hover:text-blue-800 hover:underline"
              >
                {'>'} {cs.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function VisualTimeline({ entries }: VisualTimelineProps): JSX.Element {
  return (
    <section id="experience" className="py-12 border-b border-gray-200">
      <h2 className="text-3xl md:text-4xl font-pixel mb-8">Experience</h2>

      <div className="relative ml-16 md:ml-20">
        {entries.map((entry, index) => (
          <TimelineEntryRow key={entry.id} entry={entry} index={index} />
        ))}
      </div>
    </section>
  );
}
