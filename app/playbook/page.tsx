/**
 * Product Playbook page
 * How I Build Products - philosophy, strategy, process, influences
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { principles, phases, influences } from '@/data/playbook';
import { Footer } from '@/components/about/Footer';
import { StickyNav } from '@/components/about/StickyNav';

export const metadata: Metadata = {
  title: 'How I Build Products | Mario Bennekers',
  description:
    'My product philosophy, strategy approach, and the ideas that shaped how I think about building products.',
};

function ZigguratDiagram(): JSX.Element {
  const px = 2; // pixel size for box borders
  const arrowPx = 4; // thicker arrows

  return (
    <div className="flex justify-center my-8">
      <svg
        viewBox="0 0 400 320"
        className="w-full max-w-md font-pixel"
        aria-label="Strategy alignment ziggurat: Company Goals flow to Product Strategy to Roadmap to Daily Execution"
      >
        {/* Level 1: Company Goals & Strategy - Top level (with more side padding) */}
        <rect x="100" y="0" width={px} height="44" className="fill-black dark:fill-white" />
        <rect x="100" y="0" width="200" height={px} className="fill-black dark:fill-white" />
        <rect x={300-px} y="0" width={px} height="44" className="fill-black dark:fill-white" />
        <rect x="100" y={44-px} width="200" height={px} className="fill-black dark:fill-white" />
        <rect x={100+px} y={px} width={200-px*2} height={44-px*2} className="fill-white dark:fill-gray-900" />
        <text
          x="200"
          y="28"
          textAnchor="middle"
          className="fill-black dark:fill-white"
          style={{ fontSize: '13px' }}
        >
          Company Goals & Strategy
        </text>

        {/* Arrow 1 - downward pointing (thicker) */}
        <rect x="184" y="52" width="32" height={arrowPx} className="fill-black dark:fill-white" />
        <rect x="188" y={52+arrowPx} width="24" height={arrowPx} className="fill-black dark:fill-white" />
        <rect x="192" y={52+arrowPx*2} width="16" height={arrowPx} className="fill-black dark:fill-white" />
        <rect x="196" y={52+arrowPx*3} width="8" height={arrowPx} className="fill-black dark:fill-white" />

        {/* Level 2: Product Strategy */}
        <rect x="75" y="76" width={px} height="44" className="fill-black dark:fill-white" />
        <rect x="75" y="76" width="250" height={px} className="fill-black dark:fill-white" />
        <rect x={325-px} y="76" width={px} height="44" className="fill-black dark:fill-white" />
        <rect x="75" y={120-px} width="250" height={px} className="fill-black dark:fill-white" />
        <rect x={75+px} y={76+px} width={250-px*2} height={44-px*2} className="fill-white dark:fill-gray-900" />
        <a href="/playbook/strategy-template">
          <text
            x="200"
            y="104"
            textAnchor="middle"
            className="fill-blue-600 dark:fill-blue-400"
            style={{ fontSize: '13px', textDecoration: 'underline' }}
          >
            Product Strategy
          </text>
        </a>

        {/* Arrow 2 - downward pointing (thicker) */}
        <rect x="184" y="128" width="32" height={arrowPx} className="fill-black dark:fill-white" />
        <rect x="188" y={128+arrowPx} width="24" height={arrowPx} className="fill-black dark:fill-white" />
        <rect x="192" y={128+arrowPx*2} width="16" height={arrowPx} className="fill-black dark:fill-white" />
        <rect x="196" y={128+arrowPx*3} width="8" height={arrowPx} className="fill-black dark:fill-white" />

        {/* Level 3: Roadmap + PRD */}
        <rect x="50" y="152" width={px} height="44" className="fill-black dark:fill-white" />
        <rect x="50" y="152" width="300" height={px} className="fill-black dark:fill-white" />
        <rect x={350-px} y="152" width={px} height="44" className="fill-black dark:fill-white" />
        <rect x="50" y={196-px} width="300" height={px} className="fill-black dark:fill-white" />
        <rect x={50+px} y={152+px} width={300-px*2} height={44-px*2} className="fill-white dark:fill-gray-900" />
        <a href="/playbook/prd-template">
          <text
            x="200"
            y="180"
            textAnchor="middle"
            className="fill-blue-600 dark:fill-blue-400"
            style={{ fontSize: '13px', textDecoration: 'underline' }}
          >
            Roadmap + PRD
          </text>
        </a>

        {/* Arrow 3 - downward pointing (thicker) */}
        <rect x="184" y="204" width="32" height={arrowPx} className="fill-black dark:fill-white" />
        <rect x="188" y={204+arrowPx} width="24" height={arrowPx} className="fill-black dark:fill-white" />
        <rect x="192" y={204+arrowPx*2} width="16" height={arrowPx} className="fill-black dark:fill-white" />
        <rect x="196" y={204+arrowPx*3} width="8" height={arrowPx} className="fill-black dark:fill-white" />

        {/* Level 4: Daily Execution - Bottom level (widest) */}
        <rect x="25" y="228" width={px} height="44" className="fill-black dark:fill-white" />
        <rect x="25" y="228" width="350" height={px} className="fill-black dark:fill-white" />
        <rect x={375-px} y="228" width={px} height="44" className="fill-black dark:fill-white" />
        <rect x="25" y={272-px} width="350" height={px} className="fill-black dark:fill-white" />
        <rect x={25+px} y={228+px} width={350-px*2} height={44-px*2} className="fill-white dark:fill-gray-900" />
        <text
          x="200"
          y="256"
          textAnchor="middle"
          className="fill-black dark:fill-white"
          style={{ fontSize: '13px' }}
        >
          Daily Execution
        </text>
      </svg>
    </div>
  );
}

