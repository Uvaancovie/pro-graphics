import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

export function initPostHog() {
  if (posthogKey && posthogKey.trim() !== '') {
    posthog.init(posthogKey, {
      api_host: posthogHost || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false,
    });
  }
}

export function PostHogPageView() {
  const location = useLocation();

  useEffect(() => {
    if (posthogKey && posthogKey.trim() !== '') {
      posthog.capture('$pageview', { $current_url: window.location.href });
    }
  }, [location]);

  return null;
}

