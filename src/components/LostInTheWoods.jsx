import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const sensoryWords = ['FOREST', 'MIST', 'ELEVATION', 'SILENCE', 'WILDERNESS', 'BIOSPHERE']

export default function LostInTheWoods() {
  const sectionRef = useRef()
  const inView = useInView(sectionRef, { once: true, margin: '-5%' })

  return (
    <section id="lost-in-the-woods" ref={sectionRef} className="relative bg-void overflow-hidden">

      {/* ── CHAPTER MARKER ── */}
      <div className="flex items-center justify-center pt-32 pb-16 px-8">
        <motion.div className="flex items-center gap-6"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1 }}>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-forest-glow opacity-50" />
          <p className="text-whisper text-forest-glow text-[0.55rem] tracking-ultra">CHAPTER ONE</p>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-forest-glow opacity-50" />
        </motion.div>
      </div>

      {/* ── TITLE ── */}
      <div className="px-8 md:px-16 pb-12 max-w-7xl mx-auto">
        <motion.h2 className="text-display text-ivory"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)', lineHeight: 0.84 }}
          initial={{ opacity: 0, y: 80 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 80 }}
          transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}>
          LOST IN<br />THE WOODS
        </motion.h2>
        <motion.p className="font-serif text-stone-grey text-xl italic mt-5 font-light"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 0.6 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.5 }}>
          Where life and land remain untouched
        </motion.p>
      </div>

      {/* ── HERO IMAGE ── */}
      <HeroImage
        src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61713cb56c293917b729cb08_Gate-render_litw-logo.jpg"
        alt="Lost in the Woods gate"
        inView={inView}
        overlay="linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0) 40%, rgba(8,8,8,0.8) 100%)"
        height="90vh">
        <div className="absolute bottom-12 left-8 md:left-16 max-w-sm">
          <p className="text-whisper text-ivory-dim tracking-widest mb-3 text-[0.55rem]">SAKLESHPUR — NILGIRI BIOSPHERE RESERVE</p>
          <p className="font-serif text-ivory text-2xl font-light italic leading-snug">
            "36.68 acres of Western Ghats forest. Entered carefully. Never cleared."
          </p>
        </div>
      </HeroImage>

      {/* ── TWO-COLUMN: clubhouse + intro copy ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-2">
        <ParallaxImage
          src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/6172619e13b09800ca2c1350_Clubhouse_with-signage.jpg"
          alt="The Watering Hole clubhouse"
          height="70vh"
          delay={0}
          inView={inView}
        />
        <div className="flex flex-col justify-center px-10 md:px-16 py-16 bg-void gap-10">
          <motion.p className="text-whisper text-forest-glow tracking-ultra text-[0.55rem]"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            SAKLESHPUR — KARNATAKA
          </motion.p>
          <motion.p className="font-serif text-ivory text-2xl md:text-3xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ delay: 0.4, duration: 1 }}>
            Fuel-free. Forest-first. Built with the minimum necessary to make it liveable.
          </motion.p>
          <motion.p className="font-serif text-stone-grey text-base font-light leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 0.7 : 0 }} transition={{ delay: 0.6, duration: 1 }}>
            Every plot was positioned around what already existed — the trees, the trails, the birdsong, the silence. Prefabricated steel chalets that arrive complete and sit gently on the earth.
          </motion.p>
          <StatRow items={[{ v: '36.68', l: 'ACRES' }, { v: '1030–1170', l: 'METRES' }, { v: '30+', l: 'TREE SPECIES' }]} inView={inView} />
        </div>
      </div>

      {/* ── SENSORY RAIL ── */}
      <SensoryRail words={sensoryWords} inView={inView} />

      {/* ── FULL BLEED: clubhouse interior ── */}
      <FullBleedImage
        src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61726241e239c92636c8c511_clubhouse-01-p-1600.jpeg"
        alt="Clubhouse interior"
        height="80vh"
        inView={inView}>
        <CenteredQuote
          eyebrow="THE WATERING HOLE"
          body="A clubhouse that belongs to the forest. Built from the ground up without clearing a single tree."
          inView={inView}
        />
      </FullBleedImage>

      {/* ── IMAGE TRIO ── */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="md:col-span-2">
          <ParallaxImage
            src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61765104b5b59f20914ca8f7_Chalet_03.jpg"
            alt="Chalet 03"
            height="75vh"
            inView={inView}
            delay={0}>
            <div className="absolute bottom-8 left-8">
              <p className="text-whisper text-ivory-dim text-[0.55rem] tracking-widest mb-1">PREFAB STEEL — DELIVERED</p>
              <p className="font-serif text-ivory text-xl font-light italic">No dig. No disruption. Just forest.</p>
            </div>
          </ParallaxImage>
        </div>
        <div className="flex flex-col gap-2">
          <ParallaxImage
            src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/64255cfba0534b49a9381797_LITW-Progress_March00001.webp"
            alt="Site progress"
            height="36.5vh"
            inView={inView}
            delay={0.1}>
            <div className="absolute bottom-5 left-6">
              <p className="text-whisper text-ivory-dim text-[0.5rem] tracking-widest">ON SITE — NOW DELIVERED</p>
            </div>
          </ParallaxImage>
          <ParallaxImage
            src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/617530de1733a6b851dfa241_Fish%20Pond.png"
            alt="Fish pond amenity"
            height="36.5vh"
            inView={inView}
            delay={0.2}>
            <div className="absolute bottom-5 left-6">
              <p className="text-whisper text-ivory-dim text-[0.5rem] tracking-widest">FISH POND — 35+ AMENITIES</p>
            </div>
          </ParallaxImage>
        </div>
      </div>

      {/* ── COPY BLOCK ── */}
      <div className="px-8 md:px-16 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -40 }}
            transition={{ duration: 1.2, delay: 0.2 }}>
            <p className="text-whisper text-stone-grey tracking-ultra text-[0.55rem]">WHERE THE FOREST STAYS QUIET</p>
            <h3 className="text-display text-ivory" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.9 }}>
              Planned around<br /><em className="text-ivory-dim">Forest.<br />Silence.<br />Life.</em>
            </h3>
            <p className="font-serif text-stone-grey text-base font-light leading-relaxed">
              Fuel-powered vehicles are prohibited inside the community. You arrive, and then you walk, cycle, or take an electric buggy. The forest stays quiet. The mist stays low.
            </p>
          </motion.div>
          <div className="flex flex-col gap-6">
            {[
              { t: 'THREE LAND LAYERS', b: 'A tropical foliage buffer, a personal growing zone, and natural forest boundaries — all coexisting as one living system.' },
              { t: '35+ AMENITIES', b: 'The Watering Hole clubhouse, spa, treetop walkways, hiking routes, rock climbing, boating. All of them rooted in nature.' },
              { t: 'WILDLIFE NEIGHBOURS', b: 'Flycatchers, bulbuls, monitor lizards, deer, geckos, and martens. The fauna came with the land and will stay with it.' },
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

      {/* ── CLOSING FULL BLEED ── */}
      <FullBleedImage
        src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61755e81d355d958feea6e5e_LITW%20Artwork.jpg"
        alt="Lost in the Woods"
        height="70vh"
        inView={inView}
        delay={0.1}>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10">
          <motion.p className="text-whisper text-ivory-dim tracking-ultra text-[0.55rem] mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1 }}>
            LOST IN THE WOODS
          </motion.p>
          <motion.p className="font-serif text-ivory text-3xl md:text-5xl font-light italic"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 1.2, delay: 0.2 }}>
            Get lost. Stay found.
          </motion.p>
          <motion.div className="mt-10"
            initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }} transition={{ duration: 1, delay: 0.5 }}>
            <Link to="/lost-in-the-woods"
              className="text-whisper text-ivory/60 hover:text-ivory text-[0.55rem] tracking-ultra transition-colors duration-500 border-b border-ivory/20 hover:border-ivory pb-1">
              EXPLORE CHAPTER ONE →
            </Link>
          </motion.div>
        </div>
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

function CenteredQuote({ eyebrow, body, inView }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-10">
      {eyebrow && <p className="text-whisper text-ivory-dim tracking-ultra text-[0.55rem] mb-6">{eyebrow}</p>}
      {body && <p className="font-serif text-ivory-dim text-lg md:text-2xl font-light italic max-w-2xl">{body}</p>}
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
