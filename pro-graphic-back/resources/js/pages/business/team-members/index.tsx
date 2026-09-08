import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

type TeamMember = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    is_active: boolean;
};

type Props = {
    teamMembers: TeamMember[];
};

export default function TeamMemberIndex({ teamMembers }: Props) {
    const handleDelete = (id: string) => {
        if (confirm('Delete this team member?')) {
            router.delete(`/business/team-members/${id}`);
        }
    };

    return (
        <>
            <Head title="Team Members" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <Heading title="Team Members" description="Manage your team" />
                    <Button asChild>
                        <Link href="/business/team-members/create">
                            <Plus className="mr-2 h-4 w-4" />
                            New Team Member
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-3 font-medium">Name</th>
                                        <th className="pb-3 font-medium">Email</th>
                                        <th className="pb-3 font-medium">Phone</th>
                                        <th className="pb-3 font-medium">Role</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teamMembers.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                                No team members yet.
                                            </td>
                                        </tr>
                                    )}
                                    {teamMembers.map((member) => (
                                        <tr key={member.id} className="border-b last:border-0">
                                            <td className="py-3 pr-4 font-medium">{member.name}</td>
                                            <td className="py-3 pr-4 text-muted-foreground">{member.email}</td>
                                            <td className="py-3 pr-4 text-muted-foreground">{member.phone}</td>
                                            <td className="py-3 pr-4">
                                                <Badge variant="outline">{member.role}</Badge>
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Badge variant={member.is_active ? 'default' : 'secondary'}>
                                                    {member.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/business/team-members/${member.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}>
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

TeamMemberIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Business', href: '/business' },
        { title: 'Team Members', href: '/business/team-members' },
    ],
};
