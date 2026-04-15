'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/ui/Button';

type NewsletterPopupForm = {
  name: string;
  email: string;
  consentGiven: boolean;
};

const STORAGE_DISMISSED_KEY = 'newsletter-popup-dismissed';
const STORAGE_SUBSCRIBED_KEY = 'newsletter-popup-subscribed';

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState<NewsletterPopupForm>({
    name: '',
    email: '',
    consentGiven: false,
  });

  const canSubmit = useMemo(() => {
    return form.email.trim().length > 3 && form.consentGiven && !isSubmitting;
  }, [form, isSubmitting]);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_DISMISSED_KEY) === 'true';
    const subscribed = localStorage.getItem(STORAGE_SUBSCRIBED_KEY) === 'true';

    if (dismissed || subscribed) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  function closePopup() {
    setIsOpen(false);
    localStorage.setItem(STORAGE_DISMISSED_KEY, 'true');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg('');

    if (!canSubmit) {
      setErrorMsg('Please enter a valid email and consent to continue.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          consentGiven: form.consentGiven,
          consentTimestamp: new Date().toISOString(),
          source: 'homepage-popup',
        }),
      });

      if (!response.ok) {
        throw new Error('Subscribe request failed');
      }

      localStorage.setItem(STORAGE_SUBSCRIBED_KEY, 'true');
      setIsSuccess(true);

      window.setTimeout(() => {
        setIsOpen(false);
      }, 1800);
    } catch (error) {
      console.error('Newsletter popup error:', error);
      setErrorMsg('Could not subscribe right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[280px] md:min-h-full">
            <Image
              src="/images/ads/vehicle-branding.jpeg"
              alt="Professional vehicle branding examples in Durban"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-blue-950/65" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="inline-flex items-center rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white mb-3">
                Free Insights
              </p>
              <h3 className="text-2xl font-bold leading-tight">Get weekly Durban branding ideas that drive enquiries</h3>
              <p className="text-blue-100 mt-2 text-sm">
                Short, practical tips for fleet branding, sign boards, and local lead generation.
              </p>
            </div>
          </div>

          <div className="p-6 md:p-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h4 className="text-2xl font-bold text-blue-950">Join the Pro Graphics newsletter</h4>
                <p className="text-sm text-gray-600 mt-1">Actionable advice, occasional offers, and no spam.</p>
              </div>
              <button
                type="button"
                onClick={closePopup}
                className="text-gray-500 hover:text-blue-950 transition-colors"
                aria-label="Close newsletter popup"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-2 text-center">
                <p className="text-xs font-bold text-blue-900">Local</p>
                <p className="text-[11px] text-gray-600">Durban-focused</p>
              </div>
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-2 text-center">
                <p className="text-xs font-bold text-blue-900">Practical</p>
                <p className="text-[11px] text-gray-600">Quick wins</p>
              </div>
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-2 text-center">
                <p className="text-xs font-bold text-blue-900">Free</p>
                <p className="text-[11px] text-gray-600">No cost guides</p>
              </div>
            </div>

            {isSuccess ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
                You are subscribed. Please check your inbox for confirmation.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Full name (optional)"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-blue-950 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="Work email address"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-blue-950 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none"
                />

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consentGiven}
                    onChange={(event) => setForm((prev) => ({ ...prev, consentGiven: event.target.checked }))}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to receive newsletter emails and understand I can unsubscribe at any time.
                  </span>
                </label>

                {errorMsg && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" disabled={!canSubmit} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white border-none">
                    {isSubmitting ? 'Subscribing...' : 'Get Free Tips'}
                  </Button>
                  <Button type="button" variant="outline" onClick={closePopup} className="flex-1">
                    Not now
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
