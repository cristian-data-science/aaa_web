import { motion } from 'framer-motion'
import { Bot, Database, TrendingUp, Users, Factory, Wrench } from 'lucide-react'

/**
 * ServicesScene - Escena de servicios con cards interactivas
 */
const ServicesScene = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const services = [
    {
      icon: Bot,
      title: "Automatización Inteligente",
      description: "RPA avanzado con IA que aprende y se adapta a tus procesos",
      features: ["Agentes de IA autónomos", "Procesamiento de documentos", "Automatización de back-office"],
      color: "from-neon-green to-emerald-600",
      iconColor: "text-neon-green",
    },
    {
      icon: Database,
      title: "Datos & AI",
      description: "Infraestructuras modernas y modelos de ML que transforman datos en decisiones",
      features: ["RAG & IA Conversacional", "Análisis predictivo", "Data Lakes/Warehouses"],
      color: "from-neon-lightGreen to-green-600",
      iconColor: "text-neon-lightGreen",
    },
    {
      icon: TrendingUp,
      title: "Marketing & Ventas",
      description: "Automatización que acelera el crecimiento y optimiza conversiones",
      features: ["Email marketing automation", "Lead scoring", "Revenue operations"],
      color: "from-neon-green to-emerald-500",
      iconColor: "text-neon-green",
    },
    {
      icon: Users,
      title: "Consultoría & Adopción",
      description: "Acompañamiento en transformación digital con gestión del cambio",
      features: ["Estrategia digital", "Gestión del cambio", "Capacitación especializada"],
      color: "from-orange-500 to-amber-600",
      iconColor: "text-orange-400",
    },
    {
      icon: Factory,
      title: "Soluciones Verticales",
      description: "Soluciones especializadas con expertise profundo en cada sector",
      features: ["Manufactura", "Retail", "Servicios financieros"],
      color: "from-red-500 to-rose-600",
      iconColor: "text-red-400",
    },
    {
      icon: Wrench,
      title: "Open Source Enablement",
      description: "Implementación y desarrollo de soluciones open source personalizadas",
      features: ["Herramientas propias", "Integración open source", "Desarrollo personalizado"],
      color: "from-neon-darkGreen to-emerald-900",
      iconColor: "text-emerald-400",
    },
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
      {/* Grid de fondo */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Partículas flotantes */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-green/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

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
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Nuestros <span className="text-neon-green text-shadow-green">Servicios</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Soluciones completas de IA y automatización para cada área de tu negocio
          </p>
        </motion.div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={!prefersReducedMotion ? { 
                scale: 1.05,
                y: -10,
              } : {}}
              className="group relative"
            >
              {/* Card */}
              <div className="
                relative h-full
                bg-gradient-to-br from-slate-900/60 to-black/60
                backdrop-blur-md
                border border-neon-green/20
                rounded-2xl
                p-6
                overflow-hidden
                transition-all duration-300
                hover:border-neon-green/50
                hover:shadow-neon-green
              ">
                {/* Gradiente de fondo del card */}
                <div className={`
                  absolute inset-0 
                  bg-gradient-to-br ${service.color}
                  opacity-0 group-hover:opacity-10
                  transition-opacity duration-300
                `} />

                {/* Icono */}
                <div className="relative mb-4">
                  <motion.div
                    animate={!prefersReducedMotion ? {
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className={`
                      w-16 h-16 
                      flex items-center justify-center
                      bg-black/50
                      border border-neon-green/30
                      rounded-xl
                      ${service.iconColor}
                      group-hover:shadow-neon-green
                      transition-shadow duration-300
                    `}
                  >
                    <service.icon className="w-8 h-8" />
                  </motion.div>
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors">
                  {service.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      <span className="w-1.5 h-1.5 bg-neon-green rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Glow effect en hover */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-neon-green via-neon-lightGreen to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl -z-10"
                    initial={false}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesScene
