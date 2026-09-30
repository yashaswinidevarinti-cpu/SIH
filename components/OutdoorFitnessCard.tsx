'use client'

import { useState } from 'react'
import {
  Activity,
  Sunset,
  Wind,
  Flame,
  Clock,
  CheckCircle2,
} from 'lucide-react'

interface OutdoorFitnessCardProps {
  unit: 'C' | 'F'
  windUnit?: 'km/h' | 'mph' | 'knots'
  isCompact?: boolean
}

export function OutdoorFitnessCard({
  unit,
  windUnit = 'km/h',
  isCompact = false,
}: OutdoorFitnessCardProps) {
  const [activeSlot, setActiveSlot] = useState<'morning' | 'midday' | 'evening'>('morning')

  const convertWind = (kmh: number) => {
    if (windUnit === 'mph') return `${Math.round(kmh * 0.621371)} mph`
    if (windUnit === 'knots') return `${Math.round(kmh * 0.539957)} kts`
    return `${kmh} km/h`
  }

  const slots = [
    {
      id: 'morning' as const,
      label: 'Early Morning Run',
      time: '6:30 AM – 8:45 AM',
      score: 95,
      tempC: 21,
      tempF: 70,
      windKm: 8,
      windDir: 'NW',
      status: 'Prime Window',
      statusColor: 'text-[#2e6d56] bg-[#e1efe8]',
      advice: 'Cool crisp air, gentle breeze, zero direct UV glare. Optimal aerobic pacing.',
      metrics: { uv: '1 Low', humidity: '48%', airQuality: '30 Clean' },
    },
    {
      id: 'midday' as const,
      label: 'Midday Window',
      time: '12:00 PM – 3:30 PM',
      score: 52,
      tempC: 28,
      tempF: 82,
      windKm: 14,
      windDir: 'WNW',
      status: 'Heat Caution',
      statusColor: 'text-[#a16223] bg-[#faebd8]',
      advice: 'Direct overhead sun. Surface pavement radiates heat. Avoid tempo runs or intervals.',
      metrics: { uv: '6 High', humidity: '38%', airQuality: '42 AQI' },
    },
    {
      id: 'evening' as const,
      label: 'Golden Hour Workout',
      time: '5:45 PM – 7:15 PM',
      score: 89,
      tempC: 24,
      tempF: 75,
      windKm: 11,
      windDir: 'W',
      status: 'Great Session',
      statusColor: 'text-[#2e6d56] bg-[#e1efe8]',
      advice: 'Soft twilight, declining temperature, ideal for calisthenics or recovery tempo.',
      metrics: { uv: '0.8 Low', humidity: '44%', airQuality: '35 AQI' },
    },
  ]

  const sunSchedule = [
    { label: 'First Light', time: '5:42 am' },
    { label: 'Sunrise', time: '6:04 am', highlight: true },
    { label: 'Solar Noon', time: '12:26 pm' },
    { label: 'Golden Hour', time: '5:48 pm', highlight: true },
    { label: 'Sunset', time: '6:49 pm', highlight: true },
    { label: 'Dusk', time: '7:11 pm' },
  ]

  const currentSlot = slots.find((s) => s.id === activeSlot) || slots[0]
  const currentTemp = unit === 'C' ? `${currentSlot.tempC}°C` : `${currentSlot.tempF}°F`
  const currentWind = `${convertWind(currentSlot.windKm)} ${currentSlot.windDir}`

  return (
    <div className="surface p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow text-[#4f7f6f]">Outdoor Fitness Lens</p>
            <span className="badge-soft bg-[#dfeee7] text-[#245847]">95/100 Readiness</span>
          </div>
          <h2 className="section-title">Workout & Movement Windows</h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#60736c] bg-[#edf3ef] px-2.5 py-1 rounded-full border border-[#dfe7e2]">
          <Wind size={13} className="text-[#3c7865]" />
          <span>{convertWind(12)} WNW • Headwind Low</span>
        </div>
      </div>

      <p className="mt-1.5 text-xs leading-relaxed text-[#687a74] max-w-xl">
        Calculated from thermal humidity index, solar angle, and ground radiation. Today features a 2-hour high-efficiency cardio pocket.
      </p>

      {/* Main Grid: Slot Selection + Solar Arc */}
      <div className={`mt-4 sm:mt-6 grid gap-4 ${isCompact ? 'grid-cols-1' : 'lg:grid-cols-[1.5fr_1fr]'}`}>
        {/* Left: Interactive Running Hour Windows */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-[#70847c]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Today&apos;s Workout Windows</span>
            <span className="text-[11px]">Tap to inspect</span>
          </div>

          <div className={`grid gap-2 sm:gap-3 ${isCompact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
            {slots.map((slot) => {
              const isActive = slot.id === activeSlot
              const temp = unit === 'C' ? `${slot.tempC}°` : `${slot.tempF}°`
              return (
                <button
                  key={slot.id}
                  onClick={() => setActiveSlot(slot.id)}
                  className={`relative text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? 'bg-[#e4eee8] border-[#9bc4b0] shadow-xs'
                      : 'bg-white/60 hover:bg-[#edf3ef] border-[#e0e8e2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full ${slot.statusColor}`}>
                      {slot.status}
                    </span>
                    <span className="font-display text-base sm:text-lg text-[#1f3d32]">
                      {slot.score}
                      <small className="text-[10px] font-sans text-[#788d85]">/100</small>
                    </span>
                  </div>
                  <h4 className="mt-1.5 text-xs sm:text-sm font-semibold text-[#1c3029] leading-tight">{slot.label}</h4>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#6a7d75]">
                    <span className="flex items-center gap-1 truncate max-w-[120px]">
                      <Clock size={11} className="shrink-0" /> {slot.time.split('–')[0]}
                    </span>
                    <span className="font-semibold text-[#204437] shrink-0">{temp}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Slot Detailed Insight */}
          <div className="rounded-xl sm:rounded-2xl border border-[#d6e3db] bg-[#f2f7f4] p-3 sm:p-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#dfe8e1] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs sm:text-sm text-[#1b3b30]">{currentSlot.label}</span>
                <span className="text-[#647c72] text-[11px]">({currentSlot.time})</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-[#556e64]">
                <span>Temp: <strong className="text-[#203c32]">{currentTemp}</strong></span>
                <span>Wind: <strong className="text-[#203c32]">{currentWind}</strong></span>
                <span>UV: <strong className="text-[#203c32]">{currentSlot.metrics.uv}</strong></span>
              </div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#405c51]">
              {currentSlot.advice}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] text-[#537065] border-t border-[#e1e9e3] pt-2">
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#3b876d]" /> Air: {currentSlot.metrics.airQuality}</span>
              <span className="flex items-center gap-1"><Activity size={12} className="text-[#3b876d]" /> Cadence: 168–174 spm</span>
              <span className="flex items-center gap-1"><Flame size={12} className="text-[#d88737]" /> Water: 300ml / 45m</span>
            </div>
          </div>
        </div>

        {/* Right: Daylight Progression & Golden Hour Arc */}
        <div className="sub-surface p-3.5 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-[#587a6f]">Solar & Light Arc</span>
            <span className="text-[11px] sm:text-xs font-semibold text-[#c87e2b] flex items-center gap-1">
              <Sunset size={13} /> Golden Hour 5:48 PM
            </span>
          </div>

          {/* Daylight Tracker Bar */}
          <div className="my-3 sm:my-4">
            <div className="relative h-2 w-full rounded-full bg-[#dfe8e2] overflow-hidden">
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-[#e7b878] via-[#89c5ad] to-[#e49b55]"
                style={{ left: '15%', width: '70%' }}
              />
              <div
                className="absolute top-0 bottom-0 w-2 -ml-1 rounded-full bg-[#1c3f4a] ring-2 ring-white"
                style={{ left: '38%' }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[9px] sm:text-[10px] text-[#81948b]">
              <span>Dawn 5:42</span>
              <span className="text-[#1c3f4a] font-semibold">Now 9:37 am (Daylight)</span>
              <span>Dusk 7:11</span>
            </div>
          </div>

          {/* Schedule Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 border-t border-[#e2eae4] pt-2.5 text-center">
            {sunSchedule.slice(1, 5).map((item) => (
              <div key={item.label} className="p-1.5 sm:p-2 rounded-xl bg-white/70 border border-[#e4ebe6]">
                <p className="text-[9px] text-[#798e85] uppercase tracking-wider">{item.label}</p>
                <p className="mt-0.5 text-[11px] sm:text-xs font-semibold text-[#1c362d]">{item.time}</p>
              </div>
            ))}
          </div>

          {/* Heat Alert Status */}
          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#edf6f1] p-2 sm:p-2.5 text-[11px] sm:text-xs text-[#2c5b4b]">
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2 rounded-full bg-[#3f8f6f]" />
              <span className="font-semibold">Thermal Strain: Low</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#638075]">Pavement dry</span>
          </div>
        </div>
      </div>
    </div>
  )
}
