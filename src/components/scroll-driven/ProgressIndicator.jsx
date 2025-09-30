import { motion } from 'framer-motion'

/**
 * ProgressIndicator - Indicador de progreso lateral con dots
 * 
 * Props:
 * - activeScene: Índice de la escena activa
 * - scenes: Array de objetos { id, label }
 * - onSceneClick: Callback cuando se hace click en un dot
 */
const ProgressIndicator = ({ activeScene = 0, scenes = [], onSceneClick }) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
      aria-label="Scene navigation"
    >
      {scenes.map((scene, index) => (
        <button
          key={scene.id}
          onClick={() => onSceneClick(index)}
          className="group relative flex items-center justify-end"
          aria-label={`Go to ${scene.label}`}
          aria-current={activeScene === index ? 'true' : 'false'}
        >
          {/* Label tooltip */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="
              absolute right-8 px-3 py-1.5
              bg-black/90 backdrop-blur-md
              border border-neon-cyan/20
              rounded-md
              text-xs font-medium text-neon-cyan
              whitespace-nowrap
              pointer-events-none
            "
          >
            {scene.label}
          </motion.span>

          {/* Dot indicator */}
          <div className="relative">
            {/* Glow effect cuando está activo */}
            {activeScene === index && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-full bg-neon-cyan blur-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Dot principal */}
            <motion.div
              className={`
                relative w-3 h-3 rounded-full
                transition-all duration-300
                ${activeScene === index 
                  ? 'bg-neon-cyan shadow-neon-cyan' 
                  : 'bg-white/20 hover:bg-white/40'
                }
              `}
              animate={activeScene === index ? {
                scale: [1, 1.3, 1],
              } : {}}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
              }}
            />

            {/* Anillo exterior cuando está activo */}
            {activeScene === index && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-neon-cyan"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                  scale: 1.8,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            )}
          </div>

          {/* Línea conectora (excepto el último) */}
          {index < scenes.length - 1 && (
            <div 
              className={`
                absolute top-full left-1/2 -translate-x-1/2
                w-px h-4
                transition-colors duration-300
                ${activeScene >= index 
                  ? 'bg-neon-cyan/40' 
                  : 'bg-white/10'
                }
              `}
            />
          )}
        </button>
      ))}

      {/* Progress bar vertical */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 -z-10">
        <motion.div
          className="w-full bg-gradient-to-b from-neon-cyan/60 via-neon-purple/40 to-neon-green/60"
          style={{
            height: `${((activeScene + 1) / scenes.length) * 100}%`,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        />
      </div>
    </nav>
  )
}

export default ProgressIndicator
