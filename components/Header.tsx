import React from 'react';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';

interface HeaderProps {
  onReset: () => void;
  showReset: boolean;
}

const Header: React.FC<HeaderProps> = ({ onReset, showReset }) => {
  return (
    <header className="bg-brand-secondary shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center max-w-4xl">
        <div className="flex items-center space-x-3">
          <WrenchScrewdriverIcon className="h-8 w-8 text-brand-accent" />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            AutoMestre
          </h1>
        </div>
        {showReset && (
          <button
            onClick={onReset}
            className="text-sm bg-brand-secondary border border-brand-accent text-brand-accent px-3 py-1 rounded-md hover:bg-brand-accent hover:text-brand-primary transition-colors duration-200"
          >
            Novo Guia
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;