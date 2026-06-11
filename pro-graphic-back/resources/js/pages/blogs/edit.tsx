import { Head, Link, router, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Trash2 } from 'lucide-react';

const categories = [
    'Vehicle Branding',
    'Sign Boards',
    'Contra visions',
    'Stickers',
    'Promotional',
    'Industry Insights',
    'Case Studies',
];

type Blog = {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    category: string;
    tags: string | null;
    main_image: string | null;
    meta_title: string | null;
    meta_description: string | null;
    author: string | null;
    published: boolean;
    published_at: string | null;
    read_time: number | null;
    view_count: number;
    created_at: string;
};

type Props = {
    blog: Blog;
};

export default function EditBlog({ blog }: Props) {
    const { data, setData, processing, errors, patch } = useForm({
        title: blog.title,
        category: blog.category,
        content: blog.content,
        excerpt: blog.excerpt ?? '',
        main_image: blog.main_image ?? '',
        author: blog.author ?? 'Pro Graphics Team',
        tags: blog.tags ?? '',
        meta_title: blog.meta_title ?? '',
        meta_description: blog.meta_description ?? '',
        published: blog.published,
    });

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(`/blogs/${blog.id}`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/blogs/${blog.id}`, { preserveScroll: true });
    };

    return (
        <>
            <Head title={`Edit: ${blog.title}`} />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/blogs">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Heading title="Edit Post" description={blog.title} />
                    </div>
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="hidden" name="_method" value="PATCH" />

                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    placeholder="Enter blog title"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    name="category"
                                    value={data.category}
                                    onValueChange={(v) => setData('category', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    required
                                    rows={16}
                                    className="font-mono text-sm"
                                />
                                <InputError message={errors.content} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    name="excerpt"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    rows={3}
                                />
                                <InputError message={errors.excerpt} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="main_image">Featured Image URL</Label>
                                    <Input
                                        id="main_image"
                                        name="main_image"
                                        value={data.main_image}
                                        onChange={(e) => setData('main_image', e.target.value)}
                                    />
                                    <InputError message={errors.main_image} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="author">Author</Label>
                                    <Input
                                        id="author"
                                        name="author"
                                        value={data.author}
                                        onChange={(e) => setData('author', e.target.value)}
                                    />
                                    <InputError message={errors.author} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="tags">Tags (comma-separated)</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    value={data.tags}
                                    onChange={(e) => setData('tags', e.target.value)}
                                    placeholder="design, branding, signage"
                                />
                                <InputError message={errors.tags} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="meta_title">Meta Title</Label>
                                <Input
                                    id="meta_title"
                                    name="meta_title"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                />
                                <InputError message={errors.meta_title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <Textarea
                                    id="meta_description"
                                    name="meta_description"
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    rows={2}
                                />
                                <InputError message={errors.meta_description} />
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="published"
                                    name="published"
                                    checked={data.published}
                                    onCheckedChange={(v) => setData('published', !!v)}
                                />
                                <Label htmlFor="published">Published</Label>
                            </div>

                            {blog.slug && (
                                <p className="text-xs text-muted-foreground">
                                    Slug: /blog/{blog.slug} &middot; {blog.read_time ?? '?'} min read &middot; {blog.view_count ?? 0} views
                                </p>
                            )}

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} type="submit">
                                    Update Post
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/blogs">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

EditBlog.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Blogs', href: '/blogs' },
        { title: 'Edit', href: '' },
    ],
};
