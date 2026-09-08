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

type Project = {
    id: string;
    name: string;
    type: string | null;
    status: string;
    start_date: string | null;
    deadline: string | null;
    budget: number | null;
    client: Client;
    created_at: string;
};

type Props = {
    projects: Project[];
};

const statusVariants: Record<string, string> = {
    pending: 'secondary',
    'in-progress': 'default',
    completed: 'default',
    cancelled: 'secondary',
};

export default function ProjectIndex({ projects }: Props) {
    const handleDelete = (id: string) => {
        if (confirm('Delete this project?')) {
            router.delete(`/business/projects/${id}`);
        }
    };

    return (
        <>
            <Head title="Projects" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Heading title="Projects" description="Manage client projects" />
                    <Button asChild>
                        <Link href="/business/projects/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Name</th>
                                        <th className="pb-3 font-medium">Client</th>
                                        <th className="pb-3 font-medium">Type</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Start Date</th>
                                        <th className="pb-3 font-medium">Deadline</th>
                                        <th className="pb-3 font-medium">Budget</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="py-8 text-center text-muted-foreground">
                                                No projects yet.
                                            </td>
                                        </tr>
                                    )}
                                    {projects.map((project) => (
                                        <tr key={project.id} className="border-b last:border-0">
                                            <td className="py-3 pr-4">
                                                <div className="font-medium">{project.name}</div>
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                {project.client?.company_name ?? '-'}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                {project.type || '-'}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Badge variant={(statusVariants[project.status] as any) ?? 'outline'}>
                                                    {project.status === 'in-progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                </Badge>
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                                                {project.start_date ? new Date(project.start_date).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                                                {project.deadline ? new Date(project.deadline).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="py-3 pr-4 text-muted-foreground">
                                                {project.budget ? `R${Number(project.budget).toFixed(2)}` : '-'}
                                            </td>
                                            <td className="py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/business/projects/${project.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
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

ProjectIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Projects', href: '/business/projects' },
    ],
};
