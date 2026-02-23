import { Metadata } from "next";
import { SmartQuoteForm } from "@/app/components/quote/SmartQuoteForm";

export const metadata: Metadata = {
    title: "Get a Free Quote | Pro Graphics - 24-Hour Response",
    description:
        "Request a free, no-obligation quote for vehicle branding, signage, stickers, and more. Professional service with 24-hour response time.",
};

export default function QuotePage() {
    return (
        <main className="min-h-screen bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    {/* The Durban 10 Scarcity Badge on Quote Page - CSS/Tailwind Only */}
                    <div className="inline-flex items-center gap-2 bg-blue-950 text-amber-500 px-5 py-2.5 rounded-full mb-8 shadow-xl border border-amber-500/20 animate-bounce">
                        <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
                        <span className="font-black uppercase tracking-widest text-xs md:text-sm">
                            CLAIM YOUR 25% DISCOUNT: 4 FOUNDING SPOTS LEFT
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
                        Get Your Free Quote
                    </h1>
                    <p className="text-xl text-black max-w-3xl mx-auto font-medium">
                        Tell us about your project and we'll provide a detailed, transparent quote within 24 hours
                    </p>
                </div>

                <SmartQuoteForm />

                {/* Trust Indicators */}
                <div className="mt-16 grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl mb-3">⚡</div>
                        <h3 className="font-bold text-black mb-2">24-Hour Response</h3>
                        <p className="text-sm text-black font-medium">Fast, professional quotes</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-3">💰</div>
                        <h3 className="font-bold text-black mb-2">Transparent Pricing</h3>
                        <p className="text-sm text-black font-medium">No hidden fees ever</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-3">🎨</div>
                        <h3 className="font-bold text-black mb-2">Free Design Mockup</h3>
                        <p className="text-sm text-black font-medium">See before you commit</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-3">✅</div>
                        <h3 className="font-bold text-black mb-2">No Obligation</h3>
                        <p className="text-sm text-black font-medium">Zero pressure sales</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
