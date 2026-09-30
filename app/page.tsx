'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  Compass,
  Droplets,
  HeartPulse,
  MapPin,
  Menu,
  Plane,
  School,
  Search,
  Settings2,
  Sparkles,
  Sun,
  Waves,
  Wind,
  X,
  Check,
  Smartphone,
} from 'lucide-react'

import { PersonaNav, type PersonaType } from '@/components/PersonaNav'
import { HealthAirCard } from '@/components/HealthAirCard'
import { OutdoorFitnessCard } from '@/components/OutdoorFitnessCard'
import { CoastSurfCard } from '@/components/CoastSurfCard'
import { TravelersCard } from '@/components/TravelersCard'
import { FamilyCommuteCard } from '@/components/FamilyCommuteCard'
import { PreferencesModal } from '@/components/PreferencesModal'
import { MobileDeviceFrame } from '@/components/MobileDeviceFrame'

interface LocationData {
  id: string
  name: string
  region: string
  tempC: number
  tempF: number
  condition: string
  feelsLikeNote: string
  highC: number
  lowC: number
  highF: number
  lowF: number
  humidity: string
  windKm: number
  uv: string
  aqi: string
  greetingSub: string
  rhythmText: string
  forecast: {
    day: string
    date: string
    icon: typeof Sun
    highC: number
    lowC: number
    highF: number
    lowF: number
    rain: string
  }[]
}

const availableLocations: LocationData[] = [
  {
    id: 'blr',
    name: 'Indiranagar, Bengaluru',
    region: 'India',
    tempC: 26,
    tempF: 79,
    condition: 'Sunny',
    feelsLikeNote: 'Feels like a clear start • Low humidity',
    highC: 28,
    lowC: 19,
    highF: 82,
    lowF: 66,
    humidity: '46%',
    windKm: 12,
    uv: '4 Moderate',
    aqi: '32 AQI',
    greetingSub: 'Air is crisp and clean (32 AQI), solar heat stays gentle until noon. Your morning movement and school commute look seamless.',
    rhythmText: 'You usually step out between 7–9 am. Optimal air and soft sunrise light align today.',
    forecast: [
      { day: 'Today', date: '18 Jun', icon: Sun, highC: 28, lowC: 19, highF: 82, lowF: 66, rain: '08%' },
      { day: 'Thu', date: '19 Jun', icon: Sun, highC: 29, lowC: 20, highF: 84, lowF: 68, rain: '04%' },
      { day: 'Fri', date: '20 Jun', icon: Wind, highC: 27, lowC: 18, highF: 81, lowF: 64, rain: '16%' },
      { day: 'Sat', date: '21 Jun', icon: Droplets, highC: 23, lowC: 17, highF: 73, lowF: 63, rain: '62%' },
      { day: 'Sun', date: '22 Jun', icon: Sun, highC: 25, lowC: 18, highF: 77, lowF: 64, rain: '21%' },
    ],
  },
  {
    id: 'gokarna',
    name: 'Om Beach, Gokarna',
    region: 'Karnataka Coast',
    tempC: 27,
    tempF: 81,
    condition: 'Coastal Breeze',
    feelsLikeNote: 'Clean offshore winds • 1.4m peeling swell',
    highC: 30,
    lowC: 23,
    highF: 86,
    lowF: 73,
    humidity: '76%',
    windKm: 16,
    uv: '7 High',
    aqi: '18 AQI',
    greetingSub: 'Coastal salt air is pristine. High tide peaks at 10:24 AM with optimal wave shape for surfers and morning swimmers.',
    rhythmText: 'Best surf conditions arrive with incoming tides between 1:00 PM – 4:00 PM.',
    forecast: [
      { day: 'Today', date: '18 Jun', icon: Waves, highC: 30, lowC: 23, highF: 86, lowF: 73, rain: '10%' },
      { day: 'Thu', date: '19 Jun', icon: Sun, highC: 31, lowC: 24, highF: 88, lowF: 75, rain: '05%' },
      { day: 'Fri', date: '20 Jun', icon: Waves, highC: 29, lowC: 23, highF: 84, lowF: 73, rain: '20%' },
      { day: 'Sat', date: '21 Jun', icon: Droplets, highC: 27, lowC: 22, highF: 80, lowF: 71, rain: '70%' },
      { day: 'Sun', date: '22 Jun', icon: Sun, highC: 29, lowC: 23, highF: 84, lowF: 73, rain: '25%' },
    ],
  },
  {
    id: 'lon',
    name: 'South Kensington, London',
    region: 'United Kingdom',
    tempC: 16,
    tempF: 61,
    condition: 'Light Showers',
    feelsLikeNote: 'Cool Atlantic front • Intermittent rain',
    highC: 18,
    lowC: 12,
    highF: 64,
    lowF: 54,
    humidity: '82%',
    windKm: 24,
    uv: '2 Low',
    aqi: '24 AQI',
    greetingSub: 'Carry a lightweight raincoat and compact umbrella today. Showers will pass by mid-afternoon before clearing.',
    rhythmText: 'Inbound flight spacing at Heathrow has minor holding delay buffers (+15m).',
    forecast: [
      { day: 'Today', date: '18 Jun', icon: Droplets, highC: 18, lowC: 12, highF: 64, lowF: 54, rain: '68%' },
      { day: 'Thu', date: '19 Jun', icon: Wind, highC: 19, lowC: 13, highF: 66, lowF: 55, rain: '35%' },
      { day: 'Fri', date: '20 Jun', icon: Sun, highC: 21, lowC: 14, highF: 70, lowF: 57, rain: '15%' },
      { day: 'Sat', date: '21 Jun', icon: Sun, highC: 22, lowC: 14, highF: 72, lowF: 57, rain: '10%' },
      { day: 'Sun', date: '22 Jun', icon: Droplets, highC: 19, lowC: 13, highF: 66, lowF: 55, rain: '45%' },
    ],
  },
  {
    id: 'lis',
    name: 'Alfama, Lisbon',
    region: 'Portugal',
    tempC: 23,
    tempF: 73,
    condition: 'Clear Atlantic Sky',
    feelsLikeNote: 'Warm golden sun • Fresh coastal breeze',
    highC: 25,
    lowC: 17,
    highF: 77,
    lowF: 63,
    humidity: '52%',
    windKm: 15,
    uv: '5 Moderate',
    aqi: '21 AQI',
    greetingSub: 'Linen weather all day. Mild marine breezes keep the cobbled hills comfortable for walking and outdoor terraces.',
    rhythmText: 'Flight corridor from BLR is smooth and on schedule. UV reaches peak at 1:15 PM.',
    forecast: [
      { day: 'Today', date: '18 Jun', icon: Sun, highC: 25, lowC: 17, highF: 77, lowF: 63, rain: '00%' },
      { day: 'Thu', date: '19 Jun', icon: Sun, highC: 26, lowC: 18, highF: 79, lowF: 64, rain: '00%' },
      { day: 'Fri', date: '20 Jun', icon: Wind, highC: 24, lowC: 16, highF: 75, lowF: 61, rain: '05%' },
      { day: 'Sat', date: '21 Jun', icon: Sun, highC: 27, lowC: 18, highF: 81, lowF: 64, rain: '00%' },
      { day: 'Sun', date: '22 Jun', icon: Sun, highC: 26, lowC: 17, highF: 79, lowF: 63, rain: '00%' },
    ],
  },
]

