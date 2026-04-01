'use client'
// app/admin/pricing/page.tsx
import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import type { Product, PricingPackage, PricingTier } from '@/types/cms'

const TIERS: { value: PricingTier; label: string; color: string; bg: string }[] = [
  { value: 'good',   label: '👍 Good',   color: '#5A6A7A', bg: '#F7F8FA' },
  { value: 'better', label: '⭐ Better', color: '#1AB5A0', bg: '#E6F8F6' },
  { value: 'best',   label: '🏆 Best',   color: '#FF6B35', bg: '#FFF0E8' },
]

const BLANK_PKG = {
  tier: 'better' as PricingTier,
  label: '', price_from: '', price_to: '',
  unit: 'per vehicle', includes: '',
  is_popular: false, is_visible: true, sort_order: 0,
}

export default function PricingPage() {
  const supabase = createSupabaseBrowserClient()
  const [products, setProducts]     = useState<Product[]>([])
  const [packages, setPackages]     = useState<PricingPackage[]>([])
  const [selectedProduct, setSelected] = useState<string>('')
  const [showForm, setShowForm]     = useState(false)
  const [editPkg, setEditPkg]       = useState<PricingPackage | null>(null)
  const [form, setForm]             = useState(BLANK_PKG)
  const [saving, setSaving]         = useState(false)
  const [msg, setMsg]               = useState('')

  useEffect(() => {
    supabase.from('products').select('id,name,category').order('sort_order')
      .then(({ data }) => {
        setProducts((data as Product[]) ?? [])
        if (data?.length) setSelected(data[0].id)
      })
  }, [])

  useEffect(() => {
    if (!selectedProduct) return
    supabase.from('pricing_packages')
      .select('*').eq('product_id', selectedProduct).order('sort_order')
      .then(({ data }) => setPackages((data as PricingPackage[]) ?? []))
  }, [selectedProduct])

  function openNew() {
    setEditPkg(null)
    setForm({ ...BLANK_PKG })
    setShowForm(true)
  }

  function openEdit(pkg: PricingPackage) {
    setEditPkg(pkg)
    setForm({
      tier: pkg.tier, label: pkg.label,
      price_from: pkg.price_from?.toString() ?? '',
      price_to: pkg.price_to?.toString() ?? '',
      unit: pkg.unit, includes: (pkg.includes ?? []).join('\n'),
      is_popular: pkg.is_popular, is_visible: pkg.is_visible,
      sort_order: pkg.sort_order,
    })
    setShowForm(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const payload = {
      product_id: selectedProduct,
      tier: form.tier,
      label: form.label,
      price_from: form.price_from ? +form.price_from : null,
      price_to: form.price_to ? +form.price_to : null,
      unit: form.unit,
      includes: form.includes.split('\n').map(s => s.trim()).filter(Boolean),
      is_popular: form.is_popular,
      is_visible: form.is_visible,
      sort_order: +form.sort_order,
    }
    const { error } = editPkg
      ? await supabase.from('pricing_packages').update(payload).eq('id', editPkg.id)
      : await supabase.from('pricing_packages').insert(payload)

    if (!error) {
      setMsg('Saved!')
      setShowForm(false)
      const { data } = await supabase.from('pricing_packages')
        .select('*').eq('product_id', selectedProduct).order('sort_order')
      setPackages((data as PricingPackage[]) ?? [])
    }
    setSaving(false)
    setTimeout(() => setMsg(''), 2000)
  }

  async function deletePkg(id: string) {
    if (!confirm('Delete this pricing tier?')) return
    await supabase.from('pricing_packages').delete().eq('id', id)
    setPackages(prev => prev.filter(p => p.id !== id))
  }

  const selectedName = products.find(p => p.id === selectedProduct)?.name

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#0D1B2A] font-black text-3xl mb-1">Pricing Packages</h1>
          <p className="text-[#5A6A7A] text-sm">Manage Good / Better / Best tiers per service</p>
        </div>
        <button onClick={openNew}
          className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold
                     px-5 py-3 rounded-xl transition-colors flex items-center gap-2">
          ➕ Add Pricing Tier
        </button>
      </div>

      {/* Product selector */}
      <div className="bg-white rounded-2xl border border-[#E8EEF4] p-4 mb-6 flex gap-3 flex-wrap">
        {products.map(p => (
          <button key={p.id} onClick={() => setSelected(p.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors
              ${selectedProduct === p.id
                ? 'bg-[#FF6B35] text-white'
                : 'bg-[#F7F8FA] text-[#5A6A7A] hover:bg-[#E8EEF4]'
              }`}>
            {p.name}
          </button>
        ))}
      </div>

      {/* Tiers grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {TIERS.map(({ value, label, color, bg }) => {
          const tierPkgs = packages.filter(p => p.tier === value)
          return (
            <div key={value} className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8EEF4]"
                style={{ background: bg }}>
                <p className="font-black text-lg" style={{ color }}>{label}</p>
                <p className="text-xs text-[#5A6A7A]">{selectedName}</p>
              </div>
              <div className="p-4 space-y-3">
                {tierPkgs.map(pkg => (
                  <div key={pkg.id}
                    className="border border-[#E8EEF4] rounded-xl p-4 relative">
                    {pkg.is_popular && (
                      <span className="absolute -top-2 left-4 text-xs bg-[#FF6B35] text-white
                                       px-2 py-0.5 rounded-full font-bold">Popular</span>
                    )}
                    <p className="font-bold text-[#0D1B2A] text-sm mb-1">{pkg.label}</p>
                    <p className="text-[#FF6B35] font-black text-lg">
                      R{pkg.price_from?.toLocaleString()}
                      {pkg.price_to ? `–R${pkg.price_to?.toLocaleString()}` : '+'}
                    </p>
                    <p className="text-[#5A6A7A] text-xs mb-3">{pkg.unit}</p>
                    <ul className="space-y-1 mb-4">
                      {(pkg.includes ?? []).map((item, i) => (
                        <li key={i} className="text-xs text-[#5A6A7A] flex gap-2">
                          <span className="text-green-500 flex-shrink-0">✓</span>{item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(pkg)}
                        className="flex-1 text-xs font-bold text-[#FF6B35] bg-[#FFF0E8]
                                   py-1.5 rounded-lg hover:bg-[#FFE0CC]">
                        Edit
                      </button>
                      <button onClick={() => deletePkg(pkg.id)}
                        className="flex-1 text-xs font-bold text-red-500 bg-red-50
                                   py-1.5 rounded-lg hover:bg-red-100">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {tierPkgs.length === 0 && (
                  <p className="text-center text-[#A0B4C8] text-sm py-8">No tier yet</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {msg && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3
                        rounded-xl text-sm font-bold shadow-lg">
          ✅ {msg}
        </div>
      )}

      {/* Slide-in form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-[#E8EEF4] px-6 py-4 flex justify-between">
              <h2 className="font-black text-[#0D1B2A] text-lg">
                {editPkg ? 'Edit Tier' : 'Add Pricing Tier'}
              </h2>
              <button onClick={() => setShowForm(false)}
                className="text-[#5A6A7A] hover:text-[#0D1B2A] text-xl">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">Tier</label>
                <select value={form.tier}
                  onChange={e => setForm(f => ({ ...f, tier: e.target.value as PricingTier }))}
                  className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#FF6B35]">
                  {TIERS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">Package Label *</label>
                <input required value={form.label}
                  onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                  className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                  placeholder="e.g. Half Wrap" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">Price From (R)</label>
                  <input type="number" value={form.price_from}
                    onChange={e => setForm(f => ({ ...f, price_from: e.target.value }))}
                    className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                    placeholder="5000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">Price To (R)</label>
                  <input type="number" value={form.price_to}
                    onChange={e => setForm(f => ({ ...f, price_to: e.target.value }))}
                    className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                    placeholder="8000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">Unit</label>
                <input value={form.unit}
                  onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                  className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35]"
                  placeholder="per vehicle" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">
                  What's Included <span className="text-[#A0B4C8] font-normal">(one per line)</span>
                </label>
                <textarea rows={5} value={form.includes}
                  onChange={e => setForm(f => ({ ...f, includes: e.target.value }))}
                  className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                             focus:outline-none focus:border-[#FF6B35] resize-none font-mono"
                  placeholder={"Half vehicle coverage\n2 design revisions\nPremium vinyl\n5-year guarantee"} />
              </div>
              <div className="flex items-center gap-3">
                <button type="button"
                  onClick={() => setForm(f => ({ ...f, is_popular: !f.is_popular }))}
                  className={`relative w-10 h-5 rounded-full transition-colors
                    ${form.is_popular ? 'bg-[#FF6B35]' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
                    shadow-sm transition-transform ${form.is_popular ? 'translate-x-5' : ''}`} />
                </button>
                <span className="text-sm text-[#0D1B2A] font-medium">Mark as Popular</span>
              </div>
              <div className="flex items-center gap-3">
                <button type="button"
                  onClick={() => setForm(f => ({ ...f, is_visible: !f.is_visible }))}
                  className={`relative w-10 h-5 rounded-full transition-colors
                    ${form.is_visible ? 'bg-[#22C55E]' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
                    shadow-sm transition-transform ${form.is_visible ? 'translate-x-5' : ''}`} />
                </button>
                <span className="text-sm text-[#0D1B2A] font-medium">Visible on website</span>
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 border border-[#E8EEF4] text-[#5A6A7A] font-bold
                             py-3 rounded-xl hover:bg-[#F7F8FA]">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 bg-[#FF6B35] hover:bg-[#e85c28] text-white
                             font-bold py-3 rounded-xl disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save Tier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
