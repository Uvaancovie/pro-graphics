import { createSupabaseServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PrintInvoicePage({ params }: Props) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  const { data: invoice } = await supabase
    .from('invoices')
    .select('*, order:orders(*, order_items(*))')
    .eq('id', id)
    .single()

  if (!invoice) return notFound()

  return (
    <div className="bg-white min-h-screen font-sans text-black p-10 max-w-4xl mx-auto">
      {/* This script triggers the print dialog automatically when the page loads */}
      <script dangerouslySetInnerHTML={{ __html: 'window.onload = function() { window.print(); }' }} />
      
      {/* Print-specific styles to hide browser headers/footers and format correctly */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
          @page { margin: 10mm; }
        }
      `}} />

      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-gray-800 pb-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#FF6B35] rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-2xl">PG</span>
          </div>
          <div>
            <h1 className="font-black text-3xl tracking-tight">PRO GRAPHICS</h1>
            <p className="text-gray-600">Professional Signage Solutions</p>
            <p className="text-gray-500 text-sm mt-1">123 Printing Ave, Design District</p>
            <p className="text-gray-500 text-sm">support@prographics.com</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-black text-gray-200 uppercase tracking-widest mb-2">Invoice</h2>
          <p className="text-xl font-bold">{invoice.invoice_number}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-left inline-block">
            <span className="text-gray-600 font-bold">Issue Date:</span>
            <span className="text-right">{new Date(invoice.issue_date).toLocaleDateString('en-ZA')}</span>
            <span className="text-gray-600 font-bold">Due Date:</span>
            <span className="text-right">{new Date(invoice.due_date).toLocaleDateString('en-ZA')}</span>
          </div>
        </div>
      </div>

      {/* Billed To */}
      <div className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Billed To</h3>
        <p className="text-xl font-bold text-gray-900">{invoice.order?.customer_name}</p>
        {invoice.order?.customer_company && (
          <p className="text-gray-800 text-lg">{invoice.order.customer_company}</p>
        )}
        <p className="text-gray-600">{invoice.order?.customer_email}</p>
        {invoice.order?.customer_address && (
          <p className="text-gray-600 mt-1 whitespace-pre-line">
            {invoice.order.customer_address}
          </p>
        )}
      </div>

      {/* Line Items */}
      <table className="w-full mb-10">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className="py-3 text-left font-bold text-gray-900 uppercase text-xs tracking-widest">Description</th>
            <th className="py-3 text-right font-bold text-gray-900 uppercase text-xs tracking-widest w-24">Qty</th>
            <th className="py-3 text-right font-bold text-gray-900 uppercase text-xs tracking-widest w-32">Unit Price</th>
            <th className="py-3 text-right font-bold text-gray-900 uppercase text-xs tracking-widest w-32">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoice.order?.order_items?.map((item: any) => (
            <tr key={item.id}>
              <td className="py-4">
                <p className="font-bold text-gray-900">{item.product_name || item.description}</p>
                {item.material && (
                  <p className="text-gray-500 text-sm mt-1">Material: {item.material}</p>
                )}
                {item.dimensions && (
                  <p className="text-gray-500 text-sm">Dimensions: {item.dimensions}</p>
                )}
              </td>
              <td className="py-4 text-right">{item.quantity}</td>
              <td className="py-4 text-right">R{item.unit_price?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td>
              <td className="py-4 text-right font-bold">R{item.line_total?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-1/2">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal (Excl. VAT)</span>
              <span>R{invoice.subtotal?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>VAT ({invoice.tax_rate}%)</span>
              <span>R{invoice.tax_amount?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-3 mt-3">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-xl font-black text-[#FF6B35]">
                R{invoice.total?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Notes & Payment Terms */}
      <div className="border-t-2 border-gray-800 pt-8 grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2 border-b border-gray-200 pb-2">Terms & Conditions</h3>
          <p className="text-gray-600 text-sm whitespace-pre-line">{invoice.terms}</p>
          {invoice.notes && (
            <p className="text-gray-600 text-sm mt-4 whitespace-pre-line">{invoice.notes}</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2 border-b border-gray-200 pb-2">Payment Details (EFT)</h3>
          <div className="grid grid-cols-[100px_1fr] gap-1 text-sm text-gray-600">
            <span className="font-bold text-gray-900">Bank:</span>
            <span>Standard Bank</span>
            <span className="font-bold text-gray-900">Account:</span>
            <span>Pro Graphics PTY LTD</span>
            <span className="font-bold text-gray-900">Account No:</span>
            <span>0123456789</span>
            <span className="font-bold text-gray-900">Branch:</span>
            <span>051001</span>
            <span className="font-bold text-gray-900">Reference:</span>
            <span className="font-bold text-[#FF6B35]">{invoice.invoice_number}</span>
          </div>
        </div>
      </div>
      
      {/* Status Watermark */}
      {invoice.status === 'paid' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <div className="border-8 border-green-600 text-green-600 text-8xl font-black uppercase tracking-widest p-8 rotate-[-15deg] rounded-3xl">
            PAID IN FULL
          </div>
        </div>
      )}
      {invoice.status === 'cancelled' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <div className="border-8 border-red-600 text-red-600 text-8xl font-black uppercase tracking-widest p-8 rotate-[-15deg] rounded-3xl">
            CANCELLED
          </div>
        </div>
      )}
    </div>
  )
}
