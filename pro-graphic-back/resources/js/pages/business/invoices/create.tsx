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

type Client = {
    id: string;
    company_name: string;
};

type Props = {
    clients: Client[];
};

const statusOptions = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];

export default function CreateInvoice({ clients }: Props) {
    const { data, setData, processing, errors, post } = useForm({
        client_id: '',
        order_id: '',
        invoice_number: '',
        issue_date: '',
        due_date: '',
        subtotal: '',
        tax: '',
        total: '',
        status: 'draft',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/business/invoices');
    };

    return (
        <>
            <Head title="Create Invoice" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/business/invoices">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Heading title="Create Invoice" description="Generate a new invoice" />
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                <Label htmlFor="invoice_number">Invoice Number</Label>
                                <Input
                                    id="invoice_number"
                                    name="invoice_number"
                                    value={data.invoice_number}
                                    onChange={(e) => setData('invoice_number', e.target.value)}
                                    required
                                    placeholder="INV-001"
                                />
                                <InputError message={errors.invoice_number} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="issue_date">Issue Date</Label>
                                    <Input
                                        id="issue_date"
                                        name="issue_date"
                                        type="date"
                                        value={data.issue_date}
                                        onChange={(e) => setData('issue_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.issue_date} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="due_date">Due Date</Label>
                                    <Input
                                        id="due_date"
                                        name="due_date"
                                        type="date"
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.due_date} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="subtotal">Subtotal</Label>
                                    <Input
                                        id="subtotal"
                                        name="subtotal"
                                        type="number"
                                        step="0.01"
                                        value={data.subtotal}
                                        onChange={(e) => setData('subtotal', e.target.value)}
                                        required
                                        placeholder="0.00"
                                    />
                                    <InputError message={errors.subtotal} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="tax">Tax</Label>
                                    <Input
                                        id="tax"
                                        name="tax"
                                        type="number"
                                        step="0.01"
                                        value={data.tax}
                                        onChange={(e) => setData('tax', e.target.value)}
                                        required
                                        placeholder="0.00"
                                    />
                                    <InputError message={errors.tax} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="total">Total</Label>
                                    <Input
                                        id="total"
                                        name="total"
                                        type="number"
                                        step="0.01"
                                        value={data.total}
                                        onChange={(e) => setData('total', e.target.value)}
                                        required
                                        placeholder="0.00"
                                    />
                                    <InputError message={errors.total} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    name="status"
                                    value={data.status}
                                    onValueChange={(v) => setData('status', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                    placeholder="Additional notes..."
                                />
                                <InputError message={errors.notes} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} type="submit">
                                    Create Invoice
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/business/invoices">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CreateInvoice.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Invoices', href: '/business/invoices' },
        { title: 'Create', href: '/business/invoices/create' },
    ],
};
