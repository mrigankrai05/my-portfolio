// src/components/HeroSection.js
import React from 'react';
import Typewriter from './Typewriter';
import { useTheme } from '../ThemeContext'; // Import useTheme from parent directory

const HeroSection = ({ scrollToSection }) => {
  const { theme } = useTheme(); // Consume theme context

  // Adjust text colors based on theme
  const gradientFrom = theme === 'dark' ? 'from-purple-400' : 'text-purple-700';
  const gradientTo = theme === 'dark' ? 'to-blue-400' : 'to-purple-600';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-1000';

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Overlay for text readability (darker in dark mode, can be lighter in light mode if needed) */}
      <div className="absolute inset-0 bg-black opacity-60 z-10 dark:bg-black dark:opacity-60"></div>

      {/* Ensure your text content has a higher z-index */}
      <div className="z-20 p-8 max-w-4xl mx-auto">
        <h1 className={`text-4xl md:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r ${gradientFrom} ${gradientTo} animate-fade-in-down`}>
          <Typewriter text="Hello, I'm Mrigank Rai" delay={100} repeatDelay={3000} />
        </h1>
        <p className={`mt-6 text-xl md:text-2xl ${textColor} animate-fade-in-up`}>
          As a Computer Science and Engineering undergraduate, I build robust solutions across data science, full-stack, and mobile app development, driven by a passion for creating impactful digital experiences.
        </p>
        <div className="mt-10 flex justify-center space-x-6 animate-fade-in-up animation-delay-500">
          <a href="https://github.com/mrigankrai05" target="_blank" rel="noopener noreferrer" className="btn-primary transform hover:scale-105 transition-transform duration-300">
            <i className="fab fa-github mr-2"></i> GitHub
          </a>
          <a href="https://linkedin.com/in/mrigank-rai-8b39a130a" target="_blank" rel="noopener noreferrer" className="btn-secondary transform hover:scale-105 transition-transform duration-300">
            <i className="fab fa-linkedin mr-2"></i> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
