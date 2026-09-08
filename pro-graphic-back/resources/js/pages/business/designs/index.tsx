import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

type Project = {
    id: string;
    name: string;
};

type TeamMember = {
    id: string;
    name: string;
};

type Design = {
    id: string;
    name: string;
    file_path: string;
    file_type: string | null;
    file_size: number | null;
    version: number | null;
    notes: string | null;
    project: Project;
    uploader: TeamMember;
    created_at: string;
};

type Props = {
    designs: Design[];
};

export default function DesignIndex({ designs }: Props) {
    const handleDelete = (id: string) => {
        if (confirm('Delete this design?')) {
            router.delete(`/business/designs/${id}`);
        }
    };

    return (
        <>
            <Head title="Designs" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Heading title="Designs" description="Manage project designs" />
                    <Button asChild>
                        <Link href="/business/designs/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Design
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Designs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Name</th>
                                        <th className="pb-3 font-medium">Project</th>
                                        <th className="pb-3 font-medium">File Type</th>
                                        <th className="pb-3 font-medium">File Size</th>
                                        <th className="pb-3 font-medium">Version</th>
                                        <th className="pb-3 font-medium">Uploaded By</th>
                                        <th className="pb-3 font-medium">Date</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {designs.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="py-8 text-center text-muted-foreground">
                                                No designs yet.
                                            </td>
                                        </tr>
                                    )}
                                    {designs.map((design) => (
                                        <tr key={design.id} className="border-b last:border-0">
                                            <td className="py-3 pr-4">
                                                <div className="font-medium">{design.name}</div>
                                                {design.notes && (
                                                    <div className="text-xs text-muted-foreground line-clamp-1">
                                                        {design.notes}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                {design.project?.name ?? '-'}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Badge variant="outline">
                                                    {design.file_type?.toUpperCase() || '-'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                {design.file_size
                                                    ? `${(design.file_size / 1024).toFixed(1)} KB`
                                                    : '-'}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                {design.version ? `v${design.version}` : '-'}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                {design.uploader?.name ?? '-'}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                                                {new Date(design.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/business/designs/${design.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(design.id)}>
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

DesignIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Designs', href: '/business/designs' },
    ],
};
