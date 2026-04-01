import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts } from './data';

export const metadata: Metadata = {
    title: 'Durban Signage Blog | Vehicle Branding Durban & Sign Boards Durban',
    description: 'SEO-focused guides on vehicle branding Durban, sign boards Durban, and local signage strategy to help businesses generate more organic leads.',
    keywords: [
        'vehicle branding Durban',
        'sign boards Durban',
        'Durban signage',
        'fleet branding Durban',
        'storefront signage Durban',
    ],
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogIndex() {
    const blogCollectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Pro Graphics Durban Signage Blog',
        description: 'Blog posts about vehicle branding Durban, sign boards Durban, and signage growth strategies.',
        url: 'https://pro-graphics.co.za/blog',
        hasPart: blogPosts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: `https://pro-graphics.co.za/blog/${post.slug}`,
            datePublished: post.publishedAt,
            keywords: post.tags?.join(', '),
        })),
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary-blue mb-4">
                        Fleet Branding Insights
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Data, strategies, and guides to help your Durban business turn vehicles into revenue.
                    </p>
                </div>

                {blogPosts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No blog posts published yet. Check back soon!</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article
                            key={post._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
                        >
                            {post.mainImage && (
                                <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={post.mainImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                                        {post.category || 'Uncategorized'}
                                    </span>
                                    {post.publishedAt && (
                                        <time className="text-sm text-gray-500">
                                            {new Date(post.publishedAt).toLocaleDateString('en-ZA', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </time>
                                    )}
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-900 transition-colors">
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-gray-600 mb-6 flex-grow">
                                    {post.excerpt ? post.excerpt.substring(0, 160) + '...' : ''}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center text-blue-900 font-semibold hover:text-amber-600 transition-colors mt-auto pt-4"
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
