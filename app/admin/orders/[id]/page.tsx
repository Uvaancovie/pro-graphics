// app/admin/orders/[id]/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
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

function extractInvoiceImageUrl(notes: string | null | undefined): string {
  if (!notes) return ''
  const line = notes
    .split('\n')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith('INVOICE_IMAGE_URL:'))

  return line ? line.replace('INVOICE_IMAGE_URL:', '').trim() : ''
}

function extractPlainNotes(notes: string | null | undefined): string {
  if (!notes) return ''
  return notes
    .split('\n')
    .filter((entry) => !entry.trim().startsWith('INVOICE_IMAGE_URL:'))
    .join('\n')
    .trim()
}

function composeOrderNotes(plainNotes: string, invoiceImageUrl: string): string | null {
  const lines = [plainNotes.trim()]
  if (invoiceImageUrl.trim()) {
    lines.push(`INVOICE_IMAGE_URL:${invoiceImageUrl.trim()}`)
  }

  const result = lines.filter(Boolean).join('\n')
  return result || null
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

  const invoiceImageUrl = extractInvoiceImageUrl(order.notes)
  const plainNotes = extractPlainNotes(order.notes)

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

  async function updateOrderDetails(formData: FormData) {
    'use server'
    const supabase = await createSupabaseServerClient()

    const invoiceUrl = String(formData.get('invoice_image_url') || '').trim()
    const notes = String(formData.get('notes') || '')
    const amountValue = Number(formData.get('total_amount') || 0)
    const totalAmount = Number.isFinite(amountValue) ? Math.max(amountValue, 0) : 0

    await supabase
      .from('orders')
      .update({
        customer_name: String(formData.get('customer_name') || ''),
        customer_email: String(formData.get('customer_email') || ''),
        customer_company: String(formData.get('customer_company') || '') || null,
        customer_phone: String(formData.get('customer_phone') || '') || null,
        delivery_method: String(formData.get('delivery_method') || 'pickup'),
        delivery_date: String(formData.get('delivery_date') || '') || null,
        delivery_notes: String(formData.get('delivery_notes') || '') || null,
        priority: String(formData.get('priority') || 'normal'),
        subtotal: totalAmount,
        tax_rate: 0,
        tax_amount: 0,
        total: totalAmount,
        notes: composeOrderNotes(notes, invoiceUrl),
      })
      .eq('id', id)

    revalidatePath(`/admin/orders/${id}`)
    revalidatePath('/admin/orders')
  }

  async function uploadInvoiceImage(formData: FormData) {
    'use server'
    const supabase = await createSupabaseServerClient()
    const file = formData.get('invoice_image') as File | null

    if (!file || file.size === 0) {
      return
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filePath = `order-invoices/${id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(filePath, fileBuffer, {
        contentType: file.type || 'image/jpeg',
        upsert: true,
      })

    if (uploadError) {
      return
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('gallery-images').getPublicUrl(filePath)

    await supabase
      .from('orders')
      .update({
        notes: composeOrderNotes(plainNotes, publicUrl),
      })
      .eq('id', id)

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
          <Link
            href="/admin/orders"
            className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold
                       px-5 py-3 rounded-xl transition-colors"
          >
            Back to Orders
          </Link>
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
                  <span className="text-[#5A6A7A]">Amount (VAT included)</span>
                  <span className="font-medium text-[#0D1B2A]">
                    R{(Number(order.total) || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8EEF4]">
                  <span className="font-bold text-[#0D1B2A]">Total</span>
                  <span className="font-bold text-[#FF6B35] text-lg">
                    R{(Number(order.total) || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
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

        {/* Right column - Customer & Edit */}
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

          {/* Edit order */}
          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8EEF4]">
              <h2 className="font-bold text-[#0D1B2A]">Edit Order</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <form action={updateOrderDetails} className="space-y-3">
                <input type="hidden" name="invoice_image_url" value={invoiceImageUrl} />

                <div>
                  <label className="block text-[#5A6A7A] text-xs mb-1">Customer Name</label>
                  <input
                    name="customer_name"
                    defaultValue={order.customer_name}
                    className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#5A6A7A] text-xs mb-1">Customer Email</label>
                  <input
                    name="customer_email"
                    type="email"
                    defaultValue={order.customer_email}
                    className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#5A6A7A] text-xs mb-1">Company</label>
                  <input
                    name="customer_company"
                    defaultValue={order.customer_company || ''}
                    className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#5A6A7A] text-xs mb-1">Phone</label>
                  <input
                    name="customer_phone"
                    defaultValue={order.customer_phone || ''}
                    className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#5A6A7A] text-xs mb-1">Priority</label>
                    <select
                      name="priority"
                      defaultValue={order.priority || 'normal'}
                      className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#5A6A7A] text-xs mb-1">Delivery Method</label>
                    <select
                      name="delivery_method"
                      defaultValue={order.delivery_method || 'pickup'}
                      className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="pickup">Pickup</option>
                      <option value="delivery">Delivery</option>
                      <option value="courier">Courier</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#5A6A7A] text-xs mb-1">Delivery Date</label>
                  <input
                    name="delivery_date"
                    type="date"
                    defaultValue={order.delivery_date || ''}
                    className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#5A6A7A] text-xs mb-1">Order Amount (VAT included)</label>
                  <input
                    name="total_amount"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={Number(order.total) || 0}
                    className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#5A6A7A] text-xs mb-1">Delivery Notes</label>
                  <textarea
                    name="delivery_notes"
                    rows={2}
                    defaultValue={order.delivery_notes || ''}
                    className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#5A6A7A] text-xs mb-1">Internal Notes</label>
                  <textarea
                    name="notes"
                    rows={3}
                    defaultValue={plainNotes}
                    className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0D1B2A] hover:bg-[#13253b] text-white font-bold py-2.5 rounded-lg text-sm"
                >
                  Save Order Changes
                </button>
              </form>

              <div className="border-t border-[#E8EEF4] pt-4">
                <p className="text-[#0D1B2A] font-bold text-sm mb-2">Invoice Image</p>

                {invoiceImageUrl ? (
                  <a href={invoiceImageUrl} target="_blank" rel="noopener noreferrer" className="block mb-3">
                    <img
                      src={invoiceImageUrl}
                      alt="Invoice"
                      className="w-full h-40 object-cover rounded-lg border border-[#E8EEF4]"
                    />
                  </a>
                ) : (
                  <p className="text-[#5A6A7A] text-xs mb-3">No invoice image uploaded yet.</p>
                )}

                <form action={uploadInvoiceImage} className="space-y-2">
                  <input
                    name="invoice_image"
                    type="file"
                    accept="image/*"
                    className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-xs"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold py-2.5 rounded-lg text-sm"
                  >
                    Upload Invoice Image
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
