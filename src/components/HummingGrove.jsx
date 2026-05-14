import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const sensoryWords = ['BIRDS', 'TREES', 'WIND', 'PRIVACY', 'STILLNESS', 'LIGHT']

export default function HummingGrove() {
  const sectionRef = useRef()
  const inView = useInView(sectionRef, { once: true, margin: '-5%' })

  return (
    <section id="humming-grove" ref={sectionRef} className="relative bg-void overflow-hidden">

      {/* ── CHAPTER MARKER ── */}
      <div className="flex items-center justify-center pt-32 pb-16 px-8">
        <motion.div className="flex items-center gap-6"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1 }}>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-forest-glow opacity-50" />
          <p className="text-whisper text-forest-glow text-[0.55rem] tracking-ultra">CHAPTER TWO</p>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-forest-glow opacity-50" />
        </motion.div>
      </div>

      {/* ── TITLE ── */}
      <div className="px-8 md:px-16 pb-12 max-w-7xl mx-auto">
        <motion.h2 className="text-display text-ivory"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)', lineHeight: 0.84 }}
          initial={{ opacity: 0, y: 80 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 80 }}
          transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}>
          THE<br />HUMMING<br />GROVE
        </motion.h2>
        <motion.p className="font-serif text-stone-grey text-xl italic mt-5 font-light"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 0.6 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.5 }}>
          A retreat where nature hums softly around home
        </motion.p>
      </div>

      {/* ── HERO IMAGE — glass facade forest ── */}
      <HeroImage src="/images/hg/hg-000.jpg" alt="Glass facade opening to forest" inView={inView}
        overlay="linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0) 40%, rgba(8,8,8,0.8) 100%)"
        height="90vh">
        <div className="absolute bottom-12 left-8 md:left-16 max-w-sm">
          <p className="text-whisper text-ivory-dim tracking-widest mb-3 text-[0.55rem]">AN EXCLUSIVE NATURE-LED RETREAT</p>
          <p className="font-serif text-ivory text-2xl font-light italic leading-snug">
            "Where every home feels private, every street feels shaded, and every movement feels like a pause."
          </p>
        </div>
      </HeroImage>

      {/* ── TWO-COLUMN: valley landscape + intro copy ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-2">
        <ParallaxImage src="/images/hg/hg-009.jpg" alt="Misty green valley" height="70vh" delay={0} inView={inView} />
        <div className="flex flex-col justify-center px-10 md:px-16 py-16 bg-void gap-10">
          <motion.p className="text-whisper text-forest-glow tracking-ultra text-[0.55rem]"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            ANANTHAGIRI HILLS — HYDERABAD
          </motion.p>
          <motion.p className="font-serif text-ivory text-2xl md:text-3xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ delay: 0.4, duration: 1 }}>
            Designed around quiet movement, shaded greens, and intimate outdoor living.
          </motion.p>
          <motion.p className="font-serif text-stone-grey text-base font-light leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 0.7 : 0 }} transition={{ delay: 0.6, duration: 1 }}>
            The community brings together the comfort of private plots with the calmness of a nature sanctuary. 12.46 acres where the land is the main organizing layer — not an afterthought.
          </motion.p>
          <StatRow items={[{ v: '12.46', l: 'ACRES' }, { v: '600 & 400', l: 'SQ YARDS' }, { v: '100%', l: 'NATURE-LED' }]} inView={inView} />
        </div>
      </div>

      {/* ── SENSORY RAIL ── */}
      <SensoryRail words={sensoryWords} inView={inView} />

      {/* ── FULL BLEED: filtered forest light ── */}
      <FullBleedImage src="/images/hg/hg-010.jpg" alt="Forest light rays" height="80vh" inView={inView}>
        <CenteredQuote
          eyebrow="THE LIVING LANDSCAPE"
          title="Living Landscape"
          body="Birds. Trees. Wind. Privacy & Connection. Human Life. Sensory Experience."
          inView={inView}
        />
      </FullBleedImage>

      {/* ── ARCHITECTURE TRIO ── */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="md:col-span-2">
          <ParallaxImage src="/images/hg/hg-105.jpg" alt="Arched villa at dusk" height="75vh" inView={inView} delay={0}>
            <div className="absolute bottom-8 left-8">
              <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-widest mb-1">600 SQYDS — ELEVATION I</p>
              <p className="font-serif text-ivory text-xl font-light italic">Arched. Grounded. Open to sky.</p>
            </div>
          </ParallaxImage>
        </div>
        <div className="flex flex-col gap-2">
          <ParallaxImage src="/images/hg/hg-106.jpg" alt="Modern villa at dusk" height="36.5vh" inView={inView} delay={0.1}>
            <div className="absolute bottom-5 left-6">
              <p className="text-whisper text-ivory-dim text-[0.5rem] tracking-widest">600 SQYDS — ELEVATION II</p>
            </div>
          </ParallaxImage>
          <ParallaxImage src="/images/hg/hg-111.jpg" alt="Modern villa daytime" height="36.5vh" inView={inView} delay={0.2}>
            <div className="absolute bottom-5 left-6">
              <p className="text-whisper text-ivory-dim text-[0.5rem] tracking-widest">400 SQYDS — ELEVATION I</p>
            </div>
          </ParallaxImage>
        </div>
      </div>

      {/* ── ARCHITECTURE MANIFESTO TEXT ── */}
      <div className="px-8 md:px-16 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -40 }}
            transition={{ duration: 1.2, delay: 0.2 }}>
            <p className="text-whisper text-stone-grey tracking-ultra text-[0.55rem]">WHERE THE DAY SLOWS DOWN</p>
            <h3 className="text-display text-ivory" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.9 }}>
              Planned around<br /><em className="text-ivory-dim">Privacy.<br />Pause.<br />Nature.</em>
            </h3>
            <p className="font-serif text-stone-grey text-base font-light leading-relaxed">
              Morning begins with filtered light. Evenings settle under trees. Every path leads you closer to stillness. The villa is imagined as an inward-looking retreat — open to sky, light, and landscape, yet protected from outside disturbance.
            </p>
          </motion.div>
          <div className="flex flex-col gap-6">
            {[
              { t: 'CALM LIVING', b: 'A place shaped by rhythm. Where every home feels private and every movement feels like a pause.' },
              { t: 'OPEN LANDSCAPES', b: 'Designed around quiet movement, shaded greens, and intimate outdoor living.' },
              { t: 'TIMELESS OWNERSHIP', b: 'Not merely property — a personal sanctuary woven with the living landscape.' },
            ].map((p, i) => (
              <motion.div key={p.t} className="flex flex-col gap-3 border-l border-stone pl-6"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.15 }}>
                <p className="text-whisper text-ivory-dim text-[0.6rem] tracking-widest">{p.t}</p>
                <p className="font-serif text-stone-grey text-sm font-light leading-relaxed">{p.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INTERIOR + GARDEN ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        <ParallaxImage src="/images/hg/hg-098.jpg" alt="Courtyard interior with chair" height="65vh" inView={inView} delay={0}>
          <div className="absolute inset-0 flex items-end p-8"
            style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)' }}>
            <p className="font-serif text-ivory text-xl font-light italic">Where the day slows down.</p>
          </div>
        </ParallaxImage>
        <ParallaxImage src="/images/hg/hg-101.jpg" alt="Tropical round pool garden" height="65vh" inView={inView} delay={0.1}>
          <div className="absolute inset-0 flex items-end p-8"
            style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)' }}>
            <p className="font-serif text-ivory text-xl font-light italic">Planned around privacy & pause.</p>
          </div>
        </ParallaxImage>
      </div>

      {/* ── AERIAL + RAIN WINDOW ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="md:col-span-3">
          <ParallaxImage src="/images/hg/hg-070.jpg" alt="Sunset aerial of community" height="60vh" inView={inView} delay={0}>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-widest mb-2">MASTER PLAN — AERIAL VIEW</p>
              <p className="font-serif text-ivory text-lg font-light italic">A place woven with nature.</p>
            </div>
          </ParallaxImage>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <ParallaxImage src="/images/hg/hg-163.jpg" alt="Raining forest window view" height="29vh" inView={inView} delay={0.1} />
          <ParallaxImage src="/images/hg/hg-164.jpg" alt="Bird silhouette in forest" height="29vh" inView={inView} delay={0.2}>
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(8,8,8,0.2)' }}>
              <p className="font-serif text-ivory text-2xl italic font-light text-center px-6">
                "Where every plot breathes with nature."
              </p>
            </div>
          </ParallaxImage>
        </div>
      </div>

      {/* ── FULL BLEED: forest mist closing ── */}
      <FullBleedImage src="/images/hg/hg-002.jpg" alt="Forest with light rays" height="70vh" inView={inView} delay={0.1}>
        <CenteredQuote
          eyebrow="THE HUMMING GROVE"
          title=""
          body=""
          closing="Amplify. Belong."
          inView={inView}
        />
      </FullBleedImage>

    </section>
  )
}

