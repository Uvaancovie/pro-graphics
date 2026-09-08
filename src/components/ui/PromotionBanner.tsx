

import { useEffect, useState } from "react";
import { Timer, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";


export default function PromotionBanner() {
    // In a real app, these values would come from an API or shared state
    const [spotsRemaining, setSpotsRemaining] = useState(4);
    const totalSpots = 10;

    // Percentage for the progress bar
    const progressPercentage = (spotsRemaining / totalSpots) * 100;

    return (
        <div className="bg-blue-950 text-white py-3 border-b border-amber-500/30 overflow-hidden shadow-2xl relative">
            <div className="container mx-auto px-4 mt-1">
                <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                    {/* Offer Title */}
                    <div className="flex items-center justify-center gap-2 text-center px-2">
                        <div className="hidden xs:flex bg-amber-500 text-blue-950 p-1.5 rounded-full animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                            <Zap size={16} fill="currentColor" />
                        </div>
                        <div className="text-center">
                            <span className="font-black text-amber-500 tracking-tighter text-sm sm:text-base uppercase">Price Beat Guarantee:</span>
                            <span className="block sm:inline font-bold text-white text-xs sm:text-sm tracking-tight">Bring a Verified Quote & We'll Beat It by 10%</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <Link to="/price-beat">
                            <button className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold py-1.5 px-5 rounded-full text-xs transition-all hover:scale-105 active:scale-95 uppercase tracking-wider shadow-md whitespace-nowrap">
                                Claim Offer
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
