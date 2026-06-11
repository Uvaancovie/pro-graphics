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
    { value: 'vehicle-branding', label: 'Vehicle Branding' },
    { value: 'sign-boards', label: 'Sign Boards' },
    { value: 'contravisions', label: 'Contravisions' },
    { value: 'stickers', label: 'Stickers' },
    { value: 'promotional', label: 'Promotional' },
    { value: 'all', label: 'All' },
];

export default function CreateGallery() {
    const { data, setData, processing, errors, post } = useForm({
        title: '',
        category: 'all',
        image_url: '',
        storage_path: '',
        alt_text: '',
        client_name: '',
        is_featured: false,
        is_visible: true,
        sort_order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/gallery');
    };

    return (
        <>
            <Head title="Add Gallery Image" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/gallery">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Heading title="Add Image" description="Add a new image to the gallery" />
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
                                    placeholder="e.g. Fleet wrap for Durban Logistics"
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
                                            <SelectItem key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image_url">Image URL</Label>
                                <Input
                                    id="image_url"
                                    name="image_url"
                                    value={data.image_url}
                                    onChange={(e) => setData('image_url', e.target.value)}
                                    required
                                    placeholder="https://your-project.supabase.co/storage/v1/object/public/gallery-images/..."
                                />
                                <InputError message={errors.image_url} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="storage_path">Storage Path</Label>
                                <Input
                                    id="storage_path"
                                    name="storage_path"
                                    value={data.storage_path}
                                    onChange={(e) => setData('storage_path', e.target.value)}
                                    required
                                    placeholder="gallery-images/filename.jpg"
                                />
                                <InputError message={errors.storage_path} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="alt_text">Alt Text</Label>
                                <Textarea
                                    id="alt_text"
                                    name="alt_text"
                                    value={data.alt_text}
                                    onChange={(e) => setData('alt_text', e.target.value)}
                                    rows={2}
                                    placeholder="Descriptive text for accessibility"
                                />
                                <InputError message={errors.alt_text} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="client_name">Client Name</Label>
                                <Input
                                    id="client_name"
                                    name="client_name"
                                    value={data.client_name}
                                    onChange={(e) => setData('client_name', e.target.value)}
                                    placeholder="e.g. Durban Logistics"
                                />
                                <InputError message={errors.client_name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    name="sort_order"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                />
                                <InputError message={errors.sort_order} />
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_featured"
                                    name="is_featured"
                                    checked={data.is_featured}
                                    onCheckedChange={(v) => setData('is_featured', !!v)}
                                />
                                <Label htmlFor="is_featured">Featured image</Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_visible"
                                    name="is_visible"
                                    checked={data.is_visible}
                                    onCheckedChange={(v) => setData('is_visible', !!v)}
                                />
                                <Label htmlFor="is_visible">Visible on public gallery</Label>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} type="submit">
                                    Add Image
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/gallery">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CreateGallery.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Gallery', href: '/gallery' },
        { title: 'Add', href: '/gallery/create' },
    ],
};
