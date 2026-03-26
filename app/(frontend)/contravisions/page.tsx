import { Metadata } from "next";
import { BeforeAfterSlider } from "@/app/components/contravisions/BeforeAfterSlider";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Contravision Window Graphics | Pro Graphics - See-Through Advertising",
    description:
        "One-way vision window graphics for storefronts and vehicles. Advertise outside while maintaining visibility from inside. UV resistant and weatherproof.",
};

export default function ContravisionsPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/ads/contravisions.jpeg" // Make sure this image exists or fallback
                        alt="Contravision Window Graphics"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        Advertise Outside,{" "}
                        <span className="text-amber-400">See Through Inside</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Contravision window graphics - the perfect solution for storefronts and vehicle windows.
                    </p>
                    <Link href="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-12 py-8 text-xl shadow-2xl border-none">
                            Get Free Sample & Quote
                        </Button>
                    </Link>
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
                            { icon: "🏪", title: "Storefronts", desc: "Turn windows into advertising space" },
                            { icon: "🚗", title: "Vehicle Windows", desc: "Rear window branding with visibility" },
                            { icon: "🏢", title: "Office Partitions", desc: "Privacy with natural light" },
                            { icon: "🚌", title: "Fleet Graphics", desc: "Bus and taxi advertising" },
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
                                            <span className="text-green-500">✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/quote" className="block w-full py-3 text-center rounded-xl bg-gray-50 text-blue-900 font-bold hover:bg-blue-950 hover:text-white transition-colors">
                                    Get Estimate
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Experience the Magic of Contravision
                    </h2>
                    <Link href="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Get Your Free Quote
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
