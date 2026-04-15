import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import { HeroCarousel } from "@/app/components/ui/HeroCarousel";
import { SocialProof } from "@/app/components/ui/SocialProof";
import { ROICalculatorPromo } from "@/app/components/ui/ROICalculatorPromo";
import { ProcessTikToks } from "@/app/components/ui/ProcessTikToks";
import { FaqSection } from "@/app/components/ui/FaqSection";

const homeFaqs = [
  {
    question: "How much does vehicle branding cost in Durban?",
    answer:
      "Pricing depends on coverage and vehicle size. Most Durban fleet branding projects start with partial branding and scale up to full wraps based on your campaign goals and route exposure.",
  },
  {
    question: "How long do wraps and signage last?",
    answer:
      "With proper materials and installation, vehicle wraps and sign boards typically last several years in Durban conditions. We also provide care guidance to help maximize lifespan.",
  },
  {
    question: "Do you work with businesses in Umhlanga and Pinetown?",
    answer:
      "Yes. We support businesses across Durban including Umhlanga, Pinetown, Phoenix, and the CBD with vehicle branding, signage, and print solutions.",
  },
  {
    question: "Can you help me choose between sign boards and vehicle branding?",
    answer:
      "Yes. We compare your goals, budget, and audience movement to recommend the right mix. You can also use our ROI calculator and service guides to make an informed choice.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* TikTok Process Section */}
      <ProcessTikToks />

      {/* Trust Indicators */}
      <section className="py-12 bg-blue-900 text-white border-b border-blue-800 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-2">24hr</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-semibold">Quote Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-2">8</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-semibold">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-semibold">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Promo */}
      <ROICalculatorPromo />

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-blue-950 mb-6 leading-tight">
              Our{" "}
              <span className="text-amber-500">
                Signature Branding Solutions
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-800/70 max-w-3xl mx-auto">
              Durban's preferred choice for professional vehicle branding, signage, and custom printing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Vehicle Branding */}
            <Link href="/vehicle-branding" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-gray-100 hover:border-amber-400">
                <div className="h-64 relative">
                  <Image
                    src="/images/ads/vehicle-branding.jpeg"
                    alt="Professional Vehicle Branding and Car Wraps Durban"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Vehicle Branding
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-2">
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
                    alt="Custom Sign Boards and Corporate Signage Durban"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Custom Sign Boards
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-2">
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
                    alt="One-Way Vision Contravisions Window Graphics Durban"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Contravisions
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-2">
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
                    alt="Custom Die-Cut Vinyl Stickers Durban"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Custom Cutout Stickers
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-2">
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

            {/* Promotional Materials */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:border-amber-400 transition-all">
              <div className="h-64 relative">
                <Image
                  src="/images/ads/shop-front-office-branding.jpeg"
                  alt="Shop Front and Office Branding Phoenix Durban"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={70}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-3">
                  Promotional Branding
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
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

            {/* Black Roof Wraps */}
            <Link href="/black-roof-wraps" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-gray-100 hover:border-amber-400">
                <div className="h-64 relative">
                  <Image
                    src="/testimonials/black-roof-wraps.jpg"
                    alt="Black Roof Wrap Service Durban"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Black Roof Wraps
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    Premium gloss, satin, or matte black roof wraps for a clean sport finish and paint protection.
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

            {/* Custom Canvas */}
            <Link href="/custom-canvas" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-gray-100 hover:border-amber-400">
                <div className="h-64 relative">
                  <Image
                    src="/testimonials/custom-canvas.jpg"
                    alt="Custom Canvas Printing Durban"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Custom Canvas
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    High-resolution custom canvas prints for office walls, reception areas, and branded interiors.
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

            {/* Custom Wallpaper */}
            <Link href="/custom-wallpaper" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-gray-100 hover:border-amber-400">
                <div className="h-64 relative">
                  <Image
                    src="/testimonials/custom-wallpaper.jpg"
                    alt="Custom Wallpaper Printing Durban"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Custom Wallpaper
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    Branded wall graphics and wallpaper for retail, offices, and feature walls with professional installation.
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

            {/* Lamin-X Headlight Film */}
            <Link href="/laminex-headlight-film" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-gray-100 hover:border-amber-400">
                <div className="h-64 relative">
                  <Image
                    src="/testimonials/laminex-headlight-film.jpg"
                    alt="Lamin-X Headlight Film Durban"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-3 group-hover:text-amber-600 transition-colors">
                    Lamin-X Headlight Film
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    Durable tinted and clear protective headlight film to reduce chips, haze, and UV wear.
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
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <SocialProof />

      {/* Why Choose Us */}
      <section className="py-20 bg-white border-t border-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-950 mb-16 leading-tight">
              Why Businesses Choose{" "}
              <span className="text-amber-500">
                Pro Graphics
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-blue-100 transition-colors">
                  <span className="text-5xl">01</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-4">Education-First Approach</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Like Signarama's buyer's guide strategy, we educate you on materials, processes, and ROI so you make informed decisions.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-amber-100 transition-colors">
                  <span className="text-5xl">02</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-4">Premium Quality Materials</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We use only 3M, Avery Dennison, and other industry-leading materials. No cheap alternatives that fail in 6 months.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-blue-100 transition-colors">
                  <span className="text-5xl">03</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-4">Value-Driven Pricing</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We offer competitive, volume-based estimates. No hidden fees, no surprises. You get the best possible ROI on your branding investment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Frequently Asked Questions"
        intro="Answers to the most common Durban branding questions before you request a quote."
        faqs={homeFaqs}
        className="py-20 bg-gray-50 border-t border-gray-200"
      />

      {/* CTA Section */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto font-light">
            Get a free, detailed quote within 24 hours. No obligation. No pressure. Just honest advice.
          </p>
          <Link href="/quote">
            <Button variant="secondary" size="lg" className="text-lg sm:text-2xl px-10 sm:px-16 py-6 sm:py-8 shadow-2xl hover:scale-105 transition-transform bg-amber-500 hover:bg-amber-600 text-white border-none font-bold">
              Get Your Free Quote Now
            </Button>
          </Link>
          <p className="mt-8 text-blue-200 text-base sm:text-lg">
            Or call us at <strong className="text-amber-400 text-lg sm:text-xl hover:text-white transition-colors"><a href="tel:0659424036">065 9424 036</a></strong>
          </p>
        </div>
      </section>
    </main>
  );
}
