import { Metadata } from "next";
export const revalidate = 0;
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { GalleryGrid } from "@/app/components/gallery/GalleryGrid";
import { createSupabasePublicClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Our Work Gallery | Pro Graphics - Vehicle Branding & Signage Portfolio",
    description: "Browse our portfolio of vehicle branding, custom signage, vehicle wraps, and shop front branding projects in Durban.",
};

async function getGalleryImages() {
    try {
        const supabase = createSupabasePublicClient();
        const { data: images, error } = await supabase
            .from('gallery')
            .select('*')
            .eq('is_visible', true)
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('Error fetching gallery:', error);
            return [];
        }

        if (!images || images.length === 0) {
            return [];
        }

        // Use database categories directly
        return images.map((img) => ({
            src: img.image_url,
            category: img.category,
            title: img.title,
            alt: img.alt_text || img.title || 'Gallery image',
        }));
    } catch (error) {
        console.error('Error loading gallery:', error);
        return [];
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
                    {galleryItems.length > 0 ? (
                        <GalleryGrid items={galleryItems} />
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">
                                No gallery images yet. Images added in the admin panel will appear here.
                            </p>
                        </div>
                    )}
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
