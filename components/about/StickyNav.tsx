/**
 * StickyNav component
 * Sticky navigation bar with responsive hamburger menu
 */

'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { caseStudies } from '@/data/caseStudies';

interface NavLink {
  label: string;
  href: string;
}

interface StickyNavProps {
  currentCaseStudyId?: string;
}

const navLinks: NavLink[] = [
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

export function StickyNav({ currentCaseStudyId }: StickyNavProps = {}): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('');
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCaseStudiesOpen, setMobileCaseStudiesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

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
      const navbarHeight = 56; // h-14 = 56px
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight - 16, // 16px extra padding
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Close menu first, then scroll after layout updates
    setMobileMenuOpen(false);
    setMobileCaseStudiesOpen(false);
    setTimeout(() => scrollToElement(href), 50);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Close menu first, then scroll after layout updates
    setMobileMenuOpen(false);
    setMobileCaseStudiesOpen(false);
    setTimeout(() => scrollToElement('#contact'), 50);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between h-14">
          {/* Left: Mobile Menu Toggle + AI Assistant link */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              data-mobile-toggle
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (mobileMenuOpen) setMobileCaseStudiesOpen(false);
              }}
              className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              <HamburgerIcon open={mobileMenuOpen} />
            </button>

            {/* Desktop: AI Assistant and name */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 underline hover:text-gray-900 font-pixel text-sm"
              >
                AI Assistant
              </Link>
              <span className="text-gray-300">|</span>
              <span className="font-pixel text-sm">Mario Bennekers</span>
            </div>
          </div>

          {/* Center: Desktop Navigation links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-pixel transition-colors text-gray-600 hover:text-gray-900 ${
                  activeSection === link.href ? 'font-bold' : ''
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Case Studies Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCaseStudiesOpen(!caseStudiesOpen)}
                className="text-sm font-pixel text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                Case Studies
                <svg
                  className={`w-3 h-3 transition-transform ${caseStudiesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {caseStudiesOpen && (
                <div className="absolute top-full left-[-16px] mt-[19px] bg-white border border-gray-200 border-t-0 py-3 px-4 min-w-[220px]">
                  {Object.entries(caseStudiesByCompany).map(([company, studies]) => (
                    <div key={company} className="mb-3 last:mb-0">
                      <div className="text-xs font-pixel text-gray-400 mb-1">{company}</div>
                      {studies.map((cs) => (
                        <Link
                          key={cs.id}
                          href={`/case-studies/${cs.id}`}
                          className={`block py-1 text-sm font-pixel transition-colors ${
                            currentCaseStudyId === cs.id
                              ? 'text-gray-900 font-bold'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                          onClick={() => setCaseStudiesOpen(false)}
                        >
                          {cs.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: CV Download and Contact CTA */}
          <div className="flex items-center gap-3">
            <a
              href="/files/CV - Mario Bennekers.pdf"
              download
              className="hidden md:block font-pixel text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Download CV
            </a>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="font-pixel text-sm px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Below navbar */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-t border-gray-200 bg-white"
        >
          <div className="container mx-auto px-4 max-w-4xl py-4 space-y-4">
            {/* AI Assistant */}
            <Link
              href="/"
              className="block text-base font-pixel text-gray-600 underline hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Assistant
            </Link>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Nav Links */}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block text-base font-pixel transition-colors text-gray-600 hover:text-gray-900 ${
                  activeSection === link.href ? 'font-bold' : ''
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Case Studies Accordion */}
            <div>
              <button
                onClick={() => setMobileCaseStudiesOpen(!mobileCaseStudiesOpen)}
                className="flex items-center justify-between w-full text-base font-pixel text-gray-600 hover:text-gray-900 transition-colors"
              >
                Case Studies
                <svg
                  className={`w-4 h-4 transition-transform ${mobileCaseStudiesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileCaseStudiesOpen && (
                <div className="mt-2 ml-4 space-y-3">
                  {Object.entries(caseStudiesByCompany).map(([company, studies]) => (
                    <div key={company}>
                      <div className="text-xs font-pixel text-gray-400 mb-1">{company}</div>
                      {studies.map((cs) => (
                        <Link
                          key={cs.id}
                          href={`/case-studies/${cs.id}`}
                          className={`block py-0.5 text-sm font-pixel transition-colors ${
                            currentCaseStudyId === cs.id
                              ? 'text-gray-900 font-bold'
                              : 'text-gray-500 hover:text-gray-900'
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
            <div className="border-t border-gray-200" />

            {/* Download CV */}
            <a
              href="/files/CV - Mario Bennekers.pdf"
              download
              className="block text-base font-pixel text-gray-600 hover:text-gray-900 transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
