import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award, Users, Lightbulb } from 'lucide-react'
import datacefCity from '../assets/images/datacef-city.png'

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovación Responsable',
      description: 'Adoptamos tecnologías avanzadas de manera ética y responsable.',
      color: 'from-emerald-200 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Excelencia Técnica',
      description: 'Mantenemos los más altos estándares de calidad en cada proyecto.',
      color: 'from-emerald-100 to-teal-400'
    },
    {
      icon: Heart,
      title: 'Transparencia y Confianza',
      description: 'Construimos relaciones duraderas basadas en la transparencia.',
      color: 'from-lime-200 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Impacto Medible',
      description: 'Cada solución genera un impacto cuantificable y comunicable.',
      color: 'from-emerald-300 to-emerald-600'
    },
    {
      icon: Users,
      title: 'Colaboración',
      description: 'Trabajamos como socios en el proceso de transformación digital.',
      color: 'from-teal-200 to-emerald-500'
    },
    {
      icon: Eye,
      title: 'Adaptabilidad',
      description: 'Mantenemos una mentalidad de aprendizaje continuo.',
      color: 'from-emerald-100 to-emerald-400'
    }
  ]

  // Precompute particle positions once to avoid flicker on re-renders
  const particleConfigs = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      left: 10 + i * 12,
      top: 15 + Math.random() * 70,
      size: 1.5 + Math.random() * 2,
      xOffset: Math.random() * 30 - 15,
      duration: 12 + Math.random() * 8,
      delay: Math.random() * 6,
    }))
  }, [])

  return (
    <section id="about" className="relative py-20 overflow-hidden bg-gradient-to-b from-emerald-50/20 via-white/98 to-emerald-50/25">
      {/* Background dinámico mejorado */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid de datos en el fondo */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.16) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Líneas de conexión de datos */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="aboutDataGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bbf7d0" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>

          {/* Líneas de flujo de datos */}
          <motion.path
            d="M 0 200 Q 300 150 600 200 T 1200 250"
            stroke="url(#aboutDataGrad)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M 0 400 Q 200 350 500 400 T 1200 450"
            stroke="url(#aboutDataGrad)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 3 }}
          />
          <motion.path
            d="M 0 600 Q 400 550 700 600 T 1200 650"
            stroke="url(#aboutDataGrad)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay: 6 }}
          />

          {/* Nodos de datos pulsantes */}
          <motion.circle
            cx="300"
            cy="200"
            r="4"
            fill="#34d399"
            opacity="0.3"
            animate={{
              opacity: 0.5,
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          <motion.circle
            cx="700"
            cy="400"
            r="4"
            fill="#0f766e"
            opacity="0.3"
            animate={{
              opacity: 0.5,
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
          />
        </svg>

        {/* Partículas flotantes de información */}
        {particleConfigs.map((particle, i) => (
          <motion.div
            key={`about-particle-${i}`}
            className="absolute"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0, 0.4, 0],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: i % 4 === 0
                  ? 'rgba(110, 231, 183, 0.7)'
                  : i % 4 === 1
                    ? 'rgba(52, 211, 153, 0.6)'
                    : i % 4 === 2
                      ? 'rgba(34, 197, 94, 0.6)'
                      : 'rgba(16, 185, 129, 0.5)',
                boxShadow: '0 0 8px currentColor',
              }}
            />
          </motion.div>
        ))}

        {/* Ondas de innovación */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`about-wave-${i}`}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${30 + i * 40}% ${40 + i * 20}%, 
                rgba(110, 231, 183, 0.1) 0%, 
                transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.2, 0.05, 0.2],
            }}
            transition={{
              duration: 8 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 4,
            }}
          />
        ))}

        {/* Efectos circulares rotantes */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`about-circle-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 35}%`,
              top: `${25 + i * 20}%`,
              width: `${120 + i * 30}px`,
              height: `${120 + i * 30}px`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25 + i * 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div
              className="w-full h-full opacity-[0.03]"
              style={{
                background: `conic-gradient(from 0deg, transparent, 
                  ${i === 0 ? 'rgba(110, 231, 183, 0.35)' :
                    i === 1 ? 'rgba(52, 211, 153, 0.32)' :
                    'rgba(34, 197, 94, 0.35)'}, transparent)`,
                borderRadius: '50%',
                filter: 'blur(30px)',
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-emerald-950"
            style={{
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
            }}
          >
            Quiénes Somos
          </h2>
        </motion.div>

        {/* Mission, Vision, Values Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Mission & Vision */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Mission */}
            <div className="relative">
              <div className="gradient-border-wrapper full-width rounded-3xl">
                <motion.div
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 transition-all duration-500"
                >
                  <h3
                    className="text-3xl font-bold text-emerald-900 mb-4"
                  >
                    Nuestra Misión
                  </h3>
                  <p className="text-emerald-700 leading-relaxed text-lg">
                    Transformamos las operaciones empresariales mediante soluciones de automatización inteligente e inteligencia artificial, liberando el potencial humano para que las organizaciones se enfoquen en la innovación y el crecimiento estratégico.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Vision */}
            <div className="relative">
              <div className="gradient-border-wrapper full-width rounded-3xl">
                <motion.div
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 transition-all duration-500"
                >
                  <h3
                    className="text-3xl font-bold text-emerald-900 mb-4"
                  >
                    Nuestra Visión
                  </h3>
                  <p className="text-emerald-700 leading-relaxed text-lg">
                    Ser la empresa líder en automatización inteligente en América Latina, reconocida por nuestra capacidad de transformar procesos complejos en soluciones elegantes y eficientes.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Commitment */}
            <div className="relative">
              <div className="gradient-border-wrapper full-width rounded-3xl">
                <motion.div
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 transition-all duration-500"
                >
                  <h3
                    className="text-3xl font-bold text-emerald-900 mb-4"
                  >
                    Nuestro Compromiso
                  </h3>
                  <p className="text-emerald-700 leading-relaxed text-lg">
                    Democratizar el acceso a tecnologías avanzadas, proporcionando implementaciones eficientes, escalables y con un retorno de inversión medible.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - AI Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="gradient-border-wrapper full-width rounded-3xl">
              <div className="relative rounded-3xl overflow-hidden">
                <motion.img
                  src={datacefCity}
                  alt="DATACEF - Letras Luminosas Ciudad"
                  className="w-full h-full object-cover"
                  transition={{ duration: 0.5 }}
                />

                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-emerald-900 text-center mb-4">
            Nuestros Valores
          </h3>
          <p className="text-emerald-700 text-center mb-12 text-lg">
            Los principios que guían cada decisión y proyecto que emprendemos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="gradient-border-wrapper full-width rounded-3xl">
                  <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 transition-all duration-300 group-hover:shadow-xl relative overflow-hidden">
                    {/* Gradient background on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${value.color} p-3 transition-shadow duration-300`}>
                          <value.icon className="w-full h-full text-emerald-950" />
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-xl font-bold text-emerald-900 mb-3 transition-colors duration-300">
                        {value.title}
                      </h4>

                      {/* Description */}
                      <p className="text-emerald-700 transition-colors duration-300">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

