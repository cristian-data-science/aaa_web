import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award, Users, Lightbulb } from 'lucide-react'
import SpotlightCard from './ui-fx/SpotlightCard'
import datacefCity from '../assets/images/datacef-city.webp'

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'AI-First',
      description: 'No le tenemos miedo a lo nuevo. Adoptamos las últimas tecnologías apenas demuestran valor real.',
      color: 'from-brand-400 to-brand-600'
    },
    {
      icon: Award,
      title: 'Excelencia Técnica',
      description: 'Background sólido de ingeniería con estándares altos en cada línea de código y cada entrega.',
      color: 'from-accent-400 to-accent-600'
    },
    {
      icon: Heart,
      title: 'Transparencia',
      description: 'Te decimos las cosas como son. Si algo no se puede, lo decimos. Si hay una forma mejor, la proponemos.',
      color: 'from-brand-500 to-brand-700'
    },
    {
      icon: Target,
      title: 'Resultados Concretos',
      description: 'Cada proyecto tiene métricas claras. Horas ahorradas, procesos automatizados, problemas resueltos.',
      color: 'from-brand-600 to-accent-600'
    },
    {
      icon: Users,
      title: 'Partners, No Proveedores',
      description: 'Trabajamos codo a codo contigo. Entendemos tu negocio antes de escribir la primera línea de código.',
      color: 'from-accent-500 to-brand-600'
    },
    {
      icon: Eye,
      title: 'Adaptabilidad',
      description: 'La tecnología cambia rápido. Nosotros también. Nos desacoplamos de lo rígido para innovar ágilmente.',
      color: 'from-brand-400 to-accent-500'
    }
  ]

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display font-bold tracking-tight text-4xl md:text-5xl mb-8 text-brand-950">
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
            <div className="card-lux rounded-2xl p-8">
              <h3 className="font-display font-semibold text-3xl text-brand-950 mb-4">
                Nuestra Misión
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Habilitamos la transformación tecnológica de empresas en Chile y Latinoamérica. Combinamos ingeniería de software sólida con lo último en inteligencia artificial para resolver problemas reales de negocio — no para vender humo.
              </p>
            </div>

            {/* Vision */}
            <div className="card-lux rounded-2xl p-8">
              <h3 className="font-display font-semibold text-3xl text-brand-950 mb-4">
                Nuestra Visión
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Ser el partner tecnológico de referencia para empresas que quieren innovar de verdad — sin burocracia, con resultados concretos y tecnología de punta. Desde Santiago para todo Chile y Latinoamérica.
              </p>
            </div>

            {/* Commitment */}
            <div className="card-lux rounded-2xl p-8">
              <h3 className="font-display font-semibold text-3xl text-brand-950 mb-4">
                Nuestro Compromiso
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Nos comprometemos con cada proyecto como si fuera nuestro. Entendemos tu negocio primero, proponemos después, y entregamos soluciones que funcionan. Así de simple.
              </p>
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
            {/* Marco gradiente */}
            <div className="relative h-full rounded-2xl p-[2px] bg-gradient-to-br from-brand-400 via-accent-400/60 to-brand-200 shadow-card-hover">
              <div className="relative h-full rounded-[calc(1rem-2px)] overflow-hidden">
                <img
                  src={datacefCity}
                  alt="DATACEF - Letras luminosas sobre una ciudad"
                  className="w-full h-full object-cover"
                  width="1024"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                />

                {/* Overlay sutil para integrar la imagen */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/30 via-transparent to-transparent" aria-hidden="true" />
              </div>

              {/* Badge flotante */}
              <div className="absolute bottom-4 left-4 card-lux rounded-xl px-4 py-3 backdrop-blur-md">
                <p className="font-display text-2xl font-bold gradient-text">+20</p>
                <p className="text-xs text-slate-600">proyectos entregados</p>
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
          <h3 className="font-display font-bold tracking-tight text-4xl text-brand-950 text-center mb-4">
            Nuestro Compromiso
          </h3>
          <p className="text-slate-600 text-center mb-12 text-lg">
            Cómo trabajamos y qué nos mueve como equipo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <SpotlightCard className="card-lux h-full rounded-2xl p-8">
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${value.color} p-3`} aria-hidden="true">
                        <value.icon className="w-full h-full text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-display font-semibold text-xl text-brand-950 mb-3">
                      {value.title}
                    </h4>

                    {/* Description */}
                    <p className="text-slate-600">
                      {value.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
