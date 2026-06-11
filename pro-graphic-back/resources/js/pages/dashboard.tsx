import { Head, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

type Product = {
    id: string;
    name: string;
    slug: string;
    category: string;
    short_desc: string | null;
    image_url: string | null;
    is_visible: boolean;
    sort_order: number;
    created_at: string;
};

type PageProps = {
    auth: Record<string, unknown>;
    products: Product[];
};

export default function Dashboard() {
    const { products } = usePage<PageProps>().props;

    const categoryLabels: Record<string, string> = {
        'vehicle-branding': 'Vehicle Branding',
        'sign-boards': 'Sign Boards',
        contravisions: 'Contravisions',
        stickers: 'Stickers',
        promotional: 'Promotional',
        banners: 'Banners',
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Latest Products</h2>
                    <p className="text-sm text-muted-foreground">
                        Your most recently added products from Supabase.
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-sidebar-border/70 py-20 text-sm text-muted-foreground">
                        No products found.
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group relative overflow-hidden rounded-xl border border-sidebar-border/70 transition-colors hover:border-sidebar-border dark:border-sidebar-border"
                            >
                                <div className="aspect-video bg-muted">
                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-muted-foreground/40 text-sm">
                                            No image
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                            {categoryLabels[product.category] || product.category}
                                        </span>
                                        {!product.is_visible && (
                                            <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
                                                Hidden
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold">{product.name}</h3>
                                    {product.short_desc && (
                                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                            {product.short_desc}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
