import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import TypewriterAnimation from '../TypewriterAnimation'

const DynamicBackground3D = lazy(() => import('../scroll-driven/DynamicBackground3D'))

/**
 * HeroScene - Escena inicial a pantalla completa
 * 
 * Características:
 * - Fondo 3D con partículas y geometrías morfables
 * - Título y subtítulo animados progresivamente
 * - CTA prominente
 * - Indicador de scroll
 */
const HeroScene = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  // Reducir cantidad de partículas en móvil
  const particleCount = {
    green: isMobile ? 8 : 15,
    cyan: isMobile ? 5 : 10,
    energy: isMobile ? 2 : 3
  }

  // Variantes de animación para texto
  const titleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.5,
      }
    }
  }

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.8,
      }
    }
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-12 md:py-20">
      {/* Fondo 3D dinámico */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />
      }>
        <DynamicBackground3D />
      </Suspense>

      {/* Partículas sutiles flotantes - Solo si no hay reduced motion */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Partículas verdes pequeñas */}
          {Array.from({ length: particleCount.green }).map((_, i) => (
            <motion.div
              key={`particle-green-${i}`}
              className="absolute w-1 h-1 bg-neon-green rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(1px)',
                opacity: 0.4,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Partículas cyan más sutiles */}
          {Array.from({ length: particleCount.cyan }).map((_, i) => (
            <motion.div
              key={`particle-cyan-${i}`}
              className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.5px)',
                opacity: 0.3,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 15 - 7.5, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 5 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear',
              }}
            />
          ))}

          {/* Círculos de energía sutiles */}
          {Array.from({ length: particleCount.energy }).map((_, i) => (
            <motion.div
              key={`energy-${i}`}
              className="absolute rounded-full border border-neon-green/20"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.15, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Logo o marca (opcional) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-neon-green text-sm font-mono tracking-wider">
            DATACEF
          </span>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="
            text-5xl md:text-6xl lg:text-7xl 
            font-bold 
            text-white 
            mb-2
            leading-tight
          "
        >
          Transformamos tu negocio
          <br />
          <span className="text-5xl md:text-6xl lg:text-7xl">con</span>
        </motion.h1>

        {/* Typewriter Animation */}
        <div className="mb-12">
          <TypewriterAnimation />
        </div>

        {/* CTAs */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#services"
            className="
              px-8 py-4
              bg-white text-black
              font-bold text-lg
              rounded-lg
              shadow-[0_0_20px_rgba(255,255,255,0.4)]
              hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]
              hover:bg-gray-100
              transition-all duration-300
            "
          >
            <span className="font-extrabold">Descubre nuestros servicios</span>
          </a>

          <a
            href="#contact"
            className="
              px-8 py-4
              bg-white text-black
              font-bold text-lg
              rounded-lg
              shadow-[0_0_20px_rgba(255,255,255,0.4)]
              hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]
              hover:bg-gray-100
              transition-all duration-300
            "
          >
            <span className="font-extrabold">Contactar</span>
          </a>
        </motion.div>

        {/* Estadísticas rápidas - Tarjetas individuales con estilo futurista */}
        <div className="mt-20 mb-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-20">
          {[
            { value: '500+', label: 'Proyectos', delay: 1.2, color: 'from-emerald-500/20 to-green-500/20', borderColor: 'border-emerald-400/50', shadowColor: 'rgba(16,185,129,0.4)' },
            { value: '95%', label: 'ROI Promedio', delay: 1.4, color: 'from-cyan-500/20 to-blue-500/20', borderColor: 'border-cyan-400/50', shadowColor: 'rgba(34,211,238,0.4)' },
            { value: '24/7', label: 'Soporte', delay: 1.6, color: 'from-purple-500/20 to-pink-500/20', borderColor: 'border-purple-400/50', shadowColor: 'rgba(168,85,247,0.4)' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: stat.delay,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className={`
                relative
                bg-gradient-to-br ${stat.color}
                backdrop-blur-xl
                border-2 ${stat.borderColor}
                rounded-2xl
                p-6
                text-center
                overflow-hidden
                group
                cursor-pointer
              `}
              style={{
                boxShadow: `0 0 30px ${stat.shadowColor}, inset 0 0 20px rgba(255,255,255,0.05)`
              }}
            >
              {/* Efecto de brillo animado en hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Partículas decorativas en las esquinas */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              {/* Contenido */}
              <div className="relative z-10">
                <motion.div 
                  className="text-5xl md:text-6xl font-black text-white mb-2"
                  style={{
                    textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px currentColor'
                  }}
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255,255,255,0.5)',
                      '0 0 30px rgba(255,255,255,0.8)',
                      '0 0 20px rgba(255,255,255,0.5)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm md:text-base text-white/90 font-semibold tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
              
              {/* Borde inferior con efecto neón */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroScene
