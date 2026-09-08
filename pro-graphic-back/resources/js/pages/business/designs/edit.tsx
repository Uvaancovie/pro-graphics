import { Head, Link, router, useForm } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Trash2 } from 'lucide-react';

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
    project_id: string;
    name: string;
    file_path: string;
    file_type: string | null;
    file_size: number | null;
    version: number | null;
    notes: string | null;
    uploaded_by: string;
};

type Props = {
    design: Design;
    projects: Project[];
    teamMembers: TeamMember[];
};

export default function EditDesign({ design, projects, teamMembers }: Props) {
    const { data, setData, processing, errors, patch } = useForm({
        project_id: design.project_id,
        name: design.name,
        file_path: design.file_path,
        file_type: design.file_type ?? '',
        file_size: design.file_size ? String(design.file_size) : '',
        version: design.version ? String(design.version) : '',
        notes: design.notes ?? '',
        uploaded_by: design.uploaded_by,
    });

    const handleDelete = () => {
        if (confirm('Delete this design?')) {
            router.delete(`/business/designs/${design.id}`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/business/designs/${design.id}`);
    };

    return (
        <>
            <Head title={`Edit: ${design.name}`} />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/business/designs">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Heading title="Edit Design" description={design.name} />
                    </div>
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="project_id">Project</Label>
                                <Select
                                    name="project_id"
                                    value={data.project_id}
                                    onValueChange={(v) => setData('project_id', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projects.map((project) => (
                                            <SelectItem key={project.id} value={project.id}>
                                                {project.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.project_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Design Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    placeholder="e.g. Logo Final Draft"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="file_path">File Path / URL</Label>
                                <Input
                                    id="file_path"
                                    name="file_path"
                                    value={data.file_path}
                                    onChange={(e) => setData('file_path', e.target.value)}
                                    required
                                    placeholder="designs/logo-final.ai"
                                />
                                <InputError message={errors.file_path} />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="file_type">File Type</Label>
                                    <Input
                                        id="file_type"
                                        name="file_type"
                                        value={data.file_type}
                                        onChange={(e) => setData('file_type', e.target.value)}
                                        placeholder="e.g. ai, psd, pdf"
                                    />
                                    <InputError message={errors.file_type} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="file_size">File Size (bytes)</Label>
                                    <Input
                                        id="file_size"
                                        name="file_size"
                                        type="number"
                                        value={data.file_size}
                                        onChange={(e) => setData('file_size', e.target.value)}
                                        placeholder="0"
                                    />
                                    <InputError message={errors.file_size} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="version">Version</Label>
                                    <Input
                                        id="version"
                                        name="version"
                                        type="number"
                                        step="1"
                                        value={data.version}
                                        onChange={(e) => setData('version', e.target.value)}
                                        placeholder="1"
                                    />
                                    <InputError message={errors.version} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="uploaded_by">Uploaded By</Label>
                                <Select
                                    name="uploaded_by"
                                    value={data.uploaded_by}
                                    onValueChange={(v) => setData('uploaded_by', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teamMembers.map((member) => (
                                            <SelectItem key={member.id} value={member.id}>
                                                {member.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.uploaded_by} />
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
                                    Update Design
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/business/designs">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

EditDesign.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Designs', href: '/business/designs' },
        { title: 'Edit', href: '' },
    ],
};
