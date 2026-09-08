<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Business\Client;
use App\Models\Business\Invoice;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('business/invoices/index', [
            'invoices' => Invoice::with('client')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('business/invoices/create', [
            'clients' => Client::orderBy('company_name')->get(['id', 'company_name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:sqlsrv_localdb.clients,id',
            'order_id' => 'nullable|exists:sqlsrv_localdb.orders,id',
            'invoice_number' => 'required|string|max:100|unique:sqlsrv_localdb.invoices,invoice_number',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:issue_date',
            'subtotal' => 'required|numeric|min:0',
            'tax' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'status' => 'required|string|in:draft,sent,paid,overdue,cancelled',
            'notes' => 'nullable|string',
        ]);

        Invoice::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Invoice created.']);

        return to_route('business.invoices.index');
    }

    public function edit(Invoice $invoice): Response
    {
        return Inertia::render('business/invoices/edit', [
            'invoice' => $invoice->load('client'),
            'clients' => Client::orderBy('company_name')->get(['id', 'company_name']),
        ]);
    }

    public function update(Request $request, Invoice $invoice): RedirectResponse
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:sqlsrv_localdb.clients,id',
            'order_id' => 'nullable|exists:sqlsrv_localdb.orders,id',
            'invoice_number' => 'required|string|max:100|unique:sqlsrv_localdb.invoices,invoice_number,' . $invoice->id,
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:issue_date',
            'subtotal' => 'required|numeric|min:0',
            'tax' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'status' => 'required|string|in:draft,sent,paid,overdue,cancelled',
            'notes' => 'nullable|string',
        ]);

        $invoice->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Invoice updated.']);

        return to_route('business.invoices.index');
    }

    public function destroy(Invoice $invoice): RedirectResponse
    {
        $invoice->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Invoice deleted.']);

        return to_route('business.invoices.index');
    }
}
