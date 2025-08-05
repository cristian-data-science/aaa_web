import { motion, AnimatePresence } from 'framer-motion'
import TypewriterAnimation from './TypewriterAnimation'
import DatabaseAnimations from './DatabaseAnimations'
// import TechBackground from './TechBackground'
// import QuantumEffects from './QuantumEffects'
import { useState, useEffect, useMemo } from 'react'

const Hero = () => {
  // Función para scroll suave
  const handleScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // Valores fijos para partículas para evitar re-renders
  const particlesData = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 1 + Math.random() * 2,
      height: 1 + Math.random() * 2,
      xMovement: Math.random() * 30 - 15,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 8,
      color: Math.random() > 0.66 ? 'rgba(34, 197, 94, 0.6)' : 
             Math.random() > 0.5 ? 'rgba(249, 115, 22, 0.6)' : 'rgba(168, 85, 247, 0.6)'
    })), []
  )

  // Valores fijos para hexágonos
  const hexagonsData = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 10 + (i % 4) * 25,
      top: 20 + Math.floor(i / 4) * 60,
      duration: 20 + i * 3,
      delay: i * 1.5,
      color: i % 3 === 0 ? '#22C55E' : i % 3 === 1 ? '#F97316' : '#A855F7'
    })), []
  )

  // Valores fijos para partículas de datos
  const dataParticlesData = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 90,
      top: Math.random() * 90,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 8,
      text: Math.random() > 0.5 ? '101' : '010'
    })), []
  )

  // Valores fijos para ondas de energía
  const energyWavesData = useMemo(() => 
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: 30 + i * 25,
      y: 40 + i * 20,
      duration: 8 + i * 2,
      delay: i * 2
    })), []
  )

  // Valores fijos para pulsos de energía
  const energyPulsesData = useMemo(() => [
    { id: 'top-left', position: 'top-0 left-0', duration: 15, delay: 0 },
    { id: 'top-right', position: 'top-0 right-0', duration: 18, delay: 1 },
    { id: 'bottom-left', position: 'bottom-0 left-0', duration: 21, delay: 2 },
    { id: 'bottom-right', position: 'bottom-0 right-0', duration: 24, delay: 3 }
  ], [])

  // Valores fijos para líneas de escaneado
  const scanLinesData = useMemo(() => 
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      left: 25 + i * 25,
      duration: 4 + i,
      delay: i * 1.5
    })), []
  )

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Componente de fondo tecnológico avanzado */}
      {/* <TechBackground /> */}
      
      {/* Efectos cuánticos ultra avanzados */}
      {/* <QuantumEffects /> */}
      
      {/* Fondo tecnológico ultra moderno */}
      <div className="absolute inset-0 pointer-events-none tech-scanlines">
        {/* Grid tecnológico de fondo */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Líneas de circuito */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          {/* Líneas horizontales */}
          <motion.path
            d="M 0 200 L 300 200 L 320 220 L 500 220 L 520 200 L 800 200 L 820 180 L 1200 180"
            stroke="url(#circuitGrad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 0 400 L 200 400 L 220 380 L 400 380 L 420 400 L 600 400 L 620 420 L 1200 420"
            stroke="url(#circuitGrad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
          />
          <motion.path
            d="M 0 600 L 150 600 L 170 580 L 350 580 L 370 600 L 550 600 L 570 580 L 1200 580"
            stroke="url(#circuitGrad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 4 }}
          />
          {/* Líneas verticales */}
          <motion.path
            d="M 200 0 L 200 150 L 220 170 L 220 300 L 200 320 L 200 800"
            stroke="url(#circuitGrad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <motion.path
            d="M 600 0 L 600 120 L 580 140 L 580 250 L 600 270 L 600 800"
            stroke="url(#circuitGrad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 3 }}
          />
          <motion.path
            d="M 1000 0 L 1000 100 L 1020 120 L 1020 280 L 1000 300 L 1000 800"
            stroke="url(#circuitGrad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 5 }}
          />
          
          {/* Nodos de conexión con animación más suave */}
          <motion.circle cx="220" cy="380" r="3" fill="#22c55e" opacity="0.3"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          />
          <motion.circle cx="580" cy="420" r="3" fill="#f97316" opacity="0.3"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6.5, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          />
          <motion.circle cx="1020" cy="180" r="3" fill="#a855f7" opacity="0.3"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Partículas flotantes optimizadas */}
        {particlesData.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.width}px`,
              height: `${particle.height}px`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, particle.xMovement, 0],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: particle.color,
                boxShadow: '0 0 8px currentColor',
              }}
            />
          </motion.div>
        ))}

        {/* Hexágonos tecnológicos optimizados */}
        {hexagonsData.map((hex) => (
          <motion.div
            key={`hex-${hex.id}`}
            className="absolute"
            style={{
              left: `${hex.left}%`,
              top: `${hex.top}%`,
              width: '40px',
              height: '40px',
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: hex.duration,
              repeat: Infinity,
              ease: "linear",
              delay: hex.delay,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,5 85,25 85,75 50,95 15,75 15,25"
                fill="none"
                stroke={hex.color}
                strokeWidth="1"
                opacity="0.4"
              />
            </svg>
          </motion.div>
        ))}

        {/* Ondas de energía optimizadas */}
        {energyWavesData.map((wave) => (
          <motion.div
            key={`wave-${wave.id}`}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${wave.x}% ${wave.y}%, 
                rgba(34, 197, 94, 0.02) 0%, 
                transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: wave.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: wave.delay,
            }}
          />
        ))}

        {/* Partículas de datos optimizadas */}
        {dataParticlesData.map((particle) => (
          <motion.div
            key={`data-${particle.id}`}
            className="absolute text-xs font-mono opacity-20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              color: '#22c55e',
            }}
            animate={{
              opacity: [0, 0.4, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          >
            {particle.text}
          </motion.div>
        ))}

        {/* Animaciones de tablas de base de datos */}
        {/* <DatabaseAnimations /> */}
        
        {/* Efecto de matriz 3D */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at top left, rgba(34, 197, 94, 0.02) 0%, transparent 50%),
              radial-gradient(ellipse at top right, rgba(249, 115, 22, 0.02) 0%, transparent 50%),
              radial-gradient(ellipse at bottom left, rgba(168, 85, 247, 0.02) 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, rgba(34, 197, 94, 0.02) 0%, transparent 50%)
            `,
          }}
        />

        {/* Pulsos de energía optimizados */}
        {energyPulsesData.map((pulse) => (
          <motion.div
            key={`pulse-${pulse.id}`}
            className={`absolute w-32 h-32 ${pulse.position}`}
            style={{
              background: `conic-gradient(from 0deg, 
                rgba(34, 197, 94, 0.1), 
                rgba(249, 115, 22, 0.1), 
                rgba(168, 85, 247, 0.1), 
                transparent)`,
              borderRadius: '50%',
              filter: 'blur(20px)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: pulse.duration,
              repeat: Infinity,
              ease: "linear",
              delay: pulse.delay,
            }}
          />
        ))}

        {/* Interfaz HUD futurista con animaciones más suaves */}
        <div className="absolute top-4 left-4 opacity-20">
          <div className="text-xs font-mono text-green-400 space-y-1">
            <motion.div
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              DATACEF_OS v3.7.2
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
            >
              STATUS: ONLINE
            </motion.div>
            <motion.div
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
            >
              AI_CORES: 8/8 ACTIVE
            </motion.div>
          </div>
        </div>

        {/* HUD derecha con animaciones más suaves */}
        <div className="absolute top-4 right-4 opacity-20">
          <div className="text-xs font-mono text-orange-400 text-right space-y-1">
            <motion.div
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              NEURAL_NET: 99.7%
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3.7, repeat: Infinity, delay: 0.8, ease: "easeInOut" }}
            >
              QUANTUM_PROC: STABLE
            </motion.div>
            <motion.div
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 4.1, repeat: Infinity, delay: 1.6, ease: "easeInOut" }}
            >
              AUTOMATION: READY
            </motion.div>
          </div>
        </div>

        {/* Elementos de diagnóstico con animaciones más suaves */}
        <div className="absolute bottom-4 left-4 opacity-15">
          <div className="text-xs font-mono text-purple-400 space-y-1">
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              └─ SYS_INIT: COMPLETE
            </motion.div>
            <motion.div
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
            >
              └─ ML_ENGINE: LOADED
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 opacity-15">
          <div className="text-xs font-mono text-cyan-400 text-right space-y-1">
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              UPTIME: 99.99%
            </motion.div>
            <motion.div
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 4.8, repeat: Infinity, delay: 1.2, ease: "easeInOut" }}
            >
              CONN: SECURE
            </motion.div>
          </div>
        </div>

        {/* Líneas de escaneado verticales optimizadas */}
        {scanLinesData.map((scan) => (
          <motion.div
            key={`vscan-${scan.id}`}
            className="absolute left-0 w-0.5 h-full opacity-10"
            style={{
              left: `${scan.left}%`,
              background: `linear-gradient(180deg, 
                transparent 0%, 
                #22c55e 20%, 
                #f97316 50%, 
                #a855f7 80%, 
                transparent 100%)`,
              filter: 'blur(1px)',
            }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: scan.duration,
              repeat: Infinity,
              delay: scan.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading - Más espaciado del nav */}
          <motion.div
            className="mb-12 mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Transformamos tu negocio
            </h1>
            
            {/* "con" text con más espaciado */}
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mt-6 mb-10">
              con
            </div>

            {/* Typewriter Animation - Centered */}
            <div className="flex justify-center items-center min-h-[100px]">
              <TypewriterAnimation />
              {/* <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-green-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
                Inteligencia Artificial
              </div> */}
            </div>
          </motion.div>

          {/* Subtitle - Centered */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Liberamos el potencial humano con soluciones que aprenden, se adaptan y generan resultados medibles.
          </motion.p>

          {/* CTA Buttons - Centered */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-orange-500 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo('contact')}
            >
              <span className="relative z-10 flex items-center justify-center">
                Comenzar Ahora
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo('roi-calculator')}
            >
              <span className="flex items-center justify-center">
                Ver Demo
                <motion.span
                  className="ml-2 text-2xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  ⚡
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

