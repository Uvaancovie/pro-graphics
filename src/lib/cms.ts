import type { Product, PricingPackage, GalleryImage } from '@/types/cms'
import { products as staticProducts } from '@/data/products'
import { pricingPackages as staticPricingPackages } from '@/data/pricing-packages'
import { galleryImages as staticGalleryImages } from '@/data/gallery'

export async function getProducts(): Promise<Product[]> {
  return staticProducts.filter((p) => p.is_visible)
}

export async function getProduct(slug: string): Promise<Product | null> {
  return staticProducts.find((p) => p.slug === slug && p.is_visible) ?? null
}

export async function getProductById(id: string): Promise<Product | null> {
  return staticProducts.find((p) => p.id === id) ?? null
}

export async function getPricingPackages(productId: string): Promise<PricingPackage[]> {
  return staticPricingPackages.filter((p) => p.product_id === productId && p.is_visible)
}

export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  let results = staticGalleryImages.filter((g) => g.is_visible)
  if (category && category !== 'all') {
    results = results.filter((g) => g.category === category)
  }
  return results
}

export async function getFeaturedImages(): Promise<GalleryImage[]> {
  return staticGalleryImages.filter((g) => g.is_visible && g.is_featured).slice(0, 6)
}
