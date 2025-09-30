import React from 'react';
import type { GuideStep } from '../types';

interface GuideStepProps {
  step: GuideStep;
}

const GuideStep: React.FC<GuideStepProps> = ({ step }) => {
  return (
    <div className="bg-brand-secondary rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/2">
        {step.imageUrl ? (
          <img 
            src={step.imageUrl} 
            alt={step.title} 
            className="w-full h-64 object-cover" 
          />
        ) : (
          <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
            <span className="text-brand-text-muted">Gerando imagem...</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col justify-center md:w-1/2">
        <h4 className="text-2xl font-bold text-white">
          <span className="text-brand-accent">Passo {step.step}:</span> {step.title}
        </h4>
        <p className="mt-4 text-brand-text-muted text-base leading-relaxed">
          {step.instruction}
        </p>
      </div>
    </div>
  );
};

export default GuideStep;