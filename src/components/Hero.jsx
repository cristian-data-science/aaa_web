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
      color: i % 3 === 0 ? 'rgba(22, 163, 74, 0.4)' : 
             i % 3 === 1 ? 'rgba(134, 239, 172, 0.35)' : 'rgba(16, 185, 129, 0.3)'
    }))
  }, [isMobile])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
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
                linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(ellipse at 20% 30%, rgba(187, 247, 208, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(134, 239, 172, 0.3) 0%, transparent 60%)',
                'radial-gradient(ellipse at 60% 20%, rgba(236, 253, 245, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 40% 80%, rgba(187, 247, 208, 0.3) 0%, transparent 60%)',
                'radial-gradient(ellipse at 80% 50%, rgba(110, 231, 183, 0.35) 0%, transparent 60%), radial-gradient(ellipse at 20% 60%, rgba(236, 253, 245, 0.35) 0%, transparent 60%)'
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
              className="text-5xl md:text-6xl lg:text-7xl font-black text-emerald-950 leading-tight relative"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
              animate={!isMobile ? {
                textShadow: [
                  '2px 2px 4px rgba(0,0,0,0.1), 0 0 20px rgba(15,118,110,0.3)',
                  '2px 2px 4px rgba(0,0,0,0.15), 0 0 30px rgba(15,118,110,0.4), 0 0 40px rgba(5,150,105,0.2)',
                  '2px 2px 4px rgba(0,0,0,0.1), 0 0 20px rgba(15,118,110,0.3)'
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
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(209, 250, 229, 0.7) 50%, transparent 100%)',
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
              className="text-5xl md:text-6xl lg:text-7xl font-black text-emerald-900 mt-6 mb-10"
              style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
              animate={!isMobile ? {
                opacity: [0.9, 1, 0.9],
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
            <div className="flex justify-center items-end min-h-[120px] md:min-h-[160px] pb-4">
              <TypewriterAnimation />
              {/* <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-green-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
                Inteligencia Artificial
              </div> */}
            </div>
          </motion.div>

          {/* Subtitle - Centered */}
          <motion.p 
            className="text-xl md:text-2xl text-emerald-800 mb-12 leading-relaxed max-w-3xl mx-auto text-center font-medium"
            style={{
              textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
            }}
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
            <div className="gradient-border-wrapper rounded-xl">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white font-bold rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(15, 118, 110, 0.4), 0 0 30px rgba(5, 150, 105, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScrollTo('contact')}
              >
              <span className="relative z-10 flex items-center justify-center">
                Conversemos
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
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 rounded-xl opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300"
              />
            </motion.button>
            </div>

            <div className="gradient-border-wrapper rounded-xl">
              <motion.button
                className="px-8 py-4 border-2 border-emerald-700 text-emerald-900 font-bold rounded-xl text-lg hover:bg-emerald-100 hover:border-emerald-800 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group bg-white/80"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(15,118,110,0.8)',
                  boxShadow: '0 10px 30px rgba(15,118,110,0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScrollTo('services')}
              >
              <span className="flex items-center justify-center">
                Nuestros Servicios
                <motion.span
                  className="ml-2 text-2xl"
                  animate={!isMobile ? { rotate: [0, 360] } : {}}
                  transition={!isMobile ? { duration: 4, repeat: Infinity, ease: "linear" } : {}}
                >
                  ⚡
                </motion.span>
              </span>
            </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
