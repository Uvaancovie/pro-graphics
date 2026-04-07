import { NextResponse } from 'next/server';
import { securityMiddleware, corsHeaders } from '@/lib/security';
import { supabase } from '@/lib/supabase';
import { sendBrevoSmtpEmail } from '@/lib/brevo-smtp';
import * as Sentry from '@sentry/nextjs';

const queryTypeLabels: Record<string, string> = {
  'general-question': 'General Question',
  'quote-request': 'Quote Request',
  'support-request': 'Support Request',
  'privacy-request': 'Privacy Request',
  'security-concern': 'Security Concern',
  billing: 'Billing',
  partnership: 'Partnership',
  other: 'Other',
};

const urgencyLabels: Record<string, string> = {
  low: 'Low',
  normal: 'Normal',
  urgent: 'Urgent',
};

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const securityResponse = await securityMiddleware(req);
    if (securityResponse) return securityResponse;

    const {
      fullName,
      email,
      company,
      queryType,
      urgency,
      summary,
      hasSensitiveData,
      noSecretsAcknowledged,
      consentGiven,
      consentTimestamp,
    } = await req.json();

    if (!fullName || !email || !queryType || !urgency || !summary) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400, headers: corsHeaders });
    }

    if (!noSecretsAcknowledged) {
      return NextResponse.json({ error: 'Security acknowledgement is required' }, { status: 400, headers: corsHeaders });
    }

    if (!consentGiven) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400, headers: corsHeaders });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const adminNotificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'i.t.safuneralsupplies@gmail.com';

    if (!apiKey) {
      console.error('Missing BREVO_API_KEY');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500, headers: corsHeaders });
    }

    const subjectLabel = queryTypeLabels[queryType] || 'General Submission';
    const urgencyLabel = urgencyLabels[urgency] || urgency;

    // 1. Save to Supabase database
    const { error: dbError } = await supabase
      .from('general_submission')
      .insert([
        {
          full_name: fullName,
          email,
          company: company || null,
          query_type: queryType,
          urgency,
          summary,
          has_sensitive_data: hasSensitiveData,
          consent_given: consentGiven,
          consent_timestamp: consentTimestamp || new Date().toISOString(),
        }
      ]);

    if (dbError) {
      console.error('Supabase insert error (general submission):', dbError);
    }

    // Split name format for Brevo
    const nameParts = fullName ? fullName.split(' ') : [''];
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // 2. Save in Brevo Contacts List
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email: email,
        updateEnabled: true,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          COMPANY: company || '',
          OPT_IN: true,
          CONSENT_DATE: consentTimestamp || new Date().toISOString()
        },
        listIds: [2] // Assuming list ID 2 is used for standard lead captures
      })
    });

    if (!contactRes.ok) {
      const errorData = await contactRes.json();
      console.error('Brevo Contact error:', errorData);
    }

    try {
      await sendBrevoSmtpEmail({
        to: [
          {
            email: adminNotificationEmail,
            name: 'Pro Graphics Admin',
          },
        ],
        subject: `New General Submission: ${subjectLabel}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1f2937; }
              .container { padding: 40px 20px; max-width: 640px; margin: 0 auto; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
              .header { background-color: #1e3a8a; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 24px; }
              .details { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
              .row { margin: 10px 0; }
              .label { font-weight: bold; color: #4b5563; display: inline-block; width: 160px; vertical-align: top; }
              .value { display: inline-block; max-width: 420px; }
              .note { margin-top: 16px; font-size: 13px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New General Submission</h2>
              </div>
              <div class="details">
                <div class="row"><span class="label">Name:</span><span class="value">${escapeHtml(fullName)}</span></div>
                <div class="row"><span class="label">Email:</span><span class="value">${escapeHtml(email)}</span></div>
                <div class="row"><span class="label">Company:</span><span class="value">${escapeHtml(company || 'N/A')}</span></div>
                <div class="row"><span class="label">Query Type:</span><span class="value">${escapeHtml(subjectLabel)}</span></div>
                <div class="row"><span class="label">Priority:</span><span class="value">${escapeHtml(urgencyLabel)}</span></div>
                <div class="row"><span class="label">Sensitive Data:</span><span class="value">${hasSensitiveData ? 'Yes' : 'No'}</span></div>
                <div class="row"><span class="label">Consent Time:</span><span class="value">${escapeHtml(consentTimestamp || new Date().toISOString())}</span></div>
                <div class="row"><span class="label">Summary:</span><span class="value">${escapeHtml(summary)}</span></div>
              </div>
              <p class="note">This request was submitted through the secure general submission form and is intended for compliant handling with minimal necessary data.</p>
            </div>
          </body>
          </html>
        `,
      });
    } catch (teamEmailError) {
      console.error('Brevo SMTP email error (general submission):', teamEmailError);
      return NextResponse.json({ error: 'Failed to send the submission' }, { status: 500, headers: corsHeaders });
    }

    try {
      await sendBrevoSmtpEmail({
        to: [
          {
            email,
            name: fullName || 'Valued Customer',
          },
        ],
        subject: 'Welcome to Pro Graphics! We received your submission',
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; background: #f9fafb; padding: 24px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; border: 1px solid #e5e7eb; padding: 32px;">
              <h2 style="color: #1e3a8a; margin-top: 0;">Welcome, ${escapeHtml(firstName || 'there')}!</h2>
              <p>Thanks for getting in touch with us at Pro Graphics.</p>
              <p>We’ve received your general submission and will review it shortly to connect you with the right team member.</p>
              <p>If your request involves privacy or security, rest assured it will be handled with priority.</p>
              <p style="font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 24px;">
                Please avoid sending passwords, card details, or other confidential credentials by email.
              </p>
            </div>
          </body>
          </html>
        `,
      });
    } catch (acknowledgementError) {
      console.error('Brevo SMTP acknowledgement error (general submission):', acknowledgementError);
    }

    Sentry.metrics.count('general_submission_success', 1);
    return NextResponse.json({ message: 'Success' }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('General submission error:', error);
    Sentry.metrics.count('general_submission_error', 1);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
