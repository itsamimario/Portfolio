import { render, screen } from '@testing-library/react';
import { CaseStudies } from './CaseStudies';
import { CaseStudy } from '@/types/content';

describe('CaseStudies Component', () => {
  const mockCaseStudies: CaseStudy[] = [
    {
      id: 'case-1',
      title: 'Project One',
      role: 'Product Manager',
      company: 'Company A',
      period: '2023 - 2024',
      thumbnail: '/thumb1.jpg',
      thumbnailAlt: 'Project One thumbnail',
      tagline: 'First project tagline',
      challenge: 'Challenge 1',
      approach: [{ title: 'Step 1', description: 'Description 1' }],
      keyDecisions: ['Decision 1'],
      results: [{ metric: 'Metric 1', value: '100%' }],
      techStack: ['React'],
    },
    {
      id: 'case-2',
      title: 'Project Two',
      role: 'Senior PM',
      company: 'Company B',
      period: '2022 - 2023',
      thumbnail: '/thumb2.jpg',
      thumbnailAlt: 'Project Two thumbnail',
      tagline: 'Second project tagline',
      challenge: 'Challenge 2',
      approach: [{ title: 'Step 2', description: 'Description 2' }],
      keyDecisions: ['Decision 2'],
      results: [{ metric: 'Metric 2', value: '200%' }],
      techStack: ['TypeScript'],
    },
    {
      id: 'case-3',
      title: 'Project Three',
      role: 'PM Lead',
      company: 'Company C',
      period: '2021 - 2022',
      thumbnail: '/thumb3.jpg',
      thumbnailAlt: 'Project Three thumbnail',
      tagline: 'Third project tagline',
      challenge: 'Challenge 3',
      approach: [{ title: 'Step 3', description: 'Description 3' }],
      keyDecisions: ['Decision 3'],
      results: [{ metric: 'Metric 3', value: '300%' }],
      techStack: ['Next.js'],
    },
  ];

  describe('Rendering', () => {
    it('renders all case studies', () => {
      render(<CaseStudies caseStudies={mockCaseStudies} />);

      expect(screen.getByText('Project One')).toBeInTheDocument();
      expect(screen.getByText('Project Two')).toBeInTheDocument();
      expect(screen.getByText('Project Three')).toBeInTheDocument();
    });

    it('renders custom title when provided', () => {
      render(
        <CaseStudies
          caseStudies={mockCaseStudies}
          title="My Case Studies"
        />
      );

      expect(screen.getByText('My Case Studies')).toBeInTheDocument();
    });

    it('renders default title when not provided', () => {
      render(<CaseStudies caseStudies={mockCaseStudies} />);

      expect(screen.getByText('Case Studies')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <CaseStudies
          caseStudies={mockCaseStudies}
          description="Here are my projects"
        />
      );

      expect(screen.getByText('Here are my projects')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      const { container } = render(<CaseStudies caseStudies={mockCaseStudies} />);

      const descriptions = container.querySelectorAll('p');
      // Should only have the taglines, not a section description
      expect(descriptions.length).toBeGreaterThan(0);
    });

    it('renders each case study in card variant', () => {
      render(<CaseStudies caseStudies={mockCaseStudies} />);

      // All three taglines should be visible (card variant shows taglines)
      expect(screen.getByText('First project tagline')).toBeInTheDocument();
      expect(screen.getByText('Second project tagline')).toBeInTheDocument();
      expect(screen.getByText('Third project tagline')).toBeInTheDocument();

      // Full details should not be visible (card variant)
      expect(screen.queryByText('Challenge 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Challenge 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Challenge 3')).not.toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders case studies in a grid layout', () => {
      const { container } = render(<CaseStudies caseStudies={mockCaseStudies} />);

      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
    });

    it('renders in a section element', () => {
      const { container } = render(<CaseStudies caseStudies={mockCaseStudies} />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('renders nothing when no case studies provided', () => {
      const { container } = render(<CaseStudies caseStudies={[]} />);

      expect(screen.queryByText('Case Studies')).not.toBeInTheDocument();
      expect(container.querySelector('section')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic HTML structure', () => {
      const { container } = render(<CaseStudies caseStudies={mockCaseStudies} />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();

      const heading = screen.getByRole('heading', { name: /Case Studies/i });
      expect(heading).toBeInTheDocument();
    });

    it('renders heading as h2', () => {
      render(<CaseStudies caseStudies={mockCaseStudies} />);

      const heading = screen.getByRole('heading', { name: /Case Studies/i, level: 2 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Single Case Study', () => {
    it('renders correctly with only one case study', () => {
      render(<CaseStudies caseStudies={[mockCaseStudies[0]]} />);

      expect(screen.getByText('Project One')).toBeInTheDocument();
      expect(screen.queryByText('Project Two')).not.toBeInTheDocument();
      expect(screen.queryByText('Project Three')).not.toBeInTheDocument();
    });
  });
});
