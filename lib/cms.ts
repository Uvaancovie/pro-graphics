// lib/cms.ts  — Public data fetching functions for your frontend pages
// Use these in your existing Next.js service/gallery pages

import { createSupabaseServerClient } from './supabase/server'
import type { Product, PricingPackage, GalleryImage } from '@/types/cms'

/** Fetch all visible products (for homepage / services section) */
export async function getProducts(): Promise<Product[]> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order')
  return (data as Product[]) ?? []
}

/** Fetch a single product with its pricing packages */
export async function getProduct(slug: string): Promise<Product | null> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('products')
    .select('*, pricing_packages(*)')
    .eq('slug', slug)
    .eq('is_visible', true)
    .order('sort_order', { referencedTable: 'pricing_packages' })
    .single()
  return (data as Product) ?? null
}

/** Fetch pricing packages for a product */
export async function getPricingPackages(productId: string): Promise<PricingPackage[]> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('pricing_packages')
    .select('*')
    .eq('product_id', productId)
    .eq('is_visible', true)
    .order('sort_order')
  return (data as PricingPackage[]) ?? []
}

/** Fetch gallery images, optionally filtered by category */
export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  const supabase = await createSupabaseServerClient()
  let query = supabase
    .from('gallery')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order')
  if (category && category !== 'all') {
    query = query.eq('category', category)
  }
  const { data } = await query
  return (data as GalleryImage[]) ?? []
}

/** Fetch featured gallery images for the homepage */
export async function getFeaturedImages(): Promise<GalleryImage[]> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('gallery')
    .select('*')
    .eq('is_visible', true)
    .eq('is_featured', true)
    .order('sort_order')
    .limit(6)
  return (data as GalleryImage[]) ?? []
}
