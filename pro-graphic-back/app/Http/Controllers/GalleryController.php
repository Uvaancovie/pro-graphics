<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function __construct(
        protected SupabaseService $supabase
    ) {}

    public function index(): Response
    {
        $images = $this->supabase->getAll('gallery', [
            'select' => '*',
            'order' => 'created_at.desc',
        ]);

        return Inertia::render('gallery/index', [
            'images' => $images,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('gallery/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'category' => 'required|string|in:vehicle-branding,sign-boards,contravisions,stickers,promotional,all',
            'image_url' => 'required|string|max:500',
            'storage_path' => 'required|string|max:500',
            'alt_text' => 'nullable|string|max:500',
            'client_name' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'is_visible' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $this->supabase->create('gallery', [
            'title' => $validated['title'] ?? null,
            'category' => $validated['category'],
            'image_url' => $validated['image_url'],
            'storage_path' => $validated['storage_path'],
            'alt_text' => $validated['alt_text'] ?? null,
            'client_name' => $validated['client_name'] ?? null,
            'is_featured' => $validated['is_featured'] ?? false,
            'is_visible' => $validated['is_visible'] ?? true,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Gallery image added.']);

        return to_route('gallery.index');
    }

    public function edit(string $id): Response
    {
        $image = $this->supabase->getById('gallery', $id);

        if (!$image) {
            abort(404);
        }

        return Inertia::render('gallery/edit', [
            'image' => $image,
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'category' => 'required|string|in:vehicle-branding,sign-boards,contravisions,stickers,promotional,all',
            'image_url' => 'required|string|max:500',
            'storage_path' => 'required|string|max:500',
            'alt_text' => 'nullable|string|max:500',
            'client_name' => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'is_visible' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $existing = $this->supabase->getById('gallery', $id);
        if (!$existing) {
            abort(404);
        }

        $this->supabase->update('gallery', $id, [
            'title' => $validated['title'] ?? null,
            'category' => $validated['category'],
            'image_url' => $validated['image_url'],
            'storage_path' => $validated['storage_path'],
            'alt_text' => $validated['alt_text'] ?? null,
            'client_name' => $validated['client_name'] ?? null,
            'is_featured' => $validated['is_featured'] ?? false,
            'is_visible' => $validated['is_visible'] ?? true,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Gallery image updated.']);

        return to_route('gallery.index');
    }

    public function destroy(string $id): RedirectResponse
    {
        $this->supabase->delete('gallery', $id);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Gallery image deleted.']);

        return to_route('gallery.index');
    }
}
