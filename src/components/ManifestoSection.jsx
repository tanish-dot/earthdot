import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

function ParallaxPanel({ src, alt, height = '95vh', children, overlay }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <div ref={ref} className="relative overflow-hidden w-full" style={{ height }}>
      <motion.img
        src={src} alt={alt}
        loading="lazy" decoding="async"
        className="absolute inset-x-0 w-full h-[124%] object-cover"
        style={{ y, top: '-12%' }}
      />
      <div className="absolute inset-0" style={{ background: overlay }} />
      {children}
    </div>
  )
}

function Marquee() {
  const words = [
    'LAND-LED LIVING', 'BIOPHILIC DESIGN', 'SPIRITUAL GEOGRAPHY',
    'ECOLOGICAL STILLNESS', 'EVERY SITE HAS A SOUL', 'EVERY PROJECT IS A CHAPTER',
  ]
  const all = [...words, ...words]
  return (
    <div className="overflow-hidden border-t border-b border-stone/30 py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
      >
        {all.map((w, i) => (
          <span key={i} className="inline-flex items-center gap-5 pr-8">
            <span className="text-whisper text-stone/55 text-[0.58rem] tracking-ultra">{w}</span>
            <span className="text-muted-olive/45 text-[0.5rem]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// Four images read as one story: dark earth → light breaks in → forest ablaze → dusk life
const panels = [
  {
    src: '/images/hg/hg-074.jpg',
    alt: 'Forest floor, dark earth',
    label: '01 — THE EARTH',
    text: 'We do not\nbuild on land.',
    align: 'left',
    overlay: 'linear-gradient(180deg, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.1) 40%, rgba(8,8,8,0.82) 100%)',
  },
  {
    src: '/images/hg/hg-002.jpg',
    alt: 'Light breaking through forest',
    label: '02 — THE LIGHT',
    text: 'We build\nwith it.',
    align: 'right',
    overlay: 'linear-gradient(200deg, rgba(8,8,8,0.45) 0%, rgba(8,8,8,0.05) 50%, rgba(8,8,8,0.78) 100%)',
    italic: true,
  },
  {
    src: '/images/hg/hg-102.jpg',
    alt: 'Golden light through canopy',
    label: '03 — THE SOUL',
    text: 'Every site\nhas a soul.',
    align: 'left',
    overlay: 'linear-gradient(170deg, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.08) 45%, rgba(8,8,8,0.82) 100%)',
    height: '85vh',
  },
  {
    src: 'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/6173e5524f9dce6f32eef7bd_Under%20The%20Canopy.jpg',
    alt: 'Under the forest canopy, Sakleshpur',
    label: '04 — THE CHAPTER',
    text: 'Every project\nis a chapter.',
    align: 'right',
    overlay: 'linear-gradient(200deg, rgba(8,8,8,0.45) 0%, rgba(8,8,8,0.08) 50%, rgba(8,8,8,0.78) 100%)',
    italic: true,
    height: '85vh',
  },
]

export default function ManifestoSection() {
  const pillarsRef = useRef()
  const pillarsInView = useInView(pillarsRef, { once: true, margin: '-10%' })

  return (
    <section id="vision" className="relative bg-void">

      {/* ── 4 full-bleed image panels ── */}
      <div className="flex flex-col gap-[3px]">
        {panels.map((panel, i) => (
          <ParallaxPanel
            key={i}
            src={panel.src}
            alt={panel.alt}
            height={panel.height || '95vh'}
            overlay={panel.overlay}
          >
            {/* Label */}
            <motion.p
              className={`absolute top-8 text-whisper text-ivory/40 text-[0.5rem] tracking-ultra ${panel.align === 'right' ? 'right-8 md:right-14' : 'left-8 md:left-14'}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {panel.label}
            </motion.p>

            {/* Main text */}
            <div className={`absolute bottom-10 md:bottom-14 ${panel.align === 'right' ? 'right-8 md:right-14 text-right' : 'left-8 md:left-14 text-left'}`}>
              <motion.p
                className={`font-serif text-ivory font-light leading-tight whitespace-pre-line ${panel.italic ? 'italic' : ''}`}
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 6.5rem)', letterSpacing: '-0.02em', lineHeight: 0.9 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
                viewport={{ once: true }}
              >
                {panel.text}
              </motion.p>
            </div>
          </ParallaxPanel>
        ))}
      </div>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Closing quote + pillars ── */}
      <div ref={pillarsRef} className="px-8 md:px-16 pt-20 pb-28">
        <motion.p
          className="font-serif text-ivory/70 font-light italic text-center mb-20"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 3rem)', lineHeight: 1.3 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pillarsInView ? 1 : 0, y: pillarsInView ? 0 : 20 }}
          transition={{ duration: 1.2 }}
        >
          "Every chapter is an invitation to live differently."
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-4 border border-stone/20 divide-y md:divide-y-0 md:divide-x divide-stone/20">
          {[
            { n: '01', label: 'LAND-LED LIVING',     sub: 'The land decides. We listen.' },
            { n: '02', label: 'BIOPHILIC DESIGN',     sub: 'Nature as the first architect.' },
            { n: '03', label: 'SPIRITUAL GEOGRAPHY',  sub: 'Places that shift consciousness.' },
            { n: '04', label: 'ECOLOGICAL STILLNESS', sub: 'Luxury through absence of noise.' },
          ].map((p, i) => (
            <motion.div
              key={p.n}
              className="flex flex-col gap-5 p-8 md:p-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: pillarsInView ? 1 : 0, y: pillarsInView ? 0 : 16 }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.1 }}
            >
              <span className="font-serif text-stone/35 text-[0.7rem]">{p.n}</span>
              <p className="text-whisper text-ivory/50 text-[0.52rem] tracking-ultra">{p.label}</p>
              <p className="font-serif text-stone-grey text-sm font-light italic leading-relaxed">{p.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 3-image strip ── */}
      <div className="grid grid-cols-3 gap-[3px] pb-[3px]">
        {[
          { src: '/images/ss/ss-004.jpg' },
          { src: '/images/hg/hg-164.jpg' },
          { src: '/images/ss/ss-006.jpg' },
        ].map((img, i) => (
          <motion.div
            key={img.src}
            className="relative overflow-hidden"
            style={{ height: '50vh' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <img src={img.src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.65)' }} />
          </motion.div>
        ))}
      </div>

    </section>
  )
}
