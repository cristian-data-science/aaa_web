import { motion, AnimatePresence } from 'framer-motion'
import TypewriterAnimation from './TypewriterAnimation'
import DatabaseAnimations from './DatabaseAnimations'
import HeroBackground from './HeroBackground'
import TechBackground from './TechBackground'
import QuantumEffects from './QuantumEffects'
import { useState, useEffect } from 'react'

const Hero = () => {
  // Detectar si es móvil
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Función para scroll suave
  const handleScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Componente de fondo tecnológico avanzado - Solo Desktop */}
      {!isMobile && <TechBackground />}
      
      {/* Efectos cuánticos ultra avanzados - Solo Desktop */}
      {!isMobile && <QuantumEffects />}
      
      {/* Fondo tecnológico ultra moderno con binario y líneas - DESENCHUFADO */}
      {/* <HeroBackground /> */}

      {/* Fondo simple para móviles */}
      {isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
          <div 
            className="absolute inset-0 opacity-[0.01]"
            style={{
              background: `
                radial-gradient(ellipse at top left, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
                radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.03) 0%, transparent 50%)
              `,
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading - Más espaciado del nav */}
          <motion.div
            className="mb-12 mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Transformamos tu negocio
            </h1>
            
            {/* "con" text con más espaciado */}
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mt-6 mb-10">
              con
            </div>

            {/* Typewriter Animation - Centered */}
            <div className="flex justify-center items-center min-h-[100px]">
              <TypewriterAnimation />
              {/* <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-green-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
                Inteligencia Artificial
              </div> */}
            </div>
          </motion.div>

          {/* Subtitle - Centered */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Liberamos el potencial humano con soluciones que aprenden, se adaptan y generan resultados medibles.
          </motion.p>

          {/* CTA Buttons - Centered */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-orange-500 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo('contact')}
            >
              <span className="relative z-10 flex items-center justify-center">
                Comenzar Ahora
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo('roi-calculator')}
            >
              <span className="flex items-center justify-center">
                Ver Demo
                <motion.span
                  className="ml-2 text-2xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  ⚡
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

