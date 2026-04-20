// app/api/capture-lead/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { upsertBrevoContact, sendLeadMagnetEmail } from '@/lib/brevo'
import type { LeadFormData, CaptureLeadResponse } from '@/types/leads'

// Service role client — bypasses RLS, server-side only
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ── Validate email format ────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ── Rate limiting (simple in-memory for edge) ────────────
const rateLimitMap = new Map<string, number>()

function isRateLimited(ip: string): boolean {
  const now    = Date.now()
  const last   = rateLimitMap.get(ip) ?? 0
  const window = 60_000 // 1 minute
  if (now - last < window) return true
  rateLimitMap.set(ip, now)
  return false
}

function isMissingLeadsTableError(message?: string | null): boolean {
  return message?.includes("Could not find the table 'public.leads' in the schema cache") ?? false
}

export async function POST(req: NextRequest) {
  try {
    // ── Rate limit ───────────────────────────────────────
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json<CaptureLeadResponse>(
        { success: false, message: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      )
    }

    // ── Parse body ───────────────────────────────────────
    const body: LeadFormData = await req.json()
    const { email, firstName, source, utmSource, utmMedium, utmCampaign } = body

    // ── Validate ─────────────────────────────────────────
    if (!email || !isValidEmail(email)) {
      return NextResponse.json<CaptureLeadResponse>(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }
    if (!firstName || firstName.trim().length < 2) {
      return NextResponse.json<CaptureLeadResponse>(
        { success: false, message: 'Please enter your first name.' },
        { status: 400 }
      )
    }

    const cleanEmail = email.toLowerCase().trim()
    const cleanName  = firstName.trim()

    let hasLeadsTable = true
    let leadId: string | null = null

    // ── Check if already captured ────────────────────────
    const { data: existing, error: existingError } = await supabase
      .from('leads')
      .select('id, email_sent')
      .eq('email', cleanEmail)
      .maybeSingle()

    if (existingError) {
      if (isMissingLeadsTableError(existingError.message)) {
        hasLeadsTable = false
        console.warn("Table public.leads is missing in this project. Continuing with Brevo-only capture.")
      } else {
        throw new Error(`DB read failed: ${existingError.message}`)
      }
    }

    if (hasLeadsTable && existing) {
      // Already in DB — resend email if not sent yet
      if (!existing.email_sent) {
        await sendLeadMagnetEmail(cleanEmail, cleanName)
        await supabase.from('leads').update({ email_sent: true }).eq('id', existing.id)
      }
      return NextResponse.json<CaptureLeadResponse>({
        success: true,
        message: 'Check your inbox — your playbook is on its way!',
        alreadySubscribed: true,
      })
    }

    // ── Save to Supabase ─────────────────────────────────
    if (hasLeadsTable) {
      const { data: lead, error: dbError } = await supabase
        .from('leads')
        .insert({
          email:        cleanEmail,
          first_name:   cleanName,
          source:       source ?? 'unknown',
          utm_source:   utmSource,
          utm_medium:   utmMedium,
          utm_campaign: utmCampaign,
          lead_magnet:  'fleet-branding-playbook',
        })
        .select('id')
        .single()

      if (dbError) {
        if (isMissingLeadsTableError(dbError.message)) {
          hasLeadsTable = false
          console.warn("Table public.leads is missing in this project. Continuing with Brevo-only capture.")
        } else {
          throw new Error(`DB insert failed: ${dbError.message}`)
        }
      } else {
        leadId = lead.id
      }
    }

    // ── Add to Brevo ─────────────────────────────────────
    let brevoId: number | null = null
    try {
      const brevoRes = await upsertBrevoContact({ email: cleanEmail, listIds: [Number(process.env.BREVO_LIST_ID ?? 2)], attributes: { FIRSTNAME: cleanName, SOURCE: source ?? "unknown", LEAD_MAGNET: "Fleet Branding Playbook" } })
      brevoId = brevoRes?.id ?? null
    } catch (brevoErr) {
      console.error('Brevo upsert error (non-fatal):', brevoErr)
    }

    // ── Send lead magnet email ───────────────────────────
    let emailSent = false
    try {
      emailSent = await sendLeadMagnetEmail(cleanEmail, cleanName)
    } catch (emailErr) {
      console.error('Email send error (non-fatal):', emailErr)
    }

    // ── Update DB with Brevo ID + email status ───────────
    if (hasLeadsTable && leadId) {
      await supabase
        .from('leads')
        .update({ brevo_contact_id: brevoId, email_sent: emailSent })
        .eq('id', leadId)
    }

    return NextResponse.json<CaptureLeadResponse>({
      success: true,
      message: `Your playbook is heading to ${cleanEmail} right now!`,
    })

  } catch (err) {
    console.error('Capture lead error:', err)
    return NextResponse.json<CaptureLeadResponse>(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

