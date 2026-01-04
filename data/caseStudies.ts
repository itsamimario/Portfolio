import { CaseStudy } from '@/types/content';

/**
 * Placeholder case study data
 * To be replaced with real content in future phases
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'catchit',
    title: 'CatchIT!',
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
        metric: 'Active Users',
        value: '[TBD]',
        description: 'Monthly active users',
      },
      {
        metric: 'Retention',
        value: '[TBD]%',
        description: 'User retention rate',
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
    id: 'ratedpower',
    title: 'RatedPower',
    role: 'Product Manager',
    company: 'RatedPower',
    period: '2019 - 2022',
    thumbnail: '/placeholders/ratedpower-thumbnail.jpg',
    thumbnailAlt: 'RatedPower solar energy design software interface',
    tagline: 'Scaling B2B SaaS from €230k to €2.5M while growing the team from 2 to 30+ engineers',
    challenge:
      'Scale a B2B SaaS product for solar energy design while rapidly growing the engineering team from 2 to 30+ people, maintaining product quality, and expanding into new international markets.',
    approach: [
      {
        title: 'Product Strategy',
        description:
          'Defined roadmap focused on enterprise features and international expansion to European and LATAM markets.',
      },
      {
        title: 'Team Scaling',
        description:
          'Hired and led product team, implemented agile rituals, and established clear engineering processes.',
      },
      {
        title: 'Process Improvement',
        description:
          'Introduced structured discovery, roadmap transparency, and data-driven prioritization framework.',
      },
      {
        title: 'UX Enhancements',
        description:
          'Collaborated with designers to improve adoption across PV segment through user research and iterative testing.',
      },
    ],
    keyDecisions: [
      'Prioritized enterprise features over consumer market',
      'Implemented transparent roadmap sharing with customers',
      'Balanced technical debt paydown with new feature development',
      'Established data-driven prioritization framework',
    ],
    results: [
      {
        metric: 'Revenue Growth',
        value: '10x',
        description: '€230k → €2.5M in 3 years',
      },
      {
        metric: 'Team Growth',
        value: '15x',
        description: '2 → 30+ engineers',
      },
      {
        metric: 'Market Expansion',
        value: '3',
        description: 'Regions (Europe, LATAM, Asia)',
      },
    ],
    techStack: [
      'React',
      'Python',
      'PostgreSQL',
      'AWS',
      'Jira',
      'Google Analytics',
    ],
  },
  {
    id: 'maxem-energy',
    title: 'Maxem Energy',
    role: 'Product Manager',
    company: 'Maxem Energy',
    period: '2022 - 2023',
    thumbnail: '/placeholders/maxem-thumbnail.jpg',
    thumbnailAlt: 'Maxem Energy platform dashboard',
    tagline: 'Leading 10-person team building B2B energy management platform for European markets',
    challenge:
      'Lead product development for a 10-person team building B2B energy management software for European markets, while establishing product processes and creating design system.',
    approach: [
      {
        title: 'Product Leadership',
        description:
          'Defined quarterly roadmap and feature prioritization based on customer feedback and business goals.',
      },
      {
        title: 'Design System',
        description:
          'Created comprehensive design system in Figma to unify UX across the platform and reduce design-to-development handoff time.',
      },
      {
        title: 'Cross-functional Collaboration',
        description:
          'Aligned engineering, sales, and customer success teams through regular syncs and shared documentation.',
      },
    ],
    keyDecisions: [
      'Built design system before scaling feature development',
      'Implemented weekly customer feedback sessions',
      'Prioritized platform stability over rapid feature releases',
      'Established clear product documentation standards',
    ],
    results: [
      {
        metric: 'Features Shipped',
        value: '[TBD]',
        description: 'Major features delivered on time',
      },
      {
        metric: 'Handoff Time',
        value: '[TBD]%',
        description: 'Reduction in design-to-dev time',
      },
      {
        metric: 'Design System',
        value: '100%',
        description: 'Platform coverage',
      },
    ],
    techStack: [
      'React',
      'Node.js',
      'PostgreSQL',
      'Figma',
      'Notion',
      'Amplitude',
    ],
  },
];
