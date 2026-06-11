<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function __construct(
        protected SupabaseService $supabase
    ) {}

    public function index(): Response
    {
        $blogs = $this->supabase->getAll('blogs', [
            'select' => 'id,title,slug,category,author,published,published_at,excerpt,created_at,read_time,view_count',
            'order' => 'created_at.desc',
        ]);

        return Inertia::render('blogs/index', [
            'blogs' => $blogs,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('blogs/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'category' => 'required|string',
            'tags' => 'nullable|string',
            'main_image' => 'nullable|string|max:500',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'author' => 'nullable|string|max:255',
            'published' => 'boolean',
        ]);

        $slug = Str::slug($validated['title']);
        $existing = $this->supabase->getAll('blogs', ['slug' => "eq.{$slug}", 'select' => 'id']);
        if (!empty($existing)) {
            $slug .= '-' . Str::random(4);
        }

        $data = [
            'title' => $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
            'category' => $validated['category'],
            'excerpt' => $validated['excerpt'] ?? null,
            'tags' => $validated['tags'] ? array_map('trim', explode(',', $validated['tags'])) : null,
            'main_image' => $validated['main_image'] ?? null,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'author' => $validated['author'] ?? 'Pro Graphics Team',
            'published' => $validated['published'] ?? false,
            'published_at' => $validated['published'] ? now()->toIso8601String() : null,
            'read_time' => max(1, ceil(str_word_count(strip_tags($validated['content'])) / 200)),
        ];

        $this->supabase->create('blogs', $data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Blog post created.']);

        return to_route('blogs.index');
    }

    public function edit(string $id): Response
    {
        $blog = $this->supabase->getById('blogs', $id);

        if (!$blog) {
            abort(404);
        }

        if (isset($blog['tags']) && is_array($blog['tags'])) {
            $blog['tags'] = implode(', ', $blog['tags']);
        }

        return Inertia::render('blogs/edit', [
            'blog' => $blog,
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'category' => 'required|string',
            'tags' => 'nullable|string',
            'main_image' => 'nullable|string|max:500',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'author' => 'nullable|string|max:255',
            'published' => 'boolean',
        ]);

        $existing = $this->supabase->getById('blogs', $id);
        if (!$existing) {
            abort(404);
        }

        $slug = Str::slug($validated['title']);
        $slugCheck = $this->supabase->getAll('blogs', [
            'slug' => "eq.{$slug}",
            'id' => "neq.{$id}",
            'select' => 'id',
        ]);
        if (!empty($slugCheck)) {
            $slug .= '-' . Str::random(4);
        }

        $data = [
            'title' => $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
            'category' => $validated['category'],
            'excerpt' => $validated['excerpt'] ?? null,
            'tags' => $validated['tags'] ? array_map('trim', explode(',', $validated['tags'])) : null,
            'main_image' => $validated['main_image'] ?? null,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'author' => $validated['author'] ?? 'Pro Graphics Team',
            'published' => $validated['published'] ?? false,
            'published_at' => $validated['published'] && !$existing['published']
                ? now()->toIso8601String()
                : ($validated['published'] ? $existing['published_at'] : null),
            'read_time' => max(1, ceil(str_word_count(strip_tags($validated['content'])) / 200)),
        ];

        $this->supabase->update('blogs', $id, $data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Blog post updated.']);

        return to_route('blogs.index');
    }

    public function destroy(string $id): RedirectResponse
    {
        $this->supabase->delete('blogs', $id);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Blog post deleted.']);

        return to_route('blogs.index');
    }

    public function show(string $slug): Response
    {
        $blogs = $this->supabase->getAll('blogs', [
            'slug' => "eq.{$slug}",
            'select' => '*',
        ]);

        if (empty($blogs)) {
            abort(404);
        }

        $blog = $blogs[0];

        if (isset($blog['tags']) && is_array($blog['tags'])) {
            $blog['tags_list'] = $blog['tags'];
        }

        $this->supabase->update('blogs', $blog['id'], [
            'view_count' => ($blog['view_count'] ?? 0) + 1,
        ]);
        $blog['view_count'] = ($blog['view_count'] ?? 0) + 1;

        $recent = $this->supabase->getAll('blogs', [
            'select' => 'id,title,slug,category,excerpt,main_image,published_at,read_time',
            'order' => 'published_at.desc',
            'limit' => 3,
        ]);

        return Inertia::render('blog/show', [
            'blog' => $blog,
            'recent' => $recent,
        ]);
    }
}
