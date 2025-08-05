import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award, Users, Lightbulb } from 'lucide-react'
import aiWork from '../assets/images/ai-work.jpg'

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovación Responsable',
      description: 'Adoptamos tecnologías avanzadas de manera ética y responsable.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Award,
      title: 'Excelencia Técnica',
      description: 'Mantenemos los más altos estándares de calidad en cada proyecto.',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Heart,
      title: 'Transparencia y Confianza',
      description: 'Construimos relaciones duraderas basadas en la transparencia.',
      color: 'from-pink-400 to-red-500'
    },
    {
      icon: Target,
      title: 'Impacto Medible',
      description: 'Cada solución genera un impacto cuantificable y comunicable.',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Colaboración',
      description: 'Trabajamos como socios en el proceso de transformación digital.',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Eye,
      title: 'Adaptabilidad',
      description: 'Mantenemos una mentalidad de aprendizaje continuo.',
      color: 'from-purple-400 to-indigo-500'
    }
  ]

  const team = [
    {
      name: 'Ana García',
      role: 'CEO & Fundadora',
      expertise: 'Estrategia Digital, IA',
      color: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'CTO',
      expertise: 'Machine Learning, RPA',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'María López',
      role: 'Head of Data',
      expertise: 'Data Science, Analytics',
      color: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Diego Martín',
      role: 'Lead Developer',
      expertise: 'Automatización, APIs',
      color: 'from-orange-400 to-red-500'
    }
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 40}%`,
              top: `${20 + i * 30}%`,
              width: `${150 + i * 40}px`,
              height: `${150 + i * 40}px`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="w-full h-full opacity-5"
              style={{
                background: `conic-gradient(from 0deg, transparent, rgba(34, 197, 94, 0.3), transparent)`,
                borderRadius: '50%',
                filter: 'blur(40px)',
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
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8"
            animate={{
              backgroundImage: [
                'linear-gradient(45deg, #22C55E, #F97316, #A855F7)',
                'linear-gradient(45deg, #F97316, #A855F7, #22C55E)',
                'linear-gradient(45deg, #A855F7, #22C55E, #F97316)',
                'linear-gradient(45deg, #22C55E, #F97316, #A855F7)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Quiénes Somos
          </motion.h2>
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
              <motion.div
                className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
              >
                <motion.h3 
                  className="text-3xl font-bold text-white mb-4"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(34, 197, 94, 0.5)',
                      '0 0 20px rgba(249, 115, 22, 0.5)',
                      '0 0 10px rgba(34, 197, 94, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Nuestra Misión
                </motion.h3>
                <p className="text-gray-200 leading-relaxed text-lg">
                  Transformamos las operaciones empresariales mediante soluciones de automatización inteligente e inteligencia artificial, liberando el potencial humano para que las organizaciones se enfoquen en la innovación y el crecimiento estratégico.
                </p>
              </motion.div>
            </div>

            {/* Vision */}
            <div className="relative">
              <motion.div
                className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
              >
                <motion.h3 
                  className="text-3xl font-bold text-white mb-4"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(168, 85, 247, 0.5)',
                      '0 0 20px rgba(34, 197, 94, 0.5)',
                      '0 0 10px rgba(168, 85, 247, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  Nuestra Visión
                </motion.h3>
                <p className="text-gray-200 leading-relaxed text-lg">
                  Ser la empresa líder en automatización inteligente en América Latina, reconocida por nuestra capacidad de transformar procesos complejos en soluciones elegantes y eficientes.
                </p>
              </motion.div>
            </div>

            {/* Commitment */}
            <div className="relative">
              <motion.div
                className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
              >
                <motion.h3 
                  className="text-3xl font-bold text-white mb-4"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(249, 115, 22, 0.5)',
                      '0 0 20px rgba(168, 85, 247, 0.5)',
                      '0 0 10px rgba(249, 115, 22, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                >
                  Nuestro Compromiso
                </motion.h3>
                <p className="text-gray-200 leading-relaxed text-lg">
                  Democratizar el acceso a tecnologías avanzadas, proporcionando implementaciones eficientes, escalables y con un retorno de inversión medible.
                </p>
              </motion.div>
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
            <div className="relative rounded-3xl overflow-hidden">
              <motion.img
                src={aiWork}
                alt="Inteligencia Artificial"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              
              {/* Floating elements */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-r from-green-400 to-orange-500 rounded-full"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${15 + i * 15}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
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
          <h3 className="text-4xl font-bold text-white text-center mb-4">
            Nuestros Valores
          </h3>
          <p className="text-gray-300 text-center mb-12 text-lg">
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
                whileHover={{ y: -5 }}
              >
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 group-hover:shadow-2xl relative overflow-hidden">
                  {/* Gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}
                  />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div 
                      className="mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${value.color} p-3 group-hover:shadow-lg transition-all duration-300`}>
                        <value.icon className="w-full h-full text-white" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors duration-300">
                      {value.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-white text-center mb-4">
            Nuestro Equipo
          </h3>
          <p className="text-gray-300 text-center mb-12 text-lg">
            Expertos en automatización e IA comprometidos con tu éxito.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 group-hover:shadow-2xl">
                  {/* Avatar placeholder */}
                  <motion.div 
                    className={`w-24 h-24 rounded-full bg-gradient-to-r ${member.color} mx-auto mb-6 flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Users className="w-12 h-12 text-white" />
                  </motion.div>

                  {/* Name */}
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
                    {member.name}
                  </h4>

                  {/* Role */}
                  <p className="text-green-400 font-semibold mb-2">
                    {member.role}
                  </p>

                  {/* Expertise */}
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                    {member.expertise}
                  </p>
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

