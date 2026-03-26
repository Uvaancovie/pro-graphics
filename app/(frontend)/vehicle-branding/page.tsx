import { Metadata } from "next";
import { PricingMatrix } from "@/app/components/vehicle-branding/PricingMatrix";
import { VehicleCareGuide } from "@/app/components/vehicle-branding/VehicleCareGuide";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Vehicle Branding & Wraps | Pro Graphics - Transform Your Fleet into Mobile Billboards",
    description:
        "Professional vehicle wraps, partial wraps, and spot graphics in South Africa. Get 30,000-70,000 daily impressions. Free design mockup. 7-10 year durability. Expert installation.",
    keywords:
        "vehicle wraps, car branding, fleet graphics, mobile advertising, vehicle signage, South Africa",
};

export default function VehicleBrandingPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/ads/vehicle-branding.jpeg"
                        alt="Professional Vehicle Branding"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        Mobile Billboards That{" "}
                        <span className="text-amber-400">Work 24/7</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Turn your fleet into your most powerful marketing asset. From simple decals to full color change wraps.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/quote">
                            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-12 py-8 text-xl shadow-2xl border-none">
                                Get a Quote
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-12 py-8 text-xl font-bold bg-transparent">
                            View Gallery
                        </Button>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-blue-950 mb-4">
                            Why Invest in Vehicle Branding?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            One-time cost, years of exposure. The highest ROI of any outdoor advertising medium.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <div className="text-center group p-6 rounded-2xl hover:bg-blue-50 transition-colors">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:bg-blue-200 group-hover:scale-110 transition-all">
                                <span className="text-4xl">👁️</span>
                            </div>
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">High Visibility</h3>
                            <p className="text-gray-600">
                                Generate 30,000 - 70,000 daily impressions in busy traffic.
                            </p>
                        </div>

                        <div className="text-center group p-6 rounded-2xl hover:bg-amber-50 transition-colors">
                            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600 group-hover:bg-amber-200 group-hover:scale-110 transition-all">
                                <span className="text-4xl">🛡️</span>
                            </div>
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Paint Protection</h3>
                            <p className="text-gray-600">
                                Wraps shield your paint from UV damage, scratches, and environmental wear.
                            </p>
                        </div>

                        <div className="text-center group p-6 rounded-2xl hover:bg-blue-50 transition-colors">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:bg-blue-200 group-hover:scale-110 transition-all">
                                <span className="text-4xl">💰</span>
                            </div>
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Cost Effective</h3>
                            <p className="text-gray-600">
                                One-time cost for 5+ years of advertising. Lower CPM than radio or billboards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Matrix */}
            <section className="py-24 bg-gray-50 border-t border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-blue-950 mb-4">
                            Transparent <span className="text-amber-500">Pricing Packages</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Choose the coverage level that fits your budget and goals.
                        </p>
                    </div>
                    <PricingMatrix />
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-blue-950 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">
                            Our <span className="text-amber-400">4-Step Process</span>
                        </h2>
                        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                            From concept to completion in less than a week.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Consultation",
                                desc: "We discuss your goals and vehicle type.",
                            },
                            {
                                step: "02",
                                title: "Design",
                                desc: "Our team creates a custom mockup for your approval.",
                            },
                            {
                                step: "03",
                                title: "Print",
                                desc: "High-resolution printing on premium vinyl.",
                            },
                            {
                                step: "04",
                                title: "Install",
                                desc: "Professional application in our dust-free bay.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="relative p-8 border border-blue-800 rounded-2xl bg-blue-900/50 hover:bg-blue-800 transition-colors group">
                                <div className="text-6xl font-bold text-blue-800 absolute -top-6 -right-4 opacity-50 select-none group-hover:text-amber-500/20 transition-colors">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-amber-400">{item.title}</h3>
                                <p className="text-blue-100 leading-relaxed font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vehicle Care Guide */}
            <VehicleCareGuide />

            {/* Call to Action */}
            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Ready to Brand Your Fleet?
                    </h2>
                    <Link href="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Start Your Project
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
