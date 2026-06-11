import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getProductById } from "@/lib/cms";
import { ChevronLeft } from "lucide-react";
import LeadMagnetPopup from "@/components/ui/LeadMagnetPopup";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!product) return <Navigate to="/products" />;

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          to="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative h-96 lg:h-auto bg-gray-100 min-h-[400px]">
              <img
                src={product.image_url || "/images/ads/vehicle-branding.jpeg"}
                alt={product.name || "Product"}
                className="object-cover"
              />
            </div>
            <div className="lg:w-1/2 p-8 lg:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
                {product.name}
              </h1>
              <div className="prose prose-blue mb-8 text-gray-600 border-t border-b border-gray-100 py-6">
                <p>{product.description || product.short_desc}</p>
              </div>
              <div className="space-y-4 max-w-sm">
                <Link
                  to="/general-submission"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center shadow-md shadow-blue-600/20"
                >
                  Request a Quote
                </Link>
                <p className="text-sm text-gray-500 text-center">
                  Interested in this product? Request a quote for printing and delivery options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LeadMagnetPopup />
    </main>
  );
}
