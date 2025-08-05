import { motion } from 'framer-motion'
import { useMemo } from 'react'

const HeroBackground = () => {
  // Valores ultra simplificados para evitar parpadeos
  const particlesData = useMemo(() => 
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      left: 20 + i * 30,
      top: 30 + i * 20,
      duration: 25 + i * 5,
      delay: i * 4,
    })), []
  )

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {/* Grid tecnológico simplificado */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Líneas de circuito ultra simplificadas */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="heroCircuitGradSimple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Solo líneas estáticas sin animación */}
        <path
          d="M 0 250 L 1200 250"
          stroke="url(#heroCircuitGradSimple)"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 0 450 L 1200 450"
          stroke="url(#heroCircuitGradSimple)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M 400 0 L 400 800"
          stroke="url(#heroCircuitGradSimple)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M 800 0 L 800 800"
          stroke="url(#heroCircuitGradSimple)"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
        
        {/* Nodos estáticos sin animación */}
        <circle cx="400" cy="250" r="2" fill="#22c55e" opacity="0.3" />
        <circle cx="800" cy="450" r="2" fill="#f97316" opacity="0.3" />
      </svg>

      {/* Solo 3 partículas muy sutiles */}
      {particlesData.map((particle) => (
        <motion.div
          key={`particle-simple-${particle.id}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: 'rgba(34, 197, 94, 0.2)',
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Efecto de matriz muy sutil */}
      <div 
        className="absolute inset-0 opacity-[0.01]"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.05) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  )
}

export default HeroBackground
