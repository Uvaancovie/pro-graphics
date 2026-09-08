import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { SocialProof } from "@/components/ui/SocialProof";
import { ROICalculatorPromo } from "@/components/ui/ROICalculatorPromo";
import { FaqSection } from "@/components/ui/FaqSection";
import { HomeProductsGallery } from "@/components/ui/HomeProductsGallery";

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

      {/* Trust Indicators */}
      <section className="py-12 bg-blue-900 text-white border-b border-blue-800 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* FIFA World Cup 2026 Special Showcase Section */}
      <section className="py-20 bg-[#070e17] text-white relative overflow-hidden border-b border-gray-950">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00a651]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#d4a843]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              
              {/* Text / Info Card */}
              <div className="lg:w-5/12 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-[#00a651]/20 border border-[#00a651]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  🏆 Special Limited Release
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase">
                  FIFA WORLD CUP <span className="text-[#d4a843]">2026™</span>
                  <span className="block text-xl sm:text-2xl font-bold text-white normal-case mt-2 tracking-normal">
                    Legend Poster Collection
                  </span>
                </h2>
                
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                  Celebrate football history with Durban's premium poster collection. Get high-definition 250gsm photo satin prints of 36 iconic legends — including Messi, Cristiano Ronaldo, Mbappé, Haaland, and Bellingham.
                </p>

                {/* Offer Bullet points */}
                <ul className="space-y-3 pt-2">
                  <li className="flex items-center gap-3 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#d4a843] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>36 Legend options in A3, A2, or A1 sizes</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#d4a843] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Premium framing & block mount options</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-[#d4a843] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-400 font-semibold">Buy 3 or more, Save 20% auto-applied</span>
                  </li>
                </ul>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/world-cup"
                    className="inline-flex items-center justify-center bg-[#d4a843] hover:bg-[#c29837] text-[#070e17] px-8 py-3.5 rounded-xl font-bold text-base transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#d4a843]/15"
                  >
                    Browse All 36 Posters
                  </Link>
                  <Link
                    to="/quote?product=world-cup-legend-posters"
                    className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/20 px-8 py-3.5 rounded-xl font-bold text-base transition-colors"
                  >
                    Quick Quote
                  </Link>
                </div>
              </div>

              {/* Poster Showcase Grid (Vibrant Teaser Cards) */}
              <div className="lg:w-7/12 w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: "Lionel Messi", img: "/world-cup-posters/lionel-messi.jpg" },
                  { name: "Cristiano Ronaldo", img: "/world-cup-posters/cristian-ronaldo.jpg" },
                  { name: "Kylian Mbappé", img: "/world-cup-posters/kylian-mbappe.jpg" },
                  { name: "Jude Bellingham", img: "/world-cup-posters/jude-bellingham.jpg" },
                ].map((p) => (
                  <Link
                    key={p.name}
                    to="/world-cup"
                    className="group bg-[#0e1b2b] rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-[#d4a843]/30 transition-all hover:scale-105 relative"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden bg-gray-900">
                      <img
                        src={p.img}
                        alt={`${p.name} Poster`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070e17] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                        <p className="text-white text-xs sm:text-sm font-black truncate">{p.name}</p>
                        <span className="text-[10px] text-[#00a651] font-bold">Limited Edition</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Promo */}
      <ROICalculatorPromo />

      <HomeProductsGallery />

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

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-lg sm:text-xl md:text-lg text-blue-100 mb-10 max-w-3xl mx-auto font-light">
            Get a free, detailed quote within 24 hours. No obligation. No pressure. Just honest advice.
          </p>
          <Link to="/quote">
            <Button variant="secondary" size="lg" className="text-lg sm:text-lg px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:scale-105 transition-transform bg-amber-500 hover:bg-amber-600 text-white border-none font-bold">
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
