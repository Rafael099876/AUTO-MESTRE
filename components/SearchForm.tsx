import React from 'react';
import { useState } from 'react';
import QuickTaskCard from './QuickTaskCard';
import { CarIcon } from './icons/CarIcon';
import { WrenchIcon } from './icons/WrenchIcon';

interface SearchFormProps {
  onGenerate: (vehicle: string, task: string) => void;
}

const quickTasks = [
  "Trocar um pneu furado",
  "Verificar o nível do óleo do motor",
  "Trocar o filtro de ar do motor",
  "Verificar o nível do líquido de arrefecimento",
  "Trocar as palhetas do limpador",
  "Fazer chupeta em uma bateria descarregada"
];

const SearchForm: React.FC<SearchFormProps> = ({ onGenerate }) => {
  const [vehicle, setVehicle] = useState('');
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(vehicle, task);
  };

  const handleQuickTaskSelect = (selectedTask: string) => {
    setTask(selectedTask);
    if (vehicle) {
        onGenerate(vehicle, selectedTask);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-lt-text dark:text-white sm:text-4xl">Seu Mecânico de Bolso</h2>
        <p className="mt-4 text-lg text-lt-text-muted dark:text-brand-text-muted">
          Informe seu veículo e o que você precisa fazer. Nós geraremos um guia passo a passo para você.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-lt-secondary dark:bg-brand-secondary p-6 rounded-xl shadow-2xl space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="vehicle" className="block text-sm font-medium text-lt-text-muted dark:text-brand-text-muted mb-2">
              Veículo (Ano, Marca, Modelo)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                 <CarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="vehicle"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="ex: 2021 Toyota Corolla"
                className="block w-full rounded-md border-0 bg-gray-100 dark:bg-white/5 py-2.5 pl-10 text-lt-text dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-lt-accent dark:focus:ring-brand-accent sm:text-sm sm:leading-6 transition"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="task" className="block text-sm font-medium text-lt-text-muted dark:text-brand-text-muted mb-2">
              Tarefa de Manutenção
            </label>
            <div className="relative">
               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                 <WrenchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="ex: Verificar óleo do motor"
                className="block w-full rounded-md border-0 bg-gray-100 dark:bg-white/5 py-2.5 pl-10 text-lt-text dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-lt-accent dark:focus:ring-brand-accent sm:text-sm sm:leading-6 transition"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:text-brand-primary bg-lt-accent dark:bg-brand-accent hover:bg-orange-700 dark:hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-lt-secondary dark:focus:ring-offset-brand-secondary focus:ring-lt-accent dark:focus:ring-brand-accent transition-transform duration-150 ease-in-out hover:scale-105"
        >
          Gerar Guia
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-center text-lt-text-muted dark:text-brand-text-muted mb-4">Ou escolha uma tarefa comum</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickTasks.map((t) => (
            <QuickTaskCard key={t} task={t} onSelect={handleQuickTaskSelect} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;