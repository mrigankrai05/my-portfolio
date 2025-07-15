// src/components/AboutSection.js
import React from 'react';
import AnimatedSection from './AnimatedSection';
import mrigankPhoto from '../assets/mrigankphoto.jpg'; // Moved import here
import { useTheme } from '../ThemeContext';

const AboutSection = () => {
  const { theme } = useTheme();

  const headingColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const borderColor = theme === 'dark' ? 'border-purple-500' : 'border-blue-500';

  return (
    <AnimatedSection id="about" className="relative z-10">
      <h2 className={`text-4xl font-bold text-center mb-12 ${headingColor}`}>About Me</h2>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/3 flex justify-center">
          <img
              src={mrigankPhoto}
              alt="Mrigank Rai"
              className={`rounded-full border-4 ${borderColor} shadow-xl w-48 h-48 object-cover object-[50%_40%] transform hover:scale-105 transition-transform duration-300`}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/250x250/6B46C1/FFFFFF?text=MR"; }}
          />
        </div>
        <div className={`md:w-2/3 text-lg leading-relaxed ${textColor}`}>
          <p className="mb-4">
            As a Computer Science and Engineering undergraduate, I build robust,
            user-centric applications leveraging expertise in data science, full-stack, and mobile development. Proficient in Flutter, React.js, and Node.js, I focus on delivering scalable solutions that significantly enhance user experiences. Beyond technical execution, I am driven to mentor peers and cultivate collaborative environments, aiming to solve real-world challenges and foster innovation across diverse development landscapes.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
