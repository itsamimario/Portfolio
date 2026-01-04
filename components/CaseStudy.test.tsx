import { render, screen } from '@testing-library/react';
import { CaseStudy } from './CaseStudy';
import { CaseStudy as CaseStudyType } from '@/types/content';

describe('CaseStudy Component', () => {
  const mockCaseStudy: CaseStudyType = {
    id: 'test-case-study',
    title: 'Test Project',
    role: 'Product Manager',
    company: 'Test Company',
    period: '2024 - Present',
    thumbnail: '/test-thumbnail.jpg',
    thumbnailAlt: 'Test thumbnail',
    tagline: 'A test case study',
    challenge: 'This is the challenge description',
    approach: [
      {
        title: 'Step 1',
        description: 'First approach step',
      },
      {
        title: 'Step 2',
        description: 'Second approach step',
      },
    ],
    keyDecisions: ['Decision 1', 'Decision 2'],
    results: [
      {
        metric: 'Revenue',
        value: '$1M',
        description: 'Revenue growth',
      },
    ],
    techStack: ['React', 'TypeScript', 'Next.js'],
  };

  describe('Card variant', () => {
    it('renders card variant with basic info', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="card" />);

      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText(/Product Manager/)).toBeInTheDocument();
      expect(screen.getByText(/2024 - Present/)).toBeInTheDocument();
      expect(screen.getByText('A test case study')).toBeInTheDocument();
    });

    it('renders thumbnail image', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="card" />);

      const image = screen.getByAltText('Test thumbnail');
      expect(image).toBeInTheDocument();
    });

    it('renders as a clickable link to case study detail page', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="card" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/case-studies/test-case-study');
    });

    it('does not render full details in card variant', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="card" />);

      expect(screen.queryByText('This is the challenge description')).not.toBeInTheDocument();
      expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
    });
  });

  describe('Full variant', () => {
    it('renders all sections', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="full" />);

      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText(/Product Manager/)).toBeInTheDocument();
      expect(screen.getByText(/2024 - Present/)).toBeInTheDocument();
      expect(screen.getByText('A test case study')).toBeInTheDocument();
    });

    it('renders challenge section', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="full" />);

      expect(screen.getByRole('heading', { name: /The Challenge/i })).toBeInTheDocument();
      expect(screen.getByText('This is the challenge description')).toBeInTheDocument();
    });

    it('renders approach steps', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="full" />);

      expect(screen.getByText(/My Approach/i)).toBeInTheDocument();
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('First approach step')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Second approach step')).toBeInTheDocument();
    });

    it('renders key decisions', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="full" />);

      expect(screen.getByText(/Key Decisions/i)).toBeInTheDocument();
      expect(screen.getByText('Decision 1')).toBeInTheDocument();
      expect(screen.getByText('Decision 2')).toBeInTheDocument();
    });

    it('renders results with metrics', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="full" />);

      expect(screen.getByText(/Results/i)).toBeInTheDocument();
      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('$1M')).toBeInTheDocument();
      expect(screen.getByText('Revenue growth')).toBeInTheDocument();
    });

    it('renders tech stack', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="full" />);

      expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
    });

    it('renders links when provided', () => {
      const caseStudyWithLinks: CaseStudyType = {
        ...mockCaseStudy,
        links: [
          { label: 'View Figma', url: 'https://figma.com/test', icon: 'figma' },
          { label: 'GitHub', url: 'https://github.com/test', icon: 'github' },
        ],
      };

      render(<CaseStudy caseStudy={caseStudyWithLinks} variant="full" />);

      const figmaLink = screen.getByRole('link', { name: /View Figma/i });
      const githubLink = screen.getByRole('link', { name: /GitHub/i });

      expect(figmaLink).toHaveAttribute('href', 'https://figma.com/test');
      expect(githubLink).toHaveAttribute('href', 'https://github.com/test');
    });

    it('renders embed iframe when embedUrl is provided', () => {
      const caseStudyWithEmbed: CaseStudyType = {
        ...mockCaseStudy,
        embedUrl: 'https://www.figma.com/embed?embed_host=test',
      };

      render(<CaseStudy caseStudy={caseStudyWithEmbed} variant="full" />);

      const iframe = screen.getByTitle(/embed/i);
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src', 'https://www.figma.com/embed?embed_host=test');
    });
  });

  describe('Default variant', () => {
    it('defaults to card variant when variant prop is not provided', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} />);

      // Should show card content
      expect(screen.getByText('Test Project')).toBeInTheDocument();

      // Should not show full details
      expect(screen.queryByText('This is the challenge description')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic HTML structure', () => {
      const { container } = render(<CaseStudy caseStudy={mockCaseStudy} variant="full" />);

      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
    });

    it('has accessible image alt text', () => {
      render(<CaseStudy caseStudy={mockCaseStudy} variant="card" />);

      const image = screen.getByAltText('Test thumbnail');
      expect(image).toBeInTheDocument();
    });

    it('renders external links with proper attributes', () => {
      const caseStudyWithLinks: CaseStudyType = {
        ...mockCaseStudy,
        links: [{ label: 'External Link', url: 'https://example.com' }],
      };

      render(<CaseStudy caseStudy={caseStudyWithLinks} variant="full" />);

      const link = screen.getByRole('link', { name: /External Link/i });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
