import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()

    // Get current user session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Create or get customer
    let customerId = null
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', body.customer_email)
      .single()

    if (existingCustomer) {
      customerId = existingCustomer.id
      // Update customer info
      await supabase.from('customers').update({
        name: body.customer_name,
        company: body.customer_company || null,
        phone: body.customer_phone || null,
        address: body.customer_address || null,
      }).eq('id', customerId)
    } else {
      const { data: newCustomer } = await supabase
        .from('customers')
        .insert({
          email: body.customer_email,
          name: body.customer_name,
          company: body.customer_company || null,
          phone: body.customer_phone || null,
          address: body.customer_address || null,
        })
        .select('id')
        .single()
      customerId = newCustomer?.id
    }

    // Since invoices are tied to orders in our schema, we must create an order first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: customerId,
        customer_email: body.customer_email,
        customer_name: body.customer_name,
        customer_company: body.customer_company || null,
        customer_phone: body.customer_phone || null,
        customer_address: body.customer_address || null,
        status: 'pending',
        priority: 'normal',
        subtotal: body.subtotal,
        tax_rate: body.tax_rate,
        tax_amount: body.tax_amount,
        total: body.total,
        delivery_method: 'pickup', // standard default
        notes: body.notes || null,
        created_by: session.user.id,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      throw orderError
    }

    // Create order items (which serve as invoice line items)
    if (body.items?.length > 0) {
      const orderItems = body.items.map((item: any, index: number) => ({
        order_id: order.id,
        description: item.description,
        quantity: item.quantity || 1,
        unit_price: item.unit_price,
        product_name: item.description, 
        dimensions: item.dimensions || null,
        material: item.material || null,
        sort_order: index,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) {
        console.error('Order items error:', itemsError)
        throw itemsError
      }
    }

    // Create final Invoice record
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        order_id: order.id,
        customer_id: customerId,
        status: 'draft',
        subtotal: body.subtotal,
        tax_rate: body.tax_rate,
        tax_amount: body.tax_amount,
        total: body.total,
        issue_date: body.issue_date || new Date().toISOString().split('T')[0],
        due_date: body.due_date,
        notes: body.notes || null,
        terms: body.terms || 'Payment due within 30 days. EFT preferred.',
      })
      .select()
      .single()

    if (invoiceError) {
        console.error('Invoice creation error:', invoiceError)
        throw invoiceError
    }

    // Log activity
    await supabase.from('admin_activity_log').insert({
      user_id: session.user.id,
      user_email: session.user.email,
      action: 'invoice_created',
      entity_type: 'invoice',
      entity_id: invoice.id,
      details: { invoice_number: invoice.invoice_number, total: body.total },
    })

    return NextResponse.json({ invoiceId: invoice.id })
  } catch (error: any) {
    console.error('Error creating invoice:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create invoice' },
      { status: 500 }
    )
  }
}
