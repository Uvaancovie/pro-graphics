"use client";

import { useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";

interface PricingTier {
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
    savings?: number;
    popular?: boolean;
}

interface StickerSize {
    id: string;
    name: string;
    dimensions: string;
    tiers: PricingTier[];
}

const stickerSizes: StickerSize[] = [
    {
        id: "small",
        name: "Small",
        dimensions: "50mm x 50mm",
        tiers: [
            { quantity: 50, pricePerUnit: 8, totalPrice: 400 },
            { quantity: 100, pricePerUnit: 6.5, totalPrice: 650, savings: 19 },
            { quantity: 250, pricePerUnit: 5, totalPrice: 1250, savings: 38, popular: true },
            { quantity: 500, pricePerUnit: 4, totalPrice: 2000, savings: 50 },
            { quantity: 1000, pricePerUnit: 3.2, totalPrice: 3200, savings: 60 },
        ],
    },
    {
        id: "medium",
        name: "Medium",
        dimensions: "100mm x 100mm",
        tiers: [
            { quantity: 50, pricePerUnit: 15, totalPrice: 750 },
            { quantity: 100, pricePerUnit: 12, totalPrice: 1200, savings: 20 },
            { quantity: 250, pricePerUnit: 9.5, totalPrice: 2375, savings: 37, popular: true },
            { quantity: 500, pricePerUnit: 7.5, totalPrice: 3750, savings: 50 },
            { quantity: 1000, pricePerUnit: 6, totalPrice: 6000, savings: 60 },
        ],
    },
    {
        id: "large",
        name: "Large",
        dimensions: "150mm x 150mm",
        tiers: [
            { quantity: 50, pricePerUnit: 25, totalPrice: 1250 },
            { quantity: 100, pricePerUnit: 20, totalPrice: 2000, savings: 20 },
            { quantity: 250, pricePerUnit: 16, totalPrice: 4000, savings: 36, popular: true },
            { quantity: 500, pricePerUnit: 13, totalPrice: 6500, savings: 48 },
            { quantity: 1000, pricePerUnit: 10.5, totalPrice: 10500, savings: 58 },
        ],
    },
];

export function BulkPricingTable() {
    const [selectedSize, setSelectedSize] = useState<string>("medium");

    const currentSize = stickerSizes.find((s) => s.id === selectedSize) || stickerSizes[1];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
                        Transparent <span className="text-amber-500">Bulk Pricing</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Following the Ctrl P model - no hidden fees, no surprises. The more you order, the more you save.
                    </p>
                </div>

                {/* Size Selector */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-2xl mx-auto">
                    {stickerSizes.map((size) => (
                        <button
                            key={size.id}
                            onClick={() => setSelectedSize(size.id)}
                            className={cn(
                                "flex-1 p-4 rounded-xl border-2 transition-all duration-300",
                                selectedSize === size.id
                                    ? "border-amber-400 bg-amber-50 shadow-md ring-1 ring-amber-400"
                                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                            )}
                        >
                            <div className={cn("font-bold text-lg", selectedSize === size.id ? "text-blue-950" : "text-gray-700")}>{size.name}</div>
                            <div className="text-sm text-gray-500">{size.dimensions}</div>
                        </button>
                    ))}
                </div>

                {/* Pricing Table */}
                <div className="max-w-6xl mx-auto">
                    <Card className="shadow-2xl overflow-hidden border-t-4 border-amber-500">
                        <CardHeader className="bg-blue-950 text-white p-6">
                            <CardTitle className="text-2xl text-amber-400">
                                {currentSize.name} Stickers ({currentSize.dimensions}) - Volume Pricing
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-6 py-4 text-left font-bold text-blue-950">Quantity</th>
                                            <th className="px-6 py-4 text-left font-bold text-blue-950">Price Per Sticker</th>
                                            <th className="px-6 py-4 text-left font-bold text-blue-950">Total Price</th>
                                            <th className="px-6 py-4 text-left font-bold text-blue-950">You Save</th>
                                            <th className="px-6 py-4 text-center font-bold text-blue-950">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentSize.tiers.map((tier, index) => (
                                            <tr
                                                key={index}
                                                className={cn(
                                                    "border-b border-gray-100 transition-all duration-300 hover:bg-blue-50/50",
                                                    tier.popular && "bg-amber-50/30"
                                                )}
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl font-bold text-blue-950 leading-none">
                                                            {tier.quantity.toLocaleString()}
                                                        </span>
                                                        {tier.popular && (
                                                            <span className="bg-amber-500 text-blue-950 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                                                POPULAR
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="text-xl font-bold text-blue-600">
                                                        {formatCurrency(tier.pricePerUnit)}
                                                    </div>
                                                    <div className="text-xs text-gray-400">per sticker</div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="text-2xl font-bold text-blue-950 font-mono">
                                                        {formatCurrency(tier.totalPrice)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {tier.savings ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-green-600 font-bold text-lg bg-green-50 px-2 py-1 rounded">
                                                                {tier.savings}%
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">Base price</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <button
                                                        className={cn(
                                                            "px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md",
                                                            tier.popular
                                                                ? "bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg"
                                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                                        )}
                                                    >
                                                        Order
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Information */}
                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4 text-blue-600">✂️</div>
                            <h4 className="text-xl font-bold text-blue-950 mb-3">Custom Cut to Shape</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Die-cut to your exact design. No boring rectangles - we cut around your logo perfectly for a premium look.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4 text-blue-600">🌞</div>
                            <h4 className="text-xl font-bold text-blue-950 mb-3">Weatherproof Vinyl</h4>
                            <p className="text-gray-600 leading-relaxed">
                                UV-resistant, waterproof, and durable. Lasts 3-5 years outdoors, even longer indoors.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4 text-blue-600">🚚</div>
                            <h4 className="text-xl font-bold text-blue-950 mb-3">Fast Turnaround</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Standard orders: 3-5 business days. Rush service available for urgent needs.
                            </p>
                        </div>
                    </div>

                    {/* Savings Calculator Callout */}
                    <div className="mt-12 p-10 bg-blue-950 rounded-2xl text-white text-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-amber-500/20 transition-all"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-4">
                                💡 Pro Tip: Order in Bulk and Save Up to 60%
                            </h3>
                            <p className="text-blue-200 text-xl mb-6 font-light">
                                Ordering 1,000 stickers instead of 50 saves you <span className="text-amber-400 font-bold">{formatCurrency(currentSize.tiers[0].pricePerUnit * 1000 - currentSize.tiers[4].totalPrice)}</span> on this size alone!
                            </p>
                            <p className="text-sm text-blue-300/70">
                                Need a custom quantity? Contact us for a personalized quote.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
