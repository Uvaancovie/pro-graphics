"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

type Category = "CANVAS" | "WATER_LABELS";

type CanvasSize = "A4" | "A3" | "A2" | "A1" | "A0" | "Custom";
type WaterVolume = "330ML" | "500ML";

const canvasPricing: Record<CanvasSize, number> = {
  A4: 200,
  A3: 350,
  A2: 500,
  A1: 650,
  A0: 900,
  Custom: 700,
};

export default function CostCalculator() {
  const [category, setCategory] = useState<Category | null>(null);
  
  // Canvas State
  const [canvasSize, setCanvasSize] = useState<CanvasSize>("A4");
  const [canvasQuantity, setCanvasQuantity] = useState(1);
  
  // Water Label State
  const [waterVolume, setWaterVolume] = useState<WaterVolume>("330ML");
  const [waterQuantity, setWaterQuantity] = useState(1);

  const calculateCanvasCost = () => {
    return canvasPricing[canvasSize] * canvasQuantity;
  };

  const calculateWaterCost = () => {
    // 330ML and 500ML both cost R1.00 each (R0.85 + VAT)
    return 1.00 * waterQuantity;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Cost Calculator
      </h2>
      
      {!category ? (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => setCategory("CANVAS")} 
            className="w-full sm:w-auto text-lg py-8 px-12"
          >
            Canvas Pricing
          </Button>
          <Button 
            onClick={() => setCategory("WATER_LABELS")} 
            variant="secondary"
            className="w-full sm:w-auto text-lg py-8 px-12"
          >
            Water Labels Pricing
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <button 
            onClick={() => setCategory(null)}
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 flex items-center"
          >
            &larr; Back to Categories
          </button>

          {category === "CANVAS" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-semibold text-gray-700 border-b pb-2">Canvas Calculator</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Canvas Size</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(Object.keys(canvasPricing) as CanvasSize[]).map((size) => (
                    <div 
                      key={size}
                      onClick={() => setCanvasSize(size)}
                      className={cn(
                        "cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300",
                        canvasSize === size 
                          ? "border-blue-600 bg-blue-50 shadow-md transform scale-105" 
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      )}
                    >
                      <div className="font-bold text-lg text-gray-800">
                        {size === "Custom" ? "Custom Split" : size}
                      </div>
                      <div className="text-blue-600 font-medium">
                        R{canvasPricing[size]}
                      </div>
                      {size === "Custom" && (
                        <div className="text-xs text-gray-500 mt-1">1m x 700 (3 frames)</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input 
                  type="number" 
                  min="1"
                  value={canvasQuantity}
                  onChange={(e) => setCanvasQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                />
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white text-center shadow-lg">
                <div className="text-blue-100 mb-1">Total Estimated Cost</div>
                <div className="text-4xl font-bold">R{calculateCanvasCost().toFixed(2)}</div>
              </div>
            </div>
          )}

          {category === "WATER_LABELS" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-semibold text-gray-700 border-b pb-2">Water Label Calculator</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Bottle Size</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["330ML", "500ML"] as WaterVolume[]).map((vol) => (
                    <div 
                      key={vol}
                      onClick={() => setWaterVolume(vol)}
                      className={cn(
                        "cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300",
                        waterVolume === vol 
                          ? "border-orange-500 bg-orange-50 shadow-md transform scale-105" 
                          : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                      )}
                    >
                      <div className="font-bold text-lg text-gray-800">{vol}</div>
                      <div className="text-orange-600 font-medium">R1.00 each</div>
                      <div className="text-xs text-gray-500 mt-1">R0.85 + VAT</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input 
                  type="number" 
                  min="1"
                  value={waterQuantity}
                  onChange={(e) => setWaterQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors"
                />
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white text-center shadow-lg">
                <div className="text-orange-100 mb-1">Total Estimated Cost</div>
                <div className="text-4xl font-bold">R{calculateWaterCost().toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
