'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, MapPin, Flame, ShieldCheck, Plus, UserCheck, Calculator, GitMerge, FileCheck, CheckCircle2, AlertTriangle, Users, BarChart3, Clock, ArrowRight } from 'lucide-react';
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

  const getRoleBadge = (role?: Role) => {
    switch (role) {
      case 'ADMIN_BIOWATT':
        return <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full text-xs font-bold">ADMINISTRATION BIOWATT-CI</span>;
      case 'STATE':
        return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-full text-xs font-bold">GOUVERNEMENT / ÉTAT</span>;
      case 'COLLECTIVITY':
        return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded-full text-xs font-bold">COLLECTIVITÉ TERRITORIALE</span>;
      case 'FEEDSTOCK_OWNER':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-bold">DÉTENTEUR DE GISEMENT</span>;
      case 'BIOGAS_OPERATOR':
        return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-bold">VALORISATEUR / OPÉRATEUR</span>;
      default:
        return <span className="bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full text-xs font-bold">VISITEUR</span>;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        <Clock className="w-8 h-8 animate-spin mx-auto mb-2 text-emerald-400" />
        Chargement du tableau de bord...
      </div>
    );
  }

  const role = user?.role || 'PUBLIC_VISITOR';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="mb-2">{getRoleBadge(role)}</div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Tableau de Bord {user?.organizationName ? `— ${user.organizationName}` : ''}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {user ? `Connecté sous : ${user.firstName} ${user.lastName} (${user.email})` : 'Vue publique synthétique'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/feedstocks/new"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
          >
            <Plus className="w-4 h-4" /> Déclarer Gisement
          </Link>
          <Link
            href="/units/new"
            className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-amber-950/40"
          >
            <Plus className="w-4 h-4" /> Enregistrer Unité
          </Link>
        </div>
      </div>

      {/* RÔLE 1 : ADMIN_BIOWATT */}
      {role === 'ADMIN_BIOWATT' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <ShieldCheck className="w-5 h-5 text-red-400" />
              Mode Administrateur Système BIOWATT-CI — Contrôle & Validation
            </div>
            <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-[10px] font-bold">1 En attente</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                <span>Comptes en attente</span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-amber-400">1</div>
              <div className="text-[11px] text-slate-500 mt-1">Nouvelle demande institutionnelle</div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                <span>Gisements à vérifier</span>
                <FileCheck className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-extrabold text-sky-400">2</div>
              <div className="text-[11px] text-slate-500 mt-1">Demandes de passage en MEASURED</div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                <span>Unités enregistrées</span>
                <Flame className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-emerald-400">2</div>
              <div className="text-[11px] text-slate-500 mt-1">Capacité: 90 t/jour</div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                <span>Audit Logs (24h)</span>
                <BarChart3 className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-extrabold text-purple-400">14</div>
              <div className="text-[11px] text-slate-500 mt-1">Actions traçables enregistrées</div>
            </div>
          </div>
        </div>
      )}

      {/* RÔLE 2 : STATE (Ministère / Gouvernement) */}
      {role === 'STATE' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold mb-1">Potentiel Fermentescible National</div>
              <div className="text-3xl font-extrabold text-emerald-400">22 280 t/an</div>
              <div className="text-[11px] text-slate-500 mt-2">Réparti sur 3 bassins agro-industriels</div>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold mb-1">Production Biogaz Estimée</div>
              <div className="text-3xl font-extrabold text-amber-400">750 000 m³/an</div>
              <div className="text-[11px] text-slate-500 mt-2">Équivalent 3.2 GWh/an</div>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold mb-1">Qualité Globale des Données</div>
              <div className="text-3xl font-extrabold text-sky-400">67%</div>
              <div className="text-[11px] text-slate-500 mt-2">Données vérifiées ou mesurées</div>
            </div>
          </div>
        </div>
      )}

      {/* RÔLE 3 : FEEDSTOCK_OWNER (Détenteur de Gisement) */}
      {role === 'FEEDSTOCK_OWNER' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" /> Vos Gisements Déclarés
              </h2>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-semibold">1 Gisement Actif</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <div className="font-bold text-slate-100 text-sm">Gisement Rafles & Effluents Huilerie San-Pédro [DÉMO]</div>
                <div className="text-slate-400 mt-1">Secteur : Huilerie | Substrat : Rafles de palme & POME</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-slate-500">Tonnage Annuel</div>
                  <div className="font-extrabold text-emerald-400 text-sm">12 500 t/an</div>
                </div>
                <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[10px] font-bold">DEMONSTRATION</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RÔLE 4 : BIOGAS_OPERATOR (Valorisateur / Opérateur) */}
      {role === 'BIOGAS_OPERATOR' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" /> Votre Unité de Biogaz
              </h2>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full font-semibold">Opérationnelle</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <div className="font-bold text-slate-100 text-sm">Centrale Biogaz San-Pédro 1 [DÉMO]</div>
                <div className="text-slate-400 mt-1">Technologie : CSTR Continu | Substrats acceptés : Rafles de palme, POME, Déchets de marché</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-slate-500">Besoin Quotidien</div>
                  <div className="font-extrabold text-amber-400 text-sm">35 t/jour</div>
                </div>
                <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[10px] font-bold">DEMONSTRATION</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Common Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/feedstocks"
          className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-lg group-hover:text-emerald-400 transition-colors flex items-center justify-between">
            Gisements Organiques <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-400 mt-2">
            Consulter la carte des gisements, filtrer par secteur et déclarer vos nouveaux tonnages.
          </p>
        </Link>

        <Link
          href="/units"
          className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-lg group-hover:text-amber-400 transition-colors flex items-center justify-between">
            Unités de Biogaz <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-400 mt-2">
            Explorer les unités de méthanisation et renseigner vos besoins quotidiens en substrats.
          </p>
        </Link>

        <Link
          href="/simulator"
          className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-sky-500/50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-lg group-hover:text-sky-400 transition-colors flex items-center justify-between">
            Simulateur de Potentiel <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-400 mt-2">
            Calculer les scénarios théoriques, mobilisables et valorisables selon vos tonnages.
          </p>
        </Link>
      </div>

    </div>
  );
}
