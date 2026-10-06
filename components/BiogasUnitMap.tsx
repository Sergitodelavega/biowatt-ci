'use client';

import React, { useState } from 'react';
import { Flame, Layers, EyeOff, ShieldCheck } from 'lucide-react';

export interface UnitMapMarker {
  id: string;
  name: string;
  technology: string;
  operationalStatus: string;
  dailySubstrateNeed: number;
  dataQualityStatus: string;
  latitude: number | null;
  longitude: number | null;
}

interface BiogasUnitMapProps {
  markers: UnitMapMarker[];
  onSelectMarker?: (marker: UnitMapMarker) => void;
}

export function BiogasUnitMap({ markers, onSelectMarker }: BiogasUnitMapProps) {
  const [selected, setSelected] = useState<UnitMapMarker | null>(null);

  const projectCoords = (lat: number, lng: number) => {
    const minLat = 4.2;
    const maxLat = 10.8;
    const minLng = -8.7;
    const maxLng = -2.4;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const getQualityBadgeColor = (status: string) => {
    switch (status) {
      case 'MEASURED':
        return 'bg-emerald-500 text-white';
      case 'SITE_VERIFIED':
        return 'bg-teal-500 text-white';
      case 'DOCUMENTARY_VERIFIED':
        return 'bg-indigo-500 text-white';
      case 'DECLARE':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-slate-500 text-slate-100';
    }
  };

  return (
    <div className="relative w-full h-[500px] rounded-3xl glass-panel border border-slate-800 dark:border-slate-800 light:border-slate-200 overflow-hidden bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 shadow-2xl">
      
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-20 glass-panel px-3.5 py-2 rounded-xl border border-slate-700/50 text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 flex items-center gap-2">
        <Flame className="w-4 h-4 text-amber-400" />
        <span>Carte des Unités de Biogaz (Côte d'Ivoire)</span>
      </div>

      <div className="absolute top-4 right-4 z-20 glass-panel px-3 py-1.5 rounded-xl border border-slate-700/50 text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-700 flex items-center gap-2">
        <EyeOff className="w-3.5 h-3.5 text-amber-400" />
        <span>Contacts & Coordonnées masqués</span>
      </div>

      {/* SVG Background map outline */}
      <div className="w-full h-full relative p-8 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full opacity-30 dark:opacity-20 light:opacity-40 stroke-slate-500 fill-slate-800 dark:fill-slate-800 light:fill-slate-200"
        >
          <polygon points="15,20 40,15 85,25 90,60 75,90 20,85 10,50" strokeWidth="0.8" />
          <circle cx="70" cy="85" r="1.5" className="fill-emerald-400" />
          <circle cx="25" cy="88" r="1.5" className="fill-emerald-400" />
          <circle cx="50" cy="55" r="1.5" className="fill-amber-400" />
        </svg>

        {/* Dynamic Biogas Markers */}
        {markers.map((marker) => {
          const lat = marker.latitude ?? 6.8;
          const lng = marker.longitude ?? -5.3;
          const pos = projectCoords(lat, lng);

          return (
            <div
              key={marker.id}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
              onClick={() => {
                setSelected(marker);
                if (onSelectMarker) onSelectMarker(marker);
              }}
            >
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-amber-400 opacity-40"></span>
                <div className="w-8 h-8 rounded-full bg-amber-600 border-2 border-white dark:border-slate-900 text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                  <Flame className="w-4 h-4" />
                </div>
              </div>

              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-40 w-48 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white shadow-xl pointer-events-none">
                <div className="font-bold truncate">{marker.name}</div>
                <div className="text-[10px] text-slate-400">{marker.technology} • {marker.operationalStatus}</div>
                <div className="text-amber-400 font-semibold mt-1">Besoin: {marker.dailySubstrateNeed} t/jour</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Marker Details Footer */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 z-40 p-4 rounded-2xl bg-slate-900/95 dark:bg-slate-900/95 light:bg-white border border-slate-700 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getQualityBadgeColor(selected.dataQualityStatus)}`}>
                {selected.dataQualityStatus}
              </span>
              <h4 className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 text-sm">{selected.name}</h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Technologie : <span className="text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold">{selected.technology}</span> | Statut : <span className="text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold">{selected.operationalStatus}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-400">Besoin Quotidien</div>
              <div className="text-sm font-extrabold text-amber-400">{selected.dailySubstrateNeed} tonnes/jour</div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
