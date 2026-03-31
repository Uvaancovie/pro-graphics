import Link from "next/link";
import Image from "next/image";

// In a real app, you would fetch this from Supabase
const dummyProducts = [
  {
    id: "1",
    title: "Durban Skyline Abstract",
    slug: "durban-skyline-abstract",
    imageUrl: "/images/ads/custom-sign-boards.jpeg", // Placeholder
    description: "A beautiful abstract depiction of the Durban skyline.",
    priceFrom: 350,
  },
  {
    id: "2",
    title: "Minimalist Geometric Tiger",
    slug: "minimalist-geometric-tiger",
    imageUrl: "/images/ads/vehicle-branding.jpeg", // Placeholder
    description: "Geometric art perfect for modern offices.",
    priceFrom: 450,
  }
];

export const metadata = {
  title: "Canvas Art Shop | Pro Graphics",
  description: "Browse our premium collection of canvas sales and ready-to-hang signage art.",
};

export default function CanvasShopPage() {
  return (
    <main className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-950 mb-6 tracking-tight">
            Premium <span className="text-amber-500">Canvas Art</span> Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated gallery of high-quality canvas prints and custom signage artworks available for purchase.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyProducts.map((product) => (
            <Link key={product.id} href={`/canvas-shop/${product.slug}`} className="group">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-400">
                <div className="h-72 relative">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-950 mb-2 group-hover:text-amber-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Starts from</span>
                    <span className="text-xl font-bold text-amber-500">R{product.priceFrom}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
