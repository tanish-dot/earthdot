import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingEnquire() {
  const location = useLocation()

  // Hide on contact and admin pages — already there
  const hidden = ['/contact', '/admin'].includes(location.pathname)

  return (
    <AnimatePresence>
      {!hidden && (
          {/* WhatsApp button — bottom left */}
          <motion.a
            href="https://wa.me/919000102744"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-5 md:bottom-8 md:left-8 z-[200] flex items-center justify-center w-11 h-11 md:w-12 md:h-12 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.3)] transition-all duration-500 hover:scale-105"
            aria-label="Chat on WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 2.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.a>

          {/* Enquire button — bottom right */}
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
