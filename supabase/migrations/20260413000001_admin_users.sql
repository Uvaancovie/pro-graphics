-- ============================================================
-- Pro Graphics CMS — Admin Users Setup
-- Run this in your Supabase SQL Editor
-- ============================================================

-- This migration sets up the three admin users: Kemron, Keanu, and Uvaan
-- You'll need to manually create these users in Supabase Auth Dashboard
-- or use the Supabase Admin API.

-- The user emails should be:
-- - kemron@prographics.co.za (or personal email)
-- - keanu@prographics.co.za (or personal email)
-- - uvaan@prographics.co.za (or personal email)

-- ── USER PROFILES TABLE ───────────────────────────────────
-- Optional: Extended profile info for admin users
CREATE TABLE admin_profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'director'
                  CHECK (role IN ('director', 'manager', 'staff')),
  department    TEXT,
  phone         TEXT,
  avatar_url    TEXT,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger for updated_at
CREATE TRIGGER trg_admin_profiles_updated
  BEFORE UPDATE ON admin_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read profiles"
  ON admin_profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update own profile"
  ON admin_profiles FOR UPDATE USING (auth.uid() = id);

-- Insert profiles (run after users are created in Auth dashboard)
-- Uncomment and modify when you have the user UUIDs from Supabase Auth:

-- INSERT INTO admin_profiles (id, full_name, role) VALUES
--   ('USER_UUID_HERE', 'Kemron', 'director'),
--   ('USER_UUID_HERE', 'Keanu', 'director'),
--   ('USER_UUID_HERE', 'Uvaan', 'director');

-- ── USER SETUP INSTRUCTIONS ────────────────────────────────
/*

To set up the three admin users:

1. Go to your Supabase Dashboard → Authentication → Users

2. Click "Add User" for each of the three admins:
   - Email: kemron@prographics.co.za (or personal email)
   - Email: keanu@prographics.co.za (or personal email)
   - Email: uvaan@prographics.co.za (or personal email)

3. Set strong passwords for each user (share securely)

4. Get their User IDs (UUIDs) from the Users table

5. Run this SQL with the actual UUIDs:

   INSERT INTO admin_profiles (id, full_name, role) VALUES
     ('KEMRON_UUID', 'Kemron', 'director'),
     ('KEANU_UUID', 'Keanu', 'director'),
     ('UVAAN_UUID', 'Uvaan', 'director');

6. Alternative: Use the Node.js script in scripts/setup-admins.js

*/
