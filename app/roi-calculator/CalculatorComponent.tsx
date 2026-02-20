'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CalculatorComponent() {
    const [vehicles, setVehicles] = useState<number>(5);
    const [dailyKm, setDailyKm] = useState<number>(50);
    const [area, setArea] = useState<string>('cbd');

    const areas = {
        'cbd': { name: 'Durban CBD & Harbour', impressionsPerKm: 850 },
        'highway': { name: 'N2/M4 Highway', impressionsPerKm: 650 },
        'umhlanga': { name: 'Umhlanga/Ballito', impressionsPerKm: 720 },
        'phoenix': { name: 'Phoenix/Verulam', impressionsPerKm: 480 },
        'pinetown': { name: 'Pinetown/Westville', impressionsPerKm: 550 },
    };

    const IMPRESSION_VALUE = 0.05; // R0.05 per impression
    const currentArea = areas[area as keyof typeof areas] || areas['cbd'];

    const dailyImpressionsPerVehicle = dailyKm * currentArea.impressionsPerKm;
    const totalDailyImpressions = dailyImpressionsPerVehicle * vehicles;

    const dailyValue = totalDailyImpressions * IMPRESSION_VALUE;
    const monthlyValue = dailyValue * 30; // 30 days standard
    const annualValue = monthlyValue * 12;

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row mt-12">

            {/* Controls */}
            <div className="w-full md:w-5/12 p-8 sm:p-10 bg-white">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Fleet Details</h2>

                <div className="space-y-8">
                    <div>
                        <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                            Number of Unbranded Vehicles
                            <span className="text-blue-950">{vehicles} {vehicles === 1 ? 'Vehicle' : 'Vehicles'}</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={vehicles}
                            onChange={(e) => setVehicles(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                        />
                    </div>

                    <div>
                        <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                            Average Daily Distance per Vehicle
                            <span className="text-blue-950">{dailyKm} km/day</span>
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="300"
                            step="10"
                            value={dailyKm}
                            onChange={(e) => setDailyKm(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Primary Driving Area
                        </label>
                        <select
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-950 focus:border-blue-950 block p-3"
                        >
                            {Object.entries(areas).map(([key, value]) => (
                                <option key={key} value={key}>{value.name}</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-2">
                            Based on Durban traffic analytics and R0.05 industry standard impression value.
                        </p>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="w-full md:w-7/12 p-8 sm:p-10 bg-blue-950 text-white flex flex-col justify-center">
                <h3 className="text-amber-500 font-bold tracking-wider text-sm uppercase mb-2">
                    Your Lost Brand Value
                </h3>

                <div className="mb-8">
                    <span className="text-black text-sm block mb-1">Monthly Lost Value</span>
                    <div className="text-5xl sm:text-6xl font-extrabold text-black">
                        R{monthlyValue.toLocaleString()}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                    <div>
                        <span className="text-black text-xs uppercase tracking-wider block mb-1">Daily Loss</span>
                        <div className="text-2xl font-bold text-black">R{dailyValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>
                    <div>
                        <span className="text-black text-xs uppercase tracking-wider block mb-1">Annual Loss</span>
                        <div className="text-2xl font-bold text-black">R{annualValue.toLocaleString()}</div>
                    </div>
                    <div className="col-span-2">
                        <span className="text-black text-xs uppercase tracking-wider block mb-1">Total Daily Impressions Wasted</span>
                        <div className="text-2xl font-bold text-black">{totalDailyImpressions.toLocaleString()} views</div>
                    </div>
                </div>

                <div className="mt-auto">
                    <Link
                        href="/branding-blueprint"
                        className="block w-full text-center bg-amber-500 hover:bg-white text-black font-bold py-4 px-6 rounded-xl transition-colors duration-300 shadow-lg"
                    >
                        Stop the Bleeding - Book Assessment
                    </Link>
                </div>
            </div>
        </div>
    );
}
