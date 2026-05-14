import { motion } from 'framer-motion'

export default function HeroScene({ ready }) {
  return (
    <section style={{ height: '100vh' }} className="relative">
      <div className="w-full h-screen overflow-hidden bg-void">

        {/* Preloader cover */}
        <motion.div
          className="absolute inset-0 bg-void z-[60] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: ready ? 0 : 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
        />

        {/* ── Video background ── */}
        <div className="absolute inset-0 z-[5]">
          <video
            src="/video.mp4"
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
          className="absolute bottom-14 left-8 md:left-16 z-[25] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
        >
          <p className="text-whisper text-ivory/45 text-[0.5rem] tracking-ultra mb-3">
            A NATURE-LED LIVING UNIVERSE
          </p>
          <p className="font-serif text-ivory text-xl md:text-2xl font-light italic">
            Live inside the forest.
          </p>
        </motion.div>

        {/* Chapter marker top-right */}
        <motion.div
          className="absolute top-8 right-8 md:right-16 z-[25] pointer-events-none flex flex-col items-end gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
        >
          <span className="text-whisper text-ivory/25 text-[0.48rem] tracking-ultra">CHAPTERS</span>
          <span className="font-serif text-ivory/50 text-xs font-light">I — III</span>
        </motion.div>

        {/* ── Scroll cue ── */}
        <motion.div
          className="absolute bottom-10 right-8 md:right-16 z-[25] flex flex-col items-center gap-2 pointer-events-none"
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
