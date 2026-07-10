import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

// Envoltorio "magnético": el contenido se inclina hacia el cursor con un
// spring y vuelve al centro al salir. En táctil o reduced-motion es un no-op.
const Magnetic = ({ children, strength = 0.3, radius = 12, className = '' }) => {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const onPointerMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength, -radius, radius))
      y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength, -radius, radius))
    },
    [x, y, strength, radius]
  )

  const onPointerLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  if (!enabled || reduced) return children

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.span>
  )
}

export default Magnetic
