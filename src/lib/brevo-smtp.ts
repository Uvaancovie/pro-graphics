/**
 * Brevo Transactional Email via HTTP API
 * Uses the same BREVO_API_KEY that works for contact management.
 * More reliable than SMTP relay — no sender rewriting, proper delivery tracking.
 */

const API_URL = 'https://api.brevo.com/v3/smtp/email';
const FROM_EMAIL = process.env.BREVO_SMTP_FROM_EMAIL || 'i.t.safuneralsupplies@gmail.com';
const FROM_NAME = process.env.BREVO_SMTP_FROM_NAME || 'Pro Graphics';

type Recipient = { email: string; name?: string };

type SendBrevoSmtpEmailArgs = {
  to: Recipient[];
  subject: string;
  html: string;
  text?: string;
};

export async function sendBrevoSmtpEmail({ to, subject, html, text }: SendBrevoSmtpEmailArgs) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('Missing BREVO_API_KEY for email delivery');
  }

  const body: Record<string, unknown> = {
    sender: {
      name: FROM_NAME,
      email: FROM_EMAIL,
    },
    to: to.map((r) => ({
      email: r.email,
      name: r.name || r.email,
    })),
    subject,
    htmlContent: html,
  };

  if (text) {
    body.textContent = text;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Brevo Transactional Email API error:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
    });
    throw new Error(
      `Brevo email failed (${response.status}): ${errorData?.message || response.statusText}`
    );
  }

  const result = await response.json();
  console.log('Brevo email sent successfully:', { messageId: result.messageId, subject });
  return result;
}
