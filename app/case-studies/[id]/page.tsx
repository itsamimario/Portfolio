import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/caseStudies';
import { UnderConstruction } from '@/components/UnderConstruction';
import { CaseStudy } from '@/components/CaseStudy';
import { StickyNav } from '@/components/about/StickyNav';

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

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudies.find((cs) => cs.id === params.id);

  if (!caseStudy) {
    notFound();
  }

  // Show under construction page for incomplete case studies
  if (caseStudy.underConstruction) {
    return (
      <>
        <StickyNav currentCaseStudyId={caseStudy.id} />
        <main className="min-h-screen bg-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <UnderConstruction caseStudy={caseStudy} />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <StickyNav currentCaseStudyId={caseStudy.id} />
      <main className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <CaseStudy caseStudy={caseStudy} variant="full" />
        </div>
      </main>
    </>
  );
}
