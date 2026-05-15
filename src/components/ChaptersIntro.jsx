import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

function ChapterCard({ num, title, location, status, to, img, side = 'left' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={to}
      className="relative overflow-hidden flex flex-col justify-between group"
      style={{ minHeight: 'clamp(400px, 85vh, 900px)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image — always present, opacity shifts on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        <img
          src={img}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45)' }}
        />
      </motion.div>

      {/* Dark base */}
      <div className="absolute inset-0 bg-void/90"
        style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.7s cubic-bezier(0.76,0,0.24,1)' }}
      />

      {/* Border */}
      <div className="absolute inset-0 border border-stone/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-14">

        {/* Top row */}
        <div className="flex items-start justify-between">
          <span className="text-whisper text-stone-grey/50 text-[0.5rem] tracking-ultra">
            CHAPTER {num === 'I' ? 'ONE' : num === 'II' ? 'TWO' : 'THREE'}
          </span>
          <motion.span
            className="font-serif text-stone-grey/40 text-xs"
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
            transition={{ duration: 0.4 }}
          >
            {status}
          </motion.span>
        </div>

        {/* Big Roman numeral */}
        <motion.p
          className="text-display text-ivory/10 select-none"
          style={{ fontSize: 'clamp(5rem, 18vw, 26rem)', lineHeight: 0.8, letterSpacing: '-0.05em' }}
          animate={{ opacity: hovered ? 0.06 : 0.12 }}
          transition={{ duration: 0.5 }}
        >
          {num}
        </motion.p>

        {/* Bottom: title + meta */}
        <div className="flex flex-col gap-5">
          <motion.div
            animate={{ y: hovered ? -6 : 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <p
              className="font-serif text-ivory font-light"
              style={{ fontSize: 'clamp(1.8rem, 2.8vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
            >
              {title}
            </p>
          </motion.div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1.5">
              <p className="text-whisper text-stone-grey/60 text-[0.5rem] tracking-widest">{location}</p>
            </div>

            {/* Arrow — slides in on hover */}
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 12 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <span className="text-whisper text-ivory/70 text-[0.55rem] tracking-ultra">EXPLORE</span>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path d="M0 5H18M14 1L18 5L14 9" stroke="rgba(245,240,232,0.6)" strokeWidth="0.8"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ChaptersIntro() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section id="chapters" ref={ref} className="relative bg-void">

      {/* Header */}
      <div className="px-5 md:px-12 pt-16 md:pt-24 pb-8 md:pb-10 flex items-center justify-between border-b border-stone/15">
        <motion.p
          className="text-whisper text-stone/50 text-[0.52rem] tracking-ultra"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          THE ECOSYSTEM
        </motion.p>

        <motion.p
          className="font-serif text-ivory/50 text-sm font-light italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Each project is a chapter.
        </motion.p>

        <motion.p
          className="hidden md:block font-serif text-stone-grey/40 text-[0.52rem] tracking-ultra text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          THREE CHAPTERS<br />IN MOTION
        </motion.p>
      </div>

      {/* Chapter cards grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-[3px] px-[3px] pb-[3px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <ChapterCard
          num="I"
          title="Lost in the Woods"
          location="Sakleshpur, Karnataka"
          status="DELIVERED"
          to="/lost-in-the-woods"
          img="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61713cb56c293917b729cb08_Gate-render_litw-logo.jpg"
        />
        <ChapterCard
          num="II"
          title="The Humming Grove"
          location="Ananthagiri Hills, Hyderabad"
          status="UPCOMING"
          to="/humming-grove"
          img="/images/hg/hg-102.jpg"
        />
        <ChapterCard
          num="III"
          title="Soul Springs"
          location="Sadanahalli, Bangalore"
          status="COMING SOON"
          to="/soul-springs"
          img="/images/ss/ss-004.jpg"
          side="right"
        />
      </motion.div>

    </section>
  )
}
