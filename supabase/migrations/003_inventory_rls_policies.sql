-- Migration: Inventory RLS Policies
-- Date: 2026-04-20

-- Enable RLS on all inventory tables
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_usage ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to perform all operations (Internal dashboard use)
CREATE POLICY "Allow authenticated users full access to materials" 
ON materials FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to inventory_orders" 
ON inventory_orders FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to material_usage" 
ON material_usage FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
