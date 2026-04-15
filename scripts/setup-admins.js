/**
 * Admin User Setup Script for Pro Graphics CMS
 *
 * This script creates the three admin users in Supabase.
 * Run with: node scripts/setup-admins.js
 *
 * Requires: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env variables
 */

const { createClient } = require('@supabase/supabase-js');

// Configuration - Update these with actual emails
const ADMIN_USERS = [
  {
    email: 'kemron@prographics.co.za',
    password: generateSecurePassword(),
    fullName: 'Kemron',
    role: 'director',
  },
  {
    email: 'keanu@prographics.co.za',
    password: generateSecurePassword(),
    fullName: 'Keanu',
    role: 'director',
  },
  {
    email: 'uvaan@prographics.co.za',
    password: generateSecurePassword(),
    fullName: 'Uvaan',
    role: 'director',
  },
];

function generateSecurePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function setupAdmins() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('❌ Error: Missing Supabase credentials');
    console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log('🔧 Setting up Pro Graphics admin users...\n');

  const results = [];

  for (const admin of ADMIN_USERS) {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('admin_profiles')
        .select('id')
        .eq('full_name', admin.fullName)
        .single();

      if (existingUser) {
        console.log(`⚠️  ${admin.fullName} already exists, skipping...`);
        continue;
      }

      // Create user in Supabase Auth
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: admin.email,
        password: admin.password,
        email_confirm: true, // Auto-confirm email
      });

      if (authError) {
        throw authError;
      }

      // Create admin profile
      const { error: profileError } = await supabase
        .from('admin_profiles')
        .insert({
          id: authUser.user.id,
          full_name: admin.fullName,
          role: admin.role,
        });

      if (profileError) {
        throw profileError;
      }

      results.push({
        name: admin.fullName,
        email: admin.email,
        password: admin.password,
        success: true,
      });

      console.log(`✅ Created user: ${admin.fullName}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Password: ${admin.password}`);
      console.log('');
    } catch (error) {
      results.push({
        name: admin.fullName,
        email: admin.email,
        success: false,
        error: error.message,
      });
      console.error(`❌ Failed to create ${admin.fullName}:`, error.message);
    }
  }

  console.log('\n📋 Summary:');
  console.log('==========');
  results.forEach((r) => {
    if (r.success) {
      console.log(`✅ ${r.name}: ${r.email}`);
      console.log(`   Password: ${r.password}`);
    } else {
      console.log(`❌ ${r.name}: ${r.error}`);
    }
  });

  console.log('\n⚠️  IMPORTANT: Save these passwords securely!');
  console.log('   They will not be shown again.');
}

// Run if executed directly
if (require.main === module) {
  setupAdmins();
}

module.exports = { setupAdmins, ADMIN_USERS };
