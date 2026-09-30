'use client'

import { useState } from 'react'
import { X, Check, SlidersHorizontal, Thermometer, Wind, Eye, Bell } from 'lucide-react'
import type { PersonaType } from './PersonaNav'

interface PreferencesModalProps {
  isOpen: boolean
  onClose: () => void
  tempUnit: 'C' | 'F'
  onTempUnitChange: (unit: 'C' | 'F') => void
  windUnit: 'km/h' | 'mph' | 'knots'
  onWindUnitChange: (unit: 'km/h' | 'mph' | 'knots') => void
  defaultPersona: PersonaType
  onDefaultPersonaChange: (p: PersonaType) => void
  alertsEnabled: boolean
  onToggleAlerts: () => void
}

export function PreferencesModal({
  isOpen,
  onClose,
  tempUnit,
  onTempUnitChange,
  windUnit,
  onWindUnitChange,
  defaultPersona,
  onDefaultPersonaChange,
  alertsEnabled,
  onToggleAlerts,
}: PreferencesModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-md rounded-[24px] border border-[#d6e2db] bg-[#fbfdfa] p-6 shadow-2xl animate-fade-in z-10 text-[#18272b]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e1ece5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#e4eee8] text-[#245949]">
              <SlidersHorizontal size={16} />
            </div>
            <div>
              <h3 className="font-display text-lg tracking-tight">Preferences</h3>
              <p className="text-[11px] text-[#71857d]">Customize your Mausam experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full hover:bg-[#edf2ee] text-[#61746c] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Options */}
        <div className="mt-5 space-y-4">
          {/* Temperature Unit */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#6b8278] flex items-center gap-1.5 mb-2">
              <Thermometer size={14} className="text-[#3c7d69]" /> Temperature Scale
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onTempUnitChange('C')}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                  tempUnit === 'C'
                    ? 'bg-[#e4eee8] border-[#8cbba4] text-[#1c4739] shadow-xs'
                    : 'bg-white/70 border-[#dfe7e2] text-[#4d635a] hover:bg-[#edf3ef]'
                }`}
              >
                <span>Celsius (°C)</span>
                {tempUnit === 'C' && <Check size={14} className="text-[#2b6853]" />}
              </button>
              <button
                onClick={() => onTempUnitChange('F')}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all ${
                  tempUnit === 'F'
                    ? 'bg-[#e4eee8] border-[#8cbba4] text-[#1c4739] shadow-xs'
                    : 'bg-white/70 border-[#dfe7e2] text-[#4d635a] hover:bg-[#edf3ef]'
                }`}
              >
                <span>Fahrenheit (°F)</span>
                {tempUnit === 'F' && <Check size={14} className="text-[#2b6853]" />}
              </button>
            </div>
          </div>

          {/* Wind Speed Unit */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#6b8278] flex items-center gap-1.5 mb-2">
              <Wind size={14} className="text-[#3c7d69]" /> Wind Speed Unit
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['km/h', 'mph', 'knots'] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => onWindUnitChange(unit)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    windUnit === unit
                      ? 'bg-[#e4eee8] border-[#8cbba4] text-[#1c4739] shadow-xs'
                      : 'bg-white/70 border-[#dfe7e2] text-[#4d635a] hover:bg-[#edf3ef]'
                  }`}
                >
                  <span>{unit}</span>
                  {windUnit === unit && <Check size={13} className="text-[#2b6853]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Default Persona Lens */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#6b8278] flex items-center gap-1.5 mb-2">
              <Eye size={14} className="text-[#3c7d69]" /> Default Starting Lens
            </label>
            <select
              value={defaultPersona}
              onChange={(e) => onDefaultPersonaChange(e.target.value as PersonaType)}
              className="w-full rounded-xl border border-[#d6e2dc] bg-white/90 p-2.5 text-xs text-[#203c32] outline-none"
            >
              <option value="all">Full Dashboard (All Lenses)</option>
              <option value="health">Health & Air</option>
              <option value="fitness">Outdoor Fitness</option>
              <option value="beach">Coast & Surf</option>
              <option value="travel">Travel & Flights</option>
              <option value="family">Family Commute</option>
            </select>
          </div>

          {/* Severe Weather Push Notifications */}
          <div className="flex items-center justify-between pt-2 border-t border-[#e2ece5]">
            <div className="flex items-center gap-2">
              <Bell size={15} className="text-[#3c7d69]" />
              <div>
                <p className="text-xs font-semibold text-[#1e3d33]">Severe Weather Alerts</p>
                <p className="text-[11px] text-[#697f76]">Real-time flight and storm notifications</p>
              </div>
            </div>
            <button
              onClick={onToggleAlerts}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                alertsEnabled ? 'bg-[#3b846c]' : 'bg-[#d2ded8]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  alertsEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Done Button */}
        <div className="mt-6 border-t border-[#e1ece5] pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#1c3f4a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#14323c] transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  )
}
