/**
 * Content types for portfolio sections
 */

/**
 * Case study data structure
 */
export interface CaseStudy {
  id: string;
  title: string;
  role: string;
  company: string;
  period: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  tagline: string;
  challenge?: string;
  approach?: CaseStudyStep[];
  keyDecisions?: string[];
  results?: CaseStudyResult[];
  resultsDescription?: string;
  learnings?: string[]; // Key takeaways
  techStack?: string[];
  links?: CaseStudyLink[];
  embedUrl?: string; // For embeds (Figma, Google Slides, etc.)
  embedTitle?: string; // Title for the embed section
  featuredImage?: string; // Secondary image shown after Key Decisions
  featuredImageAlt?: string;
  underConstruction?: boolean; // True if content is not yet complete
}

/**
 * Individual step in the approach section
 */
export interface CaseStudyStep {
  title: string;
  description: string;
}

/**
 * Result/metric for a case study
 */
export interface CaseStudyResult {
  metric: string;
  value: string;
  description?: string;
}

/**
 * External link for a case study
 */
export interface CaseStudyLink {
  label: string;
  url: string;
  icon?: string; // e.g., "figma", "github", "external"
}

/**
 * Props for CaseStudy component
 */
export interface CaseStudyProps {
  caseStudy: CaseStudy;
  variant?: 'full' | 'card';
}

/**
 * Props for CaseStudies component
 */
export interface CaseStudiesProps {
  caseStudies: CaseStudy[];
  title?: string;
  description?: string;
}
