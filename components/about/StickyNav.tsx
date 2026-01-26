/**
 * StickyNav component
 * Context-aware navigation bar with three states based on current page
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { caseStudies } from '@/data/caseStudies';

type Section = 'home' | 'about' | 'case-studies';

interface NavLink {
  label: string;
  href: string;
}

const aboutNavLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
];

// Group case studies by company
const caseStudiesByCompany = caseStudies.reduce((acc, cs) => {
  if (!acc[cs.company]) {
    acc[cs.company] = [];
  }
  acc[cs.company].push({ id: cs.id, title: cs.title });
  return acc;
}, {} as Record<string, { id: string; title: string }[]>);

function HamburgerIcon({ open }: { open: boolean }): JSX.Element {
  return (
    <div className="w-5 h-4 flex flex-col justify-between">
      <span
        className={`block h-0.5 w-full bg-current transition-transform duration-300 ${
          open ? 'rotate-45 translate-y-[7px]' : ''
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${
          open ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-current transition-transform duration-300 ${
          open ? '-rotate-45 -translate-y-[7px]' : ''
        }`}
      />
    </div>
  );
}

function ChevronIcon({ open, className = 'w-3 h-3' }: { open: boolean; className?: string }): JSX.Element {
  return (
    <svg
      className={`${className} transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CaseStudiesDropdown({
  open,
  onToggle,
  onSelect,
  dropdownRef,
  currentCaseStudyId,
  bold = false,
}: {
  open: boolean;
  onToggle: () => void;
  onSelect: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  currentCaseStudyId?: string;
  bold?: boolean;
}): JSX.Element {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`text-sm font-pixel transition-colors flex items-center gap-1 ${
          bold ? 'text-gray-900 dark:text-gray-100 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        Case Studies
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute top-full left-[-16px] mt-[19px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-t-0 py-3 px-4 min-w-[220px]">
          {Object.entries(caseStudiesByCompany).map(([company, studies]) => (
            <div key={company} className="mb-3 last:mb-0">
              <div className="text-xs font-pixel text-gray-400 dark:text-gray-500 mb-1">{company}</div>
              {studies.map((cs) => (
                <Link
                  key={cs.id}
                  href={`/case-studies/${cs.id}`}
                  className={`block py-1 text-sm font-pixel transition-colors ${
                    currentCaseStudyId === cs.id
                      ? 'text-gray-900 dark:text-gray-100 font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  onClick={onSelect}
                >
                  {cs.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getSection(pathname: string): Section {
  if (pathname.startsWith('/case-studies')) return 'case-studies';
  if (pathname.startsWith('/about')) return 'about';
  return 'home';
}

function getCaseStudyIdFromPath(pathname: string): string | undefined {
  const match = pathname.match(/^\/case-studies\/(.+)$/);
  return match ? match[1] : undefined;
}

export function StickyNav(): JSX.Element {
  const pathname = usePathname();
  const section = getSection(pathname);
  const currentCaseStudyId = getCaseStudyIdFromPath(pathname);

  const [activeSection, setActiveSection] = useState<string>('');
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCaseStudiesOpen, setMobileCaseStudiesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver only active on about page
  useEffect(() => {
    if (section !== 'about') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    aboutNavLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [section]);

  // Click outside handlers
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCaseStudiesOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-mobile-toggle]')
      ) {
        setMobileMenuOpen(false);
        setMobileCaseStudiesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToElement = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      const navbarHeight = 56;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight - 16,
        behavior: 'smooth',
      });
    }
  };

  const handleAboutNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMobileCaseStudiesOpen(false);
    setTimeout(() => scrollToElement(href), 50);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (section === 'about') {
      e.preventDefault();
      setMobileMenuOpen(false);
      setMobileCaseStudiesOpen(false);
      setTimeout(() => scrollToElement('#contact'), 50);
    } else {
      // Let the link navigate to /about#contact
      setMobileMenuOpen(false);
      setMobileCaseStudiesOpen(false);
    }
  };

  const contactHref = section === 'about' ? '#contact' : '/about#contact';

  // Render left section based on current page
  const renderLeft = () => {
    switch (section) {
      case 'home':
        return (
          <>
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-pixel text-sm">
              About
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <CaseStudiesDropdown
              open={caseStudiesOpen}
              onToggle={() => setCaseStudiesOpen(!caseStudiesOpen)}
              onSelect={() => setCaseStudiesOpen(false)}
              dropdownRef={dropdownRef}
              currentCaseStudyId={currentCaseStudyId}
            />
          </>
        );
      case 'about':
        return (
          <>
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-pixel text-sm">
              AI Assistant
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <CaseStudiesDropdown
              open={caseStudiesOpen}
              onToggle={() => setCaseStudiesOpen(!caseStudiesOpen)}
              onSelect={() => setCaseStudiesOpen(false)}
              dropdownRef={dropdownRef}
              currentCaseStudyId={currentCaseStudyId}
            />
          </>
        );
      case 'case-studies':
        return (
          <>
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-pixel text-sm">
              AI Assistant
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-pixel text-sm">
              About
            </Link>
          </>
        );
    }
  };

  // Render center section based on current page
  const renderCenter = () => {
    switch (section) {
      case 'home':
        return <span className="font-pixel text-sm font-bold text-gray-900 dark:text-gray-100">AI Assistant</span>;
      case 'about':
        return (
          <>
            {aboutNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAboutNavClick(e, link.href)}
                className={`text-sm font-pixel transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white ${
                  activeSection === link.href ? 'font-bold' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </>
        );
      case 'case-studies':
        return (
          <CaseStudiesDropdown
            open={caseStudiesOpen}
            onToggle={() => setCaseStudiesOpen(!caseStudiesOpen)}
            onSelect={() => setCaseStudiesOpen(false)}
            dropdownRef={dropdownRef}
            currentCaseStudyId={currentCaseStudyId}
            bold
          />
        );
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between h-14">
          {/* Left: Mobile Menu Toggle + Section links */}
          <div className="flex items-center gap-3">
            <button
              data-mobile-toggle
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (mobileMenuOpen) setMobileCaseStudiesOpen(false);
              }}
              className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <HamburgerIcon open={mobileMenuOpen} />
            </button>

            <div className="hidden md:flex items-center gap-3">
              {renderLeft()}
            </div>
          </div>

          {/* Center: Current section indicator / sub-nav */}
          <div className="hidden md:flex items-center gap-6">
            {renderCenter()}
          </div>

          {/* Right: CV Download and Contact CTA */}
          <div className="flex items-center gap-3">
            <a
              href="/files/CV - Mario Bennekers.pdf"
              download
              className="hidden md:block font-pixel text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Download CV
            </a>
            <a
              href={contactHref}
              onClick={handleContactClick}
              className="font-pixel text-sm px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden absolute left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 max-w-4xl py-4 space-y-4">
            {/* AI Assistant */}
            <Link
              href="/"
              className={`block text-base font-pixel transition-colors ${
                section === 'home' ? 'text-gray-900 dark:text-gray-100 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Assistant
            </Link>

            {/* About */}
            <Link
              href="/about"
              className={`block text-base font-pixel transition-colors ${
                section === 'about' ? 'text-gray-900 dark:text-gray-100 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {/* Case Studies Accordion */}
            <div>
              <button
                onClick={() => setMobileCaseStudiesOpen(!mobileCaseStudiesOpen)}
                className={`flex items-center justify-between w-full text-base font-pixel transition-colors ${
                  section === 'case-studies' ? 'text-gray-900 dark:text-gray-100 font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Case Studies
                <ChevronIcon open={mobileCaseStudiesOpen} className="w-4 h-4" />
              </button>
              {mobileCaseStudiesOpen && (
                <div className="mt-2 ml-4 space-y-3">
                  {Object.entries(caseStudiesByCompany).map(([company, studies]) => (
                    <div key={company}>
                      <div className="text-xs font-pixel text-gray-400 dark:text-gray-500 mb-1">{company}</div>
                      {studies.map((cs) => (
                        <Link
                          key={cs.id}
                          href={`/case-studies/${cs.id}`}
                          className={`block py-0.5 text-sm font-pixel transition-colors ${
                            currentCaseStudyId === cs.id
                              ? 'text-gray-900 dark:text-gray-100 font-bold'
                              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileCaseStudiesOpen(false);
                          }}
                        >
                          {cs.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700" />

            {/* Download CV */}
            <a
              href="/files/CV - Mario Bennekers.pdf"
              download
              className="block text-base font-pixel text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Download CV
            </a>

            {/* Contact Me */}
            <a
              href={contactHref}
              onClick={handleContactClick}
              className="block text-base font-pixel text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
