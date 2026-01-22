/**
 * Timeline types for the about page
 * Represents work experience and associated case studies
 */

/**
 * Link to a case study from a timeline entry
 */
export interface CaseStudyLink {
  id: string;
  title: string;
  status: 'complete' | 'under-construction';
}

/**
 * A single entry in the work timeline
 */
export interface TimelineEntry {
  id: string;
  company: string;
  companyDescription?: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
  caseStudies: CaseStudyLink[];
}
