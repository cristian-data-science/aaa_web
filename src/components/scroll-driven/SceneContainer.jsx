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
        relative w-full h-screen min-h-screen
        snap-start snap-always
        overflow-hidden
        ${backgroundColor}
        ${className}
      `}
      data-scene={sceneId}
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
      {...props}
    >
      {/* Contenedor con centrado opcional */}
      <div 
        className={`
          relative w-full h-full
          ${centerContent ? 'flex items-center justify-center' : ''}
        `}
      >
        {children}
      </div>
    </section>
  )
})

SceneContainer.displayName = 'SceneContainer'

export default SceneContainer
