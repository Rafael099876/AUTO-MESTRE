import React from 'react';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onReset: () => void;
  showReset: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset, showReset, theme, onToggleTheme }) => {
  return (
    <header className="bg-lt-secondary dark:bg-brand-secondary shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center max-w-4xl">
        <div className="flex items-center space-x-3">
          <WrenchScrewdriverIcon className="h-8 w-8 text-lt-accent dark:text-brand-accent" />
          <h1 className="text-2xl font-bold text-lt-text dark:text-white tracking-tight">
            AutoMestre
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {showReset && (
            <button
              onClick={onReset}
              className="text-sm bg-lt-secondary dark:bg-brand-secondary border border-lt-accent dark:border-brand-accent text-lt-accent dark:text-brand-accent px-3 py-1 rounded-md hover:bg-lt-accent dark:hover:bg-brand-accent hover:text-white dark:hover:text-brand-primary transition-colors duration-200"
            >
              Novo Guia
            </button>
          )}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Header;