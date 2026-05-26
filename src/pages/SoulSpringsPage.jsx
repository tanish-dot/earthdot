import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import ChapterFooter from '../components/ChapterFooter'

const stats = [
  { value: '57', unit: 'ACRES', label: 'Total Land' },
  { value: '40+', unit: 'PLOT SIZES', label: 'Configurations' },
  { value: '1', unit: 'LIVE SPRING', label: 'Ancient Water Source' },
  { value: '100%', unit: 'ORGANIC', label: 'Farming Zones' },
]

const amenities = [
  { name: 'The Spring Pavilion', desc: 'A gathering space built directly over the ancient living spring' },
  { name: 'Natural Swimming Pond', desc: 'Fed by the spring. No chlorine. Just cold, clean, still water.' },
  { name: 'Forest Amphitheatre', desc: 'An open-air stage carved from the hillside for gatherings under stars' },
  { name: 'Permaculture Farm', desc: '3 acres of actively cultivated land shared by all residents' },
  { name: 'Yoga & Movement Pavilion', desc: 'Open-sided structure at the edge of the forest for morning practice' },
  { name: 'Herb Garden', desc: 'A curated medicinal garden tended by a resident herbalist' },
  { name: 'The Reading Grove', desc: 'A shaded outdoor library space under the oldest trees on the property' },
  { name: 'Birdwatching Trail', desc: 'A 2km silent trail through the highest density bird zone of the land' },
  { name: 'Children\'s Earth Play Area', desc: 'Mud, logs, water, and open ground — nature as the playground' },
  { name: 'Communal Fire Circle', desc: 'Evening ritual space for residents to gather, share, and slow down' },
  { name: 'Farm-to-Table Kitchen', desc: 'A shared outdoor kitchen for community cooking from the farm harvest' },
  { name: 'Wellness Centre', desc: 'Ayurvedic treatments, cold plunges, and restorative therapies' },
]

const landFeatures = [
  { label: 'THE SPRING', body: 'An ancient natural spring runs through the heart of the 57-acre property. Water has flowed here for centuries. The entire design of Soul Springs was shaped around protecting and celebrating it.' },
  { label: 'THE TOPOGRAPHY', body: 'The land slopes gently from north to south across 57 acres. This creates natural drainage, varied microclimates, and a landscape that feels discovered — not engineered.' },
  { label: 'THE FOREST EDGE', body: 'The eastern boundary of the property meets a protected forest zone. No construction within 100 metres of this edge. It is kept as a permanent wildlife corridor and buffer.' },
  { label: 'THE SOIL', body: 'Sadanahalli sits on red laterite soil — mineral-rich, fast-draining, ideal for both native trees and organic cultivation. The land has been resting for years before this project began.' },
  { label: 'THE CLIMATE', body: 'At 950m above sea level, Soul Springs receives more rainfall and lower temperatures than Bangalore city. The spring months bring mist. Monsoon brings green so vivid it shocks.' },
  { label: 'THE SILENCE', body: 'There are no highways within 8km. No flight paths overhead. No neighbouring factories. The ambient sound at Soul Springs is insects, water, and wind.' },
]

const plotTypes = [
  {
    title: 'The Forest Plot',
    range: '3,000–5,000 Sq Ft',
    img: '/images/ss/ss-020.jpg',
    desc: 'Plots that back directly onto the forest edge. Maximum privacy, maximum canopy cover. Morning light arrives filtered through trees. Birdsong replaces alarm clocks.',
    notes: ['Direct forest boundary access', 'Highest tree density', 'Optional private forest trail', 'West-facing for sunset views'],
  },
  {
    title: 'The Spring Plot',
    range: '4,000–7,000 Sq Ft',
    img: '/images/ss/ss-037.jpg',
    desc: 'Plots positioned along the natural spring corridor. The sound of moving water is constant. These plots are the most sought-after — a living spring as your garden edge.',
    notes: ['Spring-facing orientation', 'Natural water sounds year-round', 'Rich riparian vegetation', 'Higher humidity microclimate'],
  },
  {
    title: 'The Meadow Plot',
    range: '2,500–4,000 Sq Ft',
    img: '/images/ss/ss-013.jpg',
    desc: 'Open plots on the upper meadow plateau with 270° views across the valley. Less canopy, more sky. These are for those who want to watch weather arrive.',
    notes: ['Panoramic valley views', 'Maximum sunlight exposure', 'Open sky for stargazing', 'Gentle breeze year-round'],
  },
]

