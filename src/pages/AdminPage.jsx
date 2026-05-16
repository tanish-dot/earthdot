import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const CHAPTER_LABELS = {
  'lost-in-the-woods': 'Lost in the Woods',
  'humming-grove': 'The Humming Grove',
  'soul-springs': 'Soul Springs',
  'all': 'All Chapters',
}

const STATUS_COLORS = {
  'lost-in-the-woods': 'text-forest-glow border-forest-glow/30',
  'humming-grove': 'text-muted-olive border-muted-olive/30',
  'soul-springs': 'text-[#7a9a8a] border-[#7a9a8a]/30',
  'all': 'text-ivory-dim border-stone',
}

// ── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Invalid credentials.')
    else onLogin()
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center px-6">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-16">
          <img src="/logo.png" alt="The Earth Project"
            className="h-10 w-auto opacity-60"
            style={{ filter: 'invert(1) brightness(2)' }} />
        </div>

        <p className="text-whisper text-stone-grey tracking-ultra text-[0.55rem] mb-8 text-center">
          ADMIN ACCESS
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-whisper text-stone-grey text-[0.48rem] tracking-widest">EMAIL</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="bg-transparent border-b border-stone text-ivory font-serif text-sm font-light py-3 outline-none focus:border-ivory transition-colors duration-500"
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-whisper text-stone-grey text-[0.48rem] tracking-widest">PASSWORD</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="bg-transparent border-b border-stone text-ivory font-serif text-sm font-light py-3 outline-none focus:border-ivory transition-colors duration-500"
              autoComplete="current-password"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p className="text-whisper text-red-400/70 text-[0.48rem] tracking-widest"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button type="submit" disabled={loading}
            className="mt-4 font-serif text-ivory text-sm font-light border border-stone px-8 py-4 hover:border-ivory transition-colors duration-500 tracking-widest disabled:opacity-40">
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ user, onLogout }) {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setEnquiries(data || [])
    setLoading(false)
  }

  const filtered = filter === 'all'
    ? enquiries
    : enquiries.filter(e => e.chapter === filter)

  const chapters = ['all', 'lost-in-the-woods', 'humming-grove', 'soul-springs']

  const fmt = iso => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      + ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-void">

      {/* ── Top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-stone/20 bg-void/95 backdrop-blur-sm
        flex items-center justify-between px-5 md:px-10 py-4">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="The Earth Project" className="h-7 w-auto opacity-50"
            style={{ filter: 'invert(1) brightness(2)' }} />
          <span className="text-whisper text-stone-grey text-[0.5rem] tracking-ultra hidden sm:block">ADMIN</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={fetchEnquiries}
            className="text-whisper text-stone-grey hover:text-ivory text-[0.5rem] tracking-widest transition-colors duration-300">
            REFRESH
          </button>
          <button onClick={onLogout}
            className="text-whisper text-stone-grey hover:text-ivory text-[0.5rem] tracking-widest transition-colors duration-300">
            SIGN OUT
          </button>
        </div>
      </div>

      <div className="pt-20 px-5 md:px-10 pb-16">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] border border-stone/20 mb-8 mt-4">
          {[
            { label: 'TOTAL', value: enquiries.length },
            { label: 'LOST IN THE WOODS', value: enquiries.filter(e => e.chapter === 'lost-in-the-woods').length },
            { label: 'HUMMING GROVE', value: enquiries.filter(e => e.chapter === 'humming-grove').length },
            { label: 'SOUL SPRINGS', value: enquiries.filter(e => e.chapter === 'soul-springs').length },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-1 px-6 py-5 bg-void">
              <span className="font-serif text-ivory font-light text-2xl md:text-3xl">{s.value}</span>
              <span className="text-whisper text-stone-grey text-[0.45rem] tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex items-center gap-0 border-b border-stone/20 mb-6 overflow-x-auto">
          {chapters.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`text-whisper text-[0.5rem] tracking-widest px-5 py-3 border-b-[1px] transition-colors duration-300 whitespace-nowrap ${
                filter === c
                  ? 'text-ivory border-ivory'
                  : 'text-stone-grey border-transparent hover:text-ivory'
              }`}>
              {c === 'all' ? 'ALL' : CHAPTER_LABELS[c]?.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ── Table ── */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <p className="text-whisper text-stone-grey text-[0.5rem] tracking-ultra animate-pulse">LOADING...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="font-serif text-stone-grey text-sm font-light italic">No enquiries yet.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block border border-stone/20 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone/20">
                    {['NAME', 'EMAIL', 'PHONE', 'CHAPTER', 'TYPE', 'DATE'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-whisper text-stone-grey text-[0.45rem] tracking-widest font-normal">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e, i) => (
                    <tr key={e.id}
                      onClick={() => setSelected(selected?.id === e.id ? null : e)}
                      className={`border-b border-stone/10 cursor-pointer transition-colors duration-200 hover:bg-stone/10 ${
                        selected?.id === e.id ? 'bg-stone/15' : ''
                      }`}>
                      <td className="px-5 py-4 font-serif text-ivory text-sm font-light">{e.name || '—'}</td>
                      <td className="px-5 py-4 font-serif text-stone-grey text-sm font-light">{e.email || '—'}</td>
                      <td className="px-5 py-4 font-serif text-stone-grey text-sm font-light">{e.phone || '—'}</td>
                      <td className="px-5 py-4">
                        <span className={`text-whisper text-[0.45rem] tracking-widest border px-2 py-1 ${STATUS_COLORS[e.chapter] || 'text-stone-grey border-stone/30'}`}>
                          {CHAPTER_LABELS[e.chapter] || e.chapter || '—'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-whisper text-stone-grey text-[0.48rem] tracking-widest capitalize">{e.enquiry_type?.replace('-', ' ') || '—'}</td>
                      <td className="px-5 py-4 text-whisper text-stone-grey text-[0.45rem] tracking-widest">{fmt(e.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden flex flex-col gap-3">
              {filtered.map(e => (
                <div key={e.id}
                  onClick={() => setSelected(selected?.id === e.id ? null : e)}
                  className={`border border-stone/20 p-5 cursor-pointer transition-colors duration-200 ${selected?.id === e.id ? 'border-stone/50' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <p className="font-serif text-ivory text-base font-light">{e.name || '—'}</p>
                    <span className={`text-whisper text-[0.42rem] tracking-widest border px-2 py-1 ${STATUS_COLORS[e.chapter] || 'text-stone-grey border-stone/30'}`}>
                      {CHAPTER_LABELS[e.chapter] || '—'}
                    </span>
                  </div>
                  <p className="font-serif text-stone-grey text-sm font-light">{e.email || '—'}</p>
                  <p className="text-whisper text-stone-grey text-[0.45rem] tracking-widest mt-2">{fmt(e.created_at)}</p>
                </div>
              ))}
            </div>

            {/* ── Message drawer ── */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal border-t border-stone/30 px-5 md:px-10 py-8 max-h-[55vh] overflow-y-auto"
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}>
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="font-serif text-ivory text-xl font-light">{selected.name}</p>
                        <p className="text-whisper text-stone-grey text-[0.48rem] tracking-widest mt-1">{fmt(selected.created_at)}</p>
                      </div>
                      <button onClick={() => setSelected(null)}
                        className="text-whisper text-stone-grey hover:text-ivory text-[0.5rem] tracking-widest transition-colors">
                        CLOSE ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-stone/20">
                      {[
                        { l: 'EMAIL', v: selected.email },
                        { l: 'PHONE', v: selected.phone },
                        { l: 'CHAPTER', v: CHAPTER_LABELS[selected.chapter] },
                        { l: 'ENQUIRY TYPE', v: selected.enquiry_type?.replace('-', ' ') },
                      ].map(f => (
                        <div key={f.l}>
                          <p className="text-whisper text-stone-grey text-[0.45rem] tracking-widest mb-1">{f.l}</p>
                          <p className="font-serif text-ivory text-sm font-light capitalize">{f.v || '—'}</p>
                        </div>
                      ))}
                    </div>
                    {selected.message && (
                      <div>
                        <p className="text-whisper text-stone-grey text-[0.45rem] tracking-widest mb-3">MESSAGE</p>
                        <p className="font-serif text-ivory-dim text-base font-light leading-relaxed">{selected.message}</p>
                      </div>
                    )}
                    <a href={`mailto:${selected.email}`}
                      className="inline-block mt-6 text-whisper text-forest-glow hover:text-ivory text-[0.5rem] tracking-widest border-b border-forest-glow/30 pb-1 transition-colors duration-300">
                      REPLY VIA EMAIL →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }

  if (checking) return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <p className="text-whisper text-stone-grey text-[0.5rem] tracking-ultra animate-pulse">LOADING...</p>
    </div>
  )

  if (!session) return <LoginScreen onLogin={() => {}} />

  return <Dashboard user={session.user} onLogout={handleLogout} />
}
