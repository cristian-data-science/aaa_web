import { motion } from 'framer-motion'
import { forwardRef } from 'react'

/**
 * SceneContainer - Contenedor base para escenas scroll-driven
 * 
 * Propiedades:
 * - children: Contenido de la escena
 * - className: Clases adicionales de Tailwind
 * - sceneId: ID único de la escena para navegación
 * - backgroundColor: Color de fondo (default: black)
 * - centerContent: Si es true, centra el contenido vertical y horizontalmente
 */
const SceneContainer = forwardRef(({ 
  children, 
  className = '', 
  sceneId,
  backgroundColor = 'bg-black',
  centerContent = true,
  ...props 
}, ref) => {
  return (
    <section
      ref={ref}
      id={sceneId}
      className={`
        relative w-full h-screen
        scroll-snap-align-start
        overflow-hidden
        ${backgroundColor}
        ${className}
      `}
      data-scene={sceneId}
      {...props}
    >
      {/* Contenedor con centrado opcional */}
      <div 
        className={`
          relative w-full h-full
          ${centerContent ? 'flex items-center justify-center' : ''}
        `}
      >
        {/* Contenido animado con Framer Motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1], // Cubic bezier suave
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
})

SceneContainer.displayName = 'SceneContainer'

export default SceneContainer
