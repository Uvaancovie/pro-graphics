-- SQL Migration for Canvas Sales Store
-- Stores your uploaded canvas works with price/dimension data

CREATE TABLE public.canvas_products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_url text NOT NULL,
  base_price numeric NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.canvas_options (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.canvas_products(id) ON DELETE CASCADE,
  size_name text NOT NULL,   -- e.g., "A4 (210x297mm)" or "Medium (500x700mm)"
  material text NOT NULL,    -- e.g., "Standard Canvas", "Premium Gloss Canvas"
  price_override numeric,    -- Explicit price for this option
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.canvas_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canvas_options ENABLE ROW LEVEL SECURITY;

-- Anonymous users can read active products (for public display)
CREATE POLICY "Enable read access for all users on active products"
  ON public.canvas_products FOR SELECT
  USING (is_active = true);

-- Anonymous users can read options for active products
CREATE POLICY "Enable read access for all users on options"
  ON public.canvas_options FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.canvas_products
      WHERE canvas_products.id = canvas_options.product_id
      AND canvas_products.is_active = true
    )
  );
