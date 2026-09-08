import { useEffect } from 'react';

export default function BrevoTracker() {
  const clientKey = import.meta.env.VITE_BREVO_CLIENT_KEY || import.meta.env.VITE_PUBLIC_BREVO_CLIENT_KEY;

  useEffect(() => {
    if (!clientKey) return;

    // Load sdk-loader.js
    const scriptLoader = document.createElement('script');
    scriptLoader.src = 'https://cdn.brevo.com/js/sdk-loader.js';
    scriptLoader.async = true;
    document.body.appendChild(scriptLoader);

    // Initialize Brevo
    const scriptInit = document.createElement('script');
    scriptInit.id = 'brevo-init';
    scriptInit.innerHTML = `
      window.Brevo = window.Brevo || [];
      Brevo.push([
        "init",
        { client_key: "${clientKey}" }
      ]);
      Brevo.push(["trackPage"]);
    `;
    document.body.appendChild(scriptInit);

    return () => {
      if (document.body.contains(scriptLoader)) {
        document.body.removeChild(scriptLoader);
      }
      const existingInit = document.getElementById('brevo-init');
      if (existingInit && document.body.contains(existingInit)) {
        document.body.removeChild(existingInit);
      }
    };
  }, [clientKey]);

  return null;
}