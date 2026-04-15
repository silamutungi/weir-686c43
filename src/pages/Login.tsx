import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { type FormEvent } from 'react'
import { AlertCircle, Link, Loader2, Shield } from 'lucide-react'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!isSupabaseConfigured) {
      setLoading(false)
      navigate('/dashboard')
      return
    }
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Invalid email or password. Please try again.')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Shield size={28} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            <span className="font-bold text-xl" style={{ color: 'var(--color-text)' }}>WEIR</span>
          </Link>
          <h1 className="font-bold mb-2" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Welcome back</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>Log in to your account to continue</p>
        </div>
        <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }} role="alert">
              <AlertCircle size={16} style={{ color: 'var(--color-error)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <span className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? <><Loader2 size={16} className="mr-2 animate-spin" aria-hidden="true" />Logging in...</> : 'Log in'}
              </Button>
            </div>
          </form>
        </div>
        <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          No account yet?{' '}
          <Link to="/signup" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Start free</Link>
        </p>
      </div>
    </div>
  )
}
