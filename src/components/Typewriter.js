// src/components/Typewriter.js
import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, delay, repeatDelay = 0 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!isTypingComplete && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1); // Corrected variable name
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
  }, [currentIndex, delay, text, repeatDelay, isTypingComplete]);

  return <span>{currentText}</span>;
};

export default Typewriter;
