/**
 * PRD Template page
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { prdSections } from '@/data/playbook';
import { StickyNav } from '@/components/about/StickyNav';

export const metadata: Metadata = {
  title: 'PRD Template | Mario Bennekers',
  description:
    'My PRD template - 7 sections inspired by Shape Up to present a good potential bet.',
};

export default function PRDTemplatePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <StickyNav />
      <div className="container mx-auto px-4 max-w-4xl py-12">
        {/* Back link */}
        <Link
          href="/playbook"
          className="inline-block mb-8 font-pixel text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          ← back to playbook
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-pixel mb-4">PRD Template</h1>
          <p className="font-pixel text-gray-700 dark:text-gray-300 leading-relaxed">
            A PRD isn&apos;t a contract—it&apos;s a communication tool. It captures the problem,
            the bet, and enough detail for the team to build the right thing.
          </p>
        </header>

        {/* What makes a good PRD */}
        <section className="mb-12 bg-gray-50 dark:bg-gray-800 p-6">
          <h2 className="font-pixel font-bold mb-3">What makes a good PRD?</h2>
          <p className="font-pixel text-gray-700 dark:text-gray-300">
            A good PRD is <strong>clear</strong> on the problem, <strong>explicit</strong> about
            what&apos;s out of scope, and <strong>flexible</strong> enough for engineers to find
            the best solution. It answers &quot;why&quot; before &quot;what&quot;.
          </p>
        </section>

        {/* The 7 Sections */}
        <section className="mb-12">
          <h2 className="text-2xl font-pixel mb-6">The 7 Sections</h2>
          <p className="font-pixel text-gray-600 dark:text-gray-400 mb-8">
            Inspired by Shape Up&apos;s Pitch format. Every section earns its place.
          </p>
          <div className="space-y-6">
            {prdSections.map((section, index) => (
              <div key={section.title} className="border-l-2 border-black dark:border-white pl-4">
                <div className="flex items-start gap-3">
                  <span className="font-pixel text-gray-400 dark:text-gray-500 text-sm">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-pixel font-bold mb-1">{section.title}</h3>
                    <p className="font-pixel text-gray-600 dark:text-gray-400 text-sm">
                      {section.purpose}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-pixel mb-4">PRD Tips</h2>
          <ul className="space-y-3 font-pixel text-gray-700 dark:text-gray-300">
            <li className="flex gap-2">
              <span className="text-gray-400">→</span>
              <span>Write for the team that will build it, not for stakeholders to sign off.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">→</span>
              <span>Include mockups early—visuals reveal gaps that words hide.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">→</span>
              <span>The &quot;Out of Scope&quot; section prevents scope creep better than any process.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-gray-400">→</span>
              <span>Update the PRD as you learn—it&apos;s a living document, not a contract.</span>
            </li>
          </ul>
        </section>

        {/* Back to playbook */}
        <div className="text-center">
          <Link
            href="/playbook"
            className="inline-block px-6 py-3 border border-black dark:border-white font-pixel hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            ← Back to Playbook
          </Link>
        </div>
      </div>
    </main>
  );
}
