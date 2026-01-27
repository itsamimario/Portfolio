/**
 * WorkItem component
 * Displays a single work entry in the work list
 * Features scale+blur scroll animation and blue accent on hover
 */

'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import type { CaseStudy } from '@/types/content';

interface WorkItemProps {
  caseStudy: CaseStudy;
  index?: number;
}

/**
 * Strips markdown bold syntax from text
 */
function stripBold(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1');
}

export function WorkItem({ caseStudy, index = 0 }: WorkItemProps): JSX.Element {
  const { id, title, company, role, period, tagline } = caseStudy;
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Staggered delay based on index
            setTimeout(() => setIsVisible(true), index * 150);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 scale-100 blur-0'
          : 'opacity-0 scale-95 blur-sm'
      }`}
    >
      <Link href={`/case-studies/${id}`}>
        <article className="group border-b border-gray-200 dark:border-gray-700 py-8 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 -mx-4 px-4 cursor-pointer">
          <div>
            <h2 className="font-pixel text-xl md:text-2xl mb-2 text-black dark:text-white">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-pixel text-xs mb-3 uppercase tracking-wide">
              {company} · {role} · {period}
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-pixel leading-relaxed">
              {stripBold(tagline)}
            </p>
          </div>
        </article>
      </Link>
    </div>
  );
}
