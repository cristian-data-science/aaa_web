import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award, Users, Lightbulb } from 'lucide-react'

/**
 * AboutScene - Escena de valores y misión con efectos quantum
 */
const AboutScene = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovación Responsable',
      description: 'Adoptamos tecnologías avanzadas de manera ética y responsable.',
      color: 'neon-green',
    },
    {
      icon: Award,
      title: 'Excelencia Técnica',
      description: 'Mantenemos los más altos estándares de calidad en cada proyecto.',
      color: 'neon-lightGreen',
    },
    {
      icon: Heart,
      title: 'Transparencia y Confianza',
      description: 'Construimos relaciones duraderas basadas en la transparencia.',
      color: 'emerald-500',
    },
    {
      icon: Target,
      title: 'Impacto Medible',
      description: 'Cada solución genera un impacto cuantificable y comunicable.',
      color: 'neon-green',
    },
    {
      icon: Users,
      title: 'Colaboración',
      description: 'Trabajamos como socios en el proceso de transformación digital.',
      color: 'neon-lightGreen',
    },
    {
      icon: Eye,
      title: 'Adaptabilidad',
      description: 'Mantenemos una mentalidad de aprendizaje continuo.',
      color: 'emerald-400',
    },
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black">
      {/* Efecto quantum de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculos concéntricos */}
        {!prefersReducedMotion && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2, 2.5],
                  opacity: [0.3, 0.1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1.3,
                  ease: 'easeOut',
                }}
              >
                <div className={`
                  w-[800px] h-[800px]
                  border-2 border-neon-green/20
                  rounded-full
                `} />
              </motion.div>
            ))}
          </>
        )}

        {/* Partículas quantum */}
        {!prefersReducedMotion && (
          <>
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-neon-green/40 rounded-full blur-sm"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 0.8, 0.3],
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}

        {/* Grid hexagonal de fondo */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 100 100">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="10" height="17.32" patternUnits="userSpaceOnUse">
              <path d="M5,0 L10,2.89 L10,8.66 L5,11.55 L0,8.66 L0,2.89 Z" 
                fill="none" 
                stroke="#00ff88" 
                strokeWidth="0.1" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-neon-green/20 blur-2xl rounded-full" />
              <h2 className="relative text-5xl md:text-7xl font-bold text-white">
                Nuestros <span className="text-neon-green text-shadow-green">Valores</span>
              </h2>
            </div>
          </motion.div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Somos un equipo de expertos en IA y automatización, 
            comprometidos con impulsar la transformación digital responsable
          </p>
        </motion.div>

        {/* Grid de valores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={!prefersReducedMotion ? {
                scale: 1.05,
                rotateY: 5,
              } : {}}
              className="group"
              style={{ perspective: '1000px' }}
            >
              <div className="
                relative
                bg-gradient-to-br from-slate-900/50 to-black/70
                backdrop-blur-lg
                border border-neon-green/20
                rounded-2xl
                p-8
                h-full
                overflow-hidden
                transition-all duration-300
                hover:border-neon-green/40
                hover:shadow-neon-green
              ">
                {/* Líneas de conexión animadas */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  >
                    <svg className="absolute inset-0 w-full h-full">
                      <motion.line
                        x1="0" y1="0" x2="100%" y2="100%"
                        stroke="#00ff88"
                        strokeWidth="1"
                        opacity="0.3"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Icono con efecto orbital */}
                <div className="relative mb-6">
                  <motion.div
                    animate={!prefersReducedMotion ? {
                      rotate: 360,
                    } : {}}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="relative w-20 h-20 mx-auto"
                  >
                    {/* Órbita */}
                    <div className={`
                      absolute inset-0
                      border-2 border-dashed border-${value.color}/20
                      rounded-full
                    `} />
                    
                    {/* Icono central */}
                    <motion.div
                      animate={!prefersReducedMotion ? {
                        rotate: -360,
                      } : {}}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className={`
                        absolute inset-2
                        flex items-center justify-center
                        bg-black/80
                        border-2 border-${value.color}/40
                        rounded-full
                        text-${value.color}
                        group-hover:shadow-neon-cyan
                        transition-shadow duration-300
                      `}
                    >
                      <value.icon className="w-8 h-8" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Título */}
                <h3 className={`
                  text-2xl font-bold text-white mb-4 text-center
                  group-hover:text-${value.color}
                  transition-colors duration-300
                `}>
                  {value.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-300 text-center leading-relaxed">
                  {value.description}
                </p>

                {/* Partículas en hover */}
                {!prefersReducedMotion && (
                  <motion.div
                    className={`
                      absolute -inset-2
                      bg-gradient-to-r from-${value.color}/0 via-${value.color}/20 to-${value.color}/0
                      rounded-2xl
                      opacity-0 group-hover:opacity-100
                      blur-xl
                      -z-10
                    `}
                    initial={false}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Misión y Visión */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {[
            {
              title: 'Nuestra Misión',
              text: 'Democratizar el acceso a la IA y automatización, ayudando a empresas de todos los tamaños a optimizar procesos y tomar decisiones basadas en datos.',
            },
            {
              title: 'Nuestra Visión',
              text: 'Ser el socio tecnológico líder en Latinoamérica para la transformación digital, creando un futuro donde la IA potencia el crecimiento sostenible.',
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="
                glass-dark
                rounded-2xl
                p-8
                text-center
              "
            >
              <h4 className="text-2xl font-bold text-neon-green mb-4">
                {item.title}
              </h4>
              <p className="text-gray-200 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AboutScene
