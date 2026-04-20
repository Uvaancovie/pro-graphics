// app/admin/inventory/materials/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Material {
  id: string
  name: string
  unit: string
  description: string | null
  created_at: string
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetchMaterials()
  }, [])

  async function fetchMaterials() {
    try {
      const res = await fetch('/api/inventory/materials')
      if (!res.ok) throw new Error('Failed to fetch materials')
      const data = await res.json()
      setMaterials(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/inventory/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name') as string,
          description: formData.get('description') as string || null,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create material')
      }

      const newMaterial = await res.json()
      setMaterials([...materials, newMaterial])
      setShowForm(false)
      ;(e.target as HTMLFormElement).reset()
    } catch (err: any) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#5A6A7A]">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/inventory"
            className="text-[#5A6A7A] hover:text-[#0D1B2A] transition-colors"
          >
            ← Back
          </Link>
          <div>
            <h1 className="text-[#0D1B2A] font-black text-3xl mb-1">Materials</h1>
            <p className="text-[#5A6A7A] text-sm">
              Manage material types for inventory tracking
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#FF6B35] hover:bg-[#e85c28] text-white font-bold px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          <span>+</span> Add Material
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-[#E8EEF4] shadow-sm mb-6">
          <h2 className="font-bold text-[#0D1B2A] mb-4">Add New Material</h2>
          <form onSubmit={handleSubmit}>
            {formError && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                {formError}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Material Name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., Vinyl, Chromatic, Canvas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5A6A7A] mb-1">
                  Description
                </label>
                <input
                  name="description"
                  type="text"
                  className="w-full border border-[#E8EEF4] rounded-lg px-3 py-2 text-sm"
                  placeholder="Optional description"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#FF6B35] hover:bg-[#e85c28] disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {submitting ? 'Creating...' : 'Create Material'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setFormError('') }}
                className="bg-gray-200 hover:bg-gray-300 text-[#0D1B2A] font-bold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E8EEF4] shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#F7F8FA] border-b border-[#E8EEF4]">
          <div className="col-span-4 text-xs font-bold text-[#5A6A7A] uppercase">Name</div>
          <div className="col-span-5 text-xs font-bold text-[#5A6A7A] uppercase">Description</div>
          <div className="col-span-2 text-xs font-bold text-[#5A6A7A] uppercase">Unit</div>
          <div className="col-span-1 text-xs font-bold text-[#5A6A7A] uppercase">Actions</div>
        </div>

        {materials.length === 0 ? (
          <div className="text-center py-16 text-[#5A6A7A]">
            <p className="text-4xl mb-3">📦</p>
            <p className="font-bold">No materials found</p>
            <p className="text-sm mt-1">Add your first material to get started</p>
          </div>
        ) : (
          materials.map((material) => (
            <div
              key={material.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#E8EEF4] hover:bg-[#FAFBFC] items-center"
            >
              <div className="col-span-4">
                <p className="font-bold text-[#0D1B2A]">{material.name}</p>
              </div>
              <div className="col-span-5">
                <p className="text-[#5A6A7A] text-sm">{material.description || '-'}</p>
              </div>
              <div className="col-span-2">
                <span className="inline-block px-2 py-1 bg-[#F7F8FA] rounded text-xs font-medium text-[#5A6A7A]">
                  {material.unit}
                </span>
              </div>
              <div className="col-span-1">
                <Link
                  href={`/admin/inventory?material=${material.id}`}
                  className="text-[#FF6B35] text-xs font-bold hover:underline"
                >
                  View Orders
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}