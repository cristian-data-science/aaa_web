import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Services = () => {
  const isMobile = useIsMobile()
  const services = [
    {
      icon: "💻",
      title: "Desarrollo de Software a Medida",
      description: "Entendemos tus procesos de negocio, identificamos los dolores reales y construimos software que automatiza lo repetitivo y abre la puerta a innovar con IA. Cada línea de código tiene un propósito.",
      features: [
        "Aplicaciones web y móvil",
        "APIs e integraciones",
        "Arquitectura diseñada para tu negocio"
      ],
      color: "from-emerald-500 to-green-600",
      borderColor: "border-emerald-500/30",
      glowColor: "shadow-emerald-500/20"
    },
    {
      icon: "🤖",
      title: "Automatización Inteligente",
      description: "Eliminamos el trabajo manual repetitivo con herramientas como N8N y Make, conectadas con IA. Tu equipo deja de copiar y pegar para enfocarse en lo que importa.",
      features: [
        "Automatización de facturación",
        "Procesamiento de documentos",
        "Flujos de trabajo inteligentes"
      ],
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-500/30",
      glowColor: "shadow-green-500/20"
    },
    {
      icon: "📊",
      title: "Datos & Inteligencia Artificial",
      description: "Convertimos datos en decisiones concretas. Construimos agentes de IA, modelos de análisis y sistemas conversacionales que entienden tu negocio.",
      features: [
        "Agentes de IA personalizados",
        "Análisis de datos avanzado",
        "IA Conversacional (RAG)"
      ],
      color: "from-blue-500 to-cyan-600",
      borderColor: "border-blue-500/30",
      glowColor: "shadow-blue-500/20"
    },
    {
      icon: "👥",
      title: "Consultoría & Adopción Tecnológica",
      description: "Te acompañamos desde el diagnóstico hasta la implementación. No solo entregamos tecnología — nos aseguramos de que tu equipo la adopte y le saque provecho.",
      features: [
        "Diagnóstico de procesos",
        "Estrategia de automatización",
        "Capacitación de equipos"
      ],
      color: "from-orange-500 to-amber-600",
      borderColor: "border-orange-500/30",
      glowColor: "shadow-orange-500/20"
    },
    {
      icon: "🔧",
      title: "Soluciones Open Source",
      description: "Implementamos y adaptamos herramientas open source para que tengas soluciones potentes sin depender de licencias costosas. Libertad tecnológica real.",
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

  // Precomputar partículas de fondo para evitar Math.random en render
  const particles = useMemo(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
    const count = prefersReduced || isMobile ? 2 : 6
    return Array.from({ length: count }).map((_, i) => ({
      key: `service-particle-${i}`,
      left: 15 + i * 15,
      top: 20 + ((i * 37) % 60),
      size: isMobile ? 2 : 2 + ((i * 13) % 3),
      dx: (i % 2 === 0 ? 1 : -1) * (isMobile ? 4 : (5 + (i * 3) % 10)),
      duration: isMobile ? 6 : 8 + (i * 2) % 6,
      delay: (i * 1.3) % 5,
      color: i % 3 === 0 ? 'rgba(34, 197, 94, 0.8)' : i % 3 === 1 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(168, 85, 247, 0.8)'
    }))
  }, [])

  return (
    <section id="services" data-section="services" className="relative py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden">
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
        
        {/* Líneas estáticas simples */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="servicesCircuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          
          {/* Líneas estáticas sin animación */}
          <path
            d="M 0 300 L 1200 300"
            stroke="url(#servicesCircuitGrad)"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M 600 0 L 600 800"
            stroke="url(#servicesCircuitGrad)"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
        </svg>

        {/* Partículas simplificadas - sin animación en móvil */}
        {!isMobile && particles.slice(0, 2).map((p) => (
          <motion.div
            key={p.key}
            className="absolute"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: p.duration + 3,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: p.color,
                filter: 'blur(1px)',
              }}
            />
          </motion.div>
        ))}

        {/* Ondas muy suaves (solo 1) */}
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.005) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
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
            <span className="text-lg font-semibold text-emerald-600">Lo que hacemos</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-black text-emerald-700 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nuestros Servicios
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-900 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Cada empresa es distinta. Por eso combinamos desarrollo de software, automatización e IA para armar la solución que tu negocio realmente necesita.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={`border-${index}`} className="gradient-border-wrapper full-width">
              <div className="gradient-border-inner">
                <motion.div 
                  className={`group relative p-6 md:p-8 rounded-2xl backdrop-blur-sm min-h-[480px] flex flex-col justify-between
                             bg-gradient-to-br from-white/95 via-emerald-50/80 to-white/98
                             hover:bg-gradient-to-br hover:from-white/98 hover:to-emerald-50/90
                             transition-all ${isMobile ? 'duration-150' : 'duration-200'} overflow-hidden
                             ${isMobile ? '' : 'md:hover:scale-[1.005] md:hover:shadow-lg'}`}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ 
                duration: 0.6, 
                delay: index * 0.08,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: '-30px' }}
            >
              {/* Fondo simple sin parpadeos */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-[0.005] 
                             ${!isMobile ? 'group-hover:opacity-[0.02]' : ''} transition-opacity duration-300 ease-out`} />

              <div className="relative z-10">
                {/* Icono simplificado */}
                <div className="text-4xl mb-6 inline-block">
                  {service.icon}
                </div>
                
                {/* Título */}
                <h3 className={`text-xl font-bold text-gray-900 mb-4 transition-colors duration-200 
                              ${!isMobile ? 'group-hover:text-gray-800' : ''}`}>
                  {service.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-gray-700 mb-6 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                  {service.description}
                </p>
                
                {/* Features */}
        <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center gap-3 text-sm text-emerald-700 group-hover:text-emerald-600 
                               transition-colors ${isMobile ? 'duration-150' : 'duration-300'} font-medium"
                      initial={isMobile ? {} : { opacity: 0, x: -12 }}
                      whileInView={isMobile ? {} : { opacity: 1, x: 0 }}
                      transition={isMobile ? {} : { duration: 0.3, delay: Math.min(index * 0.08 + featureIndex * 0.08, 0.6) }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}
                        animate={isMobile ? {} : {
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={isMobile ? {} : {
                          duration: 2,
                          repeat: Infinity,
                          delay: featureIndex * 0.25,
                        }}
                      />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Botón simplificado */}
                <button 
                  className={`w-full py-3 px-6 rounded-xl border ${service.borderColor} 
                             bg-gradient-to-r ${service.color} text-white font-semibold
                             opacity-80 hover:opacity-100 transition-all duration-200
                             hover:shadow-md hover:scale-[1.01]`}
                >
                  Más información
                </button>
              </div>

              {/* Efecto decorativo mínimo */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 
                            bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </motion.div>
              </div>
            </div>
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
              <p className="text-lg font-semibold text-gray-900 mb-2">
                ¿Tienes un proceso que te quita tiempo?
              </p>
              <p className="text-gray-700">
                Contáctanos y te mostramos cómo podemos automatizarlo o mejorarlo con tecnología.
              </p>
            </div>
            <motion.button 
              className="btn btn-primary"
              
              whileTap={{ scale: 0.95 }}
            >
              Conversemos
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;


