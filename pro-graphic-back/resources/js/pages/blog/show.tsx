import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, ChevronLeft, ArrowRight, User } from 'lucide-react';

type Blog = {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    category: string;
    tags_list: string[] | null;
    main_image: string | null;
    author: string | null;
    published: boolean;
    published_at: string | null;
    read_time: number | null;
    view_count: number;
    created_at: string;
};

type RecentBlog = {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string | null;
    main_image: string | null;
    published_at: string | null;
    read_time: number | null;
};

type Props = {
    blog: Blog;
    recent: RecentBlog[];
};

export default function BlogShow({ blog, recent }: Props) {
    const formatDate = (date: string | null) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <Head title={blog.title} />

            <div className="min-h-screen bg-background">
                <div className="mx-auto max-w-4xl px-4 py-12">
                    {/* Back link */}
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to Home
                    </Link>

                    {/* Header */}
                    <article>
                        <header className="mb-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge>{blog.category}</Badge>
                                {blog.read_time && (
                                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        {blog.read_time} min read
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                                {blog.title}
                            </h1>

                            {blog.excerpt && (
                                <p className="text-lg text-muted-foreground">{blog.excerpt}</p>
                            )}

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                {blog.author && (
                                    <span className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        {blog.author}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(blog.published_at ?? blog.created_at)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {blog.view_count} views
                                </span>
                            </div>
                        </header>

                        {/* Featured image */}
                        {blog.main_image && (
                            <div className="mb-8 overflow-hidden rounded-xl">
                                <img
                                    src={blog.main_image}
                                    alt={blog.title}
                                    className="w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Tags */}
                        {blog.tags_list && blog.tags_list.length > 0 && (
                            <div className="mb-8 flex flex-wrap gap-2">
                                {blog.tags_list.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-neutral max-w-none dark:prose-invert lg:prose-lg">
                            {blog.content.split('\n').map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </article>

                    {/* Recent posts */}
                    {recent.length > 0 && (
                        <section className="mt-16 border-t pt-10">
                            <h2 className="mb-6 text-2xl font-bold">Recent Posts</h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {recent
                                    .filter((r) => r.slug !== blog.slug)
                                    .slice(0, 3)
                                    .map((r) => (
                                        <Link
                                            key={r.id}
                                            href={`/blog/${r.slug}`}
                                            className="group rounded-xl border p-5 transition-colors hover:bg-accent"
                                        >
                                            <Badge variant="secondary" className="mb-3">
                                                {r.category}
                                            </Badge>
                                            <h3 className="mb-2 font-semibold group-hover:text-primary transition-colors">
                                                {r.title}
                                            </h3>
                                            {r.excerpt && (
                                                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                                                    {r.excerpt}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                {r.read_time && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {r.read_time} min
                                                    </span>
                                                )}
                                                <span>{formatDate(r.published_at)}</span>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}

BlogShow.layout = null;
