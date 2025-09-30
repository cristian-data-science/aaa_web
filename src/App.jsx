import { useState, useRef, lazy, Suspense } from 'react'
import './App.css'
import SceneContainer from './components/scroll-driven/SceneContainer'
import ProgressIndicator from './components/scroll-driven/ProgressIndicator'

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
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      setActiveScene(sceneIndex)
    }
  }

  return (
    <div 
      className="relative w-full h-screen overflow-y-scroll bg-black snap-y snap-mandatory scroll-smooth"
      style={{
        scrollBehavior: 'smooth',
      }}
    >
      {/* Link de accesibilidad */}
      <a href="#hero" className="skip-to-content">
        Saltar al contenido principal
      </a>

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
  )
}

export default App

