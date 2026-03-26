import { Metadata } from "next";
import { BulkPricingTable } from "@/app/components/stickers/BulkPricingTable";
import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Custom Cutout Stickers | Pro Graphics - Bulk Pricing & Fast Turnaround",
    description:
        "Die-cut custom stickers with transparent bulk pricing. UV-resistant, weatherproof vinyl. Order from 50 to 1000+ units. 3-5 day turnaround.",
};

export default function CustomStickersPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/ads/custom-cutout-stickers.jpeg"
                        alt="Custom Die-Cut Stickers"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                        Custom Stickers,{" "}
                        <span className="text-amber-400">Cut to Perfection</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Die-cut to your exact shape. Transparent bulk pricing. Fast turnaround.
                    </p>
                    <Link href="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-12 py-8 text-xl shadow-2xl border-none">
                            Get Instant Quote
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Bulk Pricing Table Component */}
            <BulkPricingTable />

            {/* CTA */}
            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Ready to Order Your Custom Stickers?
                    </h2>
                    <Link href="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Place Your Order Now
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
