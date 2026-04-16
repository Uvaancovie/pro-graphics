'use client'
// app/admin/gallery/page.tsx
import { useEffect, useState, useRef } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import type { GalleryImage } from '@/types/cms'

const CATEGORIES = [
  { value: 'all',              label: 'All Services'       },
  { value: 'vehicle-branding', label: '🚗 Vehicle Branding' },
  { value: 'sign-boards',      label: '📋 Sign Boards'      },
  { value: 'contravisions',    label: '🪟 Contravisions'    },
  { value: 'stickers',         label: '✂️ Stickers'          },
  { value: 'promotional',      label: '🎁 Promotional'       },
]

export default function GalleryPage() {
  let supabaseClient: ReturnType<typeof createSupabaseBrowserClient> | null = null
  let supabaseConfigError = ''

  try {
    supabaseClient = createSupabaseBrowserClient()
  } catch (err) {
    supabaseConfigError = err instanceof Error ? err.message : 'Supabase is not configured.'
  }

  if (!supabaseClient) {
    return (
      <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-6">
        <h1 className="text-[#0D1B2A] font-black text-2xl mb-2">Supabase Configuration Required</h1>
        <p className="text-[#5A6A7A] text-sm mb-3">{supabaseConfigError}</p>
        <p className="text-[#5A6A7A] text-sm">Set `NEXT_PUBLIC_SUPABASE_URL` and a public key (`NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) in your environment, then restart the dev server.</p>
      </div>
    )
  }
  const supabase = supabaseClient
  const fileRef    = useRef<HTMLInputElement>(null)

  const [images, setImages]       = useState<GalleryImage[]>([])
  const [filter, setFilter]       = useState<string>('all')
  const [uploading, setUploading] = useState(false)
  const [uploadPct, setUploadPct] = useState(0)
  const [showForm, setShowForm]   = useState(false)
  const [editImg, setEditImg]     = useState<GalleryImage | null>(null)
  const [msg, setMsg]             = useState('')
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl]   = useState('')

  const [meta, setMeta] = useState({
    title: '', category: 'vehicle-branding', alt_text: '',
    client_name: '', is_featured: false, is_visible: true,
  })

  async function loadImages() {
    const { data } = await supabase.from('gallery').select('*').order('sort_order')
    setImages((data as GalleryImage[]) ?? [])
  }

  useEffect(() => { loadImages() }, [])

  useEffect(() => {
    if (previewFile) setPreviewUrl(URL.createObjectURL(previewFile))
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }
  }, [previewFile])

  function openNew() {
    setEditImg(null)
    setPreviewFile(null)
    setPreviewUrl('')
    setMeta({ title: '', category: 'vehicle-branding', alt_text: '', client_name: '', is_featured: false, is_visible: true })
    setShowForm(true)
  }

  function openEdit(img: GalleryImage) {
    setEditImg(img)
    setPreviewUrl(img.image_url)
    setPreviewFile(null)
    setMeta({
      title: img.title ?? '',
      category: img.category,
      alt_text: img.alt_text ?? '',
      client_name: img.client_name ?? '',
      is_featured: img.is_featured,
      is_visible: img.is_visible,
    })
    setShowForm(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setUploading(true)
    setUploadPct(10)

    try {
      let image_url = editImg?.image_url ?? ''
      let storage_path = editImg?.storage_path ?? ''

      if (previewFile) {
        const ext  = previewFile.name.split('.').pop()
        const path = `gallery/${Date.now()}.${ext}`
        setUploadPct(30)

        const { error: upErr } = await supabase.storage
          .from('gallery-images')
          .upload(path, previewFile, { upsert: true })

        if (upErr) throw upErr
        setUploadPct(70)

        const { data: { publicUrl } } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(path)

        image_url    = publicUrl
        storage_path = path

        // Remove old file if replacing
        if (editImg?.storage_path && editImg.storage_path !== path) {
          await supabase.storage.from('gallery-images').remove([editImg.storage_path])
        }
      }

      setUploadPct(85)

      const payload = { ...meta, image_url, storage_path }

      const { error } = editImg
        ? await supabase.from('gallery').update(payload).eq('id', editImg.id)
        : await supabase.from('gallery').insert(payload)

      if (error) throw error

      setUploadPct(100)
      setMsg(editImg ? 'Image updated!' : 'Image uploaded!')
      setShowForm(false)
      await loadImages()
    } catch (err: any) {
      setMsg(`Error: ${err.message}`)
    } finally {
      setUploading(false)
      setUploadPct(0)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  async function deleteImage(img: GalleryImage) {
    if (!confirm(`Delete "${img.title || 'this image'}"?`)) return
    await supabase.storage.from('gallery-images').remove([img.storage_path])
    await supabase.from('gallery').delete().eq('id', img.id)
    setImages(prev => prev.filter(i => i.id !== img.id))
  }

  async function toggleVisibility(img: GalleryImage) {
    await supabase.from('gallery').update({ is_visible: !img.is_visible }).eq('id', img.id)
    setImages(prev => prev.map(i => i.id === img.id ? { ...i, is_visible: !i.is_visible } : i))
  }

  const filtered = filter === 'all'
    ? images
    : images.filter(i => i.category === filter)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#0D1B2A] font-black text-3xl mb-1">Gallery</h1>
          <p className="text-[#5A6A7A] text-sm">
            {images.length} images · {images.filter(i => i.is_visible).length} published
          </p>
        </div>
        <button onClick={openNew}
          className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold
                     px-5 py-3 rounded-xl transition-colors flex items-center gap-2">
          📸 Upload Image
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORIES.map(c => (
          <button key={c.value} onClick={() => setFilter(c.value)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors
              ${filter === c.value
                ? 'bg-[#0D1B2A] text-white'
                : 'bg-white border border-[#E8EEF4] text-[#5A6A7A] hover:border-[#FF6B35]'
              }`}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-4 gap-4">
        {filtered.map(img => (
          <div key={img.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#E8EEF4] shadow-sm group">
            <div className="relative aspect-video bg-[#F7F8FA] overflow-hidden">
              <img src={img.image_url} alt={img.alt_text ?? img.title ?? ''}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              {img.is_featured && (
                <span className="absolute top-2 left-2 bg-[#FF6B35] text-white text-xs
                                 font-bold px-2 py-1 rounded-full">⭐ Featured</span>
              )}
              {!img.is_visible && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xs font-bold bg-black/60 px-3 py-1 rounded-full">
                    Hidden
                  </span>
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="font-bold text-[#0D1B2A] text-sm truncate">
                {img.title || 'Untitled'}
              </p>
              {img.client_name && (
                <p className="text-[#A0B4C8] text-xs">{img.client_name}</p>
              )}
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(img)}
                  className="flex-1 text-xs font-bold text-[#FF6B35] bg-[#FFF0E8]
                             py-1.5 rounded-lg hover:bg-[#FFE0CC]">
                  Edit
                </button>
                <button onClick={() => toggleVisibility(img)}
                  className={`text-xs font-bold py-1.5 px-2 rounded-lg
                    ${img.is_visible
                      ? 'text-green-600 bg-green-50 hover:bg-green-100'
                      : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
                    }`}>
                  {img.is_visible ? '👁' : '🚫'}
                </button>
                <button onClick={() => deleteImage(img)}
                  className="text-xs font-bold text-red-500 bg-red-50 py-1.5 px-2
                             rounded-lg hover:bg-red-100">
                  🗑
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Upload drop target */}
        <button onClick={openNew}
          className="border-2 border-dashed border-[#E8EEF4] rounded-2xl aspect-video
                     flex flex-col items-center justify-center hover:border-[#FF6B35]
                     hover:bg-[#FFF0E8] transition-colors group">
          <span className="text-4xl mb-2">📸</span>
          <span className="text-sm font-bold text-[#5A6A7A] group-hover:text-[#FF6B35]">
            Upload Image
          </span>
        </button>
      </div>

      {msg && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl text-sm font-bold shadow-lg text-white
          ${msg.startsWith('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
          {msg.startsWith('Error') ? '❌' : '✅'} {msg}
        </div>
      )}

      {/* Upload / edit slide panel */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-[#E8EEF4] px-6 py-4 flex justify-between">
              <h2 className="font-black text-[#0D1B2A] text-lg">
                {editImg ? 'Edit Image' : 'Upload Image'}
              </h2>
              <button onClick={() => setShowForm(false)}
                className="text-[#5A6A7A] hover:text-[#0D1B2A] text-xl">✕</button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Image picker */}
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-2">
                  {editImg ? 'Replace Image (optional)' : 'Image File *'}
                </label>
                {previewUrl && (
                  <div className="relative mb-3 rounded-xl overflow-hidden aspect-video bg-[#F7F8FA]">
                    <img src={previewUrl} alt="preview"
                      className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-[#E8EEF4] rounded-xl p-6
                             text-center cursor-pointer hover:border-[#FF6B35] transition-colors">
                  <p className="text-3xl mb-2">📁</p>
                  <p className="text-sm text-[#5A6A7A]">
                    {previewFile ? previewFile.name : 'Click to choose image'}
                  </p>
                  <p className="text-xs text-[#A0B4C8] mt-1">JPG, PNG, WebP · Max 5MB</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  required={!editImg}
                  onChange={e => setPreviewFile(e.target.files?.[0] ?? null)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">Title</label>
                <input value={meta.title}
                  onChange={e => setMeta(m => ({ ...m, title: e.target.value }))}
                  className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                             focus:outline-none focus:border-[#FF6B35]"
                  placeholder="Fleet branding for ABC Logistics" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">Category</label>
                <select value={meta.category}
                  onChange={e => setMeta(m => ({ ...m, category: e.target.value as any }))}
                  className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                             bg-white focus:outline-none focus:border-[#FF6B35]">
                  {CATEGORIES.filter(c => c.value !== 'all').map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">Client Name</label>
                <input value={meta.client_name}
                  onChange={e => setMeta(m => ({ ...m, client_name: e.target.value }))}
                  className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                             focus:outline-none focus:border-[#FF6B35]"
                  placeholder="ABC Logistics" />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1.5">Alt Text (SEO)</label>
                <input value={meta.alt_text}
                  onChange={e => setMeta(m => ({ ...m, alt_text: e.target.value }))}
                  className="w-full border border-[#E8EEF4] rounded-xl px-4 py-2.5 text-sm
                             focus:outline-none focus:border-[#FF6B35]"
                  placeholder="Vehicle branding Durban fleet wrap" />
              </div>

              <div className="flex items-center gap-3">
                <button type="button"
                  onClick={() => setMeta(m => ({ ...m, is_featured: !m.is_featured }))}
                  className={`relative w-10 h-5 rounded-full transition-colors
                    ${meta.is_featured ? 'bg-[#FF6B35]' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
                    shadow-sm transition-transform ${meta.is_featured ? 'translate-x-5' : ''}`} />
                </button>
                <span className="text-sm font-medium text-[#0D1B2A]">⭐ Featured Image</span>
              </div>

              <div className="flex items-center gap-3">
                <button type="button"
                  onClick={() => setMeta(m => ({ ...m, is_visible: !m.is_visible }))}
                  className={`relative w-10 h-5 rounded-full transition-colors
                    ${meta.is_visible ? 'bg-[#22C55E]' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
                    shadow-sm transition-transform ${meta.is_visible ? 'translate-x-5' : ''}`} />
                </button>
                <span className="text-sm font-medium text-[#0D1B2A]">Visible in gallery</span>
              </div>

              {/* Upload progress */}
              {uploading && (
                <div>
                  <div className="flex justify-between text-xs text-[#5A6A7A] mb-1">
                    <span>Uploading…</span><span>{uploadPct}%</span>
                  </div>
                  <div className="h-2 bg-[#E8EEF4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF6B35] rounded-full transition-all duration-300"
                      style={{ width: `${uploadPct}%` }} />
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 border border-[#E8EEF4] text-[#5A6A7A] font-bold
                             py-3 rounded-xl hover:bg-[#F7F8FA]">
                  Cancel
                </button>
                <button type="submit" disabled={uploading}
                  className="flex-1 bg-[#FF6B35] hover:bg-[#e85c28] text-white
                             font-bold py-3 rounded-xl disabled:opacity-50">
                  {uploading ? `Uploading ${uploadPct}%…` : editImg ? 'Save Changes' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
