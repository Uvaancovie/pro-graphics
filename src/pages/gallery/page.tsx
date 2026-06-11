import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getGalleryImages } from "@/lib/cms";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGalleryImages().then((images) => {
      setGalleryItems(
        images.map((img) => ({
          src: img.image_url,
          category: img.category,
          title: img.title,
          alt: img.alt_text || img.title || "Gallery image",
        }))
      );
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-blue-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Our Work <span className="text-amber-400">Gallery</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
            Browse our ad creatives, installs, and client branding projects across vehicles, signage, wallpaper, and custom print.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Loading gallery...</p>
            </div>
          ) : galleryItems.length > 0 ? (
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
    </main>
  );
}
