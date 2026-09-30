'use client'

import { useState } from 'react'
import {
  School,
  Bus,
  CloudRain,
  ShieldCheck,
  Footprints,
} from 'lucide-react'

interface FamilyCommuteCardProps {
  unit: 'C' | 'F'
  isCompact?: boolean
}

export function FamilyCommuteCard({ unit, isCompact = false }: FamilyCommuteCardProps) {
  const [commuteTab, setCommuteTab] = useState<'morning' | 'afternoon'>('morning')

  // Rain probability for next 60 minutes in 10-minute intervals
  const minutePrecipitation = [
    { time: 'Now', prob: 0, height: 4 },
    { time: '+10m', prob: 0, height: 4 },
    { time: '+20m', prob: 0, height: 4 },
    { time: '+30m', prob: 5, height: 8 },
    { time: '+40m', prob: 5, height: 8 },
    { time: '+50m', prob: 10, height: 12 },
    { time: '+60m', prob: 5, height: 8 },
  ]

  const commutes = {
    morning: {
      title: 'School Drop-Off',
      window: '7:30–8:30 AM',
      tempC: 21,
      tempF: 70,
      rainRisk: '0% Rain',
      airRating: '32 AQI (Optimal)',
      trafficWeatherImpact: 'Smooth & Clear',
      recommendation: 'Crisp morning air. Ideal for walking or cycling to school. Light jacket or school cardigan recommended.',
      clothing: 'Light layer • No rainwear',
      badge: 'Walk Ideal',
    },
    afternoon: {
      title: 'School Pickup',
      window: '2:45–3:45 PM',
      tempC: 27,
      tempF: 81,
      rainRisk: '4% Rain',
      airRating: '38 AQI (Good)',
      trafficWeatherImpact: 'Dry roads, bright sun',
      recommendation: 'Warm direct sunshine with UV index 5. Keep kids hydrated and ensure wide-brim hats are on for playground pickup.',
      clothing: 'Sun cap • Cold bottle',
      badge: 'Sun Cap Active',
    },
  }

  const activeCommute = commutes[commuteTab]
  const displayTemp = unit === 'C' ? `${activeCommute.tempC}°C` : `${activeCommute.tempF}°F`

  return (
    <div className="surface p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow text-[#567a6d]">Parents & Family Lens</p>
            <span className="badge-soft bg-[#ebf6f1] text-[#25624e]">Routine Ready</span>
          </div>
          <h2 className="section-title">School Commute & Routine</h2>
        </div>

        {/* Severe Weather Shield Badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#cbe1d7] bg-[#f0f8f4] px-3 py-1 text-[11px] sm:text-xs text-[#2b6652]">
          <ShieldCheck size={14} className="text-[#3b8a6e]" />
          <span className="font-semibold">All Clear</span>
        </div>
      </div>

      <p className="mt-1.5 text-xs leading-relaxed text-[#62776f] max-w-xl">
        High-precision conditions for morning drop-offs, afternoon bell rings, and family park windows. Micro-forecasted for your school zone.
      </p>

      {/* Main Grid: Commute Switcher + Rain Radar */}
      <div className={`mt-4 sm:mt-6 grid gap-4 ${isCompact ? 'grid-cols-1' : 'lg:grid-cols-[1.4fr_1.1fr]'}`}>
        {/* Left: School Commute Tabs & Condition Card */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
            <button
              onClick={() => setCommuteTab('morning')}
              className={`pill-tab text-xs shrink-0 cursor-pointer ${
                commuteTab === 'morning' ? 'pill-tab-active' : 'sub-surface text-[#4d695f]'
              }`}
            >
              <School size={13} /> Drop-Off (7:30–8:30 AM)
            </button>
            <button
              onClick={() => setCommuteTab('afternoon')}
              className={`pill-tab text-xs shrink-0 cursor-pointer ${
                commuteTab === 'afternoon' ? 'pill-tab-active' : 'sub-surface text-[#4d695f]'
              }`}
            >
              <Bus size={13} /> Pickup (2:45–3:45 PM)
            </button>
          </div>

          <div className="sub-surface p-3.5 sm:p-5 border-[#d6e4dc] bg-[#f8faf8]">
            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#e1ece5] pb-2.5">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-[#1c382e]">{activeCommute.title}</span>
                <span className="ml-1.5 text-[11px] text-[#627970]">({activeCommute.window})</span>
              </div>
              <span className="badge-soft bg-[#dfeee6] text-[#205744] text-[9px] sm:text-[10px]">
                {activeCommute.badge}
              </span>
            </div>

            <div className="mt-2.5 sm:mt-3.5 grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
              <div className="rounded-xl bg-white/75 p-2 border border-[#e2ece6]">
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-[#728980]">Temp</p>
                <p className="font-display text-base sm:text-lg text-[#1a382e]">{displayTemp}</p>
              </div>
              <div className="rounded-xl bg-white/75 p-2 border border-[#e2ece6]">
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-[#728980]">Precip</p>
                <p className="font-display text-base sm:text-lg text-[#266c56]">{activeCommute.rainRisk}</p>
              </div>
              <div className="rounded-xl bg-white/75 p-2 border border-[#e2ece6]">
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-[#728980]">Air</p>
                <p className="font-display text-base sm:text-lg text-[#266c56]">{activeCommute.airRating.split(' ')[0]}</p>
              </div>
            </div>

            <p className="mt-2.5 text-xs leading-relaxed text-[#405c52]">
              {activeCommute.recommendation}
            </p>

            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#edf5f0] px-3 py-1.5 text-[11px] text-[#2b5d4c]">
              <span className="flex items-center gap-1 font-medium truncate">
                <Footprints size={13} className="text-[#3b876d] shrink-0" /> {activeCommute.clothing}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#5e7d72] shrink-0 ml-2">{activeCommute.trafficWeatherImpact}</span>
            </div>
          </div>
        </div>

        {/* Right: Next 60-Minute Rain Alert Radar & Outdoor Play Window */}
        <div className="sub-surface p-3.5 sm:p-5 flex flex-col justify-between border-[#d6e4dc] bg-[#f8faf8]">
          <div>
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[#4c7365]">Precipitation Radar</span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#296853] flex items-center gap-1">
                <CloudRain size={12} /> Next 60 Mins: Zero Rain
              </span>
            </div>

            <p className="mt-1 text-xs text-[#637a71]">
              High-frequency radar confirms no precipitation cells within an 18 km radius.
            </p>

            {/* Micro Rain Bar Graph */}
            <div className="mt-3 flex items-end justify-between gap-1 h-12 bg-white/60 rounded-xl p-2 border border-[#e1ebe5]">
              {minutePrecipitation.map((min, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-[#e3ede7] rounded-sm h-6 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-[#4ba388] rounded-sm transition-all"
                      style={{ height: `${min.height}px` }}
                    />
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-[#7a8f86]">{min.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Family Park & Outdoor Play Window */}
          <div className="mt-3 rounded-xl border border-[#dce8e0] bg-[#f2f7f3] p-2.5 sm:p-3 text-[11px] sm:text-xs text-[#305347]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs">Best Outdoor Play Hour</span>
              <span className="font-semibold text-[#214b3d]">4:30 – 6:30 PM</span>
            </div>
            <p className="mt-1 text-[10px] sm:text-[11px] leading-relaxed text-[#567468]">
              Ground surface cools down, UV index drops below 2, soft evening breeze. Great for playground swings and park strolls.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
