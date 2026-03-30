import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
const SMTP_PORT = Number(process.env.BREVO_SMTP_PORT || 587);
const SMTP_LOGIN = process.env.BREVO_SMTP_LOGIN || process.env.BREVO_SMTP_USER || 'a2dec4001@smtp-brevo.com';
const SMTP_PASSWORD =
  process.env.BREVO_SMTP_PASSWORD ||
  process.env.BREVO_SMTP_PASS ||
  process.env.BREVO_SMTP_KEY ||
  process.env.SMTP_KEY ||
  process.env['SMTP-KEY'] ||
  '';
const FROM_EMAIL = process.env.BREVO_SMTP_FROM_EMAIL || 'gdesigners14@gmail.com';
const FROM_NAME = process.env.BREVO_SMTP_FROM_NAME || 'Pro Graphics';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!SMTP_PASSWORD) {
    throw new Error('Missing BREVO_SMTP_PASSWORD for SMTP email delivery');
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_LOGIN,
        pass: SMTP_PASSWORD,
      },
    });
  }

  return transporter;
}

type Recipient = { email: string; name?: string };

function formatRecipients(recipients: Recipient[]) {
  return recipients.map((recipient) => {
    if (recipient.name) {
      return `"${recipient.name}" <${recipient.email}>`;
    }
    return recipient.email;
  }).join(', ');
}

type SendBrevoSmtpEmailArgs = {
  to: Recipient[];
  subject: string;
  html: string;
  text?: string;
};

export async function sendBrevoSmtpEmail({ to, subject, html, text }: SendBrevoSmtpEmailArgs) {
  const mailer = getTransporter();

  return mailer.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: formatRecipients(to),
    subject,
    html,
    text,
  });
}
