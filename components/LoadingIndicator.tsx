import React from 'react';
import { useState, useEffect } from 'react';

const messages = [
  "Consultando nosso mecânico especialista em IA...",
  "Reunindo as ferramentas certas para o trabalho...",
  "Analisando os esquemas do veículo...",
  "Gerando instruções passo a passo...",
  "Criando ilustrações personalizadas...",
  "Finalizando seu guia personalizado...",
];

const LoadingIndicator: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 py-16 animate-fade-in">
       <div className="relative flex justify-center items-center">
        <div className="absolute w-24 h-24 rounded-full animate-spin border-4 border-solid border-lt-accent dark:border-brand-accent border-t-transparent"></div>
        <svg className="w-16 h-16 text-lt-accent dark:text-brand-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.474-4.474c-.048-.58-.097-1.193-.14-1.743A4.5 4.5 0 0018 4.5c-5.908 0-10.695 4.787-10.695 10.695a4.5 4.5 0 003.354 4.332z" />
        </svg>
      </div>
      <p className="text-lg font-semibold text-lt-text dark:text-white mt-4">Montando Seu Guia</p>
      <p className="text-lt-text-muted dark:text-brand-text-muted transition-opacity duration-500">{messages[messageIndex]}</p>
    </div>
  );
};

export default LoadingIndicator;