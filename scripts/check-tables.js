// Direct SQL check via Supabase REST to see actual tables
require('dotenv').config({ path: '.env.local' });

async function checkTables() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Use the pg_catalog to list actual tables  
  const query = encodeURIComponent(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`);

  // Try using the SQL endpoint
  const res = await fetch(`${url}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`,
    },
  });

  // List what PostgREST exposes
  const schemaRes = await fetch(`${url}/rest/v1/`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Accept': 'application/json',
    },
  });

  if (schemaRes.ok) {
    const schema = await schemaRes.json();
    console.log('📋 Tables exposed by PostgREST:');
    if (schema.definitions) {
      Object.keys(schema.definitions).sort().forEach(t => console.log(`  ✅ ${t}`));
    } else if (schema.paths) {
      Object.keys(schema.paths).filter(p => p !== '/').sort().forEach(p => console.log(`  ✅ ${p.replace('/', '')}`));
    } else {
      // OpenAPI 3 format
      console.log('  Schema format:', Object.keys(schema).join(', '));
      console.log(JSON.stringify(schema).substring(0, 1000));
    }
  } else {
    console.log('Schema endpoint returned:', schemaRes.status);
  }

  // Also try to manually query each table
  console.log('\n📋 Direct table access check:');
  const tables = [
    'products', 'pricing_packages', 'gallery', 'blogs',
    'canvas_products', 'canvas_options',
    'customers', 'orders', 'order_items', 'invoices',
    'pricing_markups', 'admin_activity_log', 'admin_profiles'
  ];

  for (const table of tables) {
    const r = await fetch(`${url}/rest/v1/${table}?select=count&limit=0`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Prefer': 'count=exact',
      },
    });
    const count = r.headers.get('content-range');
    if (r.ok) {
      console.log(`  ✅ ${table.padEnd(25)} — ${count || 'accessible'}`);
    } else {
      const body = await r.text();
      console.log(`  ❌ ${table.padEnd(25)} — ${r.status}: ${body.substring(0, 80)}`);
    }
  }
}

checkTables().catch(console.error);
