import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackEvent, trackConversion, trackGA4Event, CONVERSIONS } from '../lib/analytics'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1aAxdE99X-G0K4yeVVENWHNnF8J64dfZUsMFxcu7WpyB6sq68QFzgI97HjTGVo0hE/exec'

export default function BrochureModal({ isOpen, onClose, brochureFile, brochureLabel }) {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done

  const handleSubmit = async e => {
    e.preventDefault()
    if (!phone.trim()) return
    setStatus('sending')
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({
          name,
          phone,
          email: '',
          chapter: '',
          type: 'Brochure Download',
          message: `Brochure: ${brochureLabel}`,
        }),
      })
    } catch {
      // no-cors mode won't throw on network success
    }
    // Conversion: brochure lead captured
    trackConversion(CONVERSIONS.leadForm)
    trackGA4Event('generate_lead', { form: 'brochure', brochure: brochureLabel })
    trackEvent('brochure_lead', { brochure: brochureLabel })
    setStatus('done')
    // Trigger download
    const a = document.createElement('a')
    a.href = brochureFile
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => {
      onClose()
      setStatus('idle')
      setPhone('')
      setName('')
    }, 1400)
  }

  const handleClose = () => {
    if (status === 'sending') return
    onClose()
    setTimeout(() => { setStatus('idle'); setPhone(''); setName('') }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[500] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-[#0f0f0f] border border-stone/20 rounded-2xl px-8 py-10 w-full max-w-sm"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-stone-grey hover:text-ivory transition-colors duration-300"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <p className="text-whisper text-forest-glow text-[0.5rem] tracking-ultra mb-3">BROCHURE DOWNLOAD</p>
            <h3 className="font-serif text-ivory text-xl font-light mb-2">One step away</h3>
            <p className="font-serif text-stone-grey text-sm font-light leading-relaxed mb-8">
              Share your details and your download will begin instantly.
            </p>

            {status === 'done' ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-12 h-12 rounded-full bg-forest-glow/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7CAF5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <p className="font-serif text-ivory text-sm font-light">Your download has started</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-stone/30 focus:border-ivory/50 outline-none text-ivory font-serif text-sm font-light py-2 placeholder:text-stone-grey/40 transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="tel"
                    placeholder="Mobile number *"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-stone/30 focus:border-ivory/50 outline-none text-ivory font-serif text-sm font-light py-2 placeholder:text-stone-grey/40 transition-colors duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-1 w-full bg-ivory text-void text-whisper text-[0.58rem] tracking-ultra font-medium py-3.5 rounded-full hover:bg-ivory/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'PLEASE WAIT…' : 'DOWNLOAD BROCHURE'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
