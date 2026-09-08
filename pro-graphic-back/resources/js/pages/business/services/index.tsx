import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

type Service = {
    id: string;
    name: string;
    category: string;
    base_price: number;
    is_active: boolean;
};

type Props = {
    services: Service[];
};

export default function ServiceIndex({ services }: Props) {
    const handleDelete = (id: string) => {
        if (confirm('Delete this service?')) {
            router.delete(`/business/services/${id}`);
        }
    };

    return (
        <>
            <Head title="Services" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Heading title="Services" description="Manage your service offerings" />
                    <Button asChild>
                        <Link href="/business/services/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Service
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Name</th>
                                        <th className="pb-3 font-medium">Category</th>
                                        <th className="pb-3 font-medium">Base Price</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                                No services yet.
                                            </td>
                                        </tr>
                                    )}
                                    {services.map((service) => (
                                        <tr key={service.id} className="border-b last:border-0">
                                            <td className="py-3 pr-4 font-medium">{service.name}</td>
                                            <td className="py-3 pr-4">
                                                <Badge variant="outline">{service.category}</Badge>
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                ${Number(service.base_price).toFixed(2)}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Badge variant={service.is_active ? 'default' : 'secondary'}>
                                                    {service.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/business/services/${service.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
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

ServiceIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Services', href: '/business/services' },
    ],
};
