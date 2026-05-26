import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader'
import Navigation from './components/Navigation'
import Cursor from './components/Cursor'
import HeroScene from './components/HeroScene'
import ManifestoSection from './components/ManifestoSection'
import ChaptersIntro from './components/ChaptersIntro'
import HummingGrove from './components/HummingGrove'
import SoulSprings from './components/SoulSprings'
import LostInTheWoods from './components/LostInTheWoods'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Particles from './components/Particles'
import FloatingEnquire from './components/FloatingEnquire'
const HummingGrovePage = lazy(() => import('./pages/HummingGrovePage'))
const SoulSpringsPage = lazy(() => import('./pages/SoulSpringsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const LostInTheWoodsPage = lazy(() => import('./pages/LostInTheWoodsPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

gsap.registerPlugin(ScrollTrigger)

let ambientAudio = null
export function initAmbientSound(src) {
  ambientAudio = new Audio(src)
  ambientAudio.loop = true
  ambientAudio.volume = 0.18
}
export function playAmbient() { ambientAudio?.play().catch(() => {}) }
export function pauseAmbient() { ambientAudio?.pause() }

/* ── Page transition wrapper ── */
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}

function HomePage({ loaded, setLoaded }) {
  return (
    <PageTransition>
      <div className="relative grain">
        <Preloader onComplete={() => setLoaded(true)} />
        <Navigation visible={loaded} />
        <main>
          <HeroScene ready={loaded} />
          <ManifestoSection />
          <ChaptersIntro />
          <LostInTheWoods />
          <HummingGrove />
          <SoulSprings />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [location.pathname])

  useEffect(() => {
    if (!loaded && lenisRef.current && location.pathname === '/') {
      lenisRef.current.stop()
    } else if (lenisRef.current) {
      lenisRef.current.start()
    }
  }, [loaded, location.pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Particles />
      <Cursor />
      <FloatingEnquire />
      <Suspense fallback={
        <motion.div
          className="fixed inset-0 bg-void z-[999]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
      }>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage loaded={loaded} setLoaded={setLoaded} />} />
            <Route path="/lost-in-the-woods" element={
              <PageTransition><LostInTheWoodsPage /></PageTransition>
            } />
            <Route path="/humming-grove" element={
              <PageTransition><HummingGrovePage /></PageTransition>
            } />
            <Route path="/soul-springs" element={
              <PageTransition><SoulSpringsPage /></PageTransition>
            } />
            <Route path="/contact" element={
              <PageTransition><ContactPage /></PageTransition>
            } />
            <Route path="/admin" element={
              <PageTransition><AdminPage /></PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  )
}
