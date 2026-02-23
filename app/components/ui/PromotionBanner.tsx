"use client";

import { useEffect, useState } from "react";
import { Timer, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function PromotionBanner() {
    // In a real app, these values would come from an API or shared state
    const [spotsRemaining, setSpotsRemaining] = useState(4);
    const totalSpots = 10;

    // Percentage for the progress bar
    const progressPercentage = (spotsRemaining / totalSpots) * 100;

    return (
        <div className="bg-blue-950 text-white py-3 border-b border-amber-500/30 overflow-hidden shadow-2xl relative">
            {/* Visual Scarcity Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-900">
                <div
                    className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>

            <div className="container mx-auto px-4 mt-1">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                    {/* Offer Title */}
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-500 text-blue-950 p-1.5 rounded-full animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                            <Zap size={18} fill="currentColor" />
                        </div>
                        <div className="text-center md:text-left">
                            <span className="font-black text-amber-500 tracking-tighter text-lg uppercase">The Durban 10 Offer:</span>
                            <span className="ml-2 font-bold text-white uppercase tracking-tight">Get 25% OFF Vehicle Branding</span>
                        </div>
                    </div>

                    {/* Scarcity & Countdown Tracker */}
                    <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
                        {/* Spots Remaining Indicator */}
                        <div className="flex items-center gap-2 bg-blue-900/40 px-3 py-1.5 rounded-full border border-blue-800/50 backdrop-blur-sm">
                            <Users size={16} className="text-amber-500" />
                            <span className="text-xs md:text-sm font-semibold">
                                <span className="text-amber-500 font-bold">{spotsRemaining}</span> of {totalSpots} founding spots left
                            </span>
                        </div>

                        {/* Time Limit Indicator */}
                        <div className="hidden sm:flex items-center gap-2 bg-blue-900/40 px-3 py-1.5 rounded-full border border-blue-800/50 backdrop-blur-sm">
                            <Timer size={16} className="text-amber-500" />
                            <span className="text-xs md:text-sm font-semibold italic text-blue-100">
                                Ends in <span className="text-white font-mono font-bold">48h : 12m</span>
                            </span>
                        </div>

                        <Link href="/quote">
                            <button className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black py-2 px-8 rounded-full text-sm transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 uppercase tracking-widest shadow-lg border-b-4 border-amber-700">
                                CLAIM SPOT
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
