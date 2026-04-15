import { NextResponse } from 'next/server';
import { corsHeaders, securityMiddleware } from '@/lib/security';
import { getBrevoListId, upsertBrevoContact } from '@/lib/brevo';
import { sendBrevoSmtpEmail } from '@/lib/brevo-smtp';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const securityResponse = await securityMiddleware(req);
    if (securityResponse) return securityResponse;

    const { name, email, company, source, consentGiven, consentTimestamp } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400, headers: corsHeaders });
    }

    if (!consentGiven) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400, headers: corsHeaders });
    }

    const nameParts = name ? String(name).trim().split(' ') : [''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const newsletterListId = getBrevoListId('BREVO_NEWSLETTER_LIST_ID', 2);

    await upsertBrevoContact({
      email,
      listIds: [newsletterListId],
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        COMPANY: company || '',
        OPT_IN: true,
        CONSENT_DATE: consentTimestamp || new Date().toISOString(),
        LEAD_SOURCE: source || 'newsletter-popup',
      },
    });

    try {
      await sendBrevoSmtpEmail({
        to: [
          {
            email,
            name: firstName || 'there',
          },
        ],
        subject: 'You are subscribed to Pro Graphics updates',
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; background: #f9fafb; padding: 24px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; border: 1px solid #e5e7eb; padding: 28px;">
              <h2 style="color: #1e3a8a; margin-top: 0;">Welcome to Pro Graphics updates</h2>
              <p>Hi ${firstName || 'there'},</p>
              <p>Thanks for subscribing. You will now receive practical tips, offers, and Durban-focused branding insights.</p>
              <p>If you requested a quote or submitted a contact form, we will follow up separately with your enquiry details.</p>
              <p style="font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 20px;">
                You can unsubscribe any time from links in our emails.
              </p>
            </div>
          </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error('Newsletter confirmation email failed:', emailError);
    }

    return NextResponse.json({ message: 'Subscribed' }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
