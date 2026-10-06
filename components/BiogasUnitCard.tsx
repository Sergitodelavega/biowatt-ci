'use client';

import React from 'react';
import { Flame, ShieldCheck, MapPin, Mail, Phone, Lock, ArrowRight, Activity } from 'lucide-react';

export interface BiogasUnitItem {
  id: string;
  name: string;
  technology: string;
  commissioningYear?: number | null;
  operationalStatus: string;
  dailySubstrateNeed: number;
  capacity: number;
  acceptedSubstratesList: string[];
  declaredProduction?: number | null;
  productionReliability?: string | null;
  dataQualityStatus: string;
  latitude: number | null;
  longitude: number | null;
  operatorOrganizationName?: string;
  territory?: string;
  protectedContactEmail?: string;
  protectedContactPhone?: string;
  isPrivateView?: boolean;
}

export function BiogasUnitCard({ item }: { item: BiogasUnitItem }) {
  const getQualityBadge = (status: string) => {
    switch (status) {
      case 'MEASURED':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold">MEASURED</span>;
      case 'SITE_VERIFIED':
        return <span className="bg-teal-500/20 text-teal-400 border border-teal-500/30 px-2 py-0.5 rounded text-[10px] font-bold">SITE_VERIFIED</span>;
      case 'DOCUMENTARY_VERIFIED':
        return <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded text-[10px] font-bold">DOCUMENTARY_VERIFIED</span>;
      case 'DECLARE':
        return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] font-bold">DECLARE</span>;
      default:
        return <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">DEMONSTRATION</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'opérationnelle':
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Opérationnelle</span>;
      case 'en construction':
        return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-semibold">En Construction</span>;
      case 'planifiée':
        return <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded text-[10px] font-semibold">Planifiée</span>;
      default:
        return <span className="bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded text-[10px]">Arrêtée / Inactive</span>;
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-lg">
      
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="inline-block bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-amber-400 dark:text-amber-300 font-semibold text-[11px] px-2.5 py-0.5 rounded-full mb-1">
              {item.technology}
            </span>
            <h3 className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 text-base group-hover:text-amber-400 transition-colors line-clamp-1">
              {item.name}
            </h3>
          </div>
          {getQualityBadge(item.dataQualityStatus)}
        </div>

        <div className="flex items-center gap-2 mb-4">
          {getStatusBadge(item.operationalStatus)}
          {item.commissioningYear && (
            <span className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-600">
              (Mise en service: {item.commissioningYear})
            </span>
          )}
        </div>

        {/* Needs & Capacity */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 p-3 rounded-xl border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-xs mb-4">
          <div>
            <div className="text-[10px] text-amber-500 uppercase font-semibold">Besoin Journalier</div>
            <div className="font-extrabold text-amber-400">{item.dailySubstrateNeed} tonnes/jour</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Capacité Max</div>
            <div className="font-extrabold text-slate-200 dark:text-slate-200 light:text-slate-900">{item.capacity} t/jour</div>
          </div>
        </div>

        {/* Accepted Substrates List */}
        <div className="mb-4">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider mb-1.5">
            Substrates Acceptés :
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.acceptedSubstratesList.map((sub, i) => (
              <span
                key={i}
                className="bg-slate-900 dark:bg-slate-900 light:bg-slate-200 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 text-[11px] px-2 py-0.5 rounded-md"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Protected Contact Section */}
        <div className="p-2.5 rounded-xl bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50 border border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 text-[11px] space-y-1 mb-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{item.protectedContactEmail}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 text-xs">
        <div className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-[11px] flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{item.territory || 'Côte d\'Ivoire'}</span>
        </div>

        <span className="text-amber-400 hover:text-amber-300 font-semibold text-xs flex items-center gap-1">
          Consulter Unité
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

    </div>
  );
}
