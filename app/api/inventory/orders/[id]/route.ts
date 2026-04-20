// app/api/inventory/orders/[id]/route.ts
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createSupabaseServerClient()
    const { id } = await params

    const { data: order, error } = await supabase
      .from('inventory_orders')
      .select(`
        *,
        materials (id, name, unit)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }
      throw error
    }

    const { data: usage } = await supabase
      .from('material_usage')
      .select('*')
      .eq('inventory_order_id', id)
      .order('usage_date', { ascending: false })

    return NextResponse.json({ ...order, usage: usage || [] })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(
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

    const allowedFields = [
      'status',
      'expected_arrival_date',
      'actual_arrival_date',
      'notes',
      'manufacturer',
      'material_id',
      'quantity_ordered',
      'unit_price',
      'order_date'
    ]

    const updates: Record<string, any> = {}
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field]
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    if (updates.status === 'arrived' && !updates.actual_arrival_date) {
      updates.actual_arrival_date = new Date().toISOString().split('T')[0]
    }

    const { data: order, error } = await supabase
      .from('inventory_orders')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        materials (id, name, unit)
      `)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json(order)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}