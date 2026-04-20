// app/api/inventory/orders/route.ts
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const searchParams = request.nextUrl.searchParams
    const materialId = searchParams.get('material_id')
    const status = searchParams.get('status')

    let query = supabase
      .from('inventory_orders')
      .select(`
        *,
        materials (id, name, unit)
      `)
      .order('created_at', { ascending: false })

    if (materialId) {
      query = query.eq('material_id', materialId)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data: orders, error } = await query

    if (error) throw error
    return NextResponse.json(orders)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const requiredFields = ['material_id', 'quantity_ordered', 'unit_price']
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    const quantityOrdered = Number(body.quantity_ordered)
    const unitPrice = Number(body.unit_price)

    if (quantityOrdered <= 0) {
      return NextResponse.json({ error: 'Quantity must be greater than 0' }, { status: 400 })
    }

    if (unitPrice < 0) {
      return NextResponse.json({ error: 'Unit price cannot be negative' }, { status: 400 })
    }

    const { data: order, error } = await supabase
      .from('inventory_orders')
      .insert({
        material_id: body.material_id,
        quantity_ordered: quantityOrdered,
        unit_price: unitPrice,
        order_date: body.order_date || new Date().toISOString().split('T')[0],
        expected_arrival_date: body.expected_arrival_date || null,
        manufacturer: body.manufacturer || null,
        notes: body.notes || null,
        status: 'coming_soon',
        created_by: session.user.id
      })
      .select(`
        *,
        materials (id, name, unit)
      `)
      .single()

    if (error) throw error

    return NextResponse.json(order, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}