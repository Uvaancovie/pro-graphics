import { NextResponse } from 'next/server';
import { securityMiddleware, corsHeaders } from '@/lib/security';
import { sendBrevoSmtpEmail } from '@/lib/brevo-smtp';
import { getBrevoListId, upsertBrevoContact } from '@/lib/brevo';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
    try {
        const securityResponse = await securityMiddleware(req);
        if (securityResponse) return securityResponse;

        const { name, email, company, consentGiven, consentTimestamp } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400, headers: corsHeaders });
        }

        if (!consentGiven) {
            return NextResponse.json({ error: 'Consent is required' }, { status: 400, headers: corsHeaders });
        }

        const adminNotificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'i.t.safuneralsupplies@gmail.com';

        // Split name into first and last name for Brevo attributes
        const nameParts = name ? name.split(' ') : [''];
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        const leadCaptureListId = getBrevoListId('BREVO_LEAD_CAPTURE_LIST_ID', getBrevoListId('BREVO_LEADS_LIST_ID', 2));

        try {
          await upsertBrevoContact({
            email,
            listIds: [leadCaptureListId],
            attributes: {
              FIRSTNAME: firstName,
              LASTNAME: lastName,
              COMPANY: company || '',
              OPT_IN: true,
              CONSENT_DATE: consentTimestamp,
              LEAD_SOURCE: 'lead-capture',
            },
          });
        } catch (contactError) {
          console.error('Brevo Contact error:', contactError);
        }

        // 2. Send admin notification for this lead capture submission
        try {
            await sendBrevoSmtpEmail({
                to: [
                    {
                        email: adminNotificationEmail,
                        name: "Pro Graphics Admin"
                    }
                ],
                subject: "New Lead Capture Submission",
                html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f9fafb; padding: 24px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; border: 1px solid #e5e7eb; padding: 28px;">
              <h2 style="color: #1e3a8a; margin-top: 0;">New Lead Capture Submission</h2>
              <p><strong>Name:</strong> ${name || 'N/A'}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || 'N/A'}</p>
              <p><strong>Consent Timestamp:</strong> ${consentTimestamp || new Date().toISOString()}</p>
            </div>
          </body>
          </html>
        `
            });
        } catch (adminNotificationError) {
            console.error('Brevo SMTP Admin Notification error:', adminNotificationError);
        }

        // 3. Send the Transactional Email with the Lead Magnet Link
        let emailErrorData: unknown = null;
        try {
            await sendBrevoSmtpEmail({
                to: [
                    {
                        email: email,
                        name: name || "Valued Customer"
                    }
                ],
                subject: "Your 10 Signage Mistakes Guide from Pro Graphics",
                html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { padding: 40px 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafb; border-radius: 8px; }
              .header { text-align: center; margin-bottom: 30px; }
              .header h2 { color: #1e3a8a; } /* Blue color */
              .btn { display: inline-block; padding: 14px 28px; background-color: #d97706; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .footer { margin-top: 40px; font-size: 13px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Your Signage Mistakes Guide is Here!</h2>
              </div>
              <p>Hi ${firstName || 'there'},</p>
              <p>Thank you for requesting our exclusive guide! Discovering these <strong>10 Common Signage Mistakes</strong> will help you save time, reduce costs, and ensure your brand stands out for all the right reasons.</p>
              
              <div style="text-align: center;">
                <p>Click the button below to download or view your PDF guide:</p>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://pro-graphics.vercel.app'}/lead-magnet/ProGraphics_SignageMistakes_Guide.pdf" class="btn" style="color: #ffffff;">Download the Guide Now</a>
              </div>

              <p>If you're looking to elevate your business's visual presence and avoid these costly errors, our team is ready to help. Feel free to reply directly to this email if you have any questions or want to discuss your next project.</p>
              
              <p>To your success,<br><strong>The Pro Graphics Team</strong></p>
              
              <div class="footer">
                <p>© Pro Graphics | Durban, South Africa</p>
                <p>You received this email because you requested the Signage Mistakes guide on our website.</p>
              </div>
            </div>
          </body>
          </html>
        `
            });
        } catch (smtpEmailError) {
            emailErrorData = smtpEmailError;
        }

        if (emailErrorData) {
            console.error('Brevo Email error:', emailErrorData);
            return NextResponse.json({ error: 'Failed to send the email' }, { status: 500, headers: corsHeaders });
        }

        return NextResponse.json({ message: 'Success' }, { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error('Lead capture error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
    }
}
