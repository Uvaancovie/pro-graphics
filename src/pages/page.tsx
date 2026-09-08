import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/Button";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { SocialProof } from "@/components/ui/SocialProof";
import { ROICalculatorPromo } from "@/components/ui/ROICalculatorPromo";
import { FaqSection } from "@/components/ui/FaqSection";
import { HomeProductsGallery } from "@/components/ui/HomeProductsGallery";
import { motion } from "framer-motion";
import { Sparkles, Trophy, BookOpen, ShieldCheck, BadgePercent, ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";

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
      <Seo
        title="Vehicle Branding Durban | Sign Boards & Canvas Printing"
        description="Pro Graphics Durban offers professional vehicle branding, custom sign boards, canvas printing, and more. Get a free quote within 24 hours."
        canonicalUrl="/"
      />
      <HeroCarousel />

      <section className="py-16 lg:py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-900 uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                <span>Featured Project</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-3">
                NeuroWave Marine Craft Branding
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From bespoke concept to Indian Ocean waters — an end-to-end marine vinyl wrap project engineered with premium cast films and precision edge sealing.
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-3 mb-10">
              {[
                {
                  title: "The Challenge",
                  desc: "The client required a distinctive marine wrap that reflected the NeuroWave brand while remaining durable in harsh coastal conditions with constant UV exposure and saltwater spray.",
                  color: "bg-red-50/60 border-red-100",
                  icon: (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  ),
                },
                {
                  title: "The Solution",
                  desc: "Premium marine-grade vinyl wrap with UV-resistant eco-solvent printing, protective overlaminate, and precision computer-cut panels for a seamless fit.",
                  color: "bg-blue-50/60 border-blue-100",
                  icon: (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
                {
                  title: "The Result",
                  desc: "A bold, professional marine wrap that transforms the vessel into a highly visible floating asset while protecting the original hull from UV damage and salt corrosion.",
                  color: "bg-emerald-50/60 border-emerald-100",
                  icon: (
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  className={`rounded-2xl p-6 border ${item.color} shadow-sm`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-white shadow-xs border border-gray-100">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-blue-950 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                "https://hcestxaffzsqlkiedvfx.supabase.co/storage/v1/object/public/boat-branding/WhatsApp%20Image%202026-07-29%20at%2010.45.49.jpeg",
                "https://hcestxaffzsqlkiedvfx.supabase.co/storage/v1/object/public/boat-branding/WhatsApp%20Image%202026-07-29%20at%2010.45.49%20(1).jpeg",
              ].map((src, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                  <img
                    src={src}
                    alt={`NeuroWave marine craft branding photo ${i + 1}`}
                    className="w-full aspect-[16/9] object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/case-studies/neuro-wave-boat-branding"
                className="inline-flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-md"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-blue-900 text-white border-b border-blue-800 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-400 mb-1">24hr</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-semibold">Quote Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-400 mb-1">8+ Years</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-semibold">Industry Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-400 mb-1">100%</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-semibold">Quality Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* FIFA World Cup 2026 Special Showcase Section */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-b border-slate-900">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00a651]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#d4a843]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              
              {/* Text / Info Card */}
              <div className="lg:w-5/12 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-[#00a651]/20 border border-[#00a651]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                  <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Special Limited Release</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight uppercase">
                  FIFA WORLD CUP <span className="text-[#d4a843]">2026™</span>
                  <span className="block text-xl sm:text-2xl font-bold text-white normal-case mt-2 tracking-normal">
                    Legend Poster Collection
                  </span>
                </h2>
                
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  Celebrate football history with Durban&apos;s premium poster collection. Get high-definition 250gsm photo satin prints of 36 iconic legends — including Messi, Cristiano Ronaldo, Mbappé, Haaland, and Bellingham.
                </p>

                {/* Offer Bullet points */}
                <ul className="space-y-3 pt-2">
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4a843] shrink-0" />
                    <span>36 Legend options in A3, A2, or A1 sizes</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#d4a843] shrink-0" />
                    <span>Premium framing & block mount options</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00a651] shrink-0" />
                    <span className="text-emerald-400 font-semibold">Buy 3 or more, Save 20% auto-applied</span>
                  </li>
                </ul>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/world-cup"
                    className="inline-flex items-center justify-center bg-[#d4a843] hover:bg-[#c29837] text-slate-950 px-8 py-3.5 rounded-full font-bold text-base transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#d4a843]/15"
                  >
                    Browse All 36 Posters
                  </Link>
                  <Link
                    to="/quote?product=world-cup-legend-posters"
                    className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/20 px-8 py-3.5 rounded-full font-semibold text-base transition-colors"
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
                    className="group bg-[#0e1b2b] rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:border-[#d4a843]/40 transition-all hover:scale-105 relative"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden bg-slate-900">
                      <img
                        src={p.img}
                        alt={`${p.name} Poster`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                        <p className="text-white text-xs sm:text-sm font-bold truncate">{p.name}</p>
                        <span className="text-[10px] text-emerald-400 font-semibold">Limited Edition</span>
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
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 mb-4 leading-tight">
                Why Durban Businesses Choose <span className="text-amber-500">Pro Graphics</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
                Delivering high-precision print production, certified cast materials, and responsive local turnaround.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-8 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">Education-First Guidance</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We walk you through material specs, durability tiers, and fleet ROI models so you make well-informed investments for your branding.
                </p>
              </div>

              <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-8 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">Certified Marine & Cast Vinyl</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We only utilize 3M, Avery Dennison, and certified UV-resistant laminates engineered specifically for South African sun and coastal exposure.
                </p>
              </div>

              <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-8 text-center group hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                  <BadgePercent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">Transparent Value & Fast Quotes</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Clear, upfront tier estimates with standard 24-hour turnaround and no hidden surprises. Maximum ROI on every Rand invested.
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
        className="py-20 bg-slate-50 border-t border-slate-200"
      />

      {/* CTA Section */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Elevate Your Brand Presence?
          </h2>
          <p className="text-base sm:text-lg text-blue-100/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Get a tailored, accurate quote within 24 hours. Connect with our Durban signage specialists today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/quote">
              <Button size="lg" className="text-base px-8 py-4 shadow-xl hover:scale-105 transition-all bg-amber-500 hover:bg-amber-600 text-blue-950 border-none font-bold rounded-full">
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a
              href="tel:0659424036"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Call 065 9424 036</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
