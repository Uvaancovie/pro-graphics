import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";

const studies = [
    {
        title: 'NeuroWave Boat Branding — Marine Vinyl Wrap',
        area: 'Durban',
        challenge: 'Distinctive marine wrap needed to reflect the NeuroWave brand while remaining durable in harsh coastal conditions.',
        solution: 'Premium marine-grade vinyl wrap with UV-resistant printing, protective overlaminate, and precision installation.',
        result: 'A bold, professional marine wrap that transforms the vessel into a highly visible floating advertisement while protecting the original paintwork.',
        reviewer: 'Pro Graphics Team',
        slug: 'neuro-wave-boat-branding',
    },
    {
        title: 'Fleet Branding Rollout for Local Service Business',
        area: 'Phoenix & Durban CBD',
        challenge: 'Inconsistent branding across service vehicles reduced brand recognition.',
        solution: 'Standardized fleet wrap system with high-contrast design and contact-first layout.',
        result: 'Improved call recall and stronger trust perception from first-time customers.',
        reviewer: 'Operations Manager, Durban Service Company',
    },
    {
        title: 'Storefront Visibility Upgrade for Retail Unit',
        area: 'Umhlanga',
        challenge: 'Low street visibility and weak storefront messaging during peak traffic windows.',
        solution: 'New sign board system with legible hierarchy and location-relevant CTA messaging.',
        result: 'Increased walk-in enquiries and better brand visibility from main road traffic.',
        reviewer: 'Owner, Umhlanga Retail Business',
    },
];

export default function CaseStudiesPage() {
    const reviewSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Pro Graphics Case Studies',
        url: 'https://pro-graphics.co.za/case-studies',
        hasPart: studies.map((study) => ({
            '@type': 'Review',
            itemReviewed: {
                '@type': 'Service',
                name: study.title,
            },
            reviewBody: `${study.challenge} ${study.solution} ${study.result}`,
            author: {
                '@type': 'Person',
                name: study.reviewer,
            },
            reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
            },
        })),
    };

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Seo
                title="Case Studies | Pro Graphics Durban"
                description="Real project snapshots showing how better branding and signage support local lead generation."
                canonicalUrl="/case-studies"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
            />

            <section className="container mx-auto px-4 max-w-5xl">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">Durban Case Studies</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Real project snapshots showing how better branding and signage support local lead generation.
                    </p>
                </header>

                <div className="grid gap-8">
                    {studies.map((study) => (
                        <article key={study.title} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                            <p className="text-sm font-semibold text-amber-700 uppercase tracking-wider mb-2">{study.area}</p>
                            <h2 className="text-2xl font-bold text-blue-950 mb-4">{study.title}</h2>
                            <div className="space-y-3 text-gray-700 leading-relaxed">
                                <p><span className="font-semibold text-blue-950">Challenge:</span> {study.challenge}</p>
                                <p><span className="font-semibold text-blue-950">Solution:</span> {study.solution}</p>
                                <p><span className="font-semibold text-blue-950">Result:</span> {study.result}</p>
                                <p className="text-sm text-gray-500 pt-2">Reviewed by: {study.reviewer}</p>
                            </div>
                            {study.slug && (
                                <div className="mt-6">
                                    <Link
                                        to={`/case-studies/${study.slug}`}
                                        className="inline-flex items-center gap-2 text-blue-900 font-semibold hover:text-amber-600 transition-colors"
                                    >
                                        Read Full Case Study
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            )}
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
                    <Link to="/vehicle-branding" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                        Vehicle Branding Durban
                    </Link>
                    <Link to="/sign-boards" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                        Sign Boards Durban
                    </Link>
                    <Link to="/quote" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                        Request a Quote
                    </Link>
                </div>
            </section>
        </main>
    );
}
