import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Case Studies Durban | Vehicle Branding & Signage Results',
    description: 'Durban case studies showing real outcomes from vehicle branding and signage projects completed by Pro Graphics.',
    alternates: {
        canonical: '/case-studies',
    },
};

const studies = [
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
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center flex flex-wrap justify-center gap-4">
                    <Link href="/vehicle-branding" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                        Vehicle Branding Durban
                    </Link>
                    <Link href="/sign-boards" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                        Sign Boards Durban
                    </Link>
                    <Link href="/quote" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                        Request a Quote
                    </Link>
                </div>
            </section>
        </main>
    );
}
