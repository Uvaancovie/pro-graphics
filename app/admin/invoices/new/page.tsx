'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewInvoicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState([
    { description: '', quantity: 1, unit_price: 0, material: '', dimensions: '' },
  ])

  // Set default due date to 30 days from now
  const defaultIssueDate = new Date().toISOString().split('T')[0]
  const defaultDueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    // Calculate totals (VAT Inclusive)
    const total = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)
    const taxRate = 15
    const subtotal = total / (1 + (taxRate / 100))
    const taxAmount = total - subtotal

    const invoiceData = {
      customer_name: formData.get('customer_name') as string,
      customer_email: formData.get('customer_email') as string,
      customer_company: formData.get('customer_company') as string,
      customer_phone: formData.get('customer_phone') as string,
      customer_address: formData.get('customer_address') as string,
      
      issue_date: formData.get('issue_date') as string,
      due_date: formData.get('due_date') as string,
      terms: formData.get('terms') as string,
      notes: formData.get('notes') as string,
      
      subtotal,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total,
      items: items.filter(i => i.description && i.unit_price !== 0),
    }

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      })

      if (!response.ok) {
        throw new Error('Failed to create invoice')
      }

      const { invoiceId } = await response.json()
      router.push(`/admin/invoices/${invoiceId}`)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  function addItem() {
    setItems([...items, { description: '', quantity: 1, unit_price: 0, material: '', dimensions: '' }])
  }

  function updateItem(index: number, field: string, value: string | number) {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index))
  }

  const total = items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.unit_price)), 0)
  const tax = total - (total / 1.15)
  const subtotal = total - tax

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/invoices"
          className="text-[#5A6A7A] hover:text-[#0D1B2A] transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-[#0D1B2A] font-black text-3xl">Create Invoice</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Customer info */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Customer Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Name / Attention To *
                </label>
                <input
                  name="customer_name"
                  type="text"
                  required
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Email *
                </label>
                <input
                  name="customer_email"
                  type="email"
                  required
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Company Name
                </label>
                <input
                  name="customer_company"
                  type="text"
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="Business Ltd."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Phone
                </label>
                <input
                  name="customer_phone"
                  type="tel"
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="+27 82 123 4567"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Billing Address
                </label>
                <textarea
                  name="customer_address"
                  rows={2}
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="123 Main Street..."
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8EEF4] flex justify-between items-center">
              <h2 className="font-bold text-[#0D1B2A]">Line Items</h2>
              <span className="text-xs text-[#5A6A7A] bg-[#F7F8FA] px-2 py-1 rounded">All prices include 15% VAT</span>
            </div>
            <div className="divide-y divide-[#E8EEF4]">
              {items.map((item, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-6">
                      <label className="block text-xs font-medium text-[#5A6A7A] mb-1">
                        Description *
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                        placeholder="e.g., Premium Banners"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-[#5A6A7A] mb-1">
                        Qty
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs font-medium text-[#5A6A7A] mb-1">
                        Unit Price (Inclusive)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.unit_price}
                        onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                        className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div className="col-span-1 flex items-end">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-bold pb-2"
                        disabled={items.length === 1}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={item.material}
                        onChange={(e) => updateItem(index, 'material', e.target.value)}
                        className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                        placeholder="Material details (optional)"
                      />
                    </div>
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={item.dimensions}
                        onChange={(e) => updateItem(index, 'dimensions', e.target.value)}
                        className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                        placeholder="Dimensions (optional)"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-[#F7F8FA] border-t border-[#E8EEF4]">
              <button
                type="button"
                onClick={addItem}
                className="text-[#FF6B35] font-bold text-sm hover:underline"
              >
                + Add another line item
              </button>
            </div>
          </div>
        </div>

        {/* Right column - Summary & Specifics */}
        <div className="space-y-6">
          {/* Invoice Particulars */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Invoice Particulars</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Issue Date
                </label>
                <input
                  name="issue_date"
                  type="date"
                  defaultValue={defaultIssueDate}
                  required
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Due Date
                </label>
                <input
                  name="due_date"
                  type="date"
                  defaultValue={defaultDueDate}
                  required
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1 text-xs">
                  Payment Terms
                </label>
                <textarea
                  name="terms"
                  rows={2}
                  defaultValue="Payment due within 30 days. EFT preferred."
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1 text-xs">
                  Invoice Notes
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Thank you for your business!"
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0D1B2A] rounded-2xl p-6 text-white shadow-lg">
            <h2 className="font-bold mb-4 opacity-80">Invoice Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-70">Subtotal (Excl. VAT)</span>
                <span>R{subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">VAT (15%)</span>
                <span>R{tax.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between pt-4 mt-2 border-t border-white/10 text-lg font-bold">
                <span>Total Due</span>
                <span className="text-[#FF6B35]">
                  R{total.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1AB5A0] hover:bg-[#159a88] disabled:opacity-50
                         text-white font-bold py-3 rounded-xl transition-colors"
            >
              {loading ? 'Generating...' : 'Create Invoice'}
            </button>
            <Link
              href="/admin/invoices"
              className="block text-center text-[#5A6A7A] mt-3 text-sm hover:text-[#0D1B2A]"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
