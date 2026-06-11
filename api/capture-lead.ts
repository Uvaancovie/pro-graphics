import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_CONTACTS_URL = 'https://api.brevo.com/v3/contacts';
const FROM_EMAIL = process.env.BREVO_SMTP_FROM_EMAIL || 'i.t.safuneralsupplies@gmail.com';
const FROM_NAME = process.env.BREVO_SMTP_FROM_NAME || 'Pro Graphics';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'i.t.safuneralsupplies@gmail.com';
const LIST_ID = Number(process.env.BREVO_LIST_ID) || 2;

async function upsertBrevoContact(email: string, firstName: string, attributes: Record<string, string | boolean | number> = {}) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('Missing BREVO_API_KEY');

  const res = await fetch(BREVO_CONTACTS_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      attributes: { FIRSTNAME: firstName, ...attributes },
      listIds: [LIST_ID],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.warn('Brevo contact upsert warning:', err?.message || res.statusText);
  }
}

async function sendEmail(to: { email: string; name?: string }[], subject: string, html: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('Missing BREVO_API_KEY');

  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: to.map(r => ({ email: r.email, name: r.name || r.email })),
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Brevo email failed (${res.status}): ${err?.message || res.statusText}`);
  }
  return res.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, source, lead_magnet, ...rest } = req.body;

    if (!email || !firstName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await upsertBrevoContact(email, firstName, { SOURCE: source || lead_magnet || 'website', ...rest });

    const adminHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1e3a5f;">New Lead Captured</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${firstName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Source</td><td style="padding:8px;border-bottom:1px solid #eee;">${source || lead_magnet || 'website'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Date</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
        </table>
      </div>`;

    const userHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#1e3a5f;">Thanks, ${firstName}!</h2>
        <p>Your pricing guide is on its way to your inbox.</p>
        <p>Check your email (and spam folder) for your free access link.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
        <p style="color:#666;font-size:14px;">Pro Graphics Durban</p>
      </div>`;

    await Promise.all([
      sendEmail(
        [{ email: ADMIN_EMAIL, name: 'Pro Graphics Admin' }],
        `New Lead: ${firstName} (${email})`,
        adminHtml
      ),
      sendEmail(
        [{ email, name: firstName }],
        'Your Free Pricing Guide - Pro Graphics',
        userHtml
      ),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Lead capture error:', error);
    return res.status(500).json({ error: 'Failed to capture lead' });
  }
}