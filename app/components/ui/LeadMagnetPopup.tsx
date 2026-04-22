'use client'
// components/LeadMagnetPopup.tsx
// Conversion-optimised popup for Pro Graphics
// Designed for cold traffic: Google Ads + TikTok (500–800 visitors)
// Strategy: Pattern interrupt → Value hook → Micro-commitment → Capture

import { useState, useEffect, useRef } from 'react'
import { useLeadPopup, markLeadCaptured } from '@/hooks/useLeadPopup'
import type { CaptureLeadResponse } from '@/types/leads'

// ── CONVERSION COPY — written like a $10k/month copywriter ──
const HOOK_HEADLINE  = "Most Durban businesses waste\nthousands on advertising."
const HOOK_SUBHEAD   = "There's a smarter way — and it's already sitting in your parking lot."
const MAGNET_TITLE   = "Vehicle Wrap Pricing Estimator"
const MAGNET_SUBTITLE = "Interactive Pricing Estimator"
const BULLETS = [
  { stat: "42,500", label: "daily impressions per unbranded vehicle — gone forever" },
  { stat: "30x",    label: "ROI — the highest of any advertising medium in SA" },
  { stat: "R1.53M", label: "average annual brand value lost per plain vehicle" },
]
const FORM_HEADLINE  = "Where should we send your free pricing guide?"
const FORM_SUBHEAD   = "Join Durban business owners using this to budget wraps correctly"
const CTA_HOOK       = "Show Me How to Fix This →"
const CTA_SUBMIT     = "Get Access to the Estimator →"
const SUCCESS_TITLE  = "It's on its way! 🎉"
const SUCCESS_SUB    = "Check your inbox — your link to the Interactive Estimator is on the way."

