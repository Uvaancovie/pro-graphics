// app/admin/inventory/orders/[id]/page.tsx
'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'

interface Usage {
  id: string
  quantity_used: number
  usage_date: string
  project_name: string
  notes: string | null
  created_at: string
}

interface Order {
  id: string
  material_id: string
  quantity_ordered: number
  unit_price: number
  total_cost: number
  order_date: string
  expected_arrival_date: string | null
  actual_arrival_date: string | null
  status: string
  manufacturer: string | null
  notes: string | null
  materials: { id: string; name: string; unit: string }
  usage: Usage[]
}

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  coming_soon: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Coming Soon' },
  arrived: { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Arrived' },
  in_use: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'In Use' },
  depleted: { bg: 'bg-gray-50', text: 'text-gray-500', label: 'Depleted' },
}

const STATUS_FLOW = ['coming_soon', 'arrived', 'in_use', 'depleted']

export default function InventoryOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showUsageForm, setShowUsageForm] = useState(false)
  const [submittingUsage, setSubmittingUsage] = useState(false)
  const [usageError, setUsageError] = useState('')
  const [editingUsageId, setEditingUsageId] = useState<string | null>(null)
  const [editingOrder, setEditingOrder] = useState(false)
  const [materials, setMaterials] = useState<{id: string, name: string}[]>([])

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/inventory/orders/${resolvedParams.id}`)
        if (!res.ok) {
          throw new Error('Order not found')
        }
        const data = await res.json()
        setOrder(data)

        const resMat = await fetch('/api/inventory/materials', { cache: 'no-store' })
        if (resMat.ok) {
          setMaterials(await resMat.json())
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [resolvedParams.id])

  async function updateStatus(newStatus: string) {
    if (!order) return
    try {
      const res = await fetch(`/api/inventory/orders/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error('Failed to update status')
      const data = await res.json()
      setOrder({ ...order, ...data })
    } catch (err: any) {
      setError(err.message)
    }
  }

  async function submitUsage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!order) return

    setSubmittingUsage(true)
    setUsageError('')

    const formData = new FormData(e.currentTarget)
    const quantityUsed = parseFloat(formData.get('quantity_used') as string)

    const totalUsed = order.usage.reduce((sum, u) => sum + Number(u.quantity_used), 0)
    if (quantityUsed > Number(order.quantity_ordered) - totalUsed) {
      setUsageError(`Maximum available: ${(Number(order.quantity_ordered) - totalUsed).toFixed(1)}m`)
      setSubmittingUsage(false)
      return
    }

    try {
      const res = await fetch(`/api/inventory/orders/${resolvedParams.id}/usage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantity_used: quantityUsed,
          usage_date: formData.get('usage_date') as string,
          project_name: formData.get('project_name') as string,
          notes: formData.get('notes') as string || null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to log usage')
      }

      const newUsage = await res.json()
      setOrder({
        ...order,
        usage: [newUsage, ...order.usage],
        status: newUsage.quantity_used >= Number(order.quantity_ordered) ? 'depleted' : 'in_use',
      })
      setShowUsageForm(false)
      ;(e.target as HTMLFormElement).reset()
    } catch (err: any) {
      setUsageError(err.message)
    } finally {
      setSubmittingUsage(false)
    }
  }

  async function updateUsage(e: React.FormEvent<HTMLFormElement>, usageId: string, oldQuantity: number) {
    e.preventDefault()
    if (!order) return
    const formData = new FormData(e.currentTarget)
    const newQuantity = parseFloat(formData.get('quantity_used') as string)
    
    const totalUsed = order.usage.reduce((sum, u) => sum + Number(u.quantity_used), 0)
    const available = Number(order.quantity_ordered) - totalUsed + oldQuantity

    if (newQuantity > available) {
      alert(`Maximum available: ${available.toFixed(1)}m`)
      return
    }

    try {
      const res = await fetch(`/api/inventory/usage/${usageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantity_used: newQuantity,
          usage_date: formData.get('usage_date') as string,
          project_name: formData.get('project_name') as string,
          notes: formData.get('notes') as string || null,
        }),
      })

      if (!res.ok) throw new Error('Failed to update')
      const updatedUsage = await res.json()
      
      setOrder({
        ...order,
        usage: order.usage.map(u => u.id === usageId ? updatedUsage : u)
      })
      setEditingUsageId(null)
    } catch (err: any) {
      alert(err.message)
    }
  }

  async function deleteUsage(usageId: string) {
    if (!order || !window.confirm('Are you sure you want to delete this usage log?')) return
    try {
      const res = await fetch(`/api/inventory/usage/${usageId}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete')
      
      setOrder({
        ...order,
        usage: order.usage.filter(u => u.id !== usageId)
      })
    } catch (err: any) {
      alert(err.message)
    }
  }

  async function updateOrderDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!order) return
    const formData = new FormData(e.currentTarget)
    
    const newQty = parseFloat(formData.get('quantity_ordered') as string)
    const totalUsed = order.usage.reduce((sum, u) => sum + Number(u.quantity_used), 0)
    
    if (newQty < totalUsed) {
      alert(`Cannot set quantity below already used amount (${totalUsed.toFixed(1)}m)`)
      return
    }

    try {
      const res = await fetch(`/api/inventory/orders/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          material_id: formData.get('material_id') as string,
          quantity_ordered: newQty,
          unit_price: parseFloat(formData.get('unit_price') as string),
          expected_arrival_date: formData.get('expected_arrival_date') as string || null,
          manufacturer: formData.get('manufacturer') as string || null,
          order_date: formData.get('order_date') as string
        }),
      })

      if (!res.ok) throw new Error('Failed to update order details')
      const data = await res.json()
      
      const newMat = materials.find(m => m.id === formData.get('material_id'))
      setOrder({ ...order, ...data, materials: newMat || order.materials })
      setEditingOrder(false)
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#5A6A7A]">Loading...</div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-bold">{error || 'Order not found'}</p>
        <Link href="/admin/inventory" className="text-[#FF6B35] hover:underline mt-4 block">
          ← Back to Inventory
        </Link>
      </div>
    )
  }

  const totalUsed = order.usage.reduce((sum, u) => sum + Number(u.quantity_used), 0)
  const remaining = Number(order.quantity_ordered) - totalUsed
  const usagePct = Number(order.quantity_ordered) > 0 ? (totalUsed / Number(order.quantity_ordered)) * 100 : 0
  const currentStatusIdx = STATUS_FLOW.indexOf(order.status)

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/inventory"
          className="text-[#5A6A7A] hover:text-[#0D1B2A] transition-colors"
        >
          ← Back
        </Link>
        <div>
          <h1 className="text-[#0D1B2A] font-black text-3xl">Inventory Order</h1>
          <p className="text-[#5A6A7A] text-sm">{order.materials?.name} • {order.manufacturer || 'No manufacturer'}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-bold text-[#0D1B2A] text-xl">{order.materials?.name}</h2>
                <p className="text-[#5A6A7A] text-sm">Ordered: {new Date(order.order_date).toLocaleDateString('en-ZA')}</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-bold text-sm ${STATUS_COLORS[order.status]?.bg} ${STATUS_COLORS[order.status]?.text}`}>
                {STATUS_COLORS[order.status]?.label || order.status}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-[#F7F8FA] rounded-xl p-4">
                <p className="text-[#5A6A7A] text-xs font-bold uppercase mb-1">Quantity</p>
                <p className="text-[#0D1B2A] text-xl font-black">{Number(order.quantity_ordered).toFixed(1)}m</p>
              </div>
              <div className="bg-[#F7F8FA] rounded-xl p-4">
                <p className="text-[#5A6A7A] text-xs font-bold uppercase mb-1">Used</p>
                <p className="text-[#0D1B2A] text-xl font-black">{totalUsed.toFixed(1)}m</p>
              </div>
              <div className="bg-[#F7F8FA] rounded-xl p-4">
                <p className="text-[#5A6A7A] text-xs font-bold uppercase mb-1">Remaining</p>
                <p className="text-[#0D1B2A] text-xl font-black">{remaining.toFixed(1)}m</p>
              </div>
              <div className="bg-[#F7F8FA] rounded-xl p-4">
                <p className="text-[#5A6A7A] text-xs font-bold uppercase mb-1">Total Cost</p>
                <p className="text-[#0D1B2A] text-xl font-black">
                  R{Number(order.total_cost || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#5A6A7A]">Usage Progress</span>
                <span className="font-bold text-[#0D1B2A]">{usagePct.toFixed(0)}%</span>
              </div>
              <div className="h-4 bg-[#E8EEF4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF6B35] rounded-full transition-all"
                  style={{ width: `${Math.min(usagePct, 100)}%` }}
                />
              </div>
            </div>

            {order.notes && (
              <div className="border-t border-[#E8EEF4] pt-4 mt-4">
                <p className="text-[#5A6A7A] text-xs font-bold uppercase mb-1">Notes</p>
                <p className="text-[#0D1B2A]">{order.notes}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8EEF4] bg-[#F7F8FA] flex items-center justify-between">
              <h2 className="font-bold text-[#0D1B2A]">Material Usage History</h2>
              {!showUsageForm && order.status !== 'depleted' && (
                <button
                  onClick={() => setShowUsageForm(true)}
                  className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  + Log Usage
                </button>
              )}
            </div>

            {showUsageForm && (
              <form onSubmit={submitUsage} className="p-6 bg-[#FAFBFC] border-b border-[#E8EEF4]">
                <h3 className="font-bold text-[#0D1B2A] mb-4">Log New Usage</h3>
                {usageError && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                    {usageError}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                      Quantity Used (meters) *
                    </label>
                    <input
                      name="quantity_used"
                      type="number"
                      min="0.1"
                      max={remaining}
                      step="0.1"
                      required
                      className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                      placeholder={`Max: ${remaining.toFixed(1)}m`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                      Usage Date *
                    </label>
                    <input
                      name="usage_date"
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                      Project Name *
                    </label>
                    <input
                      name="project_name"
                      type="text"
                      required
                      className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                      placeholder="e.g., Vehicle wrap - Toyota Corolla"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                      placeholder="Optional notes..."
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submittingUsage}
                    className="bg-[#FF6B35] hover:bg-[#e85c28] disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    {submittingUsage ? 'Saving...' : 'Save Usage'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowUsageForm(false); setUsageError('') }}
                    className="bg-gray-200 hover:bg-gray-300 text-[#0D1B2A] font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="divide-y divide-[#E8EEF4]">
              {order.usage.length === 0 ? (
                <div className="px-6 py-8 text-center text-[#5A6A7A]">
                  <p className="text-4xl mb-3">📊</p>
                  <p className="font-bold">No usage recorded yet</p>
                  <p className="text-sm mt-1">Log material usage as you complete projects</p>
                </div>
              ) : (
                order.usage.map((u) => (
                  <div key={u.id} className="px-6 py-4 flex flex-col border-b border-[#E8EEF4] last:border-0 hover:bg-[#FAFBFC]">
                    {editingUsageId === u.id ? (
                      <form onSubmit={(e) => updateUsage(e, u.id, Number(u.quantity_used))} className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 sm:col-span-4">
                          <label className="block text-xs font-bold text-[#5A6A7A] mb-1">Project / Asset</label>
                          <input type="text" name="project_name" defaultValue={u.project_name} required className="w-full text-sm border border-[#E8EEF4] rounded px-2 py-1" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-xs font-bold text-[#5A6A7A] mb-1">Date</label>
                          <input type="date" name="usage_date" defaultValue={u.usage_date} required className="w-full text-sm border border-[#E8EEF4] rounded px-2 py-1" />
                        </div>
                        <div className="col-span-6 sm:col-span-2">
                          <label className="block text-xs font-bold text-[#5A6A7A] mb-1">Qty (m)</label>
                          <input type="number" name="quantity_used" defaultValue={u.quantity_used} min="0.1" step="0.1" max={remaining + Number(u.quantity_used)} required className="w-full text-sm border border-[#E8EEF4] rounded px-2 py-1" />
                        </div>
                        <div className="col-span-12 sm:col-span-3 flex items-end gap-2">
                          <button type="submit" className="text-white text-xs bg-[#FF6B35] font-bold px-3 py-1.5 rounded">Save</button>
                          <button type="button" onClick={() => setEditingUsageId(null)} className="text-[#5A6A7A] text-xs bg-gray-200 font-bold px-3 py-1.5 rounded">Cancel</button>
                        </div>
                        <div className="col-span-12">
                          <label className="block text-xs font-bold text-[#5A6A7A] mb-1">Notes</label>
                          <input type="text" name="notes" defaultValue={u.notes || ''} className="w-full text-sm border border-[#E8EEF4] rounded px-2 py-1" />
                        </div>
                      </form>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <p className="font-bold text-[#0D1B2A]">{u.project_name}</p>
                          <p className="text-[#5A6A7A] text-xs">
                            {new Date(u.usage_date).toLocaleDateString('en-ZA')}
                            {u.notes && ` • ${u.notes}`}
                          </p>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          <p className="font-bold text-[#0D1B2A]">{Number(u.quantity_used).toFixed(1)}m</p>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingUsageId(u.id)} className="text-xs text-[#5A6A7A] hover:text-[#0D1B2A]">Edit</button>
                            <button onClick={() => deleteUsage(u.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-[#F7F8FA] border-b border-[#E8EEF4] flex items-center justify-between">
              <h2 className="font-bold text-[#0D1B2A]">Order Information</h2>
              {!editingOrder && (
                <button
                  onClick={() => setEditingOrder(true)}
                  className="text-xs text-[#5A6A7A] hover:text-[#0D1B2A] font-bold"
                >
                  Edit Order
                </button>
              )}
            </div>
            
            {editingOrder ? (
              <form onSubmit={updateOrderDetails} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#5A6A7A] mb-1">Material</label>
                  <select name="material_id" defaultValue={order.material_id} required className="w-full text-sm border border-[#E8EEF4] rounded-lg px-3 py-2">
                    {materials.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5A6A7A] mb-1">Manufacturer</label>
                  <input type="text" name="manufacturer" defaultValue={order.manufacturer || ''} className="w-full text-sm border border-[#E8EEF4] rounded-lg px-3 py-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5A6A7A] mb-1">Qty Ordered (m)</label>
                    <input type="number" name="quantity_ordered" defaultValue={order.quantity_ordered} min={totalUsed || 0.1} step="0.1" required className="w-full text-sm border border-[#E8EEF4] rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5A6A7A] mb-1">Unit Price (R)</label>
                    <input type="number" name="unit_price" defaultValue={order.unit_price} min="0" step="0.01" required className="w-full text-sm border border-[#E8EEF4] rounded-lg px-3 py-2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5A6A7A] mb-1">Order Date</label>
                    <input type="date" name="order_date" defaultValue={order.order_date} required className="w-full text-sm border border-[#E8EEF4] rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5A6A7A] mb-1">Expected Arrival</label>
                    <input type="date" name="expected_arrival_date" defaultValue={order.expected_arrival_date || ''} className="w-full text-sm border border-[#E8EEF4] rounded-lg px-3 py-2" />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 bg-[#0D1B2A] hover:bg-[#1C2B3A] text-white font-bold py-2 rounded-lg text-sm transition-colors">Save</button>
                  <button type="button" onClick={() => setEditingOrder(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-[#0D1B2A] font-bold py-2 rounded-lg text-sm transition-colors">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="p-6 space-y-3 text-sm">
                <div>
                  <p className="text-[#5A6A7A]">Material</p>
                  <p className="font-medium text-[#0D1B2A]">{order.materials?.name}</p>
                </div>
                <div>
                  <p className="text-[#5A6A7A]">Manufacturer</p>
                  <p className="font-medium text-[#0D1B2A]">{order.manufacturer || '-'}</p>
                </div>
                <div>
                  <p className="text-[#5A6A7A]">Unit Price</p>
                  <p className="font-medium text-[#0D1B2A]">
                    R{Number(order.unit_price).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}/m
                  </p>
                </div>
                <div>
                  <p className="text-[#5A6A7A]">Order Date</p>
                  <p className="font-medium text-[#0D1B2A]">{new Date(order.order_date).toLocaleDateString('en-ZA')}</p>
                </div>
                <div>
                  <p className="text-[#5A6A7A]">Expected Arrival</p>
                  <p className="font-medium text-[#0D1B2A]">
                    {order.expected_arrival_date
                      ? new Date(order.expected_arrival_date).toLocaleDateString('en-ZA')
                      : '-'}
                  </p>
                </div>
                {order.actual_arrival_date && (
                  <div>
                    <p className="text-[#5A6A7A]">Actual Arrival</p>
                    <p className="font-medium text-[#0D1B2A]">
                      {new Date(order.actual_arrival_date).toLocaleDateString('en-ZA')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Update Status</h2>
            <p className="text-[#5A6A7A] text-xs mb-4">
              Current: <span className="font-bold">{STATUS_COLORS[order.status]?.label}</span>
            </p>
            <div className="space-y-2">
              {STATUS_FLOW.slice(currentStatusIdx + 1).map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${STATUS_COLORS[status]?.bg} ${STATUS_COLORS[status]?.text} hover:opacity-80`}
                >
                  Mark as {STATUS_COLORS[status]?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}