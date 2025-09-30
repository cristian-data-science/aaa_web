import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Suspense, lazy } from 'react'

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
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Fondo 3D dinámico */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />
      }>
        <DynamicBackground3D />
      </Suspense>

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
            text-5xl md:text-7xl lg:text-8xl 
            font-bold 
            text-white 
            mb-6
            leading-tight
          "
        >
          Transformación Digital{' '}
          <span className="text-neon-green text-shadow-green">
            con IA
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="
            text-lg md:text-2xl lg:text-3xl 
            text-gray-300 
            mb-12
            max-w-4xl mx-auto
            leading-relaxed
          "
        >
          Automatización Inteligente, Datos y Machine Learning para impulsar tu negocio al futuro
        </motion.p>

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
              group
              px-8 py-4
              bg-neon-green text-black
              font-bold text-lg
              rounded-lg
              shadow-neon-green-lg
              hover:scale-105 hover:shadow-neon-green
              transition-all duration-300
              relative overflow-hidden
            "
          >
            <span className="relative z-10">Descubre nuestros servicios</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-green via-emerald-400 to-neon-lightGreen opacity-0 group-hover:opacity-30"
              animate={!prefersReducedMotion ? {
                x: ['-100%', '100%'],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </a>

          <a
            href="#contact"
            className="
              px-8 py-4
              border-2 border-neon-green/50
              text-neon-green
              font-bold text-lg
              rounded-lg
              hover:bg-neon-green/10 hover:border-neon-green
              transition-all duration-300
              backdrop-blur-sm
            "
          >
            Contactar
          </a>
        </motion.div>

        {/* Estadísticas rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="
            mt-20 mb-24
            grid grid-cols-3 gap-8
            max-w-3xl mx-auto
          "
        >
          {[
            { value: '500+', label: 'Proyectos' },
            { value: '95%', label: 'ROI Promedio' },
            { value: '24/7', label: 'Soporte' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span className="text-gray-300 text-sm font-mono">Scroll para explorar</span>
        <motion.div
          animate={!prefersReducedMotion ? {
            y: [0, 10, 0],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="w-6 h-6 text-neon-green" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroScene
