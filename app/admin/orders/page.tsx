// app/admin/orders/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending:    { bg: 'bg-yellow-50', text: 'text-yellow-600', label: 'Pending' },
  processing: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Processing' },
  ready:      { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Ready' },
  delivered:  { bg: 'bg-green-50', text: 'text-green-600', label: 'Delivered' },
  cancelled:  { bg: 'bg-gray-50', text: 'text-gray-500', label: 'Cancelled' },
}

const PRIORITY_ICONS: Record<string, string> = {
  low: '🟢',
  normal: '🔵',
  high: '🟠',
  urgent: '🔴',
}

type CustomerSummary = {
  name: string
  email: string
  company: string
  orders: number
  total: number
}

async function updateOrderStatus(orderId: string, newStatus: string) {
  'use server'
  const supabase = await createSupabaseServerClient()

  const updates: any = { status: newStatus }
  if (newStatus === 'delivered') {
    updates.completed_at = new Date().toISOString()
  }

  await supabase.from('orders').update(updates).eq('id', orderId)

  // Log activity
  await supabase.from('admin_activity_log').insert({
    action: 'order_status_updated',
    entity_type: 'order',
    entity_id: orderId,
    details: { new_status: newStatus },
  })

  revalidatePath('/admin/orders')
}

async function deleteOrder(orderId: string) {
  'use server'
  const supabase = await createSupabaseServerClient()
  await supabase.from('orders').delete().eq('id', orderId)
  revalidatePath('/admin/orders')
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>
}) {
  const supabase = await createSupabaseServerClient()
  const params = await searchParams
  const statusFilter = params.status || 'all'
  const searchQuery = params.search || ''

  let query = supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }

  if (searchQuery) {
    query = query.or(`order_number.ilike.%${searchQuery}%,customer_name.ilike.%${searchQuery}%`)
  }

  const { data: orders } = await query

  const safeOrders: any[] = (orders ?? []) as any[]
  const totalCustomers = new Set(
    safeOrders.map((order: any) => (order.customer_email || order.customer_name || '').toLowerCase())
  ).size
  const customerMap = safeOrders.reduce((map, order: any) => {
      const key = (order.customer_email || order.customer_name || '').toLowerCase()
      if (!key) return map

      const current = map.get(key) || {
        name: order.customer_name || 'Unknown',
        email: order.customer_email || '',
        company: order.customer_company || '',
        orders: 0,
        total: 0,
      }

      current.orders += 1
      current.total += Number(order.total) || 0
      map.set(key, current)
      return map
    }, new Map<string, CustomerSummary>())

  const customerSummary: CustomerSummary[] = (Array.from(customerMap.values()) as CustomerSummary[])
    .sort((a, b) => b.total - a.total)
  const totalAmount = safeOrders.reduce((sum: number, order: any) => {
    const total = Number(order.total) || 0
    return sum + total
  }, 0)
  const averageAmount = safeOrders.length ? (totalAmount / safeOrders.length) : 0

  // Get counts for each status
  const { data: counts } = await supabase
    .from('orders')
    .select('status', { count: 'exact' })

  const statusCounts = {
    all: counts?.length || 0,
    pending: counts?.filter(c => c.status === 'pending').length || 0,
    processing: counts?.filter(c => c.status === 'processing').length || 0,
    ready: counts?.filter(c => c.status === 'ready').length || 0,
    delivered: counts?.filter(c => c.status === 'delivered').length || 0,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#0D1B2A] font-black text-3xl mb-1">Orders</h1>
          <p className="text-[#5A6A7A] text-sm">
            Manage customer orders and track status updates
          </p>
        </div>
        <Link
          href="/admin/orders/new"
          className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold
                     px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          <span>➕</span> New Order
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
          <p className="text-[#5A6A7A] text-xs font-bold uppercase">Orders Shown</p>
          <p className="text-[#0D1B2A] text-2xl font-black mt-1">{safeOrders.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
          <p className="text-[#5A6A7A] text-xs font-bold uppercase">Customers</p>
          <p className="text-[#0D1B2A] text-2xl font-black mt-1">{totalCustomers}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
          <p className="text-[#5A6A7A] text-xs font-bold uppercase">Total Amount</p>
          <p className="text-[#0D1B2A] text-2xl font-black mt-1">
            R{totalAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-4">
          <p className="text-[#5A6A7A] text-xs font-bold uppercase">Avg / Order</p>
          <p className="text-[#0D1B2A] text-2xl font-black mt-1">
            R{averageAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All Orders', count: statusCounts.all },
          { key: 'pending', label: 'Pending', count: statusCounts.pending },
          { key: 'processing', label: 'Processing', count: statusCounts.processing },
          { key: 'ready', label: 'Ready', count: statusCounts.ready },
          { key: 'delivered', label: 'Delivered', count: statusCounts.delivered },
        ].map(({ key, label, count }) => (
          <Link
            key={key}
            href={`/admin/orders?status=${key}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${statusFilter === key
                ? 'bg-[#0D1B2A] text-white'
                : 'bg-white text-[#5A6A7A] hover:bg-gray-50 border border-[#E8EEF4]'
              }`}
          >
            {label}
            <span className="ml-2 text-xs opacity-70">({count})</span>
          </Link>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#F7F8FA] border-b border-[#E8EEF4]">
          {['Order #', 'Customer', 'Items Total', 'Status', 'Date', 'Actions'].map((h, i) => (
            <div
              key={h}
              className={`text-xs font-bold text-[#5A6A7A] uppercase tracking-wide
                ${i === 0 ? 'col-span-2' : i === 1 ? 'col-span-3' : i === 2 ? 'col-span-2' : i === 5 ? 'col-span-2 text-right' : 'col-span-2'}`}
            >
              {h}
            </div>
          ))}
        </div>

        {safeOrders.map((order: any) => (
          <div
            key={order.id}
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#E8EEF4]
                       hover:bg-[#FAFBFC] items-center"
          >
            {/* Order Number */}
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{PRIORITY_ICONS[order.priority || 'normal']}</span>
                <div>
                  <p className="font-bold text-[#0D1B2A] text-sm">{order.order_number}</p>
                  {order.delivery_method !== 'pickup' && (
                    <p className="text-[#5A6A7A] text-xs">{order.delivery_method}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Customer */}
            <div className="col-span-3">
              <p className="font-medium text-[#0D1B2A] text-sm">{order.customer_name}</p>
              {order.customer_company && (
                <p className="text-[#5A6A7A] text-xs">{order.customer_company}</p>
              )}
              <p className="text-[#5A6A7A] text-xs">{order.customer_email}</p>
            </div>

            {/* Total */}
            <div className="col-span-2">
              <p className="font-bold text-[#0D1B2A] text-sm">
                R{(Number(order.total) || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[#5A6A7A] text-xs">VAT already included</p>
            </div>

            {/* Status */}
            <div className="col-span-2">
              <form action={updateOrderStatus.bind(null, order.id, getNextStatus(order.status))}>
                <button
                  type="submit"
                  className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors
                    ${STATUS_COLORS[order.status]?.bg} ${STATUS_COLORS[order.status]?.text}
                    hover:opacity-80`}
                  title="Click to advance status"
                >
                  {STATUS_COLORS[order.status]?.label || order.status}
                  <span className="ml-1">→</span>
                </button>
              </form>
            </div>

            {/* Date */}
            <div className="col-span-1">
              <p className="text-[#5A6A7A] text-xs">
                {new Date(order.created_at).toLocaleDateString('en-ZA')}
              </p>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-end gap-2">
              <Link
                href={`/admin/orders/${order.id}`}
                className="text-[#FF6B35] text-xs font-bold hover:underline px-3 py-1.5
                           bg-[#FFF0E8] rounded-lg"
              >
                View
              </Link>
              <form action={deleteOrder.bind(null, order.id)}>
                <button
                  type="submit"
                  className="text-red-500 text-xs font-bold hover:underline px-3 py-1.5
                             bg-red-50 rounded-lg"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}

        {(safeOrders.length === 0) && (
          <div className="text-center py-16 text-[#5A6A7A]">
            <p className="text-4xl mb-3">📋</p>
            <p className="font-bold">No orders found</p>
            <p className="text-sm mt-1">
              {statusFilter !== 'all'
                ? `No ${statusFilter} orders. Try another filter.`
                : 'Create your first order to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Customers summary */}
      <div className="mt-6 bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8EEF4] bg-[#F7F8FA]">
          <h2 className="text-[#0D1B2A] font-bold">Customers</h2>
        </div>
        <div className="divide-y divide-[#E8EEF4]">
          {customerSummary.map((customer) => (
            <div key={`${customer.email}-${customer.name}`} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-[#0D1B2A] text-sm">{customer.name}</p>
                {customer.company && <p className="text-[#5A6A7A] text-xs">{customer.company}</p>}
                {customer.email && <p className="text-[#5A6A7A] text-xs">{customer.email}</p>}
              </div>
              <div className="text-right">
                <p className="text-[#0D1B2A] text-sm font-bold">{customer.orders} order{customer.orders === 1 ? '' : 's'}</p>
                <p className="text-[#5A6A7A] text-xs">
                  R{customer.total.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
          {customerSummary.length === 0 && (
            <div className="px-6 py-8 text-center text-[#5A6A7A] text-sm">
              No customers to show.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function getNextStatus(current: string): string {
  const flow = ['pending', 'processing', 'ready', 'delivered']
  const idx = flow.indexOf(current)
  if (idx === -1 || idx === flow.length - 1) return 'pending'
  return flow[idx + 1]
}
