import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function ComingSoon() {
  const sectionRef = useRef()
  const inView = useInView(sectionRef, { once: true, margin: '-10%' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ height: '70vh' }}>

      {/* Background image */}
      <motion.img
        src="/images/hg/hg-009.jpg"
        alt="Chapter III"
        className="absolute inset-x-0 w-full h-[116%] object-cover object-center"
        style={{ y, top: '-8%', filter: 'brightness(0.35)' }}
      />

      {/* Overlay */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.2) 50%, rgba(8,8,8,0.7) 100%)'
      }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <motion.p
          className="text-whisper text-ivory/35 text-[0.52rem] tracking-ultra mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1 }}>
          CHAPTER III
        </motion.p>

        <motion.h2
          className="font-serif text-ivory font-light"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}>
          A new chapter<br /><em>is being written.</em>
        </motion.h2>

        <motion.div
          className="flex items-center gap-4 mt-10"
          initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.6 }}>
          <div className="w-12 h-[1px] bg-ivory/25" />
          <p className="text-whisper text-ivory/40 text-[0.52rem] tracking-ultra">FORTHCOMING</p>
          <div className="w-12 h-[1px] bg-ivory/25" />
        </motion.div>
      </div>

    </section>
  )
}
