/**
 * TestimonialsSection component
 * Placeholder for testimonials from colleagues and clients
 */

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

// Placeholder testimonials - to be replaced with real ones
const testimonials: Testimonial[] = [
  {
    quote: 'Testimonial coming soon...',
    name: 'Name',
    role: 'Role',
    company: 'Company',
  },
  {
    quote: 'Testimonial coming soon...',
    name: 'Name',
    role: 'Role',
    company: 'Company',
  },
  {
    quote: 'Testimonial coming soon...',
    name: 'Name',
    role: 'Role',
    company: 'Company',
  },
];

export function TestimonialsSection(): JSX.Element {
  return (
    <section className="py-12 border-b border-gray-200">
      <h2 className="text-3xl md:text-4xl font-pixel mb-8">What People Say</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="border border-gray-200 border-dashed p-6 bg-gray-50"
          >
            <div className="text-4xl text-gray-300 mb-2">&ldquo;</div>
            <p className="text-gray-500 italic mb-4 min-h-[60px]">
              {testimonial.quote}
            </p>
            <div className="border-t border-gray-200 pt-4">
              <p className="font-pixel text-gray-400">{testimonial.name}</p>
              <p className="text-sm text-gray-400">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Real testimonials coming soon
      </p>
    </section>
  );
}
