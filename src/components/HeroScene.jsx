import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function HeroScene({ ready }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = e => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return (
    <section style={{ height: '100svh' }} className="relative">
      <div className="w-full overflow-hidden bg-void" style={{ height: '100svh' }}>

        {/* Preloader cover */}
        <motion.div
          className="absolute inset-0 bg-void z-[60] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: ready ? 0 : 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
        />

        {/* ── Hero background: video over static fallback ── */}
        <div className="absolute inset-0 z-[5]">
          {/* Static image fallback — always visible until video loads */}
          <img
            src="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61715726e203877b181cfc17_228A4051%201_Small_01.png"
            alt="Lost in the Woods aerial"
            className="absolute inset-0 w-full h-full object-cover"
            decoding="async"
          />
          {/* Video — mobile gets portrait crop, desktop gets landscape */}
          <video
            key={isMobile ? 'mobile' : 'desktop'}
            src={isMobile ? '/video-mobile.mp4' : '/video.mp4'}
            poster="https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/61715726e203877b181cfc17_228A4051%201_Small_01.png"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Radial vignette */}
        <div
          className="absolute inset-0 z-[15] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 110% 95% at 50% 50%, transparent 15%, rgba(8,8,8,0.6) 100%)',
          }}
        />

        {/* ── Eyebrow ── */}
        <motion.div
          className="absolute bottom-8 md:bottom-14 left-6 md:left-16 z-[25] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
        >
          <p className="text-whisper text-ivory/45 text-[0.5rem] tracking-ultra mb-3">
            A NATURE-LED LIVING UNIVERSE
          </p>
          <p className="font-serif text-ivory text-lg md:text-2xl font-light italic">
            Where Land Leads,<br />Life Follows.
          </p>
        </motion.div>

        {/* ── Scroll cue ── */}
        <motion.div
          className="absolute bottom-8 right-6 md:right-16 z-[25] flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <span className="text-whisper text-ivory/35 text-[0.48rem] tracking-ultra">SCROLL</span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-ivory/40 to-transparent"
            animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>

      </div>
    </section>
  )
}
