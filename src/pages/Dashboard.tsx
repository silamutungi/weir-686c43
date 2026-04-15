import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle, DollarSign, Eye, Loader2, RefreshCw, TrendingUp, XCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import Navbar from '../components/Navbar'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { WeirDetection } from '../types/index'
import { formatCurrency, formatRelative } from '../lib/utils'

const SEED_DETECTIONS: WeirDetection[] = [
  { id: '1', user_id: 'demo', platform: 'TikTok', url: 'https://tiktok.com/@brand/video/1', match_type: 'image', risk_level: 'high', status: 'pending', detected_at: new Date(Date.now() - 3600000).toISOString(), created_at: new Date(Date.now() - 3600000).toISOString(), deleted_at: null },
  { id: '2', user_id: 'demo', platform: 'Instagram', url: 'https://instagram.com/p/abc123', match_type: 'name', risk_level: 'medium', status: 'pending', detected_at: new Date(Date.now() - 7200000).toISOString(), created_at: new Date(Date.now() - 7200000).toISOString(), deleted_at: null },
  { id: '3', user_id: 'demo', platform: 'YouTube', url: 'https://youtube.com/watch?v=xyz', match_type: 'video', risk_level: 'critical', status: 'takedown', detected_at: new Date(Date.now() - 86400000).toISOString(), created_at: new Date(Date.now() - 86400000).toISOString(), deleted_at: null },
  { id: '4', user_id: 'demo', platform: 'TikTok', url: 'https://tiktok.com/@creator/video/2', match_type: 'deepfake', risk_level: 'critical', status: 'pending', detected_at: new Date(Date.now() - 172800000).toISOString(), created_at: new Date(Date.now() - 172800000).toISOString(), deleted_at: null },
  { id: '5', user_id: 'demo', platform: 'Instagram', url: 'https://instagram.com/p/def456', match_type: 'image', risk_level: 'low', status: 'monetized', detected_at: new Date(Date.now() - 259200000).toISOString(), created_at: new Date(Date.now() - 259200000).toISOString(), deleted_at: null },
  { id: '6', user_id: 'demo', platform: 'YouTube', url: 'https://youtube.com/watch?v=abc', match_type: 'image', risk_level: 'medium', status: 'approved', detected_at: new Date(Date.now() - 432000000).toISOString(), created_at: new Date(Date.now() - 432000000).toISOString(), deleted_at: null }
]

const RISK_COLORS: Record<string, string> = {
  low: 'var(--color-success)',
  medium: 'var(--color-warning)',
  high: 'var(--color-error)',
  critical: '#7c3aed'
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending review',
  approved: 'Approved',
  takedown: 'Takedown filed',
  monetized: 'Monetized',
  ignored: 'Ignored'
}

export default function Dashboard() {
  const [detections, setDetections] = useState<WeirDetection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  async function fetchDetections() {
    setLoading(true)
    setError('')
    if (!isSupabaseConfigured) {
      setDetections(SEED_DETECTIONS)
      setLoading(false)
      return
    }
    const { data, error: fetchError } = await supabase
      .from('weir_detections')
      .select('*')
      .is('deleted_at', null)
      .order('detected_at', { ascending: false })
    if (fetchError) {
      setError('Failed to load detections. Please try again.')
    } else {
      setDetections((data ?? []) as WeirDetection[])
    }
    setLoading(false)
  }

  useEffect(() => { fetchDetections() }, [])

  async function updateStatus(id: string, status: WeirDetection['status']) {
    setActionLoading(id)
    if (!isSupabaseConfigured) {
      setDetections(prev => prev.map(d => d.id === id ? { ...d, status } : d))
      setActionLoading(null)
      return
    }
    const { error: updateError } = await supabase
      .from('weir_detections')
      .update({ status })
      .eq('id', id)
    if (!updateError) {
      setDetections(prev => prev.map(d => d.id === id ? { ...d, status } : d))
    }
    setActionLoading(null)
  }

  const pending = detections.filter(d => d.status === 'pending').length
  const criticalCount = detections.filter(d => d.risk_level === 'critical').length
  const monetized = detections.filter(d => d.status === 'monetized').length
  const totalEarnings = monetized * 340

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      {!isSupabaseConfigured && (
        <div className="px-6 py-3 text-sm text-center font-medium" style={{ backgroundColor: 'rgba(37,99,235,0.08)', color: 'var(--color-info)', borderBottom: '1px solid var(--color-border)' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-bold mb-1" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Detection Dashboard</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)' }}>Review and act on every match — no action is taken without your approval.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Pending Review</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{pending}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Critical Alerts</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold" style={{ color: criticalCount > 0 ? 'var(--color-error)' : 'var(--color-text)' }}>{criticalCount}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Monetized Uses</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold" style={{ color: 'var(--color-success)' }}>{monetized}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Est. Earnings</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{formatCurrency(totalEarnings)}</div></CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>Recent Detections</h2>
          <Button variant="outline" size="sm" onClick={fetchDetections} disabled={loading}>
            <RefreshCw size={14} className="mr-2" aria-hidden="true" />Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} aria-label="Loading detections" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <XCircle size={40} style={{ color: 'var(--color-error)' }} aria-hidden="true" />
            <p style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
            <Button onClick={fetchDetections} variant="outline">Try again</Button>
          </div>
        ) : detections.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center border rounded-xl" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
            <Eye size={40} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
            <p className="font-semibold" style={{ color: 'var(--color-text)' }}>No detections yet</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>WEIR will alert you the moment your identity appears online.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {detections.filter(d => d.deleted_at === null).map(d => (
              <div key={d.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{d.platform}</span>
                    <Badge style={{ backgroundColor: `${RISK_COLORS[d.risk_level]}20`, color: RISK_COLORS[d.risk_level], border: `1px solid ${RISK_COLORS[d.risk_level]}40` }}>
                      {d.risk_level.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>{d.match_type}</Badge>
                  </div>
                  <p className="text-sm truncate mb-1" style={{ color: 'var(--color-text-secondary)' }}>{d.url}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{STATUS_LABELS[d.status]} &bull; {formatRelative(d.detected_at)}</p>
                </div>
                {d.status === 'pending' && (
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" disabled={actionLoading === d.id} onClick={() => updateStatus(d.id, 'approved')}>
                      <CheckCircle size={14} className="mr-1" aria-hidden="true" />Approve
                    </Button>
                    <Button size="sm" variant="outline" disabled={actionLoading === d.id} onClick={() => updateStatus(d.id, 'monetized')} style={{ color: 'var(--color-success)', borderColor: 'var(--color-success)' }}>
                      <DollarSign size={14} className="mr-1" aria-hidden="true" />Monetize
                    </Button>
                    <Button size="sm" variant="destructive" disabled={actionLoading === d.id} onClick={() => updateStatus(d.id, 'takedown')}>
                      <AlertTriangle size={14} className="mr-1" aria-hidden="true" />Takedown
                    </Button>
                  </div>
                )}
                {d.status !== 'pending' && (
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{STATUS_LABELS[d.status]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
