// app/admin/orders/[id]/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending:    { bg: 'bg-yellow-50', text: 'text-yellow-600', label: 'Pending' },
  processing: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Processing' },
  ready:      { bg: 'bg-purple-50', text: 'text-purple-600', label: 'Ready' },
  delivered:  { bg: 'bg-green-50', text: 'text-green-600', label: 'Delivered' },
  cancelled:  { bg: 'bg-gray-50', text: 'text-gray-500', label: 'Cancelled' },
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .single()

  if (!order) return notFound()

  const { data: invoices } = await supabase
    .from('invoices')
    .select('*')
    .eq('order_id', id)
    .order('created_at', { ascending: false })

  async function generateInvoice() {
    'use server'
    const supabase = await createSupabaseServerClient()

    // Create invoice from order
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 30)

    const { data: invoice } = await supabase
      .from('invoices')
      .insert({
        order_id: id,
        customer_id: order.customer_id,
        status: 'draft',
        subtotal: order.subtotal,
        tax_rate: order.tax_rate,
        tax_amount: order.tax_amount,
        total: order.total,
        due_date: dueDate.toISOString().split('T')[0],
      })
      .select()
      .single()

    if (invoice) {
      await supabase.from('admin_activity_log').insert({
        action: 'invoice_created',
        entity_type: 'invoice',
        entity_id: invoice.id,
        details: { order_id: id, invoice_number: invoice.invoice_number },
      })
    }

    revalidatePath(`/admin/orders/${id}`)
  }

  async function updateStatus(newStatus: string) {
    'use server'
    const supabase = await createSupabaseServerClient()
    const updates: any = { status: newStatus }
    if (newStatus === 'delivered') {
      updates.completed_at = new Date().toISOString()
    }
    await supabase.from('orders').update(updates).eq('id', id)
    revalidatePath(`/admin/orders/${id}`)
    revalidatePath('/admin/orders')
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/orders"
            className="text-[#5A6A7A] hover:text-[#0D1B2A] transition-colors"
          >
            ← Back
          </Link>
          <div>
            <h1 className="text-[#0D1B2A] font-black text-3xl">{order.order_number}</h1>
            <p className="text-[#5A6A7A] text-sm">
              Created {new Date(order.created_at).toLocaleDateString('en-ZA')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <form action={generateInvoice}>
            <button
              type="submit"
              className="bg-[#1AB5A0] hover:bg-[#159a88] text-white font-bold
                         px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
            >
              <span>📄</span> Generate Invoice
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left column - Order details */}
        <div className="col-span-2 space-y-6">
          {/* Status card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#0D1B2A]">Order Status</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-bold
                ${STATUS_COLORS[order.status]?.bg} ${STATUS_COLORS[order.status]?.text}`}>
                {STATUS_COLORS[order.status]?.label || order.status}
              </span>
            </div>
            <div className="flex gap-2">
              {['pending', 'processing', 'ready', 'delivered'].map((status) => (
                <form key={status} action={updateStatus.bind(null, status)}>
                  <button
                    type="submit"
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                      ${order.status === status
                        ? 'bg-[#0D1B2A] text-white'
                        : 'bg-gray-100 text-[#5A6A7A] hover:bg-gray-200'
                      }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                </form>
              ))}
            </div>
          </div>

          {/* Order items */}
          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8EEF4]">
              <h2 className="font-bold text-[#0D1B2A]">Order Items</h2>
            </div>
            <div className="divide-y divide-[#E8EEF4]">
              {order.order_items?.map((item: any) => (
                <div key={item.id} className="px-6 py-4 flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-[#0D1B2A] text-sm">{item.product_name}</p>
                    <p className="text-[#5A6A7A] text-xs mt-1">{item.description}</p>
                    {item.dimensions && (
                      <p className="text-[#5A6A7A] text-xs mt-1">Dimensions: {item.dimensions}</p>
                    )}
                    {item.material && (
                      <p className="text-[#5A6A7A] text-xs">Material: {item.material}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#0D1B2A] text-sm">
                      R{item.line_total?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[#5A6A7A] text-xs">
                      {item.quantity} × R{item.unit_price}
                      {item.markup_percent > 0 && ` (+${item.markup_percent}%)`}
                    </p>
                  </div>
                </div>
              ))}
              {(!order.order_items || order.order_items.length === 0) && (
                <div className="px-6 py-8 text-center text-[#5A6A7A]">
                  <p>No items in this order</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-[#F7F8FA] border-t border-[#E8EEF4]">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5A6A7A]">Subtotal</span>
                  <span className="font-medium text-[#0D1B2A]">
                    R{order.subtotal?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5A6A7A]">VAT ({order.tax_rate}%)</span>
                  <span className="font-medium text-[#0D1B2A]">
                    R{order.tax_amount?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8EEF4]">
                  <span className="font-bold text-[#0D1B2A]">Total</span>
                  <span className="font-bold text-[#FF6B35] text-lg">
                    R{order.total?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery info */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Delivery Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#5A6A7A] text-xs uppercase font-bold">Method</p>
                <p className="text-[#0D1B2A] text-sm capitalize">{order.delivery_method}</p>
              </div>
              {order.delivery_date && (
                <div>
                  <p className="text-[#5A6A7A] text-xs uppercase font-bold">Expected Date</p>
                  <p className="text-[#0D1B2A] text-sm">
                    {new Date(order.delivery_date).toLocaleDateString('en-ZA')}
                  </p>
                </div>
              )}
            </div>
            {order.delivery_notes && (
              <div className="mt-4">
                <p className="text-[#5A6A7A] text-xs uppercase font-bold">Notes</p>
                <p className="text-[#0D1B2A] text-sm mt-1">{order.delivery_notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Customer & Invoices */}
        <div className="space-y-6">
          {/* Customer card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Customer</h2>
            <div className="space-y-3">
              <div>
                <p className="text-[#5A6A7A] text-xs">Name</p>
                <p className="font-medium text-[#0D1B2A] text-sm">{order.customer_name}</p>
              </div>
              {order.customer_company && (
                <div>
                  <p className="text-[#5A6A7A] text-xs">Company</p>
                  <p className="font-medium text-[#0D1B2A] text-sm">{order.customer_company}</p>
                </div>
              )}
              <div>
                <p className="text-[#5A6A7A] text-xs">Email</p>
                <p className="font-medium text-[#0D1B2A] text-sm">{order.customer_email}</p>
              </div>
              {order.customer_phone && (
                <div>
                  <p className="text-[#5A6A7A] text-xs">Phone</p>
                  <p className="font-medium text-[#0D1B2A] text-sm">{order.customer_phone}</p>
                </div>
              )}
              {order.customer_address && (
                <div>
                  <p className="text-[#5A6A7A] text-xs">Address</p>
                  <p className="font-medium text-[#0D1B2A] text-sm whitespace-pre-line">
                    {order.customer_address}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Invoices */}
          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8EEF4]">
              <h2 className="font-bold text-[#0D1B2A]">Invoices</h2>
            </div>
            <div className="divide-y divide-[#E8EEF4]">
              {invoices?.map((invoice: any) => (
                <div key={invoice.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#0D1B2A] text-sm">{invoice.invoice_number}</p>
                      <p className="text-[#5A6A7A] text-xs">
                        {new Date(invoice.issue_date).toLocaleDateString('en-ZA')} • {invoice.status}
                      </p>
                    </div>
                    <span className="font-bold text-[#0D1B2A] text-sm">
                      R{invoice.total?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Link
                      href={`/admin/invoices/${invoice.id}`}
                      className="text-[#FF6B35] text-xs font-bold hover:underline"
                    >
                      View →
                    </Link>
                    {invoice.pdf_url && (
                      <a
                        href={invoice.pdf_url}
                        className="text-[#1AB5A0] text-xs font-bold hover:underline"
                      >
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {(!invoices || invoices.length === 0) && (
                <div className="px-6 py-4 text-center text-[#5A6A7A] text-sm">
                  No invoices yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