export default function LeadMagnetPopup() {
  const { phase, setPhase, dismiss, utmParams, trafficSource } = useLeadPopup()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)

  // Focus email input when form phase opens
  useEffect(() => {
    if (phase === 'form') {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [phase])

  // Close on overlay click
  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) dismiss()
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (phase === 'hook' || phase === 'form')) dismiss()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, dismiss])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:       email.trim(),
          firstName:   firstName.trim(),
          source:      trafficSource,
          ...utmParams,
        }),
      })

      const data: CaptureLeadResponse = await res.json()

      if (data.success) {
        markLeadCaptured()
        setPhase('success')
      } else {
        setError(data.message)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (phase === 'closed') return null

  return (
    <>
      {/* ── Global styles injected once ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .pg-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(8, 10, 18, 0.88);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: pg-fade-in 0.3s ease;
        }
        @keyframes pg-fade-in { from { opacity: 0 } to { opacity: 1 } }

        .pg-modal {
          position: relative;
          width: 100%; max-width: 520px;
          background: #2d4352;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(212, 169, 119, 0.3);
          animation: pg-slide-up 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes pg-slide-up {
          from { opacity: 0; transform: translateY(32px) scale(0.96) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }

        .pg-top-bar {
          height: 4px;
          background: linear-gradient(90deg, #d4a977, #e8cda5, #d4a977);
          background-size: 200% 100%;
          animation: pg-shimmer 2s linear infinite;
        }
        @keyframes pg-shimmer {
          0%   { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }

        .pg-close {
          position: absolute; top: 14px; right: 14px;
          background: rgba(255,255,255,0.08);
          border: none; cursor: pointer;
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5); font-size: 16px;
          transition: background 0.2s, color 0.2s; z-index: 10;
        }
        .pg-close:hover { background: rgba(212, 169, 119, 0.2); color: #d4a977; }

        .pg-inner { padding: 32px 32px 28px; }
        @media (max-width: 480px) { .pg-inner { padding: 24px 20px 20px; } }

        .pg-label {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(212, 169, 119, 0.12);
          border: 1px solid rgba(212, 169, 119, 0.3);
          border-radius: 20px; padding: 4px 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500; letter-spacing: 0.06em;
          color: #e8cda5; text-transform: uppercase; margin-bottom: 20px;
        }
        .pg-label-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #d4a977; animation: pg-pulse 1.5s ease-in-out infinite;
        }
        @keyframes pg-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.3 } }

        .pg-h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 8vw, 52px);
          line-height: 1.0; letter-spacing: 0.02em;
          color: #FFFFFF; margin: 0 0 12px;
          white-space: pre-line;
        }
        .pg-h1 .accent { color: #e8cda5; }

        .pg-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; line-height: 1.5;
          color: rgba(255,255,255,0.6); margin: 0 0 24px;
        }

        .pg-magnet-box {
          background: rgba(212, 169, 119, 0.08);
          border: 1px solid rgba(212, 169, 119, 0.2);
          border-radius: 14px; padding: 16px 18px; margin-bottom: 24px;
          display: flex; align-items: center; gap: 14px;
        }
        .pg-pdf-icon {
          width: 48px; height: 60px; flex-shrink: 0;
          background: #d4a977; border-radius: 8px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 3px;
          position: relative; overflow: hidden;
        }
        .pg-pdf-icon::before {
          content: ''; position: absolute; top: 0; right: 0;
          width: 0; height: 0;
          border-style: solid; border-width: 0 14px 14px 0;
          border-color: transparent rgba(0,0,0,0.2) transparent transparent;
        }
        .pg-pdf-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px; color: white; letter-spacing: 1px;
        }
        .pg-pdf-lines { display: flex; flex-direction: column; gap: 2px; }
        .pg-pdf-line {
          height: 2px; background: rgba(255,255,255,0.6); border-radius: 1px;
        }
        .pg-magnet-info {}
        .pg-magnet-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700;
          color: #FFFFFF; margin: 0 0 3px; line-height: 1.3;
        }
        .pg-magnet-badge {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; color: #e8cda5; font-weight: 500;
        }

        .pg-bullets { list-style: none; margin: 0 0 28px; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .pg-bullet {
          display: flex; align-items: center; gap: 12px;
          font-family: 'DM Sans', sans-serif;
        }
        .pg-bullet-stat {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; color: #d4a977; letter-spacing: 0.02em;
          min-width: 70px; flex-shrink: 0; line-height: 1;
        }
        .pg-bullet-label { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.3; }

        .pg-cta-btn {
          width: 100%;
          background: #d4a977;
          color: #0a0a0a; border: none; cursor: pointer;
          border-radius: 12px; padding: 16px 24px;
          font-family: 'Syne', sans-serif;
          font-size: 16px; font-weight: 800;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.1s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .pg-cta-btn:hover  { background: #e8cda5; }
        .pg-cta-btn:active { transform: scale(0.98); }
        .pg-cta-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .pg-no-spam {
          text-align: center; margin-top: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.3);
        }

        /* FORM PHASE */
        .pg-form-h2 {
          font-family: 'Syne', sans-serif;
          font-size: 22px; font-weight: 800;
          color: #FFFFFF; margin: 0 0 6px; line-height: 1.2;
        }
        .pg-form-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: rgba(255,255,255,0.5); margin: 0 0 22px;
        }
        .pg-social-proof {
          display: flex; align-items: center; gap: 8px; margin-bottom: 22px;
        }
        .pg-avatars { display: flex; }
        .pg-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          border: 2px solid #2d4352;
          background: #d4a977; margin-left: -8px;
          font-family: 'Syne', sans-serif;
          font-size: 10px; font-weight: 700; color: #0a0a0a;
          display: flex; align-items: center; justify-content: center;
        }
        .pg-avatar:first-child { margin-left: 0; }
        .pg-avatar:nth-child(2) { background: #4f738e; color: white; }
        .pg-avatar:nth-child(3) { background: #e8cda5; color: #0a0a0a; }
        .pg-proof-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; color: rgba(255,255,255,0.5);
        }
        .pg-proof-text strong { color: rgba(255,255,255,0.8); font-weight: 500; }

        .pg-field { margin-bottom: 12px; }
        .pg-input {
          width: 100%; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; color: white;
          transition: border-color 0.2s; outline: none;
          box-sizing: border-box;
        }
        .pg-input::placeholder { color: rgba(255,255,255,0.28); }
        .pg-input:focus { border-color: #d4a977; background: rgba(212, 169, 119, 0.06); }

        .pg-error {
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3);
          border-radius: 8px; padding: 10px 14px; margin-bottom: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #FCA5A5;
        }

        .pg-spinner {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          animation: pg-spin 0.6s linear infinite;
        }
        @keyframes pg-spin { to { transform: rotate(360deg) } }

        .pg-guarantee {
          display: flex; align-items: center; gap: 8px;
          margin-top: 14px; padding: 12px 14px;
          background: rgba(26,181,160,0.08);
          border: 1px solid rgba(26,181,160,0.2);
          border-radius: 10px;
        }
        .pg-guarantee-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.4;
        }
        .pg-guarantee-text strong { color: #1AB5A0; }

        /* SUCCESS PHASE */
        .pg-success { text-align: center; padding: 12px 0 8px; }
        .pg-success-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(26,181,160,0.12);
          border: 2px solid rgba(26,181,160,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 32px; margin: 0 auto 20px;
          animation: pg-pop 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes pg-pop { from { transform: scale(0) } to { transform: scale(1) } }
        .pg-success-h2 {
          font-family: 'Syne', sans-serif;
          font-size: 26px; font-weight: 800; color: #FFFFFF; margin: 0 0 10px;
        }
        .pg-success-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: rgba(255,255,255,0.6); margin: 0 0 24px; line-height: 1.5;
        }
        .pg-success-steps { list-style: none; margin: 0 0 24px; padding: 0; text-align: left; }
        .pg-step {
          display: flex; align-items: flex-start; gap: 10px; padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          color: rgba(255,255,255,0.7); line-height: 1.4;
        }
        .pg-step:last-child { border-bottom: none; }
        .pg-step-num {
          width: 22px; height: 22px; border-radius: 50%;
          background: #FF6B35; color: white;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .pg-cta-secondary {
          width: 100%; background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px; padding: 13px;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.7);
          cursor: pointer; transition: border-color 0.2s, color 0.2s;
        }
        .pg-cta-secondary:hover { border-color: #e8cda5; color: #e8cda5; }
      `}</style>

      {/* ── Overlay ── */}
      <div className="pg-overlay" ref={overlayRef} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Free Fleet Branding Playbook">
        <div className="pg-modal">
          <div className="pg-top-bar" />

          <button className="pg-close" onClick={dismiss} aria-label="Close">✕</button>

          <div className="pg-inner">

            {/* ══════════════════════════════════════
                PHASE 1 — HOOK
                Pattern interrupt: problem → solution
            ══════════════════════════════════════ */}
            {phase === 'hook' && (
              <>
                <div className="pg-label">
                  <span className="pg-label-dot" />
                  Free Download · Limited Time
                </div>

                <h2 className="pg-h1">
                  {HOOK_HEADLINE.split('\n')[0]}{'\n'}
                  <span className="accent">{HOOK_HEADLINE.split('\n')[1]}</span>
                </h2>

                <p className="pg-sub">{HOOK_SUBHEAD}</p>

                {/* PDF Visual */}
                <div className="pg-magnet-box">
                  <div className="pg-pdf-icon">
                    <span className="pg-pdf-text">APP</span>
                    <div className="pg-pdf-lines">
                      {[52, 40, 48, 36].map((w, i) => (
                        <div key={i} className="pg-pdf-line" style={{ width: w }} />
                      ))}
                    </div>
                  </div>
                  <div className="pg-magnet-info">
                    <p className="pg-magnet-name">{MAGNET_TITLE}</p>
                    <p className="pg-magnet-badge">⚡ {MAGNET_SUBTITLE}</p>
                  </div>
                </div>

                {/* Stats that make them feel the pain */}
                <ul className="pg-bullets">
                  {BULLETS.map(({ stat, label }) => (
                    <li key={stat} className="pg-bullet">
                      <span className="pg-bullet-stat">{stat}</span>
                      <span className="pg-bullet-label">{label}</span>
                    </li>
                  ))}
                </ul>

                <button className="pg-cta-btn" onClick={() => setPhase('form')}>
                  {CTA_HOOK}
                </button>
                <p className="pg-no-spam">🔒 No spam. Unsubscribe anytime. Takes 10 seconds.</p>
              </>
            )}

            {/* ══════════════════════════════════════
                PHASE 2 — FORM
                Two-step: micro-commitment already made
            ══════════════════════════════════════ */}
            {phase === 'form' && (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="pg-form-h2">{FORM_HEADLINE}</h3>
                <p className="pg-form-sub">{FORM_SUBHEAD}</p>

                {/* Social proof */}
                <div className="pg-social-proof">
                  <div className="pg-avatars">
                    {['TM', 'KN', 'SR'].map(i => (
                      <div key={i} className="pg-avatar">{i}</div>
                    ))}
                  </div>
                  <p className="pg-proof-text">
                    <strong>200+ Durban business owners</strong> already downloaded this
                  </p>
                </div>

                {/* Fields */}
                <div className="pg-field">
                  <input
                    className="pg-input"
                    type="text"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className="pg-field">
                  <input
                    ref={inputRef}
                    className="pg-input"
                    type="email"
                    placeholder="Your best email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                {error && <div className="pg-error">⚠️ {error}</div>}

                <button className="pg-cta-btn" type="submit" disabled={loading}>
                  {loading
                    ? <><span className="pg-spinner" /> Sending your playbook…</>
                    : CTA_SUBMIT
                  }
                </button>

                {/* Trust signal */}
                <div className="pg-guarantee">
                  <span style={{ fontSize: 18 }}>🔒</span>
                  <p className="pg-guarantee-text">
                    <strong>100% private.</strong> Your email goes straight to your inbox — we'll also send you Durban-specific branding tips. Unsubscribe anytime, one click.
                  </p>
                </div>
              </form>
            )}

            {/* ══════════════════════════════════════
                PHASE 3 — SUCCESS
                Confirm + next step CTA
            ══════════════════════════════════════ */}
            {phase === 'success' && (
              <div className="pg-success">
                <div className="pg-success-icon">📬</div>
                <h3 className="pg-success-h2">{SUCCESS_TITLE}</h3>
                <p className="pg-success-sub">{SUCCESS_SUB}</p>

                <ul className="pg-success-steps">
                  {[
                    'Check your inbox (and spam folder just in case)',
                    'Open the link to access your interactive estimator',
                    'Use the estimator to get precise sizing constraints and budgets specific to your vehicle',
                  ].map((step, i) => (
                    <li key={i} className="pg-step">
                      <span className="pg-step-num" style={{ background: '#d4a977', color: '#0a0a0a' }}>{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ul>

                <button
                  className="pg-cta-btn"
                  onClick={() => window.open('https://pro-graphics.vercel.app/quote', '_blank')}
                  style={{ marginBottom: 10 }}
                >
                  Get a Free Fleet Quote Now →
                </button>
                <button className="pg-cta-secondary" onClick={dismiss}>
                  I'll read the playbook first
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
