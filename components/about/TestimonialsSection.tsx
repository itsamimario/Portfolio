/**
 * TestimonialsSection component
 * Testimonials from colleagues and clients
 */

'use client';

import { useEffect, useState, useRef } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  isPlaceholder?: boolean;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Mario demonstrated great skills in product management. He showed strong managing skills in our product team, helping our company grow from an early startup stage with few developers to a scale-up phase with multiple product teams. He is a valuable asset and I am confident he will exceed your expectations.',
    name: 'Miguel Ángel Torrero',
    role: 'Co-founder at RatedPower',
    company: 'VP at Enverus',
  },
  {
    quote: 'Testimonial coming soon...',
    name: 'Name',
    role: 'Role',
    company: 'Company',
    isPlaceholder: true,
  },
  {
    quote: 'Testimonial coming soon...',
    name: 'Name',
    role: 'Role',
    company: 'Company',
    isPlaceholder: true,
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

  return (
    <div
      ref={cardRef}
      className={`border p-6 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${
        testimonial.isPlaceholder
          ? 'border-gray-200 border-dashed bg-gray-50'
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className={`text-4xl mb-2 ${testimonial.isPlaceholder ? 'text-gray-300' : 'text-gray-400'}`}>
        &ldquo;
      </div>
      <p className={`font-pixel italic mb-4 min-h-[60px] leading-relaxed ${
        testimonial.isPlaceholder ? 'text-gray-400' : 'text-gray-700'
      }`}>
        {testimonial.quote}
      </p>
      <div className="border-t border-gray-200 pt-4">
        <p className={`font-pixel ${testimonial.isPlaceholder ? 'text-gray-400' : 'text-gray-900'}`}>
          {testimonial.name}
        </p>
        <p className={`text-sm font-pixel ${testimonial.isPlaceholder ? 'text-gray-400' : 'text-gray-500'}`}>
          {testimonial.role}
        </p>
        {!testimonial.isPlaceholder && testimonial.company && (
          <p className="text-sm font-pixel text-gray-500">
            {testimonial.company}
          </p>
        )}
      </div>
    </div>
  );
}

export function TestimonialsSection(): JSX.Element {
  return (
    <section className="py-12 border-b border-gray-200">
      <h2 className="text-3xl md:text-4xl font-pixel mb-8">What People Say</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} index={index} />
        ))}
      </div>
    </section>
  );
}
