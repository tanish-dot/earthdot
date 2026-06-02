import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import ChapterFooter from '../components/ChapterFooter'

const stats = [
  { value: '36.68', unit: 'ACRES', label: 'Total Land' },
  { value: '1030–1170', unit: 'METRES', label: 'Elevation' },
  { value: '35+', unit: 'AMENITIES', label: 'Natural & Built' },
  { value: '30+', unit: 'TREE SPECIES', label: 'On the Land' },
]

const homes = [
  {
    title: '1 BHK Chalet',
    size: 'Compact',
    img: 'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61924430c9027a17022b1eb9_Chalet%20Type%20A%20(1).png',
    desc: 'A single-bedroom prefabricated chalet built from steel — no digging, no disruption. Foyer, living, kitchen, dining, balcony, and a viewing deck that opens to the canopy.',
    features: ['Prefab steel construction', 'Viewing deck', 'Verandah & foyer', 'Minimal footprint'],
  },
  {
    title: '2 BHK Chalet',
    size: 'Mid',
    img: 'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/6192434006154e967a3e776d_Chalet%20Type%20B%20(Option%2001).png',
    desc: 'Two bedroom suites with private balconies, a shared living pavilion, and a kitchen designed around locally sourced produce. Sits lightly on the land.',
    features: ['Two private bedroom suites', 'Shared living pavilion', 'Courtyard option', 'Electric buggy access'],
  },
  {
    title: '3 BHK Chalet',
    size: 'Spacious',
    img: 'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/64255cfd658b1d611af94b32_LITW-Progress_March00003.webp',
    desc: 'Three bedrooms, multiple courtyards, and expansive shared spaces. Designed for families who want room to breathe without the land ever feeling compromised.',
    features: ['Three bedroom-balcony suites', 'Multiple courtyards', 'Utility & powder room', 'Maximum natural light'],
  },
  {
    title: 'Capsule',
    size: 'Minimal',
    img: 'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61a9a85b2be44959319e62cf_Capsule01%20Min.jpeg',
    desc: 'A compact 1 BHK capsule for those who want the least possible between themselves and the forest. Walk-in closet, combined living-kitchen, and a verandah to start every morning.',
    features: ['Combined living-kitchen', 'Walk-in closet', 'Covered verandah', 'Lightest land impact'],
  },
]

const amenities = [
  { category: 'NOURISH', items: ['Restaurant, Bakery & Café', 'Locally sourced produce kitchen', 'Therapeutic herb garden', 'Fish feeding pond'] },
  { category: 'UNWIND', items: ['Spa & meditation spaces', 'Yoga & cardio pavilion', 'Treetop walkways', 'Barefoot trail', 'Overhead bridges', 'Pods & hammocks'] },
  { category: 'VENTURE', items: ['Cycling trails', 'Hiking routes', 'Rock & tree climbing', 'Boating', 'Camping zones', 'Buggy paths'] },
  { category: 'GATHER', items: ['The Watering Hole clubhouse', 'Elevated seating deck', 'Banquet hall', 'Conference rooms', 'Step-down seating', 'Children\'s play areas'] },
]

const landLayers = [
  { label: 'THE BUFFER', body: 'A tropical foliage privacy layer — monstera, colocasia — wraps every plot. Dense enough to feel alone. Light enough to feel free.' },
  { label: 'THE GARDEN', body: 'A personal growing zone between the buffer and your home. Pepper, cardamom, ginger, turmeric. The land feeds the people who live on it.' },
  { label: 'THE FOREST', body: 'Natural tree boundaries using the existing yield of the land — jackfruit, mango, silver oak, areca. Nothing was planted that wasn\'t already trying to grow.' },
  { label: 'THE ELEVATION', body: 'At 1030–1170 metres, the air is cooler, the rain heavier, the mist thicker. Sakleshpur sits inside the Nilgiri Biosphere Reserve. This is not countryside — it is deep forest.' },
  { label: 'THE SILENCE', body: 'Fuel-powered vehicles are prohibited inside the community. You arrive, and then you walk, cycle, or take an electric buggy. The forest stays quiet.' },
  { label: 'THE LIFE', body: 'Flycatchers, bulbuls, laughingthrushes, monitor lizards, deer, geckos, and martens. The fauna came with the land and will stay with it.' },
]

function ParallaxHero({ src, alt, height = '100vh', children }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      <motion.img src={src} alt={alt} style={{ top: '-15%', y }}
        className="absolute inset-x-0 w-full h-[130%] object-cover object-center" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.15) 40%, rgba(8,8,8,0.75) 100%)' }} />
      {children}
    </div>
  )
}

function Section({ children, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

function ParallaxImage({ src, alt, height, inView, delay = 0, children }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  return (
    <motion.div ref={ref} className="relative overflow-hidden" style={{ height }}
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{ duration: 1.2, delay }}>
      <motion.img src={src} alt={alt} style={{ y, top: '-10%' }}
        className="absolute inset-x-0 w-full h-[120%] object-cover object-center" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.3) 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.3) 100%)' }} />
      {children}
    </motion.div>
  )
}

