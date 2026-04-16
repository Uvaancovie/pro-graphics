'use client'
// app/admin/login/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()
  let supabaseClient: ReturnType<typeof createSupabaseBrowserClient> | null = null
  let supabaseConfigError = ''

  try {
    supabaseClient = createSupabaseBrowserClient()
  } catch (err) {
    supabaseConfigError = err instanceof Error ? err.message : 'Supabase is not configured.'
  }

  if (!supabaseClient) {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-[#1C2B3A] rounded-2xl p-8 border border-[#2A3B4C]">
          <h1 className="text-white font-bold text-2xl mb-2">Supabase Configuration Required</h1>
          <p className="text-[#A0B4C8] text-sm mb-4">{supabaseConfigError}</p>
          <p className="text-[#A0B4C8] text-sm">Set `NEXT_PUBLIC_SUPABASE_URL` and a public key (`NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) in your environment, then restart the dev server.</p>
        </div>
      </div>
    )
  }
  const supabase = supabaseClient

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FF6B35] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">PG</span>
            </div>
            <span className="text-white font-black text-xl tracking-wide">PRO GRAPHICS</span>
          </div>
          <p className="text-[#A0B4C8] text-sm">Content Management System</p>
        </div>

        {/* Card */}
        <div className="bg-[#1C2B3A] rounded-2xl p-8 border border-[#2A3B4C]">
          <h1 className="text-white font-bold text-2xl mb-2">Director Login</h1>
          <p className="text-[#A0B4C8] text-sm mb-8">
            Sign in to manage products, pricing & gallery
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#A0B4C8] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="director@prographics.co.za"
                required
                className="w-full bg-[#0D1B2A] border border-[#2A3B4C] rounded-lg px-4 py-3
                           text-white placeholder-[#4A5A6A] focus:outline-none
                           focus:border-[#FF6B35] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#A0B4C8] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#0D1B2A] border border-[#2A3B4C] rounded-lg px-4 py-3
                           text-white placeholder-[#4A5A6A] focus:outline-none
                           focus:border-[#FF6B35] transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B35] hover:bg-[#e85c28] disabled:opacity-50
                         text-white font-bold py-3 rounded-lg transition-colors"
            >
              {loading ? 'Signing in…' : 'Sign In to CMS'}
            </button>
          </form>
        </div>

        <p className="text-center text-[#4A5A6A] text-xs mt-6">
          Pro Graphics CMS · Secure Director Access Only
        </p>
      </div>
    </div>
  )
}
