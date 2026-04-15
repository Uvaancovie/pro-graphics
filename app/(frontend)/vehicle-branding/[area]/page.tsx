import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/app/components/ui/Button';
import { FaqSection } from '@/app/components/ui/FaqSection';

const areaContent = {
    umhlanga: {
        name: 'Umhlanga',
        title: 'Vehicle Branding Umhlanga | Fleet Wraps & Graphics',
        description: 'Vehicle branding in Umhlanga for local businesses and fleets. Professional wraps, decals, and branded graphics installed by Pro Graphics.',
    },
    pinetown: {
        name: 'Pinetown',
        title: 'Vehicle Branding Pinetown | Fleet Wraps & Graphics',
        description: 'Vehicle branding in Pinetown with durable wraps and decals for delivery vans, service vehicles, and growing business fleets.',
    },
    phoenix: {
        name: 'Phoenix',
        title: 'Vehicle Branding Phoenix Durban | Fleet Wraps & Graphics',
        description: 'Vehicle branding in Phoenix Durban for businesses that need high-impact on-road visibility and consistent fleet branding.',
    },
    'durban-cbd': {
        name: 'Durban CBD',
        title: 'Vehicle Branding Durban CBD | Fleet Wraps & Graphics',
        description: 'Vehicle branding in Durban CBD for high-traffic routes and stronger local brand recall with custom wrap packages.',
    },
} as const;

type AreaSlug = keyof typeof areaContent;

export function generateStaticParams() {
    return Object.keys(areaContent).map((area) => ({ area }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
    const { area } = await params;
    const areaData = areaContent[area as AreaSlug];

    if (!areaData) {
        return { title: 'Area Not Found' };
    }

    return {
        title: areaData.title,
        description: areaData.description,
        alternates: {
            canonical: `/vehicle-branding/${area}`,
        },
        openGraph: {
            title: areaData.title,
            description: areaData.description,
            url: `https://pro-graphics.co.za/vehicle-branding/${area}`,
            type: 'website',
        },
    };
}

export default async function VehicleBrandingAreaPage({ params }: { params: Promise<{ area: string }> }) {
    const { area } = await params;
    const areaData = areaContent[area as AreaSlug];

    if (!areaData) {
        notFound();
    }

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: `Vehicle Branding ${areaData.name}`,
        areaServed: {
            '@type': 'City',
            name: areaData.name,
        },
        provider: {
            '@type': 'LocalBusiness',
            name: 'Pro Graphics',
            url: 'https://pro-graphics.co.za',
            telephone: '+27659424036',
        },
        url: `https://pro-graphics.co.za/vehicle-branding/${area}`,
        description: areaData.description,
    };

    const areaFaqs = [
        {
            question: `Do you provide vehicle branding in ${areaData.name}?`,
            answer: `Yes. We provide vehicle wraps, decals, and fleet branding services for businesses in ${areaData.name} and surrounding Durban areas.`,
        },
        {
            question: 'Can you handle multiple vehicles for one business?',
            answer: 'Yes. We support both single vehicles and multi-vehicle fleet projects with consistent branding guidelines.',
        },
        {
            question: 'How do I get started?',
            answer: 'Request a quote with your vehicle type and branding goals. We will recommend the best package and timeline.',
        },
    ];

    return (
        <main className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <section className="py-24 bg-blue-950 text-white border-b border-blue-900">
                <div className="container mx-auto px-4 max-w-5xl text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Vehicle Branding <span className="text-amber-400">{areaData.name}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                        Premium fleet wraps and branded vehicle graphics for businesses in {areaData.name}. Built for daily visibility and measurable lead generation.
                    </p>
                    <Link href="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-7 text-lg border-none">
                            Request a Quote
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-blue-950 mb-4">Why businesses in {areaData.name} choose Pro Graphics</h2>
                    <ul className="space-y-3 text-gray-700 leading-relaxed">
                        <li>Custom branding layouts for vans, bakkies, and company fleets.</li>
                        <li>Durable materials suited to Durban weather and road conditions.</li>
                        <li>Professional installation with a clean, consistent finish.</li>
                        <li>Clear package options aligned to growth stage and budget.</li>
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href="/vehicle-branding" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                            Main Vehicle Branding Service
                        </Link>
                        <Link href="/sign-boards" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                            Sign Boards Durban
                        </Link>
                        <Link href="/blog" className="text-blue-900 font-semibold hover:text-amber-600 transition-colors">
                            Durban Branding Blog
                        </Link>
                    </div>
                </div>
            </section>

            <FaqSection
                title={`Vehicle Branding ${areaData.name} FAQs`}
                intro={`Common questions from businesses in ${areaData.name}.`}
                faqs={areaFaqs}
                className="py-20 bg-gray-50 border-t border-gray-200"
            />
        </main>
    );
}
