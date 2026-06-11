import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

type GalleryImage = {
    id: string;
    title: string | null;
    category: string;
    image_url: string;
    storage_path: string;
    alt_text: string | null;
    client_name: string | null;
    is_featured: boolean;
    is_visible: boolean;
    sort_order: number;
    created_at: string;
};

type Props = {
    images: GalleryImage[];
};

const categoryLabels: Record<string, string> = {
    'vehicle-branding': 'Vehicle Branding',
    'sign-boards': 'Sign Boards',
    contravisions: 'Contravisions',
    stickers: 'Stickers',
    promotional: 'Promotional',
    all: 'All',
};

export default function GalleryIndex({ images }: Props) {
    const handleDelete = (id: string) => {
        if (confirm('Delete this image from the gallery?')) {
            router.delete(`/gallery/${id}`);
        }
    };

    return (
        <>
            <Head title="Gallery" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Heading title="Gallery" description="Manage gallery images" />
                    <Button asChild>
                        <Link href="/gallery/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Image
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Image</th>
                                        <th className="pb-3 font-medium">Title</th>
                                        <th className="pb-3 font-medium">Category</th>
                                        <th className="pb-3 font-medium">Client</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Featured</th>
                                        <th className="pb-3 font-medium">Order</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {images.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="py-8 text-center text-muted-foreground">
                                                No gallery images yet.
                                            </td>
                                        </tr>
                                    )}
                                    {images.map((image) => (
                                        <tr key={image.id} className="border-b last:border-0">
                                            <td className="py-3 pr-4">
                                                <div className="h-12 w-16 overflow-hidden rounded bg-muted">
                                                    <img
                                                        src={image.image_url}
                                                        alt={image.alt_text ?? image.title ?? ''}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-3 pr-4">
                                                <div className="font-medium">{image.title || 'Untitled'}</div>
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Badge variant="outline">
                                                    {categoryLabels[image.category] || image.category}
                                                </Badge>
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                {image.client_name || '-'}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Badge variant={image.is_visible ? 'default' : 'secondary'}>
                                                    {image.is_visible ? 'Visible' : 'Hidden'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 pr-4">
                                                {image.is_featured ? (
                                                    <Badge variant="default">Featured</Badge>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">{image.sort_order}</td>
                                            <td className="py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/gallery/${image.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(image.id)}
                                                    >
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

GalleryIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Gallery', href: '/gallery' },
    ],
};
