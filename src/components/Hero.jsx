import { motion } from 'framer-motion'
import TypewriterAnimation from './TypewriterAnimation'
import { lazy, Suspense, useMemo } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
// Carga diferida del fondo 3D para no bloquear el hilo principal
const ThreeBackground = lazy(() => import('./ThreeBackground'))

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
      color: i % 3 === 0 ? 'rgba(34, 197, 94, 0.4)' : 
             i % 3 === 1 ? 'rgba(249, 115, 22, 0.4)' : 'rgba(168, 85, 247, 0.4)'
    }))
  }, [isMobile])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Fondo 3D Three.js (solo desktop y si no se prefiere reducir movimiento) */}
      {!isMobile && (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) && (
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
      )}

      {/* Fondo mejorado para móviles con gradientes animados */}
      {isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.06) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(ellipse at 20% 30%, rgba(34, 197, 94, 0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(168, 85, 247, 0.03) 0%, transparent 60%)',
                'radial-gradient(ellipse at 60% 20%, rgba(249, 115, 22, 0.04) 0%, transparent 60%), radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.03) 0%, transparent 60%)',
                'radial-gradient(ellipse at 80% 50%, rgba(168, 85, 247, 0.04) 0%, transparent 60%), radial-gradient(ellipse at 20% 60%, rgba(249, 115, 22, 0.03) 0%, transparent 60%)'
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      )}

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
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight relative"
              animate={!isMobile ? {
                textShadow: [
                  '0 0 20px rgba(255,255,255,0.1)',
                  '0 0 30px rgba(34,197,94,0.2), 0 0 40px rgba(255,255,255,0.1)',
                  '0 0 20px rgba(255,255,255,0.1)'
                ]
              } : {}}
              transition={!isMobile ? {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              } : {}}
            >
              Transformamos tu negocio
              {/* Efecto de destello sutil - solo desktop */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                    transform: 'skewX(-20deg)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 2,
                    ease: 'easeInOut'
                  }}
                />
              )}
            </motion.h1>
            
            {/* "con" text con efecto pulsante sutil - simplificado para móvil */}
            <motion.div 
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mt-6 mb-10"
              animate={!isMobile ? {
                opacity: [0.8, 1, 0.8],
                scale: [0.99, 1.01, 0.99]
              } : { opacity: 1 }}
              transition={!isMobile ? {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              } : {}}
            >
              con
            </motion.div>

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
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-orange-500 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3), 0 0 20px rgba(249, 115, 22, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo('contact')}
            >
              <span className="relative z-10 flex items-center justify-center">
                Comenzar Ahora
                <motion.span
                  className="ml-2"
                  animate={!isMobile ? { x: [0, 3, 0] } : {}}
                  transition={!isMobile ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : {}}
                >
                  →
                </motion.span>
              </span>
              {/* Efecto de brillo animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-green-400 to-orange-400 rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(255,255,255,0.6)',
                boxShadow: '0 10px 30px rgba(255,255,255,0.1)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo('roi-calculator')}
            >
              <span className="flex items-center justify-center">
                Ver Demo
                <motion.span
                  className="ml-2 text-2xl"
                  animate={!isMobile ? { rotate: [0, 360] } : {}}
                  transition={!isMobile ? { duration: 4, repeat: Infinity, ease: "linear" } : {}}
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

