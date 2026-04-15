import { useEffect, useState } from 'react'
import { type FormEvent } from 'react'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Settings() {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      setLoading(true)
      if (!isSupabaseConfigured) {
        setDisplayName('Demo Creator')
        setBio('Independent content creator')
        setKeywords('my name, @myhandle, myBrand')
        setLoading(false)
        return
      }
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData.session
      if (!session) { setLoading(false); return }
      setUserId(session.user.id)
      const { data, error: fetchError } = await supabase
        .from('weir_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single()
      if (!fetchError && data) {
        setDisplayName(data.display_name ?? '')
        setBio(data.bio ?? '')
        setKeywords((data.monitoring_keywords ?? []).join(', '))
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  async function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)
    if (!isSupabaseConfigured) {
      await new Promise(r => setTimeout(r, 600))
      setSaving(false)
      setSuccess(true)
      return
    }
    if (!userId) { setSaving(false); setError('Not authenticated.'); return }
    const keywordArray = keywords.split(',').map(k => k.trim()).filter(Boolean)
    const { error: upsertError } = await supabase
      .from('weir_profiles')
      .upsert({ user_id: userId, display_name: displayName, bio, monitoring_keywords: keywordArray })
    setSaving(false)
    if (upsertError) {
      setError('Failed to save profile. Please try again.')
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="font-bold mb-8" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Settings</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} aria-label="Loading settings" />
          </div>
        ) : (
          <>
            <Card className="mb-8">
              <CardHeader><CardTitle style={{ color: 'var(--color-text)' }}>Profile</CardTitle></CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-5 flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }} role="alert">
                    <AlertCircle size={16} style={{ color: 'var(--color-error)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="mb-5 flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)' }} role="status">
                    <CheckCircle size={16} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span className="text-sm" style={{ color: 'var(--color-success)' }}>Profile saved successfully.</span>
                  </div>
                )}
                <form onSubmit={handleSave}>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display name</Label>
                      <Input id="displayName" type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your public name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" type="text" value={bio} onChange={e => setBio(e.target.value)} placeholder="One-line description" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Monitoring keywords</Label>
                      <Input id="keywords" type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="comma, separated, terms" />
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>WEIR scans for these terms across all monitored platforms.</p>
                    </div>
                    <Button type="submit" disabled={saving}>
                      {saving ? <><Loader2 size={14} className="mr-2 animate-spin" aria-hidden="true" />Saving...</> : 'Save changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card style={{ borderColor: 'rgba(220,38,38,0.3)' }}>
              <CardHeader><CardTitle style={{ color: 'var(--color-error)' }}>Danger zone</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Deleting your account removes all data permanently. This action cannot be undone.</p>
                <Button variant="destructive" type="button">Delete account</Button>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
