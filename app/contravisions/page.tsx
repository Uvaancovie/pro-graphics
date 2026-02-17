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
