/**
 * Product Playbook data
 */

export interface Principle {
  title: string;
  description: string;
}

export interface Phase {
  title: string;
  description: string;
  caseStudyId: string;
  caseStudyTitle: string;
}

export interface Influence {
  name: string;
  knownFor: string;
  why: string;
  link: string;
}

export interface StrategyQuestion {
  number: number;
  question: string;
  description: string;
}

export interface PRDSection {
  title: string;
  purpose: string;
}

// Philosophy principles
export const principles: Principle[] = [
  {
    title: 'P&L mindset',
    description:
      'Products exist to drive business results. I think in terms of revenue, CAC, and retention, not features shipped. Every roadmap decision ties back to impact on the business.',
  },
  {
    title: 'Build with empathy',
    description:
      "User research is the foundation, not validation. I shadow users, run discovery sessions, and let real pain points drive priorities.",
  },
  {
    title: 'Measure what matters',
    description:
      "Outcomes over outputs. I reject vanity metrics and focus on leading indicators that predict business success.",
  },
  {
    title: 'Ship in small victories',
    description:
      'Big bang launches are risky. I break work into incremental bets, ship early, learn fast, and course-correct. Momentum compounds.',
  },
  {
    title: 'Keep interfaces joyful',
    description:
      "Functional isn't enough, products should feel good to use. I invest in polish and delight because memorable experiences drive retention and word-of-mouth.",
  },
];

// How I Ship phases
export const phases: Phase[] = [
  {
    title: 'Align',
    description:
      'Co-create vision with stakeholders. Get everyone rowing in the same direction before writing a single spec.',
    caseStudyId: 'ratedpower-crm-integration',
    caseStudyTitle: 'RatedPower CRM',
  },
  {
    title: 'Discover',
    description:
      'Validate before building. Talk to users, map opportunities, and kill bad ideas early. Evidence beats assumptions.',
    caseStudyId: 'ratedpower-topography',
    caseStudyTitle: 'RatedPower Topography',
  },
  {
    title: 'Deliver',
    description:
      'Define appetite, then shape work to fit. Phase releases to de-risk. Deliver complete experiences every cycle.',
    caseStudyId: 'maxem-platform',
    caseStudyTitle: 'Maxem Algorithm',
  },
  {
    title: 'Launch & Learn',
    description:
      'Ship to real users, instrument everything, and iterate based on data—not opinions. Learn what works, kill what doesn\'t.',
    caseStudyId: 'catchit-product-conceptualization',
    caseStudyTitle: 'CatchIT!',
  },
];

// Influences - People who shaped how I think about product
export const influences: Influence[] = [
  {
    name: 'Jason Fried & DHH',
    knownFor: '37signals, Basecamp, Shape Up',
    why: 'Taught me that calm beats chaos. Fixed time, variable scope. Bets over backlogs.',
    link: 'https://basecamp.com/shapeup',
  },
  {
    name: 'Annie Duke',
    knownFor: 'Thinking in Bets',
    why: 'Separating decision quality from outcomes changed how I evaluate my own choices.',
    link: 'https://www.annieduke.com/',
  },
  {
    name: 'Marty Cagan',
    knownFor: 'SVPG, Inspired, Empowered',
    why: 'The blueprint for empowered product teams. Outcomes over outputs, always.',
    link: 'https://www.svpg.com/articles/',
  },
  {
    name: 'John Cutler',
    knownFor: 'The Beautiful Mess',
    why: 'Asks the uncomfortable questions about how product teams actually work.',
    link: 'https://cutlefish.substack.com/',
  },
  {
    name: 'Shreyas Doshi',
    knownFor: 'Twitter/X, ex-Stripe/Google PM',
    why: 'Sharp frameworks delivered in tweets. High-leverage thinking distilled.',
    link: 'https://x.com/shreyas',
  },
  {
    name: 'Teresa Torres',
    knownFor: 'Continuous Discovery Habits',
    why: 'Made discovery a habit, not a phase. Weekly customer touchpoints, always.',
    link: 'https://www.producttalk.org/',
  },
  {
    name: 'Richard Rumelt',
    knownFor: 'Good Strategy Bad Strategy',
    why: 'Most strategies are just goals. Real strategy is diagnosis + policy + actions.',
    link: 'https://www.amazon.com/Good-Strategy-Bad-Difference-Matters/dp/0307886239',
  },
  {
    name: 'Lenny Rachitsky',
    knownFor: "Lenny's Podcast & Newsletter",
    why: 'Curates the best product thinking and makes it accessible.',
    link: 'https://www.lennysnewsletter.com/',
  },
  {
    name: 'Don Norman',
    knownFor: 'The Design of Everyday Things',
    why: 'When users struggle, blame the design. Affordances, feedback, constraints.',
    link: 'https://jnd.org/',
  },
  {
    name: 'Rob Fitzpatrick',
    knownFor: 'The Mom Test',
    why: 'Talk about their life, not your idea. Spot bad data before it misleads you.',
    link: 'https://www.momtestbook.com/',
  },
];

// Strategy template questions
export const strategyQuestions: StrategyQuestion[] = [
  {
    number: 1,
    question: 'What customer segments are we targeting?',
    description: 'Identify target segments—and equally important, non-target segments.',
  },
  {
    number: 2,
    question: 'What do they need and how acute are those needs?',
    description: 'Create clarity on needs; be intentional about which subset to tackle.',
  },
  {
    number: 3,
    question: 'What differentiation will we create?',
    description: 'Specify the concrete product that makes us different. No vague "world-class" claims.',
  },
  {
    number: 4,
    question: 'How attractive is the market and how is it evolving?',
    description: "Present a fresh perspective on the domain and where it's heading.",
  },
  {
    number: 5,
    question: "What is our product's current situation?",
    description: 'Honest assessment of market position, competition, and strengths/weaknesses.',
  },
  {
    number: 6,
    question: "What are our competitors' segments, strengths, and weaknesses?",
    description: 'Decide: head-to-head against incumbents or different turf entirely?',
  },
  {
    number: 7,
    question: 'What existing assets will we utilize?',
    description: 'Leverage what you have—companion products, channels, partnerships.',
  },
  {
    number: 8,
    question: 'How will we reach these customers?',
    description: 'Distribution strategy that builds on company advantages.',
  },
  {
    number: 9,
    question: 'How will we execute toward this strategy?',
    description: 'High-level action plan with trade-offs and risks explicit.',
  },
  {
    number: 10,
    question: 'Which metrics will track success?',
    description: 'Leading and lagging indicators, and how they impact the business.',
  },
];

// PRD template sections (inspired by Shape Up's Pitch format)
export const prdSections: PRDSection[] = [
  {
    title: 'Problem',
    purpose:
      "A single specific story showing why the status quo doesn't work. Include: who it's for, the hypothesis, and evidence (interviews, data, requests).",
  },
  {
    title: 'Appetite',
    purpose:
      'How much time this is worth and how that constrains the solution. The appetite shapes what we build—not the other way around.',
  },
  {
    title: 'Solution',
    purpose:
      'Core elements at the right abstraction. Include key flows and the main customer benefit.',
  },
  {
    title: 'Risks',
    purpose:
      "Rabbit holes, technical uncertainties, and dependencies worth calling out. What could derail us if we don't address it upfront?",
  },
  {
    title: 'Out of Scope',
    purpose:
      "What we're explicitly NOT building to fit the appetite. Be specific—this prevents scope creep better than any process.",
  },
  {
    title: 'Rollout & Go-to-Market',
    purpose:
      "How we'll release (pilot, A/B, phases) and how we'll sell it. Involve GTM teams early—they shape the product too.",
  },
  {
    title: 'Objectives & Key Results',
    purpose: 'How this fits strategic goals and the metrics that will tell us if the bet paid off.',
  },
];
