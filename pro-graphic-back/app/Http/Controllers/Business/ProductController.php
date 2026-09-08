<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Business\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('business/products/index', [
            'products' => Product::orderBy('name')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('business/products/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'sku' => 'nullable|string|max:100|unique:sqlsrv_localdb.products,sku',
            'unit_price' => 'required|numeric|min:0',
            'unit_cost' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        Product::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product created.']);

        return to_route('business.products.index');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('business/products/edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'sku' => 'nullable|string|max:100|unique:sqlsrv_localdb.products,sku,' . $product->id,
            'unit_price' => 'required|numeric|min:0',
            'unit_cost' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $product->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product updated.']);

        return to_route('business.products.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product deleted.']);

        return to_route('business.products.index');
    }
}
