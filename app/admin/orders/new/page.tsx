// app/admin/orders/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface OrderFormData {
  customer_name: string
  customer_email: string
  customer_company: string
  customer_phone: string
  customer_address: string
  delivery_method: 'pickup' | 'delivery' | 'courier'
  delivery_date: string
  delivery_notes: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  notes: string
}

export default function NewOrderPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState([
    { description: '', quantity: 1, unit_price: 0, material: '', dimensions: '' },
  ])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    // Amount entered is already VAT-inclusive
    const total = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)

    const orderData = {
      customer_name: formData.get('customer_name') as string,
      customer_email: formData.get('customer_email') as string,
      customer_company: formData.get('customer_company') as string,
      customer_phone: formData.get('customer_phone') as string,
      customer_address: formData.get('customer_address') as string,
      delivery_method: formData.get('delivery_method') as string,
      delivery_date: formData.get('delivery_date') as string,
      delivery_notes: formData.get('delivery_notes') as string,
      priority: formData.get('priority') as string,
      notes: formData.get('notes') as string,
      subtotal: total,
      tax_rate: 0,
      tax_amount: 0,
      total,
      items: items.filter(i => i.description && i.unit_price > 0),
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const { orderId } = await response.json()
      router.push(`/admin/orders/${orderId}`)
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

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/orders"
          className="text-[#5A6A7A] hover:text-[#0D1B2A] transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-[#0D1B2A] font-black text-3xl">New Order</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        {/* Left column - Order form */}
        <div className="col-span-2 space-y-6">
          {/* Customer info */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Customer Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Name *
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
                  Company
                </label>
                <input
                  name="customer_company"
                  type="text"
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="Company name"
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
                  Address
                </label>
                <textarea
                  name="customer_address"
                  rows={2}
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="123 Main Street, Cape Town"
                />
              </div>
            </div>
          </div>

          {/* Order items */}
          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8EEF4]">
              <h2 className="font-bold text-[#0D1B2A]">Order Items</h2>
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
                        placeholder="e.g., Full vehicle wrap - BMW X5"
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
                        Unit Price (R)
                      </label>
                      <input
                        type="number"
                        min="0"
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
                        className="text-red-500 hover:text-red-700 text-sm font-bold"
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
                        placeholder="Material (e.g., 3M vinyl)"
                      />
                    </div>
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={item.dimensions}
                        onChange={(e) => updateItem(index, 'dimensions', e.target.value)}
                        className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                        placeholder="Dimensions (e.g., 1200x900mm)"
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
                + Add another item
              </button>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Delivery Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Delivery Method
                </label>
                <select
                  name="delivery_method"
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                >
                  <option value="pickup">Customer Pickup</option>
                  <option value="delivery">Pro Graphics Delivery</option>
                  <option value="courier">Courier Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Expected Delivery Date
                </label>
                <input
                  name="delivery_date"
                  type="date"
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Delivery Notes
                </label>
                <textarea
                  name="delivery_notes"
                  rows={2}
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="Special delivery instructions..."
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Additional Notes</h2>
            <textarea
              name="notes"
              rows={3}
              className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
              placeholder="Internal notes about this order..."
            />
          </div>
        </div>

        {/* Right column - Summary */}
        <div className="space-y-6">
          {/* Order summary */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  defaultValue="normal"
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                >
                  <option value="low">🟢 Low</option>
                  <option value="normal">🔵 Normal</option>
                  <option value="high">🟠 High</option>
                  <option value="urgent">🔴 Urgent</option>
                </select>
              </div>
            </div>
            <div className="border-t border-[#E8EEF4] pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#5A6A7A]">Amount (VAT included)</span>
                <span className="font-medium text-[#0D1B2A]">
                  R{total.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E8EEF4]">
                <span className="font-bold text-[#0D1B2A]">Total</span>
                <span className="font-bold text-[#FF6B35] text-lg">
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
              className="w-full bg-[#FF6B35] hover:bg-[#e85c28] disabled:opacity-50
                         text-white font-bold py-3 rounded-xl transition-colors"
            >
              {loading ? 'Creating Order...' : 'Create Order'}
            </button>
            <Link
              href="/admin/orders"
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
