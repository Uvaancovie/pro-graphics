import { Head, Link, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

const statusOptions = [
    'pending',
    'confirmed',
    'in-production',
    'completed',
    'delivered',
    'cancelled',
];

type Client = {
    id: string;
    company_name: string;
};

type Props = {
    clients: Client[];
};

export default function CreateOrder({ clients }: Props) {
    const { data, setData, processing, errors, post } = useForm({
        client_id: '',
        order_number: '',
        project_id: '',
        total_amount: '',
        status: 'pending',
        order_date: '',
        delivery_date: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/business/orders');
    };

    return (
        <>
            <Head title="Create Order" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/business/orders">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Heading title="Create Order" description="Create a new customer order" />
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="client_id">Client</Label>
                                    <Select
                                        name="client_id"
                                        value={data.client_id}
                                        onValueChange={(v) => setData('client_id', v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a client" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clients.map((client) => (
                                                <SelectItem key={client.id} value={client.id}>
                                                    {client.company_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.client_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="order_number">Order Number</Label>
                                    <Input
                                        id="order_number"
                                        name="order_number"
                                        value={data.order_number}
                                        onChange={(e) => setData('order_number', e.target.value)}
                                        required
                                        placeholder="ORD-001"
                                    />
                                    <InputError message={errors.order_number} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="project_id">Project ID (optional)</Label>
                                    <Input
                                        id="project_id"
                                        name="project_id"
                                        value={data.project_id}
                                        onChange={(e) => setData('project_id', e.target.value)}
                                        placeholder="Leave blank if not applicable"
                                    />
                                    <InputError message={errors.project_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="total_amount">Total Amount ($)</Label>
                                    <Input
                                        id="total_amount"
                                        name="total_amount"
                                        type="number"
                                        step="0.01"
                                        value={data.total_amount}
                                        onChange={(e) => setData('total_amount', e.target.value)}
                                        required
                                        placeholder="0.00"
                                    />
                                    <InputError message={errors.total_amount} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        name="status"
                                        value={data.status}
                                        onValueChange={(v) => setData('status', v)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="order_date">Order Date</Label>
                                    <Input
                                        id="order_date"
                                        name="order_date"
                                        type="date"
                                        value={data.order_date}
                                        onChange={(e) => setData('order_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.order_date} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="delivery_date">Delivery Date (optional)</Label>
                                    <Input
                                        id="delivery_date"
                                        name="delivery_date"
                                        type="date"
                                        value={data.delivery_date}
                                        onChange={(e) => setData('delivery_date', e.target.value)}
                                    />
                                    <InputError message={errors.delivery_date} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                    placeholder="Any additional notes..."
                                />
                                <InputError message={errors.notes} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} type="submit">
                                    Create Order
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/business/orders">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CreateOrder.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Orders', href: '/business/orders' },
        { title: 'Create', href: '/business/orders/create' },
    ],
};
