import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Registrar plugin de GSAP
gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollController - Hook para gestionar scroll-driven animations
 * 
 * Funcionalidades:
 * - Integración de Lenis para smooth scroll
 * - GSAP ScrollTrigger para pinning y animaciones
 * - Detección de escena activa
 * - Prefers-reduced-motion support
 * 
 * @returns {Object} - { activeScene, scrollToScene, lenisRef }
 */
export const useScrollController = (sceneRefs = []) => {
  const [activeScene, setActiveScene] = useState(0)
  const lenisRef = useRef(null)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    // Detectar prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mediaQuery.matches

    // Inicializar Lenis solo si no se prefiere movimiento reducido
    if (!prefersReducedMotion.current) {
      lenisRef.current = new Lenis({
        duration: 1,
        easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic - más natural
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8, // Reducir multiplicador para scroll más responsivo
        touchMultiplier: 1.5,
        infinite: false,
        autoResize: true,
        syncTouch: true, // Sincronizar touch events
        syncTouchLerp: 0.1,
      })

      // Conectar Lenis con GSAP
      lenisRef.current.on('scroll', ScrollTrigger.update)

      // Función de animación
      function raf(time) {
        lenisRef.current?.raf(time)
      }

      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    }

    // Setup ScrollTrigger para cada escena
    sceneRefs.forEach((ref, index) => {
      if (!ref.current) return

      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => setActiveScene(index),
        onEnterBack: () => setActiveScene(index),
        // Pin solo si no hay prefers-reduced-motion
        pin: !prefersReducedMotion.current,
        pinSpacing: false,
        scrub: !prefersReducedMotion.current,
        markers: false, // Cambiar a true para debugging
      })
    })

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [sceneRefs])

  // Función para navegar a una escena específica
  const scrollToScene = (sceneIndex) => {
    const targetRef = sceneRefs[sceneIndex]
    if (!targetRef?.current) return

    if (prefersReducedMotion.current) {
      // Scroll instantáneo si se prefiere movimiento reducido
      targetRef.current.scrollIntoView({ behavior: 'auto' })
    } else if (lenisRef.current) {
      // Scroll suave con Lenis
      lenisRef.current.scrollTo(targetRef.current, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      // Fallback a scroll nativo suave
      targetRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    activeScene,
    scrollToScene,
    lenisRef,
    prefersReducedMotion: prefersReducedMotion.current,
  }
}

/**
 * ScrollControllerProvider - Componente wrapper que aplica estilos de scroll-snap
 */
export const ScrollControllerProvider = ({ children, className = '' }) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div
      className={`
        scroll-smooth
        ${!prefersReducedMotion ? 'snap-y snap-mandatory' : ''}
        ${className}
      `}
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth',
      }}
    >
      {children}
    </div>
  )
}
