// Apply migrations using Supabase Management API
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const PROJECT_REF = 'hcestxaffzsqlkiedvfx';
const ACCESS_TOKEN = 'sbp_86b8e751c15fef8fc4e87b33a5f556ddbb33d59f';

async function executeSql(sql, label) {
  console.log(`\n📄 Executing: ${label}`);
  console.log('─'.repeat(60));

  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.log(`❌ HTTP ${res.status}: ${errorText.substring(0, 300)}`);
    return false;
  }

  const data = await res.json();
  
  // Check for errors in the response
  if (Array.isArray(data)) {
    // Multiple results (one per statement)
    const errors = data.filter(r => r.error);
    if (errors.length > 0) {
      errors.forEach(e => console.log(`  ⚠️  ${e.error}`));
      // Some errors are OK (e.g. "already exists")
      const fatal = errors.filter(e => 
        !e.error.includes('already exists') && 
        !e.error.includes('duplicate')
      );
      if (fatal.length > 0) {
        console.log('❌ Fatal errors encountered');
        return false;
      }
    }
    console.log(`✅ Success (${data.length} statements processed)`);
  } else if (data.error) {
    console.log(`❌ Error: ${data.error}`);
    return false;
  } else {
    console.log('✅ Success');
  }
  
  return true;
}

async function main() {
  console.log('🚀 Pro Graphics — Database Migration via Management API\n');
  console.log(`Project: ${PROJECT_REF}`);
  console.log('═'.repeat(60));

  // ── Step 1: Apply schema.sql ──────────────────────────────
  const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  await executeSql(schemaSql, 'schema.sql — Products, Pricing Packages, Gallery');

  // ── Step 2: Apply admin orders & invoices migration ───────
  const ordersPath = path.join(__dirname, '..', 'supabase', 'migrations', '20260413000000_admin_orders_invoices.sql');
  const ordersSql = fs.readFileSync(ordersPath, 'utf8');
  await executeSql(ordersSql, 'Admin Orders, Invoices, Pricing Markups');

  // ── Step 3: Apply admin users migration ───────────────────
  const usersPath = path.join(__dirname, '..', 'supabase', 'migrations', '20260413000001_admin_users.sql');
  const usersSql = fs.readFileSync(usersPath, 'utf8');
  await executeSql(usersSql, 'Admin Profiles table');

  // ── Step 4: Insert admin profiles for existing users ──────
  console.log('\n📄 Linking admin profiles to existing auth users...');
  console.log('─'.repeat(60));
  
  const profilesSql = `
    INSERT INTO admin_profiles (id, full_name, role, is_active) VALUES
      ('0a772d81-b44b-435a-9dc0-52b8f6cf2997', 'Uvaan', 'director', true),
      ('6e06a924-b76b-4fbd-abba-339706ff9848', 'Kemron', 'director', true),
      ('16a78d9c-a734-4327-bdbf-05860cacc185', 'Keanu', 'director', true)
    ON CONFLICT (id) DO UPDATE SET 
      full_name = EXCLUDED.full_name,
      role = EXCLUDED.role,
      is_active = EXCLUDED.is_active;
  `;
  await executeSql(profilesSql, 'Admin Profiles — Uvaan, Kemron, Keanu');

  // ── Step 5: Verify final state ────────────────────────────
  console.log('\n' + '═'.repeat(60));
  console.log('📊 Verification — listing all public tables...');
  console.log('═'.repeat(60));

  const verifySql = `
    SELECT table_name, 
           (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
    FROM (
      SELECT table_name, 
             query_to_xml(format('SELECT count(*) as cnt FROM public.%I', table_name), false, true, '') as xml_count
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    ) t;
  `;

  const verifyRes = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: verifySql }),
    }
  );

  if (verifyRes.ok) {
    const data = await verifyRes.json();
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
      data[0].forEach(row => {
        const icon = row.row_count > 0 ? '✅' : '⬜';
        console.log(`  ${icon} ${row.table_name?.padEnd(30) || 'unknown'} ${row.row_count ?? 0} rows`);
      });
    } else {
      console.log('  Response:', JSON.stringify(data).substring(0, 500));
    }
  }

  console.log('\n✅ Migration complete!');
  console.log('   Admin login: /admin/login');
  console.log('   Use: uvaanmicrosoft@gmail.com, i.t.safuneralsupplies@gmail.com, or way2flyagency@gmail.com');
}

main().catch(console.error);
