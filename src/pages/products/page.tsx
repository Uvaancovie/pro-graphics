import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Layers } from "lucide-react";
import { getProducts, getGalleryImages } from "@/lib/cms";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types/cms";
import LeadMagnetPopup from "@/components/ui/LeadMagnetPopup";
import { GalleryCarousel } from "@/components/gallery/GalleryCarousel";

const categoryLabels: Record<string, string> = {
  "vehicle-branding": "Vehicle Branding",
  "sign-boards": "Sign Boards",
  contravisions: "Contravisions",
  stickers: "Stickers",
  promotional: "Promotional",
  banners: "Banners",
};

const categoryColors: Record<string, string> = {
  "vehicle-branding": "bg-blue-100 text-blue-700",
  "sign-boards": "bg-emerald-100 text-emerald-700",
  contravisions: "bg-purple-100 text-purple-700",
  stickers: "bg-rose-100 text-rose-700",
  promotional: "bg-amber-100 text-amber-700",
  banners: "bg-cyan-100 text-cyan-700",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-56 bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-24 bg-gray-200 rounded-full" />
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-10 w-full bg-gray-200 rounded-lg mt-4" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    Promise.all([getProducts(), getGalleryImages()]).then(([prods, gallery]) => {
      setProducts(prods);
      setGalleryItems(
        gallery.map((img) => ({
          src: img.image_url,
          category: img.category,
          title: img.title,
          alt: img.alt_text || img.title || "Gallery image",
        }))
      );
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category))) as string[];
    return ["all", ...cats.sort()];
  }, [products]);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500 rounded-full blur-3xl opacity-10 transform -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-amber-300 mb-6">
            <Layers className="w-4 h-4" />
            Professional Printing & Signage
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Our <span className="text-amber-400">Products & Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
            From vehicle wraps that turn heads to precision-cut stickers, custom canvas, and durable signage
            — browse our full range below.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="w-full overflow-hidden mb-10">
            <div className="flex flex-row md:flex-wrap overflow-x-auto whitespace-nowrap justify-start md:justify-center gap-2 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-semibold transition-all border shrink-0",
                    activeCategory === cat
                      ? "bg-blue-950 text-white border-blue-950 shadow-lg shadow-blue-950/20"
                      : "bg-white text-blue-950 border-gray-200 hover:border-amber-400 hover:text-amber-600"
                  )}
                >
                  {cat === "all" ? "All" : categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <ProductSkeleton key={n} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">No products in this category yet.</p>
              <button
                onClick={() => setActiveCategory("all")}
                className="text-amber-600 font-semibold hover:underline"
              >
                View all products
              </button>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    variants={item}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative h-56 bg-gray-100 overflow-hidden">
                        <img
                          src={product.image_url || "/images/ads/vehicle-branding.jpeg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span
                          className={cn(
                            "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm",
                            categoryColors[product.category] || "bg-gray-100 text-gray-700"
                          )}
                        >
                          {categoryLabels[product.category] || product.category}
                        </span>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-blue-950 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2 min-h-[3.25rem]">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[3.75rem]">
                          {product.short_desc || product.description || ""}
                        </p>

                        {product.features && product.features.length > 0 && (
                          <ul className="space-y-1.5 mb-5 min-h-[5.5rem]">
                            {product.features.slice(0, 3).map((f: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span className="line-clamp-1">{f}</span>
                              </li>
                            ))}
                            {product.features.length > 3 && (
                              <li className="text-sm text-gray-400 ml-6">+{product.features.length - 3} more</li>
                            )}
                          </ul>
                        )}

                        <span className="mt-auto inline-flex items-center justify-center w-full gap-2 bg-blue-600 group-hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300">
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Real Projects Showcase */}
      {!loading && galleryItems.length > 0 && (
        <section className="py-16 md:py-20 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full text-sm font-medium text-amber-700 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Real Client Projects
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-950 mb-4 leading-tight">
                See Our Work <span className="text-amber-500">In Action</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Browse real installations and client projects across every product category.
              </p>
            </div>

            <div className="space-y-12">
              {Object.entries(
                galleryItems.reduce((acc: Record<string, any[]>, item) => {
                  const cat = item.category;
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(item);
                  return acc;
                }, {})
              )
                .filter(([_, items]) => items.length >= 2)
                .map(([cat, items]) => (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-blue-950">
                        {categoryLabels[cat] || cat.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </h3>
                      <Link
                        to="/gallery"
                        className="text-amber-600 hover:text-amber-700 font-bold text-sm uppercase tracking-wider"
                      >
                        View all →
                      </Link>
                    </div>
                    <div className="max-w-4xl mx-auto">
                      <GalleryCarousel
                        items={items.slice(0, 8)}
                        autoPlay={false}
                        showDots={items.length > 1}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      <LeadMagnetPopup />
    </main>
  );
}
