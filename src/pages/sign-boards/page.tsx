import { Metadata } from "next";
import { MaterialComparison } from "@/components/sign-boards/MaterialComparison";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";


import { FaqSection } from "@/components/ui/FaqSection";

const signBoardFaqs = [
    {
        question: 'What sign board material is best for Durban weather?',
        answer: 'For outdoor durability, Chromadek and aluminum-backed options are popular. We recommend materials based on location, sunlight exposure, and expected lifespan.',
    },
    {
        question: 'Do you design and install sign boards?',
        answer: 'Yes. We handle design, production, and installation to keep quality consistent from concept to final fitment.',
    },
    {
        question: 'Can I pair sign boards with fleet branding?',
        answer: 'Absolutely. Combining storefront signage and vehicle branding often improves local visibility and lead volume.',
    },
    {
        question: 'How quickly can a sign board project be completed?',
        answer: 'Production timelines vary by size and material, but most standard projects move from design approval to install within days.',
    },
];



export default function SignBoardsPage() {
    return (
        <main className="min-h-screen">
            <Seo
                title="Sign Boards Durban | Custom Shop & Outdoor Signage"
                description="Choose the right material for your environment. Expert guidance from concept to installation for custom sign boards in Durban."
                canonicalUrl="/sign-boards"
            />
            <ServiceHero
                title="Custom Sign Boards"
                subtitle="Choose the right material for your environment. Expert guidance from concept to installation."
                imageSrc="/images/ads/sign-boards-hero.png"
                imageAlt="Professional custom sign board on a modern storefront at dusk"
                breadcrumbLabel="Sign Boards"
                primaryCTA={{ text: "Get Free Design & Quote", href: "/quote" }}
            />

            {/* Material Comparison Component */}
            <MaterialComparison />

            <section className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-blue-950 mb-4">Related Durban Signage Articles</h2>
                    <p className="text-gray-600 mb-8">
                        See how sign boards and vehicle branding work together to increase local visibility and organic enquiries.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link to="/blog/vehicle-branding-durban-vs-sign-boards-durban" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                            Vehicle Branding Durban vs Sign Boards Durban
                        </Link>
                        <Link to="/blog/ultimate-guide-vehicle-branding" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                            Vehicle Branding Guide
                        </Link>
                    </div>
                </div>
            </section>

            <FaqSection
                title="Sign Board FAQs"
                intro="Common questions about materials, turnaround, and installation."
                faqs={signBoardFaqs}
                className="py-20 bg-white border-t border-gray-200"
            />

            {/* CTA Section */}
            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Ready to Order Your Sign Board?
                    </h2>
                    <Link to="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Request a Quote
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
