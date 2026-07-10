import { useEffect } from 'react'
import Lenis from 'lenis'

// Singleton compartido: scroll.js lo consulta para usar lenis.scrollTo
let lenisInstance = null

export const getLenis = () => lenisInstance

// Smooth scroll premium con Lenis. Solo en punteros finos con hover
// (desktop) y sin prefers-reduced-motion; en el resto no hace nada.
export const useLenis = () => {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenisInstance = lenis

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
