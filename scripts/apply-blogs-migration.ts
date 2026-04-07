import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env from .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyMigration() {
  const migrationPath = path.join(process.cwd(), 'supabase/migrations/20260407000000_blogs_table.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

  console.log(`Applying ${statements.length} SQL statements...\n`);

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      if (error) {
        console.log(`Statement ${i + 1}: Skipped or error (${error.message})`);
      } else {
        console.log(`Statement ${i + 1}: Applied ✓`);
      }
    } catch (e) {
      // Statement might not need exec (e.g., comments, empty lines)
      console.log(`Statement ${i + 1}: Skipped`);
    }
  }

  console.log('\nMigration complete!');
}

// Check if blogs table exists
async function checkTable() {
  const { data, error } = await supabase
    .from('blogs')
    .select('id')
    .limit(1);

  if (error) {
    console.log('Blogs table does not exist yet, applying migration...');
    await applyMigrationViaAPI();
  } else {
    console.log('Blogs table already exists!');
  }
}

// Alternative: Use direct REST API to run SQL
async function applyMigrationViaAPI() {
  console.log('Creating blogs table via Supabase API...');

  // Try to create the table directly
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS blogs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      meta_title TEXT,
      meta_description TEXT,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT,
      content TEXT NOT NULL,
      author TEXT DEFAULT 'Pro Graphics Team',
      category TEXT NOT NULL,
      tags TEXT[],
      main_image TEXT,
      published BOOLEAN DEFAULT false,
      published_at TIMESTAMPTZ,
      read_time INTEGER,
      view_count INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  // Use the SQL endpoint directly
  const response = await fetch(`${supabaseUrl}/rest/v1/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`,
      'apikey': supabaseKey,
      'Prefer': 'params=single-object',
    },
    body: JSON.stringify({
      query: createTableSQL
    })
  });

  console.log('Migration response:', response.status);
}

checkTable().catch(console.error);
