export function SocialProof() {
    const googleReviewsUrl = "https://share.google/zNXrPyY2nDXGQcl6i";
    const googleSearchReviewsUrl = "https://www.google.com/search?q=Pro+Graphics+Durban+reviews";

    return (
        <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-950 mb-4 leading-tight">
                        Our <span className="text-amber-500">Google Reviews</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Real customer feedback from Google.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
                    <div className="grid sm:grid-cols-3 gap-4 mb-8 text-center">
                        <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Platform</p>
                            <p className="text-xl font-black text-blue-950 mt-1">Google</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Rating</p>
                            <p className="text-xl font-black text-amber-500 mt-1">★★★★★</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Trust</p>
                            <p className="text-xl font-black text-blue-950 mt-1">Verified Reviews</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href={googleReviewsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-xl transition-colors"
                        >
                            Read Google Reviews
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h6m0 0v6m0-6L10 16m-3 1h6a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <a
                            href={googleSearchReviewsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-950 border border-gray-200 font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-xl transition-colors"
                        >
                            View on Google Search
                        </a>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-4">
                        Google does not allow this reviews page to be embedded directly inside websites.
                    </p>
                </div>
            </div>
        </section>
    );
}
