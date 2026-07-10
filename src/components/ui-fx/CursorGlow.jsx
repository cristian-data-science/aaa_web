import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const SIZE = 500

// Halo de luz que sigue al cursor con un spring perezoso (estilo Linear).
// Vive entre el fondo (z-0) y el contenido (z-10); el blend-mode por tema
// se define en index.css (.cursor-glow). Solo desktop y sin reduced-motion.
const CursorGlow = () => {
  const reduced = useReducedMotion()
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  const mx = useMotionValue(-SIZE)
  const my = useMotionValue(-SIZE)
  const x = useSpring(mx, { stiffness: 120, damping: 30, mass: 0.5 })
  const y = useSpring(my, { stiffness: 120, damping: 30, mass: 0.5 })

  useEffect(() => {
    if (!enabled || reduced) return
    const onMove = (e) => {
      mx.set(e.clientX - SIZE / 2)
      my.set(e.clientY - SIZE / 2)
    }
    const onLeave = () => {
      mx.set(-SIZE * 2)
      my.set(-SIZE * 2)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, reduced, mx, my])

  if (!enabled || reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow fixed top-0 left-0 rounded-full pointer-events-none z-[1]"
      style={{
        x,
        y,
        width: SIZE,
        height: SIZE,
        background: 'radial-gradient(closest-side, var(--glow), transparent 70%)',
      }}
    />
  )
}

export default CursorGlow
