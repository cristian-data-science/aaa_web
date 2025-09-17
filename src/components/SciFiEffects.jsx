import { motion } from 'framer-motion'
import { useMemo } from 'react'

// Componente centralizado para efectos de ciencia ficción y alta tecnología
const SciFiEffects = ({ variant = 'default', intensity = 'medium', className = '' }) => {
  
  // Configuración de intensidad
  const intensityConfig = useMemo(() => {
    const configs = {
      low: { particles: 8, scanLines: 2, glowOpacity: 0.3, animationSpeed: 0.8 },
      medium: { particles: 12, scanLines: 3, glowOpacity: 0.5, animationSpeed: 1 },
      high: { particles: 18, scanLines: 4, glowOpacity: 0.7, animationSpeed: 1.3 },
      ultra: { particles: 24, scanLines: 6, glowOpacity: 0.9, animationSpeed: 1.6 }
    }
    return configs[intensity] || configs.medium
  }, [intensity])

  // Partículas de datos flotantes
  const dataParticles = useMemo(() => {
    return Array.from({ length: intensityConfig.particles }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      color: ['#00ffff', '#ff00ff', '#00ff40', '#4080ff', '#ffff00'][i % 5],
      type: ['binary', 'hex', 'circuit', 'pulse'][i % 4]
    }))
  }, [intensityConfig.particles])

  // Líneas de circuito
  const circuitLines = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      path: i % 2 === 0 ? 'horizontal' : 'vertical',
      position: 15 + i * 15,
      width: i % 3 === 0 ? 2 : 1,
      color: ['#00ffff', '#ff00ff', '#00ff40'][i % 3],
      delay: i * 0.5
    }))
  }, [])

  const renderHolographicOverlay = () => (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Grid holográfico de fondo */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Partículas de datos flotantes */}
      {dataParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.4, intensityConfig.glowOpacity, 0.4],
            rotate: [0, 360],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: particle.duration * intensityConfig.animationSpeed,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-full h-full rounded-full animate-quantum-flicker"
            style={{
              background: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
              filter: 'blur(0.5px)',
            }}
          />
          {particle.type === 'binary' && (
            <div 
              className="absolute -top-2 -left-1 text-xs font-mono opacity-60"
              style={{ color: particle.color, fontSize: '6px' }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          )}
        </motion.div>
      ))}

      {/* Líneas de circuito */}
      {circuitLines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute"
          style={{
            [line.path === 'horizontal' ? 'top' : 'left']: `${line.position}%`,
            [line.path === 'horizontal' ? 'left' : 'top']: '0',
            [line.path === 'horizontal' ? 'width' : 'height']: '100%',
            [line.path === 'horizontal' ? 'height' : 'width']: `${line.width}px`,
            background: `linear-gradient(${line.path === 'horizontal' ? '90deg' : '0deg'}, 
              transparent 0%, 
              ${line.color} 20%, 
              ${line.color} 80%, 
              transparent 100%)`,
            opacity: intensityConfig.glowOpacity * 0.6,
          }}
          animate={{
            opacity: [0.2, intensityConfig.glowOpacity * 0.8, 0.2],
            filter: [
              'brightness(0.8) hue-rotate(0deg)',
              'brightness(1.2) hue-rotate(180deg)',
              'brightness(0.8) hue-rotate(360deg)'
            ]
          }}
          transition={{
            duration: 4 * intensityConfig.animationSpeed,
            repeat: Infinity,
            delay: line.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Líneas de escaneo */}
      {Array.from({ length: intensityConfig.scanLines }).map((_, i) => (
        <motion.div
          key={`scan-${i}`}
          className="absolute w-full"
          style={{
            height: 2,
            background: 'linear-gradient(90deg, transparent 0%, #00ffff 25%, #ffffff 50%, #00ffff 75%, transparent 100%)',
            boxShadow: '0 0 10px #00ffff',
            filter: 'blur(0.5px)',
          }}
          animate={{
            top: ['0%', '100%'],
            opacity: [0, intensityConfig.glowOpacity, 0],
          }}
          transition={{
            duration: 6 / intensityConfig.animationSpeed,
            repeat: Infinity,
            delay: i * 2,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )

  const renderNeuralNetwork = () => (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Red neuronal de fondo */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`neural-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i * 15) % 60}%`,
              width: 8,
              height: 8,
            }}
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.4, intensityConfig.glowOpacity, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 * intensityConfig.animationSpeed,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle, #00ff40 0%, #22c55e 50%, transparent 100%)',
                boxShadow: '0 0 16px #00ff40',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Conexiones neuronales */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff40" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ff40" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.path
            key={`connection-${i}`}
            d={`M ${20 + i * 8}% ${30 + (i * 10) % 40}% L ${60 + i * 5}% ${50 + (i * 8) % 30}%`}
            stroke="url(#neuralGradient)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, intensityConfig.glowOpacity, 0] 
            }}
            transition={{
              duration: 4 * intensityConfig.animationSpeed,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  )

  const renderQuantumField = () => (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Campo cuántico base */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,255,255,0.1) 60deg, transparent 120deg, rgba(255,0,255,0.1) 180deg, transparent 240deg, rgba(0,255,64,0.1) 300deg, transparent 360deg)',
          opacity: intensityConfig.glowOpacity * 0.7,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 30 / intensityConfig.animationSpeed,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Ondas cuánticas */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`quantum-${i}`}
          className="absolute"
          style={{
            left: `${25 + i * 15}%`,
            top: `${25 + i * 15}%`,
            width: 100 + i * 20,
            height: 100 + i * 20,
            border: `2px solid ${['#00ffff', '#ff00ff', '#00ff40', '#4080ff'][i]}`,
            borderRadius: '50%',
            opacity: intensityConfig.glowOpacity * 0.5,
          }}
          animate={{
            scale: [0.8, 1.5, 0.8],
            rotate: [0, 360],
            opacity: [0.2, intensityConfig.glowOpacity * 0.8, 0.2],
          }}
          transition={{
            duration: 8 * intensityConfig.animationSpeed,
            repeat: Infinity,
            delay: i * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )

  const renderDataStream = () => (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Flujo de datos */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-1 h-20 opacity-60"
          style={{
            left: `${15 + i * 15}%`,
            background: `linear-gradient(180deg, transparent 0%, ${['#00ffff', '#ff00ff', '#00ff40'][i % 3]} 50%, transparent 100%)`,
            boxShadow: `0 0 8px ${['#00ffff', '#ff00ff', '#00ff40'][i % 3]}`,
          }}
          animate={{
            y: ['-100px', '100vh'],
            opacity: [0, intensityConfig.glowOpacity, 0],
          }}
          transition={{
            duration: 4 / intensityConfig.animationSpeed,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'linear',
          }}
        />
      ))}

      {/* Código matricial */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`matrix-${i}`}
          className="absolute font-mono text-xs"
          style={{
            left: `${10 + i * 11}%`,
            color: '#00ff40',
            opacity: intensityConfig.glowOpacity * 0.7,
            textShadow: '0 0 8px #00ff40',
          }}
          animate={{
            y: ['-50px', '100vh'],
            opacity: [0, intensityConfig.glowOpacity * 0.8, 0],
          }}
          transition={{
            duration: 6 / intensityConfig.animationSpeed,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 8 }).map((_, j) => (
            <div key={j} className="leading-tight">
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )

  // Selector de variante
  const variants = {
    holographic: renderHolographicOverlay,
    neural: renderNeuralNetwork,
    quantum: renderQuantumField,
    datastream: renderDataStream,
    default: renderHolographicOverlay
  }

  return variants[variant]?.() || variants.default()
}

export default SciFiEffects