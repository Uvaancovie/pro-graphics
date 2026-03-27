"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    {
        title: "Black Roof Wraps",
        image: "/testimonials/black-roof-wraps.jpg"
    },
    {
        title: "Custom Canvas",
        image: "/testimonials/custom-canvas.jpg"
    },
    {
        title: "Custom Wallpaper",
        image: "/testimonials/custom-wallpaper.jpg"
    },
    {
        title: "Lamin-X Headlight Film",
        image: "/testimonials/laminex-headlight-film.jpg"
    },
];

export function SocialProof() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
                        What Our <span className="text-amber-500">Customers Say</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Trusted by hundreds of businesses in Durban for quality branding and signage solutions.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100"
                        >
                            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl border border-gray-200">
                                <Image
                                    src={testimonials[currentIndex].image}
                                    alt={`${testimonials[currentIndex].title} testimonial`}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 896px"
                                    priority={currentIndex === 0}
                                />
                            </div>
                            <p className="text-center text-sm md:text-base text-gray-600 mt-4 font-medium">
                                {testimonials[currentIndex].title}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 text-blue-950 transition-all z-10"
                        aria-label="Previous testimonial"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 text-blue-950 transition-all z-10"
                        aria-label="Next testimonial"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center flex-wrap mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className="w-11 h-11 flex items-center justify-center group"
                                aria-label={`Go to testimonial ${index + 1}`}
                            >
                                <span className={`h-3 rounded-full transition-all ${index === currentIndex ? "bg-amber-500 w-6" : "bg-gray-300 w-3 group-hover:bg-gray-400"
                                    }`} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
