"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
    "/images/content/1.jpeg",
    "/images/content/2.jpeg",
    "/images/content/3.jpeg",
    "/images/content/4.jpeg",
    "/images/content/5.jpeg",
];

export function HeroCarousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, [nextSlide]);

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-blue-950 flex flex-col group">
            {/* Background Slider */}
            <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                    key={currentImageIndex}
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
                    <Image
                        src={heroImages[currentImageIndex]}
                        alt={`Hero Background ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                        priority={true}
                    />
                    {/* Elegant Dark Overlay */}
                    <div className="absolute inset-0 bg-blue-950/70 mix-blend-multiply pointer-events-none"></div>
                </motion.div>
            </AnimatePresence>

            {/* Slider Controls (Arrows) */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 text-white/50 hover:text-white transition-colors hover:bg-black/20 rounded-full md:opacity-0 md:group-hover:opacity-100 duration-300"
                aria-label="Previous Slide"
            >
                <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 text-white/50 hover:text-white transition-colors hover:bg-black/20 rounded-full md:opacity-0 md:group-hover:opacity-100 duration-300"
                aria-label="Next Slide"
            >
                <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Main Content Overlay */}
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center mt-[-40px] pointer-events-none">
                {/* Price Beat Guarantee Badge - Above Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="inline-flex items-center gap-2 bg-amber-500 text-blue-950 px-4 py-2 rounded-full mb-6 shadow-[0_0_25px_rgba(245,158,11,0.5)] border-2 border-white/20"
                >
                    <span className="flex h-2 w-2 rounded-full bg-blue-950 animate-ping"></span>
                    <span className="font-black uppercase tracking-widest text-xs md:text-sm">
                        PRICE BEAT GUARANTEE: WE'LL BEAT ANY QUOTE BY 10%
                    </span>
                </motion.div>

                {/* Logo Animation */}
                <div className="mb-6 relative w-40 h-40 md:w-48 md:h-48 animate-fade-in-up">
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl transform scale-125 animate-pulse"></div>
                    <Image
                        src="/images/content/logo.png"
                        alt="Pro Graphics Logo"
                        fill
                        className="object-contain drop-shadow-2xl relative z-10"
                        priority
                    />
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight tracking-tight">
                        Transform Your Brand Into <span className="text-amber-400 block mt-1">Visual Impact</span>
                    </h1>

                    <p className="text-lg md:text-xl text-blue-100 font-light max-w-xl mx-auto drop-shadow-md">
                        Durban's Premier Printing & Signage Specialists
                    </p>
                </div>
            </div>

            {/* CTA Buttons */}
            <div className="relative z-20 pb-16 pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center w-full bg-gradient-to-t from-blue-950/90 to-transparent pointer-events-auto">
                <Link href="/quote">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1 min-w-[200px]">
                        Get Free Quote
                    </Button>
                </Link>
                <a href="tel:0315086700">
                    <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-blue-950 px-8 py-4 text-lg rounded-full transition-all hover:-translate-y-1 min-w-[200px]">
                        Call 031 508 6700
                    </Button>
                </a>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-auto">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-300 p-1 bg-clip-content border-transparent border-4", // Increased touch target
                            index === currentImageIndex ? "bg-amber-500 w-8" : "bg-white/30 w-4 hover:bg-white/50"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
