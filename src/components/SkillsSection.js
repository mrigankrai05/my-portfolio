// src/components/SkillsSection.js
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { useTheme } from '../ThemeContext';
// Corrected: Using 'Wrench' instead of 'Tool' as 'Tool' is not exported by lucide-react
import { CheckCircle, Code, Server, Database, Wrench } from 'lucide-react';

// Skill Category Component - Modernized
const SkillCategory = ({ title, items, Icon }) => {
  const { theme } = useTheme();
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const cardBorder = theme === 'dark' ? 'border-gray-700 hover:border-blue-500' : 'border-gray-300 hover:border-blue-500';
  const titleColor = theme === 'dark' ? 'text-blue-300' : 'text-blue-600';
  const itemColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const iconColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-600';

  return (
    <div className={`${cardBg} p-6 rounded-lg shadow-md border ${cardBorder} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
      <div className="flex items-center mb-4">
        {Icon && <Icon className={`w-8 h-8 mr-3 ${iconColor}`} />}
        <h3 className={`text-2xl font-semibold ${titleColor}`}>{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className={`flex items-center ${itemColor}`}>
            <CheckCircle className={`w-4 h-4 mr-2 ${iconColor} animate-pulse`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Skills Section Component - Modernized
const SkillsSection = () => {
  const { theme } = useTheme();
  const headingColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';

  const skills = {
    languages: {
      title: 'Languages',
      items: ['Python', 'C++', 'JavaScript', 'Dart'],
      icon: Code,
    },
    frameworks: {
      title: 'Frameworks & Libraries',
      items: ['Flutter', 'React.js', 'Node.js', 'Express', 'Scikit-Learn', 'Pandas', 'Matplotlib'],
      icon: Server,
    },
    databases: {
      title: 'Databases',
      items: ['MongoDB', 'MySQL', 'Firebase Firestore', 'SQLite'],
      icon: Database,
    },
    tools: {
      title: 'Tools & Technologies',
      items: ['Firebase', 'AWS', 'Git', 'GitHub'],
      icon: Wrench, // Changed from Tool to Wrench
    },
  };

  return (
    <AnimatedSection id="skills" className="relative z-10">
      <h2 className={`text-4xl font-bold text-center mb-12 ${headingColor}`}>Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.values(skills).map((category, index) => (
          <SkillCategory
            key={index}
            title={category.title}
            items={category.items}
            Icon={category.icon}
          />
        ))}
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;
