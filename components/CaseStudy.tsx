import Image from 'next/image';
import { CaseStudyProps } from '@/types/content';

/**
 * CaseStudy Component
 * Displays a case study in either card or full view
 */
export function CaseStudy({ caseStudy, variant = 'card' }: CaseStudyProps) {
  if (variant === 'card') {
    return (
      <article className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={caseStudy.thumbnail}
            alt={caseStudy.thumbnailAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {caseStudy.role} • {caseStudy.period}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {caseStudy.tagline}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {caseStudy.title}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {caseStudy.role} at {caseStudy.company} • {caseStudy.period}
        </p>
        <p className="text-xl text-gray-700 leading-relaxed">
          {caseStudy.tagline}
        </p>
      </header>

      {/* Thumbnail */}
      <div className="relative h-96 w-full rounded-lg overflow-hidden mb-12">
        <Image
          src={caseStudy.thumbnail}
          alt={caseStudy.thumbnailAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Challenge Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          The Challenge
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {caseStudy.challenge}
        </p>
      </section>

      {/* Approach Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          My Approach
        </h2>
        <div className="space-y-6">
          {caseStudy.approach.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
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

      {/* Key Decisions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Key Decisions
        </h2>
        <ul className="space-y-3">
          {caseStudy.keyDecisions.map((decision, index) => (
            <li key={index} className="flex gap-3 text-gray-700">
              <span className="text-blue-600 flex-shrink-0">•</span>
              <span className="leading-relaxed">{decision}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Results */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudy.results.map((result, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <p className="text-sm text-gray-600 mb-2">{result.metric}</p>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {result.value}
              </p>
              {result.description && (
                <p className="text-sm text-gray-700">{result.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {caseStudy.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Embed (if provided) */}
      {caseStudy.embedUrl && (
        <section className="mb-12">
          <div className="relative w-full h-96 md:h-[600px] rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src={caseStudy.embedUrl}
              title="Case study embed"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Links */}
      {caseStudy.links && caseStudy.links.length > 0 && (
        <section className="mb-12">
          <div className="flex flex-wrap gap-4">
            {caseStudy.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {link.label}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
