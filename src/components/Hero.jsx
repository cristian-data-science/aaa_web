import { motion, AnimatePresence } from 'framer-motion'
import TypewriterAnimation from './TypewriterAnimation'
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

  // Estado para las tablas de base de datos animadas
  const [activeTableRelations, setActiveTableRelations] = useState([])

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

  // Datos de tablas para animaciones de fondo (optimizado)
  const tableData = useMemo(() => ({
    leftSideTables: [
      {
        name: 'products',
        fields: ['id', 'name', 'price', 'category_id'],
        color: '#22C55E',
        records: 1653,
        side: 'left'
      },
      {
        name: 'clients',
        fields: ['id', 'company', 'contact', 'location'],
        color: '#06B6D4',
        records: 892,
        side: 'left'
      }
    ],
    rightSideTables: [
      {
        name: 'transactions',
        fields: ['id', 'amount', 'type', 'product_id'],
        color: '#A855F7',
        records: 5834,
        side: 'right'
      },
      {
        name: 'stock',
        fields: ['id', 'quantity', 'reserved', 'location'],
        color: '#EF4444',
        records: 2341,
        side: 'right'
      }
    ]
  }), [])

  // Efecto para manejar las relaciones de tablas animadas (optimizado)
  useEffect(() => {
    let intervalId
    let timeoutId

    const createRelation = () => {
      // Solo una animación a la vez para evitar conflictos
      if (activeTableRelations.length === 0) {
        const isLeftSide = Date.now() % 2 === 0 // Alternancia determinística
        const tables = isLeftSide ? tableData.leftSideTables : tableData.rightSideTables
        
        const screenWidth = window.innerWidth || 1200
        const baseX = isLeftSide ? 100 : screenWidth - 300
        const baseY = 250 // Posición fija más estable
        
        const table1 = {
          ...tables[0],
          id: `table1-${Date.now()}`,
          x: baseX,
          y: baseY,
          duration: 10000 // Duración fija
        }
        
        const table2 = {
          ...tables[1],
          id: `table2-${Date.now()}`,
          x: baseX,
          y: baseY + 180,
          duration: 10000 // Duración fija
        }

        const relation = {
          id: Date.now(),
          table1,
          table2,
          side: isLeftSide ? 'left' : 'right',
          duration: 10000
        }

        setActiveTableRelations([relation]) // Solo una relación

        // Remover después de la duración
        timeoutId = setTimeout(() => {
          setActiveTableRelations([])
        }, relation.duration)
      }

      // Programar próxima relación
      intervalId = setTimeout(createRelation, 8000) // Intervalo fijo
    }

    // Iniciar primera relación después de un delay
    intervalId = setTimeout(createRelation, 3000)

    return () => {
      clearTimeout(intervalId)
      clearTimeout(timeoutId)
    }
  }, [tableData]) // Dependencia solo de tableData, no de activeTableRelations

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

        {/* Ondas de energía */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${30 + i * 25}% ${40 + i * 20}%, 
                rgba(34, 197, 94, 0.02) 0%, 
                transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
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

        {/* Animaciones de relaciones de tablas de base de datos */}
        <AnimatePresence>
          {activeTableRelations.map((relation) => (
            <motion.div
              key={relation.id}
              className="absolute pointer-events-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Tabla 1 */}
              <motion.div
                className="absolute z-50"
                style={{
                  left: `${relation.table1.x}px`,  // USAR PIXELES ABSOLUTOS
                  top: `${relation.table1.y}px`,   // USAR PIXELES ABSOLUTOS
                  transform: 'none', // SIN TRANSFORM que cause problemas
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0.3,
                  rotateX: -90
                }}
                animate={{ 
                  opacity: [0, 0.9, 0.8],  // Más visible
                  scale: [0.3, 1.1, 1],    // Efecto bounce ligero
                  rotateX: [-90, 0, 0]
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.2,
                  rotateX: 90,
                  transition: { duration: 0.8 }
                }}
                transition={{
                  duration: 1.5,  // Más rápido
                  ease: "easeOut"
                }}
              >
                {/* Contenedor de la tabla 1 */}
                <div 
                  className="database-table relative bg-slate-900/98 backdrop-blur-md border rounded-lg p-4 min-w-[220px] shadow-2xl"
                  style={{
                    borderColor: `${relation.table1.color}70`,
                    boxShadow: `
                      0 0 20px ${relation.table1.color}40, 
                      0 0 40px ${relation.table1.color}20,
                      inset 0 1px 1px rgba(255, 255, 255, 0.15)
                    `,
                  }}
                >
                  {/* Header de la tabla */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <motion.div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: relation.table1.color }}
                        animate={{ 
                          scale: [1, 1.3, 1],
                          boxShadow: [`0 0 4px ${relation.table1.color}`, `0 0 10px ${relation.table1.color}`, `0 0 4px ${relation.table1.color}`]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <span 
                        className="text-sm font-mono font-bold uppercase tracking-wider"
                        style={{ color: relation.table1.color }}
                      >
                        {relation.table1.name}
                      </span>
                      <motion.span 
                        className="text-[10px] text-gray-400 px-1 py-0.5 rounded border"
                        style={{ borderColor: `${relation.table1.color}40` }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ACTIVE
                      </motion.span>
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono">
                      {relation.table1.records.toLocaleString()}
                    </div>
                  </div>

                  {/* Campos de la tabla (solo los primeros 3) */}
                  <div className="space-y-1.5">
                    {relation.table1.fields.slice(0, 3).map((field, index) => (
                      <motion.div
                        key={field}
                        className="flex items-center space-x-2 text-[11px] font-mono"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: index === 0 ? relation.table1.color : '#6B7280' }}
                          animate={{ 
                            scale: index === 0 ? [1, 1.2, 1] : 1,
                            opacity: index === 0 ? [0.7, 1, 0.7] : 0.6
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                        <span className="text-gray-300 min-w-[45px]">{field}</span>
                        <div className="flex-1 border-b border-dashed border-gray-600/30" />
                        <span 
                          className="text-[9px] px-1 py-0.5 rounded"
                          style={{ 
                            backgroundColor: index === 0 ? `${relation.table1.color}20` : 'rgba(107, 114, 128, 0.15)',
                            color: index === 0 ? relation.table1.color : '#9CA3AF'
                          }}
                        >
                          {index === 0 ? 'PK' : ['FK', 'VAR', 'INT'][Math.floor(Math.random() * 3)]}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Línea de conexión animada */}
              <motion.svg
                className="absolute"
                style={{
                  left: `${relation.table1.x + 220}px`,   // Desde el final del nombre de la tabla 1
                  top: `${relation.table1.y + 50}px`,     // Desde la altura del nombre de la tabla 1
                  width: '160px',   // Ancho más amplio para las dobladuras
                  height: `${Math.abs(relation.table2.y - relation.table1.y) + 20}px`, // Altura exacta entre tablas
                  pointerEvents: 'none'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1.0 }}
              >
                <defs>
                  <linearGradient id={`connectionGrad-${relation.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={relation.table1.color} />
                    <stop offset="50%" stopColor={relation.table1.color} />
                    <stop offset="100%" stopColor={relation.table2.color} />
                  </linearGradient>
                </defs>
                
                {/* Camino con dobladuras rectas: horizontal → vertical → horizontal */}
                <motion.path
                  d={`M 0 0 
                      L 50 0 
                      L 50 ${Math.abs(relation.table2.y - relation.table1.y) - 30} 
                      L -220 ${Math.abs(relation.table2.y - relation.table1.y) - 30} 
                      L -220 ${Math.abs(relation.table2.y - relation.table1.y)}`}
                  stroke={`url(#connectionGrad-${relation.id})`}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8,4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 1, 0.8],
                    strokeDashoffset: [0, -24, -48]
                  }}
                  transition={{ 
                    pathLength: { duration: 2.5, delay: 1.0 },
                    opacity: { duration: 0.8, delay: 1.0 },
                    strokeDashoffset: { duration: 4, repeat: Infinity, ease: "linear" }
                  }}
                />
                
                {/* Punto de conexión inicial (desde el nombre de tabla 1) */}
                <motion.circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill={relation.table1.color}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                />
                
                {/* Punto de conexión final (hacia el nombre de tabla 2) */}
                <motion.circle
                  cx="-220"
                  cy={`${Math.abs(relation.table2.y - relation.table1.y)}`}
                  r="4"
                  fill={relation.table2.color}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ delay: 2.0, duration: 0.6 }}
                />

                {/* Puntos en las esquinas de las dobladuras */}
                <motion.circle
                  cx="50"
                  cy="0"
                  r="2"
                  fill={relation.table1.color}
                  opacity="0.7"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 2.2, duration: 0.4 }}
                />
                
                <motion.circle
                  cx="50"
                  cy={`${Math.abs(relation.table2.y - relation.table1.y) - 30}`}
                  r="2"
                  fill={relation.table2.color}
                  opacity="0.7"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 2.4, duration: 0.4 }}
                />
                
                <motion.circle
                  cx="-220"
                  cy={`${Math.abs(relation.table2.y - relation.table1.y) - 30}`}
                  r="2"
                  fill={relation.table2.color}
                  opacity="0.7"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 2.6, duration: 0.4 }}
                />

                {/* Texto de relación en el centro */}
                <motion.text
                  x="-85"
                  y={`${(Math.abs(relation.table2.y - relation.table1.y) - 30) / 2}`}
                  textAnchor="middle"
                  className="text-[10px] font-mono font-bold fill-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ delay: 2.8 }}
                >
                  {relation.side === 'left' ? '1:N' : 'M:N'}
                </motion.text>
                
                {/* Flecha de dirección apuntando hacia la tabla 2 */}
                <motion.polygon
                  points={`-225,${Math.abs(relation.table2.y - relation.table1.y) - 10} -220,${Math.abs(relation.table2.y - relation.table1.y)} -215,${Math.abs(relation.table2.y - relation.table1.y) - 10}`}
                  fill={relation.table2.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 2.5 }}
                />
              </motion.svg>

              {/* Tabla 2 */}
              <motion.div
                className="absolute z-50"
                style={{
                  left: `${relation.table2.x}px`,  // USAR PIXELES ABSOLUTOS
                  top: `${relation.table2.y}px`,   // USAR PIXELES ABSOLUTOS
                  transform: 'none', // SIN TRANSFORM que cause problemas
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0.3,
                  rotateX: -90
                }}
                animate={{ 
                  opacity: [0, 0.9, 0.8],  // Más visible
                  scale: [0.3, 1.1, 1],    // Efecto bounce ligero
                  rotateX: [-90, 0, 0]
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.2,
                  rotateX: 90,
                  transition: { duration: 0.8 }
                }}
                transition={{
                  duration: 1.5,  // Más rápido
                  delay: 0.5,     // Menos delay
                  ease: "easeOut"
                }}
              >
                {/* Contenedor de la tabla 2 */}
                <div 
                  className="database-table relative bg-slate-900/98 backdrop-blur-md border rounded-lg p-4 min-w-[220px] shadow-2xl"
                  style={{
                    borderColor: `${relation.table2.color}70`,
                    boxShadow: `
                      0 0 20px ${relation.table2.color}40, 
                      0 0 40px ${relation.table2.color}20,
                      inset 0 1px 1px rgba(255, 255, 255, 0.15)
                    `,
                  }}
                >
                  {/* Header de la tabla */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <motion.div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: relation.table2.color }}
                        animate={{ 
                          scale: [1, 1.3, 1],
                          boxShadow: [`0 0 4px ${relation.table2.color}`, `0 0 10px ${relation.table2.color}`, `0 0 4px ${relation.table2.color}`]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <span 
                        className="text-sm font-mono font-bold uppercase tracking-wider"
                        style={{ color: relation.table2.color }}
                      >
                        {relation.table2.name}
                      </span>
                      <motion.span 
                        className="text-[10px] text-gray-400 px-1 py-0.5 rounded border"
                        style={{ borderColor: `${relation.table2.color}40` }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ACTIVE
                      </motion.span>
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono">
                      {relation.table2.records.toLocaleString()}
                    </div>
                  </div>

                  {/* Campos de la tabla (solo los primeros 3) */}
                  <div className="space-y-1.5">
                    {relation.table2.fields.slice(0, 3).map((field, index) => (
                      <motion.div
                        key={field}
                        className="flex items-center space-x-2 text-[11px] font-mono"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                      >
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: index === 0 ? relation.table2.color : '#6B7280' }}
                          animate={{ 
                            scale: index === 0 ? [1, 1.2, 1] : 1,
                            opacity: index === 0 ? [0.7, 1, 0.7] : 0.6
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                        <span className="text-gray-300 min-w-[45px]">{field}</span>
                        <div className="flex-1 border-b border-dashed border-gray-600/30" />
                        <span 
                          className="text-[9px] px-1 py-0.5 rounded"
                          style={{ 
                            backgroundColor: index === 0 ? `${relation.table2.color}20` : 'rgba(107, 114, 128, 0.15)',
                            color: index === 0 ? relation.table2.color : '#9CA3AF'
                          }}
                        >
                          {index === 0 ? 'PK' : ['FK', 'VAR', 'INT'][Math.floor(Math.random() * 3)]}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Stream de datos de la relación */}
              <motion.div
                className="absolute text-[10px] font-mono font-bold opacity-80"
                style={{ 
                  left: `${relation.table1.x + 150}px`,  // Al lado del camino
                  top: `${relation.table1.y + 90 + (Math.abs(relation.table2.y - relation.table1.y) / 2)}px`,   // En el centro vertical
                  color: relation.table1.color,
                  textShadow: `0 0 10px ${relation.table1.color}`
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: [0, 1, 0.8], 
                  x: [0, 5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 3.5, ease: "easeInOut" }}
              >
                JOIN
              </motion.div>
              
              {/* Partículas de datos siguiendo el camino con dobladuras */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={`data-particle-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{ 
                    left: `${relation.table1.x + 90}px`,  // Punto inicial
                    top: `${relation.table1.y + 80}px`,
                    backgroundColor: relation.table1.color,
                    boxShadow: `0 0 8px ${relation.table1.color}`
                  }}
                  animate={{ 
                    // Secuencia de movimientos: horizontal → vertical → horizontal
                    x: [0, 40, 40, 80, 80],
                    y: [0, 0, Math.abs(relation.table2.y - relation.table1.y) - 80, Math.abs(relation.table2.y - relation.table1.y) - 80, Math.abs(relation.table2.y - relation.table1.y) - 40],
                    opacity: [0, 1, 1, 1, 0],
                    scale: [0.5, 1, 1, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: 4 + i * 1.5,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.6, 0.8, 1]  // Timing para cada punto del camino
                  }}
                />
              ))}
              
              {/* Partículas extras en las dobladuras para efecto de flujo */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`flow-particle-${i}`}
                  className="absolute w-1 h-1 rounded-full opacity-60"
                  style={{ 
                    left: `${relation.table1.x + 130 + i * 8}px`,
                    top: `${relation.table1.y + 80}px`,
                    backgroundColor: relation.table2.color,
                    boxShadow: `0 0 4px ${relation.table2.color}`
                  }}
                  animate={{ 
                    y: [0, Math.abs(relation.table2.y - relation.table1.y) - 60],
                    opacity: [0, 0.6, 0.6, 0],
                    scale: [0, 1, 1, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: 5 + i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          ))}
        </AnimatePresence>        {/* Efecto de matriz 3D */}
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

        {/* Pulsos de energía en las esquinas */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position, i) => (
          <motion.div
            key={`pulse-${position}`}
            className={`absolute w-32 h-32 ${
              position === 'top-left' ? 'top-0 left-0' :
              position === 'top-right' ? 'top-0 right-0' :
              position === 'bottom-left' ? 'bottom-0 left-0' :
              'bottom-0 right-0'
            }`}
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
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear",
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

        {/* Líneas de escaneado verticales */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`vscan-${i}`}
            className="absolute left-0 w-0.5 h-full opacity-10"
            style={{
              left: `${25 + i * 25}%`,
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
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 1.5,
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

