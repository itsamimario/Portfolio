"use client";

import { useState, useEffect } from "react";

export default function TerminalText() {
  const sections = [
    { text: "Hi!", type: "big" },
    { text: "\n", type: "big" },
    { text: "I'm ", type: "big" },
    { text: "Mario Bennekers", type: "big-bold" },
    { text: "\n", type: "big" },
    { text: "Product Manager", type: "big" },
    { text: "\n\n", type: "normal" },
    { text: "This is my portfolio, feel free to navigate through it or ask directly any question about myself.", type: "normal" }
  ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [displayedSections, setDisplayedSections] = useState<Array<{ text: string; type: string }>>([]);

  useEffect(() => {
    if (currentSectionIndex < sections.length) {
      const currentSection = sections[currentSectionIndex];

      if (currentCharIndex < currentSection.text.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1);
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        // Move to next section
        setDisplayedSections(prev => [...prev, currentSection]);
        setCurrentSectionIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }
    }
  }, [currentSectionIndex, currentCharIndex, sections]);

  const renderSection = (section: { text: string; type: string }, isPartial: boolean = false, partialText: string = "") => {
    const text = isPartial ? partialText : section.text;

    if (section.type === "big") {
      return <span className="text-4xl md:text-5xl font-pixel">{text}</span>;
    } else if (section.type === "big-bold") {
      return <span className="text-4xl md:text-5xl font-pixel font-bold">{text}</span>;
    } else {
      return <span className="text-2xl md:text-3xl font-pixel">{text}</span>;
    }
  };

  const isTyping = currentSectionIndex < sections.length;
  const currentSection = isTyping ? sections[currentSectionIndex] : null;

  return (
    <div className="text-black leading-relaxed whitespace-pre-wrap">
      {displayedSections.map((section, idx) => (
        <span key={idx}>{renderSection(section)}</span>
      ))}
      {currentSection && renderSection(currentSection, true, currentSection.text.slice(0, currentCharIndex))}
      {isTyping && (
        <span className="inline-block w-1 h-8 bg-black ml-1 animate-pulse align-middle"></span>
      )}
    </div>
  );
}
