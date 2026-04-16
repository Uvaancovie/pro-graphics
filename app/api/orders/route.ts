// app/api/orders/route.ts
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
    const orderTotal = Number(body.total) || 0

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

    // Create order
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
        priority: body.priority || 'normal',
        subtotal: orderTotal,
        tax_rate: 0,
        tax_amount: 0,
        total: orderTotal,
        delivery_method: body.delivery_method || 'pickup',
        delivery_date: body.delivery_date || null,
        delivery_notes: body.delivery_notes || null,
        notes: body.notes || null,
        created_by: session.user.id,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      throw orderError
    }

    // Create order items
    if (body.items?.length > 0) {
      const orderItems = body.items.map((item: any, index: number) => ({
        order_id: order.id,
        description: item.description,
        quantity: item.quantity || 1,
        unit_price: item.unit_price,
        product_name: item.description, // Use description as product name
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

    // Log activity
    await supabase.from('admin_activity_log').insert({
      user_id: session.user.id,
      user_email: session.user.email,
      action: 'order_created',
      entity_type: 'order',
      entity_id: order.id,
      details: { order_number: order.order_number, total: orderTotal },
    })

    return NextResponse.json({ orderId: order.id })
  } catch (error: any) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}
