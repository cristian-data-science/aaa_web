import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

const DatabaseAnimations = () => {
  // Estado para las tablas de base de datos animadas
  const [activeTableRelations, setActiveTableRelations] = useState([])
  
  // Estado para controlar el patrón predecible de animaciones
  const [animationCycle, setAnimationCycle] = useState(0)

  // Valores fijos para tipos de campo para evitar Math.random en render
  const fieldTypes = useMemo(() => ['FK', 'VAR', 'INT'], [])

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

  // Efecto para manejar las relaciones de tablas con patrón completamente predecible
  useEffect(() => {
    let timeoutId

    const createPredictableRelation = () => {
      // Patrón predecible: izquierda → derecha → izquierda → derecha...
      const isLeftSide = animationCycle % 2 === 0
      const tables = isLeftSide ? tableData.leftSideTables : tableData.rightSideTables
      
      const screenWidth = window.innerWidth || 1200
      const baseX = isLeftSide ? 100 : screenWidth - 300
      const baseY = 250 // Posición fija y estable
      
      // Duración completamente fija: 6 segundos para cada ciclo
      const tableDuration = 6000
      
      const table1 = {
        ...tables[0],
        id: `table1-cycle-${animationCycle}`,
        x: baseX,
        y: baseY,
        duration: tableDuration
      }
      
      const table2 = {
        ...tables[1],
        id: `table2-cycle-${animationCycle}`,
        x: baseX,
        y: baseY + 180,
        duration: tableDuration
      }

      const relation = {
        id: `relation-cycle-${animationCycle}`,
        table1,
        table2,
        side: isLeftSide ? 'left' : 'right',
        duration: tableDuration,
        cycle: animationCycle // Para tracking
      }

      setActiveTableRelations([relation])

      // Después de la duración exacta, remover y avanzar al siguiente ciclo
      timeoutId = setTimeout(() => {
        setActiveTableRelations([])
        // Programar el próximo ciclo después de una pausa
        setTimeout(() => {
          setAnimationCycle(prev => prev + 1)
        }, 1000) // 1 segundo de pausa entre ciclos
      }, tableDuration)
    }

    // Solo crear nueva relación si no hay una activa
    if (activeTableRelations.length === 0) {
      // Inicio inmediato para la primera relación, luego sin delay adicional
      const delay = animationCycle === 0 ? 1000 : 0
      timeoutId = setTimeout(createPredictableRelation, delay)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [tableData, animationCycle]) // Solo dependencias necesarias

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Animaciones de relaciones de tablas de base de datos */}
      <AnimatePresence>
        {activeTableRelations.map((relation) => (
          <motion.div
            key={relation.id}
            className="absolute pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }} // Entrada más suave
          >
            {/* Tabla 1 */}
            <motion.div
              className="absolute bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-lg p-3 min-w-[200px] shadow-xl"
              style={{
                left: `${relation.table1.x}px`,
                top: `${relation.table1.y}px`,
                boxShadow: `0 0 20px ${relation.table1.color}40`,
              }}
              initial={{ 
                scale: 0,
                rotate: -15
              }}
              animate={{ 
                scale: 1,
                rotate: 0
              }}
              exit={{ 
                scale: 0,
                rotate: 15
              }}
              transition={{ 
                duration: 0.8,
                ease: "backOut"
              }}
            >
              {/* Header de la tabla */}
              <div 
                className="flex items-center justify-between mb-2 pb-2 border-b"
                style={{ borderColor: relation.table1.color }}
              >
                <h3 
                  className="font-mono text-sm font-bold"
                  style={{ color: relation.table1.color }}
                >
                  {relation.table1.name}
                </h3>
                <div className="text-xs text-gray-400">
                  {relation.table1.records.toLocaleString()} rows
                </div>
              </div>
              
              {/* Campos de la tabla */}
              <div className="space-y-1">
                {relation.table1.fields.map((field, index) => (
                  <motion.div
                    key={field}
                    className="flex items-center justify-between text-xs"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span className="text-gray-300 font-mono">{field}</span>
                    <span 
                      className="px-1 py-0.5 rounded text-xs font-mono"
                      style={{ 
                        backgroundColor: `${relation.table1.color}20`,
                        color: relation.table1.color
                      }}
                    >
                      {fieldTypes[index % fieldTypes.length]}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Indicador de conexión */}
              <motion.div
                className="absolute -right-3 top-1/2 w-6 h-6 rounded-full border-2 bg-gray-900"
                style={{ borderColor: relation.table1.color }}
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [`0 0 10px ${relation.table1.color}60`, `0 0 20px ${relation.table1.color}80`, `0 0 10px ${relation.table1.color}60`],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Tabla 2 */}
            <motion.div
              className="absolute bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-lg p-3 min-w-[200px] shadow-xl"
              style={{
                left: `${relation.table2.x}px`,
                top: `${relation.table2.y}px`,
                boxShadow: `0 0 20px ${relation.table2.color}40`,
              }}
              initial={{ 
                scale: 0,
                rotate: 15
              }}
              animate={{ 
                scale: 1,
                rotate: 0
              }}
              exit={{ 
                scale: 0,
                rotate: -15
              }}
              transition={{ 
                duration: 0.8,
                ease: "backOut",
                delay: 0.2
              }}
            >
              {/* Header de la tabla */}
              <div 
                className="flex items-center justify-between mb-2 pb-2 border-b"
                style={{ borderColor: relation.table2.color }}
              >
                <h3 
                  className="font-mono text-sm font-bold"
                  style={{ color: relation.table2.color }}
                >
                  {relation.table2.name}
                </h3>
                <div className="text-xs text-gray-400">
                  {relation.table2.records.toLocaleString()} rows
                </div>
              </div>
              
              {/* Campos de la tabla */}
              <div className="space-y-1">
                {relation.table2.fields.map((field, index) => (
                  <motion.div
                    key={field}
                    className="flex items-center justify-between text-xs"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-gray-300 font-mono">{field}</span>
                    <span 
                      className="px-1 py-0.5 rounded text-xs font-mono"
                      style={{ 
                        backgroundColor: `${relation.table2.color}20`,
                        color: relation.table2.color
                      }}
                    >
                      {fieldTypes[(index + 1) % fieldTypes.length]}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Indicador de conexión */}
              <motion.div
                className="absolute -left-3 top-1/2 w-6 h-6 rounded-full border-2 bg-gray-900"
                style={{ borderColor: relation.table2.color }}
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [`0 0 10px ${relation.table2.color}60`, `0 0 20px ${relation.table2.color}80`, `0 0 10px ${relation.table2.color}60`],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </motion.div>

            {/* Línea de relación animada */}
            <svg
              className="absolute top-0 left-0 pointer-events-none"
              style={{
                width: '100vw',
                height: '100vh',
                zIndex: 49
              }}
            >
              <defs>
                <linearGradient 
                  id={`relationGradient-${relation.id}`} 
                  x1="0%" y1="0%" x2="100%" y2="0%"
                >
                  <stop offset="0%" stopColor={relation.table1.color} />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor={relation.table2.color} />
                </linearGradient>
                
                <filter id={`glow-${relation.id}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <motion.path
                d={`M ${relation.table1.x + 200} ${relation.table1.y + 60} 
                    Q ${(relation.table1.x + relation.table2.x + 200) / 2} ${Math.min(relation.table1.y, relation.table2.y) - 50}
                    ${relation.table2.x} ${relation.table2.y + 60}`}
                stroke={`url(#relationGradient-${relation.id})`}
                strokeWidth="2"
                fill="none"
                filter={`url(#glow-${relation.id})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 0.8,
                }}
                exit={{ 
                  pathLength: 0, 
                  opacity: 0 
                }}
                transition={{ 
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.8
                }}
              />
              
              {/* Partículas que viajan por la línea */}
              <motion.circle
                r="3"
                fill={relation.table1.color}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  begin="1.5s"
                >
                  <mpath href={`#relationPath-${relation.id}`} />
                </animateMotion>
              </motion.circle>

              <path
                id={`relationPath-${relation.id}`}
                d={`M ${relation.table1.x + 200} ${relation.table1.y + 60} 
                    Q ${(relation.table1.x + relation.table2.x + 200) / 2} ${Math.min(relation.table1.y, relation.table2.y) - 50}
                    ${relation.table2.x} ${relation.table2.y + 60}`}
                fill="none"
                stroke="none"
              />
            </svg>

            {/* Etiqueta de relación */}
            <motion.div
              className="absolute bg-gray-800/90 border border-gray-600 rounded px-2 py-1 text-xs font-mono text-white shadow-lg"
              style={{
                left: `${(relation.table1.x + relation.table2.x + 100) / 2}px`,
                top: `${Math.min(relation.table1.y, relation.table2.y) - 80}px`,
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-green-400">1:N</span>
                <span className="text-gray-400">•</span>
                <span className="text-purple-400">INNER JOIN</span>
              </div>
            </motion.div>

            {/* Métricas de performance */}
            <motion.div
              className="absolute bg-gray-900/90 border border-gray-700 rounded-lg p-2 text-xs font-mono shadow-xl"
              style={{
                left: `${(relation.table1.x + relation.table2.x + 200) / 2}px`,
                top: `${Math.max(relation.table1.y, relation.table2.y) + 120}px`,
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Exec Time:</span>
                  <span className="text-green-400">0.023ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rows:</span>
                  <span className="text-blue-400">{(relation.table1.records * 0.3).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cache:</span>
                  <span className="text-orange-400">HIT</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default DatabaseAnimations
