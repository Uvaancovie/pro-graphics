import { Metadata } from "next";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Black Roof Wraps | Pro Graphics - Premium Roof Vinyl Finishes",
    description:
        "Premium black roof wraps in gloss, satin, or matte finishes. Professional installation and clean edge detailing for a factory-style look.",
};

export default function BlackRoofWrapsPage() {
    return (
        <main className="min-h-screen">
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/testimonials/black-roof-wraps.jpg"
                        alt="Black Roof Wraps"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-950/75 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        Black Roof Wraps, <span className="text-amber-400">Done Right</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Upgrade your vehicle with a premium black roof finish while protecting your original paint.
                    </p>
                    <Link href="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-12 py-8 text-xl shadow-2xl border-none">
                            Get a Roof Wrap Quote
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Premium Finishes</h3>
                            <p className="text-gray-600">Choose gloss, satin, or matte black vinyl to match your vehicle style.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Paint Protection</h3>
                            <p className="text-gray-600">Roof wraps help shield paint from UV exposure, oxidation, and minor surface wear.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Clean Detailing</h3>
                            <p className="text-gray-600">Precision installation with neat edge finishing for a factory-style appearance.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Ready for a Roof Wrap Upgrade?
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
