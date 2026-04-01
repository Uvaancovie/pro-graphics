'use client'
// app/admin/products/[id]/page.tsx  (also handles /new via id='new')
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import type { Product } from '@/types/cms'

const CATEGORIES = [
  { value: 'vehicle-branding', label: '🚗 Vehicle Branding' },
  { value: 'sign-boards',      label: '📋 Sign Boards'      },
  { value: 'contravisions',    label: '🪟 Contravisions'    },
  { value: 'stickers',         label: '✂️ Stickers'          },
  { value: 'promotional',      label: '🎁 Promotional'       },
  { value: 'banners',          label: '🚩 Banners'           },
]

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>()
  const isNew   = id === 'new'
  const router  = useRouter()
  const supabase = createSupabaseBrowserClient()

  const [loading, setSaving] = useState(false)
  const [fetching, setFetching] = useState(!isNew)
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    name: '', slug: '', category: 'vehicle-branding',
    description: '', short_desc: '', features: '', image_url: '',
    is_visible: true, sort_order: 0,
  })

  useEffect(() => {
    if (!isNew) {
      supabase.from('products').select('*').eq('id', id).single()
        .then(({ data }) => {
          if (data) setForm({
            ...data,
            features: (data.features ?? []).join('\n'),
          })
          setFetching(false)
        })
    }
  }, [id])

  function slugify(name: string) {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    const payload = {
      ...form,
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
    }

    const { error: err } = isNew
      ? await supabase.from('products').insert(payload)
      : await supabase.from('products').update(payload).eq('id', id)

    if (err) {
      setError(err.message)
    } else {
      setSuccess(isNew ? 'Product created!' : 'Product saved!')
      if (isNew) setTimeout(() => router.push('/admin/products'), 1000)
    }
    setSaving(false)
  }

  if (fetching) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-[#FF6B35] border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()}
          className="text-[#5A6A7A] hover:text-[#0D1B2A] text-sm">← Back</button>
        <div>
          <h1 className="text-[#0D1B2A] font-black text-3xl">
            {isNew ? 'Add New Product' : 'Edit Product'}
          </h1>
          <p className="text-[#5A6A7A] text-sm">
            {isNew ? 'Create a new service listing' : `Editing: ${form.name}`}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-6 space-y-5">
          <h2 className="font-bold text-[#0D1B2A] border-b border-[#E8EEF4] pb-3">
            Basic Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">
                Product Name *
              </label>
              <input value={form.name} required
                onChange={e => setForm(f => ({
                  ...f, name: e.target.value,
                  slug: isNew ? slugify(e.target.value) : f.slug,
                }))}
                className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                           focus:outline-none focus:border-[#FF6B35] text-[#0D1B2A]"
                placeholder="Vehicle Branding" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">
                URL Slug *
              </label>
              <input value={form.slug} required
                onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
                className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                           focus:outline-none focus:border-[#FF6B35] text-[#0D1B2A] font-mono"
                placeholder="vehicle-branding" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">
                Category *
              </label>
              <select value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value as any }))}
                className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                           focus:outline-none focus:border-[#FF6B35] text-[#0D1B2A] bg-white">
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">
                Sort Order
              </label>
              <input type="number" value={form.sort_order}
                onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))}
                className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                           focus:outline-none focus:border-[#FF6B35] text-[#0D1B2A]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">
              Short Description (shown on cards)
            </label>
            <input value={form.short_desc}
              onChange={e => setForm(f => ({ ...f, short_desc: e.target.value }))}
              className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                         focus:outline-none focus:border-[#FF6B35] text-[#0D1B2A]"
              placeholder="Turn your fleet into mobile billboards." />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">
              Full Description
            </label>
            <textarea value={form.description ?? ''}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={4}
              className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                         focus:outline-none focus:border-[#FF6B35] text-[#0D1B2A] resize-none"
              placeholder="Detailed product description shown on the service page..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">
              Key Features
              <span className="text-[#A0B4C8] font-normal ml-1">(one per line)</span>
            </label>
            <textarea value={form.features}
              onChange={e => setForm(f => ({ ...f, features: e.target.value }))}
              rows={5}
              className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                         focus:outline-none focus:border-[#FF6B35] text-[#0D1B2A]
                         resize-none font-mono"
              placeholder={"Full wraps & partial graphics\n3M & Avery Dennison materials\nDesign included\n5-year outdoor durability"} />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">
              Image URL
            </label>
            <input value={form.image_url ?? ''}
              onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
              className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                         focus:outline-none focus:border-[#FF6B35] text-[#0D1B2A]"
              placeholder="https://..." />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="button"
              onClick={() => setForm(f => ({ ...f, is_visible: !f.is_visible }))}
              className={`relative w-12 h-6 rounded-full transition-colors
                ${form.is_visible ? 'bg-[#22C55E]' : 'bg-gray-200'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                shadow-sm transition-transform
                ${form.is_visible ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className="text-sm font-medium text-[#0D1B2A]">
              {form.is_visible ? 'Visible on website' : 'Hidden from website'}
            </span>
          </div>
        </div>

        {/* Feedback */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-600">
            ✅ {success}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => router.back()}
            className="text-[#5A6A7A] hover:text-[#0D1B2A] text-sm font-medium">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="bg-[#FF6B35] hover:bg-[#e85c28] disabled:opacity-50 text-white
                       font-bold px-8 py-3 rounded-xl transition-colors">
            {loading ? 'Saving…' : isNew ? 'Create Product' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
