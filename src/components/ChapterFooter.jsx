import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const chapters = [
  {
    id: 'litw',
    num: 'I',
    label: 'CHAPTER ONE',
    title: 'Lost in the Woods',
    location: 'Sakleshpur, Karnataka',
    status: 'DELIVERED',
    to: '/lost-in-the-woods',
    img: 'https://cdn.prod.website-files.com/616fdbac1d11cf0e458f443e/6173e5524f9dce6f32eef7bd_Under%20The%20Canopy.jpg',
  },
  {
    id: 'hg',
    num: 'II',
    label: 'CHAPTER TWO',
    title: 'The Humming Grove',
    location: 'Ananthagiri Hills, Hyderabad',
    status: 'UPCOMING',
    to: '/humming-grove',
    img: '/images/hg/hg-102.jpg',
  },
  {
    id: 'ss',
    num: 'III',
    label: 'CHAPTER THREE',
    title: 'Soul Springs',
    location: 'Sadanahalli, Bangalore',
    status: 'COMING SOON',
    to: '/soul-springs',
    img: '/images/ss/ss-004.jpg',
  },
]

export default function ChapterFooter({ current }) {
  const others = chapters.filter(c => c.id !== current)

  return (
    <div className="border-t border-stone/20">
      {/* Header */}
      <div className="px-5 md:px-16 py-8 md:py-10 flex items-center justify-between">
        <p className="text-whisper text-stone-grey/40 text-[0.52rem] tracking-ultra">EXPLORE OTHER CHAPTERS</p>
        <div className="w-12 h-[1px] bg-stone/20" />
      </div>

      {/* Chapter cards */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {others.map((ch, i) => (
          <motion.div
            key={ch.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: i * 0.15, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true }}
          >
            <Link
              to={ch.to}
              className="group relative overflow-hidden flex flex-col justify-between"
              style={{ height: 'clamp(240px, 45vw, 520px)' }}
            >
              {/* Image */}
              <img
                src={ch.img}
                alt={ch.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ filter: 'brightness(0.45)' }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.15) 40%, rgba(8,8,8,0.85) 100%)' }} />

              {/* Border between cards on desktop */}
              {i === 0 && <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-stone/20 hidden md:block" />}

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-10">
                {/* Top */}
                <div className="flex items-center justify-between">
                  <span className="text-whisper text-ivory/40 text-[0.48rem] tracking-ultra">{ch.label}</span>
                  <span className="text-whisper text-ivory/40 text-[0.48rem] tracking-ultra">{ch.status}</span>
                </div>

                {/* Bottom */}
                <div className="flex flex-col gap-3">
                  <p className="font-serif text-ivory font-light"
                    style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {ch.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-whisper text-stone-grey/60 text-[0.48rem] tracking-widest">{ch.location}</p>
                    <motion.div
                      className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400"
                    >
                      <span className="text-whisper text-ivory/70 text-[0.5rem] tracking-ultra">EXPLORE</span>
                      <svg width="18" height="9" viewBox="0 0 18 9" fill="none">
                        <path d="M0 4.5H16M12 1L16 4.5L12 8" stroke="rgba(245,240,232,0.6)" strokeWidth="0.8"/>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
