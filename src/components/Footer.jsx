import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative bg-void border-t border-stone px-5 md:px-16 py-10 md:py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="The Earth Project" className="h-12 w-auto opacity-60"
            style={{ filter: 'invert(1) brightness(2)' }} />
        </div>

        {/* Center */}
        <p className="font-serif text-stone text-sm font-light italic">
          "The land is the first architect."
        </p>

        {/* Right */}
        <div className="flex flex-col gap-1 text-right">
          <p className="text-whisper text-stone text-[0.5rem]">© 2024 THE EARTH PROJECT</p>
          <p className="text-whisper text-stone text-[0.5rem]">ALL CHAPTERS RESERVED</p>
        </div>
      </div>

      {/* Sound toggle placeholder — wired for future ambient audio */}
      <div className="absolute bottom-4 right-5 md:right-8 flex items-center gap-2 opacity-30 hover:opacity-70 transition-opacity cursor-pointer" id="sound-toggle">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 5H1v4h2l3 3V2L3 5z" stroke="#c8c0b0" strokeWidth="0.8" fill="none"/>
          <path d="M9 4.5c1.1 0.7 1.8 1.9 1.8 3.2s-0.7 2.5-1.8 3.2" stroke="#c8c0b0" strokeWidth="0.8" fill="none"/>
          <path d="M11.5 2.5c2 1.4 3.2 3.6 3.2 5.7s-1.2 4.3-3.2 5.7" stroke="#c8c0b0" strokeWidth="0.8" fill="none"/>
        </svg>
        <span className="text-whisper text-[0.45rem] text-ivory-dim tracking-widest">AMBIENT SOUND</span>
      </div>
    </footer>
  )
}
