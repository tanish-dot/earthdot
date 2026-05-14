import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setVisible(false)
            setTimeout(onComplete, 1200)
          }, 400)
          return 100
        }
        return p + Math.random() * 4 + 1
      })
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Atmospheric radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[600px] h-[600px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #2d5a2d 0%, transparent 70%)' }}
            />
          </div>

          <motion.div
            className="relative flex flex-col items-center gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Monogram */}
            <div className="flex flex-col items-center gap-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="23" stroke="rgba(245,240,232,0.15)" strokeWidth="1"/>
                <path d="M24 8 L24 40 M12 20 L36 20 M12 28 L36 28" stroke="rgba(245,240,232,0.4)" strokeWidth="0.8"/>
                <circle cx="24" cy="24" r="4" stroke="rgba(245,240,232,0.4)" strokeWidth="0.8" fill="none"/>
              </svg>
              <p className="text-whisper text-ivory-dim tracking-ultra text-[0.55rem]">THE EARTH PROJECT</p>
            </div>

            {/* Progress bar */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-[200px] h-[1px] bg-stone overflow-hidden relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-ivory-dim"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-whisper text-stone-grey text-[0.5rem]">
                {Math.min(Math.round(progress), 100).toString().padStart(3, '0')}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
