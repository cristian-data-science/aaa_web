import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      icon: "🤖",
      title: "Automatización Inteligente",
      description: "RPA avanzado con IA que aprende y se adapta. Robots que no solo ejecutan tareas, sino que toman decisiones inteligentes.",
      features: [
        "Agentes de IA autónomos",
        "Procesamiento de documentos",
        "Automatización de back-office"
      ],
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-500/30",
      glowColor: "shadow-green-500/20"
    },
    {
      icon: "📊",
      title: "Datos & Inteligencia Artificial",
      description: "Transformamos datos en insights accionables con infraestructuras modernas y modelos de ML avanzados.",
      features: [
        "RAG & IA Conversacional",
        "Análisis predictivo",
        "Data Lakes/Warehouses"
      ],
      color: "from-blue-500 to-cyan-600",
      borderColor: "border-blue-500/30",
      glowColor: "shadow-blue-500/20"
    },
    {
      icon: "📈",
      title: "Marketing & Ventas",
      description: "Automatización inteligente de procesos comerciales que acelera el crecimiento y optimiza conversiones.",
      features: [
        "Email marketing automation",
        "Lead scoring",
        "Revenue operations"
      ],
      color: "from-purple-500 to-violet-600",
      borderColor: "border-purple-500/30",
      glowColor: "shadow-purple-500/20"
    },
    {
      icon: "👥",
      title: "Consultoría & Adopción",
      description: "Te acompañamos en la transformación digital con estrategias personalizadas y gestión del cambio.",
      features: [
        "Estrategia digital",
        "Gestión del cambio",
        "Capacitación especializada"
      ],
      color: "from-orange-500 to-amber-600",
      borderColor: "border-orange-500/30",
      glowColor: "shadow-orange-500/20"
    },
    {
      icon: "🏭",
      title: "Soluciones Verticales",
      description: "Soluciones especializadas para industrias específicas con expertise profundo en cada sector.",
      features: [
        "Manufactura",
        "Retail",
        "Servicios financieros"
      ],
      color: "from-red-500 to-rose-600",
      borderColor: "border-red-500/30",
      glowColor: "shadow-red-500/20"
    },
    {
      icon: "🔧",
      title: "Open Source Enablement",
      description: "Implementación y desarrollo de soluciones open source adaptadas a tus necesidades específicas.",
      features: [
        "Herramientas propias",
        "Integración open source",
        "Desarrollo personalizado"
      ],
      color: "from-teal-500 to-cyan-600",
      borderColor: "border-teal-500/30",
      glowColor: "shadow-teal-500/20"
    }
  ];

  return (
    <section id="services" className="relative py-20 bg-slate-950 overflow-hidden">
      {/* Background dinámico tecnológico */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid tecnológico de fondo */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Líneas de circuito animadas */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="servicesCircuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="25%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="75%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          
          {/* Líneas horizontales flotantes */}
          <motion.path
            d="M 0 150 L 200 150 L 220 130 L 400 130 L 420 150 L 600 150 L 620 170 L 1200 170"
            stroke="url(#servicesCircuitGrad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 0 350 L 150 350 L 170 330 L 350 330 L 370 350 L 550 350 L 570 370 L 1200 370"
            stroke="url(#servicesCircuitGrad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
          />
          <motion.path
            d="M 0 550 L 180 550 L 200 530 L 380 530 L 400 550 L 580 550 L 600 530 L 1200 530"
            stroke="url(#servicesCircuitGrad)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 4 }}
          />

          {/* Nodos de conexión pulsantes */}
          <motion.circle cx="220" cy="330" r="3" fill="#22c55e" opacity="0.4"
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          <motion.circle cx="570" cy="370" r="3" fill="#3b82f6" opacity="0.4"
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
          />
          <motion.circle cx="600" cy="530" r="3" fill="#a855f7" opacity="0.4"
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
        </svg>

        {/* Partículas flotantes de datos */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`service-particle-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + Math.random() * 60}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: i % 3 === 0 
                  ? 'rgba(34, 197, 94, 0.8)' 
                  : i % 3 === 1 
                    ? 'rgba(59, 130, 246, 0.8)' 
                    : 'rgba(168, 85, 247, 0.8)',
                boxShadow: '0 0 12px currentColor',
              }}
            />
          </motion.div>
        ))}

        {/* Ondas de energía */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`service-wave-${i}`}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${25 + i * 25}% ${30 + i * 20}%, 
                rgba(34, 197, 94, 0.01) 0%, 
                transparent 60%)`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-2xl">⚡</span>
            <span className="text-lg font-semibold gradient-text">Nuestros Servicios</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-black gradient-text mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Soluciones Integrales
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Soluciones integrales de automatización e IA que transforman tu empresa y 
            generan resultados medibles desde el primer día.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className={`group relative p-8 rounded-2xl backdrop-blur-sm border ${service.borderColor} 
                         bg-gradient-to-br from-white/[0.02] to-white/[0.08] 
                         hover:bg-gradient-to-br hover:from-white/[0.05] hover:to-white/[0.12]
                         transition-all duration-500 overflow-hidden
                         hover:scale-[1.02] hover:shadow-2xl`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              style={{
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              {/* Fondo animado con gradiente del servicio */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 
                             group-hover:opacity-[0.03] transition-opacity duration-500`} />
              
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute top-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-br ${service.color} 
                               blur-xl opacity-20 -translate-x-1/2 -translate-y-1/2`} />
              </div>

              <div className="relative z-10">
                {/* Icono con animación */}
                <motion.div 
                  className="text-4xl mb-6 inline-block"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  {service.icon}
                </motion.div>
                
                {/* Título */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent 
                             group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                             group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {service.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 
                               transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: featureIndex * 0.3,
                        }}
                      />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Botón */}
                <motion.button 
                  className={`w-full py-3 px-6 rounded-xl border ${service.borderColor} 
                             bg-gradient-to-r ${service.color} text-white font-semibold
                             opacity-80 hover:opacity-100 transition-all duration-300
                             hover:shadow-lg hover:scale-[1.02]`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Más información
                </motion.button>
              </div>

              {/* Efectos decorativos */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full 
                            bg-gradient-to-br from-white/5 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 w-full h-1 
                            bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl backdrop-blur-sm 
                         bg-gradient-to-r from-white/[0.05] to-white/[0.1] border border-white/20
                         hover:from-white/[0.08] hover:to-white/[0.15] transition-all duration-500
                         hover:shadow-2xl hover:shadow-green-500/10">
            <motion.span 
              className="text-2xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🚀
            </motion.span>
            <div className="text-left">
              <p className="text-lg font-semibold text-white mb-2">
                ¿Listo para transformar tu empresa?
              </p>
              <p className="text-gray-300">
                Descubre cómo nuestras soluciones pueden generar un ROI del 200-400% en tu primer año.
              </p>
            </div>
            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Comenzar Ahora
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
