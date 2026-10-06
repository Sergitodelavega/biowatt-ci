'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Map, Flame, Calculator, GitMerge, LayoutDashboard, UserCheck, LogIn, Leaf } from 'lucide-react';
import { Role, AccountStatus } from '@/lib/types/auth';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  currentUser?: {
    firstName: string;
    lastName: string;
    role: Role;
    status: AccountStatus;
  } | null;
}

export function Navbar({ currentUser }: NavbarProps) {
  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'ADMIN_BIOWATT':
        return <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-xs font-semibold">ADMIN</span>;
      case 'STATE':
        return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-xs font-semibold">ÉTAT</span>;
      case 'COLLECTIVITY':
        return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded text-xs font-semibold">COLLECTIVITÉ</span>;
      case 'FEEDSTOCK_OWNER':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-xs font-semibold">DÉTENTEUR</span>;
      case 'BIOGAS_OPERATOR':
        return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-xs font-semibold">VALORISATEUR</span>;
      default:
        return <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs">VISITEUR</span>;
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-slate-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                BIOWATT<span className="text-emerald-400 font-extrabold">-CI</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 font-medium">Côte d'Ivoire</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            <Link href="/" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5">
              Accueil
            </Link>
            <Link href="/feedstocks" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5">
              <Map className="w-4 h-4 text-emerald-400" />
              Gisements
            </Link>
            <Link href="/units" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              Unités
            </Link>
            <Link href="/simulator" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-sky-400" />
              Simulateur
            </Link>
            <Link href="/matching" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5">
              <GitMerge className="w-4 h-4 text-indigo-400" />
              Smart Matching
            </Link>
            <Link href="/dashboard" className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5">
              <LayoutDashboard className="w-4 h-4 text-purple-400" />
              Tableau de bord
            </Link>
            
            {currentUser?.role === 'ADMIN_BIOWATT' && (
              <Link href="/admin" className="px-3 py-2 text-red-300 hover:text-white hover:bg-red-950/40 rounded-lg transition-colors flex items-center gap-1.5 border border-red-500/30">
                <Shield className="w-4 h-4 text-red-400" />
                Admin
              </Link>
            )}
          </nav>

          {/* User Auth & Theme Toggle Section */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />

            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-white dark:text-white">{currentUser.firstName} {currentUser.lastName}</div>
                  <div className="flex items-center justify-end space-x-1 mt-0.5">
                    {getRoleBadge(currentUser.role)}
                    {currentUser.status === 'PENDING' && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded text-[10px]">EN ATTENTE</span>
                    )}
                  </div>
                </div>
                <Link
                  href="/auth/profile"
                  className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 hover:border-emerald-500 transition-colors"
                  title="Mon Profil"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all shadow-md shadow-emerald-950/50 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
