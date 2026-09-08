import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

const statusColors: Record<string, string> = {
    pending: 'secondary',
    confirmed: 'outline',
    'in-production': 'default',
    completed: 'default',
    delivered: 'default',
    cancelled: 'destructive',
};

type Client = {
    id: string;
    company_name: string;
};

type Order = {
    id: string;
    order_number: string;
    total_amount: number;
    status: string;
    order_date: string;
    delivery_date: string | null;
    client: Client | null;
};

type Props = {
    orders: Order[];
};

export default function OrderIndex({ orders }: Props) {
    const handleDelete = (id: string) => {
        if (confirm('Delete this order?')) {
            router.delete(`/business/orders/${id}`);
        }
    };

    return (
        <>
            <Head title="Orders" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Heading title="Orders" description="Manage customer orders" />
                    <Button asChild>
                        <Link href="/business/orders/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Order
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Order #</th>
                                        <th className="pb-3 font-medium">Client</th>
                                        <th className="pb-3 font-medium">Total</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Order Date</th>
                                        <th className="pb-3 font-medium">Delivery Date</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                                No orders yet.
                                            </td>
                                        </tr>
                                    )}
                                    {orders.map((order) => (
                                        <tr key={order.id} className="border-b last:border-0">
                                            <td className="py-3 pr-4 font-medium">{order.order_number}</td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                {order.client?.company_name ?? '-'}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                ${Number(order.total_amount).toFixed(2)}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Badge variant={(statusColors[order.status] as any) ?? 'outline'}>
                                                    {order.status}
                                                </Badge>
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                                                {new Date(order.order_date).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                                                {order.delivery_date
                                                    ? new Date(order.delivery_date).toLocaleDateString()
                                                    : '-'}
                                            </td>
                                            <td className="py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/business/orders/${order.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(order.id)}>
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

OrderIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Orders', href: '/business/orders' },
    ],
};
