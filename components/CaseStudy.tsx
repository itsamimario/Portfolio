import Image from 'next/image';
import Link from 'next/link';
import { CaseStudyProps } from '@/types/content';
import { formatText } from '@/lib/format-text';

/**
 * CaseStudy Component
 * Displays a case study in either card or full view
 * Uses pixel-art font throughout and black/white color scheme
 */
export function CaseStudy({ caseStudy, variant = 'card' }: CaseStudyProps) {
  if (variant === 'card') {
    return (
      <Link href={`/case-studies/${caseStudy.id}`}>
        <article className="group bg-white dark:bg-gray-900 border-2 border-black dark:border-white overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
          {caseStudy.thumbnail && (
            <div className="relative h-48 w-full overflow-hidden border-b-2 border-black dark:border-white">
              <Image
                src={caseStudy.thumbnail}
                alt={caseStudy.thumbnailAlt || caseStudy.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="font-pixel text-2xl mb-2">{caseStudy.title}</h3>
            <p className="font-pixel text-sm text-gray-500 dark:text-gray-400 mb-3">
              {caseStudy.role} | {caseStudy.period}
            </p>
            <p className="font-pixel text-gray-700 dark:text-gray-300 leading-relaxed">
              {formatText(caseStudy.tagline)}
            </p>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <article className="max-w-4xl mx-auto font-pixel">
      {/* Header */}
      <header className="mb-8">
        <h1 className="font-pixel text-3xl md:text-4xl mb-3">{caseStudy.title}</h1>
        <p className="font-pixel text-lg text-gray-500 dark:text-gray-400 mb-4">
          {caseStudy.role} at {caseStudy.company} · {caseStudy.period}
        </p>
        <p className="font-pixel text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          {formatText(caseStudy.tagline)}
        </p>
      </header>

      {/* Hero Image */}
      {caseStudy.thumbnail && (
        <div className="relative w-full mb-10 border-2 border-black dark:border-white">
          <Image
            src={caseStudy.thumbnail}
            alt={caseStudy.thumbnailAlt || caseStudy.title}
            width={1200}
            height={800}
            className="w-full h-auto"
            unoptimized={caseStudy.thumbnail.endsWith('.gif')}
          />
        </div>
      )}

      {/* Challenge Section */}
      {caseStudy.challenge && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-4">The Challenge</h2>
          <p className="font-pixel text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {formatText(caseStudy.challenge)}
          </p>
        </section>
      )}

      {/* Approach Section */}
      {caseStudy.approach && caseStudy.approach.length > 0 && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-6">My Approach</h2>
          <div className="space-y-6">
            {caseStudy.approach.map((step, index) => (
              <div key={`approach-${step.title}`} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 border-2 border-black dark:border-white flex items-center justify-center font-pixel text-lg bg-white dark:bg-gray-900 text-black dark:text-white">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-pixel text-xl mb-2">{step.title}</h3>
                  <p className="font-pixel text-gray-700 dark:text-gray-300 leading-relaxed">
                    {formatText(step.description)}
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
          <h2 className="font-pixel text-2xl md:text-3xl mb-6">Key Decisions</h2>
          <ul className="space-y-3">
            {caseStudy.keyDecisions.map((decision, index) => (
              <li
                key={`decision-${index}`}
                className="font-pixel flex gap-3 text-gray-700 dark:text-gray-300"
              >
                <span className="flex-shrink-0 text-gray-900 dark:text-gray-100 font-bold">→</span>
                <span className="leading-relaxed">{formatText(decision)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Featured Image */}
      {caseStudy.featuredImage && (
        <div className="relative w-full mb-12 border-2 border-black dark:border-white">
          <Image
            src={caseStudy.featuredImage}
            alt={caseStudy.featuredImageAlt || `${caseStudy.title} overview`}
            width={1200}
            height={800}
            className="w-full h-auto"
            unoptimized={caseStudy.featuredImage.endsWith('.gif')}
          />
        </div>
      )}

      {/* Results */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-4">Results</h2>
          {caseStudy.resultsDescription && (
            <p className="font-pixel text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {formatText(caseStudy.resultsDescription)}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {caseStudy.results.map((result) => (
              <div
                key={`result-${result.metric}`}
                className="border-2 border-black dark:border-white p-6 bg-white dark:bg-gray-900"
              >
                <p className="font-pixel text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {result.metric}
                </p>
                <p className="font-pixel text-3xl md:text-4xl text-gray-900 dark:text-gray-100 mb-2">
                  {result.value}
                </p>
                {result.description && (
                  <p className="font-pixel text-sm text-gray-600 dark:text-gray-400">
                    {result.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Learnings */}
      {caseStudy.learnings && caseStudy.learnings.length > 0 && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-6">Key Learnings</h2>
          <ul className="space-y-3">
            {caseStudy.learnings.map((learning, index) => (
              <li
                key={`learning-${index}`}
                className="font-pixel flex gap-3 text-gray-700 dark:text-gray-300"
              >
                <span className="flex-shrink-0 text-gray-900 dark:text-gray-100 font-bold">✓</span>
                <span className="leading-relaxed">{formatText(learning)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tech Stack */}
      {caseStudy.techStack && caseStudy.techStack.length > 0 && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {caseStudy.techStack.map((tech) => (
              <span
                key={`tech-${tech}`}
                className="font-pixel px-4 py-2 border-2 border-black dark:border-white text-sm bg-white dark:bg-gray-900"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      {caseStudy.links && caseStudy.links.length > 0 && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-6">Links</h2>
          <div className="flex flex-wrap gap-4">
            {caseStudy.links.map((link) => (
              <a
                key={`link-${link.label}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-pixel inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {link.icon === 'figma' && (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
                  </svg>
                )}
                {link.icon === 'website' && (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                )}
                {link.icon === 'presentation' && (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                  </svg>
                )}
                {link.icon === 'document' && (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                )}
                {link.icon === 'gear' && (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                )}
                {link.icon === 'substack' && (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                  </svg>
                )}
                {link.icon === 'x' && (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
                {link.icon === 'github' && (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                )}
                {(!link.icon || link.icon === 'external') && (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                )}
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Embed */}
      {caseStudy.embedUrl && (
        <section className="mb-12">
          <h2 className="font-pixel text-2xl md:text-3xl mb-6">
            {caseStudy.embedTitle || 'Preview'}
          </h2>
          <div className="border-2 border-black dark:border-white overflow-hidden">
            <iframe
              title={`${caseStudy.title} embed`}
              src={caseStudy.embedUrl}
              className="w-full aspect-video"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* AI Assistant CTA */}
      <section className="mt-16 mb-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="font-pixel text-gray-600 dark:text-gray-400 mb-4">
            Have questions about this project or want to know more?
          </p>
          <Link
            href="/"
            className="font-pixel inline-flex items-center gap-2 px-6 py-3 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Ask the AI Assistant
          </Link>
        </div>
      </section>
    </article>
  );
}
