// Check what tables exist in the Supabase database
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function checkDB() {
  console.log('🔍 Checking Pro Graphics database...\n');
  console.log('Project URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  
  // Check tables via a simple query approach
  const tables = [
    'products', 'pricing_packages', 'gallery', 'blogs',
    'canvas_products', 'canvas_options',
    'customers', 'orders', 'order_items', 'invoices',
    'pricing_markups', 'admin_activity_log', 'admin_profiles'
  ];
  
  console.log('\n📋 Table Status:');
  console.log('═'.repeat(50));
  
  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.log(`  ❌ ${table.padEnd(25)} — NOT FOUND`);
    } else {
      console.log(`  ✅ ${table.padEnd(25)} — ${count} rows`);
    }
  }
  
  // Check auth users
  console.log('\n👤 Auth Users:');
  console.log('═'.repeat(50));
  const { data: users, error: usersErr } = await supabase.auth.admin.listUsers();
  if (usersErr) {
    console.log('  ❌ Could not list users:', usersErr.message);
  } else {
    if (users.users.length === 0) {
      console.log('  ⚠️  No users found');
    } else {
      users.users.forEach(u => {
        console.log(`  👤 ${u.email} (${u.id.substring(0,8)}...)`);
      });
    }
  }
  
  // Check storage buckets
  console.log('\n📦 Storage Buckets:');
  console.log('═'.repeat(50));
  const { data: buckets, error: bucketsErr } = await supabase.storage.listBuckets();
  if (bucketsErr) {
    console.log('  ❌ Could not list buckets:', bucketsErr.message);
  } else {
    if (buckets.length === 0) {
      console.log('  ⚠️  No storage buckets found');
    } else {
      buckets.forEach(b => {
        console.log(`  📁 ${b.name} (public: ${b.public})`);
      });
    }
  }
}

checkDB().catch(console.error);
