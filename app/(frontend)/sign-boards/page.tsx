import { Metadata } from "next";
import { MaterialComparison } from "@/app/components/sign-boards/MaterialComparison";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Custom Sign Boards | Pro Graphics - Chromadek, ABS & Perspex",
    description:
        "Professional sign boards in Chromadek (outdoor/rust-proof), ABS (indoor/budget), and Perspex (premium/gloss). Expert guidance on material selection.",
};

export default function SignBoardsPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/ads/custom-sign-boards.jpeg" // Verify this image exists
                        alt="Custom Sign Boards"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        Custom Sign Boards That{" "}
                        <span className="text-amber-400">Last</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Choose the right material for your environment. Expert guidance included.
                    </p>
                    <Link href="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-12 py-8 text-xl shadow-2xl border-none">
                            Get Free Design & Quote
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Material Comparison Component */}
            <MaterialComparison />

            {/* CTA Section */}
            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Ready to Order Your Sign Board?
                    </h2>
                    <Link href="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Request a Quote
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
