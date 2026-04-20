// app/admin/inventory/orders/new/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Material {
  id: string
  name: string
  unit: string
}

export default function NewInventoryOrderPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [materials, setMaterials] = useState<Material[]>([])

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const res = await fetch('/api/inventory/materials', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          setMaterials(data)
        }
      } catch (err) {
        console.error('Failed to fetch materials:', err)
      }
    }
    fetchMaterials()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    const quantityOrdered = parseFloat(formData.get('quantity_ordered') as string)
    const unitPrice = parseFloat(formData.get('unit_price') as string)

    if (quantityOrdered <= 0) {
      setError('Quantity must be greater than 0')
      setLoading(false)
      return
    }

    if (unitPrice < 0) {
      setError('Unit price cannot be negative')
      setLoading(false)
      return
    }

    const orderData = {
      material_id: formData.get('material_id') as string,
      quantity_ordered: quantityOrdered,
      unit_price: unitPrice,
      order_date: formData.get('order_date') as string || new Date().toISOString().split('T')[0],
      expected_arrival_date: formData.get('expected_arrival_date') as string || null,
      manufacturer: formData.get('manufacturer') as string || null,
      notes: formData.get('notes') as string || null,
    }

    try {
      const response = await fetch('/api/inventory/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create order')
      }

      const order = await response.json()
      router.push(`/admin/inventory/orders/${order.id}`)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const totalCost = (() => {
    const qty = parseFloat((document.getElementById('quantity_ordered') as HTMLInputElement)?.value || '0')
    const price = parseFloat((document.getElementById('unit_price') as HTMLInputElement)?.value || '0')
    return qty * price
  })()

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/inventory"
          className="text-[#5A6A7A] hover:text-[#0D1B2A] transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-[#0D1B2A] font-black text-3xl">New Inventory Order</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Material *
                </label>
                <select
                  name="material_id"
                  required
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select material...</option>
                  {materials.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Quantity (meters) *
                </label>
                <input
                  id="quantity_ordered"
                  name="quantity_ordered"
                  type="number"
                  min="0.1"
                  step="0.1"
                  required
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., 20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Unit Price (R/meter) *
                </label>
                <input
                  id="unit_price"
                  name="unit_price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., 150.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Manufacturer
                </label>
                <input
                  name="manufacturer"
                  type="text"
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., 3M China, Avery Dennison"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Order Date
                </label>
                <input
                  name="order_date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Expected Arrival Date
                </label>
                <input
                  name="expected_arrival_date"
                  type="date"
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="Additional notes about this order..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#5A6A7A]">Quantity</span>
                <span id="qty-display" className="font-medium text-[#0D1B2A]">-</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5A6A7A]">Unit Price</span>
                <span id="price-display" className="font-medium text-[#0D1B2A]">-</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E8EEF4]">
                <span className="font-bold text-[#0D1B2A]">Total Cost</span>
                <span id="total-display" className="font-bold text-[#FF6B35] text-lg">R0.00</span>
              </div>
            </div>
          </div>

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
              {loading ? 'Creating Order...' : 'Create Inventory Order'}
            </button>
            <Link
              href="/admin/inventory"
              className="block text-center text-[#5A6A7A] mt-3 text-sm hover:text-[#0D1B2A]"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('quantity_ordered')?.addEventListener('input', updateTotal);
          document.getElementById('unit_price')?.addEventListener('input', updateTotal);
          function updateTotal() {
            const qty = parseFloat(document.getElementById('quantity_ordered')?.value || 0);
            const price = parseFloat(document.getElementById('unit_price')?.value || 0);
            const total = qty * price;
            document.getElementById('qty-display').textContent = qty + ' meters';
            document.getElementById('price-display').textContent = 'R' + price.toFixed(2);
            document.getElementById('total-display').textContent = 'R' + total.toFixed(2);
          }
        `
      }} />
    </div>
  )
}