import { createServer } from 'vite';
import { createServer as createHttpServer } from 'node:http';
import { config } from 'dotenv';
config({ path: '.env.local' });

const API_URL = 'https://api.brevo.com/v3/smtp/email';
const FROM_EMAIL = process.env.BREVO_SMTP_FROM_EMAIL || 'i.t.safuneralsupplies@gmail.com';
const FROM_NAME = process.env.BREVO_SMTP_FROM_NAME || 'Pro Graphics';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'i.t.safuneralsupplies@gmail.com';

function getBrevoApiKey() {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error('Missing BREVO_API_KEY env var');
  return key;
}

async function sendEmail(to, subject, html) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': getBrevoApiKey(),
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

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

async function handleApiRoute(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method;

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return true;
  }

  // ─── POST /api/general-submission ───
  if (path === '/api/general-submission' && method === 'POST') {
    try {
      const body = await readBody(req);
      const { fullName, email, company, urgency, summary, queryType, consentTimestamp } = body;

      if (!fullName || !email || !summary) {
        json(res, 400, { error: 'Missing required fields' });
        return true;
      }

      const adminHtml = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1e3a5f;">New General Submission</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${fullName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${company || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Query Type</td><td style="padding:8px;border-bottom:1px solid #eee;">${queryType || 'N/A'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Urgency</td><td style="padding:8px;border-bottom:1px solid #eee;">${urgency || 'normal'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Summary</td><td style="padding:8px;border-bottom:1px solid #eee;">${summary}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Submitted</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
        </table></div>`;

      const userHtml = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#1e3a5f;">Thank You, ${fullName}!</h2>
        <p>We have received your enquiry and will review it promptly.</p>
        <p>If urgent, call us at <strong>065 9424 036</strong>.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
        <p style="color:#666;font-size:14px;">Pro Graphics Durban</p></div>`;

      await Promise.all([
        sendEmail([{ email: ADMIN_EMAIL }], `New General Submission from ${fullName}`, adminHtml),
        sendEmail([{ email, name: fullName }], 'We received your enquiry - Pro Graphics', userHtml),
      ]);

      json(res, 200, { success: true });
    } catch (err) {
      console.error('General submission error:', err);
      json(res, 500, { error: 'Failed to process submission' });
    }
    return true;
  }

  // ─── POST /api/quote-submission ───
  if (path === '/api/quote-submission' && method === 'POST') {
    try {
      const body = await readBody(req);
      const { fullName, email, phone, company, serviceType, isQuickQuote, projectDescription, budget, timeline, vehicleType, coverageLevel, signMaterial, signDimensions, additionalNotes, consentTimestamp } = body;

      if (!fullName || !email || !phone) {
        json(res, 400, { error: 'Missing required fields' });
        return true;
      }

      const details = [
        ['Name', fullName],
        ['Email', email],
        ['Phone', phone],
        ['Company', company || 'N/A'],
        ['Service', serviceType || 'N/A'],
        ['Mode', isQuickQuote ? 'Quick Quote' : 'Detailed Quote'],
        ['Description', projectDescription || 'N/A'],
        ['Budget', budget || 'N/A'],
        ['Timeline', timeline || 'N/A'],
        ['Vehicle', vehicleType || 'N/A'],
        ['Coverage', coverageLevel || 'N/A'],
        ['Material', signMaterial || 'N/A'],
        ['Dimensions', signDimensions || 'N/A'],
        ['Notes', additionalNotes || 'N/A'],
      ];

      const adminHtml = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1e3a5f;">New Quote Request</h2>
        <table style="width:100%;border-collapse:collapse;">${details.map(([label, value]) => `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;">${label}</td><td style="padding:8px;border-bottom:1px solid #eee;">${value}</td></tr>`).join('')}
          <tr><td style="padding:8px;font-weight:bold;">Submitted</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
        </table></div>`;

      const userHtml = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#1e3a5f;">Thank You, ${fullName}!</h2>
        <p>Your quote request has been received. We'll get back to you within <strong>24 hours</strong>.</p>
        <p>Call us at <strong>065 9424 036</strong> for immediate assistance.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
        <p style="color:#666;font-size:14px;">Pro Graphics Durban</p></div>`;

      await Promise.all([
        sendEmail([{ email: ADMIN_EMAIL }], `New Quote Request from ${fullName} - ${serviceType || 'General'}`, adminHtml),
        sendEmail([{ email, name: fullName }], 'Your quote request is being processed - Pro Graphics', userHtml),
      ]);

      json(res, 200, { success: true });
    } catch (err) {
      console.error('Quote submission error:', err);
      json(res, 500, { error: 'Failed to process quote request' });
    }
    return true;
  }

  // ─── POST /api/capture-lead ───
  if (path === '/api/capture-lead' && method === 'POST') {
    try {
      const body = await readBody(req);
      const { email, firstName, source, lead_magnet } = body;

      if (!email || !firstName) {
        json(res, 400, { error: 'Missing required fields' });
        return true;
      }

      const adminHtml = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1e3a5f;">New Lead Captured</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${firstName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Source</td><td style="padding:8px;border-bottom:1px solid #eee;">${source || lead_magnet || 'website'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Date</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
        </table></div>`;

      const userHtml = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#1e3a5f;">Thanks, ${firstName}!</h2>
        <p>Your pricing guide is on its way to your inbox.</p>
        <p>Check your email (and spam folder) for your free access link.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />
        <p style="color:#666;font-size:14px;">Pro Graphics Durban</p></div>`;

      await Promise.all([
        sendEmail([{ email: ADMIN_EMAIL }], `New Lead: ${firstName} (${email})`, adminHtml),
        sendEmail([{ email, name: firstName }], 'Your Free Pricing Guide - Pro Graphics', userHtml),
      ]);

      json(res, 200, { success: true, message: 'Lead captured successfully' });
    } catch (err) {
      console.error('Lead capture error:', err);
      json(res, 500, { error: 'Failed to capture lead' });
    }
    return true;
  }

  return false; // not an API route, let Vite handle it
}

async function start() {
  const vite = await createServer({
    appType: 'spa',
    server: {
      middlewareMode: true,
      watch: { usePolling: true },
    },
  });

  const app = createHttpServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const handled = await handleApiRoute(req, res);
    if (!handled) {
      vite.middlewares(req, res);
    }
  });

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dev server running at http://0.0.0.0:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});