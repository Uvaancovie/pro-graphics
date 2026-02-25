"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function PriceBeatClient() {
    const [formData, setFormData] = useState({
        name: "",
        business: "",
        phone: "",
        email: "",
        vehicleType: "",
        message: "",
    });
    const [quoteFile, setQuoteFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setQuoteFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError("");
        if (!quoteFile) {
            alert("Please attach your verified quote to claim this offer.");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Upload file to Supabase Storage
            const fileExt = quoteFile.name.split('.').pop()?.toLowerCase();
            if (fileExt !== 'jpg' && fileExt !== 'jpeg' && fileExt !== 'png') {
                throw new Error("Due to security policies, only JPG and PNG files are allowed.");
            }
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("price-beat")
                .upload(filePath, quoteFile);

            if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

            // 2. Get Public URL
            const { data: urlData } = supabase.storage
                .from("price-beat")
                .getPublicUrl(filePath);

            const fileUrl = urlData.publicUrl;

            // 3. Insert into price_items table
            const { error: dbError } = await supabase
                .from("price_items")
                .insert([
                    {
                        name: formData.name,
                        business: formData.business,
                        phone: formData.phone,
                        email: formData.email,
                        vehicle_type: formData.vehicleType,
                        message: formData.message,
                        quote_file_url: fileUrl
                    }
                ]);

            if (dbError) throw new Error(`Database error: ${dbError.message}`);

            console.log("Price Beat Lead saved successfully.");
            setIsSubmitted(true);
        } catch (err: any) {
            console.error(err);
            setSubmitError(err.message || "An unexpected error occurred while submitting.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="claim-spot" className="py-20 bg-blue-950 text-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                {/* Lead Capture Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    {isSubmitted ? (
                        <div className="bg-green-900/30 border-2 border-green-500 rounded-2xl p-12 text-center">
                            <CheckCircle size={64} className="mx-auto mb-4 text-green-400" />
                            <h3 className="text-3xl font-black mb-3 text-green-400">Quote Received! 🎉</h3>
                            <p className="text-xl text-green-100 mb-2">
                                We've received your request and the attached quote. A Pro Graphics specialist will verify it and contact you within <strong>24 hours</strong> with your new beaten price.
                            </p>
                            <p className="text-green-300 text-sm mt-4 italic">
                                Keep an eye on your email and phone.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
                            <h3 className="text-2xl font-black text-center mb-2 text-amber-400">
                                Claim Your Price Beat Discount
                            </h3>
                            <p className="text-center text-blue-200 mb-8 text-sm">
                                Submit your details and attach a valid competitor quote. We will beat it by 10%.
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

                                {/* Attachment Field */}
                                <div>
                                    <label className="block text-sm font-bold text-blue-200 mb-1.5">
                                        Attach Verified Quote <span className="text-amber-500">*</span> (JPG or PNG Images Only)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={handleFileChange}
                                            required
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="w-full px-4 py-4 bg-blue-900/50 border-2 border-dashed border-blue-600 rounded-lg text-center flex flex-col items-center justify-center transition-colors hover:border-amber-500 pointer-events-none">
                                            <Upload size={24} className="text-amber-500 mb-2" />
                                            {quoteFile ? (
                                                <span className="text-white font-medium truncate w-full px-4">{quoteFile.name}</span>
                                            ) : (
                                                <span className="text-blue-400 font-medium">Click to upload or drag & drop</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-blue-200 mb-1.5">
                                        Additional Info
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={2}
                                        className="w-full px-4 py-3 bg-blue-900/50 border-2 border-blue-800 rounded-lg text-white font-medium placeholder:text-blue-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                                        placeholder="E.g. The quote is for half-wrap on a Toyota Hilux..."
                                    />
                                </div>

                                {submitError && (
                                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm font-medium">
                                        {submitError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-blue-950 font-black py-5 rounded-full text-xl transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-widest shadow-2xl border-b-4 border-amber-700 disabled:border-amber-600 flex items-center justify-center gap-3 mt-4"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            SUBMITTING...
                                        </>
                                    ) : (
                                        "🚀 CLAIM MY 10% DISCOUNT"
                                    )}
                                </button>

                                <p className="text-center text-blue-400 text-xs mt-3">
                                    Your uploaded quote is strictly confidential and is only used to verify our price beat guarantee.
                                </p>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
