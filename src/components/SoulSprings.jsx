import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function SoulSprings() {
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
    <section id="soul-springs" ref={sectionRef} className="relative bg-void overflow-hidden">

      {/* ── CHAPTER MARKER ── */}
      <div className="flex items-center justify-center pt-10 md:pt-32 pb-10 md:pb-16 px-8">
        <motion.div className="flex items-center gap-6"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1 }}>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-muted-olive opacity-50" />
          <p className="text-whisper text-muted-olive text-[0.55rem] tracking-ultra">CHAPTER THREE</p>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-muted-olive opacity-50" />
        </motion.div>
      </div>

      {/* ── TITLE ── */}
      <div className="px-8 md:px-16 pb-8 md:pb-12 max-w-7xl mx-auto">
        <motion.h2 className="text-display text-ivory"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)', lineHeight: 0.84 }}
          initial={{ opacity: 0, y: 80 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 80 }}
          transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}>
          SOUL<br />SPRINGS
        </motion.h2>
        <motion.p className="font-serif text-stone-grey text-xl italic mt-5 font-light"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 0.6 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.5 }}>
          Where nature leads and spirits sing
        </motion.p>
      </div>

      {/* ── HERO: dark clovers / cover image ── */}
      <HeroImage
        src="/images/ss/ss-004.jpg"
        alt="Dark clovers with dewdrops — Soul Springs"
        height={isMobile ? '50vh' : '90vh'}
        overlay="linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.05) 40%, rgba(8,8,8,0.75) 100%)"
        inView={inView}
      >
        <div className="absolute bottom-8 md:bottom-12 left-6 md:left-16 max-w-[85vw] md:max-w-lg">
          <p className="text-whisper text-ivory-dim tracking-widest mb-3 text-[0.55rem]">SADANAHALLI — 57 ACRES</p>
          <p className="font-serif text-ivory text-lg md:text-3xl font-light italic leading-snug">
            "A quiet world shaped by an ancient living spring."
          </p>
        </div>
      </HeroImage>

      {/* ── TWO-UP: valley river + intro copy ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-2">
        {/* Copy column — always visible */}
        <div className="flex flex-col justify-center px-6 md:px-16 py-10 md:py-16 bg-void gap-6 md:gap-10 order-2 md:order-1">
          <motion.p className="text-whisper text-muted-olive tracking-ultra text-[0.55rem]"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            A RARE SPIRITUAL GEOGRAPHY
          </motion.p>
          <motion.p className="font-serif text-ivory text-2xl md:text-3xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ delay: 0.4, duration: 1 }}>
            369 plots across 57 acres around an ancient living spring in Sadanahalli. 40+ amenities, adjacent to Isha Foundation, 45 min from Bengaluru.
          </motion.p>
          {/* Long copy — desktop only */}
          <motion.p className="hidden md:block font-serif text-stone-grey text-base font-light leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 0.7 : 0 }} transition={{ delay: 0.6, duration: 1 }}>
            Located at Sadanahalli, Soul Springs sits between the existing Isha Foundation and proposed ISKCON Foundation — part of a broader global spiritual continuum that resonates with consciousness and inner balance.
          </motion.p>
          <SSStatRow inView={inView} />
          {/* Mobile CTA */}
          <motion.div className="md:hidden pt-2"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1, delay: 0.9 }}>
            <Link to="/soul-springs"
              className="text-whisper text-ivory/60 text-[0.55rem] tracking-ultra border-b border-ivory/20 pb-1">
              EXPLORE CHAPTER THREE →
            </Link>
          </motion.div>
        </div>
        {/* Image — desktop only */}
        <div className="hidden md:block order-1 md:order-2">
          <ParallaxImage src="/images/ss/ss-020.jpg" alt="Lotus on still water" height="70vh" inView={inView} delay={0} />
        </div>
      </div>

      {/* ── FULL BLEED: water ripple reflection — desktop only ── */}
      <div className="hidden md:block">
        <FullBleedImage src="/images/ss/ss-006.jpg" alt="Golden river at sunset" height="85vh" inView={inView} delay={0.1}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10">
            <motion.p className="text-whisper text-ivory-dim tracking-ultra text-[0.55rem] mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.5, duration: 1 }}>
              THE LAND IS THE FIRST ARCHITECT
            </motion.p>
            <motion.h3 className="text-display text-ivory max-w-2xl"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 0.9 }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
              transition={{ delay: 0.6, duration: 1.2 }}>
              Here, the land is<br />the first architect
            </motion.h3>
            <motion.p className="font-serif text-ivory-dim text-lg italic mt-6 max-w-md font-light"
              initial={{ opacity: 0 }} animate={{ opacity: inView ? 0.7 : 0 }} transition={{ delay: 0.9, duration: 1 }}>
              Ripples whisper soft and deep.<br />Inviting the restless mind to sleep.
            </motion.p>
          </div>
        </FullBleedImage>
      </div>

      {/* ── THREE-COLUMN NATURE GRID — desktop only ── */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
          <ParallaxImage src="/images/ss/ss-009.jpg" alt="Butterfly in forest light rays" height="65vh" inView={inView} delay={0}>
            <div className="absolute bottom-6 left-6">
              <p className="text-whisper text-ivory-dim text-[0.5rem] tracking-widest">SPIRITUALITY</p>
            </div>
          </ParallaxImage>
          <ParallaxImage src="/images/ss/ss-002.jpg" alt="Mossy stone steps with purple flowers" height="65vh" inView={inView} delay={0.12}>
            <div className="absolute bottom-6 left-6">
              <p className="text-whisper text-ivory-dim text-[0.5rem] tracking-widest">ANCIENT SPRING</p>
            </div>
          </ParallaxImage>
          <ParallaxImage src="/images/ss/ss-013.jpg" alt="Leaf with dewdrops" height="65vh" inView={inView} delay={0.22}>
            <div className="absolute bottom-6 left-6">
              <p className="text-whisper text-ivory-dim text-[0.5rem] tracking-widest">NATURE-LED LIVING</p>
            </div>
          </ParallaxImage>
        </div>
      </div>

      {/* ── PHILOSOPHY TEXT BLOCK — desktop only ── */}
      <div className="hidden md:block">
        <div className="px-8 md:px-16 py-28 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <motion.div className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
              transition={{ duration: 1.2 }}>
              <p className="text-whisper text-stone-grey tracking-ultra text-[0.55rem]">MOVEMENT PHILOSOPHY</p>
              <h3 className="text-display text-ivory" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.9 }}>
                Roads that trace<br /><em className="text-ivory-dim">the land like<br />water tracing rock</em>
              </h3>
              <p className="font-serif text-stone-grey text-base font-light leading-relaxed">
                Movement through the site becomes experiential rather than transitional. Pedestrian paths unfold gradually, revealing shifting vistas — sometimes expansive, sometimes intimate — mirroring the emotional rhythm of terrain itself.
              </p>
              <p className="font-serif text-ivory-dim text-sm italic font-light">Return within, where life begins.</p>
            </motion.div>
            <div className="flex flex-col gap-0 border-l border-stone">
              {[
                { label: 'CURVILINEAR ROADS', desc: 'Roads trace the land like water tracing rock.' },
                { label: 'BALANCED ENVIRONMENT', desc: 'Architecture emerges in response to the land, not the reverse.' },
                { label: 'UNFOLDING VIEWS', desc: 'Pedestrian paths reveal shifting vistas, sometimes expansive, sometimes intimate.' },
                { label: 'MINDFUL PACE', desc: 'Mirroring the emotional rhythm of terrain itself.' },
              ].map((p, i) => (
                <motion.div key={p.label} className="px-8 py-7 border-b border-stone last:border-b-0"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 20 }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12 }}>
                  <p className="text-whisper text-ivory-dim text-[0.58rem] tracking-widest mb-2">{p.label}</p>
                  <p className="font-serif text-stone-grey text-sm font-light">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SPLIT: stream life + closing image — desktop only ── */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <div className="md:col-span-3">
            <ParallaxImage src="/images/ss/ss-037.jpg" alt="Children at stream in nature" height="65vh" inView={inView} delay={0}>
              <div className="absolute bottom-8 left-8 right-8"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.75) 0%, transparent 100%)', padding: '3rem 2rem 2rem' }}>
                <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-widest mb-2">THE SOUL SPRINGS EXPERIENCE</p>
                <p className="font-serif text-ivory text-xl font-light italic">
                  A haven in harmony, when life breathes with nature.
                </p>
              </div>
            </ParallaxImage>
          </div>
          <div className="md:col-span-2 bg-void flex flex-col justify-center px-10 py-16 gap-10">
            <motion.div className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.2 }}>
              <p className="text-whisper text-stone-grey tracking-ultra text-[0.55rem]">BIODIVERSITY AS LIVING NARRATIVE</p>
              <p className="font-serif text-ivory text-xl font-light leading-relaxed">
                Native landscapes, layered habitats, ecological corridors, and seasonal transformations are not embellishments — they are the narrative itself.
              </p>
              <p className="font-serif text-stone-grey text-sm font-light leading-relaxed italic">
                Water guides the story of Soul Springs. It begins as movement — flowing along contours, shaping paths, nourishing biodiversity.
              </p>
            </motion.div>
            <motion.div className="flex flex-col gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.5, duration: 1 }}>
              {['INTROSPECTION', 'SPIRITUALITY', 'COMMUNITY'].map((w) => (
                <div key={w} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-muted-olive opacity-60 flex-shrink-0" />
                  <p className="text-whisper text-ivory-dim tracking-widest text-[0.6rem]">{w}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── CLOSING FULL BLEED ── */}
      <FullBleedImage src="/images/ss/ss-002.jpg" alt="Mossy stone steps with wildflowers" height={isMobile ? '50vh' : '65vh'} inView={inView} delay={0.1}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10"
          style={{ background: 'rgba(8,8,8,0.55)' }}>
          <motion.blockquote className="text-display text-ivory max-w-2xl"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 0.9 }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 1.2, delay: 0.3 }}>
            Live slow,<br /><em className="text-ivory-dim">let inner calm grow.</em>
          </motion.blockquote>
          <motion.p className="font-serif text-stone-grey italic text-base mt-6 font-light"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 0.6 : 0 }} transition={{ delay: 0.7, duration: 1 }}>
            From waters old, new stories unfold.
          </motion.p>
          <motion.div className="mt-8"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1, delay: 0.9 }}>
            <Link to="/soul-springs"
              className="text-whisper text-ivory/60 hover:text-ivory text-[0.55rem] tracking-ultra transition-colors duration-500 border-b border-ivory/20 hover:border-ivory pb-1">
              EXPLORE CHAPTER THREE →
            </Link>
          </motion.div>
        </div>
      </FullBleedImage>

    </section>
  )
}

