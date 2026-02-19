"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/Card";

const testimonials = [
    {
        name: "Siyabonga Patrick",
        role: "Local Guide",
        content: "Friendly place to meet up with stuff. They are friendly. Great service and attention to detail on my signs.",
        rating: 5,
        initial: "S",
        color: "bg-blue-100 text-blue-700"
    },
    {
        name: "karriem simons",
        role: "Verified Customer",
        content: "Excellent quality vehicle branding. The team was professional and the finish was perfect. Highly recommended.",
        rating: 5,
        initial: "K",
        color: "bg-amber-100 text-amber-700"
    },
    {
        name: "Zaheeda Kadir",
        role: "Business Owner",
        content: "We ordered custom stickers for our shop and they turned out amazing. Fast turnaround and great pricing strategy.",
        rating: 5,
        initial: "Z",
        color: "bg-green-100 text-green-700"
    },
    {
        name: "Kaelin Munsamy",
        role: "Verified Customer",
        content: "Pro Graphics handled our office signage with extreme care. The materials used are clearly premium quality.",
        rating: 5,
        initial: "K",
        color: "bg-purple-100 text-purple-700"
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
                            className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 text-center"
                        >
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="text-amber-500"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed font-light">
                                "{testimonials[currentIndex].content}"
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${testimonials[currentIndex].color}`}>
                                    {testimonials[currentIndex].initial}
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-blue-950 text-lg">{testimonials[currentIndex].name}</div>
                                    <div className="text-sm text-amber-600 font-semibold uppercase tracking-wider">{testimonials[currentIndex].role}</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 text-blue-950 transition-all z-10"
                        aria-label="Previous testimonial"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 text-blue-950 transition-all z-10"
                        aria-label="Next testimonial"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-amber-500 w-6" : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
