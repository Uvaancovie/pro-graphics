# Vehicle Wrap Pricing Lead Magnet (Brevo)

## Implemented in this project

- Popup endpoint: `/api/capture-lead`
- Form endpoint: `/api/lead-capture`
- Lead magnet file: `/public/lead-magnet/ProGraphics_VehicleWrapPricing_Guide.md`
- Admin notifications: `ADMIN_NOTIFICATION_EMAIL`
- Transactional sender: `BREVO_SMTP_FROM_EMAIL` / `BREVO_SMTP_FROM_NAME`

## Required environment variables

```dotenv
BREVO_API_KEY=...
ADMIN_NOTIFICATION_EMAIL=i.t.safuneralsupplies@gmail.com
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_LOGIN=a2dec4001@smtp-brevo.com
BREVO_SMTP_PASSWORD=...
BREVO_SMTP_FROM_EMAIL=i.t.safuneralsupplies@gmail.com
BREVO_SMTP_FROM_NAME=Pro Graphics
BREVO_LIST_ID=2
BREVO_LEAD_CAPTURE_LIST_ID=2
NEXT_PUBLIC_SITE_URL=https://pro-graphics.vercel.app
```

## Brevo dashboard checklist

1. Verify sender identity for `i.t.safuneralsupplies@gmail.com`
2. Confirm contact list ID `2` exists (or update env to your preferred list)
3. Confirm transactional emails are enabled
4. Send test to yourself and verify delivery + links

## End-to-end test

1. Open any page showing the lead popup
2. Submit first name + email
3. Confirm:
   - contact appears in Brevo list
   - admin receives new lead notification
   - lead receives "Vehicle Wrap Pricing Estimator" email
   - email link opens `/lead-magnet/ProGraphics_VehicleWrapPricing_Guide.md`
