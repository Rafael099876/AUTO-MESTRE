import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import type { Guide } from './types';
import { generateMaintenanceGuide } from './services/geminiService';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import GuideDisplay from './components/GuideDisplay';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [guide, setGuide] = useState<Guide | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) return storedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleGenerateGuide = useCallback(async (vehicle: string, task: string) => {
    if (!vehicle || !task) {
      setError("Por favor, especifique o veículo e a tarefa.");
      return;
    }
    setIsLoading(true);
    setGuide(null);
    setError(null);

    try {
      const generatedGuide = await generateMaintenanceGuide(vehicle, task);
      setGuide(generatedGuide);
    } catch (e) {
      console.error(e);
      setError("Desculpe, não consegui gerar o guia. A IA pode estar ocupada ou a solicitação foi inválida. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setGuide(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <div className="min-h-screen bg-lt-primary dark:bg-brand-primary text-lt-text dark:text-brand-text font-sans antialiased">
      <Header 
        onReset={handleReset} 
        showReset={!!guide || isLoading || !!error} 
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="container mx-auto p-4 md:p-6 max-w-4xl">
        {!guide && !isLoading && !error && (
          <SearchForm onGenerate={handleGenerateGuide} />
        )}
        {isLoading && <LoadingIndicator />}
        {error && !isLoading && <ErrorMessage message={error} onRetry={handleReset} />}
        {guide && !isLoading && <GuideDisplay guide={guide} />}
      </main>
    </div>
  );
};

export default App;