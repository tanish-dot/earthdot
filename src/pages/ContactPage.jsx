import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { trackEvent, trackConversion, trackGA4Event, CONVERSIONS } from '../lib/analytics'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzVWF2eVPTR2FDmMIezA9HSIsEzzINjhaMEAbpTMCJtG3jFoYmzD6uyaCwKq-bJeYxT/exec'

// ── Data sourced from the chapters ──────────────────────────────────────────
const chapters = [
  {
    num: 'I',
    name: 'LOST IN THE WOODS',
    location: 'Sakleshpur, Karnataka',
    status: 'DELIVERED',
    to: '/lost-in-the-woods',
    img: 'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61715726e203877b181cfc17_228A4051%201_Small_01.png',
    tagline: 'Where life and land remain untouched.',
    stats: ['36.68 Acres', '1030–1170m Elevation', '35+ Amenities', '30+ Tree Species'],
  },
  {
    num: 'II',
    name: 'THE HUMMING GROVE',
    location: 'Ananthagiri Hills, Hyderabad',
    status: 'UPCOMING',
    to: '/humming-grove',
    img: '/images/hg/hg-102.jpg',
    tagline: 'Where every home feels private, every street feels shaded.',
    stats: ['12.46 Acres', '400–600 Sq. Yds.', '100% Nature-Led', 'Ananthagiri Hills'],
  },
  {
    num: 'III',
    name: 'SOUL SPRINGS',
    location: 'Sadanahalli, Bangalore',
    status: 'COMING SOON',
    to: '/soul-springs',
    img: '/images/ss/ss-004.jpg',
    tagline: 'A quiet world shaped by an ancient living spring.',
    stats: ['57 Acres', '369 Plots', '40+ Amenities', 'Natural Spring Corridor'],
  },
]


