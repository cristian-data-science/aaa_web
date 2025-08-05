import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const TechBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Generar líneas de conexión entre puntos
  const generateConnections = () => {
    const connections = []
    const points = [
      { x: 20, y: 20 }, { x: 80, y: 25 }, { x: 15, y: 60 }, 
      { x: 85, y: 70 }, { x: 50, y: 40 }, { x: 30, y: 80 },
      { x: 70, y: 15 }, { x: 25, y: 45 }, { x: 75, y: 55 }
    ]

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const distance = Math.sqrt(
          Math.pow(points[i].x - points[j].x, 2) + 
          Math.pow(points[i].y - points[j].y, 2)
        )
        
        if (distance < 40) { // Solo conectar puntos cercanos
          connections.push({
            x1: points[i].x,
            y1: points[i].y,
            x2: points[j].x,
            y2: points[j].y,
            id: `${i}-${j}`
          })
        }
      }
    }
    return connections
  }

  const connections = generateConnections()

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Red neuronal animada */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Líneas de conexión */}
        {connections.map((conn, index) => (
          <motion.line
            key={conn.id}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="url(#neuralGrad)"
            strokeWidth="0.1"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: index * 0.2 + Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Nodos neurales */}
        {[
          { x: 20, y: 20 }, { x: 80, y: 25 }, { x: 15, y: 60 }, 
          { x: 85, y: 70 }, { x: 50, y: 40 }, { x: 30, y: 80 },
          { x: 70, y: 15 }, { x: 25, y: 45 }, { x: 75, y: 55 }
        ].map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="0.3"
            fill="url(#neuralGrad)"
            filter="url(#glow)"
            animate={{
              r: ["0.2", "0.5", "0.2"],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Código binario flotante */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`binary-${i}`}
          className="absolute text-xs font-mono"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: Math.random() > 0.5 ? '#22c55e' : '#f97316',
            opacity: 0.1,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          {Array.from({ length: 8 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
        </motion.div>
      ))}

      {/* Partículas cuánticas */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`quantum-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '1px',
            height: '1px',
          }}
          animate={{
            scale: [0, 4, 0],
            opacity: [0, 1, 0],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                Math.random() > 0.33 ? '#22c55e' : 
                Math.random() > 0.5 ? '#f97316' : '#a855f7'
              } 0%, transparent 70%)`,
              boxShadow: '0 0 10px currentColor',
            }}
          />
        </motion.div>
      ))}

      {/* Ondas de escaneo */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`scan-${i}`}
          className="absolute top-0 w-full h-0.5 opacity-20"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              #22c55e 20%, 
              #f97316 50%, 
              #a855f7 80%, 
              transparent 100%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear"
          }}
        />
      ))}

      {/* Hologramas flotantes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`holo-${i}`}
          className="absolute"
          style={{
            left: `${15 + (i % 3) * 35}%`,
            top: `${25 + Math.floor(i / 3) * 50}%`,
            width: '60px',
            height: '60px',
          }}
          animate={{
            rotateY: [0, 360],
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div 
            className="w-full h-full border border-current rounded-lg"
            style={{
              color: i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#f97316' : '#a855f7',
              background: `linear-gradient(45deg, 
                transparent 30%, 
                currentColor 50%, 
                transparent 70%)`,
              opacity: 0.1,
            }}
          />
        </motion.div>
      ))}

      {/* Efecto de matriz de datos */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(34, 197, 94, 0.3) 2px,
              rgba(34, 197, 94, 0.3) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              rgba(249, 115, 22, 0.2) 20px,
              rgba(249, 115, 22, 0.2) 21px
            )
          `,
        }}
      />
    </div>
  )
}

export default TechBackground
