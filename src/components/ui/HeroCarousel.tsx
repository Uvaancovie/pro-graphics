import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  Building2, 
  Layers, 
  Tag, 
  Image as ImageIcon, 
  Anchor, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  PhoneCall,
  Clock,
  Sparkles
} from "lucide-react";

export interface HeroSlide {
  id: string;
  badge: string;
  icon: typeof Truck;
  title: string;
  subtitle: string;
  image: string;
  tabLabel: string;
  specs: { label: string; value: string }[];
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "vehicle-wraps",
    badge: "Commercial Fleet & Vehicles",
    icon: Truck,
    tabLabel: "Vehicle Wraps",
    title: "High-Impact Vehicle & Fleet Branding",
    subtitle: "Turn every commute into a moving billboard. Precision-engineered using high-durability cast vinyl and UV overlaminates that withstand coastal sun.",
    image: "/images/content/1.jpeg",
    specs: [
      { label: "Turnaround", value: "2–4 Days" },
      { label: "Durability", value: "5–7 Years Outdoor" },
      { label: "Options", value: "Full, Half, or Decal Wraps" }
    ],
    primaryCtaText: "Explore Vehicle Branding",
    primaryCtaLink: "/vehicle-branding",
    secondaryCtaText: "Request Free Quote",
    secondaryCtaLink: "/general-submission"
  },
  {
    id: "sign-boards",
    badge: "Storefront & Architectural",
    icon: Building2,
    tabLabel: "Sign Boards",
    title: "Chromadek, ABS & Storefront Sign Boards",
    subtitle: "Heavy-duty outdoor signboards, 3D fabricated lettering, lightboxes, and safety signs manufactured in-house for retail shops, warehouses, and offices.",
    image: "/images/content/4.jpeg",
    specs: [
      { label: "Materials", value: "Chromadek, ABS, Acrylic" },
      { label: "Finish", value: "UV Gloss / Matte Sealed" },
      { label: "Mounting", value: "Wall, Pole, or Pylon" }
    ],
    primaryCtaText: "View Signage Solutions",
    primaryCtaLink: "/sign-boards",
    secondaryCtaText: "Get a Sign Quote",
    secondaryCtaLink: "/general-submission"
  },
  {
    id: "contravisions",
    badge: "Perforated Window Film",
    icon: Layers,
    tabLabel: "Contravisions",
    title: "One-Way Window Contravisions",
    subtitle: "Vibrant exterior advertising with clear see-through visibility inside. Provides daytime privacy, solar heat reduction, and full-color branding.",
    image: "/images/content/2.jpeg",
    specs: [
      { label: "Material", value: "Perforated 60/40 Film" },
      { label: "Benefit", value: "Privacy & Sun Shade" },
      { label: "Application", value: "Shopfronts & Vehicles" }
    ],
    primaryCtaText: "Learn About Contravisions",
    primaryCtaLink: "/contravisions",
    secondaryCtaText: "Request Sizing & Quote",
    secondaryCtaLink: "/general-submission"
  },
  {
    id: "stickers",
    badge: "Precision Die-Cut Decals",
    icon: Tag,
    tabLabel: "Custom Stickers",
    title: "Custom Die-Cut Vinyl Stickers & Labels",
    subtitle: "Waterproof, scratch-resistant branding for products, packaging, equipment, and promotions printed on premium vinyl with razor-sharp contour cutting.",
    image: "/images/content/6.jpeg",
    specs: [
      { label: "Cut Type", value: "Die-Cut & Kiss-Cut" },
      { label: "Waterproof", value: "100% Water & UV Resistant" },
      { label: "Quantities", value: "Short Runs to Bulk 10,000+" }
    ],
    primaryCtaText: "Order Custom Stickers",
    primaryCtaLink: "/custom-stickers",
    secondaryCtaText: "Estimate Pricing",
    secondaryCtaLink: "/cost-calculator"
  },
  {
    id: "canvas",
    badge: "Fine Art Stretched Canvas",
    icon: ImageIcon,
    tabLabel: "Canvas Prints",
    title: "Museum-Grade Stretched Canvas Prints",
    subtitle: "Archival pigment inks printed on genuine 100% cotton canvas, hand-stretched over solid kiln-dried wooden frames for homes and executive boardrooms.",
    image: "/images/content/3.jpeg",
    specs: [
      { label: "Material", value: "100% Archival Cotton" },
      { label: "Framing", value: "Kiln-Dried Pine Stretcher Bars" },
      { label: "Longevity", value: "Anti-Fade Archival Inks" }
    ],
    primaryCtaText: "Browse Canvas Shop",
    primaryCtaLink: "/custom-canvas",
    secondaryCtaText: "Instant Sizing Tool",
    secondaryCtaLink: "/custom-canvas"
  },
  {
    id: "marine",
    badge: "Marine & Heavy Duty",
    icon: Anchor,
    tabLabel: "Marine Wraps",
    title: "Marine Craft & Heavy Equipment Wraps",
    subtitle: "Specialized saltwater-resistant vinyl wraps engineered specifically for boats, commercial vessels, jet skis, and harsh outdoor environments.",
    image: "/images/content/7.jpeg",
    specs: [
      { label: "Grade", value: "Marine Cast + Edge Seal" },
      { label: "Resistance", value: "Saltwater & Heavy UV" },
      { label: "Vessels", value: "Boats, Skis & Commercial" }
    ],
    primaryCtaText: "View Marine Case Study",
    primaryCtaLink: "/case-studies/neuro-wave-boat-branding",
    secondaryCtaText: "Marine Wrap Consultation",
    secondaryCtaLink: "/general-submission"
  }
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-play interval (6 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentSlide = HERO_SLIDES[currentIndex];
  const Icon = currentSlide.icon;

  return (
    <section 
      className="relative min-h-[640px] lg:min-h-[740px] w-full overflow-hidden bg-slate-950 text-white flex flex-col justify-between pt-20 pb-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Cross-fade Slider Image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
            {/* Cinematic Multilayer Gradient Overlay for Maximum Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/85 to-slate-950/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="container mx-auto px-4 relative z-10 my-auto py-8">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 uppercase tracking-widest backdrop-blur-md">
                <Icon className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentSlide.badge}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {currentSlide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-200/90 max-w-2xl font-light leading-relaxed">
                {currentSlide.subtitle}
              </p>

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-2xl">
                {currentSlide.specs.map((spec, i) => (
                  <div 
                    key={i} 
                    className="bg-slate-900/80 border border-white/10 rounded-2xl p-3 backdrop-blur-md shadow-lg"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                      {spec.label}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <Link to={currentSlide.primaryCtaLink}>
                  <button className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95">
                    <span>{currentSlide.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <Link to={currentSlide.secondaryCtaLink}>
                  <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all backdrop-blur-md">
                    <span>{currentSlide.secondaryCtaText}</span>
                  </button>
                </Link>

                <a
                  href="tel:0659424036"
                  className="hidden sm:inline-flex items-center gap-2 text-slate-300 hover:text-amber-400 text-xs sm:text-sm font-semibold px-3 py-2 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>065 9424 036</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows (Desktop & Tablet) */}
      <div className="hidden sm:flex absolute right-8 bottom-32 z-20 items-center gap-2">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-blue-950 text-white border border-white/15 flex items-center justify-center transition-all backdrop-blur-md shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-blue-950 text-white border border-white/15 flex items-center justify-center transition-all backdrop-blur-md shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Interactive Discipline Tabs & Progress Indicators */}
      <div className="relative z-20 container mx-auto px-4 mt-6">
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-2.5 backdrop-blur-lg shadow-2xl">
          <div className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            {HERO_SLIDES.map((slide, index) => {
              const isSelected = index === currentIndex;
              const SlideIcon = slide.icon;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-1 min-w-[130px] sm:min-w-0 text-left px-3 py-2 rounded-xl transition-all relative ${
                    isSelected 
                      ? "bg-blue-900/80 text-white shadow-md border border-amber-500/40" 
                      : "hover:bg-white/5 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <SlideIcon className={`w-4 h-4 shrink-0 ${isSelected ? "text-amber-400" : "text-slate-500"}`} />
                    <span className="text-xs font-bold truncate">
                      {slide.tabLabel}
                    </span>
                  </div>
                  {/* Progress Line Indicator */}
                  {isSelected && (
                    <motion.div 
                      layoutId="activeSlideIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-400 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Trust Strip Under Carousel */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 px-2">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-slate-200">5.0 Star Rated</span>
            <span className="hidden sm:inline">· Verified Google Reviews</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-200">24-Hour Quote Response</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-200">100% In-House Durban Studio</span>
          </div>
        </div>
      </div>
    </section>
  );
}
