"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/app/components/ui/Button"; // Let's assume you have a generic Button or use standard classes

type CanvasOption = {
  id: string;
  sizeName: string;
  material: string;
  price: number;
};

type ProductProps = {
  product: {
    title: string;
    description: string;
    imageUrl: string;
    options: CanvasOption[];
  };
};

export default function CanvasProductConfigurator({ product }: ProductProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.options[0]?.sizeName || ""
  );
  const [selectedMaterial, setSelectedMaterial] = useState<string>(
    product.options[0]?.material || ""
  );

  // Filter options based on size to get available materials and current price
  const availableOptionsForSize = product.options.filter(
    (opt) => opt.sizeName === selectedSize
  );

  const currentOption = availableOptionsForSize.find(
    (opt) => opt.material === selectedMaterial
  ) || availableOptionsForSize[0] || product.options[0];

  // Update material if the previously selected one isn't available for the new size
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const newOptions = product.options.filter((opt) => opt.sizeName === size);
    if (!newOptions.some((opt) => opt.material === selectedMaterial)) {
      setSelectedMaterial(newOptions[0]?.material || "");
    }
  };

  const handleInquiry = () => {
    // You can redirect to the quote page with prefilled parameters or call an API route here
    alert(`Inquiring about ${product.title} (${selectedSize} - ${currentOption.material}) for R${currentOption.price}`);
  };

  // Derive unique sizes
  const uniqueSizes = Array.from(new Set(product.options.map((o) => o.sizeName)));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto py-12 px-4">
      {/* Product Image Viewer */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-center min-h-[400px]">
         <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl transition-all duration-300">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-contain"
            />
         </div>
      </div>

      {/* Product Details & Configurator */}
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-blue-950 mb-4">{product.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <label className="block text-sm font-semibold text-blue-900 mb-2">Select Size</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {uniqueSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20"
                    : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <label className="block text-sm font-semibold text-blue-900 mb-2">Select Material</label>
          <div className="grid grid-cols-2 gap-3">
            {availableOptionsForSize.map((opt) => (
              <button
                key={opt.material}
                onClick={() => setSelectedMaterial(opt.material)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  selectedMaterial === opt.material
                    ? "border-blue-900 bg-blue-900 text-white shadow-lg"
                    : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {opt.material}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Inquiry */}
        <div className="mt-auto pt-8 border-t border-gray-100">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Estimated Price</p>
              <div className="text-4xl font-bold text-amber-500">
                R{currentOption?.price ? currentOption.price.toFixed(2) : "0.00"}
              </div>
            </div>
            <div className="text-right text-xs text-gray-400">
              *Excl. custom framing & installation
            </div>
          </div>
          <button
            onClick={handleInquiry}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold tracking-wide uppercase transition-all shadow-lg hover:shadow-blue-900/30 active:scale-[0.98]"
          >
            Request Official Quote
          </button>
        </div>
      </div>
    </div>
  );
}
