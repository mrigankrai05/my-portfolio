// src/components/AnimatedSection.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../ThemeContext'; // Import useTheme from parent directory

const AnimatedSection = ({ children, id, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { theme } = useTheme(); // Consume theme context

  const handleIntersection = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const currentElement = sectionRef.current;
    if (currentElement) {
      const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      };

      const observer = new IntersectionObserver(handleIntersection, observerOptions);

      observer.observe(currentElement);

      // Cleanup function to unobserve when component unmounts or effect re-runs
      return () => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }
  }, [handleIntersection]);

  // Dynamic background color based on theme for sections (darker in dark mode, lighter in light mode)
  const backgroundColor = theme === 'dark' ? 'rgba(26, 32, 44, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  // Default text color for content within sections
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-20 px-8 rounded-xl shadow-lg mx-auto max-w-6xl mt-12 transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className} ${textColor}`}
      style={{ backgroundColor: backgroundColor }}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
