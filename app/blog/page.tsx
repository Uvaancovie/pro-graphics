import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';

export const metadata = {
    title: 'Blog & Resources | Pro Graphics',
    description: 'Insights, ROI data, and guides on vehicle branding, fleet marketing, and signage in Durban.',
};

export default function BlogIndex() {
    const allPostsData = getSortedPostsData();

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary-blue mb-4">
                        Fleet Branding Insights
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Data, strategies, and guides to help your Durban business turn vehicles into revenue.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allPostsData.map(({ slug, title, meta_description, date, category }) => (
                        <article
                            key={slug}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
                        >
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-accent-gold-dark bg-yellow-50 px-3 py-1 rounded-full">
                                        {category}
                                    </span>
                                    <time className="text-sm text-gray-500">
                                        {new Date(date).toLocaleDateString('en-ZA', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    <Link href={`/blog/${slug}`} className="hover:text-primary-blue transition-colors">
                                        {title}
                                    </Link>
                                </h2>

                                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                                    {meta_description}
                                </p>

                                <Link
                                    href={`/blog/${slug}`}
                                    className="inline-flex items-center text-primary-blue font-semibold hover:text-accent-gold-dark transition-colors mt-auto"
                                >
                                    Read Article
                                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
