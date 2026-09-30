'use client'

import { useState } from 'react'
import {
  Plane,
  AlertTriangle,
  CheckCircle2,
  Luggage,
  Plus,
  Check,
  MapPin,
  X,
  RotateCcw,
} from 'lucide-react'

export interface Destination {
  city: string
  country: string
  tempC: number
  tempF: number
  condition: string
  weatherSummary: string
  flightAlert: {
    hasAlert: boolean
    type: 'warning' | 'info' | 'normal'
    title: string
    detail: string
  }
  packingTips: string[]
  image: string
}

const initialDestinations: Destination[] = [
  {
    city: 'London',
    country: 'United Kingdom',
    tempC: 16,
    tempF: 61,
    condition: 'Intermittent Showers',
    weatherSummary: '16°C • Rain 68% • Gusts 28 km/h',
    flightAlert: {
      hasAlert: true,
      type: 'warning',
      title: 'LHR Inbound Weather Advisory',
      detail: 'Low cloud ceiling and gusty crosswinds may cause 15–20 min holding patterns.',
    },
    packingTips: [
      'Carry a lightweight waterproof trench or raincoat',
      'Wind-resistant compact umbrella',
      'Water-repellent walking shoes & cozy knit',
    ],
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=700&q=85',
  },
  {
    city: 'Lisbon',
    country: 'Portugal',
    tempC: 23,
    tempF: 73,
    condition: 'Clear Atlantic Sun',
    weatherSummary: '23°C • Clear Skies • Coastal Breeze',
    flightAlert: {
      hasAlert: false,
      type: 'normal',
      title: 'LIS Corridor Clear',
      detail: 'Smooth approach vectors into Humberto Delgado. Flights on schedule.',
    },
    packingTips: [
      'Breathable linen shirts & sun-dresses',
      'Polarized UV sunglasses & SPF 30 sunblock',
      'Supportive sneakers for cobblestone inclines',
    ],
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=700&q=85',
  },
  {
    city: 'Copenhagen',
    country: 'Denmark',
    tempC: 17,
    tempF: 63,
    condition: 'Overcast & Light Drizzle',
    weatherSummary: '17°C • Drizzle later • 14 km/h wind',
    flightAlert: {
      hasAlert: false,
      type: 'normal',
      title: 'CPH Flight Path Normal',
      detail: 'No turbulence or severe front across the Baltic sea route.',
    },
    packingTips: [
      'Windproof shell jacket or light parka',
      'Thermal scarf for evening canalside breeze',
      'Weatherproof daypack',
    ],
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=700&q=85',
  },
  {
    city: 'Kyoto',
    country: 'Japan',
    tempC: 21,
    tempF: 70,
    condition: 'Crisp & Serene',
    weatherSummary: '21°C • Mild Autumn Air • 0% Rain',
    flightAlert: {
      hasAlert: false,
      type: 'normal',
      title: 'KIX Transit Calm',
      detail: 'Clear atmospheric passage across Kansai bay.',
    },
    packingTips: [
      'Light slip-on shoes for temple floors',
      'Comfortable layering cardigan',
      'Compact camera for golden maple leaves',
    ],
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=85',
  },
]

