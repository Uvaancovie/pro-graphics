"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Material {
    id: string;
    name: string;
    subtitle: string;
    priceRange: string;
    bestFor: string[];
    properties: {
        label: string;
        value: string;
        rating: number; // 1-5
    }[];
    pros: string[];
    cons: string[];
    color: string;
    gradient: string;
    icon: string;
}

const materials: Material[] = [
    {
        id: "chromadek",
        name: "Chromadek",
        subtitle: "The Outdoor Workhorse",
        priceRange: "R 800 - R 2,500",
        bestFor: ["Outdoor signage", "Harsh weather areas", "Long-term installations", "Coastal regions"],
        color: "blue",
        gradient: "from-blue-600 to-blue-800",
        icon: "🛡️",
        properties: [
            { label: "Weather Resistance", value: "Excellent", rating: 5 },
            { label: "Durability", value: "10+ years", rating: 5 },
            { label: "Cost", value: "Medium-High", rating: 3 },
            { label: "Finish Quality", value: "Matte/Gloss", rating: 4 },
        ],
        pros: [
            "Rust-proof galvanized steel core",
            "Withstands extreme weather (rain, sun, wind)",
            "Ideal for coastal/high-humidity areas",
            "Can be powder-coated in any color",
            "Maintains rigidity without warping",
        ],
        cons: [
            "Heavier than plastic alternatives",
            "Higher upfront cost",
            "Requires professional installation for large sizes",
        ],
    },
    {
        id: "abs",
        name: "ABS Plastic",
        subtitle: "The Budget-Friendly Choice",
        priceRange: "R 400 - R 1,200",
        bestFor: ["Indoor signage", "Temporary displays", "Budget-conscious projects", "Retail environments"],
        color: "amber",
        gradient: "from-amber-400 to-amber-600",
        icon: "💰",
        properties: [
            { label: "Weather Resistance", value: "Fair (Indoor)", rating: 2 },
            { label: "Durability", value: "3-5 years", rating: 3 },
            { label: "Cost", value: "Low", rating: 5 },
            { label: "Finish Quality", value: "Smooth Matte", rating: 3 },
        ],
        pros: [
            "Most affordable option",
            "Lightweight and easy to install",
            "Smooth surface for clean graphics",
            "Easy to cut and customize",
            "Good for high-turnover signage",
        ],
        cons: [
            "Not suitable for outdoor use (UV degrades it)",
            "Can warp in direct sunlight or heat",
            "Less premium appearance",
            "Shorter lifespan than alternatives",
        ],
    },
    {
        id: "perspex",
        name: "Perspex (Acrylic)",
        subtitle: "The Premium Statement",
        priceRange: "R 1,500 - R 4,500",
        bestFor: ["High-end retail", "Reception areas", "Illuminated signs", "Luxury branding"],
        color: "blue",
        gradient: "from-blue-800 to-blue-950",
        icon: "✨",
        properties: [
            { label: "Weather Resistance", value: "Good", rating: 4 },
            { label: "Durability", value: "7-10 years", rating: 4 },
            { label: "Cost", value: "High", rating: 2 },
            { label: "Finish Quality", value: "High Gloss", rating: 5 },
        ],
        pros: [
            "Crystal-clear, glass-like finish",
            "Excellent for backlit/LED signs",
            "UV resistant and weatherproof",
            "Available in colors or transparent",
            "Premium, professional appearance",
            "Easy to clean and maintain",
        ],
        cons: [
            "Most expensive option",
            "Can scratch more easily than metal",
            "Requires careful handling during installation",
        ],
    },
];

