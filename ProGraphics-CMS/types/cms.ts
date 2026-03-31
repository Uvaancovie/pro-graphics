// types/cms.ts

export type ProductCategory =
  | 'vehicle-branding'
  | 'sign-boards'
  | 'contravisions'
  | 'stickers'
  | 'promotional'
  | 'banners'

export type PricingTier = 'good' | 'better' | 'best'

export interface Product {
  id: string
  name: string
  slug: string
  category: ProductCategory
  description: string | null
  short_desc: string | null
  features: string[] | null
  image_url: string | null
  is_visible: boolean
  sort_order: number
  created_at: string
  updated_at: string
  pricing_packages?: PricingPackage[]
}

export interface PricingPackage {
  id: string
  product_id: string
  tier: PricingTier
  label: string
  price_from: number | null
  price_to: number | null
  unit: string
  includes: string[] | null
  is_popular: boolean
  is_visible: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  title: string | null
  category: ProductCategory | 'all'
  image_url: string
  storage_path: string
  alt_text: string | null
  client_name: string | null
  is_featured: boolean
  is_visible: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface CMSStats {
  totalProducts: number
  totalPricingPackages: number
  totalGalleryImages: number
  visibleProducts: number
  visibleImages: number
}
