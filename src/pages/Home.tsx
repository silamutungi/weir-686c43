import { Link } from 'react-router-dom'
import { CheckCircle, Link, Shield } from 'lucide-react'

import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import Footer from '../components/Footer'

const FEATURES = [
  {
    icon: '🔍',
    title: 'Real-time cross-platform detection',
    desc: 'Scans TikTok, Instagram, YouTube, and the open web for your name, image, or likeness — alerts you before damage spreads.'
  },
  {
    icon: '⚡',
    title: 'One-tap actions, creator-controlled',
    desc: 'You decide: approve the use, send a takedown, or open a licensing deal. Zero auto-filing. Every action needs your green light.'
  },
  {
    icon: '💰',
    title: 'Turn violations into revenue',
    desc: 'Auto-generate customized license terms per platform. Brands pay you directly instead of fighting in court.'
  },
  {
    icon: '📊',
    title: 'CPM reports by platform',
    desc: 'See your earnings, CPM benchmarks, and growth trends broken down by TikTok, Instagram, and YouTube.'
  }
]

const STEPS = [
  { step: '01', title: 'Upload your identity assets', desc: 'Add photos, videos, and keywords tied to your name and brand.' },
  { step: '02', title: 'WEIR monitors 24/7', desc: 'Our engine scans millions of posts across all major platforms daily.' },
  { step: '03', title: 'You decide, every time', desc: 'Approve, monetize, or remove — with one tap and full audit history.' }
]

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield size={24} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--color-text)' }}>WEIR</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/pricing" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link>
            <Link to="/login" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Log in</Link>
            <Button asChild size="sm">
              <Link to="/signup">Start free</Link>
            </Button>
          </nav>
          <div className="md:hidden flex items-center gap-3">
            <Button asChild size="sm">
              <Link to="/signup">Start free</Link>
            </Button>
          </div>
        </div>
      </header>

      <section
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/8052810/pexels-photo-8052810.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 pt-40">
          <Badge className="mb-6" style={{ backgroundColor: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.4)' }}>Identity Protection + Monetization</Badge>
          <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.15', letterSpacing: '-0.02em', maxWidth: '680px' }}>
            Your name is used online.<br />You should get paid for it.
          </h1>
          <p className="text-lg mb-10 max-w-xl" style={{ color: 'rgba(255,255,255,0.80)', lineHeight: '1.6' }}>
            WEIR detects every unauthorized use of your face, name, or content across TikTok, Instagram, and YouTube — then lets you approve, monetize, or remove it in one tap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-base px-8">
              <Link to="/signup">Get your dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 border-white/40 text-white hover:bg-gray-900/10">
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap gap-6">
            {['No auto-filing', 'Creator-approved only', '14-day free trial'].map(t => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" aria-hidden="true" />
                <span className="text-sm text-white/80">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-bold mb-4" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Everything creators need to protect their identity</h2>
          <p className="mb-16 max-w-xl" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-body)' }}>Detection that catches real threats. Actions that you control. Revenue that flows back to you.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map(f => (
              <div key={f.title} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="text-4xl mb-4" role="img" aria-label={f.title}>{f.icon}</div>
                <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>{f.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)', lineHeight: 'var(--leading-relaxed)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-bold mb-16" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Up and running in 3 steps</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map(s => (
              <div key={s.step}>
                <div className="font-bold mb-3" style={{ fontSize: '2.5rem', color: 'var(--color-primary)', lineHeight: '1' }}>{s.step}</div>
                <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>{s.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-subhead)', lineHeight: 'var(--leading-relaxed)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-4" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Ready to own your identity?</h2>
          <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--color-text-secondary)' }}>Start free for 14 days. No credit card required. Cancel anytime.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/signup">Start free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/pricing">Compare plans</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
