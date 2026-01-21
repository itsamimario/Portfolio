/**
 * StickyNav component
 * Sticky navigation bar for the about page with anchor links and CV download
 */

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function StickyNav(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('');

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between h-14">
          {/* Left: Home link and name */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-blue-600 underline hover:text-blue-800 font-pixel text-sm"
            >
              Home
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-pixel text-sm hidden sm:inline">Mario Bennekers</span>
          </div>

          {/* Center: Navigation links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-pixel transition-colors ${
                  activeSection === link.href
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: CV Download */}
          <a
            href="/files/CV - Mario Bennekers.pdf"
            download
            className="font-pixel text-sm px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}
