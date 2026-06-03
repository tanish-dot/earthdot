import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import BrochureModal from './BrochureModal'

export default function ContactSection() {
  const ref = useRef()
  const imgRef = useRef()
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const [hoveredProject, setHoveredProject] = useState(null)
  const [brochureModal, setBrochureModal] = useState({ open: false, file: '', label: '' })

  const openBrochure = (file, label) => setBrochureModal({ open: true, file, label })
  const closeBrochure = () => setBrochureModal(m => ({ ...m, open: false }))
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const projects = [
    { name: 'LOST IN THE WOODS', location: 'Sakleshpur, Karnataka', status: 'DELIVERED' },
    { name: 'THE HUMMING GROVE', location: 'Ananthagiri Hills, Hyderabad', status: 'UPCOMING' },
    { name: 'SOUL SPRINGS', location: 'Sadanahalli, Bangalore', status: 'COMING SOON' },
  ]

  return (
    <>
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
          className="flex flex-col gap-12 mt-24 pt-16 border-t border-stone"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-10">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <p className="text-whisper text-stone-grey text-[0.6rem] tracking-widest">ENQUIRE</p>
              <a
                href="mailto:Tepindiaofficial@gmail.com"
                className="font-serif text-ivory text-2xl md:text-3xl font-light hover:text-ivory-dim transition-colors duration-500"
              >
                Tepindiaofficial@gmail.com
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/919000102744" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 mt-2 text-whisper text-stone-grey hover:text-ivory text-[0.6rem] tracking-widest transition-colors duration-500 group">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-forest-glow flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                +91 90001 02744
              </a>
              {/* Download Brochure links */}
              <div className="flex flex-col gap-1 mt-1">
                <button
                  onClick={() => openBrochure('/hg-brochure.pdf', 'Humming Grove')}
                  className="flex items-center gap-3 text-whisper text-stone-grey hover:text-ivory text-[0.6rem] tracking-widest transition-colors duration-500">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  DOWNLOAD HG BROCHURE
                </button>
                <button
                  onClick={() => openBrochure('/ss-brochure.pdf', 'Soul Springs')}
                  className="flex items-center gap-3 text-whisper text-stone-grey hover:text-ivory text-[0.6rem] tracking-widest transition-colors duration-500">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  DOWNLOAD SS BROCHURE
                </button>
              </div>
            </div>

            {/* Follow + Office */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-whisper text-stone-grey text-[0.6rem] tracking-widest">FOLLOW</p>
                <div className="flex items-center gap-7">
                  {/* Instagram */}
                  <a href="https://www.instagram.com/the.earthproject_/" target="_blank" rel="noopener noreferrer"
                    className="text-stone-grey hover:text-ivory transition-colors duration-500" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="5"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/company/theearthproject/" target="_blank" rel="noopener noreferrer"
                    className="text-stone-grey hover:text-ivory transition-colors duration-500" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://www.youtube.com/@the_earthproject" target="_blank" rel="noopener noreferrer"
                    className="text-stone-grey hover:text-ivory transition-colors duration-500" aria-label="YouTube">
                    <svg width="22" height="16" viewBox="0 0 576 404" fill="currentColor">
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex flex-col gap-2">
                <p className="text-whisper text-stone-grey text-[0.6rem] tracking-widest">OFFICE</p>
                <p className="font-serif text-ivory-dim text-sm font-light leading-relaxed">
                  Address to be updated
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <BrochureModal
      isOpen={brochureModal.open}
      onClose={closeBrochure}
      brochureFile={brochureModal.file}
      brochureLabel={brochureModal.label}
    />
    </>
  )
}