function Section({ children, className = '' }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}>
      {children}
    </motion.div>
  )
}

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const heroRef = useRef()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  const [form, setForm] = useState({ name: '', email: '', phone: '', chapter: '', type: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const params = new URLSearchParams({
        name: form.name,
        email: form.email,
        phone: form.phone,
        chapter: form.chapter,
        type: form.type,
        message: form.message,
      })
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      })
      // Conversion: contact enquiry submitted
      trackConversion(CONVERSIONS.leadForm)
      trackGA4Event('generate_lead', { form: 'contact', chapter: form.chapter, type: form.type })
      trackEvent('contact_submit', { chapter: form.chapter, type: form.type })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-void min-h-screen">

      {/* ── Nav ── */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-8"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.88) 0%, transparent 100%)' }}>
        <Link to="/" className="flex items-center gap-3 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="rgba(245,240,232,0.5)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <img src="/logo.png" alt="The Earth Project" className="h-7 w-auto opacity-50 group-hover:opacity-80 transition-opacity duration-500"
            style={{ filter: 'invert(1) brightness(2)' }} />
        </Link>
        <span className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra">CONTACT</span>
      </div>

      {/* ── Hero ── */}
      <div ref={heroRef} className="relative overflow-hidden" style={{ height: '75vh' }}>
        <motion.img
          src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/6173e5524f9dce6f32eef7bd_Under%20The%20Canopy.jpg"
          alt="Contact"
          style={{ top: '-15%', y: heroY }}
          className="absolute inset-x-0 w-full h-[130%] object-cover object-center"
          loading="lazy" decoding="async"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.15) 40%, rgba(8,8,8,0.92) 100%)'
        }} />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-8 md:px-20 pb-20">
          <motion.p className="text-whisper text-ivory/50 text-[0.55rem] tracking-ultra mb-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            THE EARTH PROJECT
          </motion.p>
          <motion.h1 className="text-display text-ivory"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', lineHeight: 0.88 }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}>
            Begin your<br /><em>chapter.</em>
          </motion.h1>
          <motion.p className="font-serif text-ivory/50 text-lg font-light italic mt-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}>
            The land is not sold. It is discovered.
          </motion.p>
        </div>
      </div>

      {/* ── Chapters strip ── */}
      <div className="border-b border-stone/20">
        {chapters.map((c, i) => (
          <Section key={c.num}>
            <div className="grid grid-cols-1 md:grid-cols-5 border-t border-stone/20 group">

              {/* Image */}
              <div className="md:col-span-2 relative overflow-hidden" style={{ height: '38vh' }}>
                <img src={c.img} alt={c.name} loading="lazy" decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.6)' }} />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(to right, transparent 60%, rgba(8,8,8,0.9) 100%)'
                }} />
                <div className="absolute top-6 left-6">
                  <span className="text-display text-ivory/10 select-none"
                    style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1 }}>{c.num}</span>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-3 flex flex-col justify-between px-8 md:px-14 py-10 bg-void">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-whisper text-forest-glow text-[0.5rem] tracking-ultra mb-3">CHAPTER {c.num}</p>
                    <Link to={c.to}>
                      <h2 className="font-serif text-ivory font-light hover:text-ivory/70 transition-colors duration-500"
                        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}>{c.name}</h2>
                    </Link>
                    <p className="text-whisper text-stone-grey text-[0.5rem] tracking-widest mt-2">{c.location}</p>
                  </div>
                  <span className={`text-whisper text-[0.5rem] tracking-widest flex-shrink-0 mt-1 px-3 py-1.5 border ${
                    c.status === 'DELIVERED' ? 'border-forest-glow/40 text-forest-glow' :
                    c.status === 'UPCOMING' ? 'border-muted-olive/40 text-muted-olive' :
                    'border-stone/40 text-stone-grey'
                  }`}>{c.status}</span>
                </div>

                <p className="font-serif text-stone-grey text-sm font-light italic mt-4 mb-6">{c.tagline}</p>

                <div className="flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2 pt-6 border-t border-stone/20">
                  {c.stats.map(s => (
                    <span key={s} className="text-whisper text-ivory/35 text-[0.48rem] tracking-widest">{s}</span>
                  ))}
                </div>
              </div>

            </div>
          </Section>
        ))}
      </div>

      {/* ── Two-column: form + details ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-16 py-14 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24">

        {/* ── Enquiry form ── */}
        <Section>
          <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-10">ENQUIRE</p>

          {status === 'success' ? (
            <motion.div className="py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-serif text-ivory text-3xl font-light mb-4">Thank you.</p>
              <p className="font-serif text-stone-grey text-base font-light leading-relaxed">
                We'll be in touch shortly to begin the conversation. Your enquiry has been received.
              </p>
              <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', chapter: '', type: '', message: '' }) }}
                className="mt-10 text-whisper text-stone-grey hover:text-ivory text-[0.5rem] tracking-ultra transition-colors duration-500 border-b border-stone/30 pb-1">
                SEND ANOTHER →
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">

              {/* Name + Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: 'name', label: 'FULL NAME', type: 'text', required: true },
                  { name: 'phone', label: 'PHONE NUMBER', type: 'tel', required: false },
                ].map(f => (
                  <div key={f.name} className="flex flex-col gap-2">
                    <label className="text-whisper text-stone-grey text-[0.48rem] tracking-widest">{f.label}</label>
                    <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required={f.required}
                      className="bg-transparent border-b border-stone text-ivory font-serif text-sm font-light py-3 outline-none focus:border-ivory transition-colors duration-500" />
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-whisper text-stone-grey text-[0.48rem] tracking-widest">EMAIL ADDRESS</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required
                  className="bg-transparent border-b border-stone text-ivory font-serif text-sm font-light py-3 outline-none focus:border-ivory transition-colors duration-500" />
              </div>

              {/* Chapter + Type row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-whisper text-stone-grey text-[0.48rem] tracking-widest">CHAPTER OF INTEREST</label>
                  <select name="chapter" value={form.chapter} onChange={handleChange}
                    className="bg-void border-b border-stone text-ivory font-serif text-sm font-light py-3 outline-none focus:border-ivory transition-colors duration-500 cursor-pointer">
                    <option value="" className="bg-void">Select</option>
                    <option value="lost-in-the-woods" className="bg-void">Lost in the Woods (I)</option>
                    <option value="humming-grove" className="bg-void">The Humming Grove (II)</option>
                    <option value="soul-springs" className="bg-void">Soul Springs (III)</option>
                    <option value="all" className="bg-void">All chapters</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-whisper text-stone-grey text-[0.48rem] tracking-widest">ENQUIRY TYPE</label>
                  <select name="type" value={form.type} onChange={handleChange}
                    className="bg-void border-b border-stone text-ivory font-serif text-sm font-light py-3 outline-none focus:border-ivory transition-colors duration-500 cursor-pointer">
                    <option value="" className="bg-void">Select</option>
                    <option value="site-visit" className="bg-void">Site Visit</option>
                    <option value="pricing" className="bg-void">Pricing & Availability</option>
                    <option value="investment" className="bg-void">Investment Enquiry</option>
                    <option value="general" className="bg-void">General</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-whisper text-stone-grey text-[0.48rem] tracking-widest">MESSAGE</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                  className="bg-transparent border-b border-stone text-ivory font-serif text-sm font-light py-3 outline-none focus:border-ivory transition-colors duration-500 resize-none" />
              </div>

              {status === 'error' && (
                <p className="text-whisper text-red-400/70 text-[0.48rem] tracking-widest">
                  Something went wrong. Please email us directly at contact@earthproject.in
                </p>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="self-start mt-2 font-serif text-ivory text-sm font-light border border-stone px-10 py-4 hover:border-ivory transition-colors duration-500 tracking-widest disabled:opacity-40">
                {status === 'sending' ? 'SENDING...' : 'SEND ENQUIRY'}
              </button>
            </form>
          )}
        </Section>

        {/* ── Contact details ── */}
        <Section className="pt-0 md:pt-14">
          <div className="flex flex-col gap-14">

            <div>
              <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">DIRECT CONTACT</p>
              <a href="mailto:contact@earthproject.in"
                className="font-serif text-ivory text-xl md:text-2xl font-light hover:text-ivory/70 transition-colors duration-500 block mb-3">
                contact@earthproject.in
              </a>
              <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-4">REGISTERED ADDRESS</p>
              <address className="not-italic font-serif text-stone-grey text-sm font-light leading-relaxed">
                M/S. The Earth Project<br />
                Plot No 432, KYR Heights, 1st Floor<br />
                Road No 7, Vivekananda Nagar<br />
                Hitech City Road<br />
                Hyderabad — 500018<br />
                Telangana, India
              </address>
            </div>

            <div>
              <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">SITE VISITS</p>
              <p className="font-serif text-stone-grey text-sm font-light leading-relaxed mb-4">
                By appointment only. We believe the land speaks best when you're standing on it.
              </p>
              <div className="flex flex-col gap-3 mt-4">
                {chapters.map(c => (
                  <div key={c.num} className="flex items-center justify-between py-3 border-b border-stone/15">
                    <div>
                      <p className="font-serif text-ivory/80 text-sm font-light">{c.name}</p>
                      <p className="text-whisper text-stone-grey text-[0.48rem] tracking-widest mt-1">{c.location}</p>
                    </div>
                    <span className={`text-whisper text-[0.45rem] tracking-widest ${
                      c.status === 'DELIVERED' ? 'text-forest-glow' :
                      c.status === 'UPCOMING' ? 'text-muted-olive' : 'text-stone-grey'
                    }`}>{c.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">FOLLOW</p>
              <div className="flex flex-col gap-4">
                <a href="https://www.instagram.com/the.earthproject_/" target="_blank" rel="noopener noreferrer"
                  className="text-stone-grey hover:text-ivory transition-colors duration-500" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="5"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/theearthproject/" target="_blank" rel="noopener noreferrer"
                  className="text-stone-grey hover:text-ivory transition-colors duration-500" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@the_earthproject" target="_blank" rel="noopener noreferrer"
                  className="text-stone-grey hover:text-ivory transition-colors duration-500" aria-label="YouTube">
                  <svg width="22" height="16" viewBox="0 0 576 404" fill="currentColor">
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-stone/20">
              <p className="font-serif text-stone-grey text-xs font-light leading-loose italic">
                "We don't chase numbers.<br />We find people who belong."
              </p>
            </div>

          </div>
        </Section>
      </div>

      {/* ── Footer nav ── */}
      <div className="border-t border-stone/20 mx-5 md:mx-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <span className="text-whisper text-stone-grey text-[0.5rem] tracking-ultra">THE EARTH PROJECT © 2025</span>
        <div className="flex items-center gap-10">
          <Link to="/lost-in-the-woods" className="text-whisper text-stone-grey hover:text-ivory transition-colors duration-500 text-[0.55rem] tracking-widest">LOST IN THE WOODS</Link>
          <Link to="/humming-grove" className="text-whisper text-stone-grey hover:text-ivory transition-colors duration-500 text-[0.55rem] tracking-widest">HUMMING GROVE</Link>
          <Link to="/soul-springs" className="text-whisper text-stone-grey hover:text-ivory transition-colors duration-500 text-[0.55rem] tracking-widest">SOUL SPRINGS</Link>
        </div>
      </div>

    </div>
  )
}
