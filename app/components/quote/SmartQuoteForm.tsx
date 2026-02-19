"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quickQuoteSchema, detailedQuoteSchema, type QuoteFormData } from "@/lib/schemas/quote-schema";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const serviceOptions = [
    { value: "vehicle-branding", label: "🚗 Vehicle Branding", icon: "🚗" },
    { value: "sign-boards", label: "📋 Custom Sign Boards", icon: "📋" },
    { value: "contravisions", label: "🪟 Contravisions (Window Graphics)", icon: "🪟" },
    { value: "custom-stickers", label: "✂️ Custom Cutout Stickers", icon: "✂️" },
    { value: "banners-flags", label: "🚩 Banners & Flags", icon: "🚩" },
    { value: "promotional-materials", label: "🎁 Promotional Materials", icon: "🎁" },
];

export function SmartQuoteForm() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isQuickQuote, setIsQuickQuote] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue,
    } = useForm<QuoteFormData>({
        resolver: zodResolver(isQuickQuote ? quickQuoteSchema : detailedQuoteSchema) as any,
        mode: "onBlur",
    });

    const selectedService = watch("serviceType");
    const watchedValues = watch();

    // Load from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem("quoteFormData");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                Object.keys(parsed).forEach((key) => {
                    setValue(key as any, parsed[key]);
                });
                if (parsed.isQuickQuote !== undefined) {
                    setIsQuickQuote(parsed.isQuickQuote);
                }
            } catch (e) {
                console.error("Failed to parse saved form data", e);
            }
        }
        setIsLoaded(true);
    }, [setValue]);

    // Save to localStorage
    useEffect(() => {
        if (!isLoaded) return;
        const timeout = setTimeout(() => {
            localStorage.setItem("quoteFormData", JSON.stringify({ ...watchedValues, isQuickQuote }));
        }, 1000);
        return () => clearTimeout(timeout);
    }, [watchedValues, isQuickQuote, isLoaded]);

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form Data:", data);
        console.log("Uploaded Files:", uploadedFiles);
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Clear persistence
        localStorage.removeItem("quoteFormData");
        reset();
        setUploadedFiles([]);

        setTimeout(() => setSubmitSuccess(false), 5000);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUploadedFiles(Array.from(e.target.files));
        }
    };

    if (!isLoaded) {
        return <div className="max-w-4xl mx-auto h-[600px] bg-gray-100 animate-pulse rounded-xl"></div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            {submitSuccess && (
                <div className="mb-6 p-6 bg-green-50 border-2 border-green-500 rounded-xl animate-pulse">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">✅</span>
                        <div>
                            <h3 className="text-lg font-bold text-black">Quote Request Submitted!</h3>
                            <p className="text-black font-medium">We'll get back to you within 24 hours with a detailed quote.</p>
                        </div>
                    </div>
                </div>
            )}

            <Card className="shadow-2xl border-2 border-black/10">
                <CardHeader className="bg-black text-white p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <CardTitle className="text-3xl text-amber-400 font-bold">Get Your Free Quote</CardTitle>
                            <CardDescription className="text-gray-200 text-lg mt-1">
                                {isQuickQuote ? "Super fast 30-second request" : "Detailed quote within 24 hours"}
                            </CardDescription>
                        </div>

                        {/* Quick Quote Toggle */}
                        <div className="flex items-center gap-3 bg-white/10 p-2 rounded-full border border-white/20">
                            <span className={cn("text-sm font-bold transition-colors cursor-pointer", isQuickQuote ? "text-gray-400" : "text-amber-400")} onClick={() => setIsQuickQuote(false)}>Detailed</span>
                            <button
                                onClick={() => setIsQuickQuote(!isQuickQuote)}
                                className={cn(
                                    "relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none",
                                    isQuickQuote ? "bg-amber-500" : "bg-gray-600"
                                )}
                            >
                                <span
                                    className={cn(
                                        "absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-md",
                                        isQuickQuote ? "translate-x-6" : "translate-x-0"
                                    )}
                                />
                            </button>
                            <span className={cn("text-sm font-bold transition-colors cursor-pointer", isQuickQuote ? "text-amber-400" : "text-gray-400")} onClick={() => setIsQuickQuote(true)}>Quick</span>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-6 md:p-8 bg-white">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2 border-b-2 border-black pb-2">
                                <span className="text-2xl">👤</span> Your Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">
                                        Full Name <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        {...register("fullName")}
                                        className={cn(
                                            "w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all bg-white text-black font-medium placeholder:text-gray-500",
                                            errors.fullName ? "border-red-500" : "border-gray-200"
                                        )}
                                        placeholder="John Doe"
                                    />
                                    {errors.fullName && (
                                        <p className="mt-1 text-sm text-red-600 font-bold">{errors.fullName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">
                                        Email Address <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        className={cn(
                                            "w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all bg-white text-black font-medium placeholder:text-gray-500",
                                            errors.email ? "border-red-500" : "border-gray-200"
                                        )}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 font-bold">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">
                                        Phone Number <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        {...register("phone")}
                                        type="tel"
                                        className={cn(
                                            "w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all bg-white text-black font-medium placeholder:text-gray-500",
                                            errors.phone ? "border-red-500" : "border-gray-200"
                                        )}
                                        placeholder="e.g. 082 123 4567"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600 font-bold">{errors.phone.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">
                                        Company Name (Optional)
                                    </label>
                                    <input
                                        {...register("company")}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all bg-white text-black font-medium placeholder:text-gray-500"
                                        placeholder="Your Company"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Service Selection */}
                        <div>
                            <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2 border-b-2 border-black pb-2">
                                <span className="text-2xl">🎯</span> What Service Do You Need?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {serviceOptions.map((service) => (
                                    <label
                                        key={service.value}
                                        className={cn(
                                            "relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md",
                                            selectedService === service.value
                                                ? "border-amber-400 bg-amber-50"
                                                : "border-gray-200 hover:border-black bg-white"
                                        )}
                                    >
                                        <input
                                            {...register("serviceType")}
                                            type="radio"
                                            value={service.value}
                                            className="sr-only"
                                        />
                                        <span className="text-2xl mr-3">{service.icon}</span>
                                        <span className="font-bold text-sm text-black">
                                            {service.label.replace(service.icon + " ", "")}
                                        </span>
                                        {selectedService === service.value && (
                                            <div className="absolute top-2 right-2 w-3 h-3 bg-amber-500 rounded-full"></div>
                                        )}
                                    </label>
                                ))}
                            </div>
                            {errors.serviceType && (
                                <p className="mt-2 text-sm text-red-600 font-bold">{errors.serviceType.message}</p>
                            )}
                        </div>

                        {/* Detailed Fields - Conditionally Rendered */}
                        <AnimatePresence>
                            {!isQuickQuote && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-8 overflow-hidden"
                                >
                                    {/* Service Specifics */}
                                    {selectedService && (
                                        <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                                            <h4 className="font-bold text-black mb-4 text-lg">Specific Details</h4>

                                            {selectedService === "vehicle-branding" && (
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-bold text-black mb-2">Vehicle Type</label>
                                                        <input {...register("vehicleType")} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-medium" placeholder="Vehicle Model" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-black mb-2">Coverage Level</label>
                                                        <select {...register("coverageLevel")} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-medium">
                                                            <option value="">Select coverage</option>
                                                            <option value="spot">Spot Graphics</option>
                                                            <option value="partial">Partial Wrap</option>
                                                            <option value="full">Full Wrap</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )}

                                            {selectedService === "sign-boards" && (
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-bold text-black mb-2">Material</label>
                                                        <select {...register("signMaterial")} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-medium">
                                                            <option value="">Select material</option>
                                                            <option value="chromadek">Chromadek</option>
                                                            <option value="abs">ABS Plastic</option>
                                                            <option value="perspex">Perspex</option>
                                                            <option value="custom">Not Sure</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-black mb-2">Dimensions</label>
                                                        <input {...register("signDimensions")} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-black font-medium" placeholder="1200mm x 600mm" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Project Details */}
                                    <div>
                                        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2 border-b-2 border-black pb-2">
                                            <span className="text-2xl">📝</span> Project Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-black mb-2">
                                                    Project Description <span className="text-red-600">*</span>
                                                </label>
                                                <textarea
                                                    {...register("projectDescription")}
                                                    rows={4}
                                                    className={cn(
                                                        "w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all bg-white text-black font-medium placeholder:text-gray-500",
                                                        errors.projectDescription ? "border-red-500" : "border-gray-200"
                                                    )}
                                                    placeholder="Tell us about your project..."
                                                />
                                                {errors.projectDescription && (
                                                    <p className="mt-1 text-sm text-red-600 font-bold">{errors.projectDescription.message}</p>
                                                )}
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-black mb-2">Budget Range <span className="text-red-600">*</span></label>
                                                    <select
                                                        {...register("budget")}
                                                        className={cn(
                                                            "w-full px-4 py-3 border-2 rounded-lg text-black font-medium bg-white",
                                                            errors.budget ? "border-red-500" : "border-gray-200"
                                                        )}
                                                    >
                                                        <option value="">Select budget</option>
                                                        <option value="under-5k">Under R5,000</option>
                                                        <option value="5k-15k">R5,000 - R15,000</option>
                                                        <option value="15k-30k">R15,000 - R30,000</option>
                                                        <option value="30k-50k">R30,000 - R50,000</option>
                                                        <option value="50k-plus">R50,000+</option>
                                                    </select>
                                                    {errors.budget && (
                                                        <p className="mt-1 text-sm text-red-600 font-bold">{errors.budget.message}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-black mb-2">Timeline <span className="text-red-600">*</span></label>
                                                    <select
                                                        {...register("timeline")}
                                                        className={cn(
                                                            "w-full px-4 py-3 border-2 rounded-lg text-black font-medium bg-white",
                                                            errors.timeline ? "border-red-500" : "border-gray-200"
                                                        )}
                                                    >
                                                        <option value="">Select timeline</option>
                                                        <option value="urgent">Urgent (ASAP)</option>
                                                        <option value="1-2-weeks">1-2 Weeks</option>
                                                        <option value="2-4-weeks">2-4 Weeks</option>
                                                        <option value="flexible">Flexible</option>
                                                    </select>
                                                    {errors.timeline && (
                                                        <p className="mt-1 text-sm text-red-600 font-bold">{errors.timeline.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* File Upload */}
                                    <div>
                                        <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2 border-b-2 border-black pb-2">
                                            <span className="text-2xl">📎</span> Files
                                        </h3>
                                        <div className="border-2 border-dashed border-gray-400 rounded-xl p-8 text-center hover:border-black transition-all group bg-gray-50">
                                            <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" accept=".pdf,.ai,.psd,.jpg,.jpeg,.png,.svg" />
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                <div className="text-5xl mb-3 text-gray-400 group-hover:text-black transition-colors">📁</div>
                                                <p className="text-black font-bold mb-2">Click to upload</p>
                                                <p className="text-sm text-black font-medium">PDF, AI, PSD, JPG, PNG (Max 10MB)</p>
                                            </label>
                                            {uploadedFiles.length > 0 && (
                                                <div className="mt-4 text-left p-4 bg-white rounded-lg border-2 border-black">
                                                    <p className="font-bold text-black mb-2">Uploaded Files:</p>
                                                    <ul className="space-y-1 text-black font-medium">
                                                        {uploadedFiles.map((file, index) => <li key={index}>• {file.name}</li>)}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Additional Notes (for Quick Quote mostly) */}
                        {isQuickQuote && (
                            <div>
                                <label className="block text-sm font-bold text-black mb-2">
                                    Additional Notes (Optional)
                                </label>
                                <textarea
                                    {...register("additionalNotes")}
                                    rows={3}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all bg-white text-black font-medium placeholder:text-gray-500"
                                    placeholder="Briefly describe what you need..."
                                />
                            </div>
                        )}


                        {/* Submit */}
                        <div className="pt-6">
                            <Button type="submit" size="lg" className="w-full text-xl py-6 bg-black hover:bg-gray-800 text-white border-2 border-black font-bold shadow-lg" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : (isQuickQuote ? "🚀 Request Quick Quote" : "🚀 Get Detailed Quote")}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
