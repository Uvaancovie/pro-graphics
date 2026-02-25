import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PriceBeatClient } from "./PriceBeatClient";

const SITE_URL = "https://pro-graphics.co.za";
const PAGE_URL = `${SITE_URL}/price-beat`;
const OG_IMAGE_URL = `${SITE_URL}/images/ads/vehicle-branding.jpeg`;

export const metadata: Metadata = {
    title: "Price Beat Guarantee - We'll Beat Any Quote by 10% | Pro Graphics",
    description:
        "Bring a verified written quote for vehicle branding, and we will better it by 10%. Don't overpay for premium quality vehicle wraps and branding in Durban.",
    keywords: [
        "price beat guarantee",
        "vehicle branding Durban",
        "car wrapping Durban",
        "vehicle wrap discount",
        "fleet branding South Africa",
        "vehicle graphics Durban",
        "Pro Graphics Durban",
        "beat any quote",
        "commercial vehicle branding",
    ],
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "Price Beat Guarantee - We'll Beat Any Quote by 10%",
        description:
            "Bring a verified written quote for vehicle branding, and we will better it by 10%. Don't overpay for premium quality.",
        url: PAGE_URL,
        siteName: "Pro Graphics",
        type: "website",
        locale: "en_ZA",
        images: [
            {
                url: OG_IMAGE_URL,
                width: 1200,
                height: 630,
                alt: "Price Beat Guarantee | Pro Graphics",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Price Beat Guarantee - We'll Beat Any Quote by 10%",
        description:
            "Bring a verified written quote for vehicle branding, and we will better it by 10%. Don't overpay for premium quality.",
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
};

export default function PriceBeatPage() {
    return (
        <main className="min-h-screen bg-blue-950 text-white">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/ads/vehicle-branding.jpeg"
                        alt="Professional Vehicle Branding by Pro Graphics"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-950/80 to-blue-950"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-5xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-amber-500 text-blue-950 px-5 py-2.5 rounded-full mb-8 shadow-[0_0_30px_rgba(245,158,11,0.5)] border-2 border-white/20">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-blue-950 animate-ping"></span>
                        <span className="font-black uppercase tracking-widest text-xs md:text-sm">
                            PRICE BEAT GUARANTEE: WE'LL BEAT ANY QUOTE BY 10%
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
                        PRICE BEAT{" "}
                        <span className="text-amber-500 block md:inline">GUARANTEE</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto mb-4 leading-relaxed">
                        Have a verified quote for vehicle branding? Send it to us, and we will{" "}
                        <strong className="text-amber-400 font-black text-2xl md:text-3xl">better it by 10%.</strong>
                    </p>

                    <p className="text-blue-300 text-lg mb-10 italic">
                        Premium materials. Professional installation. Better price.
                    </p>

                    {/* Primary CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link href="#claim-spot">
                            <button className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black py-5 px-12 rounded-full text-xl transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] active:scale-95 uppercase tracking-widest shadow-2xl border-b-4 border-amber-700 min-w-[280px]">
                                🚀 CLAIM GUARANTEE
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

            {/* Why Us Section */}
            <section className="py-20 bg-white text-blue-950">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            Why Overpay for{" "}
                            <span className="text-amber-500">Premium Quality?</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Don't compromise on quality to save money. Get the best of both worlds.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-amber-400 transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="text-5xl mb-4">💰</div>
                            <h3 className="text-2xl font-black mb-3">Save 10% Guaranteed</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Provide us with a verified written quote from another reputable signage company, and we'll apply a direct 10% discount on their total price.
                            </p>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-amber-400 transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="text-5xl mb-4">🎨</div>
                            <h3 className="text-2xl font-black mb-3">Free Design Mockup</h3>
                            <p className="text-gray-600 leading-relaxed">
                                See exactly what your branded vehicle will look like before you commit. Our designers create a custom visual mockup — completely free.
                            </p>
                        </div>

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

            {/* How It Works */}
            <section className="py-20 bg-blue-900 text-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
                        Claim Your Discount in{" "}
                        <span className="text-amber-500">3 Simple Steps</span>
                    </h2>

                    <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-16 h-16 bg-amber-500 text-blue-950 rounded-full flex items-center justify-center font-black text-2xl shadow-lg">
                                1
                            </div>
                            <div>
                                <h3 className="text-2xl font-black mb-2">Upload Your Quote</h3>
                                <p className="text-blue-100 text-lg">Use the form below to submit your details and attach a verified written quote from a competitor.</p>
                            </div>
                        </div>

                        <div className="w-0.5 h-8 bg-amber-500 ml-8"></div>

                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-16 h-16 bg-amber-500 text-blue-950 rounded-full flex items-center justify-center font-black text-2xl shadow-lg">
                                2
                            </div>
                            <div>
                                <h3 className="text-2xl font-black mb-2">We Verify & Beat It</h3>
                                <p className="text-blue-100 text-lg">We review the quote to ensure equal material specifications, and instantly send you a new quote exactly 10% cheaper.</p>
                            </div>
                        </div>

                        <div className="w-0.5 h-8 bg-amber-500 ml-8"></div>

                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-16 h-16 bg-amber-500 text-blue-950 rounded-full flex items-center justify-center font-black text-2xl shadow-lg">
                                3
                            </div>
                            <div>
                                <h3 className="text-2xl font-black mb-2">Get Premium Branding</h3>
                                <p className="text-blue-100 text-lg">Approve our proposal, get your free design mockup, and let us transform your vehicle at the lowest price.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <PriceBeatClient />

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
        </main>
    );
}
