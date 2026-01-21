import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/caseStudies';
import { CaseStudy } from '@/components/CaseStudy';
import { UnderConstruction } from '@/components/UnderConstruction';
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

  // Show under construction page for incomplete case studies
  if (caseStudy.underConstruction) {
    return (
      <main className="min-h-screen bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <UnderConstruction caseStudy={caseStudy} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/about"
          className="inline-flex items-center text-blue-600 underline hover:text-blue-800 mb-8"
        >
          ← Back to About
        </Link>

        <CaseStudy caseStudy={caseStudy} variant="full" />
      </div>
    </main>
  );
}
