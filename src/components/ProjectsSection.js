// src/components/ProjectsSection.js
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { useTheme } from '../ThemeContext'; // Import useTheme from parent directory
import { ExternalLink } from 'lucide-react'; // Icon for external link

// Project Card Component
const ProjectCard = ({ project }) => {
  const { theme } = useTheme();
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const cardBorder = theme === 'dark' ? 'border-gray-700 hover:border-blue-500' : 'border-gray-300 hover:border-blue-500';
  const titleColor = theme === 'dark' ? 'text-blue-300' : 'text-blue-700';
  const descriptionColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const techBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  const techColor = theme === 'dark' ? 'text-purple-300' : 'text-purple-600';
  const linkColor = theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-500';

  return (
    <div className={`flex-shrink-0 w-80 ${cardBg} p-6 rounded-lg shadow-md border ${cardBorder} transition-all duration-300 transform`}>
      <h3 className={`text-2xl font-semibold mb-3 ${titleColor}`}>{project.title}</h3>
      <p className={`text-sm mb-4 ${descriptionColor}`}>{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech, index) => (
          <span key={index} className={`${techBg} ${techColor} text-xs px-3 py-1 rounded-full`}>
            {tech}
          </span>
        ))}
      </div>
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className={`font-medium flex items-center mb-2 transform  ${linkColor}`}>
          View Project
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      )}
    </div>
  );
};

// Projects Section Component - Updated with new project data
const ProjectsSection = () => {
  const { theme } = useTheme();
  const headingColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';

  const projects = [
    {
      title: 'MediReminder App',
      description: 'A smart medication reminder app designed to help users stay on track with their prescriptions. It allows users to add and manage medicines, get timely reminders, securely log in using Firebase Authentication, and store/sync data in real time using Cloud Firestore.',
      techStack: ['Flutter', 'Firebase Authentication', 'Cloud Firestore', 'Firebase Cloud Messaging', 'Local Notifications'],
      link: 'https://drive.google.com/file/d/15x7fX3YJcg6aFCGqOyGwsV_O9ty-MEBj/view', // Replace with actual link if available
    },
    {
      title: 'SmartRoamer',
      description: 'Developed SmartRoamer, a responsive AI-powered trip planning web application that generates personalized travel itineraries and displays real-time weather. I leveraged the Google Gemini API to process user inputs (destination and duration) and return structured JSON data for both the itinerary and weather.A key feature is the ability to export the final, formatted travel plan as a multi-page PDF using the jsPDF library, creating a seamless and portable user experience.',
      techStack: ['HTML', 'CSS', 'Javascript', 'Google Gemini API', 'jsPDF'],
      link: 'https://smartroamer.vercel.app', // Replace with actual link if available
    },
    {
      title: 'Healthcare Plus',
      description: 'Developed Health Care Plus, a platform aimed at bridging technical limitations and communication gaps in healthcare. Seamless doctor-patient interaction, real-time appointment booking, and medical resource tracking. The project was recognized at the Innovate Hackathon.',
      techStack: ['React', 'Node.js', 'MongoDB'],
      link: false, // Example link, replace with actual
    },
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio website built from scratch using pure React.js, showcasing skills, projects, and experience with modern UI/UX, responsive design, and interactive elements.',
      techStack: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML'],
      link: 'https://mrigankrai05.github.io/my-portfolio/', // This is the current website, link if deployed
    },
    {
      title: 'Thoughts App',
      description: 'A full-stack web application for creating, reading, updating, and deleting thoughts. Features user authentication with Passport.js for secure access and data management.',
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'HTML', 'CSS', 'Passport.js'],
      link: false, // Replace with actual link if available
    },
    {
      title: 'Stone Paper Scissor Game',
      description: 'A classic Stone Paper Scissor game developed using pure React.js, focusing on clean UI, interactive gameplay, and state management within a single-page application.',
      techStack: ['React.js', 'JavaScript', 'HTML', 'CSS'],
      link: 'https://stone-paper-scissor-navy.vercel.app', // Replace with actual link if available
    },
  ];

  return (
    <AnimatedSection id="projects" className="relative z-10">
      <h2 className={`text-4xl font-bold text-center mb-12 ${headingColor}`}>Projects</h2>
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

export default ProjectsSection;
