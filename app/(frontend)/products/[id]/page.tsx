import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { ChevronLeft } from "lucide-react";
import { CostCalculator } from "@/components/cost-calculator";

// Helper to determine calculator type based on product name
function getCalculatorType(name: string): "canvas" | "split-frame" | "water-labels" | "vehicle-branding" | "sign-boards" | "stickers" | null {
  const lower = name?.toLowerCase() || "";
  if (lower.includes("canvas") || lower.includes("print")) return "canvas";
  if (lower.includes("split") || lower.includes("frame")) return "split-frame";
  if (lower.includes("water") || lower.includes("label")) return "water-labels";
  if (lower.includes("vehicle") || lower.includes("brand")) return "vehicle-branding";
  if (lower.includes("sign")) return "sign-boards";
  if (lower.includes("sticker")) return "stickers";
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createSupabaseServiceClient();

  const { data: product } = await supabase
    .from("products")
    .select("name, description, short_desc")
    .eq("id", id)
    .single();

  if (!product) {
    return {
      title: "Product Not Found | Pro Graphics",
    };
  }

  return {
    title: `${product.name || 'Product'} | Pro Graphics`,
    description: product.description || product.short_desc || `Buy ${product.name} from Pro Graphics.`,
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createSupabaseServiceClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    console.error("Error fetching product:", error);
    notFound();
  }

  const calculatorType = getCalculatorType(product.name);

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery / Main Image */}
            <div className="lg:w-1/2 relative h-96 lg:h-auto bg-gray-100 min-h-[400px]">
              <Image
                src={product.image_url || "/images/ads/vehicle-branding.jpeg"}
                alt={product.name || "Product"}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
                {product.name}
              </h1>

              <div className="prose prose-blue mb-8 text-gray-600 border-t border-b border-gray-100 py-6">
                <p>{product.description || product.short_desc}</p>
              </div>

              {calculatorType ? (
                <CostCalculator type={calculatorType} productTitle={product.name} />
              ) : (
                <div className="space-y-4 max-w-sm">
                  <Link
                    href="/general-submission"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center shadow-md shadow-blue-600/20"
                  >
                    Request a Quote
                  </Link>
                  <p className="text-sm text-gray-500 text-center">
                    Interested in this product? Request a quote for printing and delivery options.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
