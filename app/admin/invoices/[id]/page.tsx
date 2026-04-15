// app/admin/invoices/[id]/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  draft:    { bg: 'bg-gray-100', text: 'text-gray-600' },
  sent:     { bg: 'bg-blue-100', text: 'text-blue-600' },
  paid:     { bg: 'bg-green-100', text: 'text-green-600' },
  overdue:  { bg: 'bg-red-100', text: 'text-red-600' },
  cancelled: { bg: 'bg-gray-100', text: 'text-gray-500' },
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function InvoiceDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const { data: invoice } = await supabase
    .from('invoices')
    .select('*, order:orders(*, order_items(*))')
    .eq('id', id)
    .single()

  if (!invoice) return notFound()

  async function markAsPaid() {
    'use server'
    const supabase = await createSupabaseServerClient()
    await supabase.from('invoices').update({
      status: 'paid',
      paid_date: new Date().toISOString().split('T')[0],
      amount_paid: invoice.total,
    }).eq('id', id)
    revalidatePath(`/admin/invoices/${id}`)
  }

  async function markAsSent() {
    'use server'
    const supabase = await createSupabaseServerClient()
    await supabase.from('invoices').update({
      status: 'sent',
    }).eq('id', id)
    revalidatePath(`/admin/invoices/${id}`)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/invoices"
            className="text-[#5A6A7A] hover:text-[#0D1B2A] transition-colors"
          >
            ← Back
          </Link>
          <div>
            <h1 className="text-[#0D1B2A] font-black text-3xl">{invoice.invoice_number}</h1>
            <p className="text-[#5A6A7A] text-sm">
              Invoice for {invoice.order?.order_number}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {invoice.status === 'draft' && (
            <form action={markAsSent}>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold
                           px-5 py-3 rounded-xl transition-colors"
              >
                Mark as Sent
              </button>
            </form>
          )}
          {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
            <form action={markAsPaid}>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold
                           px-5 py-3 rounded-xl transition-colors"
              >
                Mark as Paid
              </button>
            </form>
          )}
          <Link
            href={`/admin/invoices/${invoice.id}/print`}
            target="_blank"
            className="bg-[#1AB5A0] hover:bg-[#159a88] text-white font-bold
                       px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
          >
            <span>🖨️</span> Print PDF
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Invoice */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
            {/* Invoice header */}
            <div className="px-8 py-6 border-b border-[#E8EEF4] flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-[#FF6B35] rounded-xl flex items-center justify-center">
                    <span className="text-white font-black text-lg">PG</span>
                  </div>
                  <div>
                    <p className="font-black text-[#0D1B2A] text-lg">PRO GRAPHICS</p>
                    <p className="text-[#5A6A7A] text-xs">Professional Signage Solutions</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#5A6A7A] text-xs uppercase tracking-wide">Invoice</p>
                <p className="font-black text-[#0D1B2A] text-2xl">{invoice.invoice_number}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mt-1
                  ${STATUS_COLORS[invoice.status]?.bg} ${STATUS_COLORS[invoice.status]?.text}`}
                >
                  {invoice.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Invoice details */}
            <div className="px-8 py-6 grid grid-cols-2 gap-8 border-b border-[#E8EEF4]">
              <div>
                <p className="text-[#5A6A7A] text-xs uppercase font-bold mb-2">Billed To</p>
                <p className="font-bold text-[#0D1B2A]">{invoice.order?.customer_name}</p>
                {invoice.order?.customer_company && (
                  <p className="text-[#5A6A7A] text-sm">{invoice.order.customer_company}</p>
                )}
                <p className="text-[#5A6A7A] text-sm">{invoice.order?.customer_email}</p>
                {invoice.order?.customer_address && (
                  <p className="text-[#5A6A7A] text-sm mt-1 whitespace-pre-line">
                    {invoice.order.customer_address}
                  </p>
                )}
              </div>
              <div>
                <p className="text-[#5A6A7A] text-xs uppercase font-bold mb-2">Invoice Details</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5A6A7A]">Issue Date:</span>
                    <span className="text-[#0D1B2A]">
                      {new Date(invoice.issue_date).toLocaleDateString('en-ZA')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5A6A7A]">Due Date:</span>
                    <span className="text-[#0D1B2A]">
                      {new Date(invoice.due_date).toLocaleDateString('en-ZA')}
                    </span>
                  </div>
                  {invoice.paid_date && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5A6A7A]">Paid Date:</span>
                      <span className="text-green-600 font-medium">
                        {new Date(invoice.paid_date).toLocaleDateString('en-ZA')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="px-8 py-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8EEF4]">
                    <th className="text-left py-2 text-[#5A6A7A] text-xs uppercase font-bold">Description</th>
                    <th className="text-right py-2 text-[#5A6A7A] text-xs uppercase font-bold">Qty</th>
                    <th className="text-right py-2 text-[#5A6A7A] text-xs uppercase font-bold">Unit Price</th>
                    <th className="text-right py-2 text-[#5A6A7A] text-xs uppercase font-bold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.order?.order_items?.map((item: any) => (
                    <tr key={item.id} className="border-b border-[#E8EEF4]">
                      <td className="py-3">
                        <p className="text-[#0D1B2A] font-medium">{item.product_name || item.description}</p>
                        {item.material && (
                          <p className="text-[#5A6A7A] text-xs">Material: {item.material}</p>
                        )}
                        {item.dimensions && (
                          <p className="text-[#5A6A7A] text-xs">Dimensions: {item.dimensions}</p>
                        )}
                      </td>
                      <td className="py-3 text-right text-[#0D1B2A]">{item.quantity}</td>
                      <td className="py-3 text-right text-[#0D1B2A]">
                        R{item.unit_price?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 text-right font-medium text-[#0D1B2A]">
                        R{item.line_total?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="px-8 py-6 bg-[#F7F8FA] border-t border-[#E8EEF4]">
              <div className="w-1/2 ml-auto space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5A6A7A]">Subtotal</span>
                  <span className="text-[#0D1B2A] font-medium">
                    R{invoice.subtotal?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5A6A7A]">VAT ({invoice.tax_rate}%)</span>
                  <span className="text-[#0D1B2A] font-medium">
                    R{invoice.tax_amount?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8EEF4]">
                  <span className="text-[#0D1B2A] font-bold">Total</span>
                  <span className="text-[#FF6B35] font-black text-xl">
                    R{invoice.total?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="px-8 py-4 border-t border-[#E8EEF4]">
              <p className="text-[#5A6A7A] text-xs">{invoice.terms}</p>
              {invoice.notes && (
                <p className="text-[#5A6A7A] text-xs mt-2">Notes: {invoice.notes}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm">
            <h2 className="font-bold text-[#0D1B2A] mb-4">Payment Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#5A6A7A]">Status</span>
                <span className={`font-medium ${invoice.status === 'paid' ? 'text-green-600' : 'text-[#0D1B2A]'}`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5A6A7A]">Total</span>
                <span className="font-medium text-[#0D1B2A]">
                  R{invoice.total?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5A6A7A]">Paid</span>
                <span className="font-medium text-[#0D1B2A]">
                  R{invoice.amount_paid?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-[#E8EEF4]">
                <span className="text-[#5A6A7A]">Balance Due</span>
                <span className={`font-bold ${invoice.amount_due > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  R{invoice.amount_due?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
