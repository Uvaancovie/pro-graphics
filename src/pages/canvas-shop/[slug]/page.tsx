import { useParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import CanvasProductConfigurator from "@/components/canvas-shop/CanvasProductConfigurator";

const dummyDatabase = [
  {
    id: "1",
    title: "Durban Skyline Abstract",
    slug: "durban-skyline-abstract",
    description: "A beautiful abstract depiction of the Durban skyline printed on premium material.",
    imageUrl: "/canvas-products/canvas-product-1.jpeg",
    options: [
      { id: "o1", sizeName: "A4 (210x297mm)", material: "Standard Canvas", price: 350 },
      { id: "o2", sizeName: "A4 (210x297mm)", material: "Premium Gloss Canvas", price: 450 },
      { id: "o3", sizeName: "A3 (297x420mm)", material: "Standard Canvas", price: 550 },
      { id: "o4", sizeName: "A3 (297x420mm)", material: "Premium Gloss Canvas", price: 680 },
      { id: "o5", sizeName: "A2 (420x594mm)", material: "Premium Gloss Canvas", price: 950 },
    ],
  },
  {
    id: "2",
    title: "Minimalist Geometric Tiger",
    slug: "minimalist-geometric-tiger",
    description: "Geometric art perfect for modern offices.",
    imageUrl: "/canvas-products/canvas-product-2.jpeg",
    options: [
      { id: "o1", sizeName: "Medium (500x700mm)", material: "Matte Canvas", price: 450 },
      { id: "o2", sizeName: "Large (700x1000mm)", material: "Matte Canvas", price: 850 },
    ],
  }
];

export default function CanvasProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = dummyDatabase.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-950">Product Not Found</h1>
          <a href="/canvas-shop" className="text-blue-900 font-bold mt-4 inline-block hover:text-amber-500 transition-colors">
            ← Back to Canvas Shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-12">
      <Seo
        title={`${product.title} | Canvas Art | Pro Graphics`}
        description={product.description}
        canonicalUrl={`/canvas-shop/${slug}`}
      />
      <CanvasProductConfigurator product={product} />
    </div>
  );
}
