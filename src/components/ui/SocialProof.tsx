import { Star, ShieldCheck, ExternalLink, MessageSquareQuote } from "lucide-react";

export function SocialProof() {
    const googleReviewsUrl = "https://share.google/zNXrPyY2nDXGQcl6i";
    const googleSearchReviewsUrl = "https://www.google.com/search?q=Pro+Graphics+Durban+reviews";

    return (
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-700 uppercase tracking-widest mb-3">
                        <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" />
                        <span>Client Testimonials</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 mb-3 leading-tight">
                        Verified <span className="text-amber-500">Google Reviews</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
                        Trusted by fleet managers, business owners, and marine operators across KwaZulu-Natal.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/70">
                    <div className="grid sm:grid-cols-3 gap-4 mb-8 text-center">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Platform</p>
                            <p className="text-xl font-bold text-blue-950 mt-1">Google Business</p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Score</p>
                            <div className="flex items-center justify-center gap-1 mt-1 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                                <span className="text-lg font-bold text-slate-900 ml-1.5">5.0</span>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Status</p>
                            <div className="flex items-center justify-center gap-1.5 mt-1 text-emerald-700 font-bold text-lg">
                                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                <span>Verified Feedback</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href={googleReviewsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md shadow-amber-500/20 hover:scale-105"
                        >
                            <span>Read All Google Reviews</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <a
                            href={googleSearchReviewsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-blue-950 border border-slate-300 font-semibold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors"
                        >
                            <span>View on Google Search</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
