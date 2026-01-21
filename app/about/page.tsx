import { StickyNav } from '@/components/about/StickyNav';
import { HeroSection } from '@/components/about/HeroSection';
import { ImpactHighlights } from '@/components/about/ImpactHighlights';
import { VisualTimeline } from '@/components/about/VisualTimeline';
import { SkillsSection } from '@/components/about/SkillsSection';
import { LearningSection } from '@/components/about/LearningSection';
import { TestimonialsSection } from '@/components/about/TestimonialsSection';
import { Footer } from '@/components/about/Footer';
import { timeline } from '@/data/timeline';

export default function About() {
  return (
    <main className="min-h-screen bg-white font-pixel">
      {/* Sticky Navigation */}
      <StickyNav />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <HeroSection />

        {/* Impact Highlights */}
        <ImpactHighlights />

        {/* Timeline / Experience */}
        <VisualTimeline entries={timeline} />

        {/* Skills with Progress Bars */}
        <SkillsSection />

        {/* Learning Philosophy */}
        <LearningSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Footer with CTA */}
        <Footer />
      </div>
    </main>
  );
}
