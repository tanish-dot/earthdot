import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Lost in the Woods', to: '/lost-in-the-woods', type: 'route' },
  { label: 'Humming Grove', to: '/humming-grove', type: 'route' },
  { label: 'Soul Springs', to: '/soul-springs', type: 'route' },
  { label: 'Contact', to: '/contact', type: 'route' },
]

export default function Navigation({ visible }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          background: scrolled ? 'linear-gradient(to bottom, rgba(8,8,8,0.9) 0%, transparent 100%)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          transition: 'background 0.5s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center group"
        >
          <img
            src="/logo.png"
            alt="The Earth Project"
            className="h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            style={{ filter: 'invert(1) brightness(2)' }}
          />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className="text-whisper text-stone-grey hover:text-ivory transition-colors duration-500 text-[0.6rem]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center"
        >
          <motion.span
            className="block w-full h-[1px] bg-ivory opacity-60"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
          />
          <motion.span
            className="block w-4/5 h-[1px] bg-ivory opacity-60"
            animate={{ opacity: menuOpen ? 0 : 0.6 }}
          />
          <motion.span
            className="block w-full h-[1px] bg-ivory opacity-60"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-display text-ivory hover:text-ivory-dim transition-colors duration-300"
                  style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    style={{ display: 'block' }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
