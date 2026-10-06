'use client';

import React from 'react';
import { MapPin, ShieldCheck, FileCheck, Layers, ArrowRight, EyeOff } from 'lucide-react';
import Link from 'next/link';

export interface FeedstockItem {
  id: string;
  name: string;
  sector: string;
  substrateType: string;
  latitude: number | null;
  longitude: number | null;
  totalWasteVolume: number;
  fermentableFraction: number;
  estimatedFermentableVolume: number;
  frequency: string;
  regularity: string;
  sortingStatus: string;
  contaminationStatus: string;
  dataQualityStatus: string;
  ownerOrganizationName?: string;
  territory?: string;
  isPrivateView?: boolean;
}

export function FeedstockCard({ item }: { item: FeedstockItem }) {
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

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg">
      
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="inline-block bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize mb-1">
              {item.sector}
            </span>
            <h3 className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 text-base group-hover:text-emerald-400 transition-colors line-clamp-1">
              {item.name}
            </h3>
          </div>
          {getQualityBadge(item.dataQualityStatus)}
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mb-4 line-clamp-2">
          Substrat : <span className="font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">{item.substrateType}</span>
        </p>

        {/* Volume & Details Grid */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 p-3 rounded-xl border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-xs mb-4">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Tonnage Total</div>
            <div className="font-extrabold text-slate-200 dark:text-slate-200 light:text-slate-900">{item.totalWasteVolume.toLocaleString()} t/an</div>
          </div>
          <div>
            <div className="text-[10px] text-emerald-500 uppercase font-semibold">Fermentescible</div>
            <div className="font-extrabold text-emerald-400">{item.estimatedFermentableVolume.toLocaleString()} t/an</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Fréquence</div>
            <div className="font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 capitalize">{item.frequency}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Tri</div>
            <div className="font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 capitalize">{item.sortingStatus}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 text-xs">
        <div className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-[11px] flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>{item.territory || 'Côte d\'Ivoire'}</span>
        </div>

        <span className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs flex items-center gap-1">
          Consulter
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

    </div>
  );
}
