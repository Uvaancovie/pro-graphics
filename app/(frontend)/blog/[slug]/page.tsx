import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts } from '../data';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} | Pro Graphics Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: post.author ? [post.author] : [],
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 pb-16 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Post not found</h1>
                <Link href="/blog" className="text-blue-900 font-bold mt-4 inline-block hover:text-amber-500 transition-colors">
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-16">
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Link
                            href="/blog"
                            className="text-sm font-medium text-gray-500 hover:text-blue-900 transition-colors flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>

                    {post.category && (
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-sm font-bold tracking-wider text-amber-600 uppercase bg-amber-50 px-3 py-1 rounded-full">
                                {post.category}
                            </span>
                        </div>
                    )}

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 mb-4 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-gray-500 text-sm mt-6">
                        {post.author && (
                            <>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {post.author}
                                </span>
                                <span>•</span>
                            </>
                        )}
                        {post.publishedAt && (
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString('en-ZA', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </span>
                        )}
                    </div>
                </header>

                {post.mainImage && (
                    <div className="mb-10 rounded-xl overflow-hidden shadow-md">
                        <img
                            src={post.mainImage}
                            alt={post.title}
                            className="w-full h-auto"
                        />
                    </div>
                )}

                <article className="prose-lg max-w-none text-gray-700">
                    {post.body}
                </article>

                {post.tags && post.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2 text-sm text-gray-600">
                        {post.tags.map((tag: string) => (
                            <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full">#{tag}</span>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
