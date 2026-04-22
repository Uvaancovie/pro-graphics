"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function EstimatorOptIn() {
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/capture-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), firstName: firstName.trim(), lead_magnet: "vehicle-wrap-pricing-estimator" })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setStatus("success");
                setMessage("Success! Check your inbox immediately for your secure access link.");
                setEmail("");
                setFirstName("");
            } else {
                setStatus("error");
                setMessage(data.message || "Failed to submit. Please try again.");
            }
        } catch {
            setStatus("error");
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 py-16 relative overflow-hidden border-y border-blue-800">
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-amber-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-400/10 rounded-full blur-[80px]" />
            
            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <span className="inline-block py-1.5 px-4 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
                    Pricing Transparency
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
                    Don't Pay R40,000 for a Vehicle Wrap <br className="hidden md:block" />
                    <span className="text-amber-400">Before You See This Data.</span>
                </h2>
                <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Get instant access to the <strong className="text-white">Interactive South African Market Rate Estimator</strong>. Know the exact math behind what your fleet branding should cost. No agencies, no BS pricing. 
                </p>

                <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 p-3 rounded-2xl max-w-3xl mx-auto shadow-2xl">
                    {status === "success" ? (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded-xl flex flex-col items-center justify-center gap-3">
                            <CheckCircle2 className="w-10 h-10 text-green-400" />
                            <span className="font-bold text-xl">{message}</span>
                            <span className="text-sm text-blue-200">It takes about 30 seconds to arrive in your inbox.</span>
                        </div>
                    ) : (
                        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3 relative">
                            <input
                                type="text"
                                placeholder="Your First Name"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="flex-1 bg-blue-950/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-blue-300/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all text-base md:text-lg"
                            />
                            <input
                                type="email"
                                placeholder="Your Best Email Address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-[1.5] bg-blue-950/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-blue-300/50 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all text-base md:text-lg"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 border-b-4 border-amber-700 hover:border-amber-600 text-blue-950 font-black px-6 md:px-8 py-4 rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 group text-base md:text-lg shadow-xl shadow-amber-500/20"
                            >
                                {status === "loading" ? "Sending..." : "GET FREE ACCESS NOW"}
                                {status !== "loading" && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    )}
                </div>
                
                {status !== "success" && (
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8 text-sm text-blue-200 font-medium">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Free Tool</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Exact Rands & Cents</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Private & Secure</span>
                    </div>
                )}
            </div>
        </section>
    );
}
