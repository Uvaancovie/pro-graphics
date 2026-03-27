import { Metadata } from "next";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Custom Wallpaper | Pro Graphics - Branded Wall Graphics & Installation",
    description:
        "Custom wallpaper and wall graphics for offices, retail stores, and feature walls. Designed for visual impact and long-lasting performance.",
};

export default function CustomWallpaperPage() {
    return (
        <main className="min-h-screen">
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/testimonials/custom-wallpaper.jpg"
                        alt="Custom Wallpaper"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-950/75 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        Custom Wallpaper for <span className="text-amber-400">Branded Spaces</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Transform plain walls into immersive brand environments with custom printed wallpaper.
                    </p>
                    <Link href="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-12 py-8 text-xl shadow-2xl border-none">
                            Get a Wallpaper Quote
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Office & Retail Ready</h3>
                            <p className="text-gray-600">Ideal for receptions, showrooms, office corridors, and customer-facing interiors.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Custom Design Support</h3>
                            <p className="text-gray-600">We can print supplied artwork or help adapt your visuals to fit the wall perfectly.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Pro Installation</h3>
                            <p className="text-gray-600">Professional application for neat seams, smooth surfaces, and long-lasting finish.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Ready to Transform Your Walls?
                    </h2>
                    <Link href="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Start Your Wallpaper Project
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
