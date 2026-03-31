import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Products | Pro Graphics",
  description: "Browse our high-quality canvas products and other offerings.",
};

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from("canvas_products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching canvas products:", error);
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
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="relative h-64 w-full bg-gray-100">
                  {/* Using unoptimized for local seed demo, usually not needed */}
                  <Image
                    src={product.image_url}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-950 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                    {product.description}
                  </p>
                  <div className="flex justify-end items-center">
                    <Link href={`/products/${product.id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer inline-block text-center">
                      Request Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
