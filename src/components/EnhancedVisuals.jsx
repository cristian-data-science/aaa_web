import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

// Componente para efectos visuales mejorados globales
const EnhancedVisuals = () => {
  const containerRef = useRef(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll()
  
  // TODOS LOS HOOKS ANTES DE CUALQUIER LÓGICA CONDICIONAL
  // Parallax reducido o deshabilitado en móviles
  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -10] : [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -5] : [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.9, 0.7, 0.5])
  
  // Orbes flotantes calculados con useMemo SIN early returns
  const orbs = useMemo(() => {
    // En lugar de return [], devolver array con configuración condicional
    const count = isMobile ? 0 : 4
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: 120 + (i * 30),
      x: 15 + (i * 20) % 70,
      y: 20 + (i * 25) % 60,
      duration: 10 + (i * 2),
      delay: i * 2,
      opacity: 0.02 + (i * 0.005),
      color: i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#f97316' : '#a855f7'
    }))
  }, [isMobile])
  
  // useEffect SIN early returns - usar lógica condicional interna
  useEffect(() => {
    // Solo ejecutar en desktop
    if (!isMobile) {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        
        const moveX = (clientX - centerX) * 0.005
        const moveY = (clientY - centerY) * 0.005
        
        if (containerRef.current) {
          containerRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
        }
      }

      const throttledMouseMove = throttle(handleMouseMove, 32)
      window.addEventListener('mousemove', throttledMouseMove)
      return () => window.removeEventListener('mousemove', throttledMouseMove)
    }
    // En móviles, no hacer nada pero no return early
  }, [isMobile])

  // RENDERIZADO CONDICIONAL AL FINAL - Sin early return problemático
  // Version móvil ultra simplificada
  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Solo gradiente sutil para móviles */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(34, 197, 94, 0.03) 0%, transparent 70%)'
          }}
        />
        {/* Una partícula mínima - sin animación para máximo rendimiento */}
        <div
          className="absolute w-2 h-2 bg-green-400/10 rounded-full"
          style={{ left: '20%', top: '30%' }}
        />
      </div>
    )
  }

  // Version desktop completa
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Orbes de fondo con parallax */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color}${Math.floor(orb.opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            filter: 'blur(1px)',
            y: orb.id % 2 === 0 ? y1 : y2,
            opacity: opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [orb.opacity, orb.opacity * 1.5, orb.opacity],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Líneas de energía reducidas */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.05 }}>
        <defs>
          <linearGradient id="energyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {Array.from({ length: 2 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M ${i * 400} 0 L ${window.innerWidth + i * 300} ${window.innerHeight}`}
            stroke="url(#energyGrad1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </svg>

      {/* Efecto de escaneo reducido */}
      <motion.div
        className="absolute inset-x-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.2) 50%, transparent 100%)',
          filter: 'blur(0.5px)',
        }}
        animate={{
          top: ['0%', '100%']
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Partículas reducidas */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`data-particle-${i}`}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{
            y: [-10, 10],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Onda sutil */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(34,197,94,0.01) 60deg, transparent 120deg)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

// Utility function for throttling
function throttle(func, limit) {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export default EnhancedVisuals