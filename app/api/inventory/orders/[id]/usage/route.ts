// app/api/inventory/orders/[id]/usage/route.ts
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    if (!body.quantity_used || Number(body.quantity_used) <= 0) {
      return NextResponse.json({ error: 'Quantity used must be greater than 0' }, { status: 400 })
    }

    if (!body.project_name || body.project_name.trim() === '') {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
    }

    const quantityUsed = Number(body.quantity_used)

    const { data: order } = await supabase
      .from('inventory_orders')
      .select('quantity_ordered')
      .eq('id', id)
      .single()

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const { data: existingUsage } = await supabase
      .from('material_usage')
      .select('quantity_used')
      .eq('inventory_order_id', id)

    const totalUsed = (existingUsage || []).reduce((sum, u) => sum + Number(u.quantity_used), 0)

    if (totalUsed + quantityUsed > Number(order.quantity_ordered)) {
      return NextResponse.json({
        error: `Cannot add ${quantityUsed}m. Only ${Number(order.quantity_ordered) - totalUsed}m remaining in this order.`
      }, { status: 400 })
    }

    const { data: usage, error } = await supabase
      .from('material_usage')
      .insert({
        inventory_order_id: id,
        quantity_used: quantityUsed,
        usage_date: body.usage_date || new Date().toISOString().split('T')[0],
        project_name: body.project_name.trim(),
        notes: body.notes || null,
        created_by: session.user.id
      })
      .select()
      .single()

    if (error) throw error

    const { data: updatedOrder } = await supabase
      .from('inventory_orders')
      .select('quantity_ordered')
      .eq('id', id)
      .single()

    const newTotalUsed = totalUsed + quantityUsed
    if (updatedOrder && newTotalUsed >= Number(updatedOrder.quantity_ordered) && body.auto_depleted !== false) {
      await supabase
        .from('inventory_orders')
        .update({ status: 'depleted' })
        .eq('id', id)
    }

    return NextResponse.json(usage, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}