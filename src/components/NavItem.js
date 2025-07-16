// src/components/NavItem.js
import React from 'react';
import { useTheme } from '../ThemeContext'; // Import useTheme from parent directory

const NavItem = ({ id, label, active, onClick, className = '' }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`relative text-lg font-medium transition-all duration-300 ease-in-out
        ${active
          ? 'text-purple-400 dark:text-purple-300' // Active color for both themes
          : 'text-gray-300 hover:text-purple-300 dark:text-gray-400 dark:hover:text-purple-300'}
        ${className}`}
    >
      {label}
      {active && (
        <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-purple-400 dark:bg-purple-300 rounded-full animate-fade-in-up"></span>
      )}
    </button>
  );
};

export default NavItem;
