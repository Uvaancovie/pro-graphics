import { Link } from "react-router-dom";
import { TrendingUp, Eye, Award, Lightbulb, Calculator, ArrowRight, CheckCircle2, ShieldCheck, DollarSign } from "lucide-react";

export function ROICalculatorPromo() {
    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-blue-950">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950" />
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
                {/* Glowing orbs */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Sub-headline */}
                <p className="text-center text-base sm:text-lg md:text-xl text-blue-200/80 max-w-3xl mx-auto mb-14 leading-relaxed">
                    Every kilometre your plain commercial vehicle travels through Durban, you&apos;re missing out on
                    <strong className="text-white font-bold"> thousands of Rand</strong> in continuous marketing exposure.
                    Our ROI calculator calculates your exact projection.
                </p>

                {/* Stats + CTA Layout */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-12 gap-8 items-center">
                        {/* Left: Shocking Stats */}
                        <div className="md:col-span-5 space-y-6">
                            {/* Stat Card 1 */}
                            <div className="group bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 hover:border-amber-500/30">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-red-500/15 text-red-400 rounded-xl flex items-center justify-center border border-red-500/20">
                                        <TrendingUp className="w-6 h-6 rotate-180" />
                                    </div>
                                    <div>
                                        <div className="text-2xl sm:text-3xl font-black text-white mb-1">R127,500</div>
                                        <p className="text-blue-300 text-sm leading-relaxed">
                                            Average <strong className="text-amber-400">annual brand value lost</strong> per unbranded vehicle driving 50km/day in Durban CBD
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stat Card 2 */}
                            <div className="group bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 hover:border-amber-500/30">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-amber-500/15 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20">
                                        <Eye className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-2xl sm:text-3xl font-black text-white mb-1">42,500+</div>
                                        <p className="text-blue-300 text-sm leading-relaxed">
                                            <strong className="text-amber-400">Daily impressions wasted</strong> on Durban highways and arterial routes
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stat Card 3 */}
                            <div className="group bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 hover:border-amber-500/30">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/15 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-2xl sm:text-3xl font-black text-white mb-1">30x ROI</div>
                                        <p className="text-blue-300 text-sm leading-relaxed">
                                            Vehicle branding delivers <strong className="text-amber-400">the highest lifetime return</strong> of any outdoor marketing medium
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: CTA Card */}
                        <div className="md:col-span-7">
                            <div className="relative bg-gradient-to-br from-blue-900/80 to-blue-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden">
                                {/* Corner glow */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/20 rounded-full blur-[80px]" />
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-[60px]" />

                                <div className="relative z-10">
                                    {/* Mini calculator preview */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                                            <Calculator className="w-5 h-5 text-blue-950" />
                                        </div>
                                        <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">Fleet ROI Calculator</span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                                        Calculate <span className="text-amber-400">Exact Fleet Potential</span>
                                    </h3>

                                    <p className="text-blue-200/80 mb-6 leading-relaxed text-sm sm:text-base">
                                        Input your vehicle count, daily route mileage, and operating areas — our tool provides instant projected reach and branding ROI.
                                    </p>

                                    {/* preview stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        <div className="bg-white/[0.06] border border-white/10 rounded-xl p-4 text-center">
                                            <div className="text-xs text-blue-300 uppercase tracking-wider mb-1 font-semibold">Daily Loss</div>
                                            <div className="text-xl font-black text-red-400">R4,250</div>
                                        </div>
                                        <div className="bg-white/[0.06] border border-white/10 rounded-xl p-4 text-center">
                                            <div className="text-xs text-blue-300 uppercase tracking-wider mb-1 font-semibold">Monthly</div>
                                            <div className="text-xl font-black text-red-400">R127,500</div>
                                        </div>
                                        <div className="bg-white/[0.06] border border-white/10 rounded-xl p-4 text-center">
                                            <div className="text-xs text-blue-300 uppercase tracking-wider mb-1 font-semibold">Annual</div>
                                            <div className="text-xl font-black text-red-400">R1.53M</div>
                                        </div>
                                    </div>
                                    <p className="text-blue-400/70 text-xs text-center -mt-5 mb-6">* Based on 10 vehicles, 50km/day in greater Durban</p>

                                    {/* CTA Button */}
                                    <Link
                                        to="/roi-calculator"
                                        className="group flex items-center justify-center gap-3 w-full text-center bg-amber-500 hover:bg-amber-400 text-blue-950 font-black py-4 sm:py-5 px-6 sm:px-8 rounded-2xl text-base sm:text-lg uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                                    >
                                        <span>Calculate My Fleet Exposure</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>

                                    {/* Trust footer */}
                                    <div className="flex items-center justify-center gap-4 mt-5">
                                        <span className="flex items-center gap-1.5 text-blue-200/70 text-xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                                            100% Free
                                        </span>
                                        <span className="text-blue-800">|</span>
                                        <span className="flex items-center gap-1.5 text-blue-200/70 text-xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                                            30-Second Audit
                                        </span>
                                        <span className="text-blue-800">|</span>
                                        <span className="flex items-center gap-1.5 text-blue-200/70 text-xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                                            Durban Specific
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom persuasion bar */}
                <div className="max-w-4xl mx-auto mt-14">
                    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl flex items-center justify-center">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                                    You are already paying for fleet fuel, insurance, and maintenance.
                                </h4>
                                <p className="text-blue-200/80 text-sm leading-relaxed">
                                    Your vehicles are on the road every day. Vehicle branding is the <strong className="text-amber-400">only marketing asset that generates daily brand equity</strong> with zero recurring ad spend.
                                </p>
                            </div>
                            <Link
                                to="/roi-calculator"
                                className="flex-shrink-0 bg-white/10 hover:bg-amber-500 text-white hover:text-blue-950 font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 border border-white/20 hover:border-amber-500 whitespace-nowrap"
                            >
                                Calculate ROI
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
