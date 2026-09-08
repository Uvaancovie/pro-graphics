<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Business\Design;
use App\Models\Business\Project;
use App\Models\Business\TeamMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DesignController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('business/designs/index', [
            'designs' => Design::with(['project', 'uploader'])->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('business/designs/create', [
            'projects' => Project::orderBy('name')->get(['id', 'name']),
            'teamMembers' => TeamMember::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:sqlsrv_localdb.projects,id',
            'name' => 'required|string|max:255',
            'file_path' => 'nullable|string|max:500',
            'file_type' => 'nullable|string|max:100',
            'file_size' => 'nullable|integer|min:0',
            'version' => 'required|integer|min:1',
            'notes' => 'nullable|string',
            'uploaded_by' => 'nullable|exists:sqlsrv_localdb.team_members,id',
        ]);

        Design::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Design created.']);

        return to_route('business.designs.index');
    }

    public function edit(Design $design): Response
    {
        return Inertia::render('business/designs/edit', [
            'design' => $design->load(['project', 'uploader']),
            'projects' => Project::orderBy('name')->get(['id', 'name']),
            'teamMembers' => TeamMember::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Design $design): RedirectResponse
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:sqlsrv_localdb.projects,id',
            'name' => 'required|string|max:255',
            'file_path' => 'nullable|string|max:500',
            'file_type' => 'nullable|string|max:100',
            'file_size' => 'nullable|integer|min:0',
            'version' => 'required|integer|min:1',
            'notes' => 'nullable|string',
            'uploaded_by' => 'nullable|exists:sqlsrv_localdb.team_members,id',
        ]);

        $design->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Design updated.']);

        return to_route('business.designs.index');
    }

    public function destroy(Design $design): RedirectResponse
    {
        $design->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Design deleted.']);

        return to_route('business.designs.index');
    }
}
