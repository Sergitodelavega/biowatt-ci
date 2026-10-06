import "./globals.css";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BIOWATT-CI — Cartographie et Valorisation du Biogaz en Côte d'Ivoire",
  description:
    "Plateforme numérique nationale de cartographie, qualification et valorisation des gisements organiques et du potentiel biogaz en Côte d'Ivoire. Du déchet au watt, de la donnée à la décision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col selection:bg-emerald-700 selection:text-white">
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Aller au contenu principal
          </a>
          <Navbar />
          <main id="main-content" className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <footer className="site-footer mt-12 py-8 text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
              <p className="font-semibold text-[var(--foreground)]">
                BIOWATT-CI — Plateforme Nationale de Valorisation des Gisements
                Organiques
              </p>
              <p className="mx-auto max-w-2xl">
                Slogan : « Du déchet au watt, de la donnée à la décision » —
                République de Côte d'Ivoire
              </p>
              <p>
                © 2026 BIOWATT-CI. Propriété exclusive et réservée. Spec-First &
                Data Quality Enforced.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
