import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import EnhancedVisuals from './components/EnhancedVisuals'
import { useIsMobile } from './hooks/use-mobile'

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
const ROICalculator = lazy(() => 
  import('./components/ROICalculator').then(module => ({ default: module.default }))
)
const Contact = lazy(() => 
  import('./components/Contact').then(module => ({ default: module.default }))
)
const WhatsAppWidget = lazy(() => 
  import('./components/WhatsAppWidget').then(module => ({ default: module.default }))
)

// Componente de loading sin hooks para evitar problemas
const SectionSkeleton = ({ height = 'h-32' }) => {
  return (
    <div className={`w-full ${height} bg-emerald-50/70 border border-emerald-100 rounded-lg mx-auto max-w-7xl`}>
      <div className="flex items-center justify-center h-full">
        <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-emerald-700 hidden md:block">Cargando...</span>
      </div>
    </div>
  )
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const isMobile = useIsMobile()

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
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-emerald-100 text-emerald-950 relative overflow-x-hidden">
      {/* Efectos visuales mejorados */}
      <EnhancedVisuals />
      
      {/* Header */}
      <Header />
      
      {/* Contenido principal */}
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={<SectionSkeleton height="h-32 md:h-40" />}>
          <StatsSection />
        </Suspense>
        <Suspense fallback={
          <div className="w-full h-64 md:h-96 bg-emerald-50/80 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-emerald-700 text-sm">Cargando servicios...</span>
            </div>
          </div>
        }>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="h-32 md:h-64" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="h-48 md:h-80" />}>
          <ROICalculator />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height="h-40 md:h-72" />}>
          <Contact />
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Widget de WhatsApp */}
      <Suspense fallback={null}>
        <WhatsAppWidget />
      </Suspense>
    </div>
  )
}

export default App
