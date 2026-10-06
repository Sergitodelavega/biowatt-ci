'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Plus, ArrowLeft, ShieldCheck, AlertCircle, Calculator } from 'lucide-react';

export default function NewFeedstockPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [sector, setSector] = useState('huilerie');
  const [substrateType, setSubstrateType] = useState('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [totalWasteVolume, setTotalWasteVolume] = useState<string>('1000');
  const [fermentableFraction, setFermentableFraction] = useState<string>('80');
  const [frequency, setFrequency] = useState('quotidien');
  const [regularity, setRegularity] = useState('constante');
  const [seasonality, setSeasonality] = useState('');
  const [sortingStatus, setSortingStatus] = useState('trié à la source');
  const [contaminationStatus, setContaminationStatus] = useState('faible');
  const [pretreatment, setPretreatment] = useState('');
  const [dataQualityStatus, setDataQualityStatus] = useState('DECLARE');
  const [sharingConsent, setSharingConsent] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-calculated fermentable volume
  const totalVol = parseFloat(totalWasteVolume) || 0;
  const fraction = parseFloat(fermentableFraction) || 0;
  const estimatedFermentable = Math.round(totalVol * (fraction / 100));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/feedstocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          sector,
          substrateType,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          totalWasteVolume: totalVol,
          fermentableFraction: fraction,
          frequency,
          regularity,
          seasonality: seasonality || null,
          sortingStatus,
          contaminationStatus,
          pretreatment: pretreatment || null,
          dataQualityStatus,
          sharingConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'enregistrement du gisement.');
      }

      router.push('/feedstocks');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      
      {/* Back button */}
      <Link
        href="/feedstocks"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à la carte des gisements
      </Link>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white">
        
        <div className="mb-6 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase mb-2">
            <Plus className="w-3.5 h-3.5" /> Déclaration Propriétaire
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Déclarer un Nouveau Gisement Organique
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Les coordonnées GPS exactes seront conservées en sécurité et masquées pour le grand public.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* General info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                Nom du Gisement / Usine *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Gisement Rafles Huilerie San-Pédro"
                className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl py-2.5 px-3.5 text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                Secteur d'Activité *
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl py-2.5 px-3.5 text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="huilerie">Huilerie de Palme</option>
                <option value="marché">Marché & Déchets Urbains</option>
                <option value="élevage">Élevage / Lisier & Fientes</option>
                <option value="abattoir">Abattoir Municipal / Privé</option>
                <option value="coopérative">Coopérative Cacao / Café</option>
                <option value="manioc">Transformation de Manioc</option>
                <option value="agro-industrie">Autre Agro-industrie</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
              Type Exact de Substrat Organique *
            </label>
            <input
              type="text"
              required
              value={substrateType}
              onChange={(e) => setSubstrateType(e.target.value)}
              placeholder="Ex: Rafles de palme & effluents POME"
              className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl py-2.5 px-3.5 text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Volume parameters */}
          <div className="p-4 rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 space-y-4">
            <div className="flex items-center gap-2 font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Quantités & Potentiel Fermentescible
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Tonnage Total (t/an) *</label>
                <input
                  type="number"
                  required
                  value={totalWasteVolume}
                  onChange={(e) => setTotalWasteVolume(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Fraction Fermentescible (%)</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  value={fermentableFraction}
                  onChange={(e) => setFermentableFraction(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-emerald-400 mb-1">Calculé Fermentescible</label>
                <div className="w-full bg-emerald-950/40 border border-emerald-500/30 rounded-xl py-2 px-3 text-emerald-300 font-extrabold text-sm">
                  {estimatedFermentable.toLocaleString()} t/an
                </div>
              </div>
            </div>
          </div>

          {/* Location GPS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Latitude GPS (ex: 4.7521)</label>
              <input
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="4.7521"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Longitude GPS (ex: -6.6342)</label>
              <input
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="-6.6342"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-slate-100"
              />
            </div>
          </div>

          {/* Consent & Quality Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Statut de Qualité de Donnée</label>
              <select
                value={dataQualityStatus}
                onChange={(e) => setDataQualityStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-slate-100"
              >
                <option value="DECLARE">DECLARE (Déclaration Exploitant)</option>
                <option value="DOCUMENTARY_VERIFIED">DOCUMENTARY_VERIFIED (Justificatif fourni)</option>
                <option value="DEMONSTRATION">DEMONSTRATION (Donnée fictive de test)</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
                <input
                  type="checkbox"
                  checked={sharingConsent}
                  onChange={(e) => setSharingConsent(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 bg-slate-950 border-slate-800 focus:ring-emerald-500"
                />
                Consentement de mise en relation Smart Matching
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {loading ? 'Enregistrement du gisement...' : 'Enregistrer le Gisement'}
          </button>
        </form>

      </div>
    </div>
  );
}
