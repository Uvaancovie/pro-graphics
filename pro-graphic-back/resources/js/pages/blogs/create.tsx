import { Head, Link, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';

const categories = [
    'Vehicle Branding',
    'Sign Boards',
    'Contra visions',
    'Stickers',
    'Promotional',
    'Industry Insights',
    'Case Studies',
];

export default function CreateBlog() {
    const { data, setData, processing, errors, post } = useForm({
        title: '',
        category: '',
        content: '',
        excerpt: '',
        main_image: '',
        author: 'Pro Graphics Team',
        tags: '',
        meta_title: '',
        meta_description: '',
        published: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/blogs');
    };

    return (
        <>
            <Head title="Create Blog Post" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/blogs">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Heading title="Create Post" description="Write a new blog post" />
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                        <SelectValue placeholder="Select a category" />
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
                                    placeholder="Write your blog content here..."
                                    className="font-mono text-sm"
                                />
                                <InputError message={errors.content} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="excerpt">Excerpt (short summary)</Label>
                                <Textarea
                                    id="excerpt"
                                    name="excerpt"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    rows={3}
                                    placeholder="Brief summary of the post..."
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
                                        placeholder="https://example.com/image.jpg"
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
                                        placeholder="Pro Graphics Team"
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
                                <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                                <Input
                                    id="meta_title"
                                    name="meta_title"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    placeholder="SEO title (optional)"
                                />
                                <InputError message={errors.meta_title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                                <Textarea
                                    id="meta_description"
                                    name="meta_description"
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    rows={2}
                                    placeholder="SEO description (optional)"
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
                                <Label htmlFor="published">Publish immediately</Label>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} type="submit">
                                    Create Post
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

CreateBlog.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Blogs', href: '/blogs' },
        { title: 'Create', href: '/blogs/create' },
    ],
};
