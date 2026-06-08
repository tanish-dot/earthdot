import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import ChapterFooter from '../components/ChapterFooter'
import BrochureModal from '../components/BrochureModal'

const stats = [
  { value: '12.46', unit: 'ACRES', label: 'Total Land' },
  { value: '400–600', unit: 'SQ. YDS.', label: 'Plot Range' },
  { value: 'Move-In', unit: 'READY', label: 'Villas' },
  { value: '100%', unit: 'NATURE-LED', label: 'Design Principle' },
]

const amenities = [
  { name: 'Grand Entrance Gate', desc: 'Architecturally defined threshold into the community' },
  { name: 'Clubhouse', desc: 'A shared retreat for gathering, pausing, and connecting' },
  { name: 'Infinity Pool', desc: 'Reflecting sky and canopy at the hill\'s edge' },
  { name: 'Treehouse Deck', desc: 'An elevated vantage point into the forest canopy' },
  { name: 'Meditation Garden', desc: 'Curated silence. A space to arrive within yourself' },
  { name: 'Bonfire Pit', desc: 'Evening rituals around fire under open sky' },
  { name: 'Jogging & Walking Trails', desc: 'Paths that move through nature, not past it' },
  { name: 'Avocado & Mango Orchard', desc: 'Working fruit groves tended by the community' },
  { name: 'Stargazing Lawn', desc: 'An unlit open field far from city glow' },
  { name: 'Pet-Friendly Zones', desc: 'The land welcomes every member of your family' },
  { name: 'EV Charging Points', desc: 'Infrastructure for the journey ahead' },
  { name: '24/7 Security', desc: 'Perimeter protection that fades into the landscape' },
]

const elevation = {
  title: 'The Grove Villa',
  size: 'Plots ranging from 400 to 600 Sq. Yds',
  img: '/images/hg/hg-elevation-front.jpg',
  desc: 'A villa that opens itself to the landscape — terracotta-toned walls, floor-to-ceiling glass, and a pergola terrace that blurs the line between inside and out. Stepping stones lead through a manicured garden to a home designed for those who want to live close to nature without giving up refinement.',
  features: ['Terracotta & concrete facade', 'Floor-to-ceiling glazing', 'Covered pergola terrace', 'Private garden with water feature', 'Integrated landscape planting'],
}

const designPillars = [
  { label: 'LAND-FIRST PLANNING', body: 'Every plot was positioned after the trees were mapped. Roads follow contours. Nothing was bulldozed that didn\'t need to be.' },
  { label: 'PRIVATE STREETS', body: 'Internal roads are shaded by trees on both sides. No plot faces another directly. Designed so you feel alone even in community.' },
  { label: 'BIOPHILIC MATERIALS', body: 'Stone, terracotta, wood, glass. Nothing synthetic on the facade. The homes age with the land, not against it.' },
  { label: 'WATER MANAGEMENT', body: 'Rainwater harvesting, percolation pits, and a natural swale system. The community returns what it takes from the ground.' },
  { label: 'DARK SKY LIGHTING', body: 'All common area lighting is pointed downward, amber-toned, and motion-triggered. The stars remain visible from every plot.' },
]

function ParallaxHero({ src, alt, height = '100vh', children }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      <motion.img src={src} alt={alt} style={{ top: '-15%', y }}
        className="absolute inset-x-0 w-full h-[130%] object-cover object-center" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.25) 40%, rgba(8,8,8,0.7) 100%)' }} />
      {children}
    </div>
  )
}

