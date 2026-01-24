import { CaseStudy } from '@/types/content';

/**
 * Case study data
 * Each case study follows a scannable format:
 * Summary → Results → Challenge → Approach → Decisions → Learnings
 */
export const caseStudies: CaseStudy[] = [
  // CatchIT! Case Study
  {
    id: 'catchit-product-conceptualization',
    title: 'CatchIT! - Location-Based Art Game',
    role: 'Founder & Product Lead',
    company: 'CatchIT!',
    period: '2024 - Present',
    thumbnail: '/images/case-studies/catchit-thumbnail.gif',
    thumbnailAlt: 'CatchIT! logo with Catchito mascot',
    featuredImage: '/images/case-studies/catchit-mechanics.png',
    featuredImageAlt: 'CatchIT! mechanics showing Create, Collect, and Trade features',
    tagline:
      'Building a location-based gaming platform that turns cities into playgrounds for discovering digital art.',
    resultsDescription:
      'We ran a closed beta with ~200 users to validate the core gameplay loop before investing in marketing. All retention metrics exceeded industry top 25% benchmarks for casual mobile games by 2-5x, validating that the core loop has strong potential.',
    results: [
      {
        metric: 'D1 Retention',
        value: '50%',
        description: '~1.8x industry top 25%',
      },
      {
        metric: 'D7 Retention',
        value: '35%',
        description: '~4.5x industry top 25%',
      },
      {
        metric: 'D30 Retention',
        value: '12%',
        description: '~4x industry top 25%',
      },
    ],
    challenge:
      'Create an engaging location-based game that combines urban exploration with collectible digital art. The NFT market had crashed, but we believed limited digital ownership was sound, just misused. We needed to build something that avoided the toxic "NFT" label while capturing the compelling mechanics of scarcity and collecting.',
    approach: [
      {
        title: 'Market & User Research',
        description:
          'Analyzed competitors (Pokémon GO, Monster Hunter Now, Geocaching), identified the UGC gap, and conducted interviews at micro-illustrator art fairs to validate demand from both creators and collectors.',
      },
      {
        title: 'Product Vision',
        description:
          'Defined the concept: a mobile game where illustrations become treasures players hide and discover in the real world. Two-sided value prop—collectors get a Pokémon GO-like experience with real treasures; creators get a new channel to gamify and monetize their art.',
      },
      {
        title: 'Design System',
        description:
          'Built pixel-art aesthetic after beta testers highlighted how "Catchito" (our mascot) gave the app personality. Brought on an art director and committed fully to the differentiated visual identity.',
      },
      {
        title: 'Technical Implementation',
        description:
          'Led frontend development with React + Ionic Capacitor for cross-platform mobile, integrating Mapbox for geolocation and building the collect-trade-create core loop.',
      },
      {
        title: 'Data Analysis',
        description:
          'Implemented Amplitude for product analytics and ran SQL queries daily against our database to understand usage patterns. This data-driven approach informed every iteration of the core loop and helped us measure retention metrics against industry benchmarks.',
      },
    ],
    keyDecisions: [
      'Excluded blockchain entirely. User interviews showed strong aversion to NFT terminology.',
      'Chose proximity-based collection (100m radius) over physical QR codes for lower friction.',
      'Added "Catchapons" (random generation) so new players always find something to catch, even in areas with no creator content yet.',
      'Committed to pixel-art aesthetic for strong brand differentiation.',
      'Focused on single-player first to validate core loop before social features.',
    ],
    learnings: [
      'User perception of a technology matters as much as the technology itself. We implemented the same digital ownership mechanics, but removing NFT terminology eliminated the trust barrier and let users engage with the actual collecting experience.',
      'Aesthetic drives emotional connection. Committing to pixel-art gave the app a distinctive personality that users remembered and talked about, turning a functional product into an experience.',
      'Unlike SaaS, games don\'t solve a problem, they deliver an experience. Validating willingness to pay requires polished core mechanics, because rough prototypes can\'t convey the feeling that makes players spend.',
      'Retention proves the product works, but gaming competes for attention against thousands of alternatives. Validating that you can cut through the noise and monetize requires significant investment in marketing.',
    ],
    techStack: [
      'Cursor AI',
      'React',
      'Ionic Capacitor',
      'Mapbox',
      'Figma',
      'Aseprite',
      'Amplitude',
      'PostgreSQL',
    ],
    links: [
      {
        label: 'CatchIT Website',
        url: 'https://catchitgame.com/',
        icon: 'website',
      },
      {
        label: 'Pitch Deck',
        url: 'https://link.catchitgame.com/pitch-deck',
        icon: 'presentation',
      },
      {
        label: 'Figma Design System',
        url: 'https://www.figma.com/design/Z8yhY4aOz9WKLYbBvNkmdM/CatchIT',
        icon: 'figma',
      },
    ],
  },

  // Ecometro Case Study
  {
    id: 'ecometro-product-strategy',
    title: 'Ecometro - Product Strategy & Architecture',
    role: 'Product Consultant',
    company: 'Ecometro',
    period: '2024',
    thumbnail: '/images/case-studies/ecometro-thumbnail.png',
    thumbnailAlt: 'Ecometro - helping reduce the carbon footprint of your building',
    featuredImage: '/images/case-studies/ecometro-product.png',
    featuredImageAlt: 'Ecometro LCA platform showing environmental impact percentages by lifecycle phase',
    tagline:
      'Defining product strategy and decoupling a legacy architecture to unlock BIM integration for Spain\'s leading LCA platform.',
    resultsDescription:
      'In 4 months of execution (9 months total engagement), established Ecometro\'s first internal product team and defined a scalable architecture strategy that directly contributed to closing the 2024 funding round and doubling the user base from 500 to 1,000.',
    results: [
      {
        metric: 'User Growth',
        value: '500→1K',
        description: 'Active users in 4 months',
      },
      {
        metric: 'Partnerships',
        value: '3',
        description: 'Strategic partnerships signed',
      },
      {
        metric: 'Funding Round',
        value: 'Closed',
        description: 'Strategy enabled 2024 round',
      },
    ],
    challenge:
      'Ecometro\'s LCA software was built by an external consultancy that stopped providing services in 2023, leaving no internal technical ownership. The platform only accepted BC3 files (a Spanish construction measurement format), blocking integration with BIM—the format used by the largest architecture firms and increasingly mandated by EU regulations. The board wanted to focus on small clients to democratize LCA, but the P&L couldn\'t sustain that strategy without enterprise revenue. I had to convince them that targeting larger firms—who could pay the bills—was the precondition for eventually serving everyone.',
    approach: [
      {
        title: 'Team Building & Knowledge Transfer',
        description:
          'Hired the first internal fullstack engineer to take ownership of the codebase, eliminating dependency on external consultancies and building institutional knowledge of the platform\'s architecture.',
      },
      {
        title: 'Enterprise Discovery',
        description:
          'Conducted research with 10+ architecture firms and construction companies (AEDAS Home, Metrovacesa, ARUP, Morph Studio) to understand workflows, pain points, and format requirements. Discovered that the BC3-only limitation was the primary barrier to enterprise adoption.',
      },
      {
        title: 'Architecture Strategy',
        description:
          'Defined the approach to decouple the database from BC3 format entirely—abstracting the data model to represent building impacts independently of their source. This enabled format-specific importers (BC3, BIM, APIs) and direct UI manipulation of impacts without file imports.',
      },
      {
        title: 'BIM Partnership & Parallel Execution',
        description:
          'Identified and onboarded a specialized BIM development partner to handle integration while the internal engineer focused on the core database refactor. This parallel approach let a small team move on both fronts simultaneously.',
      },
      {
        title: 'Validation with Partners',
        description:
          'Validated the architecture continuously with the 3 partners who were investing in the solution. They provided real BIM files and production data, letting us test format parsing and impact calculations against actual projects before scaling.',
      },
    ],
    keyDecisions: [
      'Convinced the board to prioritize enterprise clients over small firms. The mission was to democratize LCA, but the P&L needed enterprise revenue first. Targeting firms that could pay enabled the sustainability of the platform for everyone else.',
      'Decoupled the database from BC3 rather than adding BIM as a parallel path. Abstracting the data model prevented duplication and made future format integrations trivial.',
      'Chose BIM as the primary new integration path. Largest firms already worked in BIM, EU regulations were pushing adoption, and it created a defensible moat against OneClick LCA\'s international scale.',
      'Built an internal team rather than finding another consultancy. Internalizing knowledge was essential for long-term product ownership and iteration speed.',
    ],
    learnings: [
      'Mission and business model can conflict—and that\'s okay. The board\'s instinct to serve small firms was aligned with Ecometro\'s mission, but the P&L couldn\'t support it yet. Framing enterprise revenue as the enabler of democratization—not its opposite—resolved the tension.',
      'Architecture encodes business decisions. The BC3 coupling wasn\'t a technical accident—it reflected a consulting model where each client got a custom file import. Decoupling the data model was as much a business model decision as a technical one.',
      'Validation partners beat pilot customers. The 3 firms investing in BIM integration gave us real files, fast feedback, and patience with rough edges—something paying pilot customers rarely offer. They were co-building, not evaluating.',
      'As a consultant, your job is to make yourself replaceable. Hiring the internal engineer, documenting architecture decisions, and building partner relationships meant Ecometro could continue executing after my engagement ended.',
    ],
    techStack: ['Jira', 'Figma', 'BIM', 'BC3', 'PostgreSQL', 'React'],
    links: [
      {
        label: 'Ecometro Website',
        url: 'https://ecometro.org',
        icon: 'website',
      },
    ],
  },

  // RatedPower Case Study
  {
    id: 'ratedpower-topography',
    title: 'RatedPower - Topography Tool',
    role: 'Product Manager',
    company: 'RatedPower',
    period: '2019 - 2022',
    thumbnail: '/images/case-studies/ratedpower-topography-thumbnail.png',
    thumbnailAlt: 'RatedPower accelerating photovoltaics',
    featuredImage: '/images/case-studies/ratedpower-topography-tool.png',
    featuredImageAlt: 'RatedPower topography tool showing 3D solar plant with slope restrictions panel',
    tagline:
      'Automated terrain analysis and earthwork calculations that won back customers from competitors.',
    resultsDescription:
      'This feature directly addressed our biggest competitive gap. After launch, we won back customers who had chosen PVCase the previous year, and shifted RatedPower\'s market perception from \'early design tool\' to a more sophisticated platform developers could use without hiring an engineer for early stages.',
    results: [
      {
        metric: 'ARR Growth',
        value: 'x4',
        description: 'Year of feature launch (2019-2020)',
      },
      {
        metric: 'Competitive Wins',
        value: '5+',
        description: 'Won back clients who had left',
      },
      {
        metric: 'Processing Time',
        value: 'x10',
        description: 'Automated manual workflows',
      },
    ],
    challenge:
      'Solar plants are built on terrain with significant slopes, and each structure type has limits to how much slope it can handle. We only provided a slope heat map with 30m precision, leaving users to manually guess which areas were buildable. They excluded potentially usable land out of risk aversion, with no way to validate their assumptions. Competitors like PVCase already offered topography validation, and we were losing deals specifically because of this gap.',
    approach: [
      {
        title: 'Feedback Pipeline',
        description:
          'Built a structured feedback pipeline used by Sales and CS to classify customer requests, tracking which companies requested what and linking requests to lost deals. This feature surfaced at the top, we could trace specific deals lost to PVCase because of this capability gap.',
      },
      {
        title: 'Client Discovery',
        description:
          'Joined customer calls with Sales and CS to hear frustration firsthand. Contacted clients who had requested the feature to understand their current painful workflows: manually excluding potentially usable land with no way to validate assumptions. Maintained a group of 4-5 power users for ongoing validation.',
      },
      {
        title: 'Technical Definition',
        description:
          'Leveraged my civil engineering background to go deep: tested competitor tools, obtained internal Excel/AutoCAD tools from former colleagues, and mapped the full solution landscape. Defined a phased approach with the engineering team: custom topography upload, structure restriction validation, then earthwork calculations.',
      },
      {
        title: 'Phased Delivery & Iteration',
        description:
          'Shipped in 3 phases over ~6 months, validating with real users between releases. Each phase built on validated learning: from NNI interpolation tuning, to custom placement algorithms, to earthwork accuracy benchmarking at 90%. Shared progress with power users continuously to confirm direction before investing further.',
      },
    ],
    keyDecisions: [
      'Chose 90% accuracy with fast computation over 99% accuracy that would take 10x longer to build. Our users needed confidence for preliminary design, not perfection, matching the phase of their workflow where speed matters more than precision.',
      'Standardized on CSV/XYZ files only, rejecting CAD file support despite client requests. CAD files varied wildly in formatting, supporting them would have delayed launch significantly while solving an edge case most topographers could work around.',
      'Added CAD profile drawings as output, something no competitor offered. The algorithm naturally produced this data, so with minimal extra effort we turned feature parity into competitive advantage.',
      'Shipped in 3 phases rather than waiting for the complete solution. Each release validated our technical approach with real users before investing in the next layer of complexity.',
      'Decided not to model earthwork interactions between adjacent structures. The accuracy gain didn\'t justify the computational cost or development time for preliminary design use cases.',
    ],
    learnings: [
      'Structured feedback pipelines transform prioritization from gut feel to evidence. Tracking which companies requested what—and linking to lost deals—gave us undeniable data to prioritize this feature over competing roadmap items.',
      'Domain knowledge compounds. My civil engineering background and PV construction experience accelerated discovery, helped me speak credibly with technical users, and let me evaluate solutions without depending entirely on engineering.',
      'Customer Success is a product superpower. Their direct line to customer pain points and their own engineering expertise made them invaluable partners throughout discovery, validation, and iteration.',
      'Phased delivery de-risks complex features. Shipping in 3 releases let us validate our technical approach with real users between phases, building confidence before investing in the next layer of complexity.',
    ],
    techStack: ['Notion', 'Excel', 'AutoCAD', 'QGIS', 'Interpolation Algorithms', 'Python'],
    links: [
      {
        label: 'Earthwork Tool Webpage',
        url: 'https://ratedpower.com/platform/earthwork/',
        icon: 'website',
      },
      {
        label: 'Topography Upload Guide',
        url: 'https://help.ratedpower.com/s/article/how-to-upload-your-topography?language=en_US',
        icon: 'gear',
      },
      {
        label: 'How It Works',
        url: 'https://help.ratedpower.com/s/article/how-does-pvdesigns-topography-limitation-and-earthworks-tool-work?language=en_US',
        icon: 'gear',
      },
    ],
  },

  // Maxem Case Study
  {
    id: 'maxem-platform',
    title: 'Maxem - Smart Charging Algorithm',
    role: 'Product Manager',
    company: 'Maxem',
    period: '2022 - 2024',
    thumbnail: '/images/case-studies/maxem-smart-thumbnail.png',
    thumbnailAlt: 'Maxem smart charging - accelerators of the energy transition',
    featuredImage: '/images/case-studies/maxem-smart-features.png',
    featuredImageAlt: 'Maxem energy management system showing solar power, charging stations, batteries, and energy market connection',
    tagline:
      'Taking a smart EV charging algorithm from concept to production, unlocking the company\'s largest enterprise deals.',
    resultsDescription:
      'The smart charging capability became the key differentiator in enterprise sales, unlocking the largest deals of the year and enabling a new pricing strategy based on algorithm complexity tiers.',
    results: [
      {
        metric: 'Revenue Growth',
        value: '2x',
        description: 'Year-over-year (2022-2023)',
      },
      {
        metric: 'Charging Points Growth',
        value: '2x',
        description: 'Year-over-year (2022-2023)',
      },
      {
        metric: 'Enterprise Deals',
        value: '4+',
        description: 'DHL, Watthub, CTPark, Schiphol',
      },
    ],
    challenge:
      'Maxem had a concept for moving EV load balancing intelligence from hardware to cloud, but nothing was developed. The stakes were high: if the algorithm failed, client EVs wouldn\'t charge, disrupting logistics operations. No competitor offered a flexible, hardware-agnostic solution that could optimize charging based on solar production, battery storage, and energy prices.',
    approach: [
      {
        title: 'De-risking Framework',
        description:
          'Adopted Technology Readiness Levels (TRL) to structure validation: from concept testing through simulator scenarios, lab hardware tests, field tests at client locations, monitored early customers, to full commercial deployment. Each phase went through the full cycle before progressing.',
      },
      {
        title: 'Enterprise Stakeholder Research',
        description:
          'Worked with flagship projects (Watthub—world\'s largest truck charging station; CTPark Amsterdam—major logistics hub) revealing complex stakeholder maps: asset managers, facility operators, grid operators, and contractors. Discovered hidden requirements like time-variable grid limits that reshaped the product scope.',
      },
      {
        title: 'Architecture Decision',
        description:
          'Evaluated cloud-only (smart but unsafe—30s response time), local-only (safe but dumb), and hybrid approaches. Chose hybrid: cloud handles intelligence and optimization, simplified local device handles safety with 1-second response time. If overload detected, it reduces charging immediately—independent of cloud state.',
      },
      {
        title: 'Phased Delivery',
        description:
          'Structured delivery in 6 phases of increasing complexity: socket balancing, location balancing, solar charging, optimized solar with driver priorities, battery storage integration, and virtual power plant. Implemented through Phase 5 during my tenure.',
      },
    ],
    keyDecisions: [
      'Chose hybrid cloud-local architecture over pure cloud. Cloud intelligence with local safety fallback gave enterprise clients the reliability guarantees they needed for logistics-critical operations.',
      'Adopted TRL framework for a safety-critical product. When algorithm failure means EVs don\'t charge and logistics stops, structured de-risking prevented shipping something that could damage client operations and our reputation.',
      'Built the algorithm simulator as a multi-purpose tool. What started as TRL 3 testing became an internal testing asset, UX concept demo for asset managers, and sales demonstration tool.',
      'Launched with "still in testing" status and close monitoring (TRL 8). Transparency built customer confidence—they appreciated being partners in validation rather than guinea pigs.',
      'Evolved pricing from charger count to algorithm complexity tiers. As capabilities grew, tiers created natural upgrade paths and better upsale conversations with existing partners.',
    ],
    learnings: [
      'Align stakeholders early in multi-party projects. Being a subcontractor of subcontractors caused misunderstandings about technology readiness. Push for all stakeholders to meet from the beginning—dependencies and requirements need to be visible to everyone.',
      'TRL framework pays off for critical features. The discipline of structured validation stages prevented us from shipping prematurely. Each phase built confidence in the next, and the simulator became a reusable asset across testing, demos, and UX design.',
      'Hybrid beats either/or. The cloud-only vs. local-only debate resolved into a solution better than both. Sometimes the right answer isn\'t choosing between options but combining their strengths.',
      'Multi-purpose tools multiply value. The simulator built for testing became an internal QA tool, an asset manager configuration demo, and a sales asset. Building tools that serve multiple purposes compounds their ROI.',
    ],
    techStack: ['Jira', 'Figma', 'Grafana', 'OCPP', 'OCPI'],
    links: [
      {
        label: 'Maxem Energy Platform',
        url: 'https://maxem.energy',
        icon: 'website',
      },
      {
        label: 'Smart Charging Overview',
        url: '/files/Smart%20Charging%20by%20Maxem.pdf#toolbar=0',
        icon: 'document',
      },
    ],
  },

  // Portfolio Case Study
  {
    id: 'portfolio-rag-chatbot',
    title: 'Portfolio - RAG Chatbot',
    role: 'Builder',
    company: 'Personal Project',
    period: '2025',
    thumbnail: '/images/case-studies/portfolio-thumbnail.gif',
    thumbnailAlt: 'Portfolio chat interface with blinking cursor',
    tagline:
      'Built a full-stack AI chatbot from scratch to demonstrate that I don\'t just spec AI products—I build them.',
    resultsDescription:
      'This project demonstrates end-to-end AI product execution: from architecture decisions and vector database design to a production-ready chat interface—all built in a structured, test-driven workflow.',
    results: [
      {
        metric: 'Development Speed',
        value: '8 phases',
        description: 'Shipped in days, not weeks',
      },
      {
        metric: 'Test Coverage',
        value: '200+',
        description: 'Tests passing (TDD approach)',
      },
      {
        metric: 'Response Time',
        value: '<2s',
        description: 'RAG query to answer',
      },
    ],
    challenge:
      'Most PM portfolios are static pages listing past experience. I wanted to build something that demonstrates I can go beyond writing specs—actually designing and implementing an AI system end-to-end. The goal: a portfolio that itself is a product, showcasing RAG architecture, prompt engineering, and modern development workflows.',
    approach: [
      {
        title: 'Chat-First Product Decision',
        description:
          'Made the chat interface the homepage itself—visitors land directly in a conversation with an AI that knows my background. This forces the AI implementation to be excellent, since it\'s the first thing people experience.',
      },
      {
        title: 'RAG Architecture Design',
        description:
          'Designed a retrieval-augmented generation pipeline: content chunked into semantic pieces, embedded with OpenAI (1536 dimensions), stored in PostgreSQL + pgvector, and retrieved via cosine similarity to ground Claude\'s responses in real portfolio content.',
      },
      {
        title: 'AI-Assisted Development',
        description:
          'Used Claude Code with specialized agents (planner, architect, tdd-guide, code-reviewer, security-reviewer) orchestrated through an autonomous workflow. This meta-approach demonstrates how AI tools can accelerate product delivery while maintaining quality gates.',
      },
      {
        title: 'Quality Engineering',
        description:
          'Applied strict TDD methodology: tests written before implementation, code review on every change, security review on all API endpoints. 200+ tests ensure the system works reliably and can be extended confidently.',
      },
      {
        title: 'Evaluation Pipeline',
        description:
          'Built an evals system following an error-analysis-first methodology: reviewed real interactions to categorize failure modes, then created separate evaluators for retriever quality (recall@k, relevance of retrieved chunks) and generator quality (faithfulness to context, answer relevance). This treats the chatbot as a measurable product, not a black box.',
      },
    ],
    keyDecisions: [
      'Chat-first homepage over traditional portfolio layout. The chat IS the product—if the AI experience is compelling, it proves the point better than any case study description.',
      'pgvector over dedicated vector DB (Pinecone, Weaviate). For 25+ content chunks, PostgreSQL with vector extension provides the same capabilities without adding infrastructure complexity or cost.',
      'Claude for generation, OpenAI for embeddings. Each model excels at its task—Claude\'s reasoning produces better conversational answers, while OpenAI\'s embedding model provides efficient vector representations.',
      'Structured phases with autonomous execution. Breaking the build into 8 clear phases with quality gates enabled rapid parallel development without sacrificing code quality.',
      'Evaluated retriever and generator separately rather than treating the RAG pipeline as a single unit. When answers are poor, the fix is different depending on whether the right content wasn\'t retrieved or whether the LLM misused good context—separating these surfaces the real problem.',
    ],
    learnings: [
      'AI-assisted development changes the PM-engineer dynamic. Using Claude Code with specialized agents let me move from "writing specs for engineers" to "directing AI agents through implementation"—a workflow that will define the next generation of technical PMs.',
      'RAG architecture is about trade-offs, not complexity. The core pattern (chunk → embed → retrieve → generate) is straightforward; the real skill is choosing the right chunk size, similarity threshold, and prompt structure to get useful answers.',
      'Products differentiate through execution, not features. Every PM could list "built a chatbot" on their portfolio. Actually shipping one—with tests, security reviews, and production-quality code—demonstrates a fundamentally different level of capability.',
      'AI products need evals the way traditional products need analytics. Off-the-shelf metrics like "hallucination score" disconnect from real user problems—starting with error analysis of actual interactions and categorizing failure modes produces evaluators that actually improve the product.',
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'pgvector',
      'Claude API',
      'OpenAI Embeddings',
      'Claude Code',
      'Braintrust',
    ],
    links: [
      {
        label: 'View Source Code',
        url: 'https://github.com/itsamimario/Portfolio',
        icon: 'github',
      },
      {
        label: 'CC Configuration Reference',
        url: 'https://x.com/affaanmustafa/status/2012378465664745795',
        icon: 'x',
      },
      {
        label: 'Eval System Reference',
        url: 'https://www.lennysnewsletter.com/p/building-eval-systems-that-improve',
        icon: 'substack',
      },
    ],
  },
];
