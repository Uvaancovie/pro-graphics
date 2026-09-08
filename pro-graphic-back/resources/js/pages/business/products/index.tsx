import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

type Product = {
    id: string;
    name: string;
    category: string;
    sku: string;
    unit_price: number;
    unit_cost: number;
    is_active: boolean;
};

type Props = {
    products: Product[];
};

export default function ProductIndex({ products }: Props) {
    const handleDelete = (id: string) => {
        if (confirm('Delete this product?')) {
            router.delete(`/business/products/${id}`);
        }
    };

    return (
        <>
            <Head title="Products" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Heading title="Products" description="Manage your product catalog" />
                    <Button asChild>
                        <Link href="/business/products/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Product
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Name</th>
                                        <th className="pb-3 font-medium">Category</th>
                                        <th className="pb-3 font-medium">SKU</th>
                                        <th className="pb-3 font-medium">Unit Price</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                                No products yet.
                                            </td>
                                        </tr>
                                    )}
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-b last:border-0">
                                            <td className="py-3 pr-4 font-medium">{product.name}</td>
                                            <td className="py-3 pr-4">
                                                <Badge variant="outline">{product.category}</Badge>
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">{product.sku}</td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                ${Number(product.unit_price).toFixed(2)}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Badge variant={product.is_active ? 'default' : 'secondary'}>
                                                    {product.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/business/products/${product.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
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

ProductIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Products', href: '/business/products' },
    ],
};
