# Mausam (मौसम) — Intelligent Lifestyle Weather Dashboard & Mobile App

> **Transforming raw meteorological forecasts into proactive lifestyle intelligence.**  
> Designed for Smart India Hackathon (SIH 2026) • Aesthetic Minimalist Weather Experience

---

## 🌟 Overview

**Mausam** reimagines the modern weather application by shifting from raw, passive numerical charts to **actionable lifestyle intelligence**. While traditional weather apps simply report temperatures and rain percentages, Mausam contextualizes atmospheric physics into personalized decisions across health, fitness, coastal recreation, air travel, and family routines.

Built with a serene, minimalist **Japanese-Scandinavian aesthetic** (`#f5f6f2` canvas, frosted glassmorphism, and classic serif typography), Mausam delivers both an expansive **Desktop Dashboard** and a responsive **Mobile Smartphone Experience**, complete with an interactive in-browser phone simulation frame.

---

## 🎯 5 Personalized Lifestyle Lenses

Mausam features dedicated, tailored lenses dynamically adapted to user needs:

### 1. 🩺 Health-Conscious & Sensitive Airways
* **Real-time Air Quality Index (AQI)** with safety classifications.
* **Particulate Breakdown**: Detailed inspection for PM2.5, PM10, Ozone ($O_3$), and $NO_2$ relative to WHO thresholds.
* **Allergen Radar**: Daily exposure indicators for Tree, Grass, and Weed pollen.
* **UV & Moisture Index**: Hydration and sun exposure protection advice.

### 2. 🏃 Outdoor Fitness & Athletic Movement
* **Cardio Readiness Score**: Algorithmic 1–100 workout readiness score based on thermal strain, solar angles, and humidity.
* **Optimal Training Windows**: Interactive breakdown of Early Morning, Midday, and Golden Hour running slots.
* **Solar & Light Arc**: Daylight progression tracking sunrise, solar noon, golden hour, and dusk.
* **Wind Pacing & Hydration**: Headwind velocities and water intake recommendations.

### 3. 🏄 Coast, Ocean & Wave Dynamics
* **Live Swell Conditions**: Wave height, swell period, wave direction, and surface chop.
* **Water Temperature & Wetsuit Advisor**: Rashguard and wetsuit recommendations.
* **Tidal Harmonics**: Visual SVG tide sinusoid curve displaying high and low tide cycles and current water gauge.
* **Beach Safety Flags**: Green/Yellow flag swim indicators and rip current warnings.

### 4. ✈️ Travelers & Transit Corridors
* **Saved Route Hub**: Live conditions across global cities with quick-add presets.
* **Flight Corridor Radar**: Proactive inbound airport alerts (e.g., crosswinds, holding patterns, low visibility).
* **Contextual Luggage Advisor**: Interactive packing checklist dynamically generated based on target destination temperatures and precipitation risk.

### 5. 🎒 Parents & Family Commutes
* **School Drop-Off & Pickup Windows**: Dedicated micro-climates for 7:30–8:30 AM drop-offs and 2:45–3:45 PM bell rings.
* **Next 60-Minute Precipitation Radar**: High-frequency rain bar graph tracking incoming showers minute-by-minute.
* **Park & Outdoor Play Timing**: Optimal afternoon hours for playground visits.
* **Kids' Clothing Guidance**: Instant advice on jackets, hats, and rainwear.

---

## 📱 Dual-Mode Experience: Dashboard + Mobile Simulator

* **Full Desktop Dashboard**: Spacious, multi-column dashboard with collapsible navigation, search popover, notifications, and location switcher.
* **Native Smartphone Simulation**: Built-in interactive mobile phone chassis (iPhone 16 Pro mockup) with Dynamic Island, hardware buttons, status bar, and bottom navigation.
* **True Responsive Mobile View**: Optimized for real mobile browsers (320px–430px) with single-column flow, zero horizontal scroll, and swipeable carousels.

---

## 🛠️ Tech Stack & Architecture

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Library**: [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism CSS
* **Icons**: [Lucide React](https://lucide.dev/)
* **Fonts**: `DM Serif Display` (Editorial Serif) & `DM Sans` (Clean Body)
* **Bundler**: Webpack compatibility pipeline (`--webpack`)

---

## 📂 Project Structure

```text
├── app/
│   ├── globals.css              # Custom minimalist styles & mobile overrides
│   ├── layout.tsx               # Root layout & responsive viewport metadata
│   └── page.tsx                 # Main Mausam dashboard & persona lens coordinator
├── components/
│   ├── CoastSurfCard.tsx        # Marine, wave height & tide curve component
│   ├── FamilyCommuteCard.tsx    # School commute & 60-min rain radar component
│   ├── HealthAirCard.tsx        # AQI, particulate & allergen component
│   ├── MobileDeviceFrame.tsx    # Smartphone hardware chassis mockup
│   ├── OutdoorFitnessCard.tsx   # Running windows, solar arc & cardio score
│   ├── PersonaNav.tsx           # Horizontal lens selector pill tabs
│   ├── PreferencesModal.tsx     # °C/°F, wind unit & default lens settings
│   ├── TravelersCard.tsx        # Saved destinations & packing checklist
│   └── WeatherMark.tsx          # Minimalist brand logo mark
├── public/
│   ├── mausam-hero.png          # Atmospheric hero backdrop asset
│   └── ...                      # Static icons and assets
├── presentation_slides.html     # SIH 2026 6-Slide presentation deck
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18.18+ or 20+
* npm, pnpm, or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yashaswinidevarinti-cpu/SIH.git
   cd SIH
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the live dashboard.

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🏆 Smart India Hackathon (SIH 2026) Artifacts

* **Presentation Deck**: Open [`presentation_slides.html`](./presentation_slides.html) in any browser to review the official 6-slide SIH 2026 pitch presentation (includes print-to-PDF styles).
* **Persona Documentation**: Detailed walkthroughs of all 5 personas and synchronization scripts are integrated into the codebase.

---

## 📄 License

This project is licensed under the MIT License.
