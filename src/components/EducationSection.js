// src/components/EducationSection.js
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { useTheme } from '../ThemeContext'; // Import useTheme from parent directory
import { GraduationCap, School } from 'lucide-react'; // Icons for education type

// Education Card Component - Modernized for Timeline
const EducationCard = ({ education, isLast }) => {
  const { theme } = useTheme();
  const cardBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const cardBorder = theme === 'dark' ? 'border-gray-700 hover:border-purple-500' : 'border-gray-300 hover:border-purple-500';
  const degreeColor = theme === 'dark' ? 'text-blue-300' : 'text-blue-700';
  const institutionColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const durationColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-500'; // Stays same
  const lineColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300';
  const iconBg = theme === 'dark' ? 'bg-purple-500' : 'bg-blue-500';

  const Icon = education.degree.includes('B.Tech') ? GraduationCap : School; // Simple logic for icon

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
        <h3 className={`text-2xl font-semibold ${degreeColor}`}>{education.degree}</h3>
        <p className={`text-lg mt-1 ${institutionColor}`}>{education.institution}</p>
        <p className={`text-md mt-1 ${durationColor}`}>{education.duration}</p>
      </div>
    </div>
  );
};

// Education Section Component - Modernized
const EducationSection = () => {
  const { theme } = useTheme();
  const headingColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';

  const education = [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Jaypee Institute of Information Technology, NOIDA',
      duration: 'July 2023 - Present',
    },
    {
      degree: 'Class 12th',
      institution: 'Father Agnel School, NOIDA',
      duration: '2023',
    },
    {
      degree: 'Class 10th',
      institution: 'Father Agnel School, NOIDA',
      duration: '2021',
    },
  ];

  return (
    <AnimatedSection id="education" className="relative z-10">
      <h2 className={`text-4xl font-bold text-center mb-12 ${headingColor}`}>Education</h2>
      <div className="flex flex-col items-center"> {/* Centering the timeline */}
        <div className="relative w-full md:w-3/4 lg:w-2/3"> {/* Container for the timeline */}
          {education.map((edu, index) => (
            <EducationCard key={index} education={edu} isLast={index === education.length - 1} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default EducationSection;
