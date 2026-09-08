import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const images = {
    hero: "https://hcestxaffzsqlkiedvfx.supabase.co/storage/v1/object/public/boat-branding/WhatsApp%20Image%202026-07-29%20at%2010.45.50.jpeg",
    side: "https://hcestxaffzsqlkiedvfx.supabase.co/storage/v1/object/public/boat-branding/WhatsApp%20Image%202026-07-29%20at%2010.45.49.jpeg",
    cabin: "https://hcestxaffzsqlkiedvfx.supabase.co/storage/v1/object/public/boat-branding/WhatsApp%20Image%202026-07-29%20at%2010.45.49%20(1).jpeg",
};

const steps = [
    { num: "01", title: "Initial Consultation", desc: "Understood the client's brand vision, vessel dimensions, and marine environment requirements." },
    { num: "02", title: "Concept Development", desc: "Created initial design concepts that captured the NeuroWave brand identity." },
    { num: "03", title: "Digital Mockups", desc: "Produced photorealistic digital renders showing the wrap from every angle." },
    { num: "04", title: "Colour Refinement", desc: "Fine-tuned colour matching to ensure brand consistency across all panels." },
    { num: "05", title: "Print Preparation", desc: "Prepared print-ready files with precise panel measurements and seam placement." },
];

export default function NeuroWaveBoatBrandingCaseStudy() {
    const caseStudySchema = {
        '@context': 'https://schema.org',
        '@type': 'Review',
        itemReviewed: {
            '@type': 'Service',
            name: 'NeuroWave Marine Boat Wrap',
            description: 'Premium marine vinyl wrapping, custom graphic design, and precision installation for a marine vessel.',
        },
        reviewBody: 'Complete marine branding project from concept to installation, transforming the vessel into a floating advertisement while protecting the original paintwork.',
        author: { '@type': 'Organization', name: 'Pro Graphics' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        image: [images.hero, images.side, images.cabin],
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Seo
                title="NeuroWave Boat Branding Case Study | Premium Marine Vinyl Wrap | ProGraphics"
                description="See how ProGraphics transformed the NeuroWave vessel with premium marine vinyl wrapping, custom graphics, and expert installation. A complete marine branding case study."
                canonicalUrl="/case-studies/neuro-wave-boat-branding"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
            />

            <section className="relative bg-blue-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900" />
                <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
                    <nav className="mb-8">
                        <Link to="/case-studies" className="text-blue-200/70 hover:text-amber-400 text-sm font-medium transition-colors flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Case Studies
                        </Link>
                    </nav>

                    <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">
                        Featured Marine Project
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                        NeuroWave Boat Branding
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100/80 max-w-2xl font-light">
                        A complete marine branding project — from concept to installation — transforming the NeuroWave vessel into a bold floating advertisement.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 max-w-5xl -mt-12 relative z-20">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                        src={images.hero}
                        alt="NeuroWave boat marine vinyl wrap hero"
                        className="w-full aspect-video object-cover"
                        fetchPriority="high"
                    />
                </div>
            </section>

            <section className="container mx-auto px-4 max-w-5xl py-16 space-y-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6 pb-2 border-b border-gray-200">
                        The Challenge
                    </h2>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            The client required a distinctive marine wrap that reflected the NeuroWave brand while remaining durable in harsh coastal conditions. The wrap needed to withstand constant sun exposure, saltwater spray, and high humidity — all while maintaining its vibrant appearance and adhesion integrity over time.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6 pb-2 border-b border-gray-200">
                        Design Process
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-5">
                        {steps.map((step) => (
                            <div key={step.num} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                                <div className="text-2xl font-black text-amber-500 mb-2">{step.num}</div>
                                <h3 className="font-bold text-blue-950 text-sm mb-1">{step.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6 pb-2 border-b border-gray-200">
                        Production
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            { label: "Premium Marine-Grade Vinyl", desc: "High-performance cast vinyl engineered for marine applications with superior conformability." },
                            { label: "High-Resolution Large-Format Printing", desc: "UV-resistant eco-solvent inks printed at 1440 DPI for sharp, vibrant graphics." },
                            { label: "Protective Laminate", desc: "Gloss overlaminate adds UV protection, scratch resistance, and depth to the print." },
                            { label: "Precision Cutting", desc: "Computer-controlled cutting ensures exact panel dimensions and seamless fit." },
                        ].map((item) => (
                            <div key={item.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex gap-4 items-start">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-950 mb-1">{item.label}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6 pb-2 border-b border-gray-200">
                        Installation
                    </h2>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Professional installation with seamless panel alignment and edge finishing for maximum durability. Every contour of the vessel was carefully wrapped to ensure full coverage with no lifting edges, using heat-gun post-heating to activate the adhesive on complex curves.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6 pb-2 border-b border-gray-200">
                        The Result
                    </h2>
                    <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-2xl p-8 shadow-sm text-white">
                        <p className="leading-relaxed text-lg mb-4">
                            A bold, professional marine wrap that transforms the vessel into a highly visible floating advertisement while protecting the original paintwork from UV damage, salt corrosion, and abrasion.
                        </p>
                        <ul className="space-y-3">
                            {[
                                "Stunning visual impact on water and at dock",
                                "Full paint protection from marine elements",
                                "Vibrant colours that resist UV fading",
                                "Seamless installation with no visible seams",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-blue-100">
                                    <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6 pb-2 border-b border-gray-200">
                        Gallery
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[images.side, images.cabin].map((src, i) => (
                            <div key={i} className="rounded-xl overflow-hidden shadow-md border border-gray-200 group cursor-pointer">
                                <img
                                    src={src}
                                    alt={`NeuroWave boat branding view ${i + 1}`}
                                    className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section className="bg-blue-950 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ready for Your Own Marine Branding Project?
                    </h2>
                    <p className="text-blue-100/80 text-lg mb-8 max-w-2xl mx-auto font-light">
                        Get a free, no-obligation quote within 24 hours. From concept to installation, we handle every step.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/quote">
                            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base px-8 py-3 rounded-full shadow-lg shadow-amber-500/25 hover:scale-105 transition-all border-none">
                                Get a Free Quote
                            </Button>
                        </Link>
                        <Link to="/case-studies">
                            <Button
                                variant="outline"
                                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-blue-950 px-8 py-3 text-base rounded-full transition-all"
                            >
                                View All Case Studies
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
