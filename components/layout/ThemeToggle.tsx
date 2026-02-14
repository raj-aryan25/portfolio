'use client';

import { useTheme } from '@/lib/hooks/useTheme';
import { HiMoon, HiSun } from 'react-icons/hi';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark focus-visible:ring-offset-2 ${className}`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <HiSun
          className={`absolute inset-0 w-5 h-5 text-gray-900 dark:text-gray-100 transition-all duration-300 ${
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0'
          }`}
          aria-hidden="true"
        />
        {/* Moon Icon */}
        <HiMoon
          className={`absolute inset-0 w-5 h-5 text-gray-900 dark:text-gray-100 transition-all duration-300 ${
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}
