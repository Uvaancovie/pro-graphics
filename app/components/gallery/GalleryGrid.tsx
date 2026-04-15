"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type GalleryCategory = "Ads" | "Portfolio" | "Testimonials";

interface GalleryItem {
    src: string;
    category: GalleryCategory;
    title?: string;
    alt?: string;
}

interface GalleryGridProps {
    items: GalleryItem[];
}

const filterOptions = ["All", "Ads", "Portfolio", "Testimonials"] as const;
type FilterOption = (typeof filterOptions)[number];

export function GalleryGrid({ items }: GalleryGridProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

    const filteredItems = activeFilter === "All"
        ? items
        : items.filter((item) => item.category === activeFilter);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedImage]);

    return (
        <>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {filterOptions.map((option) => (
                    <button
                        key={option}
                        onClick={() => setActiveFilter(option)}
                        className={cn(
                            "px-5 py-2 rounded-full text-sm font-semibold transition-all border",
                            activeFilter === option
                                ? "bg-blue-950 text-white border-blue-950"
                                : "bg-white text-blue-950 border-gray-200 hover:border-amber-400 hover:text-amber-600"
                        )}
                        aria-pressed={activeFilter === option}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                    <div
                        key={`${item.src}-${index}`}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedImage(item.src)}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt || item.title || `Pro Graphics Project ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Title overlay for images with titles */}
                        {item.title && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                                <p className="text-white font-semibold text-sm truncate">{item.title}</p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/40 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <span className="bg-amber-400 text-blue-950 font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wide shadow-lg">
                                    View Full Size
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-all duration-300 animate-in fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-50 p-2"
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div
                        className="relative w-full max-w-5xl h-full max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent close on image click
                    >
                        <Image
                            src={selectedImage}
                            alt="Full Size Project View"
                            fill
                            className="object-contain"
                            quality={90}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
