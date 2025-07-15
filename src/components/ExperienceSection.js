// src/components/ExperienceSection.js
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { useTheme } from '../ThemeContext'; // Import useTheme from parent directory
import { Briefcase, Users } from 'lucide-react'; // Icons for experience type

// Experience Card Component - Modernized for Timeline
const ExperienceCard = ({ experience, isLast }) => {
  const { theme } = useTheme();
  const cardBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const cardBorder = theme === 'dark' ? 'border-gray-700 hover:border-purple-500' : 'border-gray-300 hover:border-purple-500';
  const titleColor = theme === 'dark' ? 'text-blue-300' : 'text-blue-700';
  const companyColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const descriptionColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const lineColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300';
  const iconBg = theme === 'dark' ? 'bg-purple-500' : 'bg-blue-500';

  const Icon = experience.title.includes('Intern') ? Briefcase : Users; // Simple logic for icon

  return (
    <div className="flex relative items-start md:items-center mb-8 last:mb-0">
      {/* Timeline Dot and Line */}
      <div className="flex flex-col items-center mr-4 md:mr-8">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${iconBg} text-white shadow-md`}>
          <Icon size={20} />
        </div>
        {!isLast && <div className={`w-0.5 flex-grow ${lineColor}`}></div>}
      </div>

      {/* Card Content */}
      <div className={`${cardBg} p-6 rounded-lg shadow-md border ${cardBorder} w-full transition-all duration-300 transform hover:scale-[1.01]`}>
        <h3 className={`text-2xl font-semibold ${titleColor}`}>{experience.title}</h3>
        <p className={`text-lg mt-1 ${companyColor}`}>{experience.company} | {experience.duration}</p>
        <ul className={`list-disc list-inside mt-4 space-y-2 ${descriptionColor}`}>
          {experience.description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Experience Section Component - Modernized
const ExperienceSection = () => {
  const { theme } = useTheme();
  const headingColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';

  const experiences = [
    {
      title: 'Flutter Developer Intern',
      company: 'Algosoft.co',
      duration: 'June 2025 - August 2025',
      description: [
        'Developed and maintained cross-platform mobile applications using Flutter.',
        'Designed and implemented responsive UIs for both chef and user-facing apps.',
        'Ensured smooth and intuitive user experiences across different devices.',
        'Integrated Firebase for real-time database, authentication, and cloud storage.',
        'Collaborated with the team to deliver a fully functional food ordering and management app ecosystem.',
      ],
    },
    {
      title: 'Core Team Member',
      company: 'Google Developer Group (GDG) - JIIT 128',
      duration: 'August 2023 - Present',
      description: [
        'Mentored 10 students, guiding them in technical and career development.',
        'Organized and participated in 100+ developer meetups and workshops.',
        'Worked on open-source and community-driven projects.',
      ],
    },
  ];

  return (
    <AnimatedSection id="experience" className="relative z-10">
      <h2 className={`text-4xl font-bold text-center mb-12 ${headingColor}`}>Work Experience</h2>
      <div className="flex flex-col items-center"> {/* Centering the timeline */}
        {/* Adjusted width classes for a slightly wider timeline */}
        <div className="relative w-full md:w-4/5 lg:w-3/4"> {/* Container for the timeline */}
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} isLast={index === experiences.length - 1} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ExperienceSection;
