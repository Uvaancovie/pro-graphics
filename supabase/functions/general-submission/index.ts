const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const FROM_EMAIL = "i.t.safuneralsupplies@gmail.com";
const FROM_NAME = "Pro Graphics";
const ADMIN_EMAIL = "i.t.safuneralsupplies@gmail.com";

async function sendEmail(apiKey: string, to: { email: string; name?: string }[], subject: string, html: string) {
  const res = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: to.map((r) => ({ email: r.email, name: r.name || r.email })),
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const body = await req.json();
    const { fullName, email, company, urgency, summary, queryType, consentTimestamp } = body;

    if (!fullName || !email || !summary) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const apiKey = Deno.env.get("BREVO_API_KEY");
    if (!apiKey) {
      console.error("Missing BREVO_API_KEY environment variable");
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const adminHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1e3a5f;">New General Submission</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${fullName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${company || "N/A"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Query Type</td><td style="padding:8px;border-bottom:1px solid #eee;">${queryType || "N/A"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Urgency</td><td style="padding:8px;border-bottom:1px solid #eee;">${urgency || "normal"}</td></tr>
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
        apiKey,
        [{ email: ADMIN_EMAIL, name: "Pro Graphics Admin" }],
        `New General Submission from ${fullName}`,
        adminHtml,
      ),
      sendEmail(
        apiKey,
        [{ email, name: fullName }],
        "We received your enquiry - Pro Graphics",
        userHtml,
      ),
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("General submission error:", error);
    return new Response(JSON.stringify({ error: "Failed to process submission" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
