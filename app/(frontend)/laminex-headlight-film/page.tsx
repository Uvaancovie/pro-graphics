import { Metadata } from "next";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Lamin-X Headlight Film | Pro Graphics - Headlight Protection & Tint",
    description:
        "Lamin-X headlight film installation for impact resistance, UV protection, and custom tint styling. Protect and refresh your headlights.",
};

export default function LaminexHeadlightFilmPage() {
    return (
        <main className="min-h-screen">
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/testimonials/laminex-headlight-film.jpg"
                        alt="Lamin-X Headlight Film"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-950/75 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        Lamin-X Headlight Film <span className="text-amber-400">Protection</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Protect headlights from chips and fading while giving your vehicle a clean, custom look.
                    </p>
                    <Link href="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-12 py-8 text-xl shadow-2xl border-none">
                            Get a Headlight Film Quote
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Impact Resistance</h3>
                            <p className="text-gray-600">Helps reduce damage from road debris, stone chips, and everyday driving hazards.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">UV Defense</h3>
                            <p className="text-gray-600">Protects lens clarity by limiting UV-driven yellowing and long-term haze buildup.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Style Options</h3>
                            <p className="text-gray-600">Available in clear and tinted options to match your preferred vehicle aesthetic.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Ready to Protect Your Headlights?
                    </h2>
                    <Link href="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Book Your Install
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
