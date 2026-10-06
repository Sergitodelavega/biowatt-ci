import './globals.css';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BIOWATT-CI — Cartographie et Valorisation du Biogaz en Côte d'Ivoire",
  description: "Plateforme numérique nationale de cartographie, qualification et valorisation des gisements organiques et du potentiel biogaz en Côte d'Ivoire. Du déchet au watt, de la donnée à la décision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 flex flex-col min-h-screen selection:bg-emerald-500 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          
          {/* Footer */}
          <footer className="border-t border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-950 dark:bg-slate-950 light:bg-white text-slate-400 dark:text-slate-400 light:text-slate-600 text-xs py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
              <p className="font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                BIOWATT-CI — Plateforme Nationale de Valorisation des Gisements Organiques
              </p>
              <p className="text-slate-500 dark:text-slate-500 light:text-slate-600 max-w-2xl mx-auto">
                Slogan : « Du déchet au watt, de la donnée à la décision » — République de Côte d'Ivoire
              </p>
              <p className="text-slate-600 dark:text-slate-600 light:text-slate-400">
                © 2026 BIOWATT-CI. Propriété exclusive et réservée. Spec-First & Data Quality Enforced.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
