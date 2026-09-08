import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { motion, AnimatePresence } from "framer-motion";
import { getGalleryImages } from "@/lib/cms";
import { cn } from "@/lib/utils";
import LeadMagnetPopup from "@/components/ui/LeadMagnetPopup";

interface PosterItem {
  id: string;
  title: string;
  image_url: string;
  alt_text: string;
  is_featured: boolean;
}

export default function WorldCupPage() {
  const [posters, setPosters] = useState<PosterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosterIndex, setSelectedPosterIndex] = useState<number | null>(null);

  useEffect(() => {
    getGalleryImages("world-cup-posters").then((data) => {
      setPosters(
        data.map((item) => ({
          id: item.id,
          title: item.title || "World Cup Poster",
          image_url: item.image_url,
          alt_text: item.alt_text || "World Cup Poster",
          is_featured: item.is_featured,
        }))
      );
      setLoading(false);
    });
  }, []);

  const filteredPosters = useMemo(() => {
    return posters.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posters, searchTerm]);

  // Sizing and pricing options
  const pricingOptions = [
    { size: "A3 Size", dims: "297 x 420 mm", price: "R150", framedPrice: "R350", desc: "Perfect for compact spaces, desks, or bedroom walls." },
    { size: "A2 Size", dims: "420 x 594 mm", price: "R250", framedPrice: "R550", desc: "Our most popular size. High detail impact for any room." },
    { size: "A1 Size", dims: "594 x 841 mm", price: "R450", framedPrice: "R890", desc: "Life-size presence. Ideal for main feature walls and bars." },
  ];

  // Helper to extract player name from title
  const getPlayerName = (title: string) => {
    return title.split(" — ")[0] || title;
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedPosterIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPosterIndex(null);
      else if (e.key === "ArrowRight") {
        setSelectedPosterIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPosters.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedPosterIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPosters.length) % filteredPosters.length : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPosterIndex, filteredPosters]);

  // Lock scroll
  useEffect(() => {
    if (selectedPosterIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPosterIndex]);

  return (
    <main className="min-h-screen bg-[#070e17] text-white">
      <Seo
        title="FIFA World Cup 2026 Legend Posters | Pro Graphics"
        description="Collect 36 high-fidelity FIFA World Cup 2026 legend posters. Premium 250gsm satin prints of Messi, Ronaldo, Mbappé, Haaland and more."
        canonicalUrl="/world-cup"
      />
      {/* Epic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Green/Black overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/world-cup-posters/lionel-messi.jpg"
            alt="FIFA World Cup 2026 Poster Collection"
            className="w-full h-full object-cover object-top opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070e17]/80 to-[#070e17]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070e17] via-transparent to-[#070e17]" />
          <div className="absolute inset-0 bg-[#00a651]/10 mix-blend-color" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-[#00a651]/20 border border-[#00a651]/40 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Limited Special Edition
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight uppercase"
          >
            FIFA WORLD CUP <span className="text-[#d4a843] block sm:inline">2026™</span>
            <span className="block text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-normal normal-case">
              Legend Posters Collection
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-12"
          >
            Bring the beautiful game home with 36 high-fidelity, vibrant art prints. From historic icons like Pelé and Maradona to modern titans Messi, Ronaldo, Mbappé & Haaland.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#posters-grid"
              className="w-full sm:w-auto bg-[#d4a843] hover:bg-[#c29837] text-[#070e17] px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-[#d4a843]/10"
            >
              Explore the Collection
            </a>
            <a
              href="#pricing"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              Sizes & Pricing
            </a>
          </motion.div>

          {/* Scoll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-60 hidden md:block"
          >
            <a href="#posters-grid" className="flex flex-col items-center gap-2 text-xs uppercase tracking-wider text-gray-400">
              Scroll down
              <svg className="w-5 h-5 text-[#d4a843]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sizing & Pricing Details */}
      <section id="pricing" className="py-20 bg-[#0b1420] border-t border-b border-gray-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Premium Printing & <span className="text-[#d4a843]">Framing Options</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Every poster is printed in-house using premium inks on heavyweight 250gsm satin art paper for gallery-grade depth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingOptions.map((opt) => (
              <div
                key={opt.size}
                className="bg-[#0e1b2b] border border-white/5 rounded-2xl p-8 hover:border-[#d4a843]/30 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-black/20"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{opt.size}</h3>
                    <span className="text-xs bg-[#d4a843]/10 text-[#d4a843] border border-[#d4a843]/20 px-2.5 py-1 rounded-full font-bold">
                      {opt.dims}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
                <div className="border-t border-white/5 pt-6 mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Print Only</span>
                    <span className="text-2xl font-black text-[#d4a843]">{opt.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">With Premium Frame</span>
                    <span className="text-xl font-bold text-white">{opt.framedPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Poster Gallery Section */}
      <section id="posters-grid" className="py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
                THE 36 <span className="text-[#d4a843]">LEGENDS</span>
              </h2>
              <p className="text-gray-400">
                Click on any poster to view high-resolution detail.
              </p>
            </div>

            {/* Live Search */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder="Search players (e.g. Messi)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0e1b2b] border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d4a843] transition-colors"
              />
              <svg className="w-5 h-5 absolute right-4 top-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-4 border-[#d4a843] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading poster collection...</p>
            </div>
          ) : filteredPosters.length === 0 ? (
            <div className="text-center py-20 bg-[#0e1b2b] rounded-2xl border border-white/5">
              <p className="text-gray-400 text-lg mb-2">No legends match your search.</p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-[#d4a843] hover:underline font-bold"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPosters.map((poster, index) => {
                // Highlight featured posters with special sizing
                const isFeatured = poster.is_featured;
                return (
                  <motion.div
                    key={poster.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
                    className={cn(
                      "group bg-[#0e1b2b] rounded-xl overflow-hidden shadow-lg border border-white/5 cursor-pointer relative hover:border-[#d4a843]/40 transition-all duration-300",
                      isFeatured && "ring-1 ring-[#d4a843]/30"
                    )}
                    onClick={() => setSelectedPosterIndex(index)}
                  >
                    {/* Poster Card Image */}
                    <div className="relative aspect-[3/4] bg-gray-900 overflow-hidden">
                      <img
                        src={poster.image_url}
                        alt={poster.alt_text}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {isFeatured && (
                        <span className="absolute top-3 left-3 bg-[#d4a843] text-[#070e17] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-md z-10">
                          Featured
                        </span>
                      )}

                      {/* Overlaid UI details */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end">
                        <p className="text-lg font-bold text-white group-hover:text-[#d4a843] transition-colors truncate">
                          {getPlayerName(poster.title)}
                        </p>
                        <span className="text-xs text-[#00a651] font-semibold mt-1">
                          World Cup Edition
                        </span>
                        
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="inline-flex items-center gap-1.5 bg-[#d4a843] text-[#070e17] text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                            Order Print
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Sizing Calculator & Bundle Promo */}
      <section className="py-20 bg-gradient-to-br from-[#0e1b2b] via-[#070e17] to-[#0b1420] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00a651] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#d4a843]/10 border border-[#d4a843]/20 px-4 py-2 rounded-full text-xs font-semibold text-[#d4a843] uppercase tracking-widest mb-6">
            World Cup Special Promotion
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-6">
            BUY 3 OR MORE, <span className="text-[#00a651]">SAVE 20%</span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Mix and match your favourite legends! Decorate your entertainment area, bar, or workspace. Coupon code auto-applies when requesting a quote.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/quote?product=world-cup-legend-posters"
              className="bg-[#00a651] hover:bg-[#008f45] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#00a651]/20 transition-all hover:scale-105"
            >
              Order Bundle Now
            </Link>
            <a
              href="#pricing"
              className="text-[#d4a843] hover:text-[#c29837] font-bold text-base hover:underline"
            >
              View Size Guides
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Slider */}
      <AnimatePresence>
        {selectedPosterIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedPosterIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPosterIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/50 font-semibold text-sm">
              {selectedPosterIndex + 1} / {filteredPosters.length}
            </div>

            {/* Nav Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPosterIndex((prev) =>
                  prev !== null ? (prev - 1 + filteredPosters.length) % filteredPosters.length : null
                );
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-45"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPosterIndex((prev) =>
                  prev !== null ? (prev + 1) % filteredPosters.length : null
                );
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-45"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Active Image and details */}
            <div
              className="max-w-4xl max-h-[85vh] flex flex-col justify-center items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedPosterIndex}
                src={filteredPosters[selectedPosterIndex].image_url}
                alt={filteredPosters[selectedPosterIndex].alt_text}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />

              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#d4a843]">
                  {filteredPosters[selectedPosterIndex].title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  FIFA World Cup 2026™ Limited Edition Print
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <Link
                    to={`/quote?product=world-cup-legend-posters&player=${encodeURIComponent(getPlayerName(filteredPosters[selectedPosterIndex].title))}`}
                    className="bg-[#00a651] hover:bg-[#008f45] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md transition-colors"
                  >
                    Quick Quote
                  </Link>
                  <Link
                    to="/general-submission"
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg font-bold text-sm border border-white/10 transition-colors"
                  >
                    Ask a Question
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadMagnetPopup />
    </main>
  );
}