function ProcessTimeline(): JSX.Element {
  return (
    <div className="relative">
      {/* Horizontal line - hidden on mobile */}
      <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700" />

      {/* Vertical line - shown on mobile */}
      <div className="md:hidden absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200 dark:bg-gray-700" />

      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-4">
        {phases.map((phase, index) => (
          <div key={phase.title} className="flex md:flex-col items-start md:items-center md:text-center flex-1 relative pl-16 md:pl-0">
            {/* Step number */}
            <div className="absolute left-0 md:relative md:left-auto w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black font-pixel text-lg flex items-center justify-center z-10">
              {index + 1}
            </div>

            {/* Content */}
            <div className="md:mt-4">
              <h3 className="font-pixel text-lg font-bold mb-2">{phase.title}</h3>
              <p className="font-pixel text-gray-600 dark:text-gray-400 text-sm mb-3">
                {phase.description}
              </p>
              <Link
                href={`/case-studies/${phase.caseStudyId}`}
                className="font-pixel text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 text-sm"
              >
                {phase.caseStudyTitle} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PlaybookPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <StickyNav />
      <div className="container mx-auto px-4 max-w-4xl py-12">
        {/* Back link */}
        <Link
          href="/about"
          className="inline-block mb-8 font-pixel text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          ← back to about
        </Link>

        {/* Hero */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-pixel mb-4">How I Build Products</h1>
          <p className="text-xl font-pixel text-gray-600 dark:text-gray-400 mb-6">
            My philosophy, strategy approach, and the ideas that shaped how I think about product.
          </p>
          <p className="font-pixel text-gray-700 dark:text-gray-300 leading-relaxed">
            After <strong>7 years</strong> leading product across B2B SaaS, mobile gaming, and cleantech,
            I&apos;ve developed a clear perspective on what works. This playbook captures the <strong>principles</strong>,
            <strong>frameworks</strong>, and <strong>influences</strong> that guide how I build products that
            drive real business outcomes.
          </p>
        </header>

        {/* Philosophy */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-pixel mb-4">Philosophy</h2>
          <p className="font-pixel text-gray-600 dark:text-gray-400 mb-8">
            These five principles guide every product decision I make. They&apos;re not abstract ideals, they&apos;re
            <strong> hard-won lessons</strong> from shipping products that succeeded and learning from those that didn&apos;t.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className="bg-gray-50 dark:bg-gray-800 p-6 relative"
              >
                <span className="absolute top-4 right-4 font-pixel text-4xl text-gray-200 dark:text-gray-700">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="font-pixel text-lg font-bold mb-3 pr-12">{principle.title}</h3>
                <p className="font-pixel text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Strategy */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-pixel mb-4">Strategy</h2>
          <p className="font-pixel text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Strategy is how <strong>vision becomes reality</strong>. It answers: what problems do we solve,
            which bets do we take (and not take), and in what sequence? A good strategy is <strong>inspiring</strong> because
            it&apos;s vivid, <strong>rigorous</strong> because it&apos;s grounded in data, and <strong>actionable</strong> because
            it guides daily decisions.
          </p>
          <p className="font-pixel text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            I think of alignment as a <strong>pyramid</strong>. Company goals flow down into product strategy, which
            shapes the roadmap, which drives daily execution. When this chain breaks, teams ship
            features that feel productive but don&apos;t move the business forward.
          </p>

          <ZigguratDiagram />

          <div className="bg-gray-50 dark:bg-gray-800 p-6 mt-8">
            <h3 className="font-pixel font-bold mb-3">How my approach has evolved</h3>
            <p className="font-pixel text-gray-700 dark:text-gray-300 leading-relaxed">
              I started with <strong>Scrum and OKRs</strong> solid foundations, but I saw how ceremonies can become
              rituals and quarterly goals can feel disconnected from reality. Now I prefer working with lighter frameworks like{' '}
              <strong>bets and appetites</strong>: strategy defines the bets worth taking, and
              Shape Up-influenced execution keeps teams focused on <strong>outcomes, not process</strong>. The result?
              Less time in planning meetings, more time building and learning.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/playbook/strategy-template"
              className="inline-block px-4 py-2 border border-black dark:border-white font-pixel text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              View Strategy Template →
            </Link>
            <Link
              href="/playbook/prd-template"
              className="inline-block px-4 py-2 border border-black dark:border-white font-pixel text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              View PRD Template →
            </Link>
          </div>
        </section>

        {/* How I Ship */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-pixel mb-4">How I Ship</h2>
          <p className="font-pixel text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Great products don&apos;t happen by accident. They emerge from a <strong>repeatable process</strong> that
            balances rigor with speed. Here&apos;s how I move from idea to impact—each phase linked to a real
            case study where I applied it.
          </p>

          <ProcessTimeline />
        </section>

        {/* Influences */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-pixel mb-4">Influences</h2>
          <p className="font-pixel text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            The people who shaped how I think about product.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {influences.map((influence) => (
              <div
                key={influence.name}
                className="border border-gray-200 dark:border-gray-700 p-4"
              >
                <h3 className="font-pixel font-bold mb-1">
                  {influence.name}
                </h3>
                <p className="font-pixel text-sm mb-2">
                  <a
                    href={influence.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {influence.knownFor}
                  </a>
                </p>
                <p className="font-pixel text-sm text-gray-700 dark:text-gray-300">
                  {influence.why}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <Footer showCta={true} />
      </div>
    </main>
  );
}
