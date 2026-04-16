"use client";

import { useState, useMemo } from "react";
import { Calculator, Package, Droplets, ImageIcon } from "lucide-react";

// Pricing data
const CANVAS_SIZES = [
  { id: "a4", name: "A4", dimensions: "210 x 297mm", price: 200 },
  { id: "a3", name: "A3", dimensions: "297 x 420mm", price: 350 },
  { id: "a2", name: "A2", dimensions: "420 x 594mm", price: 500 },
  { id: "a1", name: "A1", dimensions: "594 x 841mm", price: 650 },
  { id: "a0", name: "A0", dimensions: "841 x 1189mm", price: 900 },
];

const SPLIT_FRAME_PRICE = 700; // per meter

const WATER_LABEL_SIZES = [
  { id: "330ml", name: "330ml Bottle", price: 1.0, vatExclusive: 0.85 },
  { id: "500ml", name: "500ml Bottle", price: 1.0, vatExclusive: 0.85 },
];

type CalculatorType = "canvas" | "split-frame" | "water-labels" | "vehicle-branding" | "sign-boards" | "stickers";

interface CostCalculatorProps {
  type: CalculatorType;
  productTitle?: string;
}

export function CostCalculator({ type, productTitle }: CostCalculatorProps) {
  // Canvas state
  const [canvasSize, setCanvasSize] = useState(CANVAS_SIZES[0].id);
  const [canvasQty, setCanvasQty] = useState(1);

  // Split frame state
  const [frameLength, setFrameLength] = useState(1);
  const [frameQty, setFrameQty] = useState(1);

  // Water labels state
  const [labelSize, setLabelSize] = useState(WATER_LABEL_SIZES[0].id);
  const [labelQty, setLabelQty] = useState(100);

  // New products state
  const [vehicleType, setVehicleType] = useState("partial");
  const [signSize, setSignSize] = useState(1); // square meters
  const [stickerQty, setStickerQty] = useState(1);
  const [stickerWidth, setStickerWidth] = useState(10); // mm (default 10mm = 1cm)
  const [stickerHeight, setStickerHeight] = useState(10); // mm (default 10mm = 1cm)

  // Calculations
  const calculations = useMemo(() => {
    let subtotal = 0;
    let vat = 0;
    let total = 0;
    let breakdown: { label: string; value: string | number }[] = [];

    const calculateVATInclusive = (amount: number) => {
      const calcTotal = amount;
      const calcVat = calcTotal - (calcTotal / 1.15);
      const calcSubtotal = calcTotal - calcVat;
      return { calcTotal, calcVat, calcSubtotal };
    };

    switch (type) {
      case "canvas": {
        const size = CANVAS_SIZES.find((s) => s.id === canvasSize);
        if (size) {
          const { calcTotal, calcVat, calcSubtotal } = calculateVATInclusive(size.price * canvasQty);
          total = calcTotal; vat = calcVat; subtotal = calcSubtotal;
          breakdown = [
            { label: `Canvas Print ${size.name}`, value: size.price },
            { label: "Quantity", value: canvasQty },
            { label: "Unit Price", value: `R${size.price}` },
          ];
        }
        break;
      }

      case "split-frame": {
        const pricePerFrame = frameLength * SPLIT_FRAME_PRICE;
        const { calcTotal, calcVat, calcSubtotal } = calculateVATInclusive(pricePerFrame * frameQty);
        total = calcTotal; vat = calcVat; subtotal = calcSubtotal;
        breakdown = [
          { label: "Frame Length", value: `${frameLength}m` },
          { label: "Price per meter", value: `R${SPLIT_FRAME_PRICE}` },
          { label: "Frames", value: frameQty },
          { label: "Price per frame", value: `R${pricePerFrame}` },
        ];
        break;
      }

      case "water-labels": {
        const label = WATER_LABEL_SIZES.find((s) => s.id === labelSize);
        if (label) {
          const { calcTotal, calcVat, calcSubtotal } = calculateVATInclusive(label.price * labelQty);
          total = calcTotal; vat = calcVat; subtotal = calcSubtotal;
          breakdown = [
            { label: label.name, value: labelQty },
            { label: "Price each", value: `R${label.price}` },
          ];
        }
        break;
      }
      
      case "vehicle-branding": {
        const price = vehicleType === "partial" ? 2500 : (vehicleType === "half" ? 5000 : 10000);
        const { calcTotal, calcVat, calcSubtotal } = calculateVATInclusive(price);
        total = calcTotal; vat = calcVat; subtotal = calcSubtotal;
        breakdown = [
          { label: "Wrap Type", value: vehicleType === "partial" ? "Partial Wrap" : (vehicleType === "half" ? "Half Wrap" : "Full Wrap") },
          { label: "Base Price", value: `R${price}` }
        ];
        break;
      }

      case "sign-boards": {
        const pricePerSqm = 800;
        const { calcTotal, calcVat, calcSubtotal } = calculateVATInclusive(signSize * pricePerSqm);
        total = calcTotal; vat = calcVat; subtotal = calcSubtotal;
        breakdown = [
          { label: "Board Size (m²)", value: signSize },
          { label: "Price per m²", value: `R${pricePerSqm}` }
        ];
        break;
      }

      case "stickers": {
        const pricePerCm2 = 0.25; // R0.25 per cm²
        const areaMm2 = stickerWidth * stickerHeight; // mm²
        const areaCm2 = areaMm2 / 100; // convert to cm²
        const basePrice = areaCm2 * pricePerCm2; // price per sticker
        const { calcTotal, calcVat, calcSubtotal } = calculateVATInclusive(basePrice * stickerQty);
        total = calcTotal; vat = calcVat; subtotal = calcSubtotal;
        breakdown = [
          { label: "Dimensions", value: `${stickerWidth}mm x ${stickerHeight}mm` },
          { label: "Area per sticker", value: `${areaCm2.toFixed(2)}cm²` },
          { label: "Quantity", value: stickerQty },
          { label: "Price per sticker", value: `R${basePrice.toFixed(2)}` }
        ];
        if (stickerWidth === 0 || stickerHeight === 0) {
          breakdown.push({ label: "Note", value: "Please enter dimensions" });
        }
        break;
      }
    }

    return { subtotal, vat, total, breakdown };
  }, [type, canvasSize, canvasQty, frameLength, frameQty, labelSize, labelQty, vehicleType, signSize, stickerQty, stickerWidth, stickerHeight]);

  const formatCurrency = (amount: number) =>
    `R${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-blue-950">Cost Calculator</h3>
      </div>

      {/* Canvas Calculator */}
      {type === "canvas" && (
        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <ImageIcon className="w-4 h-4" />
              Select Canvas Size
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CANVAS_SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setCanvasSize(size.id)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    canvasSize === size.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white hover:bg-blue-50 border border-gray-200"
                  }`}
                >
                  <div className="font-bold text-sm">{size.name}</div>
                  <div
                    className={`text-xs ${
                      canvasSize === size.id ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {size.dimensions}
                  </div>
                  <div
                    className={`text-sm font-semibold mt-1 ${
                      canvasSize === size.id ? "text-white" : "text-blue-600"
                    }`}
                  >
                    R{size.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Quantity: {canvasQty}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={canvasQty}
              onChange={(e) => setCanvasQty(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>
        </div>
      )}

      {/* Split Frame Calculator */}
      {type === "split-frame" && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-700">Custom Split Frame</span>
            </div>
            <p className="text-sm text-gray-600">
              1 image split across 3 frames. Price: R{SPLIT_FRAME_PRICE} per meter
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Frame Length: {frameLength}m
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={frameLength}
              onChange={(e) => setFrameLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.5m</span>
              <span>1.5m</span>
              <span>3m</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Number of Frame Sets: {frameQty}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={frameQty}
              onChange={(e) => setFrameQty(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
      )}

      {/* Water Labels Calculator */}
      {type === "water-labels" && (
        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Droplets className="w-4 h-4" />
              Bottle Size
            </label>
            <div className="grid grid-cols-2 gap-2">
              {WATER_LABEL_SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setLabelSize(size.id)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    labelSize === size.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white hover:bg-blue-50 border border-gray-200"
                  }`}
                >
                  <div className="font-bold text-sm">{size.name}</div>
                  <div
                    className={`text-sm font-semibold mt-1 ${
                      labelSize === size.id ? "text-white" : "text-blue-600"
                    }`}
                  >
                    R{size.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Quantity: {labelQty} labels
            </label>
            <input
              type="range"
              min="50"
              max="10000"
              step="50"
              value={labelQty}
              onChange={(e) => setLabelQty(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>50</span>
              <span>5000</span>
              <span>10000</span>
            </div>
          </div>


        </div>
      )}

      {/* Vehicle Branding Calculator */}
      {type === "vehicle-branding" && (
        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Wrap Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: "partial", name: "Partial Wrap", price: 2500 },
                { id: "half", name: "Half Wrap", price: 5000 },
                { id: "full", name: "Full Wrap", price: 10000 }
              ].map((wrap) => (
                <button
                  key={wrap.id}
                  onClick={() => setVehicleType(wrap.id)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    vehicleType === wrap.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white hover:bg-blue-50 border border-gray-200"
                  }`}
                >
                  <div className="font-bold text-sm">{wrap.name}</div>
                  <div
                    className={`text-sm font-semibold mt-1 ${
                      vehicleType === wrap.id ? "text-white" : "text-blue-600"
                    }`}
                  >
                    From R{wrap.price}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sign Boards Calculator */}
      {type === "sign-boards" && (
        <div className="space-y-5">
          <div>
             <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Sign Board Size: {signSize}m²
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={signSize}
              onChange={(e) => setSignSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1m²</span>
              <span>10m²</span>
              <span>20m²</span>
            </div>
          </div>
        </div>
      )}

      {/* Stickers Calculator */}
      {type === "stickers" && (
        <div className="space-y-5">
          {/* Dimensions */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Package className="w-4 h-4" />
              Sticker Dimensions (mm)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Width (mm)</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={stickerWidth}
                  onChange={(e) => setStickerWidth(Math.max(0, Math.min(1000, Number(e.target.value))))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Height (mm)</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={stickerHeight}
                  onChange={(e) => setStickerHeight(Math.max(0, Math.min(1000, Number(e.target.value))))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-3 p-2 bg-blue-50 rounded-lg text-center">
              <span className="text-sm text-blue-800">
                Area: <strong>{stickerWidth === 0 || stickerHeight === 0 ? '0.00' : (stickerWidth * stickerHeight / 100).toFixed(2)}cm²</strong> ({stickerWidth * stickerHeight}mm²) per sticker
              </span>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Quantity: {stickerQty} stickers
            </label>
            <input
              type="range"
              min="1"
              max="1000"
              step="1"
              value={stickerQty}
              onChange={(e) => setStickerQty(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>500</span>
              <span>1000</span>
            </div>
          </div>
        </div>
      )}

      {/* Price Summary */}
      <div className="mt-6 pt-6 border-t border-blue-200">
        <div className="space-y-2">
          {calculations.breakdown.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-900">
                {typeof item.value === "number" && item.value > 100
                  ? item.value
                  : item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-950">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(calculations.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostCalculator;
