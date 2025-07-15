// src/components/ContactSection.js
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { useTheme } from '../ThemeContext'; // Import useTheme from parent directory
import { Phone, Mail, Github, Linkedin } from 'lucide-react'; // Icons for contact info

// Contact Info Component
const ContactInfo = ({ icon: Icon, label, value, link }) => {
  const { theme } = useTheme();
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const cardHoverBg = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const iconColor = theme === 'dark' ? 'text-purple-400' : 'text-blue-600';
  const labelColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const valueColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center p-6 ${cardBg} rounded-lg shadow-md ${cardHoverBg} transition-colors duration-300 w-full md:w-auto transform hover:-translate-y-1 hover:scale-105`}>
      {Icon && <Icon className={`w-8 h-8 mb-4 ${iconColor}`} />}
      <p className={`text-lg font-semibold ${labelColor}`}>{label}</p>
      <p className={`text-sm break-all text-center ${valueColor}`}>{value}</p>
    </a>
  );
};

// Contact Section Component
const ContactSection = () => {
  const { theme } = useTheme();
  const headingColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <AnimatedSection id="contact" className="relative z-10">
      <h2 className={`text-4xl font-bold text-center mb-12 ${headingColor}`}>Get In Touch</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        <ContactInfo icon={Phone} label="Phone" value="+918882747035" link="tel:+918882747035" />
        <ContactInfo icon={Mail} label="Email" value="mrigankrai05@gmail.com" link="mailto:mrigankrai05@gmail.com" />
        <ContactInfo icon={Github} label="GitHub" value="github.com/mrigankrai05" link="https://github.com/mrigankrai05" />
        <ContactInfo icon={Linkedin} label="LinkedIn" value="linkedin.com/in/mrigank-rai-8b39a130a" link="https://linkedin.com/in/mrigank-rai-8b39a130a" />
      </div>
      <div className={`mt-12 text-center ${textColor}`}>
        <p>Feel free to connect with me!</p>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection;
