import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Link, LogOut, Menu, Shield, X } from 'lucide-react'

import { Button } from './ui/button'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/settings', label: 'Settings', icon: Settings }
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    navigate('/login')
  }

  return (
    <nav style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Shield size={22} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          <span className="font-bold text-base" style={{ color: 'var(--color-text)' }}>WEIR</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            const active = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                style={{ backgroundColor: active ? 'rgba(30,64,175,0.1)' : 'transparent', color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={16} aria-hidden="true" />{item.label}
              </Link>
            )
          })}
          <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2">
            <LogOut size={16} className="mr-2" aria-hidden="true" />Log out
          </Button>
        </div>
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{ color: 'var(--color-text)' }}
        >
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-1" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon
            const active = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium"
                style={{ backgroundColor: active ? 'rgba(30,64,175,0.1)' : 'transparent', color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
              >
                <Icon size={18} aria-hidden="true" />{item.label}
              </Link>
            )
          })}
          <button
            onClick={() => { setMobileOpen(false); handleLogout() }}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium w-full"
            style={{ color: 'var(--color-error)' }}
          >
            <LogOut size={18} aria-hidden="true" />Log out
          </button>
        </div>
      )}
    </nav>
  )
}
