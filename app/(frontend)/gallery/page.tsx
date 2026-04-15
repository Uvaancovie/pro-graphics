import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { GalleryGrid } from "@/app/components/gallery/GalleryGrid";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Our Work Gallery | Pro Graphics - Vehicle Branding & Signage Portfolio",
    description: "Browse our portfolio of vehicle branding, custom signage, vehicle wraps, and shop front branding projects in Durban.",
};

// Static fallback images if no database images exist
const fallbackImages = [
    { src: "/images/ads/AD-1.png", category: "Ads" as const },
    { src: "/images/ads/AD-3.png", category: "Ads" as const },
    { src: "/images/ads/AD-4.png", category: "Ads" as const },
    { src: "/images/ads/AD-5.png", category: "Ads" as const },
    { src: "/images/ads/AD-6.png", category: "Ads" as const },
    { src: "/images/ads/vehicle-branding.jpeg", category: "Ads" as const },
    { src: "/images/ads/full-vehicle-wraps.jpeg", category: "Ads" as const },
    { src: "/images/ads/custom-sign-boards.jpeg", category: "Ads" as const },
    { src: "/images/ads/contravisions.jpeg", category: "Ads" as const },
    { src: "/images/ads/custom-cutout-stickers.jpeg", category: "Ads" as const },
    { src: "/images/ads/shop-front-office-branding.jpeg", category: "Ads" as const },
    ...Array.from({ length: 13 }, (_, i) => ({ src: `/images/content/${i + 1}.jpeg`, category: "Portfolio" as const })),
    { src: "/images/client/client-1.jpg", category: "Portfolio" as const },
    { src: "/images/client/client-2.png", category: "Portfolio" as const },
    { src: "/testimonials/black-roof-wraps.jpg", category: "Testimonials" as const },
    { src: "/testimonials/custom-canvas.jpg", category: "Testimonials" as const },
    { src: "/testimonials/custom-wallpaper.jpg", category: "Testimonials" as const },
    { src: "/testimonials/laminex-headlight-film.jpg", category: "Testimonials" as const },
];

// Map database categories to frontend display categories
function mapCategory(dbCategory: string): "Ads" | "Portfolio" | "Testimonials" {
    switch (dbCategory) {
        case 'promotional':
            return 'Ads';
        case 'vehicle-branding':
        case 'sign-boards':
        case 'contravisions':
        case 'stickers':
        default:
            return 'Portfolio';
    }
}

async function getGalleryImages() {
    try {
        const supabase = createSupabaseServiceClient();
        const { data: images, error } = await supabase
            .from('gallery')
            .select('*')
            .eq('is_visible', true)
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('Error fetching gallery:', error);
            return fallbackImages;
        }

        if (!images || images.length === 0) {
            return fallbackImages;
        }

        // Map database images to gallery items
        return images.map((img) => ({
            src: img.image_url,
            category: mapCategory(img.category),
            title: img.title,
            alt: img.alt_text || img.title || 'Gallery image',
        }));
    } catch (error) {
        console.error('Error loading gallery:', error);
        return fallbackImages;
    }
}

export default async function GalleryPage() {
    const galleryItems = await getGalleryImages();

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
                        Browse our ad creatives, installs, and client branding projects across vehicles, signage, wallpaper, and custom print.
                    </p>
                </div>
            </section>

            {/* Interactive Gallery Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <GalleryGrid items={galleryItems} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8">Liked What You Saw?</h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/quote">
                            <Button size="lg" className="text-xl px-12 py-6 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-xl border-none">
                                Get Free Quote
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
