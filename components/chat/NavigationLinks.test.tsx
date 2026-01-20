/**
 * Tests for NavigationLinks component
 * TDD: Write tests FIRST before implementation
 * Phase 7: Chat UI
 */

import { render, screen } from '@testing-library/react';
import { NavigationLinks } from './NavigationLinks';

describe('NavigationLinks', () => {
  describe('rendering', () => {
    it('renders About link', () => {
      render(<NavigationLinks />);

      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('renders Case Studies link', () => {
      render(<NavigationLinks />);

      const caseStudiesLink = screen.getByRole('link', {
        name: /case studies/i,
      });
      expect(caseStudiesLink).toBeInTheDocument();
      expect(caseStudiesLink).toHaveAttribute('href', '/case-studies');
    });

    it('renders Product Playbook link', () => {
      render(<NavigationLinks />);

      const playbookLink = screen.getByRole('link', {
        name: /product playbook/i,
      });
      expect(playbookLink).toBeInTheDocument();
      expect(playbookLink).toHaveAttribute('href', '/playbook');
    });

    it('renders all three links', () => {
      render(<NavigationLinks />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
    });
  });

  describe('sticky behavior', () => {
    it('applies sticky styles when isSticky is true', () => {
      const { container } = render(<NavigationLinks isSticky={true} />);

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('sticky');
      expect(nav).toHaveClass('top-0');
    });

    it('does not apply sticky styles when isSticky is false', () => {
      const { container } = render(<NavigationLinks isSticky={false} />);

      const nav = container.querySelector('nav');
      expect(nav).not.toHaveClass('sticky');
    });

    it('defaults to non-sticky when prop is not provided', () => {
      const { container } = render(<NavigationLinks />);

      const nav = container.querySelector('nav');
      expect(nav).not.toHaveClass('sticky');
    });

    it('applies background and border when sticky', () => {
      const { container } = render(<NavigationLinks isSticky={true} />);

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('bg-white');
      expect(nav?.className).toMatch(/border-b/);
    });

    it('applies z-index when sticky', () => {
      const { container } = render(<NavigationLinks isSticky={true} />);

      const nav = container.querySelector('nav');
      expect(nav?.className).toMatch(/z-/);
    });
  });

  describe('styling', () => {
    it('uses flex layout for links', () => {
      const { container } = render(<NavigationLinks />);

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('flex');
    });

    it('has appropriate spacing between links', () => {
      const { container } = render(<NavigationLinks />);

      const nav = container.querySelector('nav');
      expect(nav?.className).toMatch(/gap-|space-/);
    });

    it('links have hover state styling', () => {
      render(<NavigationLinks />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link.className).toMatch(/hover:/);
      });
    });

    it('has appropriate padding', () => {
      const { container } = render(<NavigationLinks />);

      const nav = container.querySelector('nav');
      expect(nav?.className).toMatch(/p-|px-|py-/);
    });
  });

  describe('accessibility', () => {
    it('uses semantic nav element', () => {
      const { container } = render(<NavigationLinks />);

      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('has accessible label for navigation', () => {
      const { container } = render(<NavigationLinks />);

      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label');
    });

    it('links are focusable', () => {
      render(<NavigationLinks />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('links have visible focus indicator', () => {
      render(<NavigationLinks />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link.className).toMatch(/focus:/);
      });
    });
  });

  describe('link content', () => {
    it('About link has correct text', () => {
      render(<NavigationLinks />);

      expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('Case Studies link has correct text', () => {
      render(<NavigationLinks />);

      expect(screen.getByText('Case Studies')).toBeInTheDocument();
    });

    it('Product Playbook link has correct text', () => {
      render(<NavigationLinks />);

      expect(screen.getByText('Product Playbook')).toBeInTheDocument();
    });
  });
});
