'use client'

import {
  Sparkles,
  HeartPulse,
  Activity,
  Waves,
  Plane,
  School,
  SlidersHorizontal,
} from 'lucide-react'

export type PersonaType = 'all' | 'health' | 'fitness' | 'beach' | 'travel' | 'family'

interface PersonaNavProps {
  activePersona: PersonaType
  onChange: (persona: PersonaType) => void
}

const personas: { id: PersonaType; label: string; icon: React.ComponentType<{ size?: number; className?: string }>; badge?: string }[] = [
  { id: 'all', label: 'All Lenses', icon: Sparkles },
  { id: 'health', label: 'Health & Air', icon: HeartPulse, badge: 'Good 32' },
  { id: 'fitness', label: 'Outdoor Fitness', icon: Activity, badge: '95/100' },
  { id: 'beach', label: 'Coast & Surf', icon: Waves, badge: 'Clean 1.4m' },
  { id: 'travel', label: 'Travel & Flights', icon: Plane, badge: '1 Alert' },
  { id: 'family', label: 'Family & Commute', icon: School, badge: 'Clear' },
]

export function PersonaNav({ activePersona, onChange }: PersonaNavProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-1 no-scrollbar w-full min-w-0 max-w-full overscroll-x-contain">
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {personas.map((p) => {
          const Icon = p.icon
          const isActive = activePersona === p.id
          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              className={`pill-tab text-xs sm:text-sm shrink-0 transition-all duration-200 ${
                isActive
                  ? 'pill-tab-active'
                  : 'bg-[#edf3ee]/70 text-[#50665d] hover:bg-[#e4ede6] hover:text-[#1e3b31] border-[#dce6df]'
              }`}
            >
              <Icon size={15} />
              <span>{p.label}</span>
              {p.badge && (
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#dfebe3] text-[#346251]'
                  }`}
                >
                  {p.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
