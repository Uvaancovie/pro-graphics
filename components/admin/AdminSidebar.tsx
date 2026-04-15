'use client'
// components/admin/AdminSidebar.tsx
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

const NAV = [
  { href: '/admin',          label: 'Dashboard',         icon: '📊' },
  { href: '/admin/orders',   label: 'Orders',            icon: '📋' },
  { href: '/admin/invoices', label: 'Invoices',          icon: '📄' },
  { href: '/admin/products', label: 'Products & Services',icon: '📦' },
  { href: '/admin/pricing',  label: 'Pricing Packages',  icon: '💰' },
  { href: '/admin/pricing/markups', label: 'Pricing Markups', icon: '📈' },
  { href: '/admin/calculator', label: 'Cost Calculator', icon: '🧮' },
  { href: '/admin/gallery',  label: 'Gallery',            icon: '🖼️' },
  { href: '/',               label: 'View Website ↗',    icon: '🌐', external: true },
]

// Map emails to display names - update with actual admin emails
const USER_NAMES: Record<string, string> = {
  'kemron@prographics.co.za': 'Kemron',
  'keanu@prographics.co.za': 'Keanu',
  'uvaan@prographics.co.za': 'Uvaan',
}

function getUserName(email: string): string {
  const normalizedEmail = email.toLowerCase()
  // Check if it's one of the known admin emails
  for (const [adminEmail, name] of Object.entries(USER_NAMES)) {
    if (normalizedEmail.includes(adminEmail.split('@')[0])) {
      return name
    }
  }
  // Return email prefix as fallback
  return email.split('@')[0]
}

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()
  const router   = useRouter()
  const supabase = createSupabaseBrowserClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0D1B2A] flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-[#1C2B3A]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF6B35] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-sm">PG</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">PRO GRAPHICS</p>
            <p className="text-[#A0B4C8] text-xs">CMS Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ href, label, icon, external }) => {
          const active = external ? false : (href === '/admin' ? pathname === href : pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium
                ${active
                  ? 'bg-[#FF6B35] text-white'
                  : 'text-[#A0B4C8] hover:bg-[#1C2B3A] hover:text-white'
                }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User & logout */}
      <div className="p-4 border-t border-[#1C2B3A]">
        <div className="bg-[#1C2B3A] rounded-xl p-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8F35] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">
                {userEmail.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{getUserName(userEmail)}</p>
              <p className="text-[#4A5A6A] text-xs">Director</p>
            </div>
          </div>
          <p className="text-[#4A5A6A] text-xs mt-2 truncate">{userEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl
                     text-[#A0B4C8] hover:bg-red-500/10 hover:text-red-400 transition-all text-sm"
        >
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
