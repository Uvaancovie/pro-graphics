"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export function BeforeAfterSlider() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        setSliderPosition(Math.min(Math.max(percentage, 0), 100));
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            handleMove(e.clientX);
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (isDragging && e.touches[0]) {
            handleMove(e.touches[0].clientX);
        }
    };

    const handleStart = () => setIsDragging(true);
    const handleEnd = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleEnd);
            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("touchend", handleEnd);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleEnd);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging]);

    return (
        <section className="py-24 bg-blue-950 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        See Through <span className="text-amber-400">The Magic</span>
                    </h2>
                    <p className="text-xl text-blue-200 max-w-3xl mx-auto font-light">
                        Contravision window graphics let you advertise on the outside while maintaining visibility from the inside.
                        Drag the slider to see both perspectives.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Interactive Slider */}
                    <div
                        ref={containerRef}
                        className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none border-4 border-amber-500/30"
                        onMouseDown={handleStart}
                        onTouchStart={handleStart}
                    >
                        {/* Outside View (Branding) */}
                        <div className="absolute inset-0 bg-blue-900 flex items-center justify-center relative">
                            {/* Placeholder for actual image if available, using strict blue styling for now */}
                            <div className="absolute inset-0 opacity-20 bg-[url('/images/ads/contravisions.jpeg')] bg-cover bg-center"></div>

                            <div className="text-center p-8 relative z-10">
                                <div className="text-6xl mb-4 text-amber-400">🏢</div>
                                <h3 className="text-4xl font-bold mb-4 text-white">OUTSIDE VIEW</h3>
                                <p className="text-2xl text-blue-200 mb-6">Bold Branding Visible to Everyone</p>
                                <div className="bg-blue-950/80 backdrop-blur-sm rounded-xl p-8 border border-amber-500/50 shadow-xl">
                                    <p className="text-3xl font-bold text-amber-400 tracking-wider">PRO GRAPHICS</p>
                                    <p className="text-xl text-white mt-2">Professional Printing & Signage</p>
                                </div>
                            </div>
                        </div>

                        {/* Inside View (Transparency) */}
                        <div
                            className="absolute inset-0 bg-gray-100 flex items-center justify-center"
                            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                        >
                            {/* Note: clipPath logic was inverted in original, assuming 'After' is on right */}
                            <div className="text-center p-8 text-gray-800">
                                <div className="text-6xl mb-4 text-blue-500">👁️</div>
                                <h3 className="text-4xl font-bold mb-4 text-blue-950">INSIDE VIEW</h3>
                                <p className="text-2xl text-gray-600 mb-6">Crystal Clear Visibility Maintained</p>
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-blue-200 shadow-xl">
                                    <p className="text-lg font-semibold text-blue-900">✓ See outside clearly</p>
                                    <p className="text-lg font-semibold text-blue-900">✓ Natural light flows through</p>
                                    <p className="text-lg font-semibold text-blue-900">✓ No privacy compromise</p>
                                </div>
                            </div>
                        </div>

                        {/* Slider Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] z-20"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-amber-400 cursor-grab active:cursor-grabbing">
                                <svg
                                    className="w-6 h-6 text-amber-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Labels */}
                        <div className="absolute top-6 left-6 bg-blue-950/90 text-amber-400 px-6 py-2 rounded-full font-bold shadow-lg border border-amber-500/30 z-10">
                            Outside View
                        </div>
                        <div
                            className="absolute top-6 right-6 bg-white/90 text-blue-950 px-6 py-2 rounded-full font-bold shadow-lg border border-blue-200 z-10"
                        >
                            Inside View
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-8 text-center animate-pulse">
                        <p className="text-blue-200 flex items-center justify-center gap-2 text-lg">
                            <span className="text-2xl">↔️</span> Drag the slider to compare views
                        </p>
                    </div>

                    {/* Technical Explanation */}
                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-900/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-800 hover:border-amber-500/50 transition-colors">
                            <div className="text-4xl mb-4">🔬</div>
                            <h4 className="text-xl font-bold mb-3 text-white">How It Works</h4>
                            <p className="text-blue-200 leading-relaxed font-light">
                                Micro-perforated vinyl with thousands of tiny holes allows light through from inside,
                                while the printed surface is visible from outside.
                            </p>
                        </div>

                        <div className="bg-blue-900/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-800 hover:border-amber-500/50 transition-colors">
                            <div className="text-4xl mb-4">🎯</div>
                            <h4 className="text-xl font-bold mb-3 text-white">Perfect For</h4>
                            <p className="text-blue-200 leading-relaxed font-light">
                                Storefronts, office windows, vehicle rear windows, glass partitions - anywhere you need
                                advertising without blocking views.
                            </p>
                        </div>

                        <div className="bg-blue-900/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-800 hover:border-amber-500/50 transition-colors">
                            <div className="text-4xl mb-4">⚡</div>
                            <h4 className="text-xl font-bold mb-3 text-white">Key Benefits</h4>
                            <p className="text-blue-200 leading-relaxed font-light">
                                50/50 or 70/30 perforation ratios available. UV resistant, weatherproof,
                                and maintains 60-80% visibility from inside.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
