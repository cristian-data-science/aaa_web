import { motion } from 'framer-motion'
import { useState } from 'react'
import { TrendingUp, Clock, DollarSign, Zap } from 'lucide-react'

/**
 * DemoScene - Escena de demostración y ROI con visualización de datos
 */
const DemoScene = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const [hours, setHours] = useState(40)
  const [hourlyRate, setHourlyRate] = useState(25)
  
  // Cálculos de ROI
  const monthlyHours = hours * 4
  const monthlyCost = monthlyHours * hourlyRate
  const yearlySavings = monthlyCost * 12
  const roi = ((yearlySavings - 10000) / 10000) * 100

  const stats = [
    {
      icon: TrendingUp,
      value: '95%',
      label: 'ROI Promedio',
      color: '#00ff88',
      bgColor: 'rgba(0, 255, 136, 0.15)',
      borderColor: 'rgba(0, 255, 136, 0.5)',
      delay: 0,
    },
    {
      icon: Clock,
      value: '70%',
      label: 'Ahorro de Tiempo',
      color: '#10ffcb',
      bgColor: 'rgba(16, 255, 203, 0.15)',
      borderColor: 'rgba(16, 255, 203, 0.5)',
      delay: 0.1,
    },
    {
      icon: DollarSign,
      value: '$500K+',
      label: 'Ahorros Generados',
      color: '#00ff88',
      bgColor: 'rgba(0, 255, 136, 0.15)',
      borderColor: 'rgba(0, 255, 136, 0.5)',
      delay: 0.2,
    },
    {
      icon: Zap,
      value: '3x',
      label: 'Velocidad de Procesos',
      color: '#fb923c',
      bgColor: 'rgba(251, 146, 60, 0.15)',
      borderColor: 'rgba(251, 146, 60, 0.5)',
      delay: 0.3,
    },
  ]

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-12 md:py-20 bg-gradient-to-br from-slate-950 via-black to-slate-950">
      {/* Fondo con grid animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid de datos */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 217, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 217, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Líneas de datos fluyendo - solo en desktop */}
        {!isMobile && !prefersReducedMotion && (
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ff88" stopOpacity="0" />
                <stop offset="50%" stopColor="#00ff88" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
              </linearGradient>
            </defs>
            {Array.from({ length: isMobile ? 3 : 5 }).map((_, i) => (
              <motion.path
                key={i}
                d={`M 0 ${20 + i * 20} Q ${50} ${10 + i * 20} ${100} ${20 + i * 20}`}
                stroke="url(#lineGrad)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'linear',
                }}
              />
            ))}
          </svg>
        )}
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Lado izquierdo - Calculadora de ROI */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Calcula tu <span className="text-neon-green text-shadow-cyan">ROI</span>
            </h2>
            <p className="text-xl mb-8" style={{color: '#ffffff'}}>
              Descubre cuánto puedes ahorrar automatizando tus procesos
            </p>

            {/* Calculadora */}
            <div className="rounded-2xl p-8 space-y-6" style={{backgroundColor: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(20px)', border: '2px solid rgba(255, 255, 255, 0.3)'}}>
              {/* Input 1: Horas semanales */}
              <div>
                <label className="block mb-2 font-medium" style={{color: '#ffffff'}}>
                  Horas manuales por semana
                </label>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-neon-green"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span style={{color: '#ffffff'}}>10h</span>
                  <span className="font-bold" style={{color: '#ffffff'}}>{hours}h</span>
                  <span style={{color: '#ffffff'}}>80h</span>
                </div>
              </div>

              {/* Input 2: Costo por hora */}
              <div>
                <label className="block mb-2 font-medium" style={{color: '#ffffff'}}>
                  Costo por hora (USD)
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-neon-green"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span style={{color: '#ffffff'}}>$10</span>
                  <span className="font-bold" style={{color: '#ffffff'}}>${hourlyRate}</span>
                  <span style={{color: '#ffffff'}}>$100</span>
                </div>
              </div>

              {/* Resultados */}
              <div className="border-t pt-6 space-y-4" style={{borderColor: 'rgba(0, 255, 136, 0.2)'}}>
                <div className="flex justify-between items-center">
                  <span style={{color: '#ffffff'}}>Ahorro mensual:</span>
                  <span className="text-2xl font-bold" style={{color: '#ffffff'}}>
                    ${monthlyCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{color: '#ffffff'}}>Ahorro anual:</span>
                  <span className="text-3xl font-bold" style={{color: '#ffffff'}}>
                    ${yearlySavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{color: '#ffffff'}}>ROI estimado:</span>
                  <span className="text-3xl font-bold" style={{color: '#ffffff'}}>
                    {Math.round(roi)}%
                  </span>
                </div>
              </div>

              {/* CTA */}
              <motion.a
                href="#contact"
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                className="
                  block w-full
                  px-8 py-4
                  font-bold text-center
                  rounded-lg
                  transition-all duration-300
                "
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '2px solid #ffffff',
                  boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
                }}
              >
                Solicitar Análisis Detallado
              </motion.a>
            </div>
          </motion.div>

          {/* Lado derecho - Estadísticas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Resultados Comprobados
            </h3>

            {/* Grid de stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: stat.delay,
                    type: 'spring',
                  }}
                  whileHover={!prefersReducedMotion ? { 
                    scale: 1.1,
                    rotate: 2,
                  } : {}}
                  className="
                    relative
                    glass-darker
                    rounded-xl
                    p-6
                    text-center
                    overflow-hidden
                    group
                  "
                >
                  {/* Glow effect */}
                  {!prefersReducedMotion && (
                    <motion.div
                      className={`
                        absolute inset-0 
                        bg-${stat.color}/10
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                      `}
                      initial={false}
                    />
                  )}

                  {/* Icono */}
                  <div className="relative w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: stat.bgColor,
                      border: `1px solid ${stat.borderColor}`,
                      color: stat.color
                    }}>
                    <stat.icon className="w-6 h-6" />
                  </div>

                  {/* Valor */}
                  <div className="relative text-3xl font-bold mb-2"
                    style={{ color: stat.color }}>
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="relative text-sm text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Casos de éxito */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-dark rounded-xl p-6 mt-8"
            >
              <h4 className="text-xl font-bold text-white mb-4">
                💡 Caso de Éxito
              </h4>
              <p className="text-gray-300 mb-4">
                Empresa manufacturera redujo <span className="text-neon-green font-bold">80% del tiempo</span> en procesamiento de órdenes,
                generando ahorros de <span className="text-neon-green font-bold">$450K anuales</span>.
              </p>
              <div className="flex items-center gap-2 text-sm text-neon-green">
                <Zap className="w-4 h-4" />
                <span>Implementación en 6 semanas</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DemoScene

