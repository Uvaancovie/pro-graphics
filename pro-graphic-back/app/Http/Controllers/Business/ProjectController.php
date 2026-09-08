<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Business\Client;
use App\Models\Business\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('business/projects/index', [
            'projects' => Project::with('client')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('business/projects/create', [
            'clients' => Client::orderBy('company_name')->get(['id', 'company_name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:sqlsrv_localdb.clients,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'nullable|string|max:255',
            'status' => 'required|string|in:pending,in-progress,completed,cancelled',
            'start_date' => 'nullable|date',
            'deadline' => 'nullable|date',
            'budget' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        Project::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project created.']);

        return to_route('business.projects.index');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('business/projects/edit', [
            'project' => $project->load('client'),
            'clients' => Client::orderBy('company_name')->get(['id', 'company_name']),
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:sqlsrv_localdb.clients,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'nullable|string|max:255',
            'status' => 'required|string|in:pending,in-progress,completed,cancelled',
            'start_date' => 'nullable|date',
            'deadline' => 'nullable|date',
            'budget' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        $project->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project updated.']);

        return to_route('business.projects.index');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project deleted.']);

        return to_route('business.projects.index');
    }
}
