## All form submissions need to be saved to <i.t.safuneralsupplies@gmail.com>

this would be for any forms :
-/price-beat
-/general-submission

the user must receive a thank you , your email has been received

the admin must receive a submission has been received message .

make sure to use the brevo mcp to help get this done

---

## ✅ STATUS: COMPLETED (2026-03-30)

### What was done

1. **Replaced nodemailer SMTP with Brevo HTTP Transactional API** (`lib/brevo-smtp.ts`)
   - Old: Used nodemailer + SMTP relay → emails were being rewritten to `@brevosend.com` and not delivered
   - New: Uses Brevo's `POST /v3/smtp/email` API with your `BREVO_API_KEY` → reliable delivery
   - Sender: `i.t.safuneralsupplies@gmail.com` (verified Brevo Sender ID: 1)

2. **Added sender env vars** to `.env.local`:
   - `BREVO_SMTP_FROM_EMAIL=i.t.safuneralsupplies@gmail.com`
   - `BREVO_SMTP_FROM_NAME=Pro Graphics`

3. **Verified end-to-end flow**

   - Direct API test email → ✅ Delivered (messageId confirmed)
   - `/api/general-submission` test → ✅ Status 200, Brevo contact updated
   - Brevo contact restored after test


### Architecture

```mermaid
flowchart TD
submits form
    → Frontend validates + saves to Supabase
    → POST to /api/{price-beat|general-submission}
        → Save/update Brevo contact (List 2)
        → Send admin notification email → i.t.safuneralsupplies@gmail.com
        → Send thank-you email → customer's email
        → Return success
```


### Environment Variables Required (Vercel + .env.local)

- `BREVO_API_KEY` — Used for both contacts API and email sending
- `BREVO_SMTP_FROM_EMAIL` — Verified sender email
- `BREVO_SMTP_FROM_NAME` — Sender display name
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `ADMIN_NOTIFICATION_EMAIL` — Override admin email (defaults to i.t.safuneralsupplies@gmail.com)
