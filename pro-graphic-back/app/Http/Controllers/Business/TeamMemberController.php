<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Business\TeamMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('business/team-members/index', [
            'teamMembers' => TeamMember::orderBy('name')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('business/team-members/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:sqlsrv_localdb.team_members,email',
            'phone' => 'nullable|string|max:50',
            'role' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        TeamMember::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Team member created.']);

        return to_route('business.team-members.index');
    }

    public function edit(TeamMember $teamMember): Response
    {
        return Inertia::render('business/team-members/edit', [
            'teamMember' => $teamMember,
        ]);
    }

    public function update(Request $request, TeamMember $teamMember): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:sqlsrv_localdb.team_members,email,' . $teamMember->id,
            'phone' => 'nullable|string|max:50',
            'role' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $teamMember->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Team member updated.']);

        return to_route('business.team-members.index');
    }

    public function destroy(TeamMember $teamMember): RedirectResponse
    {
        $teamMember->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Team member deleted.']);

        return to_route('business.team-members.index');
    }
}
