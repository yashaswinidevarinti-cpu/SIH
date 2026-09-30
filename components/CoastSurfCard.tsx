'use client'

import { useState } from 'react'
import {
  Waves,
  Thermometer,
  Clock,
  ShieldCheck,
  Navigation,
} from 'lucide-react'

interface CoastSurfCardProps {
  unit: 'C' | 'F'
  isCompact?: boolean
}

const coastalSpots = [
  { id: 'gokarna', name: 'Gokarna Om Beach', dist: 'Coastal Range', waterTempC: 26, waterTempF: 79, waveHeight: '1.4 m', waveDesc: 'Clean peeling swell', swellPeriod: '12s', swellDir: 'WSW (245°)', tideStatus: 'Falling towards Low', flag: 'Green Flag • Safe Swim' },
  { id: 'panambur', name: 'Panambur Shore', dist: 'Mangalore Coast', waterTempC: 27, waterTempF: 81, waveHeight: '1.1 m', waveDesc: 'Gentle shorebreak', swellPeriod: '9s', swellDir: 'W (270°)', tideStatus: 'Low tide approach', flag: 'Green Flag • Mild currents' },
  { id: 'morjim', name: 'Morjim Coastline', dist: 'North Goa', waterTempC: 26, waterTempF: 79, waveHeight: '1.6 m', waveDesc: 'Moderate swell', swellPeriod: '13s', swellDir: 'SW (220°)', tideStatus: 'Mid tide rising', flag: 'Yellow Flag • Shore dump' },
]

