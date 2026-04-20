// app/admin/inventory/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string }> = {
  coming_soon: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Coming Soon' },
  arrived: { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Arrived' },
  in_use: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'In Use' },
  depleted: { bg: 'bg-gray-50', text: 'text-gray-500', label: 'Depleted' },
}

async function updateOrderStatus(orderId: string, newStatus: string) {
  'use server'
  const supabase = await createSupabaseServerClient()
  const updates: Record<string, any> = { status: newStatus }

  if (newStatus === 'arrived') {
    updates.actual_arrival_date = new Date().toISOString().split('T')[0]
  }

  await supabase.from('inventory_orders').update(updates).eq('id', orderId)
  revalidatePath('/admin/inventory')
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; material?: string }>
}) {
  const supabase = await createSupabaseServerClient()
  const params = await searchParams
  const statusFilter = params.status || 'all'
  const materialFilter = params.material || 'all'

  const { data: materials } = await supabase
    .from('materials')
    .select('*')
    .order('name', { ascending: true })

  let ordersQuery = supabase
    .from('inventory_orders')
    .select('*, materials(name, unit)')
    .order('created_at', { ascending: false })

  if (statusFilter !== 'all') {
    ordersQuery = ordersQuery.eq('status', statusFilter)
  }

  if (materialFilter !== 'all') {
    ordersQuery = ordersQuery.eq('material_id', materialFilter)
  }

  const { data: orders } = await ordersQuery

  const { data: allUsage } = await supabase
    .from('material_usage')
    .select('inventory_order_id, quantity_used')

  const usageByOrder: Record<string, number> = {}
  for (const u of (allUsage || [])) {
    usageByOrder[u.inventory_order_id] = (usageByOrder[u.inventory_order_id] || 0) + Number(u.quantity_used)
  }

  const materialStats: Record<string, { name: string; totalOrdered: number; totalUsed: number }> = {}

  for (const order of (orders || [])) {
    const matName = order.materials?.name || 'Unknown'
    if (!materialStats[matName]) {
      materialStats[matName] = { name: matName, totalOrdered: 0, totalUsed: 0 }
    }
    materialStats[matName].totalOrdered += Number(order.quantity_ordered)
    materialStats[matName].totalUsed += usageByOrder[order.id] || 0
  }

  const stats = Object.values(materialStats)
  const totalValue = (orders || []).reduce((sum, o) => sum + Number(o.total_cost || 0), 0)

  const getNextStatus = (current: string): string => {
    const flow = ['coming_soon', 'arrived', 'in_use', 'depleted']
    const idx = flow.indexOf(current)
    if (idx === -1 || idx === flow.length - 1) return current
    return flow[idx + 1]
  }

  const buildUrl = (next: Record<string, string>) => {
    const query = new URLSearchParams()
    if (next.status && next.status !== 'all') query.set('status', next.status)
    if (next.material && next.material !== 'all') query.set('material', next.material)
    const qs = query.toString()
    return qs ? `/admin/inventory?${qs}` : '/admin/inventory'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#0D1B2A] font-black text-3xl mb-1">Inventory</h1>
          <p className="text-[#5A6A7A] text-sm">
            Track materials, orders, and usage
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/inventory/materials"
            className="bg-white hover:bg-gray-50 text-[#0D1B2A] font-bold px-5 py-3 rounded-xl border border-[#E8EEF4] transition-colors"
          >
            Materials
          </Link>
          <Link
            href="/admin/inventory/reports"
            className="bg-white hover:bg-gray-50 text-[#0D1B2A] font-bold px-5 py-3 rounded-xl border border-[#E8EEF4] transition-colors"
          >
            Reports
          </Link>
          <Link
            href="/admin/inventory/orders/new"
            className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
          >
            <span>+</span> New Order
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
          <p className="text-[#5A6A7A] text-xs font-bold uppercase">Total Orders</p>
          <p className="text-[#0D1B2A] text-2xl font-black mt-1">{(orders || []).length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
          <p className="text-[#5A6A7A] text-xs font-bold uppercase">Material Types</p>
          <p className="text-[#0D1B2A] text-2xl font-black mt-1">{stats.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
          <p className="text-[#5A6A7A] text-xs font-bold uppercase">Total Value</p>
          <p className="text-[#0D1B2A] text-2xl font-black mt-1">
            R{totalValue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
          <p className="text-[#5A6A7A] text-xs font-bold uppercase">Active Orders</p>
          <p className="text-[#0D1B2A] text-2xl font-black mt-1">
            {(orders || []).filter(o => o.status !== 'depleted').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-[#5A6A7A]">Status:</label>
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'coming_soon', label: 'Coming Soon' },
                { key: 'arrived', label: 'Arrived' },
                { key: 'in_use', label: 'In Use' },
                { key: 'depleted', label: 'Depleted' },
              ].map(s => (
                <Link
                  key={s.key}
                  href={buildUrl({ status: s.key, material: materialFilter })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    statusFilter === s.key
                      ? 'bg-[#0D1B2A] text-white'
                      : 'bg-[#F7F8FA] text-[#5A6A7A] hover:bg-[#E8EEF4]'
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <form method="get" className="flex items-center gap-2 ml-auto">
            <input type="hidden" name="status" value={statusFilter} />
            <label className="text-xs font-bold text-[#5A6A7A]">Material:</label>
            <select
              name="material"
              defaultValue={materialFilter}
              className="border border-[#E8EEF4] outline-none focus:border-[#FF6B35] rounded-lg px-3 py-1.5 text-xs transition-colors"
            >
              <option value="all">All Materials</option>
              {(materials || []).map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-[#0D1B2A] hover:bg-[#1C2B3A] text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors"
            >
              Filter
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-[#E8EEF4] bg-[#F7F8FA]">
          <h2 className="text-[#0D1B2A] font-bold">Material Summary</h2>
        </div>
        <div className="divide-y divide-[#E8EEF4]">
          {stats.length === 0 ? (
            <div className="px-6 py-8 text-center text-[#5A6A7A]">
              No materials yet. Create your first inventory order to get started.
            </div>
          ) : (
            stats.map(stat => {
              const remaining = stat.totalOrdered - stat.totalUsed
              const usagePct = stat.totalOrdered > 0 ? (stat.totalUsed / stat.totalOrdered) * 100 : 0
              return (
                <div key={stat.name} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#0D1B2A]">{stat.name}</p>
                    <p className="text-[#5A6A7A] text-xs">
                      Ordered: {stat.totalOrdered.toFixed(1)}m
                      {stat.totalUsed > 0 && ` • Used: ${stat.totalUsed.toFixed(1)}m`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <div className="h-2 bg-[#E8EEF4] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF6B35] rounded-full transition-all"
                          style={{ width: `${Math.min(usagePct, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-[#5A6A7A] mt-1 text-right">
                        {usagePct.toFixed(0)}% used
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#0D1B2A]">{remaining.toFixed(1)}m</p>
                      <p className="text-xs text-[#5A6A7A]">remaining</p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-[#F7F8FA] border-b border-[#E8EEF4]">
          <h2 className="text-[#0D1B2A] font-bold">Inventory Orders</h2>
        </div>
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#F7F8FA] border-b border-[#E8EEF4]">
          {['Material', 'Qty Ordered', 'Unit Price', 'Total', 'Status', 'Expected', 'Actions'].map((h, i) => (
            <div
              key={h}
              className={`text-xs font-bold text-[#5A6A7A] uppercase tracking-wide ${
                i === 0 ? 'col-span-2' : i === 6 ? 'col-span-2 text-right' : 'col-span-2'
              }`}
            >
              {h}
            </div>
          ))}
        </div>

        {(orders || []).map(order => {
          const usedQty = usageByOrder[order.id] || 0
          const usagePct = Number(order.quantity_ordered) > 0
            ? (usedQty / Number(order.quantity_ordered)) * 100
            : 0
          return (
            <div
              key={order.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#E8EEF4] hover:bg-[#FAFBFC] items-center"
            >
              <div className="col-span-2">
                <p className="font-bold text-[#0D1B2A] text-sm">{order.materials?.name}</p>
                {order.manufacturer && (
                  <p className="text-[#5A6A7A] text-xs">{order.manufacturer}</p>
                )}
              </div>
              <div className="col-span-2">
                <p className="font-bold text-[#0D1B2A] text-sm">{Number(order.quantity_ordered).toFixed(1)}m</p>
                <p className="text-[#5A6A7A] text-xs">
                  Used: {usedQty.toFixed(1)}m ({usagePct.toFixed(0)}%)
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-[#0D1B2A] text-sm">
                  R{Number(order.unit_price).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="col-span-2">
                <p className="font-bold text-[#0D1B2A] text-sm">
                  R{Number(order.total_cost || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="col-span-2">
                <form action={updateOrderStatus.bind(null, order.id, getNextStatus(order.status))}>
                  <button
                    type="submit"
                    className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors ${STATUS_CONFIG[order.status]?.bg} ${STATUS_CONFIG[order.status]?.text} hover:opacity-80`}
                    title="Click to advance status"
                  >
                    {STATUS_CONFIG[order.status]?.label || order.status}
                    {order.status !== 'depleted' && <span className="ml-1">→</span>}
                  </button>
                </form>
                {order.actual_arrival_date && (
                  <p className="text-[#5A6A7A] text-xs mt-1">
                    Arrived: {new Date(order.actual_arrival_date).toLocaleDateString('en-ZA')}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <p className="text-[#5A6A7A] text-xs">
                  {order.expected_arrival_date
                    ? new Date(order.expected_arrival_date).toLocaleDateString('en-ZA')
                    : '-'}
                </p>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Link
                  href={`/admin/inventory/orders/${order.id}`}
                  className="text-[#FF6B35] text-xs font-bold hover:underline px-3 py-1.5 bg-[#FFF0E8] rounded-lg"
                >
                  View
                </Link>
              </div>
            </div>
          )
        })}

        {(orders || []).length === 0 && (
          <div className="text-center py-16 text-[#5A6A7A]">
            <p className="text-4xl mb-3">📦</p>
            <p className="font-bold">No inventory orders found</p>
            <p className="text-sm mt-1">
              Create your first order to start tracking inventory.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}