function Section({ children, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function SoulSpringsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

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
        <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra">CHAPTER III</p>
      </div>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ height: '100vh' }}>
        <img src="/images/ss/ss-006.jpg" alt="Soul Springs"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.2) 40%, rgba(8,8,8,0.75) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-5 md:px-20 pb-10 md:pb-20">
          <motion.p className="text-whisper text-ivory-dim text-[0.55rem] tracking-ultra mb-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            CHAPTER III — COMING SOON
          </motion.p>
          <motion.h1 className="text-display text-ivory" style={{ fontSize: 'clamp(2.8rem, 10vw, 11rem)', lineHeight: 0.84 }}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}>
            SOUL<br />SPRINGS
          </motion.h1>
          <motion.p className="font-serif text-ivory-dim text-lg md:text-2xl font-light italic mt-6 max-w-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}>
            Sadanahalli, Bangalore
          </motion.p>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <Section className="border-b border-stone">
        <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-10 md:px-14 py-10 flex flex-col gap-2 ${i < 3 ? 'border-b md:border-b-0 md:border-r border-stone' : ''}`}>
              <span className="font-serif text-ivory font-light" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>{s.value}</span>
              <span className="text-whisper text-muted-olive text-[0.5rem] tracking-ultra">{s.unit}</span>
              <span className="font-serif text-stone-grey text-sm font-light">{s.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── OVERVIEW ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-14 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
        <Section>
          <p className="text-whisper text-muted-olive text-[0.55rem] tracking-ultra mb-8">THE PROJECT</p>
          <h2 className="text-display text-ivory mb-8" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 0.9 }}>
            Where a living spring<br /><em>has shaped</em><br />every decision
          </h2>
          <div className="w-12 h-[1px] bg-muted-olive mb-8" />
          <p className="font-serif text-stone-grey text-lg font-light leading-relaxed">
            Soul Springs is 57 acres of ancient land in Sadanahalli — shaped by a natural spring that has been flowing here long before anyone thought to build on this ground. The spring is not an amenity. It is the origin story.
          </p>
        </Section>
        <Section className="flex flex-col gap-6 pt-4 md:pt-16">
          <p className="font-serif text-ivory-dim text-base font-light leading-relaxed">
            Everything at Soul Springs was designed around the water — where it flows, where it pools, where it disappears into the earth and returns again. The master plan follows the spring's path rather than overriding it.
          </p>
          <p className="font-serif text-stone-grey text-base font-light leading-relaxed">
            The result is a community that feels like it has always been here. As if the land simply decided to let people live in it.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-5 h-[1px] bg-muted-olive" />
            <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-ultra">SADANAHALLI — 950M ABOVE SEA LEVEL</p>
          </div>
        </Section>
      </div>

      {/* ── FULL BLEED WATER ── */}
      <div className="relative overflow-hidden mx-0 md:mx-2" style={{ height: 'clamp(280px, 50vw, 72vh)' }}>
        <img src="/images/ss/ss-000.jpg" alt="Natural spring water"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.55) 0%, transparent 55%)' }} />
        <div className="absolute bottom-12 left-8 md:left-20 max-w-sm">
          <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-ultra mb-2">THE SPRING</p>
          <p className="font-serif text-ivory text-2xl font-light italic leading-snug">
            "Water that has been flowing here longer than any living memory."
          </p>
        </div>
      </div>

      {/* ── LAND FEATURES ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-12 md:py-24">
        <Section className="mb-16">
          <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">THE LAND</p>
          <h2 className="text-display text-ivory" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: 0.88 }}>
            57 acres of<br /><em className="text-ivory-dim">living geography</em>
          </h2>
        </Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 md:gap-x-16 gap-y-8 md:gap-y-12">
          {landFeatures.map(f => (
            <Section key={f.label} className="flex flex-col gap-4 border-t border-stone pt-8">
              <div className="flex items-center gap-3">
                <div className="w-4 h-[1px] bg-muted-olive" />
                <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-ultra">{f.label}</p>
              </div>
              <p className="font-serif text-stone-grey text-base font-light leading-relaxed">{f.body}</p>
            </Section>
          ))}
        </div>
      </div>

      {/* ── LOCATION ── */}
      <div className="border-t border-stone">
        <div className="max-w-7xl mx-auto px-5 md:px-20 py-12 md:py-24">
          <Section className="mb-16">
            <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">LOCATION</p>
            <h2 className="text-display text-ivory" style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', lineHeight: 0.9 }}>
              Sadanahalli,<br /><em className="text-ivory-dim">North Bangalore</em>
            </h2>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { dist: '42 KM', label: 'From MG Road, Bangalore', note: 'Via Doddaballapur road — approx 60 minutes' },
              { dist: '28 KM', label: 'From Kempegowda Airport', note: 'Close proximity to the new aerospace corridor' },
              { dist: '950 M', label: 'Above sea level', note: 'Cooler, wetter, and quieter than Bangalore city' },
            ].map(d => (
              <Section key={d.dist} className="border-l border-stone pl-8">
                <p className="font-serif text-ivory font-light mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{d.dist}</p>
                <p className="font-serif text-ivory-dim text-base font-light mb-1">{d.label}</p>
                <p className="text-whisper text-stone-grey text-[0.5rem] tracking-widest">{d.note}</p>
              </Section>
            ))}
          </div>
        </div>
      </div>

      {/* ── PLOT TYPES ── */}
      <div className="border-t border-stone py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <Section className="mb-16">
            <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">PLOT TYPOLOGIES</p>
            <h2 className="text-display text-ivory" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 0.88 }}>
              Three landscapes.<br /><em>One community.</em>
            </h2>
          </Section>
        </div>
        <div className="flex flex-col gap-2">
          {plotTypes.map((pt, i) => (
            <div key={pt.title} className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${i % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
              <div className={`relative overflow-hidden ${i % 2 === 1 ? 'md:col-start-2' : ''}`} style={{ height: '65vh' }}>
                <img src={pt.img} alt={pt.title}
                  className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.12)' }} />
              </div>
              <div className={`flex flex-col justify-center px-10 md:px-16 py-16 bg-charcoal gap-8 ${i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <Section>
                  <p className="text-whisper text-muted-olive text-[0.5rem] tracking-ultra mb-4">{pt.range}</p>
                  <h3 className="text-display text-ivory mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 0.9 }}>{pt.title}</h3>
                  <p className="font-serif text-stone-grey text-base font-light leading-relaxed mb-8">{pt.desc}</p>
                  <div className="flex flex-col gap-3">
                    {pt.notes.map(n => (
                      <div key={n} className="flex items-center gap-4">
                        <div className="w-4 h-[1px] bg-muted-olive flex-shrink-0" />
                        <p className="font-serif text-ivory-dim text-sm font-light">{n}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NATURE GALLERY ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mx-2 mb-2">
        {[
          { src: '/images/ss/ss-009.jpg', label: 'ENDEMIC WILDLIFE' },
          { src: '/images/ss/ss-037.jpg', label: 'THE SPRING CORRIDOR' },
          { src: '/images/ss/ss-002.jpg', label: 'FOREST FLOOR' },
        ].map(img => (
          <div key={img.src} className="relative overflow-hidden" style={{ height: '40vh' }}>
            <img src={img.src} alt={img.label}
              className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.8)' }} />
            <div className="absolute bottom-4 left-4">
              <p className="text-whisper text-ivory-dim text-[0.45rem] tracking-ultra">{img.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── AMENITIES ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-12 md:py-24">
        <Section className="mb-16">
          <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">COMMUNITY AMENITIES</p>
          <h2 className="text-display text-ivory" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: 0.88 }}>
            Life at<br /><em className="text-ivory-dim">Soul Springs</em>
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

      {/* ── CLOSING IMAGE ── */}
      <div className="relative overflow-hidden mx-0 md:mx-2 mb-2" style={{ height: 'clamp(260px, 45vw, 65vh)' }}>
        <img src="/images/ss/ss-002.jpg" alt="Soul Springs valley"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.45)' }} />
        <div className="absolute inset-0 flex items-center justify-center text-center px-8">
          <Section>
            <p className="text-display text-ivory" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 0.9 }}>
              "A quiet world shaped<br /><em>by an ancient living spring."</em>
            </p>
          </Section>
        </div>
      </div>

      {/* ── ENQUIRE CTA ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-12 md:py-24 border-t border-stone">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <Section>
            <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-6">BEGIN YOUR CHAPTER</p>
            <h2 className="text-display text-ivory" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 0.88 }}>
              Soul Springs<br /><em className="text-ivory-dim">is now open.</em>
            </h2>
            <p className="font-serif text-stone-grey text-lg font-light leading-relaxed mt-8 max-w-md">
              The spring has been waiting a long time. It can wait a little longer — but not forever. Begin a conversation.
            </p>
          </Section>
          <Section className="flex flex-col gap-5">
            <a href="mailto:Tepindiaofficial@gmail.com"
              className="font-serif text-ivory text-2xl md:text-3xl font-light hover:text-ivory-dim transition-colors duration-500">
              Tepindiaofficial@gmail.com
            </a>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-muted-olive" />
              <p className="text-whisper text-stone-grey text-[0.5rem] tracking-ultra">LIMITED PLOTS REMAINING</p>
            </div>
          </Section>
        </div>
      </div>

      <ChapterFooter current="ss" />

    </div>
  )
}
