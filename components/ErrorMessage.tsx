import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-5 rounded-lg text-center animate-fade-in space-y-4">
      <h3 className="text-xl font-bold">Opa! Algo deu errado.</h3>
      <p>{message}</p>
      <button
        onClick={onRetry}
        className="bg-brand-accent text-brand-primary font-bold py-2 px-6 rounded-md hover:bg-yellow-400 transition-colors"
      >
        Tentar Novamente
      </button>
    </div>
  );
};

export default ErrorMessage;