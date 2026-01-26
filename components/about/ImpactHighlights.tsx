/**
 * ImpactHighlights component
 * Displays key impact metrics in a grid layout
 * Features staggered fade-in and count-up animations
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { highlights, type Highlight } from '@/data/highlights';
import { valueProposition } from '@/data/contact';
import { formatText } from '@/lib/format-text';

// Parse metric string to extract number and suffix
function parseMetric(metric: string): { number: number; suffix: string; prefix: string } {
  const match = metric.match(/^([€$]?)(\d+(?:\.\d+)?)\s*(.*)$/);
  if (match) {
    return {
      prefix: match[1] || '',
      number: parseFloat(match[2]),
      suffix: match[3] || '',
    };
  }
  return { prefix: '', number: 0, suffix: metric };
}

interface MetricCardProps {
  highlight: Highlight;
  index: number;
}

function MetricCard({ highlight, index }: MetricCardProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const { prefix, number, suffix } = parseMetric(highlight.metric);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the fade-in
            setTimeout(() => setIsVisible(true), index * 100);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  // Count-up animation after card becomes visible
  useEffect(() => {
    if (!isVisible || number === 0) return;

    const duration = 1000; // 1 second
    const steps = 20;
    const stepDuration = duration / steps;
    const increment = number / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setDisplayNumber(number);
        clearInterval(timer);
      } else {
        setDisplayNumber(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, number]);

  // Format the display number
  const formattedNumber = number % 1 === 0
    ? Math.round(displayNumber).toString()
    : displayNumber.toFixed(1);

  return (
    <div
      ref={cardRef}
      className={`border border-gray-200 dark:border-gray-700 p-4 md:p-6 text-center transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="text-3xl md:text-4xl font-pixel text-black dark:text-white mb-1">
        {prefix}{isVisible ? formattedNumber : '0'}{suffix}
      </div>
      <div className="text-base md:text-lg font-pixel text-gray-700 dark:text-gray-300 mb-1">
        {highlight.label}
      </div>
      <div className="text-sm font-pixel text-gray-500 dark:text-gray-400">
        {highlight.context}
      </div>
    </div>
  );
}

export function ImpactHighlights(): JSX.Element {
  const [valueVisible, setValueVisible] = useState(false);
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setValueVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (valueRef.current) {
      observer.observe(valueRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl md:text-4xl font-pixel mb-8">Impact</h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        {highlights.map((highlight, index) => (
          <MetricCard key={highlight.label} highlight={highlight} index={index} />
        ))}
      </div>

      {/* Value Proposition */}
      <div
        ref={valueRef}
        className={`bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 transition-all duration-500 ease-out ${
          valueVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="font-pixel text-gray-700 dark:text-gray-300 leading-relaxed">
          {formatText(valueProposition)}
        </p>
      </div>
    </section>
  );
}
