// app/api/capture-lead/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { upsertBrevoContact } from '@/lib/brevo'
import { sendBrevoSmtpEmail } from '@/lib/brevo-smtp'
import type { LeadFormData, CaptureLeadResponse } from '@/types/leads'

function getSupabaseServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return null
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

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

async function sendVehicleWrapPricingGuideEmail(email: string, firstName: string): Promise<boolean> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pro-graphics.vercel.app'
  const guideUrl = `${siteUrl}/lead-magnet/ProGraphics_VehicleWrapPricing_Guide.md`

  await sendBrevoSmtpEmail({
    to: [{ email, name: firstName }],
    subject: 'Your Vehicle Wrap Pricing Estimator from Pro Graphics',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f9fafb; padding: 24px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; border: 1px solid #e5e7eb; padding: 28px;">
          <h2 style="color: #1e3a8a; margin-top: 0;">Your Vehicle Wrap Pricing Estimator is Ready</h2>
          <p>Hi ${firstName},</p>
          <p>Thanks for requesting our estimator. Use it to plan your wrap budget by vehicle size, coverage type, and finish.</p>
          <p style="margin: 24px 0;">
            <a href="${guideUrl}" style="display: inline-block; padding: 12px 20px; border-radius: 6px; background: #d97706; color: #fff; text-decoration: none; font-weight: 600;">Open the Pricing Guide</a>
          </p>
          <p>If you want an exact quote, reply with your vehicle model, preferred finish, and whether you want full or partial wrap.</p>
          <p style="margin-top: 24px;">— Pro Graphics Team</p>
        </div>
      </body>
      </html>
    `,
  })

  return true
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
    const supabase = getSupabaseServiceClient()

    let hasLeadsTable = Boolean(supabase)
    let leadId: string | null = null

    // ── Check if already captured ────────────────────────
    if (supabase) {
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
        if (!existing.email_sent) {
          await sendVehicleWrapPricingGuideEmail(cleanEmail, cleanName)
          await supabase.from('leads').update({ email_sent: true }).eq('id', existing.id)
        }
        return NextResponse.json<CaptureLeadResponse>({
          success: true,
          message: 'Check your inbox — your pricing guide is on its way!',
          alreadySubscribed: true,
        })
      }
    }

    // ── Save to Supabase ─────────────────────────────────
    if (hasLeadsTable && supabase) {
      const { data: lead, error: dbError } = await supabase
        .from('leads')
        .insert({
          email:        cleanEmail,
          first_name:   cleanName,
          source:       source ?? 'unknown',
          utm_source:   utmSource,
          utm_medium:   utmMedium,
          utm_campaign: utmCampaign,
          lead_magnet:  'vehicle-wrap-pricing-estimator',
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
      const brevoRes = await upsertBrevoContact({ email: cleanEmail, listIds: [Number(process.env.BREVO_LIST_ID ?? 2)], attributes: { FIRSTNAME: cleanName, SOURCE: source ?? "unknown", LEAD_MAGNET: "Vehicle Wrap Pricing Estimator" } })
      brevoId = brevoRes?.id ?? null
    } catch (brevoErr) {
      console.error('Brevo upsert error (non-fatal):', brevoErr)
    }

    // ── Send lead magnet email ───────────────────────────
    let emailSent = false
    try {
      emailSent = await sendVehicleWrapPricingGuideEmail(cleanEmail, cleanName)
    } catch (emailErr) {
      console.error('Email send error (non-fatal):', emailErr)
    }

    // ── Update DB with Brevo ID + email status ───────────
    if (hasLeadsTable && leadId && supabase) {
      await supabase
        .from('leads')
        .update({ brevo_contact_id: brevoId, email_sent: emailSent })
        .eq('id', leadId)
    }

    return NextResponse.json<CaptureLeadResponse>({
      success: true,
      message: `Your pricing guide is heading to ${cleanEmail} right now!`,
    })

  } catch (err) {
    console.error('Capture lead error:', err)
    return NextResponse.json<CaptureLeadResponse>(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

