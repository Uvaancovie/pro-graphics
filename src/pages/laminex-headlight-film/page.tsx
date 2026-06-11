import { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";





export default function LaminexHeadlightFilmPage() {
    return (
        <main className="min-h-screen">
            <section className="relative h-[50vh] min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/testimonials/laminex-headlight-film.jpg"
                        alt="Lamin-X Headlight Film"
                        
                        className="object-cover"
                        
                    />
                    <div className="absolute inset-0 bg-blue-950/75 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 drop-shadow-lg">
                        Lamin-X Headlight Film <span className="text-amber-400">Protection</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-10 max-w-3xl mx-auto text-blue-100 font-light drop-shadow-md">
                        Protect headlights from chips and fading while giving your vehicle a clean, custom look.
                    </p>
                    <Link to="/quote">
                        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 text-base sm:text-lg md:text-xl shadow-2xl border-none">
                            Get a Headlight Film Quote
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Impact Resistance</h3>
                            <p className="text-gray-600">Helps reduce damage from road debris, stone chips, and everyday driving hazards.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">UV Defense</h3>
                            <p className="text-gray-600">Protects lens clarity by limiting UV-driven yellowing and long-term haze buildup.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">Style Options</h3>
                            <p className="text-gray-600">Available in clear and tinted options to match your preferred vehicle aesthetic.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-amber-500 relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-8">
                        Ready to Protect Your Headlights?
                    </h2>
                    <Link to="/quote">
                        <Button size="lg" className="bg-blue-950 hover:bg-blue-900 text-white text-xl px-16 py-8 shadow-2xl border-none font-bold">
                            Book Your Install
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
