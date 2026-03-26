import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { GalleryGrid } from "@/app/components/gallery/GalleryGrid";

export const metadata: Metadata = {
    title: "Our Work Gallery | Pro Graphics - Vehicle Branding & Signage Portfolio",
    description: "Browse our portfolio of vehicle branding, custom signage, vehicle wraps, and shop front branding projects in Durban.",
};

const galleryImages = Array.from({ length: 13 }, (_, i) => `/images/content/${i + 1}.jpeg`);

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <section className="bg-blue-950 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Our Work <span className="text-amber-400">Gallery</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
                        See the quality we deliver. From massive fleet wraps to precise custom stickers.
                    </p>
                </div>
            </section>

            {/* Interactive Gallery Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <GalleryGrid images={galleryImages} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8">Liked What You Saw?</h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/quote">
                            <Button size="lg" className="text-xl px-12 py-6 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-xl border-none">
                                🚀 Get Free Quote
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
