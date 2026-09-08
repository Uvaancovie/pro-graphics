import { Seo } from "@/components/Seo";
import { SmartQuoteForm } from "@/components/quote/SmartQuoteForm";



export default function QuotePage() {
    return (
        <main className="min-h-screen bg-white py-16">
            <Seo
                title="Get a Free Signage & Branding Quote"
                description="Get a free, detailed quote within 24 hours. No obligation, no pressure — just honest advice on your signage or branding project."
                canonicalUrl="/quote"
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    {/* Price Beat Badge on Quote Page */}
                    <div className="inline-flex items-center gap-2 bg-blue-950 text-amber-500 px-5 py-2.5 rounded-full mb-8 shadow-xl border border-amber-500/20 animate-bounce">
                        <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
                        <span className="font-black uppercase tracking-widest text-xs md:text-sm">
                            PRICE BEAT GUARANTEE: WE'LL BEAT ANY QUOTE BY 10%
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
                        Get Your Free Quote
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-black max-w-3xl mx-auto font-medium">
                        Tell us about your project and we'll provide a detailed, transparent quote within 24 hours
                    </p>
                </div>

                <SmartQuoteForm />

                {/* Trust Indicators */}
                <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    <div className="text-center">
                        <div className="text-4xl mb-3">24h</div>
                        <h3 className="font-bold text-black mb-2">24-Hour Response</h3>
                        <p className="text-sm text-black font-medium">Fast, professional quotes</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-3">R</div>
                        <h3 className="font-bold text-black mb-2">Transparent Pricing</h3>
                        <p className="text-sm text-black font-medium">No hidden fees ever</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-3">Design</div>
                        <h3 className="font-bold text-black mb-2">Free Design Mockup</h3>
                        <p className="text-sm text-black font-medium">See before you commit</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-3">No</div>
                        <h3 className="font-bold text-black mb-2">No Obligation</h3>
                        <p className="text-sm text-black font-medium">Zero pressure sales</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
