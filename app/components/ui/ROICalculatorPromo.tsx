import Link from "next/link";

export function ROICalculatorPromo() {
    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-blue-950">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950" />
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
                {/* Top Eyebrow */}
                <div className="text-center mb-6">
                    <span className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full backdrop-blur-sm">
                        <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                        Free Interactive Tool
                    </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight max-w-5xl mx-auto">
                    Your Unbranded Vehicles Are{" "}
                    <span className="relative inline-block">
                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                            Bleeding Money
                        </span>
                        <span className="absolute bottom-1 left-0 w-full h-3 bg-amber-500/20 -skew-x-6 rounded" />
                    </span>{" "}
                    Every Single Day
                </h2>

                {/* Sub-headline */}
                <p className="text-center text-lg md:text-xl text-blue-200/80 max-w-3xl mx-auto mb-14 leading-relaxed">
                    Every kilometre your plain white van drives through Durban, you&apos;re throwing away
                    <strong className="text-white font-bold"> thousands of rand</strong> in free advertising.
                    Our calculator shows you <em>exactly</em> how much.
                </p>

                {/* Stats + CTA Layout */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-12 gap-8 items-center">
                        {/* Left: Shocking Stats */}
                        <div className="md:col-span-5 space-y-6">
                            {/* Stat Card 1 */}
                            <div className="group bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 hover:border-amber-500/30">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-14 h-14 bg-red-500/15 rounded-xl flex items-center justify-center">
                                        <span className="text-3xl">📉</span>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1">R127,500</div>
                                        <p className="text-blue-300 text-sm leading-relaxed">
                                            Average <strong className="text-amber-400">annual brand value lost</strong> per unbranded vehicle driving 50km/day in Durban CBD
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stat Card 2 */}
                            <div className="group bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 hover:border-amber-500/30">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-14 h-14 bg-amber-500/15 rounded-xl flex items-center justify-center">
                                        <span className="text-3xl">👀</span>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1">42,500+</div>
                                        <p className="text-blue-300 text-sm leading-relaxed">
                                            <strong className="text-amber-400">Daily impressions wasted</strong> — that&apos;s 42,500 people who could see your brand but don&apos;t
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stat Card 3 */}
                            <div className="group bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 hover:border-amber-500/30">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-14 h-14 bg-green-500/15 rounded-xl flex items-center justify-center">
                                        <span className="text-3xl">🔄</span>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-white mb-1">30x ROI</div>
                                        <p className="text-blue-300 text-sm leading-relaxed">
                                            Vehicle branding delivers <strong className="text-amber-400">the highest ROI</strong> of any advertising medium — and it works 24/7
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
                                            <svg className="w-6 h-6 text-blue-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-amber-400 font-bold text-sm uppercase tracking-widest">ROI Calculator</span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                                        See <span className="text-amber-400">Exactly</span> How Much Your Fleet Is Losing
                                    </h3>

                                    <p className="text-blue-200/80 mb-6 leading-relaxed">
                                        Input your fleet size, daily distance, and driving area — our calculator instantly reveals the
                                        <strong className="text-white"> brand value you&apos;re leaving on the table</strong> every month.
                                    </p>

                                    {/* Fake preview stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        <div className="bg-white/[0.06] border border-white/10 rounded-xl p-4 text-center">
                                            <div className="text-xs text-blue-400 uppercase tracking-wider mb-1 font-semibold">Daily Loss</div>
                                            <div className="text-xl font-black text-red-400">R4,250</div>
                                        </div>
                                        <div className="bg-white/[0.06] border border-white/10 rounded-xl p-4 text-center">
                                            <div className="text-xs text-blue-400 uppercase tracking-wider mb-1 font-semibold">Monthly</div>
                                            <div className="text-xl font-black text-red-400">R127,500</div>
                                        </div>
                                        <div className="bg-white/[0.06] border border-white/10 rounded-xl p-4 text-center">
                                            <div className="text-xs text-blue-400 uppercase tracking-wider mb-1 font-semibold">Annual</div>
                                            <div className="text-xl font-black text-red-400">R1.53M</div>
                                        </div>
                                    </div>
                                    <p className="text-blue-400/60 text-xs text-center -mt-5 mb-6">* Example: 10 vehicles, 50km/day, Durban CBD</p>

                                    {/* CTA Button */}
                                    <Link
                                        href="/roi-calculator"
                                        className="group block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-black py-5 px-8 rounded-2xl text-xl uppercase tracking-wider shadow-2xl shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] border-b-4 border-amber-700 hover:border-amber-600"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            🚀 Calculate My Lost Revenue
                                            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </Link>

                                    {/* Trust footer */}
                                    <div className="flex items-center justify-center gap-4 mt-5">
                                        <span className="flex items-center gap-1.5 text-blue-400/60 text-xs">
                                            <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            100% Free
                                        </span>
                                        <span className="text-blue-800">|</span>
                                        <span className="flex items-center gap-1.5 text-blue-400/60 text-xs">
                                            <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Takes 30 Seconds
                                        </span>
                                        <span className="text-blue-800">|</span>
                                        <span className="flex items-center gap-1.5 text-blue-400/60 text-xs">
                                            <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Durban-Specific Data
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
                            <div className="flex-shrink-0 text-5xl">💡</div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-lg font-bold text-white mb-1">
                                    Think about it: You&apos;re already paying for fuel, insurance, and maintenance.
                                </h4>
                                <p className="text-blue-300/80 text-sm leading-relaxed">
                                    Your vehicles are driving <strong className="text-white">anyway</strong>. The only question is: are they driving your brand forward — or driving in silence while your competitors get all the attention? Vehicle branding is the <strong className="text-amber-400">only advertising that appreciates in value</strong> as your fleet grows.
                                </p>
                            </div>
                            <Link
                                href="/roi-calculator"
                                className="flex-shrink-0 bg-white/10 hover:bg-amber-500 text-white hover:text-blue-950 font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 border border-white/20 hover:border-amber-500 whitespace-nowrap"
                            >
                                See Your Numbers →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
