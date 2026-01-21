/**
 * LearningSection component
 * Continuous learning philosophy and evidence
 */

import Link from 'next/link';

export function LearningSection(): JSX.Element {
  return (
    <section className="py-12 border-b border-gray-200">
      <h2 className="text-3xl md:text-4xl font-pixel mb-6">Continuous Learning</h2>

      <div className="space-y-6">
        {/* Philosophy */}
        <div className="bg-gray-50 border border-gray-200 p-6">
          <p className="text-lg font-pixel mb-2">I believe in learning by doing.</p>
          <p className="text-gray-700 leading-relaxed">
            Rather than collecting certifications, I invest my time in building real products.
            Every project is an opportunity to deepen my skills and explore new technologies.
          </p>
        </div>

        {/* Evidence */}
        <div>
          <h3 className="text-xl font-pixel mb-4">Proof of Work</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 p-4">
              <p className="font-pixel mb-2">This Portfolio</p>
              <p className="text-sm text-gray-600 mb-2">
                Built from scratch with Next.js 14, TypeScript, and Tailwind CSS.
                Features a RAG-powered AI chatbot using Claude API, PostgreSQL with
                pgvector for semantic search.
              </p>
              <Link
                href="/case-studies/portfolio"
                className="text-blue-600 underline hover:text-blue-800 text-sm"
              >
                View case study
              </Link>
            </div>
            <div className="border border-gray-200 p-4">
              <p className="font-pixel mb-2">CatchIT! Mobile Game</p>
              <p className="text-sm text-gray-600 mb-2">
                Full-stack mobile app built with React Native, integrating AI
                for dynamic gameplay. From concept to App Store in 3 months.
              </p>
              <Link
                href="/case-studies/catchit-product-conceptualization"
                className="text-blue-600 underline hover:text-blue-800 text-sm"
              >
                View case study
              </Link>
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xl font-pixel mb-4">Education</h3>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-pixel">Civil Engineering</span></p>
            <ul className="text-sm space-y-1 ml-4">
              <li>University of Granada (2007-2014) - Granada, Spain</li>
              <li>Yildiz Teknik Universitesi (2011-2012) - Istanbul, Turkey</li>
              <li>Universidad Catolica (2014) - Valparaiso, Chile</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
