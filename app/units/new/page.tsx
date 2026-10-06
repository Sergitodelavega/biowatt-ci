'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Flame, Plus, ArrowLeft, ShieldCheck, AlertCircle, Check } from 'lucide-react';

const COMMON_SUBSTRATES = [
  'rafles de palme',
  'effluents POME',
  'déchets de marché',
  'lisier & fientes de volailles',
  'déchets d\'abattoir',
  'pelures et résidus de manioc',
  'cabosses de cacao',
  'effluents d\'agro-industrie',
];

export default function NewUnitPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [technology, setTechnology] = useState('CSTR Continu (Digesteur Industriel)');
  const [commissioningYear, setCommissioningYear] = useState<string>('2024');
  const [operationalStatus, setOperationalStatus] = useState('opérationnelle');
  const [dailySubstrateNeed, setDailySubstrateNeed] = useState<string>('30');
  const [capacity, setCapacity] = useState<string>('50');
  const [selectedSubstrates, setSelectedSubstrates] = useState<string[]>(['rafles de palme', 'effluents POME']);
  const [declaredProduction, setDeclaredProduction] = useState<string>('400000');
  const [productionReliability, setProductionReliability] = useState('Déclaration Exploitant');
  const [dataQualityStatus, setDataQualityStatus] = useState('DECLARE');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [protectedContactEmail, setProtectedContactEmail] = useState('');
  const [protectedContactPhone, setProtectedContactPhone] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleSubstrate = (sub: string) => {
    if (selectedSubstrates.includes(sub)) {
      setSelectedSubstrates(selectedSubstrates.filter((s) => s !== sub));
    } else {
      setSelectedSubstrates([...selectedSubstrates, sub]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (selectedSubstrates.length === 0) {
      setError('Veuillez sélectionner au moins un substrat accepté par l\'unité.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/units', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          technology,
          commissioningYear: commissioningYear ? parseInt(commissioningYear) : null,
          operationalStatus,
          dailySubstrateNeed: parseFloat(dailySubstrateNeed) || 0,
          capacity: parseFloat(capacity) || 0,
          acceptedSubstrates: selectedSubstrates,
          declaredProduction: declaredProduction ? parseFloat(declaredProduction) : null,
          productionReliability,
          dataQualityStatus,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          protectedContactEmail: protectedContactEmail || null,
          protectedContactPhone: protectedContactPhone || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'enregistrement de l\'unité.');
      }

      router.push('/units');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      
      <Link
        href="/units"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au référentiel des unités de biogaz
      </Link>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white">
        
        <div className="mb-6 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase mb-2">
            <Plus className="w-3.5 h-3.5" /> Référencement Valorisateur / Exploitant
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Enregistrer une Unité de Biogaz
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Renseignez la technologie et les besoins quotidiens en substrats pour activer le Smart Matching.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                Nom de la Centrale / Unité de Biogaz *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Centrale Biogaz San-Pédro 1"
                className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl py-2.5 px-3.5 text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5">
                Technologie de Méthanisation *
              </label>
              <select
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl py-2.5 px-3.5 text-slate-100 dark:text-slate-100 light:text-slate-900 focus:outline-none focus:border-amber-500"
              >
                <option value="CSTR Continu (Digesteur Industriel)">CSTR Continu (Digesteur Industriel)</option>
                <option value="Plug Flow (Piston)">Plug Flow (Méthaniseur à piston)</option>
                <option value="Lagune couverte avec géomembrane">Lagune couverte avec géomembrane</option>
                <option value="Digesteur Voûte Chinoise / Dôme">Dôme fixe / Voûte</option>
                <option value="Autre technologie">Autre technologie</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Mise en Service (Année)</label>
              <input
                type="number"
                value={commissioningYear}
                onChange={(e) => setCommissioningYear(e.target.value)}
                placeholder="2024"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Statut Opérationnel *</label>
              <select
                value={operationalStatus}
                onChange={(e) => setOperationalStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-slate-100"
              >
                <option value="opérationnelle">Opérationnelle</option>
                <option value="en construction">En Construction</option>
                <option value="planifiée">Planifiée</option>
                <option value="arrêtée">Arrêtée / Inactive</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-amber-400 mb-1.5">Besoin Journalier (t/jour) *</label>
              <input
                type="number"
                required
                min="1"
                value={dailySubstrateNeed}
                onChange={(e) => setDailySubstrateNeed(e.target.value)}
                className="w-full bg-slate-950 border border-amber-500/50 rounded-xl py-2.5 px-3.5 text-amber-300 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-2">
              Substrats Organiques Acceptés * (Sélectionnez les matières compatibles)
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_SUBSTRATES.map((sub) => {
                const isSelected = selectedSubstrates.includes(sub);
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => toggleSubstrate(sub)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Capacité Max (t/jour) *</label>
              <input
                type="number"
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Production Déclarée (m³/an)</label>
              <input
                type="number"
                value={declaredProduction}
                onChange={(e) => setDeclaredProduction(e.target.value)}
                placeholder="400000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-slate-100"
              />
            </div>
          </div>

          {/* Protected Contact Section */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="font-bold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Contacts Confidentiels de l'Exploitant (Protégés)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Email Privé Exploitant</label>
                <input
                  type="email"
                  value={protectedContactEmail}
                  onChange={(e) => setProtectedContactEmail(e.target.value)}
                  placeholder="directeur@biogaz.ci"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Téléphone Privé Exploitant</label>
                <input
                  type="text"
                  value={protectedContactPhone}
                  onChange={(e) => setProtectedContactPhone(e.target.value)}
                  placeholder="+225 07 00 00 00 00"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-slate-100"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {loading ? 'Enregistrement de l\'unité...' : 'Enregistrer l\'Unité de Biogaz'}
          </button>
        </form>

      </div>
    </div>
  );
}
