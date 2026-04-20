'use client'
// hooks/useLeadPopup.ts
// Controls WHEN the popup fires — exit intent, time delay, scroll depth
// Targets cold traffic from Google Ads & TikTok

import { useState, useEffect, useCallback, useRef } from 'react'
import type { PopupPhase } from '@/types/leads'

const STORAGE_KEY    = 'pg_lead_captured'
const SUPPRESSED_KEY = 'pg_popup_suppressed'
const DELAY_MS       = 8_000   // 8 seconds — enough time to read the page
const SCROLL_PCT     = 35      // Fire after 35% scroll depth
const SUPPRESS_DAYS  = 3       // Don't show again for 3 days if dismissed

interface UseLeadPopupReturn {
  phase:       PopupPhase
  setPhase:    (p: PopupPhase) => void
  dismiss:     () => void
  utmParams:   Record<string, string>
  trafficSource: string
}

export function useLeadPopup(): UseLeadPopupReturn {
  const [phase, setPhase]       = useState<PopupPhase>('closed')
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})
  const [trafficSource, setTrafficSource] = useState('unknown')
  const firedRef    = useRef(false)
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollFired = useRef(false)

  // ── Parse UTM params & detect traffic source ──────────
  useEffect(() => {
    const params  = new URLSearchParams(window.location.search)
    const utmSrc  = params.get('utm_source') ?? ''
    const utmMed  = params.get('utm_medium') ?? ''
    const utmCamp = params.get('utm_campaign') ?? ''

    setUtmParams({ utmSource: utmSrc, utmMedium: utmMed, utmCampaign: utmCamp })

    // Detect traffic source
    const ref = document.referrer
    if (utmSrc === 'google' || utmMed === 'cpc') setTrafficSource('google_ads')
    else if (utmSrc === 'tiktok' || utmSrc === 'tiktok_ads') setTrafficSource('tiktok')
    else if (ref.includes('google.com')) setTrafficSource('organic')
    else if (ref.includes('facebook.com') || ref.includes('instagram.com')) setTrafficSource('meta')
    else if (ref.includes('linkedin.com')) setTrafficSource('linkedin')
    else setTrafficSource('direct')
  }, [])

  // ── Check if should show ───────────────────────────────
  const shouldShow = useCallback((): boolean => {
    if (firedRef.current) return false
    // Already captured this lead
    if (localStorage.getItem(STORAGE_KEY)) return false
    // Suppressed (dismissed recently)
    const suppressed = localStorage.getItem(SUPPRESSED_KEY)
    if (suppressed) {
      const until = Number(suppressed)
      if (Date.now() < until) return false
      localStorage.removeItem(SUPPRESSED_KEY)
    }
    return true
  }, [])

  const firePopup = useCallback(() => {
    if (!shouldShow()) return
    firedRef.current = true
    setPhase('hook')
  }, [shouldShow])

  // ── Time delay trigger ─────────────────────────────────
  useEffect(() => {
    timerRef.current = setTimeout(firePopup, DELAY_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [firePopup])

  // ── Scroll depth trigger ───────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (scrollFired.current) return
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (scrolled >= SCROLL_PCT) {
        scrollFired.current = true
        if (timerRef.current) clearTimeout(timerRef.current)
        firePopup()
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [firePopup])

  // ── Exit intent trigger (desktop only) ────────────────
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        if (timerRef.current) clearTimeout(timerRef.current)
        firePopup()
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [firePopup])

  // ── Dismiss — suppress for N days ─────────────────────
  const dismiss = useCallback(() => {
    const until = Date.now() + SUPPRESS_DAYS * 24 * 60 * 60 * 1000
    localStorage.setItem(SUPPRESSED_KEY, String(until))
    setPhase('closed')
  }, [])

  return { phase, setPhase, dismiss, utmParams, trafficSource }
}

// Call this on successful capture to permanently suppress
export function markLeadCaptured() {
  localStorage.setItem(STORAGE_KEY, 'true')
}
