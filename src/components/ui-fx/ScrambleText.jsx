import { useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

// Charset "tech" determinista (sin Math.random: el índice sale de la
// posición del carácter + el timestamp del frame)
const CHARS = '!<>-_/[]{}=+*^?#01'

// Texto que se "decodifica" al entrar en viewport: los caracteres aún no
// revelados se muestran revueltos y se fijan de izquierda a derecha.
// Escribe en textContent vía rAF (cero re-renders, como CountUp).
// a11y: aria-label mantiene el texto final para lectores de pantalla.
const ScrambleText = ({ text, className = '', duration = 800 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || reduced) return
    const el = ref.current
    if (!el) return

    let raf
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const revealed = Math.floor(progress * text.length)
      let out = text.slice(0, revealed)
      for (let i = revealed; i < text.length; i++) {
        const ch = text[i]
        out += ch === ' ' ? ' ' : CHARS[(i * 7 + Math.floor(now / 40)) % CHARS.length]
      }
      el.textContent = out
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      el.textContent = text
    }
  }, [inView, reduced, text, duration])

  return (
    <span ref={ref} aria-label={text} className={className}>
      {text}
    </span>
  )
}

export default ScrambleText
