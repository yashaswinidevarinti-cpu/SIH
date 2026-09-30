'use client'

import React from 'react'
import {
  Wifi,
  Battery,
  Compass,
  MapPin,
  Bell,
  Settings2,
  Smartphone,
  Maximize2,
} from 'lucide-react'

interface MobileDeviceFrameProps {
  children: React.ReactNode
  onClose: () => void
  activeNav: string
  onNavChange: (nav: string) => void
  onOpenPreferences: () => void
}

export function MobileDeviceFrame({
  children,
  onClose,
  activeNav,
  onNavChange,
  onOpenPreferences,
}: MobileDeviceFrameProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111f24]/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fade-in">
      {/* Top Floating Control Bar */}
      <div className="fixed top-2.5 sm:top-4 left-1/2 -translate-x-1/2 z-60 flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full shadow-xl border border-[#d6e0db] text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-[#18342b]">
          <Smartphone size={15} className="text-[#3a836d]" />
          <span className="text-[11px] sm:text-xs">iPhone 16 Pro View</span>
        </div>
        <div className="h-3.5 w-px bg-[#d3dfd8]" />
        <button
          onClick={onClose}
          className="flex items-center gap-1 bg-[#1c3f4a] hover:bg-[#15343d] text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer"
        >
          <Maximize2 size={11} />
          <span>Exit Frame</span>
        </button>
      </div>

      {/* Realistic Smartphone Outer Chassis - Scaled for laptop viewports */}
      <div className="relative my-auto w-full max-w-[380px] h-[86vh] max-h-[780px] min-h-[580px] rounded-[48px] bg-[#1a2327] p-2.5 sm:p-3 shadow-[0_25px_80px_rgba(0,0,0,0.65)] border-[3.5px] border-[#2e3b42] ring-1 ring-white/10 flex flex-col justify-between shrink-0">
        
        {/* Hardware Side Button Accents */}
        <div className="absolute -left-[6px] top-[110px] h-7 w-[2.5px] bg-[#3a474e] rounded-l-xs" /> {/* Volume Up */}
        <div className="absolute -left-[6px] top-[148px] h-7 w-[2.5px] bg-[#3a474e] rounded-l-xs" /> {/* Volume Down */}
        <div className="absolute -right-[6px] top-[130px] h-11 w-[2.5px] bg-[#3a474e] rounded-r-xs" /> {/* Power Button */}

        {/* Inner Screen Display (Curved OLED) */}
        <div className="relative h-full w-full rounded-[38px] bg-[#f5f6f2] overflow-hidden flex flex-col border border-black/10">
          
          {/* Native Phone Status Bar */}
          <div className="relative z-40 flex items-center justify-between px-6 pt-2.5 pb-1.5 text-[11px] font-semibold text-[#18272b] select-none shrink-0 bg-[#f5f6f2]">
            <span>9:41</span>
            
            {/* Dynamic Island Pill */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 h-5 w-24 bg-black rounded-full flex items-center justify-between px-2 shadow-xs">
              <div className="size-2 rounded-full bg-[#1c352d]/80 flex items-center justify-center">
                <div className="size-0.5 rounded-full bg-[#1b7357]" />
              </div>
              <div className="size-1.5 rounded-full bg-[#20272b]" />
            </div>

            <div className="flex items-center gap-1 text-[#18272b]">
              <span className="text-[9px] tracking-tighter font-bold">5G</span>
              <Wifi size={12} strokeWidth={2.5} />
              <Battery size={13} strokeWidth={2.5} />
            </div>
          </div>

          {/* Scrollable Mobile App Canvas */}
          <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth overscroll-contain">
            {children}
          </div>

          {/* Native Mobile App Bottom Navigation Bar */}
          <div className="relative z-40 flex items-center justify-around border-t border-[#dfe5de] bg-[#f8faf6]/95 backdrop-blur-md px-1 py-1.5 shrink-0">
            <button
              onClick={() => onNavChange('Overview')}
              className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-colors cursor-pointer ${
                activeNav === 'Overview' ? 'text-[#235848] font-semibold' : 'text-[#71857c]'
              }`}
            >
              <Compass size={16} />
              <span className="text-[9px]">Today</span>
            </button>

            <button
              onClick={() => onNavChange('My locations')}
              className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-colors cursor-pointer ${
                activeNav === 'My locations' ? 'text-[#235848] font-semibold' : 'text-[#71857c]'
              }`}
            >
              <MapPin size={16} />
              <span className="text-[9px]">Places</span>
            </button>

            <button
              onClick={() => onNavChange('Calendar')}
              className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-colors cursor-pointer ${
                activeNav === 'Calendar' ? 'text-[#235848] font-semibold' : 'text-[#71857c]'
              }`}
            >
              <Bell size={16} />
              <span className="text-[9px]">Alerts</span>
            </button>

            <button
              onClick={onOpenPreferences}
              className="flex flex-col items-center gap-0.5 p-1 rounded-xl text-[#71857c] hover:text-[#235848] transition-colors cursor-pointer"
            >
              <Settings2 size={16} />
              <span className="text-[9px]">Config</span>
            </button>
          </div>

          {/* Home Swipe Indicator Bar */}
          <div className="relative z-40 bg-[#f8faf6] pb-1 pt-0.5 flex justify-center shrink-0">
            <div className="h-1 w-28 rounded-full bg-[#18272b]/35" />
          </div>

        </div>
      </div>
    </div>
  )
}
