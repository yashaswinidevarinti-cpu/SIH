'use client'

import { useState } from 'react'
import {
  HeartPulse,
  Flower2,
  Sun,
  Droplets,
  Info,
  ChevronDown,
  Sparkles,
} from 'lucide-react'

interface HealthAirCardProps {
  unit: 'C' | 'F'
  isCompact?: boolean
}

export function HealthAirCard({ unit, isCompact = false }: HealthAirCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false)

  const aqiValue = 32
  const aqiStatus = 'Good'

  const pollutants = [
    { name: 'PM2.5', value: '7.8 µg/m³', status: 'Optimal', pct: 24, safeLimit: '< 15 µg/m³' },
    { name: 'PM10', value: '18.4 µg/m³', status: 'Good', pct: 32, safeLimit: '< 45 µg/m³' },
    { name: 'Ozone (O₃)', value: '26 ppb', status: 'Low', pct: 28, safeLimit: '< 60 ppb' },
    { name: 'NO₂', value: '11.2 ppb', status: 'Optimal', pct: 18, safeLimit: '< 40 ppb' },
  ]

  const allergens = [
    { label: 'Tree', level: 'Low', color: 'bg-[#51826f]' },
    { label: 'Grass', level: 'Moderate', color: 'bg-[#e28a38]' },
    { label: 'Weed', level: 'Low', color: 'bg-[#51826f]' },
  ]

  return (
    <div className="surface p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow text-[#587a6f]">Health & Allergy Lens</p>
            <span className="badge-soft bg-[#edf6f0] text-[#2c6552]">Optimal Air</span>
          </div>
          <h2 className="section-title">Respiratory & Skin Climate</h2>
        </div>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-button text-xs cursor-pointer self-center"
        >
          {showBreakdown ? 'Hide pollutants' : 'Pollutant metrics'}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${showBreakdown ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <p className="mt-1.5 text-xs leading-relaxed text-[#687a74] max-w-xl">
        Curated for sensitive airways, allergy management, and safe sun exposure. Air purity is in the top 5% of monthly averages.
      </p>

      {/* Grid of Key Metrics: 2 columns on mobile, 4 columns on large */}
      <div className={`mt-4 sm:mt-6 grid gap-2.5 sm:gap-4 ${isCompact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
        {/* AQI Tile */}
        <div className="sub-surface p-3 sm:p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#51826f]">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#73887f]">Air Quality</span>
            <HeartPulse size={16} />
          </div>
          <div className="my-2 sm:my-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-[#204036]">{aqiValue}</span>
              <span className="text-[10px] sm:text-xs font-semibold text-[#3d7a64] uppercase tracking-wide">AQI • {aqiStatus}</span>
            </div>
            {/* Progress Bar */}
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-[#dfe8e2] overflow-hidden">
              <div className="h-full rounded-full bg-[#41886f]" style={{ width: '32%' }} />
            </div>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#71857c] leading-tight line-clamp-2 sm:line-clamp-none">
            Ideal for asthma and open-air breathing.
          </p>
        </div>

        {/* Pollen Alert */}
        <div className="sub-surface p-3 sm:p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#805e32]">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#73887f]">Pollen</span>
            <Flower2 size={16} className="text-[#c78536]" />
          </div>
          <div className="my-2 sm:my-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-[#7e5525]">Mod</span>
              <span className="text-[10px] sm:text-xs font-semibold text-[#916733]">Birch Active</span>
            </div>
            <p className="mt-0.5 text-[10px] sm:text-[11px] text-[#7e5b30]">Peaks 1:30–3:30 PM</p>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#71857c] leading-tight line-clamp-2 sm:line-clamp-none">
            Rinse eyes after park visits.
          </p>
        </div>

        {/* UV Index */}
        <div className="sub-surface p-3 sm:p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#f0a94d]">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#73887f]">UV Index</span>
            <Sun size={16} />
          </div>
          <div className="my-2 sm:my-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-[#204036]">4.2</span>
              <span className="text-[10px] sm:text-xs font-semibold text-[#d4882b]">Moderate</span>
            </div>
            <p className="mt-0.5 text-[10px] sm:text-[11px] text-[#71857c]">Peak at 12:45 PM (UV 6)</p>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#71857c] leading-tight line-clamp-2 sm:line-clamp-none">
            Safe without SPF up to 45 mins.
          </p>
        </div>

        {/* Humidity & Respiratory */}
        <div className="sub-surface p-3 sm:p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#4b7a8a]">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#73887f]">Moisture</span>
            <Droplets size={16} />
          </div>
          <div className="my-2 sm:my-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-[#204036]">46%</span>
              <span className="text-[10px] sm:text-xs font-semibold text-[#3d7486]">Crisp</span>
            </div>
            <p className="mt-0.5 text-[10px] sm:text-[11px] text-[#71857c]">Mold Spores: Low</p>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#71857c] leading-tight line-clamp-2 sm:line-clamp-none">
            Ideal comfort range (40–55%).
          </p>
        </div>
      </div>

      {/* Expandable Pollutant Breakdown */}
      {showBreakdown && (
        <div className="mt-4 rounded-2xl bg-[#ecf3ee]/80 p-3 sm:p-4 border border-[#d6e3db] animate-fade-in">
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-[#2f5549]">
            <Info size={13} />
            <span>Real-time particulate composition</span>
          </div>
          <div className={`grid gap-2 sm:gap-3 ${isCompact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {pollutants.map((p) => (
              <div key={p.name} className="rounded-xl bg-white/70 p-2.5 border border-[#dfe8e1]">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#1f3730]">{p.name}</span>
                  <span className="text-[10px] font-medium text-[#467c69]">{p.status}</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="font-display text-base text-[#1a2d27]">{p.value}</span>
                  <span className="text-[9px] text-[#7e8f88]">{p.safeLimit}</span>
                </div>
                <div className="mt-1.5 h-1 w-full bg-[#e3ece6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#41886f] rounded-full" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Allergy & Skin Guidance Banner */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 rounded-xl border border-[#dbe6df] bg-[#f2f7f3] p-3 text-xs text-[#446257]">
        <div className="flex items-start sm:items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-full bg-[#deece2] text-[#2f6350] shrink-0 mt-0.5 sm:mt-0">
            <Sparkles size={13} />
          </div>
          <div className="text-[11px] sm:text-xs leading-relaxed">
            <strong className="font-semibold text-[#1f3e33]">Allergy Notice: </strong>
            Grass pollen counts rise slightly around 2:00 PM. Sunglasses advised for park walks.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto pl-8 sm:pl-0">
          {allergens.map((a) => (
            <div key={a.label} className="flex items-center gap-1 text-[10px] text-[#556961]">
              <span className={`inline-block size-2 rounded-full ${a.color}`} />
              <span>{a.label}: <strong className="text-[#203c32]">{a.level}</strong></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
