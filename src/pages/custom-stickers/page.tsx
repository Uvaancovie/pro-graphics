import { Metadata } from "next";
import { BulkPricingTable } from "@/components/stickers/BulkPricingTable";
import { Seo } from "@/components/Seo";
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
            <Seo
                title="Custom Stickers Durban | Bulk Labels & Vinyl Decals"
                description="Die-cut to your exact shape. Transparent bulk pricing. Fast turnaround for custom vinyl stickers and decals in Durban."
                canonicalUrl="/custom-stickers"
            />
            <ServiceHero
                title="Custom Cutout Stickers"
                subtitle="Die-cut to your exact shape. Transparent bulk pricing. Fast turnaround for Durban businesses."
                imageSrc="/images/ads/custom-stickers-hero.png"
                imageAlt="Custom die-cut vinyl stickers in a professional print workshop"
                breadcrumbLabel="Custom Stickers"
                primaryCTA={{ text: "Get Instant Quote", href: "/quote" }}
            />

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