function WeatherMark() {
  return (
    <div className="weather-mark">
      <span />
      <span />
      <span />
    </div>
  )
}

export default function Page() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [activePersona, setActivePersona] = useState<PersonaType>('all')
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C')
  const [windUnit, setWindUnit] = useState<'km/h' | 'mph' | 'knots'>('km/h')
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [currentLocation, setCurrentLocation] = useState<LocationData>(availableLocations[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileFrameOpen, setIsMobileFrameOpen] = useState(false)

  // Notifications with interactive read/dismiss state
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Optimal Running Window Open',
      desc: 'Air quality is 32 AQI and temperature is 21°C until 9:00 AM.',
      icon: Activity,
      color: 'bg-[#edf6f1] border-[#d6e7dc] text-[#1e483b]',
      unread: true,
    },
    {
      id: '2',
      title: 'Flight Weather Alert (LHR)',
      desc: 'Low cloud ceiling at London Heathrow. Buffer +15 min arrival delay.',
      icon: Plane,
      color: 'bg-[#fcf5eb] border-[#f2dac2] text-[#8a5522]',
      unread: true,
    },
    {
      id: '3',
      title: 'Coastal High Tide Surge (Gokarna)',
      desc: '1.85m peak tide at 10:24 AM. Clean 1.4m peeling swell.',
      icon: Waves,
      color: 'bg-[#f0f6f7] border-[#d2e4e6] text-[#256068]',
      unread: true,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const toggleTempUnit = () => {
    setTempUnit((prev) => (prev === 'C' ? 'F' : 'C'))
  }

  const selectLocationById = (locId: string) => {
    const found = availableLocations.find((l) => l.id === locId)
    if (found) {
      setCurrentLocation(found)
      setShowLocationPicker(false)
      setShowSearch(false)
      setSearchQuery('')
    }
  }

  // Handle Search Execution
  const handleSelectSearchCity = (loc: LocationData) => {
    setCurrentLocation(loc)
    setShowSearch(false)
    setSearchQuery('')
  }

  const handleCustomSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const match = availableLocations.find((l) =>
      l.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )
    if (match) {
      handleSelectSearchCity(match)
    } else {
      // Create ad-hoc location profile for search query
      const newLoc: LocationData = {
        id: `custom-${Date.now()}`,
        name: searchQuery.trim(),
        region: 'Global City',
        tempC: 22,
        tempF: 72,
        condition: 'Clear Sky',
        feelsLikeNote: 'Mild & pleasant temperature',
        highC: 24,
        lowC: 16,
        highF: 75,
        lowF: 61,
        humidity: '50%',
        windKm: 14,
        uv: '4 Moderate',
        aqi: '28 AQI',
        greetingSub: `Real-time forecast active for ${searchQuery.trim()}. Weather conditions are stable and clear.`,
        rhythmText: 'Conditions are balanced for outdoor routines today.',
        forecast: [
          { day: 'Today', date: '18 Jun', icon: Sun, highC: 24, lowC: 16, highF: 75, lowF: 61, rain: '05%' },
          { day: 'Thu', date: '19 Jun', icon: Sun, highC: 25, lowC: 17, highF: 77, lowF: 63, rain: '00%' },
          { day: 'Fri', date: '20 Jun', icon: Wind, highC: 23, lowC: 15, highF: 73, lowF: 59, rain: '10%' },
          { day: 'Sat', date: '21 Jun', icon: Droplets, highC: 21, lowC: 14, highF: 70, lowF: 57, rain: '40%' },
          { day: 'Sun', date: '22 Jun', icon: Sun, highC: 23, lowC: 16, highF: 73, lowF: 61, rain: '15%' },
        ],
      }
      setCurrentLocation(newLoc)
      setShowSearch(false)
      setSearchQuery('')
    }
  }

  const filteredSearchLocations = availableLocations.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.region.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentTemp = tempUnit === 'C' ? `${currentLocation.tempC}` : `${currentLocation.tempF}`
  const highTemp = tempUnit === 'C' ? `${currentLocation.highC}°` : `${currentLocation.highF}°`
  const lowTemp = tempUnit === 'C' ? `${currentLocation.lowC}°` : `${currentLocation.lowF}°`

  const formatWind = (kmh: number) => {
    if (windUnit === 'mph') return `${Math.round(kmh * 0.621371)} mph`
    if (windUnit === 'knots') return `${Math.round(kmh * 0.539957)} kts`
    return `${kmh} km/h`
  }

  return (
    <main className="min-h-screen bg-[#f5f6f2] text-[#18272b]">
      {/* Mobile Backdrop Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/35 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-[#dfe5de] bg-[#f8faf6] px-6 py-7 transition-transform duration-300 ease-out lg:translate-x-0 ${
          showMenu ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="mb-12 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <WeatherMark />
            <span className="font-display text-[23px] tracking-[-0.06em]">mausam</span>
          </div>
          <button
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#edf2ee] lg:hidden cursor-pointer"
            onClick={() => setShowMenu(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Navigation Items */}
        <nav className="flex flex-col gap-1.5" aria-label="Main navigation">
          {[
            {
              label: 'Overview',
              icon: Compass,
              onClick: () => {
                setActiveNav('Overview')
                setActivePersona('all')
                setShowMenu(false)
              },
            },
            {
              label: 'My locations',
              icon: MapPin,
              onClick: () => {
                setActiveNav('My locations')
                setActivePersona('travel')
                setShowMenu(false)
                const target = document.getElementById('saved-places-section')
                if (target) target.scrollIntoView({ behavior: 'smooth' })
              },
            },
            {
              label: 'Calendar',
              icon: CalendarDays,
              onClick: () => {
                setActiveNav('Calendar')
                setShowDetails(true)
                setShowMenu(false)
              },
            },
          ].map(({ label, icon: Icon, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className={`nav-item cursor-pointer ${activeNav === label ? 'nav-item-active' : ''}`}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Persona Quick Filters in Sidebar */}
        <div className="mt-7 border-t border-[#dfe5de] pt-4">
          <p className="eyebrow mb-2 text-[#778b82]">Personal Lenses</p>
          <div className="flex flex-col gap-1 text-xs">
            {[
              { id: 'all' as PersonaType, label: 'Full Dashboard', icon: Sparkles },
              { id: 'health' as PersonaType, label: 'Health & Air', icon: HeartPulse },
              { id: 'fitness' as PersonaType, label: 'Outdoor Fitness', icon: Activity },
              { id: 'beach' as PersonaType, label: 'Coast & Surf', icon: Waves },
              { id: 'travel' as PersonaType, label: 'Travel & Flights', icon: Plane },
              { id: 'family' as PersonaType, label: 'Family Commute', icon: School },
            ].map((p) => {
              const Icon = p.icon
              const isSelected = activePersona === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePersona(p.id)
                    setActiveNav('Overview')
                    setShowMenu(false)
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#e4eee8] font-semibold text-[#245445]'
                      : 'text-[#62776f] hover:bg-[#edf2ee] hover:text-[#18272b]'
                  }`}
                >
                  <Icon size={14} />
                  <span>{p.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto flex flex-col gap-3">
          <div className="rounded-2xl bg-[#e7efe9] p-4">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#60756c]">
              <Sparkles size={13} /> Your rhythm
            </div>
            <p className="font-display text-[15px] leading-tight text-[#243b35]">
              {currentLocation.rhythmText.split('.')[0]}.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#60756c]">
              {currentLocation.rhythmText.split('.')[1] || 'Optimized for your routine.'}
            </p>
          </div>

          {/* Preferences Button */}
          <button
            onClick={() => {
              setShowPreferences(true)
              setShowMenu(false)
            }}
            className="nav-item cursor-pointer text-xs"
          >
            <Settings2 size={17} />
            <span>Preferences</span>
          </button>

          {/* Profile & Temp Switcher */}
          <div className="flex items-center justify-between border-t border-[#dfe5de] pt-3.5">
            <div className="flex items-center gap-2.5">
              <div className="avatar">AR</div>
              <div>
                <p className="text-xs font-semibold text-[#1c2c2f]">Aarav Rao</p>
                <p className="text-[11px] text-[#70827c] truncate max-w-[100px]">
                  {currentLocation.name.split(',')[0]}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTempUnit}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#d6e2dc] bg-[#eef5f1] hover:bg-[#e2ede7] text-[#2c5849] transition-colors cursor-pointer"
              title="Toggle Celsius / Fahrenheit"
            >
              °{tempUnit}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-[248px]">
        {/* Header Bar */}
        <header className="relative flex items-center justify-between px-3 sm:px-8 lg:px-12 py-3 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              aria-label="Open menu"
              className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-xl border border-[#dfe5de] bg-[#f8faf6] lg:hidden cursor-pointer"
              onClick={() => setShowMenu(true)}
            >
              <Menu size={18} />
            </button>

            {/* Interactive Location Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLocationPicker(!showLocationPicker)
                  setShowSearch(false)
                  setShowNotifications(false)
                }}
                className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-[#dfe5de] bg-[#f8faf6] px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm text-[#4d635c] hover:bg-[#edf2ee] transition-colors cursor-pointer"
              >
                <MapPin size={13} className="text-[#3c7865] shrink-0" />
                <span className="font-medium truncate max-w-[120px] sm:max-w-[210px]">
                  {currentLocation.name}
                </span>
                <ChevronDown size={12} className="text-[#7d9089] shrink-0" />
              </button>

              {showLocationPicker && (
                <div className="glass-popover absolute left-0 top-11 z-30 w-72 rounded-2xl p-2 animate-fade-in shadow-xl">
                  <p className="eyebrow px-3 pt-2 pb-1 text-[#6b8076]">Switch Active Location</p>
                  <div className="mt-1 space-y-1">
                    {availableLocations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => selectLocationById(loc.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                          loc.id === currentLocation.id
                            ? 'bg-[#e4eee8] font-semibold text-[#1e4438]'
                            : 'hover:bg-[#edf3ee] text-[#334b42]'
                        }`}
                      >
                        <div>
                          <p className="font-medium">{loc.name}</p>
                          <p className="text-[10px] text-[#71867e]">{loc.condition} • {loc.aqi}</p>
                        </div>
                        <span className="font-display text-sm">
                          {tempUnit === 'C' ? `${loc.tempC}°` : `${loc.tempF}°`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Mobile Device Simulation Toggle - Only on desktop/tablet */}
            <button
              onClick={() => setIsMobileFrameOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#dfe5de] bg-[#f8faf6] px-3 py-1 text-xs font-semibold text-[#255243] hover:bg-[#e6efe9] transition-all cursor-pointer shadow-xs"
              title="Preview inside smartphone mockup frame"
            >
              <Smartphone size={14} className="text-[#347862]" />
              <span>Mobile Frame</span>
            </button>

            {/* Temperature Switcher Pill */}
            <button
              onClick={toggleTempUnit}
              className="flex items-center rounded-full border border-[#dfe5de] bg-[#f8faf6] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-[#486259] hover:bg-[#e7efe9] transition-all cursor-pointer"
            >
              <span className={tempUnit === 'C' ? 'text-[#204a3c] font-bold' : 'text-[#879d94]'}>°C</span>
              <span className="mx-1 text-[#b5c7c0]">/</span>
              <span className={tempUnit === 'F' ? 'text-[#204a3c] font-bold' : 'text-[#879d94]'}>°F</span>
            </button>

            {/* Search Button */}
            <button
              className="icon-button size-8 sm:size-[39px] cursor-pointer"
              aria-label="Search weather"
              onClick={() => {
                setShowSearch(!showSearch)
                setShowNotifications(false)
                setShowLocationPicker(false)
              }}
            >
              <Search size={15} />
            </button>

            {/* Notifications Button */}
            <button
              className="icon-button size-8 sm:size-[39px] cursor-pointer"
              aria-label="Notifications"
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowSearch(false)
                setShowLocationPicker(false)
              }}
            >
              <Bell size={15} />
              {unreadCount > 0 && <i />}
            </button>
          </div>

          {/* Search Dropdown Modal with Real Filter & Suggestions */}
          {showSearch && (
            <div className="glass-popover absolute right-3 sm:right-8 lg:right-12 top-14 sm:top-16 z-30 w-72 sm:w-96 rounded-2xl p-3 shadow-2xl animate-fade-in">
              <form onSubmit={handleCustomSearchSubmit} className="flex items-center gap-2 border-b border-[#dfe8e2] pb-2">
                <Search size={15} className="text-[#5b736b] shrink-0" />
                <input
                  autoFocus
                  aria-label="Search weather"
                  placeholder="Search city, beach, or airport..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder:text-[#8e9f98] text-[#1c382f]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-[#7d9289] hover:text-[#214338] cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </form>

              {/* Suggestions / Matches */}
              <div className="mt-2.5 max-h-56 overflow-y-auto space-y-1">
                <p className="text-[10px] uppercase font-bold text-[#7a8f87] px-2 py-1">
                  {searchQuery ? 'Matching Locations' : 'Quick Access Locations'}
                </p>
                {filteredSearchLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectSearchCity(loc)}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-[#eaf2ec] transition-colors cursor-pointer text-xs"
                  >
                    <div>
                      <p className="font-semibold text-[#1c382f]">{loc.name}</p>
                      <p className="text-[10px] text-[#6d8179]">{loc.condition} • Air {loc.aqi}</p>
                    </div>
                    <span className="font-display text-sm font-semibold text-[#255243]">
                      {tempUnit === 'C' ? `${loc.tempC}°` : `${loc.tempF}°`}
                    </span>
                  </button>
                ))}
                {filteredSearchLocations.length === 0 && (
                  <button
                    onClick={handleCustomSearchSubmit}
                    className="w-full text-left p-2 rounded-xl text-xs text-[#2c5848] bg-[#edf5f0] hover:bg-[#e4ede7] cursor-pointer"
                  >
                    Search &quot;<strong>{searchQuery}</strong>&quot; worldwide &rarr;
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Interactive Notifications Popover */}
          {showNotifications && (
            <div className="glass-popover absolute right-3 sm:right-8 lg:right-12 top-14 sm:top-16 z-30 w-72 sm:w-80 rounded-2xl p-3.5 sm:p-4 shadow-2xl animate-fade-in">
              <div className="flex items-center justify-between border-b border-[#e1ece5] pb-2">
                <div>
                  <p className="eyebrow text-[#587a6d]">Mausam Live Intelligence</p>
                  <p className="text-[10px] sm:text-[11px] text-[#71867e]">{notifications.length} active advisories</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-semibold text-[#2f6755] hover:text-[#1d4739] cursor-pointer"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="mt-2.5 space-y-2 text-xs max-h-72 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon
                  return (
                    <div
                      key={n.id}
                      className={`relative p-2.5 rounded-xl border transition-all ${n.color} ${
                        n.unread ? 'ring-1 ring-[#3a836d]/30' : 'opacity-85'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 font-semibold text-xs">
                          <Icon size={13} className="shrink-0" />
                          <span>{n.title}</span>
                        </div>
                        <button
                          onClick={() => dismissNotification(n.id)}
                          className="opacity-50 hover:opacity-100 cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed opacity-90 pl-5">
                        {n.desc}
                      </p>
                    </div>
                  )
                })}
                {notifications.length === 0 && (
                  <div className="py-5 text-center text-xs text-[#71887f]">
                    <Check size={18} className="mx-auto mb-1 text-[#438a72]" />
                    <p className="font-semibold text-[#213f35]">You&apos;re all caught up</p>
                    <p className="text-[10px] text-[#799086]">No unread alerts.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Dashboard Canvas Container */}
        <div className="mx-auto max-w-[1380px] px-3.5 pb-16 sm:px-8 lg:px-12">
          {/* Greeting Section */}
          <section className="mb-4 sm:mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Wednesday, 18 June 2025 • {currentLocation.name.split(',')[0]}</p>
              <h1 className="font-display mt-1 sm:mt-2 max-w-[650px] text-[clamp(2.1rem,4.8vw,4.5rem)] leading-[.92] tracking-[-0.07em]">
                Good morning,<br />
                <em>Aarav.</em>
              </h1>
            </div>
            <div className="max-w-full sm:max-w-[340px] border-l-2 border-[#b9d7c4] pl-3 sm:pl-4 text-xs sm:text-sm leading-relaxed text-[#65766f]">
              <span className="mb-0.5 block font-semibold text-[#2c4e43]">
                {currentLocation.condition} outlook.
              </span>
              {currentLocation.greetingSub}
            </div>
          </section>

          {/* Hero Weather Display */}
          <section className="hero-weather relative overflow-hidden rounded-[20px] sm:rounded-[26px] bg-[#1c3f4a] p-4 sm:p-8 lg:p-12 text-white">
            <img
              src="/mausam-hero.png"
              alt="Weather horizon"
              className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#163a43] via-[#163a43]/85 to-transparent" />
            <div className="relative flex h-full flex-col justify-between gap-6 sm:gap-10 lg:flex-row lg:items-end">
              <div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#c9ddd8]">
                  <Sun size={15} className="text-[#f7b764]" fill="currentColor" />
                  <span className="truncate">{currentLocation.feelsLikeNote}</span>
                </div>
                <div className="mt-2.5 sm:mt-4 flex items-start">
                  <span className="font-display text-[clamp(4.2rem,11vw,9.5rem)] leading-[.8] tracking-[-0.08em]">
                    {currentTemp}
                  </span>
                  <span className="mt-1 sm:mt-3 font-display text-2xl sm:text-4xl text-[#d4e6e0] ml-1">
                    °{tempUnit}
                  </span>
                </div>
                <p className="mt-2.5 sm:mt-4 text-sm sm:text-lg text-[#d8e5df]">
                  {currentLocation.condition}{' '}
                  <span className="mx-1 sm:mx-2 text-[#73938d]">/</span> High {highTemp}{' '}
                  <span className="mx-1 sm:mx-2 text-[#73938d]">/</span> Low {lowTemp}
                </p>
              </div>

              {/* Quick Environmental Metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-7 border-t border-white/10 pt-3 sm:pt-4 lg:border-t-0 lg:pt-0 lg:pr-2">
                <div>
                  <p className="metric-label">Humidity</p>
                  <p className="metric-value">{currentLocation.humidity}</p>
                </div>
                <div>
                  <p className="metric-label">Wind</p>
                  <p className="metric-value">
                    {formatWind(currentLocation.windKm)}
                  </p>
                </div>
                <div>
                  <p className="metric-label">UV index</p>
                  <p className="metric-value">{currentLocation.uv}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Persona Lens Navigation Selector */}
          <section className="mt-6 mb-2">
            <div className="flex items-center justify-between pb-2">
              <span className="eyebrow text-[#58796d]">Personalized Homepage Lenses</span>
              <span className="text-[11px] text-[#71857c] hidden sm:inline">
                Tailored for health, movement, surfing, travel & family
              </span>
            </div>
            <PersonaNav activePersona={activePersona} onChange={setActivePersona} />
          </section>

          {/* Dynamic Content based on Active Persona */}
          <div className="space-y-6 mt-4">
            {/* LENS: ALL (Harmonious full overview) */}
            {activePersona === 'all' && (
              <>
                {/* Forecast at a glance + Morning Movement */}
                <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                  <div className="surface p-4 sm:p-6 lg:p-8">
                    <div className="mb-4 sm:mb-6 flex items-center justify-between">
                      <div>
                        <p className="eyebrow">The next five days</p>
                        <h2 className="section-title">Forecast at a glance</h2>
                      </div>
                      <button
                        className="text-button cursor-pointer"
                        onClick={() => setShowDetails(!showDetails)}
                      >
                        {showDetails ? 'Hide details' : 'View details'} <ArrowUpRight size={15} />
                      </button>
                    </div>

                    {showDetails && (
                      <div className="detail-strip mb-4 sm:mb-5 rounded-xl p-3 text-xs text-[#4c665e] animate-fade-in">
                        Extended forecast across {currentLocation.name}. Clear stretches dominate daytime windows. Precipitation probability is tracked hourly.
                      </div>
                    )}

                    <div className="forecast-grid">
                      {currentLocation.forecast.map(({ day, date, icon: Icon, highC, lowC, highF, lowF, rain }) => {
                        const h = tempUnit === 'C' ? `${highC}°` : `${highF}°`
                        const l = tempUnit === 'C' ? `${lowC}°` : `${lowF}°`
                        return (
                          <div key={day} className="forecast-day">
                            <p className="font-semibold text-xs sm:text-sm">{day}</p>
                            <p className="text-[10px] sm:text-xs text-[#81908a]">{date}</p>
                            <Icon className="my-2 sm:my-4 text-[#f0a94d]" size={22} strokeWidth={1.6} />
                            <p className="text-sm sm:text-lg font-semibold text-[#1d352e]">
                              {h} <span className="text-[#a3afaa] font-normal text-xs sm:text-base">{l}</span>
                            </p>
                            <p className="mt-1 text-[10px] sm:text-xs text-[#81908a]">{rain} rain</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Morning Movement Card */}
                  <div className="surface flex flex-col justify-between bg-[#dfeee7] p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="eyebrow text-[#5c776e]">Outdoor Fitness</p>
                        <h2 className="section-title">Morning movement</h2>
                      </div>
                      <Activity className="text-[#4e8876]" size={24} strokeWidth={1.5} />
                    </div>

                    <div className="my-4 sm:my-6 flex items-center gap-4 sm:gap-5">
                      <div className="donut shrink-0">
                        <span>95</span>
                        <small>good to go</small>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-[#4d6960] max-w-[200px]">
                        The prime window for a run is between <strong className="text-[#294f43]">6:30–8:45 AM</strong> today.
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#c9dfd4] pt-3 sm:pt-4 text-xs sm:text-sm">
                      <span className="text-[#668178]">Heat Strain</span>
                      <span className="font-semibold text-[#2f6958] flex items-center">
                        Low <span className="ml-2 inline-block size-2 rounded-full bg-[#4d9a78]" />
                      </span>
                    </div>
                  </div>
                </section>

                {/* Persona Module: Health & Air Quality */}
                <section className="grid gap-5">
                  <HealthAirCard unit={tempUnit} />
                </section>

                {/* Persona Module: Outdoor Fitness Windows & Light Arc */}
                <section className="grid gap-5">
                  <OutdoorFitnessCard unit={tempUnit} windUnit={windUnit} />
                </section>

                {/* Persona Module: Coast, Ocean & Wave Dynamics */}
                <section className="grid gap-5">
                  <CoastSurfCard unit={tempUnit} />
                </section>

                {/* Persona Module: Travelers & Saved Places */}
                <section className="grid gap-5">
                  <TravelersCard
                    unit={tempUnit}
                    onSelectCityWeather={(city) => {
                      const match = availableLocations.find((l) =>
                        l.name.toLowerCase().includes(city.toLowerCase())
                      )
                      if (match) setCurrentLocation(match)
                    }}
                  />
                </section>

                {/* Persona Module: Parents & Family School Commute */}
                <section className="grid gap-5">
                  <FamilyCommuteCard unit={tempUnit} />
                </section>
              </>
            )}

            {/* LENS: HEALTH ONLY */}
            {activePersona === 'health' && (
              <div className="space-y-5 animate-fade-in">
                <HealthAirCard unit={tempUnit} />
                <div className="surface p-4 sm:p-6 lg:p-8">
                  <p className="eyebrow">5-Day Environmental Outlook</p>
                  <h3 className="section-title text-xl mb-4">Allergy & Respiratory Forecast</h3>
                  <div className="forecast-grid">
                    {currentLocation.forecast.map(({ day, date, icon: Icon, rain }) => (
                      <div key={day} className="forecast-day">
                        <p className="font-semibold text-xs sm:text-sm">{day}</p>
                        <p className="text-[10px] sm:text-xs text-[#81908a]">{date}</p>
                        <Icon className="my-2 sm:my-4 text-[#4f8d77]" size={22} strokeWidth={1.6} />
                        <p className="text-xs sm:text-sm font-semibold text-[#326955]">AQI 28–36</p>
                        <p className="mt-1 text-[10px] sm:text-xs text-[#7d938b]">{rain} rain</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* LENS: FITNESS ONLY */}
            {activePersona === 'fitness' && (
              <div className="space-y-5 animate-fade-in">
                <OutdoorFitnessCard unit={tempUnit} windUnit={windUnit} />
                <div className="surface p-4 sm:p-6 lg:p-8">
                  <p className="eyebrow">Weekly Cardio Rhythm</p>
                  <h3 className="section-title text-xl mb-4">Optimal Run Windows this Week</h3>
                  <div className="forecast-grid">
                    {currentLocation.forecast.map(({ day, date, highC, lowC, highF, lowF }) => {
                      const h = tempUnit === 'C' ? `${highC}°` : `${highF}°`
                      const l = tempUnit === 'C' ? `${lowC}°` : `${lowF}°`
                      return (
                        <div key={day} className="forecast-day">
                          <p className="font-semibold text-xs sm:text-sm">{day}</p>
                          <p className="text-[10px] sm:text-xs text-[#81908a]">{date}</p>
                          <Activity className="my-2 sm:my-4 text-[#39806a]" size={22} />
                          <p className="text-xs sm:text-sm font-semibold text-[#255243]">{h} / {l}</p>
                          <p className="mt-1 text-[10px] sm:text-xs text-[#4d7e6c]">6:30–8:30 AM</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* LENS: BEACH & SURF ONLY */}
            {activePersona === 'beach' && (
              <div className="space-y-5 animate-fade-in">
                <CoastSurfCard unit={tempUnit} />
                <div className="surface p-4 sm:p-6 lg:p-8">
                  <p className="eyebrow">Coastal Swell Outlook</p>
                  <h3 className="section-title text-xl mb-4">5-Day Marine Conditions</h3>
                  <div className="forecast-grid">
                    {currentLocation.forecast.map(({ day, date }) => (
                      <div key={day} className="forecast-day">
                        <p className="font-semibold text-xs sm:text-sm">{day}</p>
                        <p className="text-[10px] sm:text-xs text-[#81908a]">{date}</p>
                        <Waves className="my-2 sm:my-4 text-[#2f7d86]" size={22} />
                        <p className="text-xs sm:text-sm font-semibold text-[#1a4f56]">1.2m – 1.6m</p>
                        <p className="mt-1 text-[10px] sm:text-xs text-[#63878c]">Clean offshore</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* LENS: TRAVEL ONLY */}
            {activePersona === 'travel' && (
              <div className="space-y-5 animate-fade-in">
                <TravelersCard
                  unit={tempUnit}
                  onSelectCityWeather={(city) => {
                    const match = availableLocations.find((l) =>
                      l.name.toLowerCase().includes(city.toLowerCase())
                    )
                    if (match) setCurrentLocation(match)
                  }}
                />
              </div>
            )}

            {/* LENS: FAMILY & COMMUTE ONLY */}
            {activePersona === 'family' && (
              <div className="space-y-5 animate-fade-in">
                <FamilyCommuteCard unit={tempUnit} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preferences Modal Dialog */}
      <PreferencesModal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        tempUnit={tempUnit}
        onTempUnitChange={setTempUnit}
        windUnit={windUnit}
        onWindUnitChange={setWindUnit}
        defaultPersona={activePersona}
        onDefaultPersonaChange={(p) => setActivePersona(p)}
        alertsEnabled={alertsEnabled}
        onToggleAlerts={() => setAlertsEnabled(!alertsEnabled)}
      />

      {/* Mobile Smartphone Frame Simulation */}
      {isMobileFrameOpen && (
        <MobileDeviceFrame
          onClose={() => setIsMobileFrameOpen(false)}
          activeNav={activeNav}
          onNavChange={(nav) => {
            setActiveNav(nav)
            if (nav === 'Overview') setActivePersona('all')
            if (nav === 'My locations') setActivePersona('travel')
            if (nav === 'Calendar') setShowDetails(!showDetails)
          }}
          onOpenPreferences={() => setShowPreferences(true)}
        >
          <div className="mobile-frame-view p-3.5 space-y-3.5 text-[#18272b] min-w-0 max-w-full">
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WeatherMark />
                <span className="font-display text-xl tracking-tight">mausam</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTempUnit}
                  className="text-[11px] font-bold px-2 py-0.5 rounded-lg border border-[#d6e2dc] bg-[#eef5f1] text-[#2c5849] cursor-pointer"
                >
                  °{tempUnit}
                </button>
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="icon-button size-7 text-xs cursor-pointer"
                >
                  <Search size={13} />
                </button>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="icon-button size-7 text-xs cursor-pointer"
                >
                  <Bell size={13} />
                  {unreadCount > 0 && <i />}
                </button>
              </div>
            </div>

            {/* Location Selector Pill */}
            <button
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="flex items-center gap-1.5 rounded-full border border-[#dfe5de] bg-white px-3 py-1 text-xs text-[#3a584d] shadow-xs cursor-pointer"
            >
              <MapPin size={13} className="text-[#3c7865]" />
              <span className="font-medium truncate max-w-[190px]">{currentLocation.name}</span>
              <ChevronDown size={12} className="text-[#7d9089]" />
            </button>

            {/* Mobile Hero Weather Card */}
            <div className="hero-weather relative overflow-hidden rounded-[22px] bg-[#1c3f4a] p-4 text-white">
              <img
                src="/mausam-hero.png"
                alt="Weather"
                className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#163a43] via-[#163a43]/85 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-1.5 text-xs text-[#c9ddd8]">
                  <Sun size={15} className="text-[#f7b764]" fill="currentColor" />
                  <span className="truncate">{currentLocation.feelsLikeNote}</span>
                </div>
                <div className="mt-2.5 flex items-start">
                  <span className="font-display text-5xl leading-[0.85] tracking-tight">{currentTemp}</span>
                  <span className="font-display text-xl text-[#d4e6e0] ml-1">°{tempUnit}</span>
                </div>
                <p className="mt-2 text-xs text-[#d8e5df]">
                  {currentLocation.condition} • High {highTemp} • Low {lowTemp}
                </p>

                {/* Mobile Environmental Metrics */}
                <div className="mt-3.5 grid grid-cols-3 gap-1.5 border-t border-white/10 pt-2.5 text-center">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-[#a7c4bd]">Humidity</p>
                    <p className="text-xs font-semibold mt-0.5">{currentLocation.humidity}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-[#a7c4bd]">Wind</p>
                    <p className="text-xs font-semibold mt-0.5">{formatWind(currentLocation.windKm)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-[#a7c4bd]">UV Index</p>
                    <p className="text-xs font-semibold mt-0.5">{currentLocation.uv.split(' ')[0]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Persona Tabs Scroller */}
            <div>
              <PersonaNav activePersona={activePersona} onChange={setActivePersona} />
            </div>

            {/* Active Persona Cards */}
            <div className="space-y-3.5 pb-2">
              {activePersona === 'all' && (
                <>
                  {/* 5-day forecast */}
                  <div className="surface p-3.5">
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="font-display text-sm">5-Day Outlook</h4>
                      <span className="text-[10px] text-[#698278]">{currentLocation.name.split(',')[0]}</span>
                    </div>
                    <div className="forecast-grid">
                      {currentLocation.forecast.map(({ day, icon: Icon, highC, lowC, highF, lowF, rain }) => {
                        const h = tempUnit === 'C' ? `${highC}°` : `${highF}°`
                        return (
                          <div key={day} className="forecast-day">
                            <p className="font-semibold text-[11px]">{day}</p>
                            <Icon className="my-1.5 text-[#f0a94d]" size={16} />
                            <p className="text-[11px] font-semibold">{h}</p>
                            <p className="text-[9px] text-[#81908a]">{rain}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <HealthAirCard unit={tempUnit} isCompact={true} />
                  <OutdoorFitnessCard unit={tempUnit} windUnit={windUnit} isCompact={true} />
                  <CoastSurfCard unit={tempUnit} isCompact={true} />
                  <TravelersCard
                    unit={tempUnit}
                    isCompact={true}
                    onSelectCityWeather={(city) => {
                      const match = availableLocations.find((l) =>
                        l.name.toLowerCase().includes(city.toLowerCase())
                      )
                      if (match) setCurrentLocation(match)
                    }}
                  />
                  <FamilyCommuteCard unit={tempUnit} isCompact={true} />
                </>
              )}

              {activePersona === 'health' && <HealthAirCard unit={tempUnit} isCompact={true} />}
              {activePersona === 'fitness' && <OutdoorFitnessCard unit={tempUnit} windUnit={windUnit} isCompact={true} />}
              {activePersona === 'beach' && <CoastSurfCard unit={tempUnit} isCompact={true} />}
              {activePersona === 'travel' && (
                <TravelersCard
                  unit={tempUnit}
                  isCompact={true}
                  onSelectCityWeather={(city) => {
                    const match = availableLocations.find((l) =>
                      l.name.toLowerCase().includes(city.toLowerCase())
                    )
                    if (match) setCurrentLocation(match)
                  }}
                />
              )}
              {activePersona === 'family' && <FamilyCommuteCard unit={tempUnit} isCompact={true} />}
            </div>
          </div>
        </MobileDeviceFrame>
      )}
    </main>
  )
}
