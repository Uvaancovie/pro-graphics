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
    const {
      fullName, email, phone, company,
      serviceType, isQuickQuote, projectDescription,
      budget, timeline, vehicleType, coverageLevel,
      signMaterial, signDimensions, additionalNotes,
      consentTimestamp,
    } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const details = [
      ['Name', fullName],
      ['Email', email],
      ['Phone', phone],
      ['Company', company || 'N/A'],
      ['Service', serviceType || 'N/A'],
      ['Mode', isQuickQuote ? 'Quick Quote' : 'Detailed Quote'],
      ['Project Description', projectDescription || 'N/A'],
      ['Budget', budget || 'N/A'],
      ['Timeline', timeline || 'N/A'],
      ['Vehicle Type', vehicleType || 'N/A'],
      ['Coverage Level', coverageLevel || 'N/A'],
      ['Sign Material', signMaterial || 'N/A'],
      ['Sign Dimensions', signDimensions || 'N/A'],
      ['Additional Notes', additionalNotes || 'N/A'],
    ];

    const adminHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1e3a5f;">New Quote Request</h2>
        <table style="width:100%;border-collapse:collapse;">
          ${details.map(([label, value]) => `
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;">${label}</td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${value}</td>
            </tr>
          `).join('')}
          <tr>
            <td style="padding:8px;font-weight:bold;vertical-align:top;">Submitted</td>
            <td style="padding:8px;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
      </div>`;

    const userHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#1e3a5f;">Thank You, ${fullName}!</h2>
        <p>Your quote request has been received successfully.</p>
        <p>We will review your project details and get back to you within <strong>24 hours</strong> with a detailed, transparent quote.</p>
        <p>If you need immediate assistance, please call us at <strong>065 9424 036</strong>.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
        <p style="color:#666;font-size:14px;">Reference: ${consentTimestamp || new Date().toISOString()}</p>
        <p style="color:#666;font-size:14px;">Pro Graphics Durban</p>
      </div>`;

    await Promise.all([
      sendEmail(
        [{ email: ADMIN_EMAIL, name: 'Pro Graphics Admin' }],
        `New Quote Request from ${fullName} - ${serviceType || 'General'}`,
        adminHtml
      ),
      sendEmail(
        [{ email, name: fullName }],
        'Your quote request is being processed - Pro Graphics',
        userHtml
      ),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Quote submission error:', error);
    return res.status(500).json({ error: 'Failed to process quote request' });
  }
}