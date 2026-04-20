// app/api/inventory/materials/route.ts
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: materials, error } = await supabase
      .from('materials')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return NextResponse.json(materials)
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

    if (!body.name || body.name.trim() === '') {
      return NextResponse.json({ error: 'Material name is required' }, { status: 400 })
    }

    const { data: material, error } = await supabase
      .from('materials')
      .insert({
        name: body.name.trim(),
        description: body.description || null,
        unit: 'meters'
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Material already exists' }, { status: 409 })
      }
      throw error
    }

    return NextResponse.json(material, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}