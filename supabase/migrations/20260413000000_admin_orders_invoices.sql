-- ============================================================
-- Pro Graphics CMS — Orders, Invoices & Pricing Markups
-- Run this in your Supabase SQL Editor
-- ============================================================

-- ── CREATE update_updated_at FUNCTION IF NOT EXISTS ─────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- ── CUSTOMERS TABLE ────────────────────────────────────────
CREATE TABLE customers (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  company     TEXT,
  phone       TEXT,
  address     TEXT,
  city        TEXT,
  postal_code TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── ORDERS TABLE ───────────────────────────────────────────
CREATE TABLE orders (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number  TEXT UNIQUE NOT NULL, -- e.g., ORD-2026-0001
  customer_id   UUID REFERENCES customers(id) ON DELETE SET NULL,

  -- Customer snapshot (in case customer deleted)
  customer_email TEXT NOT NULL,
  customer_name  TEXT NOT NULL,
  customer_company TEXT,
  customer_phone TEXT,
  customer_address TEXT,

  -- Order details
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'processing', 'ready', 'delivered', 'cancelled')),
  priority      TEXT DEFAULT 'normal'
                CHECK (priority IN ('low', 'normal', 'high', 'urgent')),

  -- Financial
  subtotal      NUMERIC(10,2) NOT NULL DEFAULT 0,
  tax_rate      NUMERIC(5,2) DEFAULT 15.00, -- 15% VAT
  tax_amount    NUMERIC(10,2) DEFAULT 0,
  total         NUMERIC(10,2) NOT NULL DEFAULT 0,

  -- Delivery
  delivery_method TEXT DEFAULT 'pickup'
                  CHECK (delivery_method IN ('pickup', 'delivery', 'courier')),
  delivery_date   DATE,
  delivery_notes  TEXT,

  -- Admin
  assigned_to   UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes         TEXT,

  -- Timestamps
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  completed_at  TIMESTAMPTZ
);

-- ── ORDER ITEMS TABLE ────────────────────────────────────
CREATE TABLE order_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id    UUID, -- optional FK to products, added separately if table exists

  -- Product snapshot
  product_name  TEXT NOT NULL,
  product_category TEXT,

  -- Item details
  description   TEXT NOT NULL,
  quantity      INTEGER NOT NULL DEFAULT 1,
  unit_price    NUMERIC(10,2) NOT NULL,
  markup_percent NUMERIC(5,2) DEFAULT 0, -- store markup applied

  -- Calculated
  line_total    NUMERIC(10,2) GENERATED ALWAYS AS
                  (quantity * unit_price * (1 + markup_percent/100)) STORED,

  -- Custom specs
  dimensions    TEXT, -- e.g., "1200x900mm"
  material      TEXT,
  finish        TEXT,
  artwork_url   TEXT, -- stored file path

  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── INVOICES TABLE ────────────────────────────────────────
CREATE TABLE invoices (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number  TEXT UNIQUE NOT NULL, -- e.g., INV-2026-0001
  order_id        UUID REFERENCES orders(id) ON DELETE SET NULL,
  customer_id     UUID REFERENCES customers(id) ON DELETE SET NULL,

  -- Invoice status
  status          TEXT DEFAULT 'draft'
                  CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),

  -- Financial (mirrors order at time of invoice)
  subtotal        NUMERIC(10,2) NOT NULL,
  tax_rate        NUMERIC(5,2) NOT NULL,
  tax_amount      NUMERIC(10,2) NOT NULL,
  total           NUMERIC(10,2) NOT NULL,
  amount_paid     NUMERIC(10,2) DEFAULT 0,
  amount_due      NUMERIC(10,2) GENERATED ALWAYS AS (total - amount_paid) STORED,

  -- Dates
  issue_date      DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date        DATE NOT NULL, -- typically issue_date + 30 days
  paid_date       DATE,

  -- PDF generation
  pdf_url         TEXT, -- path to stored PDF
  pdf_generated_at TIMESTAMPTZ,

  -- Metadata
  notes           TEXT,
  terms           TEXT DEFAULT 'Payment due within 30 days. EFT preferred.',

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── PRICING MARKUPS TABLE ─────────────────────────────────
CREATE TABLE pricing_markups (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category        TEXT NOT NULL CHECK (category IN (
                    'vehicle-branding','sign-boards','contravisions',
                    'stickers','promotional','banners','all'
                  )),
  subcategory     TEXT, -- optional, e.g., "fleet-wraps"

  -- Markup settings
  markup_type     TEXT DEFAULT 'percentage'
                  CHECK (markup_type IN ('percentage', 'fixed')),
  markup_value    NUMERIC(10,2) NOT NULL DEFAULT 30.00, -- 30% or fixed amount

  -- Cost basis
  cost_basis      TEXT DEFAULT 'material_labor'
                  CHECK (cost_basis IN ('material_only', 'material_labor', 'wholesale')),

  -- Constraints
  min_markup      NUMERIC(10,2), -- minimum markup amount
  max_markup      NUMERIC(10,2), -- maximum markup amount (optional cap)

  -- Active period
  is_active       BOOLEAN DEFAULT true,
  valid_from      DATE DEFAULT CURRENT_DATE,
  valid_until     DATE, -- null = indefinite

  -- Admin
  created_by      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(category, subcategory, is_active, valid_from)
);

-- ── ACTIVITY LOG TABLE ───────────────────────────────────
CREATE TABLE admin_activity_log (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email    TEXT,
  action        TEXT NOT NULL, -- e.g., 'order_created', 'invoice_sent'
  entity_type   TEXT NOT NULL, -- e.g., 'order', 'invoice', 'product'
  entity_id     UUID,
  details       JSONB,
  ip_address    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── TRIGGERS ───────────────────────────────────────────────
CREATE TRIGGER trg_orders_updated
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_invoices_updated
  BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_customers_updated
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_pricing_markups_updated
  BEFORE UPDATE ON pricing_markups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── FUNCTIONS ─────────────────────────────────────────────

-- Generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  year TEXT;
  next_num INTEGER;
  new_number TEXT;
BEGIN
  year := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;

  SELECT COALESCE(MAX(NULLIF(regexp_replace(order_number, '^ORD-' || year || '-', ''), '')), '0')::INTEGER + 1
  INTO next_num
  FROM orders
  WHERE order_number LIKE 'ORD-' || year || '-%';

  new_number := 'ORD-' || year || '-' || LPAD(next_num::TEXT, 4, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Generate invoice number
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
  year TEXT;
  next_num INTEGER;
  new_number TEXT;
BEGIN
  year := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;

  SELECT COALESCE(MAX(NULLIF(regexp_replace(invoice_number, '^INV-' || year || '-', ''), '')), '0')::INTEGER + 1
  INTO next_num
  FROM invoices
  WHERE invoice_number LIKE 'INV-' || year || '-%';

  new_number := 'INV-' || year || '-' || LPAD(next_num::TEXT, 4, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Auto-set order_number on insert
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_orders_set_number
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION set_order_number();

-- Auto-set invoice_number on insert
CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL THEN
    NEW.invoice_number := generate_invoice_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_invoices_set_number
  BEFORE INSERT ON invoices
  FOR EACH ROW EXECUTE FUNCTION set_invoice_number();

-- Calculate order totals
CREATE OR REPLACE FUNCTION calculate_order_totals()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE orders
  SET
    subtotal = COALESCE((SELECT SUM(line_total) FROM order_items WHERE order_id = NEW.order_id), 0),
    tax_amount = COALESCE((SELECT SUM(line_total) FROM order_items WHERE order_id = NEW.order_id), 0) * (tax_rate / 100),
    total = COALESCE((SELECT SUM(line_total) FROM order_items WHERE order_id = NEW.order_id), 0) * (1 + tax_rate / 100)
  WHERE id = NEW.order_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_order_items_calculate
  AFTER INSERT OR UPDATE OR DELETE ON order_items
  FOR EACH ROW EXECUTE FUNCTION calculate_order_totals();

-- ── ROW LEVEL SECURITY ───────────────────────────────────
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_markups ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Admins have full access
CREATE POLICY "Admin full access customers"
  ON customers FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access orders"
  ON orders FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access order items"
  ON order_items FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access invoices"
  ON invoices FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access pricing markups"
  ON pricing_markups FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access activity log"
  ON admin_activity_log FOR ALL USING (auth.role() = 'authenticated');

-- ── INDEXES ───────────────────────────────────────────────
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_assigned ON orders(assigned_to);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_order ON invoices(order_id);
CREATE INDEX idx_invoices_due ON invoices(due_date);
CREATE INDEX idx_activity_log_user ON admin_activity_log(user_id);
CREATE INDEX idx_activity_log_entity ON admin_activity_log(entity_type, entity_id);

-- ── ADD PRODUCT FK (if products table exists) ────────────
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'products') THEN
    ALTER TABLE order_items
      ADD CONSTRAINT fk_order_items_product
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL;
  END IF;
END $$;

-- ── SEED DATA ─────────────────────────────────────────────
-- Default markup rules
INSERT INTO pricing_markups (category, markup_type, markup_value, cost_basis, is_active) VALUES
('vehicle-branding', 'percentage', 40.00, 'material_labor', true),
('sign-boards', 'percentage', 35.00, 'material_labor', true),
('contravisions', 'percentage', 45.00, 'material_labor', true),
('stickers', 'percentage', 50.00, 'material_labor', true),
('promotional', 'percentage', 40.00, 'material_labor', true),
('banners', 'percentage', 35.00, 'material_labor', true),
('all', 'percentage', 30.00, 'material_labor', true); -- fallback
