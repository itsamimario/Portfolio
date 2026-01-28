/**
 * Timeline data for the about page
 * Work experience in reverse chronological order
 */

import type { TimelineEntry } from '@/types/timeline';

export const timeline: TimelineEntry[] = [
  {
    id: 'catchit',
    company: 'CatchIT!',
    companyDescription: 'Location-based mobile game startup',
    role: 'Founder & Product Lead',
    period: 'Sep 2024 - Present',
    location: 'Madrid, Spain',
    description:
      '**Founded a mobile game startup**, owning the full product lifecycle. Led product strategy, user research, and rapid iteration cycles. **Built and shipped cross-platform app** integrating AI tools. Achieved 50% D1, 35% D7, 12% D30 retention through data-driven optimization.',
    caseStudies: [
      {
        id: 'catchit-product-conceptualization',
        title: 'Product Conceptualization',
        status: 'complete',
      },
      {
        id: 'catchit-ai-chatbot',
        title: 'AI Chatbot',
        status: 'under-construction',
      },
    ],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    companyDescription: 'Independent consulting for sustainability startups',
    role: 'Product Development Consultant',
    period: 'Jan 2024 - Present',
    location: 'Madrid, Spain',
    description:
      'Providing product strategy for sustainability-focused companies. **Interim Product Lead** at Ecometro, building the product team and preparing the product for market. Consulted for Imageryst, adapting their technology to renewables and delivering **product and go-to-market strategy**.',
    caseStudies: [
      {
        id: 'ecometro-product-strategy',
        title: 'Ecometro Product Strategy',
        status: 'under-construction',
      },
      {
        id: 'imageryst-renewables-pivot',
        title: 'Imageryst Renewables Pivot',
        status: 'under-construction',
      },
    ],
  },
  {
    id: 'maxem',
    company: 'Maxem Energy Solutions',
    companyDescription: 'B2B SaaS platform for energy storage optimization',
    role: 'Product Manager',
    period: 'May 2022 - Jan 2024',
    location: 'Amsterdam, Netherlands',
    description:
      'Led **product strategy, requirements and UX** for a B2B energy SaaS platform. Delivered onboarding, dashboards, workflows and a complete UX revamp, enabling adoption by new enterprise clients. Contributed to **2x YoY revenue growth**.',
    caseStudies: [
      {
        id: 'maxem-smart-energy-algorithm',
        title: 'Smart Energy Algorithm',
        status: 'under-construction',
      },
      {
        id: 'maxem-portable-battery-system',
        title: 'Portable Battery System',
        status: 'under-construction',
      },
    ],
  },
  {
    id: 'ratedpower',
    company: 'RatedPower',
    companyDescription: 'B2B SaaS for solar plant design',
    role: 'Product Manager',
    period: 'Feb 2019 - May 2022',
    location: 'Madrid, Spain',
    description:
      '**Led the product team** for B2B software that **grew revenue 10x in 3 years**. Expanded team from 2 to 30+ developers, establishing product processes. Collaborated closely with engineering, design, sales, marketing, clients and founders.',
    caseStudies: [
      {
        id: 'ratedpower-topography',
        title: 'Topography Tool',
        status: 'under-construction',
      },
      {
        id: 'ratedpower-financial-calculator',
        title: 'Financial Calculator',
        status: 'under-construction',
      },
      {
        id: 'ratedpower-crm-integration',
        title: 'CRM Integration',
        status: 'under-construction',
      },
    ],
  },
  {
    id: 'sabbatical',
    company: 'Career Pivot',
    role: 'From Construction to Software',
    period: 'Nov 2018 - Dec 2019',
    location: 'South America',
    description:
      'After realizing traditional project management wasn\'t my path, I took a **deliberate pause** to explore what I truly wanted. Traveled through South America while studying programming and software development. This transition led me to Madrid\'s startup ecosystem and **redirected my career toward product management**.',
    caseStudies: [],
  },
  {
    id: 'solarpack',
    company: 'Solarpack',
    companyDescription: 'Utility-scale solar energy developer',
    role: 'Project Manager',
    period: 'Mar 2015 - Oct 2017',
    location: 'South America & India',
    description:
      'Managed construction of solar plants totaling **100 MWp** across Chile, Uruguay, and Telangana, India. Coordinated cross-functional teams, managed stakeholders, and **delivered complex projects on time**. This experience built the foundation for my transition into product management.',
    caseStudies: [],
  },
];

/**
 * Education data
 */
export const education = {
  degree: 'Civil Engineering',
  universities: [
    { name: 'University of Granada', period: '2007-2014', location: 'Granada, Spain' },
    { name: 'Yildiz Teknik Üniversitesi', period: '2011-2012', location: 'Istanbul, Turkey' },
    { name: 'Universidad Católica', period: '2014', location: 'Valparaiso, Chile' },
  ],
};
