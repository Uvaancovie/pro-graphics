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
    contact_name: string;
    email: string;
    phone: string;
    address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    notes: string | null;
    is_active: boolean;
};

type Props = {
    clients: Client[];
};

export default function ClientIndex({ clients }: Props) {
    const handleDelete = (id: string) => {
        if (confirm('Delete this client?')) {
            router.delete(`/business/clients/${id}`);
        }
    };

    return (
        <>
            <Head title="Clients" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Heading title="Clients" description="Manage your client base" />
                    <Button asChild>
                        <Link href="/business/clients/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Client
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Clients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Company</th>
                                        <th className="pb-3 font-medium">Contact</th>
                                        <th className="pb-3 font-medium">Email</th>
                                        <th className="pb-3 font-medium">Phone</th>
                                        <th className="pb-3 font-medium">City</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                                No clients yet.
                                            </td>
                                        </tr>
                                    )}
                                    {clients.map((client) => (
                                        <tr key={client.id} className="border-b last:border-0">
                                            <td className="py-3 pr-4 font-medium">{client.company_name}</td>
                                            <td className="py-3 pr-4 text-muted-foreground">{client.contact_name}</td>
                                            <td className="py-3 pr-4 text-muted-foreground">{client.email}</td>
                                            <td className="py-3 pr-4 text-muted-foreground">{client.phone}</td>
                                            <td className="py-3 pr-4 text-muted-foreground">{client.city ?? '-'}</td>
                                            <td className="py-3 pr-4">
                                                <Badge variant={client.is_active ? 'default' : 'secondary'}>
                                                    {client.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/business/clients/${client.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(client.id)}>
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

ClientIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Business', href: '/business' },
        { title: 'Clients', href: '/business/clients' },
    ],
};
