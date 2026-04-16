import Image from "next/image";
import Link from "next/link";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Products | Pro Graphics",
  description: "Browse our high-quality canvas products and other offerings.",
};

export default async function ProductsPage() {
  let products: any[] | null = [];

  try {
    const supabase = createSupabaseServiceClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching canvas products:", error);
    }

    products = data;
  } catch {
    products = [];
  }

  return (
    <main className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-950 mb-4">
          Our Products
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our range of beautiful canvas prints and other products, perfect for your living room or workspace.
        </p>

        {(!products || products.length === 0) ? (
          <p className="text-center text-gray-500 text-lg">
            No products available at the moment. Please check back later!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group block cursor-pointer"
              >
                <div className="relative h-64 w-full bg-gray-100">
                  {/* Using unoptimized for local seed demo, usually not needed */}
                  <Image
                    src={product.image_url || "/images/ads/vehicle-branding.jpeg"}
                    alt={product.name || "Product"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-950 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                    {product.description || product.short_desc}
                  </p>
                  <div className="flex justify-end items-center">
                    <span className="w-full bg-blue-600 group-hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-block text-center mt-2">
                      View Details & Pricing
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