export function MaterialComparison() {
    const [selectedMaterial, setSelectedMaterial] = useState<string>("chromadek");

    const selected = materials.find((m) => m.id === selectedMaterial) || materials[0];

    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
                        Choose the Right <span className="text-amber-500">Material</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Not all sign materials are created equal. We'll help you choose based on your environment, budget, and brand positioning.
                    </p>
                </div>

                {/* Material Selection Tabs */}
                <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
                    {materials.map((material) => (
                        <button
                            key={material.id}
                            onClick={() => setSelectedMaterial(material.id)}
                            className={cn(
                                "flex-1 p-6 rounded-xl border-2 transition-all duration-300 text-left group",
                                selectedMaterial === material.id
                                    ? "border-amber-400 bg-white shadow-xl scale-105 ring-1 ring-amber-400"
                                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                            )}
                        >
                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{material.icon}</div>
                            <h3 className={cn(
                                "text-xl font-bold mb-1",
                                selectedMaterial === material.id ? "text-blue-950" : "text-gray-700"
                            )}>
                                {material.name}
                            </h3>
                            <p className="text-sm text-gray-500">{material.subtitle}</p>
                            <p className="text-lg font-bold text-amber-500 mt-2">{material.priceRange}</p>
                        </button>
                    ))}
                </div>

                {/* Detailed Comparison */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Properties Card */}
                    <Card className="shadow-xl border-t-4 border-blue-950">
                        <CardHeader className="bg-blue-50/50">
                            <CardTitle className="flex items-center gap-3 text-blue-950">
                                <span className="text-3xl">{selected.icon}</span>
                                {selected.name} Properties
                            </CardTitle>
                            <CardDescription>Technical specifications at a glance</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                {selected.properties.map((prop, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-semibold text-gray-700">{prop.label}</span>
                                            <span className="text-blue-950 font-bold">{prop.value}</span>
                                        </div>
                                        <div className="flex gap-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${selected.gradient}`}
                                                style={{ width: `${(prop.rating / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h4 className="font-bold text-blue-950 mb-4">Best For:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selected.bestFor.map((use, index) => (
                                        <span
                                            key={index}
                                            className={`px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200`}
                                        >
                                            {use}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pros & Cons Card */}
                    <Card className="shadow-xl border-t-4 border-amber-500">
                        <CardHeader className="bg-amber-50/50">
                            <CardTitle className="text-blue-950">Pros & Cons</CardTitle>
                            <CardDescription>Make an informed decision</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                        </svg>
                                        Advantages
                                    </h4>
                                    <ul className="space-y-3">
                                        {selected.pros.map((pro, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-700 bg-green-50/50 p-2 rounded-lg">
                                                <span className="text-green-600 font-bold mt-0.5">✓</span>
                                                <span>{pro}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-amber-700 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Considerations
                                    </h4>
                                    <ul className="space-y-3">
                                        {selected.cons.map((con, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-700 bg-amber-50/50 p-2 rounded-lg">
                                                <span className="text-amber-600 font-bold mt-0.5">!</span>
                                                <span>{con}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Decision Guide */}
                <div className="mt-16 max-w-4xl mx-auto p-8 bg-blue-900 rounded-2xl shadow-2xl text-white">
                    <h3 className="text-2xl font-bold mb-8 text-center text-amber-400">
                        Quick Decision Guide
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-blue-950/50 rounded-xl border border-blue-800">
                            <div className="text-4xl mb-3">🌊</div>
                            <h4 className="font-bold text-white mb-2">Outdoor/Coastal?</h4>
                            <p className="text-sm text-blue-200">Choose <strong className="text-amber-400">Chromadek</strong> for rust-proof durability</p>
                        </div>
                        <div className="text-center p-6 bg-blue-950/50 rounded-xl border border-blue-800">
                            <div className="text-4xl mb-3">🏢</div>
                            <h4 className="font-bold text-white mb-2">Indoor/Budget?</h4>
                            <p className="text-sm text-blue-200">Choose <strong className="text-amber-400">ABS</strong> for cost-effective signage</p>
                        </div>
                        <div className="text-center p-6 bg-blue-950/50 rounded-xl border border-blue-800">
                            <div className="text-4xl mb-3">💎</div>
                            <h4 className="font-bold text-white mb-2">Premium/Backlit?</h4>
                            <p className="text-sm text-blue-200">Choose <strong className="text-amber-400">Perspex</strong> for luxury appeal</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
