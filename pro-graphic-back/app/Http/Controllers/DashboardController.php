<?php

namespace App\Http\Controllers;

use App\Services\SupabaseService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected SupabaseService $supabase
    ) {}

    public function index(): Response
    {
        $products = $this->supabase->getAll('products', [
            'select' => 'id,name,slug,category,short_desc,image_url,is_visible,sort_order,created_at',
            'order' => 'created_at.desc',
            'limit' => 6,
        ]);

        return Inertia::render('dashboard', [
            'products' => $products,
        ]);
    }
}
