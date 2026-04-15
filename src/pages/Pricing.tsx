import { Link } from 'react-router-dom'
import { CheckCircle, Link, Shield } from 'lucide-react'

import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import Footer from '../components/Footer'

const PLANS = [
  {
    name: 'Starter',
    price: 0,
    period: 'Free forever',
    description: 'For creators just getting started with identity protection.',
    features: ['Up to 25 detections/month', 'TikTok + Instagram monitoring', 'Manual review flow', 'Basic CPM reports', 'Email alerts'],
    cta: 'Start free',
    href: '/signup',
    highlight: false
  },
  {
    name: 'Growth',
    price: 29,
    period: 'per month',
    description: 'For active creators who want to monetize every unauthorized use.',
    features: ['Unlimited detections', 'All platforms including YouTube', 'One-tap monetization', 'Custom license templates', 'CPM reports by platform', 'DMCA takedown automation', 'Priority email support'],
    cta: 'Start 14-day trial',
    href: '/signup',
    highlight: true
  },
  {
    name: 'Pro',
    price: 99,
    period: 'per month',
    description: 'For professional creators, athletes, and public figures.',
    features: ['Everything in Growth', 'Deepfake detection', 'Legal letter generation', 'Licensing negotiation assist', 'Creator benchmark analytics', 'Dedicated account manager', 'API access'],
    cta: 'Start 14-day trial',
    href: '/signup',
    highlight: false
  }
]

const FAQS = [
  { q: 'Does WEIR auto-file takedowns?', a: 'Never. Every action — approve, monetize, or file a takedown — requires your explicit approval. We built WEIR specifically to avoid the aggressive auto-claim patterns that damage creator reputations.' },
  { q: 'How accurate are the detections?', a: 'We show you a confidence score and the source URL for every match. You review before anything happens. No hidden false-positive history — every match is transparent.' },
  { q: 'How does licensing work?', a: 'When a brand is using your image without permission, you can send a licensing offer instead of a takedown. WEIR generates platform-specific terms (TikTok CPM differs from Instagram) and handles the negotiation flow.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your Settings page at any time. Your account stays active until the end of your billing period.' }
]

export default function Pricing() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield size={24} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            <span className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>WEIR</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Log in</Link>
            <Button asChild size="sm"><Link to="/signup">Start free</Link></Button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-bold mb-4" style={{ fontSize: 'var(--text-large-title)', color: 'var(--color-text)' }}>Simple, transparent pricing</h1>
            <p className="max-w-lg mx-auto" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-body)' }}>Start free. Upgrade when your identity protection needs grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {PLANS.map(plan => (
              <Card key={plan.name} className={plan.highlight ? 'ring-2 relative' : ''} style={plan.highlight ? { ringColor: 'var(--color-primary)' } : {}}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Most popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle style={{ color: 'var(--color-text)' }}>{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="font-bold" style={{ fontSize: '2rem', color: 'var(--color-text)' }}>{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                    {plan.price > 0 && <span className="text-sm ml-1" style={{ color: 'var(--color-text-secondary)' }}>/{plan.period.replace('per ', '')}</span>}
                  </div>
                  <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        <CheckCircle size={16} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full" variant={plan.highlight ? 'default' : 'outline'}>
                    <Link to={plan.href}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="font-bold mb-8 text-center" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Frequently asked questions</h2>
            <div className="space-y-6">
              {FAQS.map(faq => (
                <div key={faq.q} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{faq.q}</h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
