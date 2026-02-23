import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Durban10Client } from "./Durban10Client";

const SITE_URL = "https://pro-graphics.co.za";
const PAGE_URL = `${SITE_URL}/durban-10`;
const OG_IMAGE_URL = `${SITE_URL}/images/og/durban-10-og.png`;

export const metadata: Metadata = {
    title: "The Durban 10 | 25% Off Vehicle Branding - Limited Founding Offer",
    description:
        "Be one of the first 10 Durban businesses to get 25% off premium vehicle branding. Only 4 founding spots remain. Free design mockup included. Claim yours before they're gone.",
    keywords: [
        "vehicle branding Durban",
        "car wrapping Durban",
        "vehicle wrap discount",
        "fleet branding South Africa",
        "vehicle graphics Durban",
        "Pro Graphics Durban",
        "25% off vehicle branding",
        "Durban 10 founding offer",
        "mobile billboard Durban",
        "3M vehicle wrap",
        "commercial vehicle branding",
        "bakkie branding Durban",
        "van branding Durban",
    ],
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "The Durban 10 | 25% Off Vehicle Branding — Only 4 Spots Left",
        description:
            "Be one of the first 10 Durban businesses to get 25% off premium vehicle branding with 3M materials. Free design mockup included. Limited founding spots available — claim yours now.",
        url: PAGE_URL,
        siteName: "Pro Graphics",
        type: "website",
        locale: "en_ZA",
        images: [
            {
                url: OG_IMAGE_URL,
                width: 1200,
                height: 630,
                alt: "The Durban 10 — 25% Off Premium Vehicle Branding | Pro Graphics",
                type: "image/png",
            },
            {
                url: `${SITE_URL}/images/ads/vehicle-branding.jpeg`,
                width: 1200,
                height: 630,
                alt: "Professional Vehicle Branding by Pro Graphics Durban",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "The Durban 10 | 25% Off Vehicle Branding — Only 4 Spots Left",
        description:
            "Be one of the first 10 Durban businesses to get 25% off premium vehicle branding. Free design mockup. 3M materials. Limited founding spots.",
        images: [OG_IMAGE_URL],
        creator: "@ProGraphicsDBN",
    },
    robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
    },
    other: {
        "og:price:amount": "25",
        "og:price:currency": "ZAR",
    },
};

// JSON-LD Structured Data for rich search results
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "The Durban 10 — 25% Off Vehicle Branding",
    description:
        "Be one of the first 10 Durban businesses to get 25% off premium vehicle branding with 3M materials. Includes free design mockup. Limited founding spots available.",
    url: PAGE_URL,
    image: OG_IMAGE_URL,
    priceCurrency: "ZAR",
    availability: "https://schema.org/LimitedAvailability",
    validFrom: "2026-02-01",
    offeredBy: {
        "@type": "LocalBusiness",
        name: "Pro Graphics",
        url: SITE_URL,
        telephone: "+27315086700",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Durban",
            addressRegion: "KwaZulu-Natal",
            addressCountry: "ZA",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "-29.8587",
            longitude: "31.0218",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "47",
            bestRating: "5",
        },
    },
    itemOffered: {
        "@type": "Service",
        name: "Premium Vehicle Branding",
        description:
            "Full and partial vehicle wraps, spot graphics, and fleet branding using 3M and Avery Dennison vinyl materials.",
        provider: {
            "@type": "LocalBusiness",
            name: "Pro Graphics",
        },
        areaServed: {
            "@type": "City",
            name: "Durban",
        },
    },
};

