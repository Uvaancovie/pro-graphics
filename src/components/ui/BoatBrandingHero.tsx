import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Anchor, Sun, Wrench, Palette, Sparkles, Star, ArrowRight, ShieldCheck } from "lucide-react";

const mainImage = "https://hcestxaffzsqlkiedvfx.supabase.co/storage/v1/object/public/boat-branding/WhatsApp%20Image%202026-07-29%20at%2010.45.50.jpeg";

const floatingCards = [
    { label: "Marine Vinyl Wrap", icon: Anchor },
    { label: "UV Resistant Materials", icon: Sun },
    { label: "Professional Installation", icon: Wrench },
    { label: "Custom Graphic Design", icon: Palette },
];

const stats = [
    { value: "250+", label: "Projects Completed" },
    { value: "4.9 / 5.0", label: "Client Satisfaction" },
    { value: "10+ Years", label: "Industry Experience" },
    { value: "100%", label: "Custom Crafted" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function BoatBrandingHero() {
    return (
        <section className="relative min-h-[85vh] bg-blue-950 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950" />
            <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 h-full min-h-[85vh] flex items-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-16 lg:py-12">
                    <motion.div
                        className="lg:col-span-6 space-y-6 text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-400 uppercase tracking-widest"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Featured Case Study</span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight"
                        >
                            Transforming Vessels Into{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
                                High-Impact Assets
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-lg text-blue-100/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
                        >
                            The NeuroWave marine branding project highlights Pro Graphics&apos; engineering in premium marine cast vinyl wrapping, bespoke vector design, and precision edge-sealing engineered for KwaZulu-Natal waters.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                        >
                            <Link to="/quote">
                                <Button className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold text-base px-8 py-3 rounded-full shadow-lg shadow-amber-500/20 hover:scale-105 transition-all w-full sm:w-auto border-none flex items-center justify-center gap-2">
                                    <span>Get a Free Quote</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link to="/case-studies/neuro-wave-boat-branding">
                                <Button
                                    variant="outline"
                                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-blue-950 px-8 py-3 text-base rounded-full transition-all w-full sm:w-auto font-medium"
                                >
                                    View Case Study
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10"
                        >
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <div className="text-lg sm:text-xl font-bold text-white flex items-center justify-center lg:justify-start gap-1">
                                        {stat.value}
                                        {stat.label.includes("Satisfaction") && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />}
                                    </div>
                                    <div className="text-[11px] text-blue-200/70 uppercase tracking-wider font-medium mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-6 relative"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl pointer-events-none" />
                            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-blue-900/40">
                                <img
                                    src={mainImage}
                                    alt="NeuroWave boat marine vinyl wrap"
                                    className="w-full aspect-[4/3] object-cover"
                                    fetchPriority="high"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent pointer-events-none" />

                                <div className="absolute bottom-3 left-3 right-3 z-20 grid grid-cols-2 gap-2">
                                    {floatingCards.map((card) => {
                                        const Icon = card.icon;
                                        return (
                                            <div
                                                key={card.label}
                                                className="bg-blue-950/80 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 text-white text-xs sm:text-sm font-medium flex items-center gap-2.5 shadow-lg"
                                            >
                                                <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="truncate text-slate-100">{card.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
