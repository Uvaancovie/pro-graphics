// app/api/inventory/reports/route.ts
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const searchParams = request.nextUrl.searchParams
    const month = searchParams.get('month')
    const year = searchParams.get('year')

    const targetYear = year ? parseInt(year) : new Date().getFullYear()
    const targetMonth = month ? parseInt(month) : new Date().getMonth() + 1

    const startDate = `${targetYear}-${String(targetMonth).padStart(2, '0')}-01`
    const endDate = new Date(targetYear, targetMonth, 0).toISOString().split('T')[0]

    const { data: orders, error } = await supabase
      .from('inventory_orders')
      .select(`
        *,
        materials (id, name, unit)
      `)
      .gte('order_date', startDate)
      .lte('order_date', endDate)
      .order('order_date', { ascending: false })

    if (error) throw error

    const weeklyData: Record<number, { week: number; totalCost: number; orders: number }> = {}

    for (let w = 1; w <= 5; w++) {
      weeklyData[w] = { week: w, totalCost: 0, orders: 0 }
    }

    const materialSummary: Record<string, {
      material: string
      totalOrdered: number
      totalCost: number
      orders: number
    }> = {}

    for (const order of (orders || [])) {
      const orderDate = new Date(order.order_date)
      const dayOfMonth = orderDate.getDate()
      const week = Math.ceil(dayOfMonth / 7)

      weeklyData[week].totalCost += Number(order.total_cost) || 0
      weeklyData[week].orders += 1

      const matKey = order.materials?.name || 'Unknown'
      if (!materialSummary[matKey]) {
        materialSummary[matKey] = {
          material: matKey,
          totalOrdered: 0,
          totalCost: 0,
          orders: 0
        }
      }
      materialSummary[matKey].totalOrdered += Number(order.quantity_ordered)
      materialSummary[matKey].totalCost += Number(order.total_cost) || 0
      materialSummary[matKey].orders += 1
    }

    const weekly = Object.values(weeklyData).filter(w => w.orders > 0)
    const materials = Object.values(materialSummary)

    const totalMonthCost = weekly.reduce((sum, w) => sum + w.totalCost, 0)

    return NextResponse.json({
      year: targetYear,
      month: targetMonth,
      startDate,
      endDate,
      totalCost: totalMonthCost,
      weekly,
      materials,
      orders
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}