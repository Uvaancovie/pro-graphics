import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getProducts, getGalleryImages } from "@/lib/cms";

export function HomeProductsGallery() {
  const [products, setProducts] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProducts(),
      getGalleryImages(),
    ]).then(([p, g]) => {
      setProducts(p.slice(0, 6));
      setGalleryItems(
        g.slice(0, 12).map((img) => ({
          src: img.image_url,
          category: img.category,
          title: img.title,
          alt: img.alt_text || img.title || "Gallery image",
        }))
      );
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;

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
            <Link to="/products" className="text-amber-600 hover:text-amber-700 font-bold text-sm uppercase tracking-wider">
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
                  to={`/products/${product.id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group block"
                >
                  <div className="relative h-64 w-full bg-gray-100">
                    <img
                      src={product.image_url || "https://hcestxaffzsqlkiedvfx.supabase.co/storage/v1/object/public/gallery/vehicle-branding/uls-truck.jpeg"}
                      alt={product.name || "Product"}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
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
            <Link to="/gallery" className="text-amber-600 hover:text-amber-700 font-bold text-sm uppercase tracking-wider">
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
