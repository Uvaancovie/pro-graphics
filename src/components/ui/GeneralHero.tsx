import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  Building2, 
  Layers, 
  Tag, 
  Image as ImageIcon, 
  Anchor, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare,
  ShieldCheck,
  Star,
  Clock
} from "lucide-react";

export interface WorkCategory {
  id: string;
  name: string;
  shortLabel: string;
  icon: typeof Truck;
  title: string;
  tagline: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  link: string;
  ctaText: string;
}

const WORK_CATEGORIES: WorkCategory[] = [
  {
    id: "fleet-wraps",
    name: "Vehicle & Fleet Branding",
    shortLabel: "Vehicle Wraps",
    icon: Truck,
    title: "Commercial Fleet & Vehicle Wraps",
    tagline: "Turn every commute into a moving billboard across KwaZulu-Natal",
    description: "From single company bakkies to full commercial truck fleets. Precision-engineered using high-durability cast vinyl and UV overlaminates that withstand coastal sun and weather.",
    image: "/vehicle-branding/gold-white-truck.jpeg",
    specs: [
      { label: "Turnaround", value: "2–4 Days" },
      { label: "Durability", value: "5–7 Years Outdoor" },
      { label: "Options", value: "Full, Half, or Decal Wraps" }
    ],
    link: "/vehicle-branding",
    ctaText: "Explore Vehicle Branding"
  },
  {
    id: "sign-boards",
    name: "Storefront & Sign Boards",
    shortLabel: "Sign Boards",
    icon: Building2,
    title: "Chromadek, ABS & Architectural Signage",
    tagline: "Command attention with durable, high-visibility business signage",
    description: "Heavy-duty outdoor signboards, 3D fabricated lettering, lightboxes, and safety signs manufactured in-house for retail shops, warehouses, industrial parks, and corporate offices.",
    image: "/vehicle-branding/signage.jpeg",
    specs: [
      { label: "Materials", value: "Chromadek, ABS, Acrylic" },
      { label: "Finish", value: "UV Gloss / Matte Sealed" },
      { label: "Mounting", value: "Wall, Pole, or Pylon" }
    ],
    link: "/sign-boards",
    ctaText: "View Signage Solutions"
  },
  {
    id: "contravisions",
    name: "Window Contravisions",
    shortLabel: "Contravisions",
    icon: Layers,
    title: "Perforated One-Way Window Vinyl",
    tagline: "Vibrant exterior advertising with clear see-through visibility inside",
    description: "Ideal for retail shopfront windows, corporate glass partitions, and vehicle rear windows. Provides daytime privacy, solar glare reduction, and full-color branding.",
    image: "/images/ads/contravisions.jpeg",
    specs: [
      { label: "Material", value: "Perforated 60/40 Film" },
      { label: "Benefit", value: "One-Way Privacy + Sun Shade" },
      { label: "Application", value: "Shopfronts & Vehicles" }
    ],
    link: "/contravisions",
    ctaText: "Learn About Contravisions"
  },
  {
    id: "stickers-labels",
    name: "Custom Stickers & Labels",
    shortLabel: "Stickers & Decals",
    icon: Tag,
    title: "High-Precision Die-Cut Vinyl Stickers",
    tagline: "Waterproof, scratch-resistant branding for products and packaging",
    description: "Custom die-cut decals, product labels, hard-hat stickers, equipment tags, and promotional branding printed on premium vinyl with razor-sharp contour cutting.",
    image: "/images/content/6.jpeg",
    specs: [
      { label: "Cut Type", value: "Die-Cut & Kiss-Cut" },
      { label: "Waterproof", value: "100% Water & UV Resistant" },
      { label: "Volumes", value: "Short Runs to Bulk 10,000+" }
    ],
    link: "/custom-stickers",
    ctaText: "Order Custom Stickers"
  },
  {
    id: "canvas-prints",
    name: "Fine Art Canvas Prints",
    shortLabel: "Custom Canvas",
    icon: ImageIcon,
    title: "Museum-Grade Stretched Canvas",
    tagline: "Transform photos and artwork into gallery-quality displays",
    description: "Archival pigment inks printed on genuine 100% cotton canvas, hand-stretched over solid kiln-dried wooden frames. Perfect for homes, boardrooms, and luxury gifts.",
    image: "/canvas-products/custom-canvas-3.jpeg",
    specs: [
      { label: "Material", value: "100% Archival Cotton" },
      { label: "Framing", value: "Kiln-Dried Pine Stretcher Bars" },
      { label: "Longevity", value: "Anti-Fade Archival Inks" }
    ],
    link: "/custom-canvas",
    ctaText: "Browse Canvas Options"
  },
  {
    id: "custom-wallpaper",
    name: "Custom Wall Murals",
    shortLabel: "Custom Wallpaper",
    icon: Sparkles,
    title: "Custom Wall Murals & Feature Wallpaper",
    tagline: "Seamless custom printed wallpaper for offices and residential spaces",
    description: "Transform commercial boardrooms, retail showrooms, and residential feature walls with vibrant, seamless custom printed wallpaper printed with anti-fade inks.",
    image: "/images/gallery/1776257457860.jpeg",
    specs: [
      { label: "Material", value: "Heavyweight Textured Vinyl" },
      { label: "Finish", value: "Seamless Custom Paste-Up" },
      { label: "Longevity", value: "Washable & Anti-Fade Inks" }
    ],
    link: "/custom-wallpaper",
    ctaText: "Explore Wall Murals"
  }
];

