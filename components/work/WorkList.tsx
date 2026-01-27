/**
 * WorkList component
 * Displays a vertical list of work entries
 */

import type { CaseStudy } from '@/types/content';
import { WorkItem } from './WorkItem';

interface WorkListProps {
  caseStudies: CaseStudy[];
}

export function WorkList({ caseStudies }: WorkListProps): JSX.Element {
  return (
    <div className="divide-y-0">
      {caseStudies.map((caseStudy) => (
        <WorkItem key={caseStudy.id} caseStudy={caseStudy} />
      ))}
    </div>
  );
}
