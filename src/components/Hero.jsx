import { motion } from 'framer-motion'
import TypewriterAnimation from './TypewriterAnimation'
import { useMemo } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

const Hero = () => {
  // Detectar si es móvil (hook compartido)
  const isMobile = useIsMobile()

  // Función optimizada para scroll suave
  const handleScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // Partículas flotantes optimizadas
  const floatingParticles = useMemo(() => {
    const count = isMobile ? 0 : 8
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: 10 + (i * 12) % 80,
      y: 20 + (i * 15) % 60,
      size: 2 + (i % 3),
      delay: i * 0.8,
      duration: 4 + (i % 3),
      color: i % 3 === 0 ? 'rgba(22, 163, 74, 0.4)' : 
             i % 3 === 1 ? 'rgba(134, 239, 172, 0.35)' : 'rgba(16, 185, 129, 0.3)'
    }))
  }, [isMobile])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Partículas flotantes para desktop */}
      {!isMobile && floatingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: particle.color,
              boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
              filter: 'blur(0.5px)',
            }}
          />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading - Mejorado con efectos de brillo */}
          <motion.div
            className="mb-12 mt-20 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brand-950 leading-tight">
              Transformamos tu negocio
            </h1>

            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brand-900 mt-6 mb-10">
              con
            </div>

            {/* Typewriter Animation - Centered */}
            <div className="flex justify-center items-end min-h-[120px] md:min-h-[160px] pb-4">
              <TypewriterAnimation />
              {/* <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-green-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
                Inteligencia Artificial
              </div> */}
            </div>
          </motion.div>

          {/* Subtitle - Centered */}
          <motion.p
            className="text-xl md:text-2xl text-brand-800 mb-12 leading-relaxed max-w-3xl mx-auto text-center font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Somos una empresa AI-first que combina ingeniería de software con lo último en inteligencia artificial para resolver problemas reales de negocio.
          </motion.p>

          {/* CTA Buttons - Centered */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="btn-primary px-8 py-4 text-lg font-bold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScrollTo('contact')}
            >
              Conversemos
              <span aria-hidden="true">→</span>
            </motion.button>

            <motion.button
              className="btn-secondary px-8 py-4 text-lg font-bold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleScrollTo('services')}
            >
              Nuestros Servicios
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
