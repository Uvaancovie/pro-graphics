// app/admin/layout.tsx
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = { title: 'Pro Graphics CMS' }

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createSupabaseServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <AdminSidebar userEmail={session.user.email ?? ''} />
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
