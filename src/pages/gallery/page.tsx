import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryCarousel } from "@/components/gallery/GalleryCarousel";
import { getGalleryImages } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const categoryConfig: Record<string, { label: string; description: string }> = {
  "vehicle-branding": {
    label: "Vehicle Branding & Wraps",
    description: "Full wraps, partial graphics, roof wraps, and fleet branding that turn vehicles into mobile billboards.",
  },
  "sign-boards": {
    label: "Sign Boards & Corporate Signage",
    description: "Chromadek, ABS, Perspex signage, and custom corporate branding for shopfronts and offices.",
  },
  contravisions: {
    label: "Contravision & Storefront Glass",
    description: "One-way vision perforated vinyl that advertises outside while maintaining visibility from within.",
  },
  promotional: {
    label: "Canvas, Prints & Promotions",
    description: "Custom canvas prints, promotional flyers, campaign designs, and marketing materials.",
  },
  stickers: {
    label: "Stickers & Decals",
    description: "Die-cut custom stickers, vinyl decals, and precision-cut graphics for any surface.",
  },
};

const formatCategoryLabel = (category: string): string => {
  return (
    categoryConfig[category]?.label ||
    category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

export default function GalleryPage() {
  const [allItems, setAllItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("all");

  useEffect(() => {
    getGalleryImages().then((images) => {
      setAllItems(
        images.map((img) => ({
          src: img.image_url,
          category: img.category,
          title: img.title,
          alt: img.alt_text || img.title || "Gallery image",
        }))
      );
      setLoading(false);
    });
  }, []);

  const featuredItems = useMemo(
    () => allItems.filter((_, i) => i % 4 === 0).slice(0, 8),
    [allItems]
  );

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allItems.map((item) => item.category)));
    return cats.sort();
  }, [allItems]);

  const categorizedItems = useMemo(() => {
    const map: Record<string, any[]> = {};
    allItems.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [allItems]);

  const scrollToSection = (cat: string) => {
    setActiveSection(cat);
    if (cat === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(`gallery-section-${cat}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stats = [
    { value: `${allItems.length}+`, label: "Projects Showcased" },
    { value: `${categories.length}`, label: "Service Categories" },
    { value: "100%", label: "Satisfaction Rate" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500 rounded-full blur-3xl opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-amber-300 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Our Complete Portfolio
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Our Work <span className="text-amber-400">Gallery</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            Browse our complete portfolio of ad creatives, installs, and client branding projects across vehicles, signage, wallpaper, and custom print.
          </p>

          {/* Stats */}
          {!loading && (
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">{stat.value}</div>
                  <div className="text-blue-200 uppercase tracking-widest text-xs font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Filters / Jump Nav */}
      <section className="sticky top-20 md:top-24 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm overflow-hidden">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-row md:flex-wrap overflow-x-auto whitespace-nowrap justify-start md:justify-center gap-2 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              onClick={() => scrollToSection("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all border shrink-0",
                activeSection === "all"
                  ? "bg-blue-950 text-white border-blue-950 shadow-lg shadow-blue-950/20"
                  : "bg-white text-blue-950 border-gray-200 hover:border-amber-400 hover:text-amber-600"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToSection(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all border shrink-0",
                  activeSection === cat
                    ? "bg-blue-950 text-white border-blue-950 shadow-lg shadow-blue-950/20"
                    : "bg-white text-blue-950 border-gray-200 hover:border-amber-400 hover:text-amber-600"
                )}
              >
                {formatCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-lg">Loading gallery...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Featured Projects Carousel */}
          {featuredItems.length > 0 && (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                  <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-3">
                    Featured <span className="text-amber-500">Projects</span>
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    A curated selection of our most impactful branding installations and print projects.
                  </p>
                </div>
                <div className="max-w-5xl mx-auto">
                  <GalleryCarousel items={featuredItems} autoPlay={true} interval={4000} />
                </div>
              </div>
            </section>
          )}

          {/* Categorized Work Sections */}
          {categories.map((cat, catIndex) => {
            const items = categorizedItems[cat];
            if (!items || items.length === 0) return null;
            const config = categoryConfig[cat];
            const isEven = catIndex % 2 === 0;

            return (
              <section
                key={cat}
                id={`gallery-section-${cat}`}
                className={cn("py-16 scroll-mt-32", isEven ? "bg-gray-50" : "bg-white")}
              >
                <div className="container mx-auto px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                  >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
                      <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950 mb-2">
                          {config?.label || formatCategoryLabel(cat)}
                        </h2>
                        {config?.description && (
                          <p className="text-gray-600 max-w-2xl">{config.description}</p>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-2 rounded-full self-start md:self-auto whitespace-nowrap">
                        {items.length} project{items.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="w-20 h-1 bg-amber-500 rounded-full mt-4"></div>
                  </motion.div>

                  {/* Carousel for this category (first 6 items) */}
                  {items.length >= 3 && (
                    <div className="mb-10 max-w-4xl mx-auto">
                      <GalleryCarousel
                        items={items.slice(0, 6)}
                        autoPlay={false}
                        showDots={items.length > 1}
                      />
                    </div>
                  )}

                  {/* Grid for ALL items in this category */}
                  <GalleryGrid items={items} />
                </div>
              </section>
            );
          })}

          {/* Video Showroom */}
          <section className="py-16 bg-blue-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500 rounded-full blur-3xl"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  See Our Work <span className="text-amber-400">In Action</span>
                </h2>
                <p className="text-blue-200 max-w-2xl mx-auto">
                  Watch our contravision installation process — from consultation to finished storefront transformation.
                </p>
              </div>
              <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                <video
                  controls
                  poster="/contravision-video/contravision.png"
                  className="w-full aspect-video bg-black"
                  preload="metadata"
                >
                  <source src="/contravision-video/OFFICE-BRANDING-CONTRAVISION.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </section>

          {/* Full Gallery Section with all filters */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-3">
                  Complete <span className="text-amber-500">Portfolio</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Browse every project in one place. Use the filters to narrow by category.
                </p>
              </div>
              <GalleryGrid items={allItems} />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/50"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Like What You See?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-light">
                Get a free, detailed quote for your project within 24 hours. Let's make your brand unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/quote"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Get Your Free Quote
                </Link>
                <Link
                  to="/cost-calculator"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300"
                >
                  Try the Cost Calculator
                </Link>
              </div>
              <p className="mt-8 text-blue-200 text-base sm:text-lg">
                Or call us at{" "}
                <strong className="text-amber-400 text-lg sm:text-xl hover:text-white transition-colors">
                  <a href="tel:0659424036">065 9424 036</a>
                </strong>
              </p>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
