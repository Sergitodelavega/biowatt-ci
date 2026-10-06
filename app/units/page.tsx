'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Plus, Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';
import { BiogasUnitMap } from '@/components/BiogasUnitMap';
import { BiogasUnitCard, BiogasUnitItem } from '@/components/BiogasUnitCard';

export default function UnitsPage() {
  const [units, setUnits] = useState<BiogasUnitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [technology, setTechnology] = useState('all');

  const fetchUnits = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.set('search', search);
      if (status !== 'all') queryParams.set('status', status);
      if (technology !== 'all') queryParams.set('technology', technology);

      const res = await fetch(`/api/units?${queryParams.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Impossible de charger les unités de biogaz.');
      }

      setUnits(data.units || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, [status, technology]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUnits();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5" /> Référentiel des Unités & Besoins en Substrats
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Unités de Biogaz en Côte d'Ivoire
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Centrales de valorisation énergétiques opérationnelles, en construction et projets de méthanisation.
          </p>
        </div>

        <Link
          href="/units/new"
          className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-950/50 flex items-center gap-2 text-sm self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Enregistrer une Unité
        </Link>
      </div>

      {/* Interactive Map */}
      <BiogasUnitMap markers={units} />

      {/* Filters Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, technologie, substrat..."
            className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <Filter className="w-3.5 h-3.5 text-amber-400" /> Statut :
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
          >
            <option value="all">Tous les Statuts</option>
            <option value="opérationnelle">Opérationnelle</option>
            <option value="en construction">En Construction</option>
            <option value="planifiée">Planifiée</option>
            <option value="arrêtée">Arrêtée / Inactive</option>
          </select>

          <button
            onClick={fetchUnits}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
            title="Rafraîchir"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Results Section */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
          Chargement des unités de biogaz...
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      ) : units.length === 0 ? (
        <div className="py-16 glass-panel rounded-3xl border border-slate-800 text-center text-slate-400 text-sm">
          Aucune unité de biogaz ne correspond aux filtres recherchés.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((item) => (
            <BiogasUnitCard key={item.id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
}
