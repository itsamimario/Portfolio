/**
 * SkillBar component
 * Animated progress bar with pixel-style square blocks
 */

'use client';

import { useEffect, useState, useRef } from 'react';

interface SkillBarProps {
  name: string;
  proficiency: number;
}

const TOTAL_BLOCKS = 20;

export function SkillBar({ name, proficiency }: SkillBarProps): JSX.Element {
  const [filledBlocks, setFilledBlocks] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const targetBlocks = Math.round(proficiency / 5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate blocks filling one by one
            let current = 0;
            const interval = setInterval(() => {
              current += 1;
              setFilledBlocks(current);
              if (current >= targetBlocks) {
                clearInterval(interval);
              }
            }, 40);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [targetBlocks]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="mb-1">
        <span className="text-base font-pixel text-gray-700">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_BLOCKS }).map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 transition-colors duration-150 ${
                index < filledBlocks ? 'bg-black' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-pixel text-gray-500">{proficiency}%</span>
      </div>
    </div>
  );
}
