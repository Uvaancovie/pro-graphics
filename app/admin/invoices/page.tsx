// app/admin/invoices/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  draft:    { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Draft' },
  sent:     { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Sent' },
  paid:     { bg: 'bg-green-50', text: 'text-green-600', label: 'Paid' },
  overdue:  { bg: 'bg-red-50', text: 'text-red-600', label: 'Overdue' },
  cancelled: { bg: 'bg-gray-50', text: 'text-gray-500', label: 'Cancelled' },
}

async function updateInvoiceStatus(invoiceId: string, newStatus: string) {
  'use server'
  const supabase = await createSupabaseServerClient()

  const updates: any = { status: newStatus }
  if (newStatus === 'paid') {
    updates.paid_date = new Date().toISOString().split('T')[0]
    updates.amount_paid = updates.total // Assuming full payment
  }

  await supabase.from('invoices').update(updates).eq('id', invoiceId)
  revalidatePath('/admin/invoices')
}

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const supabase = await createSupabaseServerClient()
  const params = await searchParams
  const statusFilter = params.status || 'all'

  let query = supabase
    .from('invoices')
    .select('*, order:orders(order_number, customer_name, customer_email)')
    .order('created_at', { ascending: false })

  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }

  const { data: invoices } = await query

  // Get counts
  const { data: counts } = await supabase
    .from('invoices')
    .select('status', { count: 'exact' })

  const statusCounts = {
    all: counts?.length || 0,
    draft: counts?.filter(c => c.status === 'draft').length || 0,
    sent: counts?.filter(c => c.status === 'sent').length || 0,
    paid: counts?.filter(c => c.status === 'paid').length || 0,
    overdue: counts?.filter(c => c.status === 'overdue').length || 0,
  }

  // Calculate totals
  const totalOutstanding = invoices
    ?.filter((i: any) => i.status === 'sent' || i.status === 'overdue')
    .reduce((sum: number, i: any) => sum + (i.amount_due || 0), 0) || 0

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#0D1B2A] font-black text-3xl mb-1">Invoices</h1>
          <p className="text-[#5A6A7A] text-sm">
            Total outstanding: {' '}
            <span className="font-bold text-[#FF6B35]">
              R{totalOutstanding.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </span>
          </p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All Invoices', count: statusCounts.all },
          { key: 'draft', label: 'Draft', count: statusCounts.draft },
          { key: 'sent', label: 'Sent', count: statusCounts.sent },
          { key: 'paid', label: 'Paid', count: statusCounts.paid },
          { key: 'overdue', label: 'Overdue', count: statusCounts.overdue },
        ].map(({ key, label, count }) => (
          <Link
            key={key}
            href={`/admin/invoices?status=${key}`}
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

      {/* Invoices table */}
      <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#F7F8FA] border-b border-[#E8EEF4]">
          {['Invoice #', 'Order', 'Customer', 'Amount', 'Status', 'Date', 'Actions'].map((h, i) => (
            <div
              key={h}
              className={`text-xs font-bold text-[#5A6A7A] uppercase tracking-wide
                ${i === 0 ? 'col-span-1' : i === 1 ? 'col-span-2' : i === 2 ? 'col-span-2' : i === 6 ? 'col-span-2 text-right' : 'col-span-1'}`}
            >
              {h}
            </div>
          ))}
        </div>

        {invoices?.map((invoice: any) => (
          <div
            key={invoice.id}
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#E8EEF4]
                       hover:bg-[#FAFBFC] items-center"
          >
            <div className="col-span-1">
              <p className="font-bold text-[#0D1B2A] text-sm">{invoice.invoice_number}</p>
            </div>

            <div className="col-span-2">
              <p className="text-[#5A6A7A] text-xs">{invoice.order?.order_number || 'N/A'}</p>
            </div>

            <div className="col-span-2">
              <p className="font-medium text-[#0D1B2A] text-sm truncate">
                {invoice.order?.customer_name || 'Unknown'}
              </p>
              <p className="text-[#5A6A7A] text-xs truncate">{invoice.order?.customer_email}</p>
            </div>

            <div className="col-span-2">
              <p className="font-bold text-[#0D1B2A] text-sm">
                R{invoice.total?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </p>
              {invoice.amount_due > 0 && invoice.status !== 'paid' && (
                <p className="text-red-500 text-xs">
                  Due: R{invoice.amount_due?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <form action={updateInvoiceStatus.bind(null, invoice.id, getNextStatus(invoice.status))}>
                <button
                  type="submit"
                  className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors
                    ${STATUS_COLORS[invoice.status]?.bg} ${STATUS_COLORS[invoice.status]?.text}
                    hover:opacity-80`}
                >
                  {STATUS_COLORS[invoice.status]?.label || invoice.status}
                  {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                    <span className="ml-1">→</span>
                  )}
                </button>
              </form>
            </div>

            <div className="col-span-1">
              <p className="text-[#5A6A7A] text-xs">
                {new Date(invoice.issue_date).toLocaleDateString('en-ZA')}
              </p>
              {invoice.due_date && (
                <p className="text-[#5A6A7A] text-xs">
                  Due: {new Date(invoice.due_date).toLocaleDateString('en-ZA')}
                </p>
              )}
            </div>

            <div className="col-span-2 flex items-center justify-end gap-2">
              <Link
                href={`/admin/invoices/${invoice.id}`}
                className="text-[#FF6B35] text-xs font-bold hover:underline px-3 py-1.5
                           bg-[#FFF0E8] rounded-lg"
              >
                View
              </Link>
              {invoice.pdf_url && (
                <a
                  href={invoice.pdf_url}
                  className="text-[#1AB5A0] text-xs font-bold hover:underline px-3 py-1.5
                             bg-[#E6F8F6] rounded-lg"
                >
                  PDF
                </a>
              )}
            </div>
          </div>
        ))}

        {(!invoices || invoices.length === 0) && (
          <div className="text-center py-16 text-[#5A6A7A]">
            <p className="text-4xl mb-3">📄</p>
            <p className="font-bold">No invoices found</p>
          </div>
        )}
      </div>
    </div>
  )
}

function getNextStatus(current: string): string {
  const flow = ['draft', 'sent', 'paid']
  const idx = flow.indexOf(current)
  if (idx === -1 || idx === flow.length - 1) return current
  return flow[idx + 1]
}
