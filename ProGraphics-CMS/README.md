# Pro Graphics CMS — Setup Guide

## What's included

```
supabase/schema.sql          → Run in Supabase SQL Editor
lib/supabase.ts              → Supabase client (browser + server + service)
lib/cms.ts                   → Public data fetching functions
types/cms.ts                 → TypeScript types
middleware.ts                → Auth protection for /admin routes
app/admin/login/page.tsx     → Director login page
app/admin/layout.tsx         → Protected layout with sidebar
app/admin/page.tsx           → Dashboard with stats
app/admin/products/page.tsx  → Products list (CRUD)
app/admin/products/[id]/page.tsx → Product create/edit form
app/admin/pricing/page.tsx   → Pricing packages (Good/Better/Best)
app/admin/gallery/page.tsx   → Gallery with Supabase Storage upload
components/admin/AdminSidebar.tsx → Sidebar nav component
```

---

## Step 1 — Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open **SQL Editor** → paste the contents of `supabase/schema.sql` → Run
3. Go to **Storage** → Create a new bucket:
   - Name: `gallery-images`
   - Public: ✅ Yes
   - Max size: `5242880` (5MB)
   - Allowed MIME: `image/jpeg, image/png, image/webp`

---

## Step 2 — Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these in: **Supabase Dashboard → Settings → API**

Also add these same vars to **Vercel → Project Settings → Environment Variables**

---

## Step 3 — Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## Step 4 — Copy Files Into Your Project

Copy each file into the matching path in your Next.js project.

Make sure your `next.config.js` includes:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}
module.exports = nextConfig
```

---

## Step 5 — Create Director Login

1. Go to **Supabase → Authentication → Users → Add User**
2. Enter the director's email and a strong password
3. They can log in at: `https://pro-graphics.vercel.app/admin/login`

To add more directors, repeat step 5 for each person.

---

## Step 6 — Using CMS Data in Your Frontend Pages

Replace any hardcoded service/gallery data with live CMS data:

```tsx
// Example: app/vehicle-branding/page.tsx
import { getProduct } from '@/lib/cms'

export default async function VehicleBrandingPage() {
  const product = await getProduct('vehicle-branding')
  if (!product) return <div>Service not found</div>

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <ul>
        {product.features?.map(f => <li key={f}>{f}</li>)}
      </ul>
      {/* Pricing tiers */}
      {product.pricing_packages?.map(pkg => (
        <div key={pkg.id}>
          <h3>{pkg.label}</h3>
          <p>From R{pkg.price_from?.toLocaleString()} {pkg.unit}</p>
        </div>
      ))}
    </div>
  )
}
```

```tsx
// Example: app/gallery/page.tsx
import { getGalleryImages } from '@/lib/cms'

export default async function GalleryPage() {
  const images = await getGalleryImages()
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map(img => (
        <img key={img.id} src={img.image_url} alt={img.alt_text ?? img.title ?? ''} />
      ))}
    </div>
  )
}
```

---

## Admin URL

Once deployed: `https://pro-graphics.vercel.app/admin`

---

## Security Notes

- All `/admin` routes are protected by middleware — unauthenticated users are redirected to login
- Public users can only READ visible items (Row Level Security enforced in Supabase)
- Directors have full CRUD access when authenticated
- No API keys are exposed to the browser
- Image uploads go directly to Supabase Storage (not through your server)
