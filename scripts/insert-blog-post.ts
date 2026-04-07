/**
 * Script to insert blog posts into Supabase
 * Usage: npx tsx scripts/insert-blog-post.ts
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load env from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Use service role key if available, otherwise anon key (limited permissions)
const supabaseKey = serviceRoleKey || anonKey;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials');
  console.error('   Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read and parse markdown file
function parseMarkdownFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    throw new Error('No frontmatter found in markdown file');
  }

  const frontmatter = frontmatterMatch[1];
  const body = content.slice(frontmatterMatch[0].length).trim();

  // Parse frontmatter
  const meta: Record<string, string | string[]> = {};
  frontmatter.split('\n').forEach((line) => {
    const match = line.match(/^([a-z_]+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        meta[key] = value
          .slice(1, -1)
          .split(',')
          .map((v) => v.trim().replace(/["']/g, ''));
      } else {
        meta[key] = value.replace(/["']/g, '');
      }
    }
  });

  return { meta, body };
}

async function insertBlogPost(filePath: string) {
  try {
    const { meta, body } = parseMarkdownFile(filePath);

    const blogPost = {
      title: meta.title as string,
      meta_title: meta.meta_title as string,
      meta_description: meta.meta_description as string,
      slug: meta.slug as string,
      excerpt: meta.meta_description as string, // Use meta description as excerpt
      content: body,
      author: meta.author as string,
      category: meta.category as string,
      tags: meta.tags as string[],
      published: true,
      published_at: new Date(meta.date as string).toISOString(),
      read_time: Math.ceil(body.split(' ').length / 200), // Approximate read time
    };

    console.log(`📄 Inserting blog post: "${blogPost.title}"`);
    console.log(`   Slug: ${blogPost.slug}`);
    console.log(`   Category: ${blogPost.category}`);
    console.log(`   Tags: ${blogPost.tags?.join(', ')}`);

    const { data, error } = await supabase
      .from('blogs')
      .upsert(blogPost, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`❌ Error inserting blog post: ${error.message}`);
      return false;
    }

    console.log(`✅ Blog post inserted successfully!`);
    console.log(`   ID: ${data?.[0]?.id}`);
    return true;
  } catch (err) {
    console.error(`❌ Error: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Pro Graphics Blog Post Inserter\n');
  console.log(`Using Supabase URL: ${supabaseUrl}`);
  console.log(`Auth: ${serviceRoleKey ? 'Service Role (full access)' : 'Anon Key (limited)'}`);
  console.log('');

  // Check if blogs table exists
  const { error: tableCheckError } = await supabase
    .from('blogs')
    .select('id')
    .limit(1);

  if (tableCheckError) {
    console.error('❌ Error: Could not access blogs table.');
    console.error('   Message:', tableCheckError.message);
    console.error('');
    console.error('   Please run the migration first:');
    console.error('   1. Go to https://supabase.com/dashboard');
    console.error('   2. Select your project');
    console.error('   3. Go to SQL Editor');
    console.error('   4. Run the SQL from: supabase/migrations/20260407000000_blogs_table.sql');
    process.exit(1);
  }

  // Insert blog posts
  const blogFiles = [
    'blogs/blog1.md',
    'blogs/blog2.md',
  ];

  let successCount = 0;

  for (const file of blogFiles) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const success = await insertBlogPost(filePath);
      if (success) successCount++;
      console.log('');
    } else {
      console.warn(`⚠️  Skipping ${file} - file not found`);
    }
  }

  console.log(`\n📊 Summary: ${successCount}/${blogFiles.length} blog posts inserted`);

  if (successCount > 0) {
    console.log('\n📝 Next steps:');
    console.log('   1. Update your blog pages to fetch from Supabase');
    console.log('   2. Test the blog listing and detail pages');
    console.log('   3. Set up caching for optimal performance');
  }
}

main();
