type FaqItem = {
    question: string;
    answer: string;
};

interface FaqSectionProps {
    title: string;
    intro?: string;
    faqs: FaqItem[];
    className?: string;
}

export function FaqSection({ title, intro, faqs, className }: FaqSectionProps) {
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <section className={className ?? 'py-20 bg-white border-t border-gray-200'}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4 text-center">{title}</h2>
                {intro && (
                    <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">{intro}</p>
                )}

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <details
                            key={faq.question}
                            className="group rounded-xl border border-gray-200 bg-gray-50 p-5 open:bg-white open:shadow-sm"
                        >
                            <summary className="cursor-pointer list-none font-semibold text-blue-950 flex items-center justify-between gap-4">
                                {faq.question}
                                <span className="text-amber-500 text-lg group-open:rotate-45 transition-transform">+</span>
                            </summary>
                            <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export type { FaqItem };