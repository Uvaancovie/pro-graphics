import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

export const metadata: Metadata = {
    title: "The Branding Blueprint | Premium Fleet Assessment | Pro Graphics",
    description: "Stop bleeding revenue with unbranded vehicles. Book your free R9,500 value Branding Blueprint assessment today.",
};

export default function BrandingBlueprintPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-white text-gray-900 py-16 md:py-24 relative overflow-hidden border-b border-gray-100">
                <div className="absolute inset-0 bg-[url('/images/gallery/grid-pattern.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Text Column */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-block bg-amber-600 text-white font-bold px-4 py-1 rounded-full text-sm tracking-wider uppercase mb-6">
                                Exclusive Durban Fleet Offer
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-black">
                                Turn Your Vehicles Into <span className="text-blue-950">Revenue-Generating Assets</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                                Our 4-step "Branding Blueprint" engineers custom mobile billboards designed specifically for Durban traffic patterns.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link href="#booking-form">
                                    <Button className="bg-amber-500 text-black hover:bg-blue-950 hover:text-white text-lg px-8 py-4 font-bold border-none transition-colors">
                                        Claim Your Free Assessment
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
                            <div className="absolute inset-0 bg-blue-950 rounded-3xl transform translate-x-4 translate-y-4 opacity-10"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                                <img
                                    src="/images/content/4.jpeg"
                                    alt="Professional fleet branding by Pro Graphics"
                                    className="w-full h-auto object-cover aspect-[4/3]"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-950/90 to-transparent p-6 text-white text-center">
                                    <p className="font-bold text-lg">High-Visibility Branding that Drives Leads</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Blueprint Values */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-blue-950 mb-4">
                            What's Included in the Blueprint?
                        </h2>
                        <p className="text-xl text-gray-600">
                            A detailed, data-driven strategy session focusing on maximizing your ROI.
                            <br className="hidden md:block" /> Total Value: <span className="font-bold text-gray-900 line-through">R9,500</span> <span className="text-amber-600 font-extrabold ml-2">FREE*</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-blue-950 text-amber-500 rounded-full flex items-center justify-center text-2xl font-bold mb-6">1</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Fleet Assessment</h3>
                            <p className="text-amber-600 font-semibold mb-4 text-sm">R2,500 Value</p>
                            <ul className="text-gray-600 space-y-2 text-sm list-disc pl-4">
                                <li>Route analysis for maximum exposure.</li>
                                <li>Vehicle condition audit.</li>
                                <li>Compliance check for SA regulations.</li>
                            </ul>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-blue-950 text-amber-500 rounded-full flex items-center justify-center text-2xl font-bold mb-6">2</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Design</h3>
                            <p className="text-amber-600 font-semibold mb-4 text-sm">R4,500 Value</p>
                            <ul className="text-gray-600 space-y-2 text-sm list-disc pl-4">
                                <li>3 custom concepts based on routes.</li>
                                <li>Color psychology targeting your market.</li>
                                <li>Contact optimization for Durban.</li>
                            </ul>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-blue-950 text-amber-500 rounded-full flex items-center justify-center text-2xl font-bold mb-6">3</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Material Specs</h3>
                            <p className="text-amber-600 font-semibold mb-4 text-sm">R1,500 Value</p>
                            <ul className="text-gray-600 space-y-2 text-sm list-disc pl-4">
                                <li>3M/Avery formulation for humidity.</li>
                                <li>Durability projections.</li>
                                <li>Custom maintenance schedule.</li>
                            </ul>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-blue-950 text-amber-500 rounded-full flex items-center justify-center text-2xl font-bold mb-6">4</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Installation Guarantee</h3>
                            <p className="text-amber-600 font-semibold mb-4 text-sm">R1,000 Value</p>
                            <ul className="text-gray-600 space-y-2 text-sm list-disc pl-4">
                                <li>48-hour turn-around installation.</li>
                                <li>3-year comprehensive warranty.</li>
                                <li>Free repairs for peeling or fading.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-12 text-sm text-gray-500">
                        *Your Investment: FREE with any branding order over R15,000, or R2,500 standalone (credited toward future order).
                    </div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section id="booking-form" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-extrabold text-blue-950 mb-4">Book Your Free Assessment</h2>
                            <p className="text-gray-600">
                                Fill out the form below. Our team will contact you within 24 hours to schedule your strategy session.
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Siyabonga" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Transport Logistics" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="082 123 4567" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="name@company.co.za" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Fleet Size</label>
                                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500">
                                    <option>1-3 Vehicles</option>
                                    <option>4-10 Vehicles</option>
                                    <option>11-25 Vehicles</option>
                                    <option>25+ Vehicles</option>
                                </select>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full bg-primary-blue hover:bg-blue-800 text-white text-lg font-bold py-5 rounded-xl shadow-lg transition-all transform hover:-translate-y-1">
                                    Lock In My Assessment Session
                                </Button>
                                <p className="text-center text-xs text-gray-400 mt-4">
                                    By submitting, you agree to our privacy policy. Love your designs or pay nothing. Keep the concepts anyway.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
}
