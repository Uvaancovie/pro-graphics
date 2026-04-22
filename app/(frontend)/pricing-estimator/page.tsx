'use client'

import React, { useState, useMemo } from 'react'
import { CheckCircle, Info, Calculator, Car, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const VEHICLE_CLASSES = [
  { id: 'small', label: 'Small Hatch/Sedan', range: '15m–17m', baseMin: 18000, baseMax: 32000, icon: Car },
  { id: 'mid', label: 'Mid-size Sedan/Coupe', range: '18m–20m', baseMin: 24000, baseMax: 42000, icon: Car },
  { id: 'large', label: 'Full-size Sedan/Small SUV', range: '20m–23m', baseMin: 30000, baseMax: 52000, icon: Car },
  { id: 'xlarge', label: 'Large SUV/Bakkie/Minivan', range: '23m–30m', baseMin: 38000, baseMax: 65000, icon: Car },
]

const COVERAGE_LEVELS = [
  { id: 'full', label: 'Full Wrap', multiplier: 1 },
  { id: 'partial', label: 'Partial Wrap', multiplier: 0.6 },
  { id: 'commercial', label: 'Commercial Graphics', multiplier: 0.4 },
]

const FILM_CATEGORIES = [
  { id: 'standard', label: 'Standard Gloss/Matte', multiplier: 1 },
  { id: 'premium', label: 'Premium Color Film', multiplier: 1.25 },
  { id: 'specialty', label: 'Specialty (Chrome, Color-shift)', multiplier: 1.6 },
]

export default function PricingEstimatorPage() {
  const [vehicleClass, setVehicleClass] = useState(VEHICLE_CLASSES[0].id)
  const [coverage, setCoverage] = useState(COVERAGE_LEVELS[0].id)
  const [film, setFilm] = useState(FILM_CATEGORIES[0].id)

  const [lengthInput, setLengthInput] = useState('')

  const selectedClass = useMemo(() => VEHICLE_CLASSES.find(c => c.id === vehicleClass)!, [vehicleClass])
  const selectedCoverage = useMemo(() => COVERAGE_LEVELS.find(c => c.id === coverage)!, [coverage])
  const selectedFilm = useMemo(() => FILM_CATEGORIES.find(c => c.id === film)!, [film])

  const calculatedCost = useMemo(() => {
    const covMult = selectedCoverage.multiplier
    const filmMult = selectedFilm.multiplier
    
    // Base contingency factor for prep and difficult curves
    const totalMultiplier = covMult * filmMult
    
    const min = selectedClass.baseMin * totalMultiplier
    const max = selectedClass.baseMax * totalMultiplier

    return { min, max }
  }, [selectedClass, selectedCoverage, selectedFilm])

  const customLengthCalc = useMemo(() => {
    const l = parseFloat(lengthInput)
    if (isNaN(l) || l <= 0) return null
    return (l * 3 + 2.5).toFixed(1) // Average extra
  }, [lengthInput])

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--background)' }}>
      {/* HEADER HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border" style={{ borderColor: 'var(--accent-gold)', background: 'rgba(232,205,165,0.1)', color: 'var(--accent-gold-dark)' }}>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold uppercase tracking-wider">Durban 2026 Edition</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--primary-blue)' }}>
          Vehicle Wrap <span style={{ color: 'var(--accent-gold-dark)' }}>Pricing Estimator</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80" style={{ color: 'var(--foreground)' }}>
          Use this interactive planner to estimate the market rate of south african vehicle branding pricing levels.
        </p>
      </section>

      {/* CALCULATOR TOOL */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#121212] rounded-3xl shadow-2xl overflow-hidden border" style={{ borderColor: 'rgba(79, 115, 142, 0.15)' }}>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 h-full">
            
            {/* LEFT AREA - INPUTS */}
            <div className="lg:col-span-3 p-8 lg:p-12" style={{ background: 'rgba(79, 115, 142, 0.03)' }}>
              
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--primary-blue)' }}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm" style={{ background: 'var(--accent-gold-dark)' }}>1</span>
                  Choose your vehicle class
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {VEHICLE_CLASSES.map(cls => (
                    <button
                      key={cls.id}
                      onClick={() => setVehicleClass(cls.id)}
                      className="p-4 rounded-xl border text-left transition-all duration-200 relative overflow-hidden"
                      style={{
                        borderColor: vehicleClass === cls.id ? 'var(--accent-gold-dark)' : 'rgba(79, 115, 142, 0.2)',
                        background: vehicleClass === cls.id ? 'rgba(232,205,165,0.1)' : 'transparent',
                      }}
                    >
                      <cls.icon className="w-6 h-6 mb-2 opacity-70" style={{ color: vehicleClass === cls.id ? 'var(--accent-gold-dark)' : 'inherit' }} />
                      <div className="font-semibold">{cls.label}</div>
                      <div className="text-sm opacity-60">Typical film: {cls.range}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--primary-blue)' }}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm" style={{ background: 'var(--accent-gold-dark)' }}>2</span>
                  Pick coverage level
                </h3>
                <div className="flex flex-wrap gap-4">
                  {COVERAGE_LEVELS.map(cov => (
                    <button
                      key={cov.id}
                      onClick={() => setCoverage(cov.id)}
                      className="px-6 py-3 rounded-full border font-medium transition-all"
                      style={{
                        borderColor: coverage === cov.id ? 'var(--primary-blue)' : 'rgba(79, 115, 142, 0.2)',
                        background: coverage === cov.id ? 'var(--primary-blue)' : 'transparent',
                        color: coverage === cov.id ? 'white' : 'var(--foreground)'
                      }}
                    >
                      {cov.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--primary-blue)' }}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm" style={{ background: 'var(--accent-gold-dark)' }}>3</span>
                  Pick film category
                </h3>
                <div className="space-y-3">
                  {FILM_CATEGORIES.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFilm(f.id)}
                      className="w-full flex items-center justify-between p-4 rounded-xl border transition-all"
                      style={{
                        borderColor: film === f.id ? 'var(--accent-gold-dark)' : 'rgba(79, 115, 142, 0.2)',
                        background: film === f.id ? 'rgba(232,205,165,0.05)' : 'transparent',
                      }}
                    >
                      <span className="font-semibold">{f.label}</span>
                      {film === f.id && <CheckCircle className="w-5 h-5" style={{ color: 'var(--accent-gold-dark)' }} />}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT AREA - RESULTS */}
            <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-between relative" style={{ background: 'var(--primary-blue)' }}>
              
              <div className="relative z-10 text-white">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Calculator className="w-6 h-6" style={{ color: 'var(--accent-gold)' }} />
                  Estimated Budget Band
                </h3>
                <p className="opacity-80 text-sm mb-8">
                  Includes material tier, size tier, labor complexity, and prep contingency factors.
                </p>

                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10">
                  <div className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-2">South African Market Rate</div>
                  <div className="text-4xl lg:text-5xl font-black tracking-tight" style={{ color: 'var(--accent-gold)' }}>
                    {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(calculatedCost.min)} - {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(calculatedCost.max)}+
                  </div>
                  <div className="mt-4 text-sm opacity-80 flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>These are budget guidelines. Final pricing depends on exact model, finish availability, and installation scope.</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <h4 className="font-bold text-lg mb-2 border-b border-white/20 pb-2">Custom Length Formula</h4>
                  <p className="text-sm opacity-80">Do you know your exact vehicle length? Estimate vinyl needed:</p>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      placeholder="Length in meters (e.g. 4.9)" 
                      value={lengthInput}
                      onChange={e => setLengthInput(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 w-full text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                    />
                  </div>
                  {customLengthCalc && (
                   <div className="text-sm font-medium bg-black/10 p-3 rounded-lg border border-white/5">
                     Estimated vinyl needed: <span style={{ color: 'var(--accent-gold)' }} className="font-bold">{customLengthCalc}m</span>
                   </div>
                  )}
                </div>
              </div>

              <div className="relative z-10">
                <Link 
                  href="/quote"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
                  style={{ background: 'var(--accent-gold)', color: '#1a2733' }}
                >
                  Request Final Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="mt-4 text-center text-xs opacity-70 text-white flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Based on SA 2026 market averages
                </div>
              </div>
              
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full mix-blend-overlay opacity-20 blur-3xl" style={{ background: 'var(--accent-gold)' }} />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full mix-blend-overlay opacity-20 blur-2xl" style={{ background: 'white' }} />
            </div>
            
          </div>
        </div>
      </section>

      {/* BEFORE YOU BOOK CHECKLIST */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--primary-blue)' }}>Before You Book</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: "Ask What Film Brand is Used", desc: "Always insist on premium cast films (3M, Avery, Oracal) designed for vehicles." },
            { title: "Confirm Warranty Terms", desc: "Understand vertical vs. horizontal surface warranties in the SA sun." },
            { title: "Understand Prep & Downtime", desc: "Proper cleaning, disassembly, and resting time means your vehicle might be in for 3-5 days." },
            { title: "Aftercare Guidance", desc: "A great wrap shop will provide clear instructions on washing and maintaining the vinyl." }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#111] p-6 rounded-2xl shadow-sm border" style={{ borderColor: 'rgba(79, 115, 142, 0.1)' }}>
              <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--accent-gold-dark)' }}>{item.title}</h4>
              <p className="opacity-80 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
