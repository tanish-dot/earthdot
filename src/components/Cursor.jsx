import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const ringX = useSpring(mx, { damping: 26, stiffness: 180, mass: 0.5 })
  const ringY = useSpring(my, { damping: 26, stiffness: 180, mass: 0.5 })
  const dotX = useSpring(mx, { damping: 50, stiffness: 700, mass: 0.1 })
  const dotY = useSpring(my, { damping: 50, stiffness: 700, mass: 0.1 })

  useEffect(() => {
    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true) }
    const leave = () => setVisible(false)

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)

    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Lagging ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-ivory/25"
        style={{
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovered ? 56 : 36,
          height: hovered ? 56 : 36,
        }}
        transition={{ opacity: { duration: 0.3 }, width: { duration: 0.3 }, height: { duration: 0.3 } }}
      />
      {/* Fast dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-ivory"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
