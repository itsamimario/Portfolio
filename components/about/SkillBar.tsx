/**
 * SkillBar component
 * Animated progress bar for a single skill
 */

'use client';

import { useEffect, useState, useRef } from 'react';

interface SkillBarProps {
  name: string;
  proficiency: number;
}

export function SkillBar({ name, proficiency }: SkillBarProps): JSX.Element {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the bar when it comes into view
            setTimeout(() => setWidth(proficiency), 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [proficiency]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-700">{name}</span>
        <span className="text-xs font-pixel text-gray-500">{proficiency}%</span>
      </div>
      <div className="h-2 bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
