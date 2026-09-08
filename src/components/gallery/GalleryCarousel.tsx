import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CarouselItem {
  src: string;
  title?: string;
  alt?: string;
  category?: string;
}

interface GalleryCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  className?: string;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function GalleryCarousel({
  items,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  className,
}: GalleryCarouselProps) {
  const [[currentIndex, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = (prev + newDirection + items.length) % items.length;
        return [next, newDirection];
      });
    },
    [items.length]
  );

  const goToSlide = useCallback((index: number) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isHovered || items.length <= 1) return;
    const timer = setInterval(() => paginate(1), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovered, interval, paginate, items.length]);

  if (!items.length) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl shadow-lg shadow-black/10 group select-none",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 16:9 aspect ratio container */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            <img
              src={currentItem.src}
              alt={currentItem.alt || currentItem.title || "Gallery image"}
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* Gradient overlay with title & category */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16 pointer-events-none">
              <div className="flex items-center gap-3">
                {currentItem.category && (
                  <span className="inline-block bg-amber-400/90 text-blue-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {currentItem.category.split("-").join(" ")}
                  </span>
                )}
                {currentItem.title && (
                  <h3 className="text-white text-lg md:text-xl font-semibold truncate drop-shadow-md">
                    {currentItem.title}
                  </h3>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 z-10",
                "w-10 h-10 md:w-11 md:h-11 rounded-full",
                "bg-white/20 backdrop-blur-md border border-white/30",
                "flex items-center justify-center",
                "text-white hover:bg-white/40 hover:scale-110",
                "transition-all duration-200",
                "md:opacity-0 md:group-hover:opacity-100"
              )}
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 z-10",
                "w-10 h-10 md:w-11 md:h-11 rounded-full",
                "bg-white/20 backdrop-blur-md border border-white/30",
                "flex items-center justify-center",
                "text-white hover:bg-white/40 hover:scale-110",
                "transition-all duration-200",
                "md:opacity-0 md:group-hover:opacity-100"
              )}
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-6 h-2 bg-amber-400"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
