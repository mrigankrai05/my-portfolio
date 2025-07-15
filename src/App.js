import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Profile Image Import ---
import mrigankPhoto from './assets/mrigankphoto.jpg';

// --- Import the Galaxy Background Component ---
import GalaxyBackground from './components/GalaxyBackground';

// --- Navigation Item Component ---
const NavItem = ({ id, label, active, onClick, className = '' }) => (
  <button
    onClick={() => onClick(id)}
    className={`relative text-lg font-medium transition-all duration-300 ease-in-out
      ${active ? 'text-purple-400' : 'text-gray-300 hover:text-purple-300'}
      ${className}`}
  >
    {label}
    {active && (
      <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-purple-400 rounded-full animate-fade-in-up"></span>
    )}
  </button>
);

// --- Section Wrapper for fade-in animation ---
const AnimatedSection = ({ children, id, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };
      const observer = new IntersectionObserver(handleIntersection, observerOptions);
      observer.observe(currentElement);
      return () => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }
  }, [handleIntersection]);

  return (
    <section
      id={id}
      ref={sectionRef}
      // Increased opacity for darker, more visible backgrounds
      className={`py-20 px-8 rounded-xl shadow-lg mx-auto max-w-6xl mt-12 transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ backgroundColor: 'rgba(26, 32, 44, 0.9)' }} // Changed opacity from 0.7 to 0.9
    >
      {children}
    </section>
  );
};

// --- Typewriter Effect Component (FIXED) ---
const Typewriter = ({ text, delay, repeatDelay = 0 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!isTypingComplete && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1); // FIX: Corrected variable name here
      }, delay);
      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && repeatDelay > 0) {
      const resetTimeout = setTimeout(() => {
        setCurrentText('');
        setCurrentIndex(0);
        setIsTypingComplete(false);
      }, repeatDelay);
      return () => clearTimeout(resetTimeout);
    } else if (currentIndex === text.length && !isTypingComplete) {
      setIsTypingComplete(true);
    }
  }, [currentIndex, delay, text, repeatDelay, isTypingComplete]); // Added isTypingComplete to dependencies

  return <span>{currentText}</span>;
};

// --- Hero Section Component ---
const HeroSection = ({ scrollToSection }) => (
  <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
    {/* Overlay for text readability */}
    <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

    {/* Ensure your text content has a higher z-index */}
    <div className="z-20 p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-fade-in-down">
        <Typewriter text="Hello, I'm Mrigank Rai" delay={100} repeatDelay={3000} />
      </h1>
      <p className="mt-6 text-xl md:text-2xl text-gray-100 animate-fade-in-up">
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

// --- About Section Component ---
const AboutSection = () => (
  <AnimatedSection id="about" className="relative z-10">
    <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">About Me</h2>
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/3 flex justify-center">
        <img
            src={mrigankPhoto}
            alt="Mrigank Rai"
            className="rounded-full border-4 border-purple-500 shadow-xl w-48 h-48 object-cover object-[50%_40%] transform hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/250x250/6B46C1/FFFFFF?text=MR"; }}
        />
      </div>
      <div className="md:w-2/3 text-lg text-gray-300 leading-relaxed">
        <p className="mb-4">
          As a Computer Science and Engineering undergraduate, I build robust,
          user-centric applications leveraging expertise in data science, full-stack, and mobile development. Proficient in Flutter, React.js, and Node.js, I focus on delivering scalable solutions that significantly enhance user experiences. Beyond technical execution, I am driven to mentor peers and cultivate collaborative environments, aiming to solve real-world challenges and foster innovation across diverse development landscapes.
        </p>
      </div>
    </div>
  </AnimatedSection>
);

// --- Skills Section Component ---
const SkillsSection = () => {
  const skills = {
    languages: ['Python', 'C++', 'JavaScript', 'Dart'],
    frameworks: ['Flutter', 'React.js', 'Node.js', 'Express', 'Scikit-Learn', 'Pandas', 'Matplotlib'],
    databases: ['MongoDB', 'MySQL', 'Firebase Firestore', 'SQLite'],
    tools: ['Firebase', 'AWS', 'Git', 'GitHub'],
  };

  return (
    <AnimatedSection id="skills" className="relative z-10">
      <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <SkillCategory title="Languages" items={skills.languages} />
        <SkillCategory title="Frameworks & Libraries" items={skills.frameworks} />
        <SkillCategory title="Databases" items={skills.databases} />
        <SkillCategory title="Tools & Technologies" items={skills.tools} />
      </div>
    </AnimatedSection>
  );
};

// Skill Category Component
const SkillCategory = ({ title, items }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
    <h3 className="text-2xl font-semibold text-blue-300 mb-4">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2 text-purple-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// --- Experience Section Component ---
const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Flutter Developer Intern',
      company: 'Algosoft.co',
      duration: 'June 2025 - Present',
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
      <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">Work Experience</h2>
      <div className="space-y-10">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} />
        ))}
      </div>
    </AnimatedSection>
  );
};

// Experience Card Component
const ExperienceCard = ({ experience }) => (
  <div className="bg-gray-900 p-8 rounded-lg shadow-md border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-[1.02]">
    <h3 className="text-2xl font-semibold text-blue-300">{experience.title}</h3>
    <p className="text-lg text-gray-200 mt-1">{experience.company} | {experience.duration}</p>
    <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
      {experience.description.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
);

// --- Projects Section Component ---
const ProjectsSection = () => {
  const projects = [
    {
      title: 'Chat App',
      description: 'Developed a Flutter-based chat application with features such as user authentication, image uploading, real-time messaging, and push notifications.',
      techStack: ['Flutter', 'Dart', 'Firebase', 'SQLite', 'Firebase Authentication', 'Firebase Firestore'],
      link: 'https://github.com/mrigankrai05/ChatApp', // Example link, replace with actual
    },
    {
      title: 'Healthcare Plus',
      description: 'Developed Health Care Plus, a web platform aimed at bridging technical limitations and communication gaps in healthcare. Seamless doctor-patient interaction, real-time appointment booking, and medical resource tracking. The project was recognized at the Innovate Hackathon.',
      techStack: ['React', 'Node.js', 'MongoDB', 'AWS'],
      link: 'https://github.com/mrigankrai05/HealthcarePlus', // Example link, replace with actual
    },
    {
      title: 'Project Alpha',
      description: 'A brief description of Project Alpha, highlighting its key features and impact.',
      techStack: ['Python', 'Scikit-Learn', 'Pandas'],
      link: '#',
    },
    {
      title: 'Project Beta',
      description: 'An innovative solution built with modern web technologies, focusing on user experience.',
      techStack: ['React.js', 'Express', 'MongoDB'],
      link: '#',
    },
    {
      title: 'Project Gamma',
      description: 'A mobile application designed to simplify daily tasks, built with cross-platform capabilities.',
      techStack: ['Flutter', 'Dart', 'Firebase'],
      link: '#',
    },
  ];

  return (
    <AnimatedSection id="projects" className="relative z-10">
      <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">Projects</h2>
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-700">
        <div className="flex space-x-8 min-w-max">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <div className="flex-shrink-0 w-80 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:border-blue-500 transition-all duration-300">
      <h3 className="text-2xl font-semibold text-blue-300 mb-3">{project.title}</h3>
      <p className="text-gray-300 text-sm mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech, index) => (
          <span key={index} className="bg-gray-700 text-purple-300 text-xs px-3 py-1 rounded-full">
            {tech}
          </span>
        ))}
      </div>
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-medium flex items-center mb-2 transform hover:translate-x-1 transition-transform duration-200">
          View Project
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-4l5-5m0 0h-7m7 0v7"></path></svg>
        </a>
      )}
    </div>
  );
};

// --- Education Section Component ---
const EducationSection = () => {
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
      <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">Education</h2>
      <div className="space-y-8">
        {education.map((edu, index) => (
          <EducationCard key={index} education={edu} />
        ))}
      </div>
    </AnimatedSection>
  );
};

// Education Card Component
const EducationCard = ({ education }) => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-[1.02]">
    <h3 className="text-2xl font-semibold text-blue-300">{education.degree}</h3>
    <p className="text-lg text-gray-400 mt-1">{education.institution}</p>
    <p className="text-md text-gray-500 mt-1">{education.duration}</p>
  </div>
);

// --- Contact Section Component ---
const ContactSection = () => (
  <AnimatedSection id="contact" className="relative z-10">
    <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">Get In Touch</h2>
    <div className="flex flex-col md:flex-row justify-center items-center gap-10">
      <ContactInfo icon="fas fa-phone-alt" label="Phone" value="+918882747035" link="tel:+918882747035" />
      <ContactInfo icon="fas fa-envelope" label="Email" value="mrigankrai05@gmail.com" link="mailto:mrigankrai05@gmail.com" />
      <ContactInfo icon="fab fa-github" label="GitHub" value="github.com/mrigankrai05" link="https://github.com/mrigankrai05" />
      <ContactInfo icon="fab fa-linkedin" label="LinkedIn" value="linkedin.com/in/mrigank-rai-8b39a130a" link="https://linkedin.com/in/mrigank-rai-8b39a130a" />
    </div>
    <div className="mt-12 text-center text-gray-400">
      <p>Feel free to connect with me!</p>
    </div>
  </AnimatedSection>
);

// Contact Info Component
const ContactInfo = ({ icon, label, value, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300 w-full md:w-auto transform hover:-translate-y-1 hover:scale-105">
    <i className={`${icon} text-purple-400 text-3xl mb-4`}></i>
    <p className="text-lg font-semibold text-gray-200">{label}</p>
    <p className="text-sm text-gray-400 break-all text-center">{value}</p>
  </a>
);

// --- Main App Component ---
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to smoothly scroll to a section.
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
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
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
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

      /* Animations */
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .5; }
      }
      .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter relative">
      {/* GLOBAL GALAXY BACKGROUND */}
      <div className="fixed inset-0 w-full h-full z-0">
        <GalaxyBackground />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 shadow-lg py-4 px-6 md:px-12 flex justify-between items-center rounded-b-xl">
        <div className="text-2xl font-bold text-purple-400">MRIGANK RAI</div>
        <div className="hidden md:flex space-x-8">
          <NavItem id="home" label="Home" active={activeSection === 'home'} onClick={scrollToSection} />
          <NavItem id="about" label="About" active={activeSection === 'about'} onClick={scrollToSection} />
          <NavItem id="skills" label="Skills" active={activeSection === 'skills'} onClick={scrollToSection} />
          <NavItem id="experience" label="Experience" active={activeSection === 'experience'} onClick={scrollToSection} />
          <NavItem id="projects" label="Projects" active={activeSection === 'projects'} onClick={scrollToSection} />
          <NavItem id="education" label="Education" active={activeSection === 'education'} onClick={scrollToSection} />
          <NavItem id="contact" label="Contact" active={activeSection === 'contact'} onClick={scrollToSection} />
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-100 focus:outline-none">
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
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          {/* Close button */}
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-gray-100 text-4xl focus:outline-none">
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
      <main className="pt-20 relative z-10">
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-6 mt-12 rounded-t-xl relative z-10">
        <p>&copy; {new Date().getFullYear()} Mrigank Rai. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;