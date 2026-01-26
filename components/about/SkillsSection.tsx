/**
 * SkillsSection component
 * Displays skills with animated progress bars
 */

import { skillCategories } from '@/data/skills';
import { SkillBar } from './SkillBar';

export function SkillsSection(): JSX.Element {
  return (
    <section id="skills" className="py-12 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl md:text-4xl font-pixel mb-8">Skills</h2>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <h3 className="text-xl font-pixel mb-6">{category.title}</h3>
            {category.skills.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                proficiency={skill.proficiency}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
