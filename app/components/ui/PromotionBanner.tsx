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
            <div className="container mx-auto px-4 mt-1">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                    {/* Offer Title */}
                    <div className="flex items-center justify-center gap-3 text-center">
                        <div className="bg-amber-500 text-blue-950 p-1.5 rounded-full animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                            <Zap size={18} fill="currentColor" />
                        </div>
                        <div className="text-center md:text-left">
                            <span className="font-black text-amber-500 tracking-tighter text-lg uppercase">Price Beat Guarantee:</span>
                            <span className="ml-2 font-bold text-white uppercase tracking-tight">Bring a Verified Quote & We'll Beat It by 10%</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
                        <Link href="/price-beat">
                            <button className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black py-2 px-8 rounded-full text-sm transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 uppercase tracking-widest shadow-lg border-b-4 border-amber-700">
                                CLAIM OFFER
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