export default function LostInTheWoodsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const sectionRef = useRef()
  const inView = useInView(sectionRef, { once: true, margin: '-5%' })
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = e => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="bg-void min-h-screen">

      {/* ── Back nav ── */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-7"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.9), transparent)' }}>
        <Link to="/" className="flex items-center gap-3 group">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 1L3 7L9 13" stroke="rgba(200,192,176,0.6)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <img src="/logo.png" alt="The Earth Project" className="h-7 w-auto opacity-50 group-hover:opacity-80 transition-opacity duration-500"
            style={{ filter: 'invert(1) brightness(2)' }} />
        </Link>
        <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra">CHAPTER I</p>
      </div>

      {/* ── HERO ── */}
      <ParallaxHero
        src={isMobile
          ? 'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/64255cfba0534b49a9381797_LITW-Progress_March00001.webp'
          : 'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/6173e5524f9dce6f32eef7bd_Under%20The%20Canopy.jpg'
        }
        alt="Lost in the Woods">
        <div className="absolute inset-0 flex flex-col items-start justify-end px-5 md:px-20 pb-10 md:pb-20">
          <motion.p className="text-whisper text-ivory-dim text-[0.55rem] tracking-ultra mb-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            CHAPTER I — DELIVERED
          </motion.p>
          <motion.h1 className="text-display text-ivory" style={{ fontSize: 'clamp(2.8rem, 10vw, 11rem)', lineHeight: 0.84 }}
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}>
            LOST IN<br />THE WOODS
          </motion.h1>
          <motion.p className="font-serif text-ivory-dim text-lg md:text-2xl font-light italic mt-6 max-w-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}>
            Sakleshpur, Western Ghats — 1,000m above the ordinary.
          </motion.p>
        </div>
      </ParallaxHero>

      {/* ── STATS BAR ── */}
      <Section className="border-b border-stone">
        <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto">
          {stats.map((s, i) => (
            <div key={s.label} className={`px-6 md:px-14 py-8 md:py-10 flex flex-col gap-2 ${i < 3 ? 'border-b md:border-b-0 md:border-r border-stone' : ''} ${i % 2 === 0 && i !== 2 ? 'border-r md:border-r-0 border-stone' : ''}`}>
              <span className="font-serif text-ivory font-light" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}>{s.value}</span>
              <span className="text-whisper text-forest-glow text-[0.5rem] tracking-ultra">{s.unit}</span>
              <span className="font-serif text-stone-grey text-xs md:text-sm font-light">{s.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── OVERVIEW ── */}
      <div ref={sectionRef}>
        {/* Full-width image — strong visual first, works great on mobile */}
        <div className="relative overflow-hidden" style={{ height: 'clamp(260px, 65vw, 70vh)' }}>
          <img
            src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/617160e66a256eba20753652_228A4098%201_small.jpg"
            alt="Western Ghats forest"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.75)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.85) 100%)' }} />
          <div className="absolute bottom-6 left-5 md:bottom-10 md:left-14">
            <p className="text-whisper text-ivory/50 text-[0.5rem] tracking-ultra">SAKLESHPUR — NILGIRI BIOSPHERE RESERVE</p>
          </div>
        </div>

        {/* Copy block */}
        <div className="max-w-7xl mx-auto px-5 md:px-20 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
          <Section>
            <p className="font-serif text-ivory text-2xl md:text-3xl font-light leading-relaxed">
              36.68 acres of Western Ghats forest. Not cleared. Carefully entered.
            </p>
          </Section>
          <Section className="flex flex-col gap-5">
            <p className="font-serif text-stone-grey text-base font-light leading-relaxed">
              Every plot was positioned around what already existed — the trees, the trails, the birdsong, the silence. What was built here was the minimum necessary to make it liveable without making it ordinary.
            </p>
            <p className="font-serif text-stone-grey text-base font-light leading-relaxed">
              Fuel-powered vehicles are prohibited inside. You arrive, then you walk, cycle, or take an electric buggy. The forest stays quiet. The mist stays low.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="w-5 h-[1px] bg-forest-glow opacity-50" />
              <p className="text-whisper text-ivory/40 text-[0.52rem] tracking-ultra">ELEVATION 1,030 – 1,170 M</p>
            </div>
          </Section>
        </div>
      </div>

      {/* ── FULL BLEED PHILOSOPHY ── */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 80vw, 85vh)' }}>
        <img
          src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61715debca026fbefe8b70f2_Prestine%20Land_small.jpg"
          alt="Pristine forest land"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.45)' }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ background: 'rgba(8,8,8,0.25)' }}>
          <Section>
            <p className="text-whisper text-ivory/40 text-[0.52rem] tracking-ultra mb-6">THE PHILOSOPHY</p>
            <h2 className="font-serif text-ivory font-light max-w-2xl mx-auto"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              "Change is elemental."
            </h2>
            <p className="font-serif text-ivory/55 text-base md:text-lg font-light italic mt-5 max-w-sm md:max-w-xl mx-auto leading-relaxed">
              Away from concrete jungles, polluted air, and unnatural neighbourhoods — toward the land.
            </p>
          </Section>
        </div>
      </div>

      {/* ── LAND LAYERS ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-14 md:py-28">
        <Section className="mb-16">
          <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-4">THE LAND</p>
          <h2 className="font-serif text-ivory font-light" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            Three layers.<br /><em className="text-ivory/60">One living system.</em>
          </h2>
        </Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-stone/20">
          {landLayers.map((l, i) => (
            <Section key={l.label}>
              <div className="px-8 py-8 border-b border-stone/20">
                <p className="text-whisper text-ivory/40 text-[0.52rem] tracking-ultra mb-3">{l.label}</p>
                <p className="font-serif text-stone-grey text-sm font-light leading-relaxed">{l.body}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>

      {/* ── IMAGE TRIO — desktop only ── */}
      <div className="hidden md:grid grid-cols-3 gap-[3px] mb-[3px]">
        {[
          'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61715726e203877b181cfc17_228A4051%201_Small_01.png',
          'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/617160e66a256eba20753652_228A4098%201_small.jpg',
          'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/6172619e13b098d8c52c1356_plot-division-05.jpg',
        ].map((src, i) => (
          <motion.div key={src} className="relative overflow-hidden" style={{ height: '55vh' }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: i * 0.15 }} viewport={{ once: true }}>
            <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.65)' }} />
          </motion.div>
        ))}
      </div>

      {/* ── HOMES ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-14 md:py-28">
        <Section className="mb-16">
          <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-4">THE HOMES</p>
          <h2 className="font-serif text-ivory font-light" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            Prefab. Biophilic.<br /><em className="text-ivory/60">Built with the land, not on it.</em>
          </h2>
          <p className="font-serif text-stone-grey text-base font-light leading-relaxed mt-6 max-w-xl">
            No digging. No unnecessary construction. Prefabricated steel chalets and capsules that arrive as complete units and sit gently on the earth.
          </p>
        </Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px]">
          {homes.map((h, i) => (
            <Section key={h.title}>
              <div className="relative overflow-hidden group" style={{ height: '60vh' }}>
                <img src={h.img} alt={h.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.55)' }} />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10"
                  style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%)' }}>
                  <p className="text-whisper text-ivory/40 text-[0.5rem] tracking-ultra mb-2">{h.size}</p>
                  <h3 className="font-serif text-ivory font-light text-2xl mb-3">{h.title}</h3>
                  <p className="font-serif text-stone-grey text-sm font-light leading-relaxed mb-4">{h.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    {h.features.map(f => (
                      <span key={f} className="text-whisper text-ivory/40 text-[0.48rem] tracking-widest border border-stone/30 px-3 py-1">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>

      {/* ── AMENITIES ── */}
      <div className="border-t border-stone/20 max-w-7xl mx-auto px-5 md:px-20 py-14 md:py-28">
        <Section className="mb-16">
          <p className="text-whisper text-stone-grey text-[0.55rem] tracking-ultra mb-4">THE WATERING HOLE & BEYOND</p>
          <h2 className="font-serif text-ivory font-light" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            35+ amenities.<br /><em className="text-ivory/60">All of them natural.</em>
          </h2>
        </Section>
        <div className="grid grid-cols-1 md:grid-cols-4 border border-stone/20 divide-y md:divide-y-0 md:divide-x divide-stone/20">
          {amenities.map((a, i) => (
            <Section key={a.category}>
              <div className="p-8 md:p-10 flex flex-col gap-5">
                <p className="text-whisper text-ivory/40 text-[0.5rem] tracking-ultra">{a.category}</p>
                <div className="flex flex-col gap-3">
                  {a.items.map(item => (
                    <p key={item} className="font-serif text-stone-grey text-sm font-light">{item}</p>
                  ))}
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>

      {/* ── CLOSING ── */}
      <div className="relative overflow-hidden" style={{ height: '70vh' }}>
        <img src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61755e81d355d958feea6e5e_LITW%20Artwork.jpg" alt="Lost in the Woods"
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.35)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <Section>
            <p className="text-whisper text-ivory/35 text-[0.52rem] tracking-ultra mb-6">SAKLESHPUR — NILGIRI BIOSPHERE RESERVE</p>
            <h2 className="font-serif text-ivory font-light"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Get lost.<br /><em>Stay found.</em>
            </h2>
            <div className="flex items-center gap-4 mt-10">
              <div className="w-12 h-[1px] bg-ivory/25" />
              <Link to="/contact" className="text-whisper text-ivory/50 hover:text-ivory text-[0.52rem] tracking-ultra transition-colors duration-500">
                BEGIN YOUR CHAPTER
              </Link>
              <div className="w-12 h-[1px] bg-ivory/25" />
            </div>
          </Section>
        </div>
      </div>

      <ChapterFooter current="litw" />

    </div>
  )
}