/* ── Shared primitives ── */

function HeroImage({ src, alt, height, overlay, children, inView }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <motion.div ref={ref} className="relative overflow-hidden" style={{ height }}
      initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1.4 }}>
      <motion.img src={src} alt={alt} loading="lazy" decoding="async" style={{ y, top: '-8%' }}
        className="absolute inset-x-0 w-full h-[116%] object-cover object-center" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: overlay }} />
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
      <motion.img src={src} alt={alt} loading="lazy" decoding="async" style={{ y, top: '-10%' }}
        className="absolute inset-x-0 w-full h-[120%] object-cover object-center" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.25) 0%, transparent 25%, transparent 75%, rgba(8,8,8,0.25) 100%)' }} />
      {children}
    </motion.div>
  )
}

function FullBleedImage({ src, alt, height, inView, delay = 0, children }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  return (
    <motion.div ref={ref} className="relative overflow-hidden mt-2" style={{ height }}
      initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1.5, delay }}>
      <motion.img src={src} alt={alt} loading="lazy" decoding="async" style={{ y, top: '-12%' }}
        className="absolute inset-x-0 w-full h-[124%] object-cover object-center" />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.2) 30%, rgba(8,8,8,0.2) 70%, rgba(8,8,8,0.65) 100%)'
      }} />
      {children}
    </motion.div>
  )
}

function SSStatRow({ inView }) {
  const items = [
    { v: '57', l: 'ACRES' },
    { v: '369', l: 'PLOTS' },
    { v: '40+', l: 'AMENITIES' },
  ]
  return (
    <div className="flex items-center gap-8 pt-6 border-t border-stone flex-wrap">
      {items.map((s, i) => (
        <motion.div key={s.l} className="flex flex-col gap-1"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
          transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}>
          <span className="font-serif text-ivory font-light text-2xl">{s.v}</span>
          <span className="text-whisper text-stone-grey text-[0.5rem] tracking-widest">{s.l}</span>
        </motion.div>
      ))}
    </div>
  )
}
