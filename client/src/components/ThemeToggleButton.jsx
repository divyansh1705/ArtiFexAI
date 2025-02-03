// src/components/ThemeToggleButton.jsx
import React from 'react';
import { useTheme } from './themeToggle.jsx';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="font-inter font-medium bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-md"
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;
