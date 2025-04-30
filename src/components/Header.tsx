import React from 'react';
import { Moon, Sun, CheckSquare } from 'lucide-react';
import { useTodoContext } from '../context/TodoContext';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTodoContext();

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CheckSquare 
            size={32} 
            className="text-indigo-600 dark:text-indigo-400 mr-3"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">TodoFlow</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <Sun size={20} className="text-amber-500" />
          ) : (
            <Moon size={20} className="text-indigo-600" />
          )}
        </button>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Keep track of your tasks with ease
      </p>
    </header>
  );
};

export default Header;