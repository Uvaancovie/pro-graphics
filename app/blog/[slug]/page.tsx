import { client } from '@/src/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';
import type { Metadata } from 'next';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source);
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage,
    body,
    "category": categories[0]->title,
    "author": author->name,
    "authorImage": author->image,
    "tags": categories[]->title
}`;

const ALL_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;

export async function generateStaticParams() {
    const posts = await client.fetch(ALL_SLUGS_QUERY);
    return posts.map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await client.fetch(POST_QUERY, { slug });

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} | Pro Graphics Blog`,
        description: post.title,
        openGraph: {
            title: post.title,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: post.author ? [post.author] : [],
        },
    };
}

// Custom Portable Text components for styling
const portableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) return null;
            return (
                <div className="my-8 rounded-lg overflow-hidden shadow-md">
                    <img
                        src={urlFor(value).width(800).url()}
                        alt={value.alt || ''}
                        className="w-full h-auto"
                    />
                </div>
            );
        },
    },
    block: {
        h2: ({ children }: any) => (
            <h2 className="text-3xl font-bold text-blue-950 mt-12 mb-6 pb-2 border-b border-gray-200">
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-bold text-blue-950 mt-8 mb-4">{children}</h3>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-amber-500 bg-gray-50 py-4 px-6 italic text-gray-700 rounded-r-lg shadow-sm my-6">
                {children}
            </blockquote>
        ),
        normal: ({ children }: any) => (
            <p className="leading-relaxed mb-6 text-gray-600">{children}</p>
        ),
    },
    marks: {
        strong: ({ children }: any) => (
            <strong className="text-gray-900 font-bold">{children}</strong>
        ),
        link: ({ value, children }: any) => (
            <a
                href={value?.href}
                className="text-black font-semibold underline hover:text-blue-950"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-600">{children}</ol>
        ),
    },
};

export const revalidate = 60;

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await client.fetch(POST_QUERY, { slug });

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 pb-16 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Post not found</h1>
                <Link href="/blog" className="text-primary-blue mt-4 inline-block">
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
                            className="text-sm font-medium text-gray-500 hover:text-blue-950 transition-colors flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>

                    {post.category && (
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-sm font-bold tracking-wider text-amber-600 uppercase bg-yellow-50 px-3 py-1 rounded-full">
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
                            src={urlFor(post.mainImage).width(800).height(450).url()}
                            alt={post.title}
                            className="w-full h-auto"
                        />
                    </div>
                )}

                <article className="prose prose-lg prose-blue max-w-none">
                    <PortableText value={post.body} components={portableTextComponents} />
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
