import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/world-cup-posters/lionel-messi.jpg",
    badge: "🏆 Limited Special Edition",
    badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    title: "FIFA World Cup 2026™ Legend Posters",
    subtitle: "Durban's exclusive collection of 36 football legends. High-fidelity prints & custom framing.",
    ctaText: "Explore Collection",
    ctaLink: "/world-cup",
    secondaryCtaText: "Request Quote",
    secondaryCtaLink: "/quote?product=world-cup-legend-posters",
    isWorldCup: true,
  },
  {
    image: "/images/content/1.jpeg",
    badge: "🚗 Mobile Billboards",
    badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    title: "Vehicle Wraps & Signage That Stop Traffic",
    subtitle: "Durban's Premier Printing & Signage Specialists. Standard 24h quote turnaround.",
    ctaText: "View Products",
    ctaLink: "/products",
    secondaryCtaText: "Call Us",
    secondaryCtaLink: "tel:0659424036",
  },
  {
    image: "/images/content/4.jpeg",
    badge: "🏢 Corporate Branding",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    title: "Sleek Chromadek & ABS Sign Boards",
    subtitle: "Enhance your storefront and offices with durable, professional sign boards.",
    ctaText: "Sign Board Services",
    ctaLink: "/sign-boards",
    secondaryCtaText: "Get Quote",
    secondaryCtaLink: "/quote",
  },
  {
    image: "/images/content/3.jpeg",
    badge: "🎨 Custom Canvas Prints",
    badgeClass: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "Premium Home & Office Canvas Prints",
    subtitle: "Transform your favorite memories or company artwork into high-quality prints.",
    ctaText: "Custom Canvas Shop",
    ctaLink: "/canvas-shop",
    secondaryCtaText: "Estimate Cost",
    secondaryCtaLink: "/cost-calculator",
  },
];

export function HeroCarousel() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000); // Change image every 6 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-blue-950 flex flex-col group">
      {/* Background Slider */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={currentSlideIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              nextSlide();
            } else if (swipe > swipeConfidenceThreshold) {
              prevSlide();
            }
          }}
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className={cn(
              "w-full h-full object-cover",
              currentSlide.isWorldCup ? "object-top" : "object-cover"
            )}
            fetchPriority="high"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/ads/vehicle-branding.jpeg";
            }}
          />
          {/* Elegant Dark Overlay with slide-specific color toning */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none mix-blend-multiply transition-colors duration-500",
              currentSlide.isWorldCup
                ? "bg-gradient-to-b from-emerald-950/40 via-blue-950/75 to-blue-950/90"
                : "bg-blue-950/70"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-black/30 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls (Arrows) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-colors bg-black/10 hover:bg-black/30 backdrop-blur-sm rounded-full md:opacity-0 md:group-hover:opacity-100 duration-300"
        aria-label="Previous Slide"
      >
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-colors bg-black/10 hover:bg-black/30 backdrop-blur-sm rounded-full md:opacity-0 md:group-hover:opacity-100 duration-300"
        aria-label="Next Slide"
      >
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center mt-[-30px] pointer-events-none">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlideIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center space-y-4"
            >
              {currentSlide.badge && (
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 border backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider",
                    currentSlide.badgeClass
                  )}
                >
                  {currentSlide.badge}
                </div>
              )}

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg leading-tight tracking-tight uppercase">
                {currentSlide.title.includes("FIFA") ? (
                  <>
                    FIFA World Cup <span className="text-amber-400 block mt-1 sm:inline">2026™</span>
                  </>
                ) : (
                  currentSlide.title
                )}
              </h1>

              {currentSlide.title.includes("FIFA") && (
                <div className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Legend Posters Collection
                </div>
              )}

              <p className="text-sm sm:text-lg md:text-xl text-blue-100 font-light max-w-2xl mx-auto drop-shadow-md">
                {currentSlide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="relative z-20 pb-16 pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center w-full bg-gradient-to-t from-blue-950/90 to-transparent pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`ctas-${currentSlideIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 justify-center"
          >
            {currentSlide.ctaLink.startsWith("http") || currentSlide.ctaLink.startsWith("tel:") ? (
              <a href={currentSlide.ctaLink} className="w-full sm:w-auto">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-8 py-3 rounded-full w-full sm:min-w-[180px] shadow-lg shadow-amber-500/20 hover:scale-105 transition-all">
                  {currentSlide.ctaText}
                </Button>
              </a>
            ) : (
              <Link to={currentSlide.ctaLink} className="w-full sm:w-auto">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-8 py-3 rounded-full w-full sm:min-w-[180px] shadow-lg shadow-amber-500/20 hover:scale-105 transition-all">
                  {currentSlide.ctaText}
                </Button>
              </Link>
            )}

            {currentSlide.secondaryCtaLink.startsWith("http") || currentSlide.secondaryCtaLink.startsWith("tel:") ? (
              <a href={currentSlide.secondaryCtaLink} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-blue-950 px-8 py-3 text-base rounded-full transition-all w-full sm:min-w-[180px]"
                >
                  {currentSlide.secondaryCtaText}
                </Button>
              </a>
            ) : (
              <Link to={currentSlide.secondaryCtaLink} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-blue-950 px-8 py-3 text-base rounded-full transition-all w-full sm:min-w-[180px]"
                >
                  {currentSlide.secondaryCtaText}
                </Button>
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 z-20 pointer-events-auto">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className="w-8 h-8 flex items-center justify-center group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentSlideIndex ? "bg-amber-500 w-5" : "bg-white/30 w-1.5 group-hover:bg-white/50"
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}