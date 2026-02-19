"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { cn } from "@/lib/utils";

const tiers = [
    {
        name: "Standard Impact",
        level: "Good",
        description: "Essential branding for visibility.",
        price: "Entry Level",
        features: [
            "Spot Graphics / Decals",
            "Door Magnets",
            "One-Way Vision (Rear Model)",
            "3-Year Vinyl Life",
        ],
        color: "bg-blue-600",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
        popular: false,
    },
    {
        name: "Professional Fleet",
        level: "Better",
        description: "Maximum coverage within budget.",
        price: "Best Value",
        features: [
            "Partial Wrap (Half Vehicle)",
            "Contravision Windows",
            "Reflective Decals",
            "5-Year Vinyl Life",
        ],
        color: "bg-blue-800",
        buttonColor: "bg-blue-800 hover:bg-blue-900",
        popular: true,
    },
    {
        name: "Brand Dominance",
        level: "Best",
        description: "Complete transformation & protection.",
        price: "Premium",
        features: [
            "Full Vehicle Wrap",
            "Paint Protection Film",
            "Roof & Bonnet Customization",
            "7-Year Cast Vinyl Warranty",
        ],
        color: "bg-amber-500",
        buttonColor: "bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold",
        popular: false,
    },
];

export function PricingMatrix() {
    const [selectedTier, setSelectedTier] = useState<string | null>("Better");

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
                <Card
                    key={tier.level}
                    className={cn(
                        "relative transition-all duration-300 cursor-pointer border-2",
                        selectedTier === tier.level
                            ? `scale-105 shadow-2xl ${tier.level === "Best" ? "border-amber-400" : "border-blue-600"}`
                            : "border-gray-100 hover:border-blue-200 hover:shadow-xl"
                    )}
                    onClick={() => setSelectedTier(tier.level)}
                >
                    {tier.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-blue-950 text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-wider">
                            Most Popular
                        </div>
                    )}

                    <div className={`${tier.level === "Best" ? "bg-amber-500" : tier.color} h-2 w-full`}></div>

                    <CardHeader>
                        <div className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                            {tier.level}
                        </div>
                        <CardTitle className="text-2xl font-bold text-blue-950">
                            {tier.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2">
                            {tier.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="text-3xl font-bold text-blue-900 mb-2 font-mono">
                            {tier.price}
                        </div>
                        <div className="text-sm text-green-600 font-bold mb-6 bg-green-50 inline-block px-2 py-1 rounded-md border border-green-100">
                            {tier.level === "Good" ? "Standard Efficiency" : tier.level === "Better" ? "30% More Effective" : "Max Brand Impact"}
                        </div>

                        <ul className="space-y-3 mb-8">
                            {tier.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                                    <svg className={`w-5 h-5 ${tier.level === "Best" ? "text-amber-500" : "text-blue-600"} shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            className={`w-full ${tier.buttonColor} border-none shadow-md`}
                            size="lg"
                        >
                            Choose {tier.level}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
