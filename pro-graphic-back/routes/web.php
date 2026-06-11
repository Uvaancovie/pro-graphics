<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Gallery
    Route::get('gallery', [GalleryController::class, 'index'])->name('gallery.index');
    Route::get('gallery/create', [GalleryController::class, 'create'])->name('gallery.create');
    Route::post('gallery', [GalleryController::class, 'store'])->name('gallery.store');
    Route::get('gallery/{gallery}/edit', [GalleryController::class, 'edit'])->name('gallery.edit');
    Route::patch('gallery/{gallery}', [GalleryController::class, 'update'])->name('gallery.update');
    Route::delete('gallery/{gallery}', [GalleryController::class, 'destroy'])->name('gallery.destroy');

    // Blog CMS
    Route::get('blogs', [BlogController::class, 'index'])->name('blogs.index');
    Route::get('blogs/create', [BlogController::class, 'create'])->name('blogs.create');
    Route::post('blogs', [BlogController::class, 'store'])->name('blogs.store');
    Route::get('blogs/{blog}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
    Route::patch('blogs/{blog}', [BlogController::class, 'update'])->name('blogs.update');
    Route::delete('blogs/{blog}', [BlogController::class, 'destroy'])->name('blogs.destroy');
});

// Public blog view
Route::get('blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

require __DIR__.'/settings.php';
