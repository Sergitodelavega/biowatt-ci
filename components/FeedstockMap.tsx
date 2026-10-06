'use client';

import React, { useState } from 'react';
import { MapPin, Info, Layers, EyeOff, ShieldCheck } from 'lucide-react';

export interface MapMarker {
  id: string;
  name: string;
  sector: string;
  substrateType: string;
  totalWasteVolume: number;
  dataQualityStatus: string;
  latitude: number | null;
  longitude: number | null;
  isPrivateView?: boolean;
}

interface FeedstockMapProps {
  markers: MapMarker[];
  onSelectMarker?: (marker: MapMarker) => void;
}

export function FeedstockMap({ markers, onSelectMarker }: FeedstockMapProps) {
  const [selected, setSelected] = useState<MapMarker | null>(null);

  // Bounds for Côte d'Ivoire: Lat [4.3, 10.8], Lng [-8.6, -2.5]
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
    <div className="relative w-full h-[520px] rounded-3xl glass-panel border border-slate-800 dark:border-slate-800 light:border-slate-200 overflow-hidden bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 shadow-2xl">
      
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-20 glass-panel px-3.5 py-2 rounded-xl border border-slate-700/50 text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 flex items-center gap-2">
        <Layers className="w-4 h-4 text-emerald-400" />
        <span>Carte des Gisements Organiques (Côte d'Ivoire)</span>
      </div>

      <div className="absolute top-4 right-4 z-20 glass-panel px-3 py-1.5 rounded-xl border border-slate-700/50 text-[11px] text-slate-300 dark:text-slate-300 light:text-slate-700 flex items-center gap-2">
        <EyeOff className="w-3.5 h-3.5 text-amber-400" />
        <span>Coordonnées masquées / floues pour le public</span>
      </div>

      {/* SVG Background map outline representing Côte d'Ivoire */}
      <div className="w-full h-full relative p-8 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full opacity-30 dark:opacity-20 light:opacity-40 stroke-slate-500 fill-slate-800 dark:fill-slate-800 light:fill-slate-200"
        >
          {/* Stylized shape of Côte d'Ivoire */}
          <polygon points="15,20 40,15 85,25 90,60 75,90 20,85 10,50" strokeWidth="0.8" />
          
          {/* Key cities indicators */}
          <circle cx="70" cy="85" r="1.5" className="fill-emerald-400" /> {/* Abidjan */}
          <text x="73" y="87" className="text-[3px] fill-slate-400 font-bold">Abidjan</text>
          
          <circle cx="25" cy="88" r="1.5" className="fill-emerald-400" /> {/* San-Pédro */}
          <text x="28" y="90" className="text-[3px] fill-slate-400 font-bold">San-Pédro</text>

          <circle cx="50" cy="55" r="1.5" className="fill-amber-400" /> {/* Yamoussoukro */}
          <text x="53" y="57" className="text-[3px] fill-slate-400 font-bold">Yamoussoukro</text>

          <circle cx="52" cy="40" r="1.5" className="fill-sky-400" /> {/* Bouaké */}
          <text x="55" y="42" className="text-[3px] fill-slate-400 font-bold">Bouaké</text>

          <circle cx="45" cy="20" r="1.5" className="fill-purple-400" /> {/* Korhogo */}
          <text x="48" y="22" className="text-[3px] fill-slate-400 font-bold">Korhogo</text>
        </svg>

        {/* Dynamic Markers Overlay */}
        {markers.map((marker) => {
          const lat = marker.latitude ?? 6.5;
          const lng = marker.longitude ?? -5.5;
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
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-emerald-400 opacity-40"></span>
                <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white dark:border-slate-900 text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-40 w-48 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white shadow-xl pointer-events-none">
                <div className="font-bold truncate">{marker.name}</div>
                <div className="text-[10px] text-slate-400">{marker.sector} • {marker.substrateType}</div>
                <div className="text-emerald-400 font-semibold mt-1">{marker.totalWasteVolume.toLocaleString()} t/an</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Marker Detail Card */}
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
              Secteur : <span className="text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold">{selected.sector}</span> | Substrat : <span className="text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold">{selected.substrateType}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-400">Volume Total</div>
              <div className="text-sm font-extrabold text-emerald-400">{selected.totalWasteVolume.toLocaleString()} tonnes/an</div>
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
