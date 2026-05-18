'use client';

import Script from 'next/script';

export default function BrevoTracker() {
  const clientKey = process.env.NEXT_PUBLIC_BREVO_CLIENT_KEY;

  if (!clientKey) return null;

  return (
    <>
      <Script src="https://cdn.brevo.com/js/sdk-loader.js" strategy="afterInteractive" />
      <Script id="brevo-init" strategy="afterInteractive">
        {`
          window.Brevo = window.Brevo || [];
          Brevo.push([
            "init",
            { client_key: "${clientKey}" }
          ]);
          Brevo.push(["trackPage"]); // Automatically tracks page views
        `}
      </Script>
    </>
  );
}