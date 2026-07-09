import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { scrollToSection } from '@/lib/scroll';

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
      color: "from-brand-500 to-brand-700"
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
      color: "from-accent-500 to-brand-600"
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
      color: "from-brand-600 to-accent-600"
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
      color: "from-brand-400 to-brand-600"
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
      color: "from-accent-400 to-accent-600"
    }
  ];

  return (
    <section id="services" data-section="services" className="relative py-20 bg-white/60 overflow-hidden">
      {/* Contenido principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-2xl" aria-hidden="true">⚡</span>
            <span className="text-lg font-semibold text-brand-600">Lo que hacemos</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-black text-brand-950 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nuestros Servicios
          </motion.h2>

          <motion.p
            className="text-xl text-slate-600 max-w-3xl mx-auto"
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
            <motion.div
              key={service.title}
              className={`group relative p-6 md:p-8 rounded-2xl bg-white/90 backdrop-blur-sm
                         border border-brand-100 shadow-card hover:shadow-card-hover
                         flex flex-col transition-shadow ${isMobile ? 'duration-150' : 'duration-300'}`}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: '-30px' }}
            >
              {/* Icono */}
              <div className="text-4xl mb-6 inline-block" aria-hidden="true">
                {service.icon}
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-brand-950 mb-4">
                {service.title}
              </h3>

              {/* Descripción */}
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center gap-3 text-sm text-brand-700 font-medium"
                    initial={isMobile ? {} : { opacity: 0, x: -12 }}
                    whileInView={isMobile ? {} : { opacity: 1, x: 0 }}
                    transition={isMobile ? {} : { duration: 0.3, delay: Math.min(index * 0.08 + featureIndex * 0.08, 0.6) }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} aria-hidden="true" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA de la tarjeta */}
              <button
                onClick={() => scrollToSection('contact')}
                className={`mt-auto w-full py-3 px-6 rounded-xl bg-gradient-to-r ${service.color}
                           text-white font-semibold cursor-pointer
                           hover:brightness-105 hover:shadow-md transition-all duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2`}
              >
                Más información
              </button>
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl
                         bg-white/90 backdrop-blur-sm border border-brand-100 shadow-card">
            <span className="text-2xl" aria-hidden="true">🚀</span>
            <div className="text-left">
              <p className="text-lg font-semibold text-brand-950 mb-2">
                ¿Tienes un proceso que te quita tiempo?
              </p>
              <p className="text-slate-600">
                Contáctanos y te mostramos cómo podemos automatizarlo o mejorarlo con tecnología.
              </p>
            </div>
            <motion.button
              className="btn-primary"
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
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
