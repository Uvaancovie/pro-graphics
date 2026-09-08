<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Business\Client;
use App\Models\Business\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('business/orders/index', [
            'orders' => Order::with('client')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('business/orders/create', [
            'clients' => Client::orderBy('company_name')->get(['id', 'company_name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:sqlsrv_localdb.clients,id',
            'order_number' => 'required|string|max:100|unique:sqlsrv_localdb.orders,order_number',
            'project_id' => 'nullable|exists:sqlsrv_localdb.projects,id',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'required|string|in:pending,confirmed,in-production,completed,delivered,cancelled',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        Order::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Order created.']);

        return to_route('business.orders.index');
    }

    public function edit(Order $order): Response
    {
        return Inertia::render('business/orders/edit', [
            'order' => $order->load('client'),
            'clients' => Client::orderBy('company_name')->get(['id', 'company_name']),
        ]);
    }

    public function update(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:sqlsrv_localdb.clients,id',
            'order_number' => 'required|string|max:100|unique:sqlsrv_localdb.orders,order_number,' . $order->id,
            'project_id' => 'nullable|exists:sqlsrv_localdb.projects,id',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'required|string|in:pending,confirmed,in-production,completed,delivered,cancelled',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $order->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Order updated.']);

        return to_route('business.orders.index');
    }

    public function destroy(Order $order): RedirectResponse
    {
        $order->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Order deleted.']);

        return to_route('business.orders.index');
    }
}
