import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === 'light' ? '🌞 Light Mode' : '🌜 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
