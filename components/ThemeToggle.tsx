'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-400 dark:text-amber-300 border border-slate-700/50 transition-all flex items-center justify-center"
      title={theme === 'dark' ? 'Passer en mode Clair' : 'Passer en mode Sombre'}
      aria-label="Basculer le thème Light/Dark"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-400" />
      )}
    </button>
  );
}
