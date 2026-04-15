"use client";

import React, { useState } from "react";
import { CostCalculator } from "@/components/cost-calculator";

type CalculatorType = "canvas" | "split-frame" | "water-labels" | "vehicle-branding" | "sign-boards" | "stickers";

const CALCULATOR_OPTIONS: { id: CalculatorType; label: string }[] = [
  { id: "canvas", label: "Canvas Prints" },
  { id: "split-frame", label: "Split Frame Canvas" },
  { id: "water-labels", label: "Water Bottle Labels" },
  { id: "vehicle-branding", label: "Vehicle Branding" },
  { id: "sign-boards", label: "Custom Sign Boards" },
  { id: "stickers", label: "Custom Stickers" },
];

export default function AdminCalculatorPage() {
  const [activeTab, setActiveTab] = useState<CalculatorType>("canvas");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Cost Calculator</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-gray-600 mb-6">
          Use the calculators below to quote customers quickly. These are the same algorithms used
          on the public-facing product dynamic pages.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
          {CALCULATOR_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveTab(option.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === option.id
                  ? "bg-[#FF6B35] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Calculator Display */}
        <div className="max-w-3xl">
          <CostCalculator type={activeTab} />
        </div>
      </div>
    </div>
  );
}