const cityPresets = [
  { city: 'Tokyo', country: 'Japan', tempC: 22, tempF: 72, condition: 'Partly Sunny', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=700&q=85' },
  { city: 'Zurich', country: 'Switzerland', tempC: 15, tempF: 59, condition: 'Alpine Breeze', image: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=700&q=85' },
  { city: 'Paris', country: 'France', tempC: 19, tempF: 66, condition: 'Pleasant Clouds', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=85' },
]

interface TravelersCardProps {
  unit: 'C' | 'F'
  onSelectCityWeather?: (cityName: string) => void
  isCompact?: boolean
}

export function TravelersCard({ unit, onSelectCityWeather, isCompact = false }: TravelersCardProps) {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations)
  const [activeCityName, setActiveCityName] = useState('London')
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'London-0': true,
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCityInput, setNewCityInput] = useState('')

  const activeDest = destinations.find((d) => d.city === activeCityName) || destinations[0]

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const resetChecklist = () => {
    const updated = { ...checkedItems }
    activeDest.packingTips.forEach((_, idx) => {
      delete updated[`${activeDest.city}-${idx}`]
    })
    setCheckedItems(updated)
  }

  const handleAddCity = (cityName: string) => {
    if (!cityName.trim()) return

    const trimmed = cityName.trim()
    const existing = destinations.find((d) => d.city.toLowerCase() === trimmed.toLowerCase())
    if (existing) {
      setActiveCityName(existing.city)
      setShowAddModal(false)
      setNewCityInput('')
      return
    }

    const preset = cityPresets.find((p) => p.city.toLowerCase() === trimmed.toLowerCase())

    const newDest: Destination = {
      city: preset ? preset.city : trimmed,
      country: preset ? preset.country : 'International',
      tempC: preset ? preset.tempC : 20,
      tempF: preset ? preset.tempF : 68,
      condition: preset ? preset.condition : 'Fair Skies',
      weatherSummary: `${preset ? (unit === 'C' ? `${preset.tempC}°C` : `${preset.tempF}°F`) : '20°C'} • Good visibility`,
      flightAlert: {
        hasAlert: false,
        type: 'normal',
        title: `${trimmed} Flight Path Normal`,
        detail: 'Standard transit corridor. Approaches on schedule.',
      },
      packingTips: [
        `Check morning forecast in ${trimmed} before heading out`,
        'Comfortable walking footwear & universal adapter',
        'Light breathable jacket or layers',
      ],
      image: preset ? preset.image : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=700&q=85',
    }

    setDestinations([newDest, ...destinations])
    setActiveCityName(newDest.city)
    setShowAddModal(false)
    setNewCityInput('')
  }

  const removeCity = (e: React.MouseEvent, cityToRemove: string) => {
    e.stopPropagation()
    if (destinations.length <= 1) return // Keep at least one
    const remaining = destinations.filter((d) => d.city !== cityToRemove)
    setDestinations(remaining)
    if (activeCityName === cityToRemove) {
      setActiveCityName(remaining[0].city)
    }
  }

  return (
    <div className="surface p-4 sm:p-6 lg:p-8" id="saved-places-section">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow text-[#4a6b77]">Traveler & Transit Lens</p>
            <span className="badge-soft bg-[#edf2f6] text-[#2d5668]">Smart Packing & Flights</span>
          </div>
          <h2 className="section-title">Saved Routes & Packing Intelligence</h2>
        </div>

        <button
          onClick={() => setShowAddModal(!showAddModal)}
          className="add-button bg-[#edf2f5] hover:bg-[#e0eaf0] text-[#2a566a] px-3.5 py-1.5 rounded-full border border-[#d5e2e8] transition-all text-xs cursor-pointer"
        >
          <Plus size={14} /> Add destination
        </button>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-[#61747d] max-w-xl">
        Predictive weather advisories for flight corridors, live destination climates, and smart contextual luggage checklists.
      </p>

      {/* Add City Form / Quick Presets */}
      {showAddModal && (
        <div className="mt-4 rounded-2xl bg-[#edf4f7] p-3.5 border border-[#cfdfeb] animate-fade-in space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleAddCity(newCityInput)
            }}
            className="flex flex-wrap items-center gap-2"
          >
            <MapPin size={16} className="text-[#3c6b7e]" />
            <input
              type="text"
              placeholder="Search or enter city (e.g. Tokyo, Paris, Zurich)..."
              value={newCityInput}
              onChange={(e) => setNewCityInput(e.target.value)}
              className="flex-1 bg-white/95 rounded-xl px-3 py-1.5 text-xs text-[#1c3945] outline-none border border-[#d2e0e8]"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-xl bg-[#244f60] text-white px-3.5 py-1.5 text-xs font-semibold hover:bg-[#1a3d4c] cursor-pointer"
            >
              Add City
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-xs text-[#6a828e] hover:text-[#233f4c] px-2 cursor-pointer"
            >
              Cancel
            </button>
          </form>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 pt-1 text-[11px] text-[#5b737e]">
            <span>Quick add:</span>
            {cityPresets.map((preset) => (
              <button
                key={preset.city}
                type="button"
                onClick={() => handleAddCity(preset.city)}
                className="px-2 py-0.5 rounded-lg bg-white/80 hover:bg-white text-[#2a566a] border border-[#d6e3ea] transition-colors cursor-pointer"
              >
                + {preset.city}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Destination Cards Carousel */}
      <div className="mt-6 flex gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
        {destinations.map((dest) => {
          const isSelected = dest.city === activeCityName
          const temp = unit === 'C' ? `${dest.tempC}°` : `${dest.tempF}°`
          return (
            <div
              key={dest.city}
              onClick={() => {
                setActiveCityName(dest.city)
                if (onSelectCityWeather) onSelectCityWeather(dest.city)
              }}
              className={`destination group shrink-0 w-[160px] sm:w-[210px] cursor-pointer transition-all duration-300 ring-offset-2 ${
                isSelected ? 'ring-2 ring-[#295669] scale-[1.02]' : 'opacity-85 hover:opacity-100'
              }`}
            >
              <img src={dest.image} alt={dest.city} />
              <div className="destination-shade" />

              {/* Remove destination button */}
              {destinations.length > 1 && (
                <button
                  onClick={(e) => removeCity(e, dest.city)}
                  title={`Remove ${dest.city}`}
                  className="absolute top-2 right-2 z-10 flex size-6 items-center justify-center rounded-full bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 hover:bg-black/70 hover:text-white transition-opacity"
                >
                  <X size={12} />
                </button>
              )}

              <div className="relative flex h-full flex-col justify-between p-3.5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                    {dest.country}
                  </span>
                  <span className="text-base font-semibold">{temp}</span>
                </div>
                <div>
                  {dest.flightAlert.hasAlert && (
                    <span className="inline-flex items-center gap-1 rounded bg-[#d97724]/90 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white mb-1.5 shadow-sm">
                      <AlertTriangle size={10} /> Flight Alert
                    </span>
                  )}
                  <p className="font-display text-xl tracking-tight leading-tight">{dest.city}</p>
                  <p className="mt-0.5 text-[11px] text-white/80 truncate">{dest.condition}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected City Details: Flight Weather + Smart Packing List */}
      <div className={`mt-5 grid gap-5 ${isCompact ? 'grid-cols-1' : 'lg:grid-cols-[1.25fr_1.4fr]'}`}>
        {/* Flight Radar & Weather Alert */}
        <div className="sub-surface p-3.5 sm:p-5 flex flex-col justify-between border-[#d1e0e8] bg-[#f8fbfa]">
          <div>
            <div className="flex items-center justify-between text-xs text-[#52707b]">
              <span className="eyebrow text-[#376170]">Inbound Flight Status</span>
              <span className="flex items-center gap-1 font-semibold text-[#28576a]">
                <Plane size={14} /> BLR → {activeDest.city.toUpperCase().slice(0, 3)}
              </span>
            </div>

            <div
              className={`mt-4 rounded-xl p-3.5 border ${
                activeDest.flightAlert.hasAlert
                  ? 'bg-[#fcf5ec] border-[#f0cca3] text-[#78471c]'
                  : 'bg-[#edf6f2] border-[#cbe1d7] text-[#245846]'
              }`}
            >
              <div className="flex items-center gap-2">
                {activeDest.flightAlert.hasAlert ? (
                  <AlertTriangle size={16} className="text-[#c87123] shrink-0" />
                ) : (
                  <CheckCircle2 size={16} className="text-[#327c62] shrink-0" />
                )}
                <strong className="text-xs font-semibold">{activeDest.flightAlert.title}</strong>
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed opacity-90 pl-6">
                {activeDest.flightAlert.detail}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#e0ecf1] flex items-center justify-between text-[11px] text-[#637d89]">
            <span>Local Forecast: <strong className="text-[#20404f]">{activeDest.weatherSummary}</strong></span>
            <span className="text-[#295669] font-medium">Auto-synced</span>
          </div>
        </div>

        {/* Dynamic Packing Suggestions */}
        <div className="sub-surface p-3.5 sm:p-5 flex flex-col justify-between border-[#d1e0e8] bg-[#f8fbfa]">
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="eyebrow text-[#376170]">Contextual Luggage Advisor</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#557582] flex items-center gap-1">
                  <Luggage size={13} /> {activeDest.city} Recommendation
                </span>
                <button
                  onClick={resetChecklist}
                  title="Reset packing checklist"
                  className="flex items-center gap-1 text-[10px] text-[#688591] hover:text-[#214352] transition-colors cursor-pointer"
                >
                  <RotateCcw size={11} /> Reset
                </button>
              </div>
            </div>

            <p className="mt-1.5 text-xs text-[#57727e]">
              Packing suggestions automatically customized based on {activeDest.city}&apos;s temperature and rain probability:
            </p>

            {/* Checklist */}
            <div className="mt-3.5 space-y-2">
              {activeDest.packingTips.map((tip, idx) => {
                const key = `${activeDest.city}-${idx}`
                const isChecked = !!checkedItems[key]
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(key)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all duration-150 ${
                      isChecked
                        ? 'bg-[#e7f1ee] border-[#b8d6cb] text-[#2c5b4d]'
                        : 'bg-white/80 border-[#dfe9ee] text-[#2d4753] hover:bg-[#f0f6f8]'
                    }`}
                  >
                    <div
                      className={`flex size-4 items-center justify-center rounded border transition-colors shrink-0 ${
                        isChecked
                          ? 'bg-[#357560] border-[#357560] text-white'
                          : 'border-[#a8bec8] bg-white'
                      }`}
                    >
                      {isChecked && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span className={isChecked ? 'line-through opacity-75' : 'font-medium'}>
                      {tip}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3 pt-2 text-[10px] text-[#718b97] flex items-center justify-between">
            <span>Tap items to mark as packed in your carry-on</span>
            <span className="font-semibold text-[#295669]">
              {Object.keys(checkedItems).filter((k) => k.startsWith(activeDest.city) && checkedItems[k]).length} of {activeDest.packingTips.length} packed
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
