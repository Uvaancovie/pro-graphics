import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, business, phone, email, vehicleType, message, quoteFileUrl } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
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
          LASTNAME: lastName
        },
        listIds: [2] // Leads list
      })
    });

    if (!contactRes.ok) {
      const errorData = await contactRes.json();
      console.error('Brevo Contact error:', errorData);
      // Don't fail if the contact creation fails (e.g. if they already exist)
    }

    // 2. Send the Notification Email to the business owner
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
            email: "i.t.safuneralsupplies@gmail.com",
            name: "Pro Graphics Sales"
          }
        ],
        subject: "🚨 NEW PRICE BEAT CHALLENGE RECEIVED! 🚨",
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { padding: 40px 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
              .header { text-align: center; margin-bottom: 30px; background-color: #1e3a8a; color: white; padding: 20px; border-radius: 6px; }
              .header h2 { margin: 0; }
              .details { margin: 20px 0; background: white; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb; }
              .details p { margin: 10px 0; }
              .label { font-weight: bold; color: #4b5563; display: inline-block; width: 120px; }
              .btn { display: inline-block; padding: 14px 28px; background-color: #d97706; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; text-align: center; width: 100%; box-sizing: border-box; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Price Beat Request 📈</h2>
              </div>
              <p>A new prospect has submitted a quote for you to beat!</p>
              
              <div class="details">
                <p><span class="label">Name:</span> ${name}</p>
                <p><span class="label">Business:</span> ${business || 'N/A'}</p>
                <p><span class="label">Phone:</span> ${phone}</p>
                <p><span class="label">Email:</span> ${email}</p>
                <p><span class="label">Vehicle Type:</span> ${vehicleType || 'N/A'}</p>
                <p><span class="label">Message:</span> <br><i>${message || 'No additional info provided.'}</i></p>
              </div>
              
              <div style="text-align: center;">
                <p>Click below to view the competitor's quote they uploaded:</p>
                <a href="${quoteFileUrl}" class="btn">View Competitor Quote</a>
              </div>

              <p style="margin-top: 30px; font-size: 14px; color: #6b7280; text-align: center;">
                Pro Graphics Automated Sales System
              </p>
            </div>
          </body>
          </html>
        `
      })
    });

    if (!emailRes.ok) {
      const emailErrorData = await emailRes.json();
      console.error('Brevo Email error (notification):', emailErrorData);
      return NextResponse.json({ error: 'Failed to send the email notification' }, { status: 500 });
    }

    // 3. Send a Thank You Email to the Customer
    const thankYouRes = await fetch('https://api.brevo.com/v3/smtp/email', {
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
        subject: "We've received your Price Beat Challenge! 🤝",
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { padding: 40px 20px; max-width: 600px; margin: 0 auto; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
              .header { text-align: center; margin-bottom: 30px; background-color: #d97706; color: white; padding: 20px; border-radius: 6px; }
              .header h2 { margin: 0; }
              .content { background: white; padding: 30px; border-radius: 6px; border: 1px solid #e5e7eb; }
              .footer { margin-top: 30px; font-size: 13px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Your Request! 🎉</h2>
              </div>
              
              <div class="content">
                <p>Hi ${firstName || 'there'},</p>
                <p>We've successfully received your Price Beat submission and attached quote.</p>
                <p>Our team is reviewing the competitor's quote to ensure equal material specifications. We will get back to you within <strong>24 hours</strong> with your new proposal, guaranteed to be 10% cheaper!</p>
                <p>If you have any immediate questions, feel free to reply directly to this email or call us at <strong>031 508 6700</strong>.</p>
                <p>Best regards,<br><strong>The Pro Graphics Team</strong></p>
              </div>

              <div class="footer">
                <p>© Pro Graphics | Durban, South Africa</p>
                <p>158 Phoenix Industrial Park, 160 Aberdare Dr, Phoenix, Durban, 4090</p>
              </div>
            </div>
          </body>
          </html>
        `
      })
    });

    if (!thankYouRes.ok) {
      const thankYouErrorData = await thankYouRes.json();
      console.error('Brevo Email error (thank you):', thankYouErrorData);
      // We won't block the 200 Success if the thank you fails, but we'll log it.
    }

    return NextResponse.json({ message: 'Success' });

  } catch (error) {
    console.error('Price beat capture error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
