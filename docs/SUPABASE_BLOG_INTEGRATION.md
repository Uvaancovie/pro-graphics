# Supabase Blog Integration Guide

This guide explains how to use Supabase MCP (Model Context Protocol) for better blog performance and SEO.

## Overview

We've migrated the blog system from static markdown files to a dynamic Supabase database. This provides:

- **Better SEO**: Dynamic meta tags, structured data, and sitemap generation
- **Improved Performance**: Database indexing, caching strategies, and edge functions
- **Content Management**: Easy blog post creation, editing, and publishing
- **Analytics**: Built-in view tracking and search analytics

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│   Supabase   │────▶│  PostgreSQL DB  │
│                 │◄────│   (MCP)      │◄────│                 │
└─────────────────┘     └──────────────┘     └─────────────────┘
        │
        ▼
┌─────────────────┐
│  Vercel Cache   │
│  (ISR/Revalidate)│
└─────────────────┘
```

## Database Schema

### Blogs Table

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `title` | TEXT | Blog post title |
| `meta_title` | TEXT | SEO meta title |
| `meta_description` | TEXT | SEO meta description |
| `slug` | TEXT | URL-friendly unique identifier |
| `excerpt` | TEXT | Short summary for listings |
| `content` | TEXT | Full blog content (Markdown/HTML) |
| `author` | TEXT | Author name |
| `category` | TEXT | Category for organization |
| `tags` | TEXT[] | Array of tags |
| `main_image` | TEXT | Featured image URL |
| `published` | BOOLEAN | Publishing status |
| `published_at` | TIMESTAMPTZ | Publication date |
| `read_time` | INTEGER | Estimated read time (minutes) |
| `view_count` | INTEGER | Analytics: page views |
| `search_vector` | tsvector | Full-text search vector |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

### Indexes

- `idx_blogs_slug` - Fast slug lookups
- `idx_blogs_published` - Published posts with date sorting
- `idx_blogs_category` - Category filtering
- `idx_blogs_tags` - Tag filtering (GIN index)
- `idx_blogs_search` - Full-text search

## Setup Instructions

### 1. Apply Database Migration

Go to your Supabase Dashboard → SQL Editor and run:

```sql
-- Located at: supabase/migrations/20260407000000_blogs_table.sql
```

Or use the Supabase CLI:

```bash
npx supabase login
npx supabase link --project-ref hcestxaffzsqlkiedvfx
npx supabase db push
```

### 2. Insert Blog Posts

Run the insertion script:

```bash
npx tsx scripts/insert-blog-post.ts
```

This will insert all markdown blog posts from the `blogs/` folder into Supabase.

### 3. Update Environment Variables

Ensure your `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://hcestxaffzsqlkiedvfx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # For admin operations
```

## API Integration

### Fetch Blog Posts

```typescript
import { createClient } from '@/lib/supabase/server';

// Get all published posts
const { data: posts } = await supabase
  .from('blogs')
  .select('*')
  .eq('published', true)
  .order('published_at', { ascending: false });

// Get single post by slug
const { data: post } = await supabase
  .from('blogs')
  .select('*')
  .eq('slug', 'your-slug')
  .eq('published', true)
  .single();

// Search posts
const { data: results } = await supabase
  .rpc('search_blogs', { query: 'vehicle branding' });
```

### Track Views

```typescript
// Increment view count (use in page component)
await supabase.rpc('increment_blog_views', { blog_slug: 'your-slug' });
```

## MCP Configuration

The MCP server is configured in `mcp.json`:

```json
{
  "servers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "your_token",
        "SUPABASE_PROJECT_REF": "hcestxaffzsqlkiedvfx"
      }
    }
  }
}
```

## Performance Optimizations

### 1. Static Site Generation (SSG)

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blogs')
    .select('slug')
    .eq('published', true);

  return posts?.map((post) => ({ slug: post.slug })) || [];
}

export const revalidate = 3600; // Revalidate every hour
```

### 2. Incremental Static Regeneration (ISR)

```typescript
// Revalidate specific pages when content changes
export async function revalidateBlog(slug: string) {
  await fetch(`/api/revalidate?path=/blog/${slug}`, { method: 'POST' });
}
```

### 3. Edge Caching

```typescript
// Use Vercel's edge caching
export const runtime = 'edge';

export async function GET() {
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .cache(60); // Cache for 60 seconds

  return Response.json(data);
}
```

## SEO Features

### Automatic Meta Tags

```typescript
export async function generateMetadata({ params }) {
  const { data: post } = await supabase
    .from('blogs')
    .select('title, meta_title, meta_description, tags')
    .eq('slug', params.slug)
    .single();

  return {
    title: post.meta_title || post.title,
    description: post.meta_description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: post.title,
      description: post.meta_description,
      type: 'article',
    },
  };
}
```

### Structured Data (JSON-LD)

```typescript
const blogPostSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.meta_description,
  datePublished: post.published_at,
  author: { '@type': 'Organization', name: post.author },
  publisher: {
    '@type': 'Organization',
    name: 'Pro Graphics',
    logo: { '@type': 'ImageObject', url: 'https://pro-graphics.co.za/logo.png' }
  },
  image: post.main_image,
  url: `https://pro-graphics.co.za/blog/${post.slug}`,
};
```

## Content Management Workflow

### Adding a New Blog Post

1. **Create markdown file** in `blogs/` folder with frontmatter
2. **Run insertion script**: `npx tsx scripts/insert-blog-post.ts`
3. **Verify in Supabase Dashboard** → Table Editor
4. **Test locally**: Visit `/blog/your-slug`
5. **Deploy**: Changes will be live after revalidation

### Updating Existing Post

1. **Edit in Supabase Dashboard** → Table Editor
2. **Or update markdown** and re-run insertion script
3. **Revalidate page**: `curl -X POST /api/revalidate?path=/blog/slug`

### Publishing/Unpublishing

```sql
-- Publish
UPDATE blogs SET published = true, published_at = NOW() WHERE slug = 'your-slug';

-- Unpublish
UPDATE blogs SET published = false WHERE slug = 'your-slug';
```

## Analytics

### View Tracking

The `view_count` column tracks page views. Access via:

```typescript
const { data } = await supabase
  .from('blogs')
  .select('title, view_count')
  .order('view_count', { ascending: false })
  .limit(10);
```

### Popular Posts Query

```sql
SELECT title, slug, view_count, published_at
FROM blogs
WHERE published = true
ORDER BY view_count DESC
LIMIT 10;
```

## Troubleshooting

### Common Issues

**"blogs table does not exist"**
- Run the SQL migration first
- Check Supabase Dashboard → Database → Tables

**"Permission denied"**
- Verify RLS policies are configured
- Use service role key for admin operations

**"Slug already exists"**
- Use `upsert` instead of `insert`
- Check for duplicate slugs in markdown files

### Debug Commands

```bash
# Check table structure
npx supabase gen types typescript --local > types/supabase.ts

# List all blog posts
npx supabase sql -c "SELECT slug, title, published FROM blogs;"

# Reset view counts
npx supabase sql -c "UPDATE blogs SET view_count = 0;"
```

## Best Practices

1. **Always use slugs** - Never expose database IDs in URLs
2. **Cache aggressively** - Use ISR with appropriate revalidate times
3. **Optimize images** - Store in Supabase Storage, serve via CDN
4. **Track analytics** - Monitor view counts to identify popular content
5. **Search optimization** - Use the `search_blogs` RPC for site search
6. **Backup content** - Keep markdown files as source of truth

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [PostgreSQL Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html)
