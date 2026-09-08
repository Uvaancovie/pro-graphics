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
    'Vinyl & Decals',
    'Signage',
    'Apparel',
    'Promotional',
    'Vehicle Graphics',
    'Banners',
    'Other',
];

type Product = {
    id: string;
    name: string;
    description: string;
    category: string;
    sku: string;
    unit_price: number;
    unit_cost: number;
    is_active: boolean;
};

type Props = {
    product: Product;
};

export default function EditProduct({ product }: Props) {
    const { data, setData, processing, errors, put } = useForm({
        name: product.name,
        description: product.description,
        category: product.category,
        sku: product.sku,
        unit_price: String(product.unit_price),
        unit_cost: String(product.unit_cost),
        is_active: product.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/business/products/${product.id}`);
    };

    return (
        <>
            <Head title="Edit Product" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/business/products">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Heading title="Edit Product" description={`Editing "${product.name}"`} />
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    placeholder="Product name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    placeholder="Product description"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
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
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input
                                        id="sku"
                                        name="sku"
                                        value={data.sku}
                                        onChange={(e) => setData('sku', e.target.value)}
                                        required
                                        placeholder="PRO-001"
                                    />
                                    <InputError message={errors.sku} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="unit_price">Unit Price ($)</Label>
                                    <Input
                                        id="unit_price"
                                        name="unit_price"
                                        type="number"
                                        step="0.01"
                                        value={data.unit_price}
                                        onChange={(e) => setData('unit_price', e.target.value)}
                                        required
                                        placeholder="0.00"
                                    />
                                    <InputError message={errors.unit_price} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="unit_cost">Unit Cost ($)</Label>
                                    <Input
                                        id="unit_cost"
                                        name="unit_cost"
                                        type="number"
                                        step="0.01"
                                        value={data.unit_cost}
                                        onChange={(e) => setData('unit_cost', e.target.value)}
                                        required
                                        placeholder="0.00"
                                    />
                                    <InputError message={errors.unit_cost} />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_active"
                                    name="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(v) => setData('is_active', !!v)}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} type="submit">
                                    Update Product
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/business/products">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

EditProduct.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Products', href: '/business/products' },
        { title: 'Edit', href: '/business/products/{id}/edit' },
    ],
};
