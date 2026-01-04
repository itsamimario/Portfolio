import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/caseStudies';
import { CaseStudy } from '@/components/CaseStudy';
import Link from 'next/link';

interface CaseStudyPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    id: caseStudy.id,
  }));
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudies.find((cs) => cs.id === params.id);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/about"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to About
        </Link>

        <CaseStudy caseStudy={caseStudy} variant="full" />
      </div>
    </main>
  );
}
