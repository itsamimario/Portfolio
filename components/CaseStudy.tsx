import Image from 'next/image';
import Link from 'next/link';
import { CaseStudyProps } from '@/types/content';

/**
 * CaseStudy Component
 * Displays a case study in either card or full view
 */
export function CaseStudy({ caseStudy, variant = 'card' }: CaseStudyProps) {
  if (variant === 'card') {
    return (
      <Link href={`/case-studies/${caseStudy.id}`}>
        <article className="group bg-white border-2 border-black overflow-hidden hover:bg-gray-50 transition-colors cursor-pointer">
          {caseStudy.thumbnail && (
            <div className="relative h-48 w-full overflow-hidden border-b-2 border-black">
              <Image
                src={caseStudy.thumbnail}
                alt={caseStudy.thumbnailAlt || caseStudy.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="font-pixel text-2xl mb-2">
              {caseStudy.title}
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              {caseStudy.role} | {caseStudy.period}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {caseStudy.tagline}
            </p>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="font-pixel text-4xl md:text-5xl mb-4">
          {caseStudy.title}
        </h1>
        <p className="text-lg text-gray-500 mb-4">
          {caseStudy.role} at {caseStudy.company} | {caseStudy.period}
        </p>
        <p className="text-xl text-gray-700 leading-relaxed">
          {caseStudy.tagline}
        </p>
      </header>

      {/* Thumbnail */}
      {caseStudy.thumbnail && (
        <div className="relative h-96 w-full overflow-hidden mb-12 border-2 border-black">
          <Image
            src={caseStudy.thumbnail}
            alt={caseStudy.thumbnailAlt || caseStudy.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Challenge Section */}
      {caseStudy.challenge && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-4">
            The Challenge
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {caseStudy.challenge}
          </p>
        </section>
      )}

      {/* Approach Section */}
      {caseStudy.approach && caseStudy.approach.length > 0 && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-6">
            My Approach
          </h2>
          <div className="space-y-6">
            {caseStudy.approach.map((step, index) => (
              <div key={`approach-${step.title}`} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 border-2 border-black flex items-center justify-center font-pixel">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-pixel text-xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Decisions */}
      {caseStudy.keyDecisions && caseStudy.keyDecisions.length > 0 && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-6">
            Key Decisions
          </h2>
          <ul className="space-y-3">
            {caseStudy.keyDecisions.map((decision, index) => (
              <li key={`decision-${index}-${decision.slice(0, 20)}`} className="flex gap-3 text-gray-700">
                <span className="flex-shrink-0">→</span>
                <span className="leading-relaxed">{decision}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Results */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-6">
            Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudy.results.map((result) => (
              <div
                key={`result-${result.metric}`}
                className="border-2 border-black p-6"
              >
                <p className="text-sm text-gray-500 mb-2">{result.metric}</p>
                <p className="font-pixel text-3xl mb-2">
                  {result.value}
                </p>
                {result.description && (
                  <p className="text-sm text-gray-700">{result.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {caseStudy.techStack && caseStudy.techStack.length > 0 && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-6">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {caseStudy.techStack.map((tech) => (
              <span
                key={`tech-${tech}`}
                className="px-4 py-2 border-2 border-black text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Embed (if provided) */}
      {caseStudy.embedUrl && (
        <section className="mb-12">
          <div className="relative w-full h-96 md:h-[600px] overflow-hidden border-2 border-black">
            <iframe
              src={caseStudy.embedUrl}
              title="Case study embed"
              className="w-full h-full"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </section>
      )}

      {/* Links */}
      {caseStudy.links && caseStudy.links.length > 0 && (
        <section className="mb-12">
          <div className="flex flex-wrap gap-4">
            {caseStudy.links.map((link) => (
              <a
                key={`link-${link.label}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {link.label} →
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
