/**
 * Skill types for the about page
 */

export interface Skill {
  name: string;
  proficiency: number; // 0-100
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}
