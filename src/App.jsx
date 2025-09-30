import { useState, useRef, lazy, Suspense, useEffect } from 'react'
import './App.css'
import SceneContainer from './components/scroll-driven/SceneContainer'
import ProgressIndicator from './components/scroll-driven/ProgressIndicator'
import Logo from './components/Logo'
import LogoIntro from './components/LogoIntro'

// Lazy-load de escenas para optimizar carga inicial
const HeroScene = lazy(() => import('./components/scenes/HeroScene'))
const ServicesScene = lazy(() => import('./components/scenes/ServicesScene'))
const AboutScene = lazy(() => import('./components/scenes/AboutScene'))
const DemoScene = lazy(() => import('./components/scenes/DemoScene'))
const CTAScene = lazy(() => import('./components/scenes/CTAScene'))
const WhatsAppWidget = lazy(() => import('./components/WhatsAppWidget'))

// Componente de loading para Suspense
const SceneLoader = () => (
  <div className="w-full h-screen bg-black flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin" />
      <span className="text-neon-green text-lg font-mono">Cargando...</span>
    </div>
  </div>
)

function App() {
  const [activeScene, setActiveScene] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  
  // Referencia al contenedor de scroll
  const scrollContainerRef = useRef(null)
  
  // Referencias a cada escena
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const aboutRef = useRef(null)
  const demoRef = useRef(null)
  const ctaRef = useRef(null)

  // Array de referencias
  const sceneRefs = [heroRef, servicesRef, aboutRef, demoRef, ctaRef]

  // Configuración de escenas para el indicador de progreso
  const scenes = [
    { id: 'hero', label: 'Inicio' },
    { id: 'services', label: 'Servicios' },
    { id: 'about', label: 'Nosotros' },
    { id: 'demo', label: 'ROI' },
    { id: 'contact', label: 'Contacto' },
  ]

  // Función para navegar a una escena
  const scrollToScene = (sceneIndex) => {
    const targetRef = sceneRefs[sceneIndex]
    if (targetRef?.current) {
      setIsAutoScrolling(true)
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      setActiveScene(sceneIndex)
      // Resetear flag después de que termine la animación
      setTimeout(() => setIsAutoScrolling(false), 1000)
    }
  }

  // Auto-alineación cuando el usuario termina de scrollear - SOLO DESKTOP
  useEffect(() => {
    // Detectar si es mobile
    const isMobile = window.innerWidth < 768
    
    // Si es mobile, desactivar auto-scroll y salir
    if (isMobile || !scrollContainerRef.current || showIntro) return

    let scrollTimeout

    const handleScroll = () => {
      // Si estamos en medio de un auto-scroll, no hacer nada
      if (isAutoScrolling) return

      // Limpiar timeout anterior
      clearTimeout(scrollTimeout)

      // Esperar 200ms después de que el usuario deje de scrollear
      scrollTimeout = setTimeout(() => {
        const scenes = scrollContainerRef.current?.querySelectorAll('[data-scene]')
        if (!scenes) return

        let targetScene = null
        let targetIndex = 0

        // Encontrar la escena actual basado en el scroll
        scenes.forEach((scene, index) => {
          const rect = scene.getBoundingClientRect()
          const sceneHeight = rect.height
          const viewportHeight = window.innerHeight
          
          // Calcular qué porcentaje de la escena ha sido scrolleada
          // Si rect.top es negativo, significa que ya pasamos parte de la escena
          const scrolledAmount = Math.abs(Math.min(rect.top, 0))
          const scrolledPercentage = (scrolledAmount / sceneHeight) * 100

          // Si el top de la escena está visible o parcialmente visible
          if (rect.top < viewportHeight && rect.bottom > 0) {
            // Si hemos scrolleado más del 75% de esta escena hacia abajo
            if (scrolledPercentage > 75 && rect.top < 0) {
              // Auto-alinear a la SIGUIENTE escena (si existe)
              if (index < scenes.length - 1) {
                targetScene = scenes[index + 1]
                targetIndex = index + 1
              }
            }
            // Si hemos scrolleado menos del 25% (estamos volviendo hacia arriba)
            else if (scrolledPercentage < 25 && rect.top < 0 && rect.top > -sceneHeight * 0.25) {
              // Auto-alinear a esta escena (la actual)
              targetScene = scene
              targetIndex = index
            }
            // Si estamos entre 25% y 75%, NO hacer auto-scroll (dejar al usuario scrollear libremente)
            else if (rect.top >= 0 && rect.top < viewportHeight * 0.5) {
              // Si la escena está en la parte superior del viewport, actualizar índice activo
              if (!targetScene) {
                targetScene = scene
                targetIndex = index
              }
            }
          }
        })

        // Aplicar auto-alineación si se encontró una escena target
        if (targetScene) {
          const rect = targetScene.getBoundingClientRect()
          
          // Solo hacer scroll si la escena NO está ya alineada (threshold de 50px)
          if (Math.abs(rect.top) > 50) {
            setIsAutoScrolling(true)
            targetScene.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start'
            })
            setActiveScene(targetIndex)
            setTimeout(() => setIsAutoScrolling(false), 800)
          } else {
            // Ya está alineada, solo actualizar índice
            setActiveScene(targetIndex)
          }
        }
      }, 200)
    }

    const container = scrollContainerRef.current
    container?.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container?.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [isAutoScrolling, showIntro])

  return (
    <>
      {/* Intro animado del logo */}
      {showIntro && (
        <LogoIntro onComplete={() => setShowIntro(false)} />
      )}

      <div
        ref={scrollContainerRef}
        className="relative w-full h-screen overflow-y-scroll bg-black scroll-smooth"
        style={{
          scrollBehavior: 'smooth',
          opacity: showIntro ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out',
          backgroundColor: '#000000',
          WebkitOverflowScrolling: 'touch',
        }}
      >
      {/* Link de accesibilidad */}
      <a href="#hero" className="skip-to-content">
        Saltar al contenido principal
      </a>

      {/* Logo DataCEF - Posición fija arriba a la izquierda */}
      <div className="fixed top-6 left-6 z-50">
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault()
            scrollToScene(0)
          }}
          className="block hover:scale-105 transition-transform duration-300"
          aria-label="DataCEF - Volver al inicio"
        >
          <Logo size="default" />
        </a>
      </div>

      {/* Indicador de progreso lateral */}
      <ProgressIndicator
        activeScene={activeScene}
        scenes={scenes}
        onSceneClick={scrollToScene}
      />

      {/* Escenas con scroll-snap */}
      <div className="w-full">
        {/* Escena 1: Hero */}
        <SceneContainer
          ref={heroRef}
          sceneId="hero"
          backgroundColor="bg-black"
          centerContent={true}
        >
          <Suspense fallback={<SceneLoader />}>
            <HeroScene />
          </Suspense>
        </SceneContainer>

        {/* Escena 2: Servicios */}
        <SceneContainer
          ref={servicesRef}
          sceneId="services"
          backgroundColor="bg-gradient-to-b from-black via-slate-950 to-black"
          centerContent={true}
        >
          <Suspense fallback={<SceneLoader />}>
            <ServicesScene />
          </Suspense>
        </SceneContainer>

        {/* Escena 3: About */}
        <SceneContainer
          ref={aboutRef}
          sceneId="about"
          backgroundColor="bg-gradient-to-br from-black via-slate-950 to-black"
          centerContent={true}
        >
          <Suspense fallback={<SceneLoader />}>
            <AboutScene />
          </Suspense>
        </SceneContainer>

        {/* Escena 4: Demo/ROI */}
        <SceneContainer
          ref={demoRef}
          sceneId="demo"
          backgroundColor="bg-gradient-to-br from-slate-950 via-black to-slate-950"
          centerContent={true}
        >
          <Suspense fallback={<SceneLoader />}>
            <DemoScene />
          </Suspense>
        </SceneContainer>

        {/* Escena 5: CTA/Contact */}
        <SceneContainer
          ref={ctaRef}
          sceneId="contact"
          backgroundColor="bg-gradient-to-br from-black via-slate-950 to-black"
          centerContent={true}
        >
          <Suspense fallback={<SceneLoader />}>
            <CTAScene />
          </Suspense>
        </SceneContainer>
      </div>

      {/* WhatsApp Widget flotante */}
      <Suspense fallback={null}>
        <WhatsAppWidget />
      </Suspense>
    </div>
    </>
  )
}

export default App

