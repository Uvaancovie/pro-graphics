import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name, email, company } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const apiKey = process.env.BREVO_API_KEY;

        if (!apiKey) {
            console.error('Missing BREVO_API_KEY');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Split name into first and last name for Brevo attributes
        const nameParts = name ? name.split(' ') : [''];
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        // 1. Add contact to Brevo
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
                    COMPANY: company || ''
                },
                listIds: [2] // You can change this to your actual Brevo list ID for Leads
            })
        });

        if (!contactRes.ok) {
            const errorData = await contactRes.json();
            console.error('Brevo Contact error:', errorData);
            // We don't fail here because the contact might just exist, updateEnabled should handle it though
        }

        // 2. Send the Transactional Email with the Lead Magnet Link
        const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify({
                sender: {
                    name: "Pro Graphics",
                    email: "i.t.safuneralsupplies@gmail.com"
                },
                to: [
                    {
                        email: email,
                        name: name || "Valued Customer"
                    }
                ],
                subject: "Your 10 Signage Mistakes Guide from Pro Graphics 🚀",
                htmlContent: `
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
                <h2>Your Signage Mistakes Guide is Here! 🎯</h2>
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
            })
        });

        if (!emailRes.ok) {
            const emailErrorData = await emailRes.json();
            console.error('Brevo Email error:', emailErrorData);
            return NextResponse.json({ error: 'Failed to send the email' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Success' });

    } catch (error) {
        console.error('Lead capture error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
