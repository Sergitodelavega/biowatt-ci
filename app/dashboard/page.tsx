'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, MapPin, Flame, ShieldCheck, Plus, UserCheck, Calculator, GitMerge, FileText } from 'lucide-react';
import { Role, AccountStatus } from '@/lib/types/auth';

interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  status: AccountStatus;
  organizationName?: string | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        setUser(data.user);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const getRoleTitle = (role?: Role) => {
    switch (role) {
      case 'ADMIN_BIOWATT':
        return 'Tableau de Bord Administrateur BIOWATT-CI';
      case 'STATE':
        return 'Tableau de Bord National & Ministériel';
      case 'COLLECTIVITY':
        return 'Tableau de Bord Territorial & Collectivité';
      case 'FEEDSTOCK_OWNER':
        return 'Tableau de Bord Détenteur de Gisements';
      case 'BIOGAS_OPERATOR':
        return 'Tableau de Bord Valorisateur & Opérateur Biogaz';
      default:
        return 'Tableau de Bord Utilisateur';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" /> Espace Personnel & Décisionnel
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            {getRoleTitle(user?.role)}
          </h1>
          {user && (
            <p className="text-xs text-slate-400 mt-1">
              Bienvenue <span className="text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold">{user.firstName} {user.lastName}</span> ({user.organizationName || user.email})
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/feedstocks/new"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Nouveau Gisement
          </Link>
          <Link
            href="/units/new"
            className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Nouvelle Unité
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Gisements Référencés</span>
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">3</div>
          <div className="text-[11px] text-emerald-400 mt-1">Données qualifiées actives</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Unités de Biogaz</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">2</div>
          <div className="text-[11px] text-amber-400 mt-1">Besoins quotidiens: 60 t/jour</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Potentiel Mobilisable</span>
            <Calculator className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">22 280</div>
          <div className="text-[11px] text-sky-400 mt-1">tonnes fermentescibles / an</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Smart Matchings</span>
            <GitMerge className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">2</div>
          <div className="text-[11px] text-purple-400 mt-1">Compatibilités détectées</div>
        </div>

      </div>

      {/* Quick Navigation Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/feedstocks"
          className="glass-panel p-6 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-emerald-500/50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 text-lg group-hover:text-emerald-400 transition-colors">
            Gisements Organiques
          </h3>
          <p className="text-xs text-slate-400 mt-2">
            Consulter la carte des gisements, filtrer par secteur et déclarer vos nouveaux tonnages.
          </p>
        </Link>

        <Link
          href="/units"
          className="glass-panel p-6 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-amber-500/50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 text-lg group-hover:text-amber-400 transition-colors">
            Unités de Biogaz
          </h3>
          <p className="text-xs text-slate-400 mt-2">
            Explorer les unités de méthanisation et renseigner vos besoins quotidiens en substrats.
          </p>
        </Link>

        <Link
          href="/simulator"
          className="glass-panel p-6 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-sky-500/50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 text-lg group-hover:text-sky-400 transition-colors">
            Simulateur de Potentiel
          </h3>
          <p className="text-xs text-slate-400 mt-2">
            Calculer les scénarios théoriques, mobilisables et valorisables selon vos tonnages.
          </p>
        </Link>
      </div>

    </div>
  );
}
