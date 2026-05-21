import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Dot snaps instantly, ring trails smoothly
  const dotX = useSpring(mx, { damping: 28, stiffness: 600, mass: 0.08 })
  const dotY = useSpring(my, { damping: 28, stiffness: 600, mass: 0.08 })
  const ringX = useSpring(mx, { damping: 32, stiffness: 120, mass: 0.6 })
  const ringY = useSpring(my, { damping: 32, stiffness: 120, mass: 0.6 })

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true) }
    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)

    // Use event delegation — works for dynamically added elements
    const onEnter = (e) => { if (e.target.closest('a, button, [data-cursor]')) setHovered(true) }
    const onLeave = (e) => { if (e.target.closest('a, button, [data-cursor]')) setHovered(false) }
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-ivory/20"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovered ? 60 : 38,
          height: hovered ? 60 : 38,
          borderColor: hovered ? 'rgba(245,240,232,0.5)' : 'rgba(245,240,232,0.2)',
        }}
        transition={{ opacity: { duration: 0.3 }, width: { duration: 0.35, ease: 'easeOut' }, height: { duration: 0.35, ease: 'easeOut' }, borderColor: { duration: 0.3 } }}
      />
      {/* Fast dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-[5px] h-[5px] rounded-full bg-ivory"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 0.9 : 0, scale: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
