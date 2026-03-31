import { notFound } from "next/navigation";
import CanvasProductConfigurator from "@/app/components/canvas-shop/CanvasProductConfigurator";

// Dummy data fetching - you would replace this with a Supabase query:
// const { data } = await supabase.from('canvas_products').select('*, canvas_options(*)').eq('slug', params.slug).single()
const dummyDatabase = [
  {
    id: "1",
    title: "Durban Skyline Abstract",
    slug: "durban-skyline-abstract",
    description: "A beautiful abstract depiction of the Durban skyline printed on premium material.",
    imageUrl: "/images/ads/custom-sign-boards.jpeg",
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
    imageUrl: "/images/ads/vehicle-branding.jpeg",
    options: [
      { id: "o1", sizeName: "Medium (500x700mm)", material: "Matte Canvas", price: 450 },
      { id: "o2", sizeName: "Large (700x1000mm)", material: "Matte Canvas", price: 850 },
    ],
  }
];

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = dummyDatabase.find(p => p.slug === params.slug);
  if (!product) return { title: "Not Found" };
  
  return {
    title: `${product.title} | Canvas Art | Pro Graphics`,
    description: product.description,
  };
}

export default function CanvasProductPage({ params }: { params: { slug: string } }) {
  const product = dummyDatabase.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-12">
      <CanvasProductConfigurator product={product} />
    </div>
  );
}
