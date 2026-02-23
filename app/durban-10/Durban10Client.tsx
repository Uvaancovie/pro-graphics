"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Timer, CheckCircle, Loader2 } from "lucide-react";

export function Durban10Client() {
    const totalSpots = 10;
    const spotsRemaining = 4;
    const spotsFilled = totalSpots - spotsRemaining;

    const [formData, setFormData] = useState({
        name: "",
        business: "",
        phone: "",
        email: "",
        vehicleType: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Durban 10 Lead:", formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <section id="claim-spot" className="py-20 bg-blue-950 text-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                {/* Spots Tracker */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-8">
                        Claim Your{" "}
                        <span className="text-amber-500">Founding Spot</span>
                    </h2>

                    {/* Visual Spots Indicator */}
                    <div className="max-w-lg mx-auto mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-sm font-bold">
                                <Users size={16} className="text-amber-500" />
                                <span>
                                    <span className="text-amber-500 text-lg">{spotsFilled}</span> / {totalSpots} spots claimed
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-red-400">
                                <Timer size={16} />
                                <span>Filling fast</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-4 bg-blue-900 rounded-full overflow-hidden border border-blue-800">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(spotsFilled / totalSpots) * 100}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)]"
                            />
                        </div>

                        {/* Individual Spot Circles */}
                        <div className="flex justify-between mt-4 px-1">
                            {Array.from({ length: totalSpots }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${i < spotsFilled
                                            ? "bg-amber-500 border-amber-400 text-blue-950"
                                            : "bg-blue-900/50 border-blue-800 text-blue-500"
                                        }`}
                                >
                                    {i < spotsFilled ? "✓" : i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Lead Capture Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    {isSubmitted ? (
                        <div className="bg-green-900/30 border-2 border-green-500 rounded-2xl p-12 text-center">
                            <CheckCircle size={64} className="mx-auto mb-4 text-green-400" />
                            <h3 className="text-3xl font-black mb-3 text-green-400">Spot Reserved! 🎉</h3>
                            <p className="text-xl text-green-100 mb-2">
                                We've received your request. A Pro Graphics specialist will contact you within <strong>24 hours</strong> with your custom mockup and discounted quote.
                            </p>
                            <p className="text-green-300 text-sm mt-4 italic">
                                Check your email and phone — we move fast.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
                            <h3 className="text-2xl font-black text-center mb-2 text-amber-400">
                                Reserve Your 25% Discount
                            </h3>
                            <p className="text-center text-blue-200 mb-8 text-sm">
                                Fill this out in 30 seconds. No commitment until you approve the mockup.
                            </p>

                            <div className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-blue-200 mb-1.5">
                                            Full Name <span className="text-amber-500">*</span>
                                        </label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-blue-900/50 border-2 border-blue-800 rounded-lg text-white font-medium placeholder:text-blue-500 focus:border-amber-500 focus:outline-none transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-blue-200 mb-1.5">
                                            Business Name <span className="text-amber-500">*</span>
                                        </label>
                                        <input
                                            name="business"
                                            value={formData.business}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-blue-900/50 border-2 border-blue-800 rounded-lg text-white font-medium placeholder:text-blue-500 focus:border-amber-500 focus:outline-none transition-colors"
                                            placeholder="Your business"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-blue-200 mb-1.5">
                                            Phone Number <span className="text-amber-500">*</span>
                                        </label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            type="tel"
                                            className="w-full px-4 py-3 bg-blue-900/50 border-2 border-blue-800 rounded-lg text-white font-medium placeholder:text-blue-500 focus:border-amber-500 focus:outline-none transition-colors"
                                            placeholder="082 123 4567"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-blue-200 mb-1.5">
                                            Email <span className="text-amber-500">*</span>
                                        </label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            type="email"
                                            className="w-full px-4 py-3 bg-blue-900/50 border-2 border-blue-800 rounded-lg text-white font-medium placeholder:text-blue-500 focus:border-amber-500 focus:outline-none transition-colors"
                                            placeholder="you@company.co.za"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-blue-200 mb-1.5">
                                        Vehicle Type <span className="text-amber-500">*</span>
                                    </label>
                                    <select
                                        name="vehicleType"
                                        value={formData.vehicleType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-blue-900/50 border-2 border-blue-800 rounded-lg text-white font-medium focus:border-amber-500 focus:outline-none transition-colors"
                                    >
                                        <option value="">Select your vehicle type</option>
                                        <option value="sedan">Sedan / Hatchback</option>
                                        <option value="bakkie">Bakkie / Pickup</option>
                                        <option value="suv">SUV</option>
                                        <option value="van">Van / Panel Van</option>
                                        <option value="truck">Truck</option>
                                        <option value="fleet">Fleet (Multiple Vehicles)</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-blue-200 mb-1.5">
                                        Anything else we should know? (Optional)
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-blue-900/50 border-2 border-blue-800 rounded-lg text-white font-medium placeholder:text-blue-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                                        placeholder="E.g. I need 3 vehicles branded..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-blue-950 font-black py-5 rounded-full text-xl transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-widest shadow-2xl border-b-4 border-amber-700 disabled:border-amber-600 flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            RESERVING YOUR SPOT...
                                        </>
                                    ) : (
                                        "🚀 RESERVE MY 25% DISCOUNT"
                                    )}
                                </button>

                                <p className="text-center text-blue-400 text-xs mt-3">
                                    No payment required now. No obligation until you approve the design.
                                    We'll contact you within 24 hours.
                                </p>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