export default function Durban10Page() {
    return (
        <main className="min-h-screen bg-blue-950 text-white">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/ads/vehicle-branding.jpeg"
                        alt="Professional Vehicle Branding by Pro Graphics Durban"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-950/80 to-blue-950"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-5xl">
                    {/* Scarcity Badge */}
                    <div className="inline-flex items-center gap-2 bg-amber-500 text-blue-950 px-5 py-2.5 rounded-full mb-8 shadow-[0_0_30px_rgba(245,158,11,0.5)] border-2 border-white/20">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-blue-950 animate-ping"></span>
                        <span className="font-black uppercase tracking-widest text-xs md:text-sm">
                            LIMITED OFFER: ONLY 4 FOUNDING SPOTS LEFT
                        </span>
                    </div>

                    {/* Logo */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8">
                        <Image
                            src="/images/content/logo.png"
                            alt="Pro Graphics Logo"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight">
                        THE DURBAN{" "}
                        <span className="text-amber-500 block md:inline">10</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto mb-4 leading-relaxed">
                        Be one of the <strong className="text-white font-bold">first 10 businesses</strong> in Durban to get
                        premium vehicle branding at a{" "}
                        <strong className="text-amber-400 font-black text-2xl md:text-3xl">25% founding discount.</strong>
                    </p>

                    <p className="text-blue-300 text-lg mb-10 italic">
                        Once the spots are filled, this offer is gone forever.
                    </p>

                    {/* Primary CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link href="#claim-spot">
                            <button className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black py-5 px-12 rounded-full text-xl transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] active:scale-95 uppercase tracking-widest shadow-2xl border-b-4 border-amber-700 min-w-[280px]">
                                🚀 CLAIM MY SPOT
                            </button>
                        </Link>
                        <a href="tel:0315086700">
                            <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-blue-950 font-bold py-5 px-12 rounded-full text-xl transition-all hover:scale-105 min-w-[280px]">
                                📞 Call 031 508 6700
                            </button>
                        </a>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="animate-bounce text-blue-300">
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* What You Get Section */}
            <section className="py-20 bg-white text-blue-950">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            What You Get as a{" "}
                            <span className="text-amber-500">Founding Member</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            This isn't just a discount — it's a premium partnership at an unbeatable price.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Benefit 1 */}
                        <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-amber-400 transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="text-5xl mb-4">💰</div>
                            <h3 className="text-2xl font-black mb-3">25% Off Your Order</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Save thousands of Rands on premium vehicle branding. Full wraps, partial wraps, or spot graphics — all at founding member pricing.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-amber-400 transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="text-5xl mb-4">🎨</div>
                            <h3 className="text-2xl font-black mb-3">Free Design Mockup</h3>
                            <p className="text-gray-600 leading-relaxed">
                                See exactly what your branded vehicle will look like before you commit. Our designers create a custom visual mockup — completely free.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-amber-400 transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="text-5xl mb-4">💎</div>
                            <h3 className="text-2xl font-black mb-3">Premium 3M Materials</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We only use industry-leading 3M and Avery Dennison vinyl. No cheap alternatives. Your branding lasts 5+ years, even in Durban's sun.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROI / Why It Matters */}
            <section className="py-20 bg-blue-900 text-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                                Your Vehicle is a{" "}
                                <span className="text-amber-400">Mobile Billboard</span>
                            </h2>
                            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                A single branded vehicle generates <strong className="text-white">30,000 to 70,000 impressions per day</strong>.
                                That's more eyeballs than a billboard — at a fraction of the cost.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-amber-500 text-2xl mt-0.5">✓</span>
                                    <p className="text-lg"><strong>R0.04 per impression</strong> — cheaper than any digital ad</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-amber-500 text-2xl mt-0.5">✓</span>
                                    <p className="text-lg"><strong>24/7 advertising</strong> — works even when parked</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-amber-500 text-2xl mt-0.5">✓</span>
                                    <p className="text-lg"><strong>97% recall rate</strong> — people remember mobile ads</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-amber-500 text-2xl mt-0.5">✓</span>
                                    <p className="text-lg"><strong>Builds instant credibility</strong> — branded = professional</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-500/30">
                            <Image
                                src="/images/ads/full-vehicle-wraps.jpeg"
                                alt="Full Vehicle Wrap by Pro Graphics Durban"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white text-blue-950">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
                        Claim Your Spot in{" "}
                        <span className="text-amber-500">3 Simple Steps</span>
                    </h2>

                    <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-16 h-16 bg-amber-500 text-blue-950 rounded-full flex items-center justify-center font-black text-2xl shadow-lg">
                                1
                            </div>
                            <div>
                                <h3 className="text-2xl font-black mb-2">Submit Your Details</h3>
                                <p className="text-gray-600 text-lg">Fill out the quick form below with your name, business, and vehicle type. Takes 30 seconds.</p>
                            </div>
                        </div>

                        <div className="w-0.5 h-8 bg-amber-500 ml-8"></div>

                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-16 h-16 bg-amber-500 text-blue-950 rounded-full flex items-center justify-center font-black text-2xl shadow-lg">
                                2
                            </div>
                            <div>
                                <h3 className="text-2xl font-black mb-2">Get Your Free Mockup + Quote</h3>
                                <p className="text-gray-600 text-lg">We'll design a custom mockup of your branded vehicle and send a detailed quote within 24 hours — with 25% already applied.</p>
                            </div>
                        </div>

                        <div className="w-0.5 h-8 bg-amber-500 ml-8"></div>

                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-16 h-16 bg-amber-500 text-blue-950 rounded-full flex items-center justify-center font-black text-2xl shadow-lg">
                                3
                            </div>
                            <div>
                                <h3 className="text-2xl font-black mb-2">Lock In Your Founding Spot</h3>
                                <p className="text-gray-600 text-lg">Approve the design, pay a small deposit, and your founding member discount is locked. We handle all scheduling and installation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spots Remaining + Form Section */}
            <Durban10Client />

            {/* Trust Section */}
            <section className="py-16 bg-white text-blue-950">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-black text-amber-500 mb-1">10+</div>
                            <div className="text-sm uppercase tracking-widest text-gray-500 font-bold">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black text-amber-500 mb-1">24hr</div>
                            <div className="text-sm uppercase tracking-widest text-gray-500 font-bold">Quote Response</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black text-amber-500 mb-1">100%</div>
                            <div className="text-sm uppercase tracking-widest text-gray-500 font-bold">Satisfaction</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black text-amber-500 mb-1">4.8★</div>
                            <div className="text-sm uppercase tracking-widest text-gray-500 font-bold">Google Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-blue-950 text-white border-t-4 border-amber-500">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-black mb-6">
                        Don't Miss Out.{" "}
                        <span className="text-amber-500 block mt-2">Only 4 Spots Remain.</span>
                    </h2>
                    <p className="text-xl text-blue-200 mb-10">
                        Once the founding 10 spots are filled, this 25% discount disappears forever.
                        Your competitors are already looking at this page.
                    </p>
                    <Link href="#claim-spot">
                        <button className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black py-5 px-16 rounded-full text-xl transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] active:scale-95 uppercase tracking-widest shadow-2xl border-b-4 border-amber-700">
                            🚀 CLAIM MY FOUNDING SPOT
                        </button>
                    </Link>
                    <p className="mt-6 text-blue-400 text-sm">
                        Or call us directly at <a href="tel:0315086700" className="text-amber-400 font-bold hover:text-white transition-colors">031 508 6700</a>
                    </p>
                </div>
            </section>
        </main>
    );
}
