'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Search, Filter, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';
import { FeedstockMap } from '@/components/FeedstockMap';
import { FeedstockCard, FeedstockItem } from '@/components/FeedstockCard';

export default function FeedstocksPage() {
  const [feedstocks, setFeedstocks] = useState<FeedstockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('all');
  const [quality, setQuality] = useState('all');

  const fetchFeedstocks = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.set('search', search);
      if (sector !== 'all') queryParams.set('sector', sector);
      if (quality !== 'all') queryParams.set('quality', quality);

      const res = await fetch(`/api/feedstocks?${queryParams.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Impossible de charger les gisements.');
      }

      setFeedstocks(data.feedstocks || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedstocks();
  }, [sector, quality]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFeedstocks();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" /> Cartographie & Qualification des Gisements
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Gisements Organiques en Côte d'Ivoire
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Recherche qualifiée et pré-localisation sécurisée des sous-produits organiques.
          </p>
        </div>

        <Link
          href="/feedstocks/new"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 text-sm self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Déclarer un Gisement
        </Link>
      </div>

      {/* Interactive Map */}
      <FeedstockMap markers={feedstocks} />

      {/* Filters & Search Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par substrat, secteur..."
            className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </form>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <Filter className="w-3.5 h-3.5 text-emerald-400" /> Secteur :
          </div>

          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Tous les Secteurs</option>
            <option value="huilerie">Huileries de palme</option>
            <option value="marché">Marchés & Urbain</option>
            <option value="élevage">Élevage / Lisier</option>
            <option value="abattoir">Abattoirs</option>
            <option value="coopérative">Coopératives de Cacao / Café</option>
            <option value="manioc">Transformation de Manioc</option>
            <option value="agro-industrie">Autres Agro-industries</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            Qualité :
          </div>

          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Tous les Statuts</option>
            <option value="MEASURED">MEASURED (Mesuré)</option>
            <option value="SITE_VERIFIED">SITE_VERIFIED (Vérifié Site)</option>
            <option value="DOCUMENTARY_VERIFIED">DOCUMENTARY_VERIFIED</option>
            <option value="DECLARE">DECLARE (Déclaré)</option>
            <option value="DEMONSTRATION">DEMONSTRATION (Démo)</option>
          </select>

          <button
            onClick={fetchFeedstocks}
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
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-400" />
          Chargement des gisements qualifiés...
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      ) : feedstocks.length === 0 ? (
        <div className="py-16 glass-panel rounded-3xl border border-slate-800 text-center text-slate-400 text-sm">
          Aucun gisement ne correspond aux critères de recherche sélectionnés.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedstocks.map((item) => (
            <FeedstockCard key={item.id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
}
