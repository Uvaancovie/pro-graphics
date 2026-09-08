import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

type Client = {
    id: string;
    company_name: string;
};

type Invoice = {
    id: string;
    invoice_number: string;
    issue_date: string;
    due_date: string;
    subtotal: number;
    tax: number;
    total: number;
    status: string;
    notes: string | null;
    client: Client;
    created_at: string;
};

type Props = {
    invoices: Invoice[];
};

const statusVariants: Record<string, string> = {
    draft: 'secondary',
    sent: 'default',
    paid: 'default',
    overdue: 'destructive',
    cancelled: 'secondary',
};

export default function InvoiceIndex({ invoices }: Props) {
    const handleDelete = (id: string) => {
        if (confirm('Delete this invoice?')) {
            router.delete(`/business/invoices/${id}`);
        }
    };

    return (
        <>
            <Head title="Invoices" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Heading title="Invoices" description="Manage client invoices" />
                    <Button asChild>
                        <Link href="/business/invoices/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Invoice
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Invoices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Invoice #</th>
                                        <th className="pb-3 font-medium">Client</th>
                                        <th className="pb-3 font-medium">Issue Date</th>
                                        <th className="pb-3 font-medium">Due Date</th>
                                        <th className="pb-3 font-medium">Total</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                                No invoices yet.
                                            </td>
                                        </tr>
                                    )}
                                    {invoices.map((invoice) => (
                                        <tr key={invoice.id} className="border-b last:border-0">
                                            <td className="py-3 pr-4">
                                                <div className="font-medium">{invoice.invoice_number}</div>
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                {invoice.client?.company_name ?? '-'}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                                                {new Date(invoice.issue_date).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                                                {new Date(invoice.due_date).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 pr-4 font-medium">
                                                R{Number(invoice.total).toFixed(2)}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Badge variant={(statusVariants[invoice.status] as any) ?? 'outline'}>
                                                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/business/invoices/${invoice.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(invoice.id)}>
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

InvoiceIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Invoices', href: '/business/invoices' },
    ],
};
