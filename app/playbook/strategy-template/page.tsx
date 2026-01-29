/**
 * Product Strategy Template page
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { strategyQuestions } from '@/data/playbook';
import { StickyNav } from '@/components/about/StickyNav';

export const metadata: Metadata = {
  title: 'Product Strategy Template | Mario Bennekers',
  description:
    'My product strategy template - the 10 questions every strategy should answer.',
};

export default function StrategyTemplatePage(): JSX.Element {
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
          <h1 className="text-3xl md:text-4xl font-pixel mb-4">Product Strategy Template</h1>
          <p className="font-pixel text-gray-700 dark:text-gray-300 leading-relaxed">
            Product Strategy connects Vision to the Roadmap. It&apos;s not the plan itself—it&apos;s
            the prioritization framework that ensures the plan moves in the right direction.
          </p>
        </header>

        {/* What makes a good strategy */}
        <section className="mb-12 bg-gray-50 dark:bg-gray-800 p-6">
          <h2 className="font-pixel font-bold mb-3">What makes a good strategy?</h2>
          <p className="font-pixel text-gray-700 dark:text-gray-300">
            A good strategy is <strong>inspiring</strong> because it&apos;s vivid,{' '}
            <strong>rigorous</strong> and <strong>actionable</strong>. It emerges from deep, nuanced
            thinking, but is articulated simply enough to remember and repeat. It optimizes for
            long-term business results.
          </p>
        </section>

        {/* The 10 Questions */}
        <section className="mb-12">
          <h2 className="text-2xl font-pixel mb-6">The 10 Questions</h2>
          <p className="font-pixel text-gray-600 dark:text-gray-400 mb-8">
            Strategy in B2B products needs to answer these questions with data, market research,
            customer insights, and instinct.
          </p>
          <div className="space-y-6">
            {strategyQuestions.map((q) => (
              <div key={q.number} className="border-l-2 border-black dark:border-white pl-4">
                <div className="flex items-start gap-3">
                  <span className="font-pixel text-gray-400 dark:text-gray-500 text-sm">
                    {q.number.toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-pixel font-bold mb-1">{q.question}</h3>
                    <p className="font-pixel text-gray-600 dark:text-gray-400 text-sm">
                      {q.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing note */}
        <section className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-pixel mb-4">Strategy evolves—but slowly</h2>
          <p className="font-pixel text-gray-700 dark:text-gray-300 leading-relaxed">
            Company vision is stable. Product strategy shifts occasionally. The roadmap changes
            multiple times a year. If your strategy is changing every quarter, you don&apos;t have a
            strategy—you have a reaction.
          </p>
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
