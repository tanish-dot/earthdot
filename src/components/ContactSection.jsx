import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function ContactSection() {
  const ref = useRef()
  const imgRef = useRef()
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const [hoveredProject, setHoveredProject] = useState(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const projects = [
    { name: 'LOST IN THE WOODS', location: 'Sakleshpur, Karnataka', status: 'DELIVERED' },
    { name: 'THE HUMMING GROVE', location: 'Ananthagiri Hills, Hyderabad', status: 'UPCOMING' },
    { name: 'SOUL SPRINGS', location: 'Sadanahalli, Bangalore', status: 'COMING SOON' },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-void overflow-hidden"
    >
      {/* Background image strip */}
      <div ref={imgRef} className="relative overflow-hidden" style={{ height: 'clamp(280px, 50vw, 420px)' }}>
        <motion.img
          src="/images/hg/hg-070.jpg"
          alt="Aerial view"
          style={{ y: parallaxY }}
          className="absolute inset-0 w-full h-[120%] object-cover object-center"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.35) 50%, rgba(8,8,8,0.9) 100%)'
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2 className="text-display text-ivory text-center"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.9 }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 1.2 }}>
            Begin<br /><em>your chapter</em>
          </motion.h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-16 pt-12 md:pt-20 pb-16 md:pb-24">
        {/* Intro copy */}
        <motion.p
          className="font-serif text-stone-grey text-lg font-light leading-relaxed max-w-lg mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          The Earth Project is not sold. It is discovered. Reach out to begin a quiet conversation about land, life, and what it means to truly belong somewhere.
        </motion.p>

        {/* Project list */}
        <div className="flex flex-col">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 border-t border-stone cursor-pointer last:border-b"
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
            >
              <div className="flex items-center gap-8">
                <span className="font-serif text-stone-grey text-sm font-light w-8">0{i + 1}</span>
                <div>
                  <h3
                    className="font-serif text-ivory font-light transition-colors duration-500"
                    style={{
                      fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                      opacity: hoveredProject !== null && hoveredProject !== i ? 0.3 : 1,
                    }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-whisper text-stone-grey text-[0.55rem] mt-2 tracking-widest">{p.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 md:mt-0 ml-0 md:ml-0">
                <span className="text-whisper text-muted-olive text-[0.55rem] tracking-widest">{p.status}</span>
                <motion.div
                  className="w-6 h-[1px] bg-ivory-dim"
                  animate={{ width: hoveredProject === i ? 32 : 24, opacity: hoveredProject === i ? 1 : 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between mt-24 pt-16 border-t border-stone gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex flex-col gap-2">
            <p className="text-whisper text-stone-grey text-[0.6rem] tracking-widest">ENQUIRE</p>
            <a
              href="mailto:Tepindiaofficial@gmail.com"
              className="font-serif text-ivory text-2xl md:text-3xl font-light hover:text-ivory-dim transition-colors duration-500"
            >
              Tepindiaofficial@gmail.com
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-whisper text-stone-grey text-[0.6rem] tracking-widest">FOLLOW</p>
            <div className="flex items-center gap-8">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/the.earthproject_/' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/theearthproject/' },
                { label: 'YouTube', href: 'https://www.youtube.com/@the_earthproject' },
                { label: 'Reddit', href: 'https://www.reddit.com/u/The_EarthProject' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="font-serif text-stone-grey text-sm font-light hover:text-ivory transition-colors duration-500">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
