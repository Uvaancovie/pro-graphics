import { BeforeAfterSlider } from "@/components/contravisions/BeforeAfterSlider";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { FaqSection } from "@/components/ui/FaqSection";

const contravisionFaqs = [
    {
        question: 'What is contravision used for?',
        answer: 'Contravision is used for one-way window branding so customers see your message outside while visibility from inside remains intact.',
    },
    {
        question: 'Is contravision suitable for vehicle rear windows?',
        answer: 'Yes. It is commonly installed on rear windows and storefront glass where advertising and privacy are both required.',
    },
    {
        question: 'How durable is one-way vision film?',
        answer: 'With quality print and lamination, contravision performs well in sun and rain and can last for years depending on exposure and care.',
    },
];



export default function ContravisionsPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <main className="min-h-screen">
            <Seo
                title="Contravision Durban | One-Way Window Vinyl Signs"
                description="Contravision window graphics - the perfect solution for storefronts and vehicle windows. One-way vision film for privacy and advertising."
                canonicalUrl="/contravisions"
            />
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/contravision-video/contravision.png"
                        alt="Contravision Window Graphics"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 drop-shadow-lg">
                        <a
                            href="https://prographics.co.za/contravisions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-400 transition-colors"
                        >
                            Contravisions
                        </a>{" "}
                        (Window Graphics){" "}
                        <span className="text-amber-400">| Pro Graphics</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Contravision window graphics - the perfect solution for storefronts and vehicle windows.
                    </p>
                    <Link to="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 text-base sm:text-lg md:text-xl shadow-2xl border-none">
                            Get Free Sample & Quote
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Video Showcase Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-blue-950 mb-4">
                            See{" "}
                            <a
                                href="https://prographics.co.za/contravisions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-500 hover:text-amber-600 transition-colors"
                            >
                                Contravision
                            </a>{" "}
                            in Action
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Watch how contravision transforms office windows into powerful branding space.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black group">
                            <video
                                ref={videoRef}
                                src="/contravision-video/OFFICE-BRANDING-CONTRAVISION.mp4"
                                className="w-full aspect-video object-cover"
                                playsInline
                                onEnded={() => setIsPlaying(false)}
                            />

                            {/* Play/Pause Overlay */}
                            <button
                                onClick={togglePlay}
                                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl hover:bg-white transition-colors">
                                    {isPlaying ? (
                                        <svg className="w-8 h-8 text-blue-950" fill="currentColor" viewBox="0 0 24 24">
                                            <rect x="6" y="4" width="4" height="16" rx="1" />
                                            <rect x="14" y="4" width="4" height="16" rx="1" />
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8 text-blue-950 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </div>
                            </button>

                            {/* Bottom Controls */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={togglePlay}
                                    className="text-white text-sm font-medium flex items-center gap-2"
                                >
                                    {isPlaying ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <rect x="6" y="4" width="4" height="16" rx="1" />
                                            <rect x="14" y="4" width="4" height="16" rx="1" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                    {isPlaying ? "Pause" : "Play"} Video
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-10">
                            {[
                                { label: "Office Branding", desc: "Turn glass partitions into brand statements" },
                                { label: "Storefronts", desc: "Advertise 24/7 without losing natural light" },
                                { label: "Privacy", desc: "One-way vision for discretion and style" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                                    <h4 className="font-bold text-blue-950 mb-1">{item.label}</h4>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Before/After Slider Component */}
            <BeforeAfterSlider />

            {/* Applications Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-blue-950 mb-4">
                            Perfect Applications
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Versatile solutions for business and privacy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            { icon: "S", title: "Storefronts", desc: "Turn windows into advertising space" },
                            { icon: "V", title: "Vehicle Windows", desc: "Rear window branding with visibility" },
                            { icon: "O", title: "Office Partitions", desc: "Privacy with natural light" },
                            { icon: "F", title: "Fleet Graphics", desc: "Bus and taxi advertising" },
                        ].map((app, i) => (
                            <div key={i} className="text-center p-8 bg-blue-50 rounded-2xl hover:bg-amber-50 transition-colors group">
                                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{app.icon}</div>
                                <h3 className="text-xl font-bold text-blue-950 mb-3">{app.title}</h3>
                                <p className="text-gray-600">{app.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value-Based Pricing Section */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-blue-950 mb-4">
                            Value-Based <span className="text-amber-500">Pricing Estimates</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Competitive rates based on vehicle size and coverage needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { title: "Standard Rear", price: "Entry Level", desc: "Rear window only", features: ["High Visibility", "Standard Vinyl", "1-Year Warranty"] },
                            { title: "Premium Rear", price: "Best Value", desc: "Full rear window coverage", features: ["HD Print Quality", "Premium Vinyl", "3-Year Warranty", "UV Protection"] },
                            { title: "Full Vehicle Kit", price: "Custom Quote", desc: "Side & Rear Windows", features: ["Complete Privacy", "Maximum Ad Space", "Professional Install", "Fleet Discounts"] },
                        ].map((tier, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group">
                                {i === 1 && (
                                    <div className="absolute top-0 right-0 bg-amber-400 text-blue-950 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        POPULAR
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-blue-950 mb-2">{tier.title}</h3>
                                <div className="text-3xl font-bold text-blue-600 mb-4 font-mono">{tier.price}</div>
                                <p className="text-gray-500 mb-6">{tier.desc}</p>
                                <ul className="space-y-2 mb-8">
                                    {tier.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                                            <span className="text-green-500">-</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/quote" className="block w-full py-3 text-center rounded-xl bg-gray-50 text-blue-900 font-bold hover:bg-blue-950 hover:text-white transition-colors">
                                    Get Estimate
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FaqSection
                title="Contravision FAQs"
                intro="Quick answers for storefront and vehicle one-way vision projects."
                faqs={contravisionFaqs}
                className="py-20 bg-white border-t border-gray-200"
            />

            {/* CTA */}
            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Experience the Magic of{" "}
                        <a
                            href="https://prographics.co.za/contravisions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-900 transition-colors"
                        >
                            Contravision
                        </a>
                    </h2>
                    <Link to="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Get Your Free Quote
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
