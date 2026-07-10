import { useRef, useEffect, useCallback } from 'react'
import { useInView, useMotionValue, animate, useReducedMotion } from 'framer-motion'

// Contador que anima 0→value al entrar en viewport, escribiendo en
// textContent (sin re-renders). Formato es-CL (punto de miles).
const CountUp = ({ value, prefix = '', suffix = '', duration = 1.8, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mv = useMotionValue(0)
  const reduced = useReducedMotion()

  const fmt = useCallback(
    (v) => `${prefix}${new Intl.NumberFormat('es-CL').format(Math.round(v))}${suffix}`,
    [prefix, suffix]
  )

  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduced) {
      ref.current.textContent = fmt(value)
      return
    }
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = fmt(v)
      },
    })
    return () => controls.stop()
  }, [inView, value, duration, reduced, fmt, mv])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {fmt(reduced ? value : 0)}
    </span>
  )
}

export default CountUp
