import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const mainImage = "https://hcestxaffzsqlkiedvfx.supabase.co/storage/v1/object/public/boat-branding/WhatsApp%20Image%202026-07-29%20at%2010.45.50.jpeg";

const floatingCards = [
    { label: "Marine Vinyl Wrap", icon: "🚤" },
    { label: "UV Resistant Materials", icon: "☀️" },
    { label: "Professional Installation", icon: "🔧" },
    { label: "Custom Graphic Design", icon: "🎨" },
];

const stats = [
    { value: "250+", label: "Projects Completed" },
    { value: "★★★★★", label: "Customer Satisfaction" },
    { value: "10+", label: "Years Experience" },
    { value: "100%", label: "Custom Designed" },
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900" />
            <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 h-full min-h-[85vh] flex items-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-16 lg:py-0">
                    <motion.div
                        className="lg:col-span-6 space-y-6 text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 px-4 py-1.5 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest"
                        >
                            🔥 Latest Completed Project
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight"
                        >
                            Transforming Boats Into{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">
                                Floating Billboards
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-lg text-blue-100/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
                        >
                            The NeuroWave boat branding project showcases ProGraphics&apos; expertise in premium marine vinyl wrapping, custom graphic design, and precision installation. Designed to withstand harsh marine environments while delivering maximum visual impact.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                        >
                            <Link to="/quote">
                                <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base px-8 py-3 rounded-full shadow-lg shadow-amber-500/25 hover:scale-105 transition-all w-full sm:w-auto border-none">
                                    Get a Free Quote
                                </Button>
                            </Link>
                            <Link to="/case-studies/neuro-wave-boat-branding">
                                <Button
                                    variant="outline"
                                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-blue-950 px-8 py-3 text-base rounded-full transition-all w-full sm:w-auto"
                                >
                                    View Case Study
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4"
                        >
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <div className="text-lg sm:text-xl font-bold text-amber-400">{stat.value}</div>
                                    <div className="text-[10px] sm:text-xs text-blue-200/70 uppercase tracking-wider font-semibold mt-0.5">{stat.label}</div>
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
                            <img
                                src={mainImage}
                                alt="NeuroWave boat marine vinyl wrap"
                                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-2xl relative z-10"
                                fetchPriority="high"
                            />

                            <div className="absolute bottom-3 left-3 right-3 z-20 grid grid-cols-2 gap-2">
                                {floatingCards.map((card) => (
                                    <div
                                        key={card.label}
                                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg"
                                    >
                                        <span className="text-base sm:text-lg">{card.icon}</span>
                                        <span className="truncate">{card.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