export function CoastSurfCard({ unit, isCompact = false }: CoastSurfCardProps) {
  const [selectedSpotId, setSelectedSpotId] = useState('gokarna')
  const spot = coastalSpots.find((s) => s.id === selectedSpotId) || coastalSpots[0]

  const tempDisplay = unit === 'C' ? `${spot.waterTempC}°C` : `${spot.waterTempF}°F`

  const tides = [
    { type: 'High Tide', time: '10:24 AM', height: '1.85 m' },
    { type: 'Low Tide', time: '4:42 PM', height: '0.38 m' },
    { type: 'Next High', time: '11:15 PM', height: '1.92 m' },
  ]

  return (
    <div className="surface p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow text-[#2d6f76]">Coast & Ocean Lens</p>
            <span className="badge-soft bg-[#e2f1f2] text-[#1b5b63]">Surfing & Beach</span>
          </div>
          <h2 className="section-title">Marine & Tide Dynamics</h2>
        </div>

        {/* Coastal Spot Switcher */}
        <div className="flex items-center gap-1 rounded-full border border-[#cbdfe1] bg-white/70 p-1 text-xs overflow-x-auto no-scrollbar max-w-full">
          {coastalSpots.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSpotId(s.id)}
              className={`rounded-full px-2.5 py-1 font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                selectedSpotId === s.id
                  ? 'bg-[#1c3f4a] text-white shadow-xs'
                  : 'text-[#506c72] hover:text-[#183138]'
              }`}
            >
              {s.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-1.5 text-xs leading-relaxed text-[#59757a] max-w-xl">
        Live tidal harmonics and wave acoustics for <strong className="text-[#193b42]">{spot.name}</strong>. Clear water visibility with gentle offshore airflow.
      </p>

      {/* Main Grid: Wave Metrics + Tidal Wave Curve */}
      <div className={`mt-4 sm:mt-6 grid gap-4 ${isCompact ? 'grid-cols-1' : 'lg:grid-cols-[1.2fr_1.6fr]'}`}>
        {/* Left: Wave & Sea Vitals */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Wave Height */}
          <div className="sub-surface p-3 sm:p-4 flex flex-col justify-between bg-gradient-to-br from-[#f2f8f8] to-[#e4f1f2]/50 border-[#cfe1e3]">
            <div className="flex items-center justify-between text-[#2d6f76]">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#628389]">Wave Height</span>
              <Waves size={16} />
            </div>
            <div className="my-1.5 sm:my-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-semibold text-[#143940]">{spot.waveHeight}</span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#256870]">{spot.swellPeriod}</span>
              </div>
              <p className="mt-0.5 text-[11px] font-medium text-[#2d5f66] line-clamp-1">{spot.waveDesc}</p>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#69888e] flex items-center gap-1">
              <Navigation size={11} className="rotate-45 text-[#307077]" />
              {spot.swellDir}
            </p>
          </div>

          {/* Water Temperature */}
          <div className="sub-surface p-3 sm:p-4 flex flex-col justify-between bg-[#f4f8f7] border-[#d5e4de]">
            <div className="flex items-center justify-between text-[#387a6b]">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#69867d]">Water Temp</span>
              <Thermometer size={16} />
            </div>
            <div className="my-1.5 sm:my-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-semibold text-[#183a30]">{tempDisplay}</span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#306e5d]">Tropical</span>
              </div>
              <p className="mt-0.5 text-[11px] text-[#52776a] line-clamp-1">Rashguard</p>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#6e8a80]">Vis: 7–9m clear</p>
          </div>

          {/* Surf Condition Rating */}
          <div className="sub-surface p-3 sm:p-4 col-span-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#e8f3f2]/60 border-[#cbe0e0]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-[#193d44]">Surf Rating: 4 / 5 Clean</span>
                <span className="badge-soft bg-[#daf0e7] text-[#22634e] text-[9px] sm:text-[10px]">
                  {spot.flag}
                </span>
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-[#506d73]">
                Gentle 9 knot offshore wind holding faces open. Best peaks forming on incoming tide.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Tidal Timeline & Visual Sinusoid Curve */}
        <div className="sub-surface p-3.5 sm:p-5 flex flex-col justify-between border-[#cfe2e3] bg-[#f8faf8]">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-[#336d72]">Tidal Harmonics</span>
            <span className="text-[11px] sm:text-xs text-[#3f7278] flex items-center gap-1">
              <Clock size={11} /> Gauge: +1.42 m (Ebbing)
            </span>
          </div>

          {/* Visual SVG Tide Curve */}
          <div className="my-2 sm:my-3">
            <div className="h-20 sm:h-24 w-full relative">
              <svg viewBox="0 0 360 80" className="w-full h-full overflow-hidden" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="tideGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4aa2a7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4aa2a7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,40 C 50,10 80,10 120,40 C 160,70 200,70 240,40 C 280,10 310,10 360,40 L 360,80 L 0,80 Z"
                  fill="url(#tideGradient)"
                />
                <path
                  d="M 0,40 C 50,10 80,10 120,40 C 160,70 200,70 240,40 C 280,10 310,10 360,40"
                  fill="none"
                  stroke="#388b90"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="95" cy="18" r="4.5" fill="#1c3f4a" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="75" cy="12" r="2.5" fill="#2d6f76" />
                <circle cx="185" cy="68" r="2.5" fill="#2d6f76" />
              </svg>
            </div>
            <div className="flex justify-between text-[9px] sm:text-[10px] text-[#718a8f] px-1 mt-1">
              <span>6:00 AM</span>
              <span className="font-semibold text-[#204950]">10:24 AM High (1.85m)</span>
              <span className="font-semibold text-[#204950]">4:42 PM Low (0.38m)</span>
              <span>11:15 PM</span>
            </div>
          </div>

          {/* Tide Timings Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 border-t border-[#dfeae9] pt-2.5 text-center">
            {tides.map((tide, i) => (
              <div key={i} className="rounded-xl bg-white/75 p-1.5 sm:p-2 border border-[#e1ecea]">
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#638489]">{tide.type}</p>
                <p className="mt-0.5 text-[11px] sm:text-xs font-semibold text-[#18393e]">{tide.time}</p>
                <p className="text-[10px] sm:text-[11px] font-display text-[#2b6870]">{tide.height}</p>
              </div>
            ))}
          </div>

          {/* Beach safety advisory */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] sm:text-xs text-[#2c5d64] bg-[#eef6f6] px-3 py-2 rounded-xl border border-[#d6e7e8]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#2b7d70] shrink-0" />
              <span className="truncate">Lifeguards active. Low rip hazard.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
