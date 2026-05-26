import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingEnquire() {
  const location = useLocation()

  // Hide on contact and admin pages — already there
  const hidden = ['/contact', '/admin'].includes(location.pathname)

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-[200]"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 2.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <Link
            to="/contact"
            className="group flex items-center gap-3 bg-ivory text-void rounded-full px-5 py-3 md:px-6 md:py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_40px_rgba(245,240,232,0.15)] transition-all duration-500 hover:scale-105"
          >
            {/* Pulse dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest-glow opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-glow" />
            </span>
            <span className="text-whisper text-void text-[0.58rem] tracking-ultra font-medium whitespace-nowrap">
              ENQUIRE NOW
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
