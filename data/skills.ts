/**
 * Skills data with proficiency levels
 */

import type { SkillCategory } from '@/types/skills';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Product Management',
    skills: [
      { name: 'Product Strategy & Roadmapping', proficiency: 95 },
      { name: 'Product Discovery & Validation', proficiency: 90 },
      { name: 'User Research & Analytics', proficiency: 90 },
      { name: 'Agile/Scrum Leadership', proficiency: 85 },
      { name: 'Cross-functional Team Management', proficiency: 90 },
    ],
  },
  {
    title: 'Technical',
    skills: [
      { name: 'React / TypeScript / Next.js', proficiency: 75 },
      { name: 'Python / Node.js', proficiency: 65 },
      { name: 'AI/ML Tools (Claude, RAG)', proficiency: 85 },
      { name: 'SQL / PostgreSQL', proficiency: 70 },
      { name: 'Figma / Design Systems', proficiency: 80 },
    ],
  },
];
