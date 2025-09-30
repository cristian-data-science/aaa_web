import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * LogoIntro - Animación de construcción del logo DataCEF
 * Secuencia: Cuadrado → Trapecio Izq → Trapecio Der → Texto "DataCEF"
 * Luego se mueve hacia arriba-izquierda a su posición final
 * Layout: SIEMPRE horizontal (desktop y móvil)
 */
const LogoIntro = ({ onComplete }) => {
  const [sequence, setSequence] = useState('building') // 'building' → 'moving' → 'complete'
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    // Después de que termine la construcción (1.6s), iniciar movimiento
    const buildTimer = setTimeout(() => {
      setSequence('moving')
    }, 1800)

    // Después del movimiento (0.8s), completar
    const completeTimer = setTimeout(() => {
      setSequence('complete')
      onComplete?.()
    }, 2800)

    return () => {
      clearTimeout(buildTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  // Variantes de animación para el contenedor
  const containerVariants = {
    building: {
      x: 0,
      y: 0,
      scale: isMobile ? 0.7 : 1, // Más pequeño en móvil durante construcción
      transition: { duration: 0 }
    },
    moving: {
      x: isMobile ? 'calc(-50vw + 80px)' : 'calc(-50vw + 124px)', // Ajustado para móvil
      y: isMobile ? 'calc(-50vh + 35px)' : 'calc(-50vh + 44px)',   // Ajustado para móvil
      scale: isMobile ? 0.45 : 0.62, // Escala menor en móvil
      transition: {
        duration: isMobile ? 0.5 : 0.7, // Más rápido en móvil
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    complete: {
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: sequence === 'complete' ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ pointerEvents: sequence === 'complete' ? 'none' : 'auto' }}
    >
      <motion.div
        variants={containerVariants}
        initial="building"
        animate={sequence}
        className="flex items-center justify-center"
      >
        {isMobile ? (
          /* MOBILE: Layout horizontal forzado con flexbox */
          <div className="flex items-center gap-2" style={{ height: '70px' }}>
            {/* SVG SOLO formas */}
            <svg
              width="130"
              height="70"
              viewBox="0 0 126.3 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_30px_rgba(0,255,136,0.7)] flex-shrink-0"
            >
              <defs>
                <style>{`
                  .logo-shape {
                    fill: #00ff88;
                  }
                `}</style>
              </defs>

              <g>
                <motion.path
                  className="logo-shape"
                  d="M 94.7 63.1 h 31.6 v -31.6 h -31.6 v 31.6 Z"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                />
                
                <motion.path
                  className="logo-shape"
                  d="M 47.3 31.6 v 31.6 l 47.3 -31.6 V 0 l -47.3 31.6 Z"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
                />

                <motion.path
                  className="logo-shape"
                  d="M 0 31.6 v 31.6 l 47.3 -31.6 V 0 L 0 31.6 Z"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7, ease: "easeOut" }}
                />
              </g>
            </svg>

            {/* Texto HTML separado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.0, ease: "easeOut" }}
              className="drop-shadow-[0_0_30px_rgba(0,255,136,0.7)] flex-shrink-0"
              style={{
                fontSize: '46px',
                fontWeight: '500',
                color: '#ffffff',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                letterSpacing: '0.5px',
                lineHeight: '70px',
                whiteSpace: 'nowrap'
              }}
            >
              DataCEF
            </motion.div>
          </div>
        ) : (
          /* DESKTOP: SVG completo con dimensiones 320×58 (con scale:0.62 = ~200×36 ≈ Logo default) */
          <svg
            width={320}
            height={58}
            viewBox="0 0 385.6 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_30px_rgba(0,255,136,0.7)]"
          >
          <defs>
            <style>{`
              .logo-shape {
                fill: #00ff88;
              }
              .logo-text {
                fill: #ffffff;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                font-size: 42.4px;
                font-weight: 500;
                letter-spacing: 0.5px;
              }
            `}</style>
          </defs>

          <g>
            {/* Forma 3: Cuadrado (aparece PRIMERO - derecha) */}
            <motion.path
              className="logo-shape"
              d="M 94.7 63.1 h 31.6 v -31.6 h -31.6 v 31.6 Z"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1
              }}
              transition={{ 
                duration: 0.3, 
                delay: 0.1,
                ease: "easeOut"
              }}
            />
            
            {/* Forma 2: Trapecio central (aparece SEGUNDO - centro) */}
            <motion.path
              className="logo-shape"
              d="M 47.3 31.6 v 31.6 l 47.3 -31.6 V 0 l -47.3 31.6 Z"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1
              }}
              transition={{ 
                duration: 0.3, 
                delay: 0.4,
                ease: "easeOut"
              }}
            />

            {/* Forma 1: Trapecio izquierdo (aparece TERCERO - izquierda) */}
            <motion.path
              className="logo-shape"
              d="M 0 31.6 v 31.6 l 47.3 -31.6 V 0 L 0 31.6 Z"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1
              }}
              transition={{ 
                duration: 0.3, 
                delay: 0.7,
                ease: "easeOut"
              }}
            />
          </g>

          {/* Texto "DataCEF" (aparece ÚLTIMO) */}
          <motion.text
            className="logo-text"
            transform="translate(134.1 59.5)"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1
            }}
            transition={{ 
              duration: 0.4, 
              delay: 1.0,
              ease: "easeOut"
            }}
          >
            <tspan x="0" y="0">DataCEF</tspan>
          </motion.text>
        </svg>
        )}
      </motion.div>
    </motion.div>
  )
}

export default LogoIntro
