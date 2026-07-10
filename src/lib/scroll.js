import { getLenis } from '@/hooks/use-lenis'

// Scroll suave compartido para todos los CTAs de la página.
// Con Lenis activo usa su animación (offset compensa el header fijo);
// sin Lenis, scroll-margin-top hace la compensación.
export const scrollToSection = (targetId) => {
  const targetElement = document.getElementById(targetId)
  if (!targetElement) return

  const lenis = getLenis()
  if (lenis) {
    // Recalcula el límite por si las secciones lazy crecieron la página
    lenis.resize()
    lenis.scrollTo(targetElement, { offset: -88 })
  } else {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
