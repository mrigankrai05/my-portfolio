import React, { useState, useEffect } from 'react'; // Removed useRef, useCallback as they are not directly used here

// --- Import ThemeProvider and useTheme from ThemeContext ---
import { ThemeProvider, useTheme } from './ThemeContext';

// --- Import all refactored components from the components directory ---
import GalaxyBackground from './components/GalaxyBackground';
import NavItem from './components/NavItem';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';

// --- Lucide React Icons for Theme Toggle ---
import { Sun, Moon } from 'lucide-react';

// --- AppContent Component: Contains the core logic and UI of the portfolio ---
// This component is wrapped by ThemeProvider in the default export of App.js
const AppContent = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Consume theme context to get current theme and toggle function
  const { theme, toggleTheme } = useTheme();

  // Function to smoothly scroll to a section.
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false); // Close mobile menu after clicking a link
    }
  };

  // Effect to determine the active section based on scroll position.
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentActive = 'home';
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          // Consider a section active if its middle is in the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = section.id;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to close mobile menu when screen resizes to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) { // 768px is Tailwind's 'md' breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Inject custom styles and Font Awesome into the document head once
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

      body {
        font-family: 'Inter', sans-serif;
        /* Ensure smooth background transition for theme change */
        transition: background-color 0.5s ease;
      }

      .font-inter {
        font-family: 'Inter', sans-serif;
      }

      /* Custom scrollbar for Webkit browsers */
      .scrollbar-thin::-webkit-scrollbar {
        height: 8px;
        width: 8px;
      }

      .scrollbar-thin::-webkit-scrollbar-track {
        background: #4a5568; /* gray-700 */
        border-radius: 10px;
      }

      .scrollbar-thin::-webkit-scrollbar-thumb {
        background-color: #a78bfa; /* purple-400 */
        border-radius: 10px;
        border: 2px solid #4a5568; /* gray-700 */
      }

      /* Animations are now primarily defined in tailwind.config.js */

      /* Button styles */
      .btn-primary {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        border-radius: 9999px;
        background-image: linear-gradient(to right, #8b5cf6, #3b82f6);
        color: white;
        font-weight: 600;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease-in-out;
      }
      .btn-primary:hover {
        background-image: linear-gradient(to right, #7c3aed, #2563eb);
        transform: scale(1.05);
      }

      .btn-secondary {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        border-radius: 9999px;
        background-color: #4a5568;
        color: #d1d5db;
        font-weight: 600;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease-in-out;
        border: 1px solid #4a5568;
      }
      .btn-secondary:hover {
        background-color: #4a5568;
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(styleElement);

    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    fontAwesomeLink.rel = "stylesheet";
    document.head.appendChild(fontAwesomeLink);

    return () => {
      document.head.removeChild(styleElement);
      document.head.removeChild(fontAwesomeLink);
    };
  }, []);

  // Determine overall background color based on theme
  const appBgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const appTextColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-1000';
  const navBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const navOpacity = theme === 'dark' ? 'bg-opacity-90' : 'bg-opacity-95';
  const footerBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const footerTextColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';


  return (
    <div className={`min-h-screen ${appBgColor} ${appTextColor} font-inter relative`}>
      {/* GLOBAL GALAXY BACKGROUND */}
      <div className="fixed inset-0 w-full h-full z-0">
        <GalaxyBackground />
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${navBg} ${navOpacity} shadow-lg py-4 px-6 md:px-12 flex justify-between items-center rounded-b-xl`}>
        <div className="text-2xl font-bold text-purple-400 dark:text-purple-300">MRIGANK RAI</div>
        <div className="hidden md:flex space-x-8">
          <NavItem id="home" label="Home" active={activeSection === 'home'} onClick={scrollToSection} />
          <NavItem id="about" label="About" active={activeSection === 'about'} onClick={scrollToSection} />
          <NavItem id="skills" label="Skills" active={activeSection === 'skills'} onClick={scrollToSection} />
          <NavItem id="experience" label="Experience" active={activeSection === 'experience'} onClick={scrollToSection} />
          <NavItem id="projects" label="Projects" active={activeSection === 'projects'} onClick={scrollToSection} />
          <NavItem id="education" label="Education" active={activeSection === 'education'} onClick={scrollToSection} />
          <NavItem id="contact" label="Contact" active={activeSection === 'contact'} onClick={scrollToSection} />
        </div>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-colors duration-300 focus:outline-none"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-100 dark:text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Content --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-95 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          {/* Close button */}
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-gray-100 dark:text-white text-4xl focus:outline-none">
            &times;
          </button>

          {/* Mobile Nav Items */}
          <NavItem id="home" label="Home" active={activeSection === 'home'} onClick={scrollToSection} className="text-3xl" />
          <NavItem id="about" label="About" active={activeSection === 'about'} onClick={scrollToSection} className="text-3xl" />
          <NavItem id="skills" label="Skills" active={activeSection === 'skills'} onClick={scrollToSection} className="text-3xl" />
          <NavItem id="experience" label="Experience" active={activeSection === 'experience'} onClick={scrollToSection} className="text-3xl" />
          <NavItem id="projects" label="Projects" active={activeSection === 'projects'} onClick={scrollToSection} className="text-3xl" />
          <NavItem id="education" label="Education" active={activeSection === 'education'} onClick={scrollToSection} className="text-3xl" />
          <NavItem id="contact" label="Contact" active={activeSection === 'contact'} onClick={scrollToSection} className="text-3xl" />
        </div>
      )}

      {/* Main Content Sections */}
      <main className={`pt-20 relative z-10 ${appTextColor}`}>
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className={`${footerBg} text-center py-6 mt-12 rounded-t-xl relative z-10 ${footerTextColor}`}>
        <p>&copy; {new Date().getFullYear()} Mrigank Rai. All rights reserved.</p>
      </footer>
    </div>
  );
};

// The actual App component that provides the ThemeContext to its children
const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
