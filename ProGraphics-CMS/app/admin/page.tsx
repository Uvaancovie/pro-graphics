// app/admin/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase'

export default async function AdminDashboard() {
  const supabase = createSupabaseServerClient()

  const [
    { count: totalProducts },
    { count: visibleProducts },
    { count: totalPricing },
    { count: totalGallery },
    { count: visibleGallery },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_visible', true),
    supabase.from('pricing_packages').select('*', { count: 'exact', head: true }),
    supabase.from('gallery').select('*', { count: 'exact', head: true }),
    supabase.from('gallery').select('*', { count: 'exact', head: true }).eq('is_visible', true),
  ])

  const { data: recentProducts } = await supabase
    .from('products')
    .select('id, name, category, is_visible, updated_at')
    .order('updated_at', { ascending: false })
    .limit(5)

  const stats = [
    { label: 'Total Products',    value: totalProducts ?? 0,    icon: '📦', color: '#FF6B35', bg: '#FFF0E8' },
    { label: 'Live on Website',   value: visibleProducts ?? 0,  icon: '✅', color: '#22C55E', bg: '#EDFBF2' },
    { label: 'Pricing Packages',  value: totalPricing ?? 0,     icon: '💰', color: '#1AB5A0', bg: '#E6F8F6' },
    { label: 'Gallery Images',    value: totalGallery ?? 0,     icon: '🖼️', color: '#7C3AED', bg: '#F5F0FF' },
    { label: 'Published Images',  value: visibleGallery ?? 0,   icon: '👁️', color: '#F5C842', bg: '#FFFBE6' },
  ]

  const categoryLabels: Record<string, string> = {
    'vehicle-branding': '🚗 Vehicle Branding',
    'sign-boards':      '📋 Sign Boards',
    'contravisions':    '🪟 Contravisions',
    'stickers':         '✂️ Stickers',
    'promotional':      '🎁 Promotional',
    'banners':          '🚩 Banners',
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#0D1B2A] font-black text-3xl mb-1">Dashboard</h1>
        <p className="text-[#5A6A7A] text-sm">
          Welcome back — here's your Pro Graphics CMS overview
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {stats.map(({ label, value, icon, color, bg }) => (
          <div key={label}
            className="bg-white rounded-2xl p-5 border border-[#E8EEF4] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: bg }}>
                {icon}
              </div>
            </div>
            <p className="text-3xl font-black" style={{ color }}>{value}</p>
            <p className="text-[#5A6A7A] text-xs mt-1 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { href: '/admin/products/new', label: 'Add New Product',    icon: '➕', color: '#FF6B35' },
          { href: '/admin/pricing',      label: 'Manage Pricing',     icon: '💰', color: '#1AB5A0' },
          { href: '/admin/gallery',      label: 'Upload Gallery Image',icon: '📸', color: '#7C3AED' },
        ].map(({ href, label, icon, color }) => (
          <a key={href} href={href}
            className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-[#E8EEF4]
                       shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: color + '15' }}>
              {icon}
            </div>
            <div>
              <p className="font-bold text-[#0D1B2A] text-sm group-hover:underline">{label}</p>
              <p className="text-[#5A6A7A] text-xs">Quick action</p>
            </div>
          </a>
        ))}
      </div>

      {/* Recent products */}
      <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EEF4]">
          <h2 className="font-bold text-[#0D1B2A]">Recently Updated Products</h2>
          <a href="/admin/products" className="text-[#FF6B35] text-sm font-medium hover:underline">
            View all →
          </a>
        </div>
        <div className="divide-y divide-[#E8EEF4]">
          {recentProducts?.map(p => (
            <div key={p.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${p.is_visible ? 'bg-green-400' : 'bg-gray-300'}`} />
                <div>
                  <p className="font-medium text-[#0D1B2A] text-sm">{p.name}</p>
                  <p className="text-[#5A6A7A] text-xs">
                    {categoryLabels[p.category] ?? p.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium
                  ${p.is_visible ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {p.is_visible ? 'Live' : 'Hidden'}
                </span>
                <a href={`/admin/products/${p.id}`}
                  className="text-[#FF6B35] text-xs font-medium hover:underline">
                  Edit
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
