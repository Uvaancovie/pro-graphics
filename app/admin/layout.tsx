// app/admin/layout.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = { title: 'Pro Graphics CMS' }

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let session: { user: { email?: string | null } } | null = null

  try {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getSession()
    session = data.session
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Supabase is not configured.'
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#E8EEF4] shadow-sm p-8">
          <h1 className="text-[#0D1B2A] font-black text-2xl mb-2">Supabase Configuration Required</h1>
          <p className="text-[#5A6A7A] text-sm mb-3">{message}</p>
          <p className="text-[#5A6A7A] text-sm">Set `NEXT_PUBLIC_SUPABASE_URL` and a public key (`NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) in your environment, then restart the dev server.</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <AdminSidebar userEmail={session.user.email ?? ''} />
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
