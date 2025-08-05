import { motion } from 'framer-motion'

const QuantumEffects = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Efecto de teletransporte cuántico */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`quantum-portal-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + i * 15}%`,
            width: '8px',
            height: '8px',
          }}
          animate={{
            scale: [0, 2, 0],
            rotate: [0, 360],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 1.2 + Math.random() * 3,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-full h-full rounded-full border-2"
            style={{
              borderColor: i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#f97316' : '#a855f7',
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#f97316' : '#a855f7'
              }20 0%, transparent 70%)`,
              boxShadow: `0 0 20px ${
                i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#f97316' : '#a855f7'
              }50`,
            }}
          />
        </motion.div>
      ))}

      {/* Ondas cuánticas */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`quantum-wave-${i}`}
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at ${30 + i * 25}% ${40 + i * 20}%, 
                rgba(34, 197, 94, 0.01) 0%, 
                transparent 40%)`,
              `radial-gradient(circle at ${30 + i * 25}% ${40 + i * 20}%, 
                rgba(249, 115, 22, 0.02) 0%, 
                transparent 60%)`,
              `radial-gradient(circle at ${30 + i * 25}% ${40 + i * 20}%, 
                rgba(168, 85, 247, 0.01) 0%, 
                transparent 40%)`
            ],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 3,
          }}
        />
      ))}

      {/* Partículas de energía */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`energy-particle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '2px',
            height: '2px',
          }}
          animate={{
            x: [0, Math.random() * 400 - 200],
            y: [0, Math.random() * 400 - 200],
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `${
                Math.random() > 0.33 ? '#22c55e' : 
                Math.random() > 0.5 ? '#f97316' : '#a855f7'
              }`,
              boxShadow: '0 0 8px currentColor',
              filter: 'blur(0.5px)',
            }}
          />
        </motion.div>
      ))}

      {/* Interferencias cuánticas */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`interference-${i}`}
          className="absolute"
          style={{
            left: `${25 * i}%`,
            top: '50%',
            width: '1px',
            height: '200px',
            transform: 'translateY(-50%)',
          }}
          animate={{
            scaleY: [0, 1, 0.3, 1, 0],
            opacity: [0, 0.6, 0.2, 0.6, 0],
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: `linear-gradient(180deg, 
                transparent 0%,
                ${i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#f97316' : '#a855f7'}40 30%,
                ${i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#f97316' : '#a855f7'}80 50%,
                ${i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#f97316' : '#a855f7'}40 70%,
                transparent 100%)`,
              filter: 'blur(1px)',
            }}
          />
        </motion.div>
      ))}

      {/* Campo de fuerza */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 0deg at 50% 50%, 
              transparent 0deg, 
              rgba(34, 197, 94, 0.01) 60deg, 
              transparent 120deg,
              rgba(249, 115, 22, 0.01) 180deg,
              transparent 240deg,
              rgba(168, 85, 247, 0.01) 300deg,
              transparent 360deg)
          `,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Distorsiones del espacio-tiempo */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`distortion-${i}`}
          className="absolute"
          style={{
            left: `${15 + (i % 3) * 35}%`,
            top: `${30 + Math.floor(i / 3) * 40}%`,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
          }}
          animate={{
            scale: [1, 1.3, 0.7, 1],
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.8,
          }}
        >
          <div 
            className="w-full h-full border border-current"
            style={{
              color: i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#f97316' : '#a855f7',
              background: `radial-gradient(circle, 
                currentColor 0%, 
                transparent 30%, 
                currentColor 60%, 
                transparent 100%)`,
              opacity: 0.1,
              filter: 'blur(2px)',
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default QuantumEffects
