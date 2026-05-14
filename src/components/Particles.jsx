import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 55

export default function Particles() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId
    let lastTime = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 200)
    }
    window.addEventListener('resize', onResize, { passive: true })

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.35 + 0.07,
      speedY: -(Math.random() * 0.12 + 0.03),
      speedX: (Math.random() - 0.5) * 0.06,
    }))

    // Pre-build fillStyle strings once
    particles.forEach(p => { p.fill = `rgba(245,240,232,${p.alpha.toFixed(2)})` })

    const draw = (time) => {
      animId = requestAnimationFrame(draw)
      // Cap at ~30fps to halve GPU load
      if (time - lastTime < 33) return
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.fill
        ctx.fill()

        p.y += p.speedY
        p.x += p.speedX

        if (p.y < -5) {
          p.y = canvas.height + 5
          p.x = Math.random() * canvas.width
        }
      }
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
