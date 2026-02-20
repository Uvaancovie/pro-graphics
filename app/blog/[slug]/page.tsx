import { getPostData, getAllPostSlugs } from '@/lib/markdown';
import Head from 'next/head';
import Link from 'next/link';

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map((path) => ({
        slug: path.params.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);
    return {
        title: postData.meta_title || postData.title,
        description: postData.meta_description,
        openGraph: {
            title: postData.meta_title || postData.title,
            description: postData.meta_description,
            type: 'article',
            publishedTime: postData.date,
            authors: [postData.author],
            tags: postData.tags,
        }
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);

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

                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-sm font-bold tracking-wider text-amber-600 uppercase bg-yellow-50 px-3 py-1 rounded-full">
                            {postData.category}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 mb-4 leading-tight">
                        {postData.title}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-gray-500 text-sm mt-6">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {postData.author}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <time dateTime={postData.date}>
                                {new Date(postData.date).toLocaleDateString('en-ZA', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </span>
                    </div>
                </header>

                {/* 
          Using Tailwind Typography plugin styling classes manually for maximum control
          instead of installing `@tailwindcss/typography` just for one page.
        */}
                <article
                    className="prose prose-lg prose-blue max-w-none 
            prose-headings:text-blue-950 prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:leading-relaxed prose-p:mb-6 prose-p:text-gray-600
            prose-a:text-black prose-a:font-semibold prose-a:underline hover:text-blue-950
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
            prose-li:mb-2 prose-li:text-gray-600
            prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:rounded-r-lg prose-blockquote:shadow-sm
            prose-table:w-full prose-table:border-collapse prose-table:mb-8 prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-sm
            prose-th:bg-gray-100 prose-th:text-black prose-th:p-4 prose-th:text-left prose-th:font-bold
            prose-td:p-4 prose-td:border-b prose-td:border-gray-200 prose-td:bg-white prose-td:text-black
            [&>*:first-child]:mt-0"
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
                />

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2 text-sm text-gray-600">
                    {postData.tags?.map((tag: string) => (
                        <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full">#{tag}</span>
                    ))}
                </div>
            </main>
        </div>
    );
}
