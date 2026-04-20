import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { HeroCarousel } from "@/app/components/ui/HeroCarousel";
import { SocialProof } from "@/app/components/ui/SocialProof";
import { ROICalculatorPromo } from "@/app/components/ui/ROICalculatorPromo";
import { ProcessTikToks } from "@/app/components/ui/ProcessTikToks";
import { FaqSection } from "@/app/components/ui/FaqSection";
import { HomeProductsGallery } from "@/app/components/ui/HomeProductsGallery";

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

      {/* Process Video Section */}
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
