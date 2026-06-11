import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

export function initPostHog() {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false,
  });
}

export function PostHogPageView() {
  const location = useLocation();

  useEffect(() => {
    posthog.capture('$pageview', { $current_url: window.location.href });
  }, [location]);

  return null;
}
