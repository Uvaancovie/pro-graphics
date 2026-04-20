-- ============================================================
-- Pro Graphics — Lead Magnet Capture
-- Creates the public.leads table used by /api/capture-lead
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.leads (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email            TEXT NOT NULL UNIQUE,
  first_name       TEXT,
  source           TEXT,
  utm_source       TEXT,
  utm_medium       TEXT,
  utm_campaign     TEXT,
  lead_magnet      TEXT DEFAULT 'fleet-branding-playbook',
  brevo_contact_id BIGINT,
  email_sent       BOOLEAN DEFAULT false,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'leads'
      AND policyname = 'Service role only'
  ) THEN
    CREATE POLICY "Service role only"
      ON public.leads
      FOR ALL
      USING (auth.role() = 'service_role');
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads(created_at DESC);
