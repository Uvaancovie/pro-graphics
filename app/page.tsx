import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import { HeroCarousel } from "@/app/components/ui/HeroCarousel";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Trust Indicators */}
      <section className="py-12 bg-blue-900 text-white border-b border-blue-800 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">24hr</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-semibold">Quote Response</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">10+</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-semibold">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-semibold">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-blue-950 mb-6">
              Our{" "}
              <span className="text-amber-500">
                Signature Services
              </span>
            </h2>
            <p className="text-xl text-blue-800/70 max-w-3xl mx-auto">
              Industry-leading solutions backed by competitive research and proven conversion strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Vehicle Branding */}
            <Link href="/vehicle-branding" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-gray-100 hover:border-amber-400">
                <div className="h-64 relative">
                  <Image
                    src="/images/ads/vehicle-branding.jpeg"
                    alt="Vehicle Branding"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-4xl">🚗</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Vehicle Branding
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    Turn your fleet into mobile billboards. 30,000-70,000 daily impressions. Good/Better/Best pricing.
                  </p>
                  <div className="flex items-center text-amber-600 font-bold uppercase tracking-wider text-sm group-hover:gap-3 gap-2 transition-all">
                    Learn More
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Sign Boards */}
            <Link href="/sign-boards" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-gray-100 hover:border-amber-400">
                <div className="h-64 relative">
                  <Image
                    src="/images/ads/custom-sign-boards.jpeg"
                    alt="Custom Sign Boards"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-4xl">📋</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Custom Sign Boards
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    Chromadek, ABS, or Perspex - we help you choose the right material for your environment.
                  </p>
                  <div className="flex items-center text-amber-600 font-bold uppercase tracking-wider text-sm group-hover:gap-3 gap-2 transition-all">
                    Learn More
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Contravisions */}
            <Link href="/contravisions" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-gray-100 hover:border-amber-400">
                <div className="h-64 relative">
                  <Image
                    src="/images/ads/contravisions.jpeg"
                    alt="Contravisions"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-4xl">🪟</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Contravisions
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    One-way vision window graphics. Advertise outside, see through inside. Perfect for storefronts.
                  </p>
                  <div className="flex items-center text-amber-600 font-bold uppercase tracking-wider text-sm group-hover:gap-3 gap-2 transition-all">
                    Learn More
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Custom Stickers */}
            <Link href="/custom-stickers" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-gray-100 hover:border-amber-400">
                <div className="h-64 relative">
                  <Image
                    src="/images/ads/custom-cutout-stickers.jpeg"
                    alt="Custom Stickers"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-4xl">✂️</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Custom Cutout Stickers
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    Die-cut to perfection. Transparent bulk pricing. Save up to 60% on volume orders.
                  </p>
                  <div className="flex items-center text-amber-600 font-bold uppercase tracking-wider text-sm group-hover:gap-3 gap-2 transition-all">
                    Learn More
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Banners & Flags - Coming Soon visual update */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group">
              <div className="h-64 relative bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <span className="text-8xl opacity-20">🚩</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-amber-500 text-white px-6 py-2 rounded-full transform -rotate-12 font-bold shadow-lg">COMING SOON</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-3">
                  Banners & Flags
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Eye-catching banners and flags for events, promotions, and permanent installations.
                </p>
                <div className="text-gray-400 font-bold text-sm uppercase tracking-wider">
                  Expanding our range soon
                </div>
              </div>
            </div>

            {/* Promotional Materials */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:border-amber-400 transition-all">
              <div className="h-64 relative">
                <Image
                  src="/images/ads/shop-front-office-branding.jpeg"
                  alt="Promotional Materials"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-4xl">🎁</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-3">
                  Promotional Branding
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Shop front and office branding to elevate your physical presence.
                </p>
                <Link href="/quote" className="text-amber-500 hover:text-amber-600 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  Contact for Quote
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white border-t border-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-blue-950 mb-16">
              Why Businesses Choose{" "}
              <span className="text-amber-500">
                Pro Graphics
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-blue-100 transition-colors">
                  <span className="text-5xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-4">Education-First Approach</h3>
                <p className="text-gray-600 leading-relaxed">
                  Like Signarama's buyer's guide strategy, we educate you on materials, processes, and ROI so you make informed decisions.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-amber-100 transition-colors">
                  <span className="text-5xl">💎</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-4">Premium Quality Materials</h3>
                <p className="text-gray-600 leading-relaxed">
                  We use only 3M, Avery Dennison, and other industry-leading materials. No cheap alternatives that fail in 6 months.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-blue-100 transition-colors">
                  <span className="text-5xl">💰</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-4">Transparent Pricing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Following Ctrl P's model - no hidden fees, no surprises. You see exactly what you're paying for and why.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-2xl text-blue-100 mb-10 max-w-3xl mx-auto font-light">
            Get a free, detailed quote within 24 hours. No obligation. No pressure. Just honest advice.
          </p>
          <Link href="/quote">
            <Button variant="secondary" size="lg" className="text-2xl px-16 py-8 shadow-2xl hover:scale-105 transition-transform bg-amber-500 hover:bg-amber-600 text-white border-none font-bold">
              🚀 Get Your Free Quote Now
            </Button>
          </Link>
          <p className="mt-8 text-blue-200 text-lg">
            Or call us at <strong className="text-amber-400 text-xl hover:text-white transition-colors"><a href="tel:0315086700">031 508 6700</a></strong>
          </p>
        </div>
      </section>
    </main>
  );
}
