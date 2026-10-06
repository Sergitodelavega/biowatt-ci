import React from 'react';
import Link from 'next/link';
import { MapPin, Flame, Calculator, GitMerge, ShieldCheck, ArrowRight, Layers, FileCheck, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4" />
            Plateforme Nationale Gouvernementale & Territoriale
          </div>

          {/* Slogan & Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Du déchet au watt, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">
              de la donnée à la décision
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            BIOWATT-CI qualifie et valorise les gisements organiques et le potentiel biogaz de la Côte d'Ivoire. 
            Une infrastructure spec-first au service des collectivités, ministères, détenteurs de matière et valorisateurs.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/feedstocks"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Explorer la Carte des Gisements
            </Link>
            <Link
              href="/simulator"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Calculator className="w-5 h-5 text-sky-400" />
              Simulateur de Potentiel
            </Link>
          </div>
        </div>
      </section>

      {/* Value Chain Section: Gisements → Potentiel → Unités → Matching → Décision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Ch chaîne de Valorisation Stratégique</h2>
          <p className="text-slate-400 text-sm mt-2">Le parcours méthodologique unifié de BIOWATT-CI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          
          {/* Step 1 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative hover:border-emerald-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-3">
              1
            </div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" /> Gisements
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Recensement et géolocalisation qualifiée des sous-produits agricoles, industriels et urbains.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative hover:border-sky-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg mb-3">
              2
            </div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Calculator className="w-4 h-4 text-sky-400" /> Potentiel
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Calcul différencié du potentiel théorique, mobilisable et valorisable selon les filières.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative hover:border-amber-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-3">
              3
            </div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" /> Unités
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Référencement des unités de biogaz existantes, en projet et de leurs besoins quotidiens.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative hover:border-indigo-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg mb-3">
              4
            </div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <GitMerge className="w-4 h-4 text-indigo-400" /> Matching
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Mise en relation indicative basée sur la proximité, les substrats et la régularité.
            </p>
          </div>

          {/* Step 5 */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 relative hover:border-purple-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg mb-3">
              5
            </div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Décision
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Tableaux de bord nationaux et territoriaux pour orienter les investissements durables.
            </p>
          </div>

        </div>
      </section>

      {/* Data Quality Standard Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 bg-slate-900/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                <FileCheck className="w-4 h-4" /> Norme de Qualité des Données Enforced
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Traçabilité & Niveaux de Vérification
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Règle absolue BIOWATT-CI : Une donnée de démonstration ou une simple déclaration ne peut jamais être présentée comme une mesure réelle instrumentée.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-slate-500 shrink-0"></span>
                <div>
                  <div className="font-bold text-slate-200">DEMONSTRATION</div>
                  <div className="text-slate-500 text-[11px]">Donnée fictive de démonstration</div>
                </div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0"></span>
                <div>
                  <div className="font-bold text-slate-200">DECLARE</div>
                  <div className="text-slate-500 text-[11px]">Déclaré par l'exploitant</div>
                </div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-indigo-500 shrink-0"></span>
                <div>
                  <div className="font-bold text-slate-200">DOCUMENTARY_VERIFIED</div>
                  <div className="text-slate-500 text-[11px]">Vérification documentaire</div>
                </div>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
                <div>
                  <div className="font-bold text-emerald-400">MEASURED</div>
                  <div className="text-slate-500 text-[11px]">Mesuré sur site instrumenté</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
