import { Link } from 'react-router-dom'
import { Link, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 border-t" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Shield size={20} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          <span className="font-bold" style={{ color: 'var(--color-text)' }}>WEIR</span>
        </div>
        <nav className="flex flex-wrap gap-6 justify-center" aria-label="Footer navigation">
          <Link to="/" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Home</Link>
          <Link to="/pricing" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link>
          <Link to="/login" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Log in</Link>
          <Link to="/signup" className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Sign up</Link>
        </nav>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &copy; {new Date().getFullYear()} WEIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
