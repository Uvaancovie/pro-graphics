import Image from "next/image";
import Link from "next/link";
import { GalleryGrid } from "@/app/components/gallery/GalleryGrid";
import { createSupabasePublicClient } from "@/lib/supabase/server";

async function getProducts() {
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("products")
      .select("id,name,description,short_desc,image_url")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

async function getGalleryItems() {
  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("image_url,category,title,alt_text,sort_order")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true })
      .limit(12);

    if (error || !data) return [];

    return data.map((item) => ({
      src: item.image_url,
      category: item.category,
      title: item.title,
      alt: item.alt_text || item.title || "Gallery image",
    }));
  } catch {
    return [];
  }
}

export async function HomeProductsGallery() {
  const [products, galleryItems] = await Promise.all([getProducts(), getGalleryItems()]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-blue-950 mb-6 leading-tight">
            Explore Our <span className="text-amber-500">Products & Gallery</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-800/70 max-w-3xl mx-auto">
            Browse our current products and recent branding work from the gallery.
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-950">Featured Products</h3>
            <Link href="/products" className="text-amber-600 hover:text-amber-700 font-bold text-sm uppercase tracking-wider">
              View all products
            </Link>
          </div>

          {products.length === 0 ? (
            <p className="text-gray-500 text-base">No products available right now.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group block"
                >
                  <div className="relative h-64 w-full bg-gray-100">
                    <Image
                      src={product.image_url || "/images/ads/vehicle-branding.jpeg"}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-blue-950 mb-2">{product.name}</h4>
                    <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                      {product.description || product.short_desc || "View product details and pricing."}
                    </p>
                    <span className="w-full bg-blue-600 group-hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-block text-center mt-2">
                      View Details & Pricing
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-950">Latest Gallery Work</h3>
            <Link href="/gallery" className="text-amber-600 hover:text-amber-700 font-bold text-sm uppercase tracking-wider">
              View full gallery
            </Link>
          </div>

          {galleryItems.length === 0 ? (
            <p className="text-gray-500 text-base">No gallery images available right now.</p>
          ) : (
            <GalleryGrid items={galleryItems} />
          )}
        </div>
      </div>
    </section>
  );
}
