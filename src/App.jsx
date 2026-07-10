import { useState, useEffect, lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import BrandBackground from './components/BrandBackground'
import ScrollProgress from './components/ui-fx/ScrollProgress'
import CursorGlow from './components/ui-fx/CursorGlow'
import { ThemeProvider } from './theme/ThemeContext'
import { useIsMobile } from './hooks/use-mobile'
import { useLenis } from './hooks/use-lenis'

// Lazy-load optimizado con preload condicional
const StatsSection = lazy(() =>
  import('./components/StatsSection').then(module => ({ default: module.default }))
)
const Services = lazy(() =>
  import('./components/Services').then(module => ({ default: module.default }))
)
const About = lazy(() =>
  import('./components/About').then(module => ({ default: module.default }))
)
const CaseStudies = lazy(() =>
  import('./components/CaseStudies').then(module => ({ default: module.default }))
)
const Contact = lazy(() =>
  import('./components/Contact').then(module => ({ default: module.default }))
)

// Componente de loading sin hooks para evitar problemas
const SectionSkeleton = ({ height = 'h-32' }) => {
  return (
    <div className={`w-full ${height} bg-surface-2 border border-edge rounded-lg mx-auto max-w-7xl`}>
      <div className="flex items-center justify-center h-full">
        <div className="w-6 h-6 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-content-3 hidden md:block">Cargando...</span>
      </div>
    </div>
  )
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const isMobile = useIsMobile()

  // Smooth scroll premium (solo desktop, respeta reduced-motion)
  useLenis()

  // Optimizar carga inicial
  useEffect(() => {
    // Marcar como cargado para evitar layout shifts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Preload optimizado para móviles
  useEffect(() => {
    if (isLoaded) {
      if (isMobile) {
        // En móviles, preload más conservador
        const timer = setTimeout(() => {
          import('./components/StatsSection')
        }, 1500)
        return () => clearTimeout(timer)
      } else if ('requestIdleCallback' in window) {
        // En desktop, preload agresivo
        const preloadComponents = () => {
          import('./components/StatsSection')
          import('./components/Services')
          import('./components/About')
        }

        const idleCallback = window.requestIdleCallback(preloadComponents, { timeout: 1000 })
        return () => window.cancelIdleCallback(idleCallback)
      }
    }
  }, [isLoaded, isMobile])

  return (
    <MotionConfig reducedMotion="user">
    <ThemeProvider>
    <div className="min-h-screen text-content-1 relative overflow-x-hidden">
      {/* Fondo del tema activo (el body pone el gradiente base) */}
      <BrandBackground />

      {/* Halo que sigue al cursor (entre fondo y contenido) */}
      <CursorGlow />

      {/* Barra de progreso de scroll */}
      <ScrollProgress />

      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={<SectionSkeleton height="h-32 md:h-40" />}>
          <StatsSection />
        </Suspense>
        <Suspense fallback={
          <div className="w-full h-64 md:h-96 bg-surface-3 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-content-3 text-sm">Cargando servicios...</span>
            </div>
          </div>
        }>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="h-32 md:h-64" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="h-32 md:h-64" />}>
          <CaseStudies />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="h-40 md:h-72" />}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
    </ThemeProvider>
    </MotionConfig>
  )
}

export default App