function Section({ children, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function HummingGrovePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [brochureModal, setBrochureModal] = useState({ open: false, file: '', label: '' })
  const openBrochure = () => setBrochureModal({ open: true, file: '/hg-brochure.pdf', label: 'Humming Grove' })
  const closeBrochure = () => setBrochureModal(m => ({ ...m, open: false }))

  return (
    <div className="bg-void min-h-screen">

      {/* ── Back nav ── */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-16 py-5 md:py-7"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.9), transparent)' }}>
        <Link to="/" className="flex items-center gap-3 group">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 1L3 7L9 13" stroke="rgba(200,192,176,0.6)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <img src="/logo.png" alt="The Earth Project" className="h-7 w-auto opacity-50 group-hover:opacity-80 transition-opacity duration-500"
            style={{ filter: 'invert(1) brightness(2)' }} />
        </Link>
        <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra">CHAPTER II</p>
      </div>

      {/* ── HERO ── */}
      <ParallaxHero src="/images/hg/hg-102.jpg" alt="The Humming Grove">
        <div className="absolute inset-0 flex flex-col items-start justify-end px-5 md:px-20 pb-10 md:pb-20">
          <motion.p className="text-whisper text-ivory-dim text-[0.55rem] tracking-ultra mb-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            CHAPTER II — UPCOMING
          </motion.p>
          <motion.h1 className="text-display text-ivory" style={{ fontSize: 'clamp(2.8rem, 10vw, 11rem)', lineHeight: 0.84 }}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}>
            THE<br />HUMMING<br />GROVE
          </motion.h1>
          <motion.p className="font-serif text-ivory-dim text-lg md:text-2xl font-light italic mt-6 max-w-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}>
            Ananthagiri Hills, Hyderabad
          </motion.p>
        </div>
      </ParallaxHero>

      {/* ── STATS BAR ── */}
      <Section className="border-b border-stone">
        <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-10 md:px-14 py-10 flex flex-col gap-2 ${i < 3 ? 'border-b md:border-b-0 md:border-r border-stone' : ''}`}>
              <span className="font-serif text-ivory font-light" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>{s.value}</span>
              <span className="text-whisper text-forest-glow text-[0.5rem] tracking-ultra">{s.unit}</span>
              <span className="font-serif text-stone-grey text-sm font-light">{s.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CHAPTER EMBLEM ── */}
      <div className="flex items-center justify-center py-14 md:py-20 border-b border-stone/20">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: true }}
        >
          <img
            src="/hg.png"
            alt="The Humming Grove — The Earth Project"
            className="w-40 md:w-60 object-contain"
          />
          <p className="text-whisper text-stone-grey/40 text-[0.48rem] tracking-ultra">CHAPTER II — THE HUMMING GROVE</p>
        </motion.div>
      </div>

      {/* ── OVERVIEW ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-14 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
        <Section>
          <p className="text-whisper text-forest-glow text-[0.55rem] tracking-ultra mb-8">THE PROJECT</p>
          <h2 className="text-display text-ivory mb-8" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 0.9 }}>
            A retreat where<br /><em>nature hums</em><br />softly around home
          </h2>
          <div className="w-12 h-[1px] bg-muted-olive mb-8" />
          <p className="font-serif text-stone-grey text-lg font-light leading-relaxed">
            The Humming Grove is 12.46 acres of carefully curated nature-led living set in the Ananthagiri Hills — a region known for its year-round mist, ancient forests, and an extraordinary stillness that you can feel the moment you arrive.
          </p>
        </Section>
        <Section className="flex flex-col gap-6 pt-4 md:pt-16">
          <p className="font-serif text-ivory-dim text-base font-light leading-relaxed">
            Every plot at The Humming Grove has been positioned so that no two homes face each other directly. Internal roads follow the natural contour of the land. Trees were mapped before architecture was drawn.
          </p>
          <p className="font-serif text-stone-grey text-base font-light leading-relaxed">
            The result is a community that feels like a forest with homes in it — not a housing project with trees added afterwards.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-5 h-[1px] bg-muted-olive" />
            <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-ultra">ANANTHAGIRI HILLS — 3,200 FT ELEVATION</p>
          </div>
        </Section>
      </div>

      {/* ── FULL BLEED IMAGE ── */}
      <div className="relative overflow-hidden mx-0 md:mx-2" style={{ height: 'clamp(280px, 50vw, 75vh)' }}>
        <img src="/images/hg/hg-009.jpg" alt="Valley at Ananthagiri Hills"
          className="absolute inset-x-0 w-full h-full object-cover" style={{ top: 0 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.6) 0%, transparent 50%, rgba(8,8,8,0.2) 100%)' }} />
        <div className="absolute bottom-12 left-8 md:left-20 max-w-sm">
          <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-ultra mb-2">THE LAND</p>
          <p className="font-serif text-ivory text-2xl font-light italic leading-snug">
            "Ananthagiri holds one of the last intact forest patches within 60km of Hyderabad."
          </p>
        </div>
      </div>

      {/* ── LOCATION & CONTEXT ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-12 md:py-24">
        <Section className="mb-16">
          <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">LOCATION</p>
          <h2 className="text-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', lineHeight: 0.9 }}>
            Ananthagiri Hills,<br /><em className="text-ivory-dim">Vikarabad District</em>
          </h2>
        </Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { dist: '65 KM', label: 'From Hyderabad city centre', note: 'Via NH 163 — approx 90 minutes' },
            { dist: '28 KM', label: 'From Shamshabad Airport', note: 'Direct route through Vikarabad highway' },
            { dist: '3,200 FT', label: 'Above sea level', note: 'Year-round cooler temperatures, misty mornings' },
          ].map(d => (
            <Section key={d.dist} className="border-l border-stone pl-8">
              <p className="font-serif text-ivory font-light mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{d.dist}</p>
              <p className="font-serif text-ivory-dim text-base font-light mb-1">{d.label}</p>
              <p className="text-whisper text-stone-grey text-[0.5rem] tracking-widest">{d.note}</p>
            </Section>
          ))}
        </div>
      </div>

      {/* ── ARCHITECTURE ELEVATION ── */}
      <div className="border-t border-stone py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <Section className="mb-16">
            <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">ARCHITECTURE</p>
            <h2 className="text-display text-ivory" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 0.88 }}>
              The elevation.<br /><em>One language.</em>
            </h2>
          </Section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: '70vh' }}>
            <img src={elevation.img} alt={elevation.title}
              className="absolute inset-x-0 w-full h-full object-cover object-center" style={{ top: 0 }} />
            <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.15)' }} />
            <div className="absolute bottom-8 left-8">
              <span className="text-whisper text-ivory-dim text-[0.6rem] tracking-ultra">THE ARCH</span>
            </div>
          </div>
          {/* Text */}
          <div className="flex flex-col justify-center px-10 md:px-16 py-16 bg-charcoal gap-8">
            <Section>
              <p className="text-whisper text-forest-glow text-[0.5rem] tracking-ultra mb-4">{elevation.size}</p>
              <h3 className="text-display text-ivory mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 0.9 }}>{elevation.title}</h3>
              <p className="font-serif text-stone-grey text-base font-light leading-relaxed mb-8">{elevation.desc}</p>
              <div className="flex flex-col gap-3">
                {elevation.features.map(f => (
                  <div key={f} className="flex items-center gap-4">
                    <div className="w-4 h-[1px] bg-muted-olive flex-shrink-0" />
                    <p className="font-serif text-ivory-dim text-sm font-light">{f}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>

      {/* ── DESIGN PILLARS ── */}
      <div className="relative overflow-hidden" style={{ height: '60vh' }}>
        <img src="/images/hg/hg-010.jpg" alt="Forest light"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.72)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <Section>
            <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-ultra mb-6">THE PHILOSOPHY</p>
            <p className="text-display text-ivory" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 0.9 }}>
              The land decides.<br /><em>We listen.</em>
            </p>
          </Section>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-20 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 md:gap-x-16 gap-y-8 md:gap-y-12">
          {designPillars.map((p, i) => (
            <Section key={p.label} className="flex flex-col gap-4 border-t border-stone pt-8">
              <div className="flex items-center gap-3">
                <div className="w-4 h-[1px] bg-forest-glow" />
                <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-ultra">{p.label}</p>
              </div>
              <p className="font-serif text-stone-grey text-base font-light leading-relaxed">{p.body}</p>
            </Section>
          ))}
        </div>
      </div>

      {/* ── MASTER PLAN ── */}
      <div className="border-t border-stone">
        <div className="max-w-7xl mx-auto px-5 md:px-20 py-10 md:py-16">
          <Section className="mb-12">
            <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-4">MASTER PLAN</p>
            <h2 className="text-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.9 }}>Community layout</h2>
          </Section>
        </div>
        <div className="relative overflow-hidden mx-0 md:mx-2" style={{ height: 'clamp(260px, 45vw, 65vh)' }}>
          <img src="/images/hg/hg-070.jpg" alt="Aerial view of The Humming Grove"
            className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 40%)' }} />
          <div className="absolute bottom-10 left-8 md:left-20">
            <p className="text-whisper text-ivory-dim text-[0.5rem] tracking-ultra">AERIAL VIEW — ANANTHAGIRI HILLS</p>
          </div>
        </div>
      </div>

      {/* ── AMENITIES ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-12 md:py-24">
        <Section className="mb-16">
          <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">WITHIN THE COMMUNITY</p>
          <h2 className="text-display text-ivory" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: 0.88 }}>
            Amenities<br /><em className="text-ivory-dim">built around living</em>
          </h2>
        </Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {amenities.map((a, i) => (
            <Section key={a.name} className="border-t border-stone py-8 pr-8 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-serif text-stone-grey text-xs font-light w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-serif text-ivory text-lg font-light">{a.name}</p>
              </div>
              <p className="font-serif text-stone-grey text-sm font-light leading-relaxed pl-9">{a.desc}</p>
            </Section>
          ))}
        </div>
      </div>

      {/* ── INTERIORS & LIFE ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mx-2 mb-2">
        <div className="relative overflow-hidden" style={{ height: '65vh' }}>
          <img src="/images/hg/hg-098.jpg" alt="Courtyard interior"
            className="absolute inset-x-0 w-full h-full object-cover object-center" style={{ top: 0 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.65) 0%, transparent 50%)' }} />
          <div className="absolute bottom-8 left-8">
            <p className="text-whisper text-ivory-dim text-[0.5rem] tracking-ultra mb-2">INTERIOR COURTYARD</p>
            <p className="font-serif text-ivory text-xl font-light italic">Where the day slows down.</p>
          </div>
        </div>
        <div className="relative overflow-hidden" style={{ height: '65vh' }}>
          <img src="/images/hg/hg-101.jpg" alt="Garden pool"
            className="absolute inset-x-0 w-full h-full object-cover object-center" style={{ top: 0 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.65) 0%, transparent 50%)' }} />
          <div className="absolute bottom-8 left-8">
            <p className="text-whisper text-ivory-dim text-[0.5rem] tracking-ultra mb-2">PRIVATE GARDEN POOL</p>
            <p className="font-serif text-ivory text-xl font-light italic">Planned around privacy & pause.</p>
          </div>
        </div>
      </div>

      {/* ── FOREST LIFE IMAGE ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mx-2 mb-2">
        {[
          { src: '/images/hg/hg-163.jpg', label: 'MONSOON MORNINGS' },
          { src: '/images/hg/hg-002.jpg', label: 'FILTERED LIGHT' },
          { src: '/images/hg/hg-164.jpg', label: 'FOREST FAUNA' },
        ].map(img => (
          <div key={img.src} className="relative overflow-hidden" style={{ height: '38vh' }}>
            <img src={img.src} alt={img.label}
              className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.75)' }} />
            <div className="absolute bottom-4 left-4">
              <p className="text-whisper text-ivory-dim text-[0.45rem] tracking-ultra">{img.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── ENQUIRE CTA ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-12 md:py-24 border-t border-stone">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <Section>
            <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">BEGIN YOUR CHAPTER</p>
            <h2 className="text-display text-ivory" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 0.88 }}>
              The Humming Grove<br /><em className="text-ivory-dim">is now open.</em>
            </h2>
            <p className="font-serif text-stone-grey text-lg font-light leading-relaxed mt-8 max-w-md">
              Plots are available for discovery. Not for sale — for belonging. Reach out to begin a conversation.
            </p>
          </Section>
          <Section className="flex flex-col gap-6">
            <a href="mailto:contact@earthproject.in"
              className="font-serif text-ivory text-2xl md:text-3xl font-light hover:text-ivory-dim transition-colors duration-500">
              contact@earthproject.in
            </a>
            <a href="https://wa.me/919000102744" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 text-whisper text-ivory/70 hover:text-ivory text-[0.6rem] tracking-ultra transition-colors duration-500 group">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-forest-glow flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WHATSAPP US
            </a>
            <button
              onClick={openBrochure}
              className="flex items-center gap-3 text-whisper text-ivory/70 hover:text-ivory text-[0.6rem] tracking-ultra transition-colors duration-500 group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              DOWNLOAD BROCHURE
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-muted-olive" />
              <p className="text-whisper text-stone-grey text-[0.5rem] tracking-ultra">LIMITED PLOTS REMAINING</p>
            </div>
          </Section>
        </div>
      </div>

      <ChapterFooter current="hg" />

      <BrochureModal
        isOpen={brochureModal.open}
        onClose={closeBrochure}
        brochureFile={brochureModal.file}
        brochureLabel={brochureModal.label}
      />
    </div>
  )
}
