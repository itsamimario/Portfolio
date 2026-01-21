import { CaseStudy } from '@/types/content';

/**
 * Case study data
 * Each case study has its own detailed page
 */
export const caseStudies: CaseStudy[] = [
  // CatchIT! Case Studies
  {
    id: 'catchit-product-conceptualization',
    title: 'Product Conceptualization',
    role: 'Founder & CEO',
    company: 'CatchIT!',
    period: '2024 - Present',
    thumbnail: '/images/case-studies/catchit-thumbnail.png',
    thumbnailAlt: 'CatchIT! pixel-art game showing landscape with character exploring',
    tagline: 'Building a location-based gaming platform that turns cities into playgrounds',
    challenge:
      'Create an engaging location-based game that combines urban exploration with collectible digital art, while building a sustainable business model in a competitive market dominated by established players like Pokémon GO.',
    approach: [
      {
        title: 'Product Vision',
        description:
          'Defined north star of "making cities playgrounds" and validated through user interviews with target demographics.',
      },
      {
        title: 'Design System',
        description:
          'Built neobrutalist pixel-art design system in Figma to differentiate from competitors and create memorable brand identity.',
      },
      {
        title: 'Technical Implementation',
        description:
          'Led front-end development with React + Ionic Capacitor for cross-platform mobile experience.',
      },
      {
        title: 'Business Model',
        description:
          'Designed dynamic pricing system to balance monetization with user experience through freemium model.',
      },
    ],
    keyDecisions: [
      'Chose pixel-art aesthetic to differentiate from competitors',
      'Implemented freemium model with cosmetic purchases only',
      'Built AI chatbot for user engagement and support',
      'Focused on single-player experience first before social features',
    ],
    results: [
      {
        metric: 'D1 Retention',
        value: '50%',
        description: 'Day 1 user retention',
      },
      {
        metric: 'D7 Retention',
        value: '35%',
        description: 'Day 7 user retention',
      },
      {
        metric: 'Design System',
        value: '100%',
        description: 'Reusable across web and mobile',
      },
    ],
    techStack: [
      'React',
      'TypeScript',
      'Ionic Capacitor',
      'Figma',
      'Claude API',
      'PostgreSQL',
    ],
    links: [
      {
        label: 'View Figma Design System',
        url: 'https://www.figma.com/design/Z8yhY4aOz9WKLYbBvNkmdM/CatchIT',
        icon: 'figma',
      },
    ],
    embedUrl: 'https://embed.figma.com/design/Z8yhY4aOz9WKLYbBvNkmdM/CatchIT?node-id=2-198&embed-host=share',
  },
  {
    id: 'catchit-ai-chatbot',
    title: 'AI Chatbot',
    role: 'Founder & CEO',
    company: 'CatchIT!',
    period: '2024 - Present',
    tagline: 'Building an AI-powered customer support and engagement chatbot',
    underConstruction: true,
  },

  // RatedPower Case Studies
  {
    id: 'ratedpower-topography',
    title: 'Topography Tool',
    role: 'Product Manager',
    company: 'RatedPower',
    period: '2019 - 2022',
    tagline: 'Automated terrain analysis and earthwork calculations for solar plant design',
    underConstruction: true,
  },
  {
    id: 'ratedpower-financial-calculator',
    title: 'Financial Calculator',
    role: 'Product Manager',
    company: 'RatedPower',
    period: '2019 - 2022',
    tagline: 'Financial modeling tool for solar plant investment analysis',
    underConstruction: true,
  },
  {
    id: 'ratedpower-crm-integration',
    title: 'CRM Integration',
    role: 'Product Manager',
    company: 'RatedPower',
    period: '2019 - 2022',
    tagline: 'Seamless integration between solar design platform and CRM systems',
    underConstruction: true,
  },

  // Maxem Case Studies
  {
    id: 'maxem-smart-energy-algorithm',
    title: 'Smart Energy Algorithm',
    role: 'Product Manager',
    company: 'Maxem Energy',
    period: '2022 - 2023',
    tagline: 'Intelligent energy management system combining cloud and local control',
    underConstruction: true,
  },
  {
    id: 'maxem-portable-battery-system',
    title: 'Portable Battery System',
    role: 'Product Manager',
    company: 'Maxem Energy',
    period: '2022 - 2023',
    tagline: 'B2B portable battery solution for events and temporary installations',
    underConstruction: true,
  },

  // Portfolio Case Study
  {
    id: 'portfolio',
    title: 'This Portfolio',
    role: 'Product Manager & Developer',
    company: 'Personal Project',
    period: 'January 2026',
    tagline: 'RAG-powered portfolio with AI chatbot built using Claude Code',
    challenge:
      'Build a professional portfolio that demonstrates both Product Manager capabilities and hands-on technical execution, with an AI chatbot as the star differentiator.',
    approach: [
      {
        title: 'Chat-First Interface',
        description:
          'Homepage IS the chat interface. Visitors land directly in conversation with an AI that knows everything about me.',
      },
      {
        title: 'RAG Architecture',
        description:
          'PostgreSQL + pgvector for embeddings, OpenAI for vectorization, Claude for generation.',
      },
      {
        title: 'Agent-Based Development',
        description:
          'Used Claude Code with specialized agents (planner, tdd-guide, code-reviewer, security-reviewer).',
      },
    ],
    keyDecisions: [
      'Chat-first design forces AI quality to be excellent',
      'TDD workflow with 200+ tests',
      'Autonomous development with Ralph Wiggum process',
    ],
    results: [
      {
        metric: 'Content Chunks',
        value: '25',
        description: 'Embedded in vector DB',
      },
      {
        metric: 'Test Coverage',
        value: '201',
        description: 'Tests passing',
      },
      {
        metric: 'Dev Speed',
        value: '8 phases',
        description: 'Completed in 1 day',
      },
    ],
    techStack: [
      'Next.js 14',
      'TypeScript',
      'PostgreSQL',
      'pgvector',
      'Claude API',
      'OpenAI',
    ],
    links: [
      {
        label: 'GitHub Repository',
        url: 'https://github.com/itsamimario/Portfolio',
        icon: 'github',
      },
    ],
  },
];

/**
 * Get case study by ID
 */
export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.id === id);
}
