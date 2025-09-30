
import React from 'react';

interface QuickTaskCardProps {
  task: string;
  onSelect: (task: string) => void;
}

const QuickTaskCard: React.FC<QuickTaskCardProps> = ({ task, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(task)}
      className="p-4 bg-brand-secondary rounded-lg text-center text-brand-text hover:bg-gray-700 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1"
    >
      <span className="text-sm font-medium">{task}</span>
    </button>
  );
};

export default QuickTaskCard;
