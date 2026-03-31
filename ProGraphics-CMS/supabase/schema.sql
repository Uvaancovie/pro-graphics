-- ============================================================
-- Pro Graphics CMS — Supabase Schema
-- Run this in your Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- ── Enable UUID extension ─────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PRODUCTS TABLE ────────────────────────────────────────
CREATE TABLE products (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  category    TEXT NOT NULL CHECK (category IN (
                'vehicle-branding','sign-boards','contravisions',
                'stickers','promotional','banners'
              )),
  description TEXT,
  short_desc  TEXT,
  features    TEXT[],           -- array of bullet features
  image_url   TEXT,
  is_visible  BOOLEAN DEFAULT true,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── PRICING PACKAGES TABLE ────────────────────────────────
CREATE TABLE pricing_packages (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id    UUID REFERENCES products(id) ON DELETE CASCADE,
  tier          TEXT NOT NULL CHECK (tier IN ('good','better','best')),
  label         TEXT NOT NULL,              -- e.g. "Entry Fleet"
  price_from    NUMERIC(10,2),             -- starting price in ZAR
  price_to      NUMERIC(10,2),             -- optional upper range
  unit          TEXT DEFAULT 'per vehicle', -- "per m²", "per unit", etc.
  includes      TEXT[],                     -- what's included
  is_popular    BOOLEAN DEFAULT false,
  is_visible    BOOLEAN DEFAULT true,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── GALLERY TABLE ─────────────────────────────────────────
CREATE TABLE gallery (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT,
  category    TEXT CHECK (category IN (
                'vehicle-branding','sign-boards','contravisions',
                'stickers','promotional','all'
              )),
  image_url   TEXT NOT NULL,
  storage_path TEXT NOT NULL,             -- path in Supabase Storage
  alt_text    TEXT,
  client_name TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_visible  BOOLEAN DEFAULT true,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── AUTO-UPDATE updated_at TRIGGER ───────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_pricing_updated
  BEFORE UPDATE ON pricing_packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_gallery_updated
  BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── ROW LEVEL SECURITY ────────────────────────────────────
ALTER TABLE products         ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery          ENABLE ROW LEVEL SECURITY;

-- Public can READ visible items
CREATE POLICY "Public read products"
  ON products FOR SELECT USING (is_visible = true);

CREATE POLICY "Public read pricing"
  ON pricing_packages FOR SELECT USING (is_visible = true);

CREATE POLICY "Public read gallery"
  ON gallery FOR SELECT USING (is_visible = true);

-- Authenticated (directors/admin) can do everything
CREATE POLICY "Admin full access products"
  ON products FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access pricing"
  ON pricing_packages FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access gallery"
  ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- ── STORAGE BUCKET ────────────────────────────────────────
-- Run separately in Supabase Dashboard → Storage → New Bucket
-- Bucket name: gallery-images
-- Public: true
-- Max file size: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp

-- ── SEED DATA (optional — remove in production) ──────────
INSERT INTO products (name, slug, category, short_desc, features, sort_order) VALUES
(
  'Vehicle Branding', 'vehicle-branding', 'vehicle-branding',
  'Turn your fleet into mobile billboards. 30,000–70,000 daily impressions.',
  ARRAY['Full wraps & partial graphics','3M & Avery Dennison materials','Design included','5-year outdoor durability'],
  1
),
(
  'Custom Sign Boards', 'sign-boards', 'sign-boards',
  'Chromadek, ABS, or Perspex signage for any environment.',
  ARRAY['Chromadek & ABS options','Full-colour digital print','Indoor & outdoor grades','Installation available'],
  2
),
(
  'Contravisions', 'contravisions', 'contravisions',
  'One-way vision window graphics. Advertise outside, see through inside.',
  ARRAY['One-way vision film','Perforated vinyl','Storefronts & vehicles','UV & weather resistant'],
  3
),
(
  'Custom Stickers', 'stickers', 'stickers',
  'Die-cut to perfection. Save up to 60% on volume orders.',
  ARRAY['Die-cut & sheet options','Gloss & matt finishes','Waterproof vinyl','Bulk pricing available'],
  4
);

INSERT INTO pricing_packages (product_id, tier, label, price_from, price_to, unit, includes, is_popular) VALUES
(
  (SELECT id FROM products WHERE slug='vehicle-branding'),
  'good','Partial Branding', 2500, 4500, 'per vehicle',
  ARRAY['Door & bonnet graphics','1 design revision','Standard vinyl','5-year guarantee'],
  false
),
(
  (SELECT id FROM products WHERE slug='vehicle-branding'),
  'better','Half Wrap', 5000, 8000, 'per vehicle',
  ARRAY['Half vehicle coverage','2 design revisions','Premium vinyl','5-year guarantee','Free design'],
  true
),
(
  (SELECT id FROM products WHERE slug='vehicle-branding'),
  'best','Full Wrap', 9000, 15000, 'per vehicle',
  ARRAY['100% vehicle coverage','Unlimited revisions','3M Premium vinyl','5-year guarantee','Free design','Free removal'],
  false
);