export function GeneralHero() {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory>(WORK_CATEGORIES[0]);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  // Auto-cycle categories every 6.5 seconds if user isn't hovering/interacting
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setSelectedCategory((prev) => {
        const nextIndex = (WORK_CATEGORIES.findIndex((c) => c.id === prev.id) + 1) % WORK_CATEGORIES.length;
        return WORK_CATEGORIES[nextIndex];
      });
    }, 6500);

    return () => clearInterval(interval);
  }, [isAutoCycling]);

  return (
    <section className="relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24">
      {/* Background Subtle Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Header Badge & Main Value Proposition */}
        <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Durban's Signage & Large Format Print Specialists</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-5"
          >
            High-Impact <span className="text-amber-400">Branding & Signage</span> That Grows Your Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-blue-100/80 max-w-3xl mx-auto font-light leading-relaxed mb-8"
          >
            From commercial fleet wraps and storefront signboards to one-way window contravisions, die-cut stickers, and custom canvas — engineered, printed, and installed in-house in Durban.
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link to="/general-submission">
              <button className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold px-7 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95">
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link to="/gallery">
              <button className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all backdrop-blur-sm">
                <span>View Full Portfolio</span>
              </button>
            </Link>

            <a
              href="tel:0659424036"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-amber-400 text-sm font-semibold px-4 py-3.5 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>065 9424 036</span>
            </a>
          </motion.div>
        </div>

        {/* Category Navigation Pills */}
        <div 
          className="mb-8 overflow-x-auto pb-2 scrollbar-none"
          onMouseEnter={() => setIsAutoCycling(false)}
          onMouseLeave={() => setIsAutoCycling(true)}
        >
          <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-2">
            {WORK_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsAutoCycling(false);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-amber-500 text-blue-950 shadow-md shadow-amber-500/30 scale-105"
                      : "bg-blue-900/40 hover:bg-blue-900/70 text-blue-200 border border-white/10"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-blue-950" : "text-amber-400"}`} />
                  <span>{cat.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Work Category Showcase Card */}
        <div 
          className="max-w-6xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md"
          onMouseEnter={() => setIsAutoCycling(false)}
          onMouseLeave={() => setIsAutoCycling(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Left Column: Visual Showcase */}
              <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] bg-slate-950 overflow-hidden group">
                <img
                  src={selectedCategory.image}
                  alt={selectedCategory.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                
                {/* Image Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 bg-blue-950/90 border border-white/20 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-md font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified In-House Work
                  </span>
                  <span className="text-xs text-slate-300 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md">
                    Durban, KZN
                  </span>
                </div>
              </div>

              {/* Right Column: Work Category Details & Spec Grid */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-b from-slate-900 to-slate-950">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
                    <selectedCategory.icon className="w-4 h-4 text-amber-400" />
                    <span>{selectedCategory.name}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                    {selectedCategory.title}
                  </h3>

                  <p className="text-amber-300 text-sm font-medium mb-4">
                    {selectedCategory.tagline}
                  </p>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                    {selectedCategory.description}
                  </p>

                  {/* Spec Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {selectedCategory.specs.map((spec, index) => (
                      <div key={index} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
                        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                          {spec.label}
                        </p>
                        <p className="text-xs font-bold text-white leading-tight">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <Link to={selectedCategory.link} className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors">
                      <span>{selectedCategory.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>

                  <Link 
                    to="/cost-calculator" 
                    className="text-xs text-slate-300 hover:text-amber-400 font-medium transition-colors"
                  >
                    Calculate Estimated Cost →
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Trust Indicators Bar */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm font-bold text-white">5.0 Star Rated</p>
            <p className="text-[11px] text-slate-400">Verified Google Reviews</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center text-amber-400 mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-white">24h Quote Turnaround</p>
            <p className="text-[11px] text-slate-400">Fast, competitive pricing</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-white">100% In-House</p>
            <p className="text-[11px] text-slate-400">Durban print studio & fitting</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center text-amber-400 mb-1">
              <Truck className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-white">500+ Projects Done</p>
            <p className="text-[11px] text-slate-400">Across KwaZulu-Natal</p>
          </div>
        </div>
      </div>
    </section>
  );
}
