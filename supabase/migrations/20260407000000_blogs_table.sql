-- ============================================================
-- Pro Graphics CMS — Blogs Table Migration
-- Enables dynamic blog management with SEO optimization
-- ============================================================

-- ── CREATE updated_at FUNCTION IF NOT EXISTS ──────────────
-- This function is used by multiple tables for auto-updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── BLOGS TABLE ────────────────────────────────────────────
CREATE TABLE blogs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  meta_title    TEXT,                          -- SEO meta title
  meta_description TEXT,                      -- SEO meta description
  slug          TEXT NOT NULL UNIQUE,         -- URL-friendly slug
  excerpt       TEXT,                         -- Short summary for listings
  content       TEXT NOT NULL,                -- Full blog content (markdown/html)
  author        TEXT DEFAULT 'Pro Graphics Team',
  category      TEXT NOT NULL,                -- e.g., 'Vehicle Branding', 'Signage'
  tags          TEXT[],                        -- Array of tags for filtering
  main_image    TEXT,                         -- Featured image URL
  published     BOOLEAN DEFAULT false,        -- Publishing status
  published_at  TIMESTAMPTZ,                  -- When published
  read_time     INTEGER,                      -- Estimated read time in minutes
  view_count    INTEGER DEFAULT 0,            -- Analytics: page views
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── INDEXES FOR PERFORMANCE ────────────────────────────────
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_published ON blogs(published, published_at DESC);
CREATE INDEX idx_blogs_category ON blogs(category) WHERE published = true;
CREATE INDEX idx_blogs_tags ON blogs USING GIN(tags) WHERE published = true;

-- ── AUTO-UPDATE updated_at TRIGGER ───────────────────────
CREATE TRIGGER trg_blogs_updated
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── ROW LEVEL SECURITY ────────────────────────────────────
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Public can READ published blogs
CREATE POLICY "Public read published blogs"
  ON blogs FOR SELECT USING (published = true);

-- Admin can do everything
CREATE POLICY "Admin full access blogs"
  ON blogs FOR ALL USING (auth.role() = 'authenticated');

-- ── FULL-TEXT SEARCH (Optional Enhancement) ───────────────
-- Add a search vector for content search
ALTER TABLE blogs ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(content, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(excerpt, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(category, '')), 'D')
  ) STORED;

CREATE INDEX idx_blogs_search ON blogs USING GIN(search_vector);

-- Function to search blogs
CREATE OR REPLACE FUNCTION search_blogs(query TEXT)
RETURNS SETOF blogs AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM blogs
  WHERE published = true
  AND search_vector @@ plainto_tsquery('english', query)
  ORDER BY ts_rank(search_vector, plainto_tsquery('english', query)) DESC;
END;
$$ LANGUAGE plpgsql;

-- ── ANALYTICS FUNCTION ─────────────────────────────────────
-- Increment view count safely
CREATE OR REPLACE FUNCTION increment_blog_views(blog_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE blogs
  SET view_count = view_count + 1
  WHERE slug = blog_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── SEED DATA: Categories Enum ─────────────────────────────
-- Categories help organize content for SEO silos
COMMENT ON COLUMN blogs.category IS 'Valid categories: Vehicle Branding, Sign Boards, Contravisions, Stickers, Promotional, Industry Insights, Case Studies';
