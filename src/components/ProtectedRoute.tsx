import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function check() {
      if (!isSupabaseConfigured) {
        setAuthenticated(true)
        setChecking(false)
        return
      }
      const { data } = await supabase.auth.getSession()
      setAuthenticated(!!data.session)
      setChecking(false)
    }
    check()
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} aria-label="Checking authentication" />
      </div>
    )
  }

  return authenticated ? <>{children}</> : <Navigate to="/login" replace />
}
