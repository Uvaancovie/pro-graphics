import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

const categoryColors: Record<string, string> = {
    'Vehicle Branding': 'default',
    'Sign Boards': 'secondary',
    'Contra visions': 'outline',
    'Stickers': 'secondary',
    'Promotional': 'default',
    'Industry Insights': 'outline',
    'Case Studies': 'default',
};

type Blog = {
    id: string;
    title: string;
    slug: string;
    category: string;
    author: string;
    published: boolean;
    published_at: string | null;
    excerpt: string | null;
    created_at: string;
    read_time: number | null;
    view_count: number;
};

type Props = {
    blogs: Blog[];
};

export default function BlogIndex({ blogs }: Props) {
    const handleDelete = (id: string) => {
        if (confirm('Delete this post?')) {
            router.delete(`/blogs/${id}`);
        }
    };

    return (
        <>
            <Head title="Blogs" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Heading title="Blog Posts" description="Manage your blog content" />
                    <Button asChild>
                        <Link href="/blogs/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Post
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Title</th>
                                        <th className="pb-3 font-medium">Category</th>
                                        <th className="pb-3 font-medium">Author</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Views</th>
                                        <th className="pb-3 font-medium">Date</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                                No blog posts yet.
                                            </td>
                                        </tr>
                                    )}
                                    {blogs.map((blog) => (
                                        <tr key={blog.id} className="border-b last:border-0">
                                            <td className="py-3 pr-4">
                                                <div className="font-medium">{blog.title}</div>
                                                {blog.excerpt && (
                                                    <div className="text-xs text-muted-foreground line-clamp-1">
                                                        {blog.excerpt}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Badge variant={(categoryColors[blog.category] as any) ?? 'outline'}>
                                                    {blog.category}
                                                </Badge>
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">{blog.author}</td>
                                            <td className="py-3 pr-4">
                                                <Badge variant={blog.published ? 'default' : 'secondary'}>
                                                    {blog.published ? 'Published' : 'Draft'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">{blog.view_count ?? 0}</td>
                                            <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                                                {blog.published_at
                                                    ? new Date(blog.published_at).toLocaleDateString()
                                                    : '-'}
                                            </td>
                                            <td className="py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/blog/${blog.slug}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/blogs/${blog.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

BlogIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Blogs', href: '/blogs' },
    ],
};
