import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, Eye, ShieldCheck, Banknote, Car, ChartBar } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'The Hidden Cost of Unbranded Vehicles | Fleet Branding ROI | Pro Graphics Durban',
    description: 'Discover why driving an unbranded commercial vehicle is costing your business thousands in lost revenue and how vehicle wrapping offers the highest ROI in advertising.',
};

export default function ROIEducationalPage() {
    return (
        <article className="min-h-screen bg-gray-50 pb-24 pt-32">
            {/* Hero Section */}
            <div className="bg-blue-950 text-white relative overflow-hidden py-24 mb-16">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 font-bold text-sm px-4 py-2 rounded-full border border-amber-500/30 mb-8 uppercase tracking-widest">
                        Marketing Insights
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        The Invisible Expense: <span className="text-amber-500">How Unbranded Vehicles Bleed Revenue</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-200 font-light max-w-2xl mx-auto">
                        Every day your commercial fleet hits the road without branding, you are paying a massive opportunity cost. Let's break down the true ROI of vehicle branding.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="prose prose-lg prose-blue max-w-none text-gray-700">
                    <p className="text-xl leading-relaxed mb-10 text-gray-600 font-medium">
                        Imagine paying for a massive digital billboard in the heart of Durban, but leaving it completely blank. Sound absurd? That is exactly what happens when your business vehicles operate without professional branding. 
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-16">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
                            <Eye className="w-12 h-12 text-amber-500 mb-6" />
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">30,000 - 70,000</h3>
                            <p className="text-gray-600">The number of daily impressions a single branded vehicle generates on busy city roads and highways.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-transform hover:-translate-y-1">
                            <Banknote className="w-12 h-12 text-amber-500 mb-6" />
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">R0.75 CPM</h3>
                            <p className="text-gray-600">Cost per thousand impressions for vehicle wraps. Compare this to R65 for outdoor billboards or R250+ for digital ads.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-blue-950 mt-12 mb-6 flex items-center gap-3">
                        <TrendingUp className="text-amber-500" /> Lowest Cost, Highest Impact
                    </h2>
                    <p className="mb-6">
                        Vehicle wrapping is widely considered the most effective form of out-of-home (OOH) advertising available today. Unlike radio, TV, or social media ads that require continuous recurring budget, a vehicle wrap is a one-time investment that pays dividends for 3 to 5 years.
                    </p>
                    <p className="mb-12">
                        When amortized over the lifespan of a premium vinyl wrap, the cost per impression (CPM) plummets to just fractions of a cent. For local service businesses—plumbers, electricians, florists, and delivery fleets—your vehicles are already in your target deployment zones. Why not let them generate leads while stuck in traffic?
                    </p>

                    <h2 className="text-3xl font-bold text-blue-950 mt-12 mb-6 flex items-center gap-3">
                        <ShieldCheck className="text-amber-500" /> Building Immediate Trust
                    </h2>
                    <div className="bg-blue-50 border-l-4 border-blue-950 p-6 rounded-r-xl mb-12">
                        <p className="italic text-gray-800 font-medium m-0">
                            "98% of in-car audiences indicated they noticed truck-side ads. Furthermore, consumers perceive companies with branded fleets as more purely professional and established." — American Trucking Association.
                        </p>
                    </div>
                    <p className="mb-12">
                        Would you rather invite a plain white van into your driveway, or a clean, professionally branded vehicle with a clear company name, logo, and contact number? Vehicle wrapping isn't just about marketing; it's about establishing legitimacy, trust, and peace of mind with your clients before the technician even steps out of the car.
                    </p>

                    <h2 className="text-3xl font-bold text-blue-950 mt-12 mb-6 flex items-center gap-3">
                        <ChartBar className="text-amber-500" /> The Real ROI Calculation
                    </h2>
                    <p className="mb-6">
                        Let's run a conservative thought experiment. If your unbranded vehicle passes 10,000 potential customers a day, over a standard 250-day working year, that's <strong>2.5 million missed impressions annually</strong>.
                    </p>
                    <p className="mb-12">
                        If a high-quality wrap leads to just <strong>one or two extra jobs a month</strong>, the wrap pays for itself within the first quarter. For the remaining 3 to 5 years of the wrap's lifespan, that rolling billboard generates pure profit.
                    </p>

                    {/* CTA Section */}
                    <div className="mt-16 bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl relative overflow-hidden">
                        <Car className="w-48 h-48 text-white/[0.03] absolute -bottom-10 -right-10 pointer-events-none transform -scale-x-100 rotate-12" />
                        
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Ready to Stop Losing Money?</h2>
                        <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto">
                            Transform your fleet into a 24/7 lead-generation machine. Get a custom mock-up and quote for your vehicle branding today.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                            <Link href="/vehicle-branding">
                                <span className="inline-block bg-amber-500 hover:bg-amber-600 text-blue-950 font-black py-4 px-10 rounded-full transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(245,158,11,0.4)] md:min-w-[44px] md:min-h-[44px]">
                                    EXPLORE VEHICLE WRAPS
                                </span>
                            </Link>
                            <Link href="/quote">
                                <span className="inline-block bg-transparent hover:bg-blue-800 border-2 border-white/30 text-white font-bold py-4 px-10 rounded-full transition-colors md:min-w-[44px] md:min-h-[44px]">
                                    REQUEST A QUOTE
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
