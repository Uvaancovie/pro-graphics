# Implementation Plan: Add Contravision Blog Post

## Goal
Add a new blog post entry to `src/pages/blog/data.tsx` explaining Contravision one-way vision window graphics.

## File to Edit
`src/pages/blog/data.tsx`

## Changes Required
Add a new blog post object (6th item in the `blogPosts` array) before the closing `]`:

### Metadata
| Field | Value |
|-------|-------|
| _id | "6" |
| title | "What is Contravision? The Ultimate Guide to One-Way Vision Window Graphics" |
| slug | "what-is-contravision-one-way-vision-window-graphics" |
| publishedAt | `new Date().toISOString()` |
| mainImage | "/images/ads/contravisions.jpeg" |
| category | "Window Graphics" |
| excerpt | "Captures search intent — explains what Contravision is, how it works, and when to use it." |
| author | "Pro Graphics Team" |
| tags | ["contravision", "one-way vision", "window graphics", "shopfront signage Durban", "vehicle window branding", "privacy window film"] |

### Body Structure (JSX)
Follow existing pattern with Tailwind prose classes and amber highlight boxes:

1. **Hook paragraph**: "See printed windows you can see through from inside but not outside? That's Contravision."
2. **How it works**: Micro-perforations, 50/50 hole-to-opacity ratio, black adhesive layer, persistence of vision
3. **Retail shopfronts**: Privacy + advertising (salons, gyms, clinics, restaurants)
4. **Vehicle rear windows**: Safety-compliant branding for fleets
5. **Durban durability**: UV-resistant vinyl, air-egress adhesive, 3-5 year lifespan in coastal humidity
6. **CTA section**: Two Link buttons to `/contravisions`:
   - "View Our Contravision Portfolio →"
   - "Request Custom Quote →"

## Validation
- Image exists at `public/images/ads/contravisions.jpeg` ✓
- Follows existing code style and component patterns
- Uses React Router `Link` component for internal navigation
- Matches heading hierarchy (h2 for sections, h3 for subsections)