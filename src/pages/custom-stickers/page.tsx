import { Metadata } from "next";
import { BulkPricingTable } from "@/components/stickers/BulkPricingTable";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";


import { FaqSection } from "@/components/ui/FaqSection";

const customStickerFaqs = [
    {
        question: 'What sticker materials do you offer?',
        answer: 'We produce durable vinyl stickers suitable for indoor and outdoor use, including die-cut options for branded shapes and logo packs.',
    },
    {
        question: 'Do you offer bulk pricing for Durban businesses?',
        answer: 'Yes. Unit rates improve at higher quantities, making custom sticker runs ideal for product labels, promos, and fleet kits.',
    },
    {
        question: 'How fast can sticker orders be completed?',
        answer: 'Turnaround depends on quantity and finishing, but standard orders are typically completed within a few working days after artwork approval.',
    },
];



export default function CustomStickersPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/ads/custom-cutout-stickers.jpeg"
                        alt="Custom Die-Cut Stickers"
                        
                        className="object-cover"
                        
                    />
                    <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 drop-shadow-lg">
                        Custom Cutout Stickers{" "}
                        <span className="text-amber-400">| Pro Graphics</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Die-cut to your exact shape. Transparent bulk pricing. Fast turnaround.
                    </p>
                    <Link to="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-12 py-8 text-xl shadow-2xl border-none">
                            Get Instant Quote
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Bulk Pricing Table Component */}
            <BulkPricingTable />

            <FaqSection
                title="Custom Sticker FAQs"
                intro="Everything you need to know about material options, pricing, and turnaround."
                faqs={customStickerFaqs}
                className="py-20 bg-white border-t border-gray-200"
            />

            {/* CTA */}
            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Ready to Order Your Custom Stickers?
                    </h2>
                    <Link to="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Place Your Order Now
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
