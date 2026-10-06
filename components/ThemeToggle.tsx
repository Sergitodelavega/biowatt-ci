"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-md border bg-[var(--surface)] text-[var(--accent)] transition-colors hover:bg-[var(--surface-muted)]"
      title={
        theme === "dark" ? "Passer en mode Clair" : "Passer en mode Sombre"
      }
      aria-label={
        theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"
      }
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
