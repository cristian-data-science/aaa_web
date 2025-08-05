import { motion } from 'framer-motion'

const AnimatedWorld = ({ className = "w-full h-auto" }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Fondo del mundo con gradiente */}
        <defs>
          <radialGradient id="worldGradient" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#1E293B" />
          </radialGradient>
          
          <radialGradient id="glowGradient" cx="0.5" cy="0.5">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </radialGradient>

          <linearGradient id="continentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Resplandor exterior */}
        <motion.circle
          cx="200"
          cy="200"
          r="180"
          fill="url(#glowGradient)"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Planeta base */}
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="url(#worldGradient)"
          filter="url(#glow)"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Continentes animados */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          {/* América */}
          <motion.path
            d="M 120 150 Q 130 120 140 150 Q 150 180 140 200 Q 130 220 120 200 Q 110 180 120 150"
            fill="url(#continentGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />

          {/* Europa/África */}
          <motion.path
            d="M 180 130 Q 200 120 220 140 Q 240 160 230 180 Q 220 200 200 190 Q 180 180 180 130"
            fill="url(#continentGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />

          {/* Asia */}
          <motion.path
            d="M 240 160 Q 270 150 290 170 Q 300 190 280 210 Q 260 220 240 200 Q 230 180 240 160"
            fill="url(#continentGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />

          {/* Oceanía */}
          <motion.circle
            cx="280"
            cy="240"
            r="15"
            fill="url(#continentGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
          />
        </motion.g>

        {/* Líneas de conexión global */}
        <motion.g opacity="0.6">
          {[...Array(8)].map((_, i) => (
            <motion.path
              key={i}
              d={`M 200 200 L ${200 + Math.cos(i * Math.PI / 4) * 120} ${200 + Math.sin(i * Math.PI / 4) * 120}`}
              stroke="#10B981"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            />
          ))}
        </motion.g>

        {/* Puntos de datos flotantes */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180
          const radius = 170 + Math.sin(i) * 20
          return (
            <motion.circle
              key={i}
              cx={200 + Math.cos(angle) * radius}
              cy={200 + Math.sin(angle) * radius}
              r="3"
              fill="#F97316"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )
        })}

        {/* Órbitas */}
        <motion.circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#10B981"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="10,10"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <motion.circle
          cx="200"
          cy="200"
          r="200"
          fill="none"
          stroke="#F97316"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="15,15"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>

      {/* Texto flotante */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <div className="text-center">
          <motion.div
            className="text-2xl font-bold text-white mb-2"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            IA Global
          </motion.div>
          <motion.div
            className="text-sm text-green-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Conectando el futuro
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AnimatedWorld