/* ── Shared sub-components ── */

function HeroImage({ src, alt, height, overlay, children, inView }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <motion.div ref={ref} className="relative overflow-hidden"
      style={{ height }}
      initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1.4 }}>
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
    <motion.div ref={ref} className="relative overflow-hidden"
      style={{ height }}
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{ duration: 1.2, delay }}>
      <motion.img src={src} alt={alt} loading="lazy" decoding="async" style={{ y, top: '-10%' }}
        className="absolute inset-x-0 w-full h-[120%] object-cover object-center" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.3) 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.3) 100%)' }} />
      {children}
    </motion.div>
  )
}

function FullBleedImage({ src, alt, height, inView, delay = 0, children }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <motion.div ref={ref} className="relative overflow-hidden"
      style={{ height }}
      initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1.5, delay }}>
      <motion.img src={src} alt={alt} loading="lazy" decoding="async" style={{ y, top: '-12%' }}
        className="absolute inset-x-0 w-full h-[124%] object-cover object-center" />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.2) 30%, rgba(8,8,8,0.2) 70%, rgba(8,8,8,0.6) 100%)'
      }} />
      {children}
    </motion.div>
  )
}

function CenteredQuote({ eyebrow, title, body, closing, inView }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10">
      {eyebrow && <p className="text-whisper text-ivory-dim tracking-ultra text-[0.55rem] mb-6">{eyebrow}</p>}
      {title && <h3 className="text-display text-ivory mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>{title}</h3>}
      {body && <p className="font-serif text-ivory-dim text-lg font-light italic max-w-xl">{body}</p>}
      {closing && <p className="font-serif text-ivory text-3xl md:text-5xl font-light italic mt-2">{closing}</p>}
    </div>
  )
}

function SensoryRail({ words, inView }) {
  return (
    <motion.div className="flex items-center border-t border-b border-stone py-5 my-2 overflow-x-auto mx-8 md:mx-16"
      initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1, delay: 0.3 }}>
      {words.map((word, i) => (
        <div key={word} className="flex items-center flex-shrink-0">
          <span className="text-whisper text-stone-grey px-6 md:px-10 text-[0.6rem] hover:text-ivory transition-colors duration-500 cursor-default">{word}</span>
          {i < words.length - 1 && <div className="w-[1px] h-4 bg-stone flex-shrink-0" />}
        </div>
      ))}
    </motion.div>
  )
}

function StatRow({ items, inView }) {
  return (
    <div className="flex items-center gap-10 pt-6 border-t border-stone">
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
