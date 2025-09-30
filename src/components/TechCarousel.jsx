import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Componentes de iconos SVG
 */
const N8nIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <rect width="120" height="120" rx="24" fill="currentColor"/>
    <text x="60" y="80" fontSize="60" fontWeight="bold" fill="white" textAnchor="middle">n8n</text>
  </svg>
)

const MakeIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <circle cx="60" cy="60" r="50" fill="currentColor"/>
    <path d="M40 50 L60 70 L80 50" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
  </svg>
)

const ZapierIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <rect x="30" y="30" width="60" height="60" rx="8" fill="currentColor"/>
    <rect x="40" y="55" width="40" height="10" fill="white"/>
  </svg>
)

const OpenAIIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <circle cx="60" cy="40" r="12" fill="currentColor"/>
    <circle cx="40" cy="70" r="12" fill="currentColor"/>
    <circle cx="80" cy="70" r="12" fill="currentColor"/>
    <path d="M60 52 L40 70 L80 70 Z" fill="currentColor" opacity="0.6"/>
  </svg>
)

const AnthropicIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <path d="M45 90 L60 30 L75 90" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="50" y1="70" x2="70" y2="70" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
  </svg>
)

const PythonIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <path d="M60 30 L80 40 L80 60 L60 70 L40 60 L40 40 Z" fill="currentColor"/>
    <circle cx="60" cy="50" r="8" fill="white"/>
  </svg>
)

const PostgreSQLIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <circle cx="60" cy="55" r="25" fill="currentColor"/>
    <rect x="50" y="75" width="20" height="15" fill="currentColor"/>
  </svg>
)

const MongoDBIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <path d="M60 30 L70 60 L60 90 L50 60 Z" fill="currentColor"/>
  </svg>
)

const AWSIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <path d="M30 70 L60 50 L90 70" stroke="currentColor" strokeWidth="6" fill="none"/>
    <path d="M40 75 L60 60 L80 75" stroke="currentColor" strokeWidth="6" fill="none"/>
  </svg>
)

const GoogleCloudIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <rect x="35" y="35" width="50" height="50" rx="8" fill="none" stroke="currentColor" strokeWidth="6"/>
    <circle cx="60" cy="60" r="15" fill="currentColor"/>
  </svg>
)

const SupabaseIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <path d="M40 30 L80 30 L80 90 L40 90 Z" fill="currentColor" opacity="0.3"/>
    <path d="M50 40 L70 40 L70 80 L50 80 Z" fill="currentColor"/>
  </svg>
)

const HuggingFaceIcon = () => (
  <svg viewBox="0 0 120 120" className="w-12 h-12">
    <circle cx="60" cy="60" r="30" fill="currentColor"/>
    <circle cx="50" cy="55" r="5" fill="black"/>
    <circle cx="70" cy="55" r="5" fill="black"/>
    <path d="M45 70 Q60 80 75 70" stroke="black" strokeWidth="3" fill="none"/>
  </svg>
)

/**
 * TechCarousel - Carrusel infinito de logos de tecnologías
 * Inspirado en n8n.io con scroll automático y hover pause
 */
const TechCarousel = () => {
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mediaQuery.matches
  }, [])

  // Lista de tecnologías con las que trabajamos
  const technologies = [
    { name: 'n8n', color: '#EA4B71', Icon: N8nIcon },
    { name: 'Make', color: '#6D5FFD', Icon: MakeIcon },
    { name: 'Zapier', color: '#FF4A00', Icon: ZapierIcon },
    { name: 'OpenAI', color: '#10A37F', Icon: OpenAIIcon },
    { name: 'Anthropic', color: '#D4A373', Icon: AnthropicIcon },
    { name: 'Python', color: '#3776AB', Icon: PythonIcon },
    { name: 'PostgreSQL', color: '#4169E1', Icon: PostgreSQLIcon },
    { name: 'MongoDB', color: '#47A248', Icon: MongoDBIcon },
    { name: 'AWS', color: '#FF9900', Icon: AWSIcon },
    { name: 'Google Cloud', color: '#4285F4', Icon: GoogleCloudIcon },
    { name: 'Supabase', color: '#3ECF8E', Icon: SupabaseIcon },
    { name: 'Hugging Face', color: '#FFD21E', Icon: HuggingFaceIcon },
  ]

  // Duplicar array para efecto infinito seamless
  const duplicatedTechs = [...technologies, ...technologies]

  return (
    <div className="relative w-full py-16 bg-gradient-to-b from-black via-slate-950 to-black overflow-hidden border-y border-neon-green/10">
      {/* Título */}
      <div className="text-center mb-12">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-white mb-3"
        >
          Tecnologías con las que <span className="text-neon-green">trabajamos</span>
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-sm md:text-base"
        >
          Integraciones y herramientas de última generación
        </motion.p>
      </div>

      {/* Gradientes de fade en los bordes */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Contenedor del carousel */}
      <div 
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-12 items-center"
          animate={!prefersReducedMotion.current && !isPaused ? {
            x: [0, -2080], // 12 logos * (160px width + 48px gap)
          } : {}}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            width: 'max-content',
            willChange: 'transform', // GPU acceleration
          }}
        >
          {duplicatedTechs.map((tech, index) => {
            const IconComponent = tech.Icon
            return (
              <motion.div
                key={`${tech.name}-${index}`}
                className="
                  flex-shrink-0
                  w-40 h-24
                  flex flex-col items-center justify-center
                  gap-2
                  glass-dark
                  rounded-xl
                  border border-neon-green/10
                  hover:border-neon-green/40
                  transition-all duration-300
                  group
                  cursor-pointer
                "
                whileHover={!prefersReducedMotion.current ? { 
                  scale: 1.1,
                  y: -5,
                } : {}}
              >
                {/* Logo SVG */}
                <div 
                  className="transition-all duration-300 opacity-60 group-hover:opacity-100"
                  style={{ color: tech.color }}
                >
                  <IconComponent />
                </div>
                
                {/* Nombre */}
                <span className="text-gray-400 group-hover:text-neon-green transition-colors duration-300 font-medium text-sm">
                  {tech.name}
                </span>
                  
                {/* Glow effect en hover */}
                <div 
                  className="absolute inset-0 bg-neon-green/0 group-hover:bg-neon-green/10 blur-xl transition-all duration-300 -z-10 rounded-xl" 
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Grid de fondo sutil */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  )
}

export default TechCarousel
