import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const FROM_EMAIL = process.env.BREVO_SMTP_FROM_EMAIL || 'i.t.safuneralsupplies@gmail.com';
const FROM_NAME = process.env.BREVO_SMTP_FROM_NAME || 'Pro Graphics';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'i.t.safuneralsupplies@gmail.com';

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
    const { fullName, email, company, urgency, summary, queryType, consentTimestamp } = req.body;

    if (!fullName || !email || !summary) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const adminHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1e3a5f;">New General Submission</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${fullName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${company || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Query Type</td><td style="padding:8px;border-bottom:1px solid #eee;">${queryType || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Urgency</td><td style="padding:8px;border-bottom:1px solid #eee;">${urgency || 'normal'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Summary</td><td style="padding:8px;border-bottom:1px solid #eee;">${summary}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Submitted</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
        </table>
      </div>`;

    const userHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#1e3a5f;">Thank You, ${fullName}!</h2>
        <p>We have received your enquiry and will review it promptly.</p>
        <p>If your query requires urgent attention, please call us at <strong>065 9424 036</strong>.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
        <p style="color:#666;font-size:14px;">Reference: ${consentTimestamp || new Date().toISOString()}</p>
        <p style="color:#666;font-size:14px;">Pro Graphics Durban</p>
      </div>`;

    await Promise.all([
      sendEmail(
        [{ email: ADMIN_EMAIL, name: 'Pro Graphics Admin' }],
        `New General Submission from ${fullName}`,
        adminHtml
      ),
      sendEmail(
        [{ email, name: fullName }],
        'We received your enquiry - Pro Graphics',
        userHtml
      ),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('General submission error:', error);
    return res.status(500).json({ error: 'Failed to process submission' });
  }
}