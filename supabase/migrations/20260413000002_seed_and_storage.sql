-- ============================================================
-- Pro Graphics — Admin Profile, Seed Data & Storage Setup
-- ============================================================

-- Insert admin profile for Keanu (existing user)
INSERT INTO admin_profiles (id, full_name, role, is_active) VALUES
  ('6b65ba91-e070-44b5-91c7-03e3c656dd28', 'Keanu', 'director', true)
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, role = EXCLUDED.role, is_active = true;

-- Seed pricing markups (if empty)
INSERT INTO pricing_markups (category, markup_type, markup_value, cost_basis, is_active) 
SELECT * FROM (VALUES
  ('vehicle-branding'::text, 'percentage'::text, 40.00::numeric, 'material_labor'::text, true),
  ('sign-boards', 'percentage', 35.00, 'material_labor', true),
  ('contravisions', 'percentage', 45.00, 'material_labor', true),
  ('stickers', 'percentage', 50.00, 'material_labor', true),
  ('promotional', 'percentage', 40.00, 'material_labor', true),
  ('banners', 'percentage', 35.00, 'material_labor', true),
  ('all', 'percentage', 30.00, 'material_labor', true)
) AS v(category, markup_type, markup_value, cost_basis, is_active)
WHERE NOT EXISTS (SELECT 1 FROM pricing_markups LIMIT 1);

-- Storage bucket for gallery
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('gallery-images', 'gallery-images', true, 5242880, ARRAY['image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 5242880, ARRAY['image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies (using DO blocks to avoid errors if they already exist)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read gallery images' AND tablename = 'objects') THEN
    CREATE POLICY "Public read gallery images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth upload gallery images' AND tablename = 'objects') THEN
    CREATE POLICY "Auth upload gallery images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth update gallery images' AND tablename = 'objects') THEN
    CREATE POLICY "Auth update gallery images" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth delete gallery images' AND tablename = 'objects') THEN
    CREATE POLICY "Auth delete gallery images" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read product images' AND tablename = 'objects') THEN
    CREATE POLICY "Public read product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth upload product images' AND tablename = 'objects') THEN
    CREATE POLICY "Auth upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth update product images' AND tablename = 'objects') THEN
    CREATE POLICY "Auth update product images" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Auth delete product images' AND tablename = 'objects') THEN
    CREATE POLICY "Auth delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  END IF;
END $$;
