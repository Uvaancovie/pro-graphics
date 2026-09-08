# Improve SEO and Fix Route Failures in Vite React SPA (Optimized for Xneelo Static Hosting)

This plan addresses several key areas to optimize search engine optimization (SEO) and fix critical runtime/compilation bugs, taking into account your **Xneelo static web hosting** environment:

1. **Fallback Meta Tags in `index.html`**: For static web hosting, crawlers that do not execute JavaScript (like some social share preview bots) will read the static `index.html` directly. We will add premium fallback meta tags (title, description, open graph, and favicon links) to the base `index.html`.
2. **Dynamic Metadata & Document Head Control**: Create a lightweight `<SEO>` component to dynamically update page titles, descriptions, canonical links, Open Graph (OG), and Twitter card metadata for crawlers that _do_ run JS (like Google Search).
3. **Broken Next.js Imports & Async Routing Fixes**: Resolve compilation and runtime errors on routes like `/vehicle-branding/:area` and `/canvas-shop/:slug` by converting them from async server-like Next.js pages to client-safe React components.
4. **Build & Typecheck Resolution**: Correct path-alias mapping issues in `tsconfig.json` and fix SVG tag attribute typos that prevent the project from compiling.
5. **Sitemap & Robots Setup**: Provide standard search engine indexing configurations (`robots.txt`, `sitemap.xml`) to help bots discover and index all sub-pages.
6. **Static Redirections (.htaccess)**: Ensure that `.htaccess` (which is already configured) correctly handles sub-route refreshes under Apache-based Xneelo hosting by routing requests to `/index.html` to let React Router handle them on the client side.

## Proposed Changes

### Configuration and Build System

---

#### [MODIFY] tsconfig.json

- Update paths mapping from `"@/*": ["./*"]` to `"@/*": ["./src/*"]` to correctly resolve imports of `@/components/...` to the `src` folder.
- Exclude `src/lib/security.ts` and `src/lib/markdown.ts` to skip typecheck failures caused by unused Next.js backend/remark modules.

#### [MODIFY] index.html

- Add standard default fallback meta tags (description, keywords, Open Graph image/title/url, and viewport options) to serve as a high-quality baseline for non-JS web crawlers.

### Components

---

#### [NEW] SEO.tsx

- Create a lightweight React component that updates `document.title`, description meta tags, canonical links, Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`), and Twitter cards dynamically using React's `useEffect`.
- Avoids the use of heavy npm packages to guarantee React 19 compatibility.

#### [MODIFY] PricingMatrix.tsx

- Fix typo `fillfill="none"` to `fill="none"` and `strokefill="currentColor"` to `stroke="currentColor"`.

#### [MODIFY] VehicleCareGuide.tsx

- Fix typo `fillfill="none"` to `fill="none"` and `strokefill="currentColor"` to `stroke="currentColor"`.

### Pages & Routing

---

#### [MODIFY] page.tsx

- Remove `import type { Metadata } from 'next';` and all references to `generateMetadata` and `generateStaticParams`.
- Convert the component from `async` to a synchronous React component using `useParams()` from `react-router-dom`.
- Integrate `<SEO>` to dynamically update the title/description and canonical tags based on the selected area (`umhlanga`, `pinetown`, `phoenix`, `durban-cbd`).

#### [MODIFY] page.tsx

- Convert component to use client-side `useParams()` and clean up Next.js `generateMetadata` and `notFound()` crashes.
- Integrate `<SEO>` to dynamically update metadata for individual canvas products.

#### [MODIFY] page.tsx (Home Page)

- Integrate `<SEO>` with high-priority search terms: "Vehicle Branding Durban, Sign Boards & Canvas Printing".

#### [MODIFY] page.tsx

- Integrate `<SEO>` with title "Vehicle Branding Durban | Premium Car & Fleet Wraps".

#### [MODIFY] page.tsx

- Integrate `<SEO>` with title "Sign Boards Durban | Custom Shop & Outdoor Signage".

#### [MODIFY] page.tsx

- Integrate `<SEO>` with title "Contravision Durban | One-Way Window Vinyl Signs".

#### [MODIFY] page.tsx

- Integrate `<SEO>` with title "Custom Stickers Durban | Bulk Labels & Vinyl Decals".

#### [MODIFY] page.tsx

- Integrate `<SEO>` with title "Canvas Printing Durban | Premium Custom Canvas Art".

#### [MODIFY] page.tsx

- Integrate `<SEO>` with title "Branding & Signage Blog | Pro Graphics Durban".

#### [MODIFY] page.tsx

- Integrate `<SEO>` with dynamic title and description from the static blog post data.

#### [MODIFY] page.tsx

- Integrate `<SEO>` with title "Get a Free Signage & Branding Quote | Pro Graphics".

#### [MODIFY] page.tsx

- Integrate `<SEO>` with title "Vehicle Branding ROI Calculator | Pro Graphics".

#### [MODIFY] page.tsx

- Integrate `<SEO>` with title "Signage Cost Estimator | Pro Graphics Durban".

#### [MODIFY] page.tsx

- Fix SVG typos and integrate `<SEO>` with title "Price Beat Guarantee | Pro Graphics Durban".

#### [MODIFY] page.tsx

- Remove `import type { Metadata } from 'next';` and integrate `<SEO>`.

#### [MODIFY] page.tsx

- Remove `import type { Metadata } from 'next';` and integrate `<SEO>`.

#### [MODIFY] page.tsx

- Remove `import type { Metadata } from 'next';` and integrate `<SEO>`.

#### [MODIFY] page.tsx

- Remove `import type { Metadata } from 'next';` and integrate `<SEO>`.

#### [MODIFY] page.tsx

- Remove `import type { Metadata } from 'next';` and integrate `<SEO>`.

#### [MODIFY] page.tsx

- Remove `import type { Metadata } from 'next';` and integrate `<SEO>`.

#### [MODIFY] page.tsx

- Remove `import type { Metadata } from 'next';` and integrate `<SEO>`.

#### [MODIFY] page.tsx

- Remove `import type { Metadata } from 'next';` and integrate `<SEO>`.

#### [MODIFY] page.tsx

- Integrate `<SEO>`.

#### [MODIFY] page.tsx

- Integrate `<SEO>`.

#### [MODIFY] page.tsx

- Integrate `<SEO>`.

#### [MODIFY] page.tsx

- Integrate `<SEO>`.

### Public Assets

---

#### [NEW] robots.txt

- Set up search crawler index permissions and link to sitemap.

#### [NEW] sitemap.xml

- List all 26+ static and dynamic pages (including area specific vehicle branding pages and blog post slugs) for direct indexing.

## Verification Plan

### Automated Tests

- Run `npm run build` or `npx tsc --noEmit` to verify type safety and compilation success.

### Manual Verification

- Start the server (`npm run dev`) and test routes like `/vehicle-branding/umhlanga` and `/canvas-shop/durban-skyline-abstract` to verify that they load correctly without crashing.
- Inspect the document head (using browser DevTools) on different pages to verify that the titles, descriptions, canonical URLs, and Open Graph tags change correctly.