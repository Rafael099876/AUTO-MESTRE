import React from 'react';
import type { Guide } from '../types';
import GuideStep from './GuideStep';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';
import { CogIcon } from './icons/CogIcon';

interface GuideDisplayProps {
  guide: Guide;
}

const GuideDisplay: React.FC<GuideDisplayProps> = ({ guide }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="text-center bg-lt-secondary dark:bg-brand-secondary p-6 rounded-xl shadow-lg">
        <p className="text-lt-accent dark:text-brand-accent font-semibold">{guide.vehicle}</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-lt-text dark:text-white mt-1">{guide.task}</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-lt-secondary dark:bg-brand-secondary p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-lt-text dark:text-white flex items-center mb-4">
            <WrenchScrewdriverIcon className="h-6 w-6 mr-3 text-lt-accent dark:text-brand-accent" />
            Ferramentas Necessárias
          </h3>
          <ul className="space-y-2 text-lt-text dark:text-brand-text">
            {guide.tools.map((tool, index) => (
              <li key={index} className="flex items-start">
                <span className="text-lt-accent dark:text-brand-accent mr-2">&#10003;</span>
                <span><strong>{tool.name}:</strong> {tool.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-lt-secondary dark:bg-brand-secondary p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-lt-text dark:text-white flex items-center mb-4">
            <CogIcon className="h-6 w-6 mr-3 text-lt-accent dark:text-brand-accent" />
            Peças e Especificações
          </h3>
          <ul className="space-y-2 text-lt-text dark:text-brand-text">
            {guide.parts.map((part, index) => (
              <li key={index} className="flex items-start">
                <span className="text-lt-accent dark:text-brand-accent mr-2">&#10003;</span>
                <span><strong>{part.name}:</strong> {part.specification}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-lt-text dark:text-white text-center mb-6">Instruções Passo a Passo</h3>
        <div className="space-y-6">
          {guide.steps.sort((a, b) => a.step - b.step).map((step) => (
            <GuideStep key={step.step} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideDisplay;