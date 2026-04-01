// app/admin/products/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

async function toggleVisibility(id: string, current: boolean) {
  'use server'
  const supabase = await createSupabaseServerClient()
  await supabase.from('products').update({ is_visible: !current }).eq('id', id)
  revalidatePath('/admin/products')
}

async function deleteProduct(id: string) {
  'use server'
  const supabase = await createSupabaseServerClient()
  await supabase.from('products').delete().eq('id', id)
  revalidatePath('/admin/products')
}

const CATEGORY_LABELS: Record<string, string> = {
  'vehicle-branding': '🚗 Vehicle Branding',
  'sign-boards':      '📋 Sign Boards',
  'contravisions':    '🪟 Contravisions',
  'stickers':         '✂️ Stickers',
  'promotional':      '🎁 Promotional',
  'banners':          '🚩 Banners',
}

export default async function ProductsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, pricing_packages(count)')
    .order('sort_order', { ascending: true })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#0D1B2A] font-black text-3xl mb-1">Products & Services</h1>
          <p className="text-[#5A6A7A] text-sm">{products?.length ?? 0} products total</p>
        </div>
        <Link href="/admin/products/new"
          className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold
                     px-5 py-3 rounded-xl transition-colors flex items-center gap-2">
          <span>➕</span> Add Product
        </Link>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#F7F8FA] border-b border-[#E8EEF4]">
          {['Product Name', 'Category', 'Pricing Tiers', 'Status', 'Actions'].map((h, i) => (
            <div key={h}
              className={`text-xs font-bold text-[#5A6A7A] uppercase tracking-wide
                ${i === 0 ? 'col-span-4' : i === 4 ? 'col-span-2 text-right' : 'col-span-2'}`}>
              {h}
            </div>
          ))}
        </div>

        {products?.map(product => (
          <div key={product.id}
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#E8EEF4]
                       hover:bg-[#FAFBFC] items-center">
            {/* Name + desc */}
            <div className="col-span-4">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0
                  ${product.is_visible ? 'bg-green-400' : 'bg-gray-300'}`} />
                <div>
                  <p className="font-bold text-[#0D1B2A] text-sm">{product.name}</p>
                  {product.short_desc && (
                    <p className="text-[#5A6A7A] text-xs mt-0.5 line-clamp-1">
                      {product.short_desc}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="col-span-2">
              <span className="text-xs text-[#5A6A7A]">
                {CATEGORY_LABELS[product.category] ?? product.category}
              </span>
            </div>

            {/* Pricing count */}
            <div className="col-span-2">
              <span className="text-xs bg-[#E6F8F6] text-[#1AB5A0] px-2 py-1 rounded-full font-medium">
                {(product.pricing_packages as any)?.[0]?.count ?? 0} tiers
              </span>
            </div>

            {/* Status toggle */}
            <div className="col-span-2">
              <form action={toggleVisibility.bind(null, product.id, product.is_visible)}>
                <button type="submit"
                  className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors
                    ${product.is_visible
                      ? 'bg-green-50 text-green-600 hover:bg-green-100'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}>
                  {product.is_visible ? '✓ Live' : '○ Hidden'}
                </button>
              </form>
            </div>

            {/* Actions */}
            <div className="col-span-2 flex items-center justify-end gap-2">
              <Link href={`/admin/products/${product.id}`}
                className="text-[#FF6B35] text-xs font-bold hover:underline px-3 py-1.5
                           bg-[#FFF0E8] rounded-lg">
                Edit
              </Link>
              <form action={deleteProduct.bind(null, product.id)}>
                <button type="submit"
                  onClick={e => !confirm(`Delete "${product.name}"?`) && e.preventDefault()}
                  className="text-red-500 text-xs font-bold hover:underline px-3 py-1.5
                             bg-red-50 rounded-lg">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}

        {(!products || products.length === 0) && (
          <div className="text-center py-16 text-[#5A6A7A]">
            <p className="text-4xl mb-3">📦</p>
            <p className="font-bold">No products yet</p>
            <p className="text-sm mt-1">Add your first product to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
