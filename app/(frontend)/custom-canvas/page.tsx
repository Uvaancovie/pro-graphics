import { Metadata } from "next";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Custom Canvas Prints | Pro Graphics - Branded Wall Art & Displays",
    description:
        "Custom canvas printing for offices, retail spaces, and branded interiors. Crisp detail, strong color depth, and professional finishing.",
};

export default function CustomCanvasPage() {
    return (
        <main className="min-h-screen">
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/testimonials/custom-canvas.jpg"
                        alt="Custom Canvas Printing"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-950/75 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        Custom Canvas <span className="text-amber-400">That Stands Out</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Turn your visuals into premium statement pieces for offices, stores, and branded spaces.
                    </p>
                    <Link href="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-12 py-8 text-xl shadow-2xl border-none">
                            Get a Canvas Quote
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">High-Resolution Prints</h3>
                            <p className="text-gray-600">Sharp image reproduction with rich color consistency for brand-forward visuals.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Custom Sizing</h3>
                            <p className="text-gray-600">From small decorative panels to large feature pieces tailored to your wall space.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Professional Finishing</h3>
                            <p className="text-gray-600">Clean stretching and finishing that delivers a premium, gallery-ready presentation.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Ready to Print Your Canvas?
                    </h2>
                    <Link href="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Request Your Quote
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
