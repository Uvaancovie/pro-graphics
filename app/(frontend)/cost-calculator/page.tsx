"use client"

import { useState } from "react";
import { CostCalculator } from "@/components/cost-calculator";
import { ImageIcon, Package, Droplets } from "lucide-react";


type CalculatorTab = "canvas" | "split-frame" | "water-labels";

const tabs = [
  { id: "canvas" as CalculatorTab, label: "Canvas Prints", icon: ImageIcon },
  { id: "split-frame" as CalculatorTab, label: "Split Frames", icon: Package },
  { id: "water-labels" as CalculatorTab, label: "Water Labels", icon: Droplets },
];

export default function CostCalculatorPage() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>("canvas");

  return (
    <main className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">
            Cost Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant pricing for canvas prints, custom split frames, and water labels.
            Prices include VAT and are calculated in real-time.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Calculator Content */}
        <CostCalculator type={activeTab} />

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Prices are estimates and may vary based on specific requirements.
            For bulk orders or custom sizes, please{" "}
            <a href="/quote" className="text-blue-600 hover:underline">
              request a quote
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
