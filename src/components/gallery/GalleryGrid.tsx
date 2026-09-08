import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GalleryItem {
    src: string;
    category: string;
    title?: string;
    alt?: string;
}

interface GalleryGridProps {
    items: GalleryItem[];
    categories?: string[];
}

const formatCategoryLabel = (category: string): string => {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const categoryBadgeColors: Record<string, string> = {
    "vehicle-branding": "bg-blue-100 text-blue-700",
    "sign-boards": "bg-emerald-100 text-emerald-700",
    "contravisions": "bg-purple-100 text-purple-700",
    "stickers": "bg-rose-100 text-rose-700",
    "promotional": "bg-amber-100 text-amber-700",
};

const getCategoryBadgeClass = (category: string): string => {
    return categoryBadgeColors[category] || "bg-gray-100 text-gray-700";
};

export function GalleryGrid({ items, categories = [] }: GalleryGridProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>("All");

    const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
    const filterOptions = ["All", ...uniqueCategories];

    const filteredItems = activeFilter === "All"
        ? items
        : items.filter((item) => item.category === activeFilter);

    const isLightboxOpen = selectedIndex !== null;

    const goToPrevious = useCallback(() => {
        setSelectedIndex((prev) => {
            if (prev === null || filteredItems.length === 0) return prev;
            return (prev - 1 + filteredItems.length) % filteredItems.length;
        });
    }, [filteredItems.length]);

    const goToNext = useCallback(() => {
        setSelectedIndex((prev) => {
            if (prev === null || filteredItems.length === 0) return prev;
            return (prev + 1) % filteredItems.length;
        });
    }, [filteredItems.length]);

    const closeLightbox = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isLightboxOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isLightboxOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                    e.preventDefault();
                    goToPrevious();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    goToNext();
                    break;
                case "Escape":
                    e.preventDefault();
                    closeLightbox();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLightboxOpen, goToPrevious, goToNext, closeLightbox]);

    const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

    return (
        <>
            {/* Filter buttons */}
            <div className="w-full overflow-hidden mb-8">
                <div className="flex flex-row md:flex-wrap overflow-x-auto whitespace-nowrap justify-start md:justify-center gap-3 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {filterOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                setActiveFilter(option);
                                setSelectedIndex(null);
                            }}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-semibold transition-all border shrink-0",
                                activeFilter === option
                                    ? "bg-blue-950 text-white border-blue-950 shadow-lg shadow-blue-950/20"
                                    : "bg-white text-blue-950 border-gray-200 hover:border-amber-400 hover:text-amber-600"
                            )}
                            aria-pressed={activeFilter === option}
                        >
                            {option === "All" ? "All" : formatCategoryLabel(option)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                    <div
                        key={`${item.src}-${index}`}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                        onClick={() => setSelectedIndex(index)}
                    >
                        <img
                            src={item.src}
                            alt={item.alt || item.title || `Pro Graphics Project ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Category badge */}
                        <span
                            className={cn(
                                "absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-xs font-semibold",
                                "shadow-sm backdrop-blur-sm",
                                getCategoryBadgeClass(item.category)
                            )}
                        >
                            {formatCategoryLabel(item.category)}
                        </span>

                        {/* Title overlay */}
                        {item.title && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                                <p className="text-white font-semibold text-sm truncate">{item.title}</p>
                            </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/40 transition-colors duration-500 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                                <span className="bg-amber-400 text-blue-950 font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wide shadow-lg">
                                    View Full Size
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slideshow Lightbox */}
            {isLightboxOpen && selectedItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-all duration-300 animate-in fade-in"
                    onClick={closeLightbox}
                >
                    {/* Header: counter + close */}
                    <div className="absolute top-4 left-0 right-0 z-50 flex items-center justify-between px-6">
                        <span className="text-white/80 text-sm font-medium tracking-wide">
                            {selectedIndex! + 1} / {filteredItems.length}
                        </span>
                        <button
                            onClick={closeLightbox}
                            className="text-white hover:text-amber-400 transition-colors p-2"
                            aria-label="Close lightbox"
                        >
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Previous arrow */}
                    {filteredItems.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className={cn(
                                "absolute left-4 top-1/2 -translate-y-1/2 z-50",
                                "w-12 h-12 rounded-full",
                                "bg-white/10 backdrop-blur-md border border-white/20",
                                "flex items-center justify-center",
                                "text-white hover:bg-white/30 hover:scale-110",
                                "transition-all duration-200"
                            )}
                            aria-label="Previous image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Image container */}
                    <div
                        className="relative w-full max-w-5xl h-full max-h-[85vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedItem.src}
                            alt={selectedItem.alt || selectedItem.title || "Full Size Project View"}
                            className="max-w-full max-h-full object-contain"
                        />

                        {/* Title bar at bottom of image */}
                        {selectedItem.title && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8 rounded-b-lg">
                                <div className="flex items-center gap-3">
                                    {selectedItem.category && (
                                        <span
                                            className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-semibold",
                                                getCategoryBadgeClass(selectedItem.category)
                                            )}
                                        >
                                            {formatCategoryLabel(selectedItem.category)}
                                        </span>
                                    )}
                                    <span className="text-white font-semibold text-base">
                                        {selectedItem.title}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Next arrow */}
                    {filteredItems.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className={cn(
                                "absolute right-4 top-1/2 -translate-y-1/2 z-50",
                                "w-12 h-12 rounded-full",
                                "bg-white/10 backdrop-blur-md border border-white/20",
                                "flex items-center justify-center",
                                "text-white hover:bg-white/30 hover:scale-110",
                                "transition-all duration-200"
                            )}
                            aria-label="Next image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
