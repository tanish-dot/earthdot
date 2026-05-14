import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
const HummingGrovePage = lazy(() => import('./pages/HummingGrovePage'))
const SoulSpringsPage = lazy(() => import('./pages/SoulSpringsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const LostInTheWoodsPage = lazy(() => import('./pages/LostInTheWoodsPage'))

gsap.registerPlugin(ScrollTrigger)

let ambientAudio = null
export function initAmbientSound(src) {
  ambientAudio = new Audio(src)
  ambientAudio.loop = true
  ambientAudio.volume = 0.18
}
export function playAmbient() { ambientAudio?.play().catch(() => {}) }
export function pauseAmbient() { ambientAudio?.pause() }

function HomePage({ loaded, setLoaded }) {
  return (
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
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage loaded={loaded} setLoaded={setLoaded} />} />
          <Route path="/lost-in-the-woods" element={<LostInTheWoodsPage />} />
          <Route path="/humming-grove" element={<HummingGrovePage />} />
          <Route path="/soul-springs" element={<SoulSpringsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
