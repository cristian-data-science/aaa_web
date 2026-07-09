import { motion } from 'framer-motion'
import { FileText, Bot, BarChart3 } from 'lucide-react'

const CaseStudies = () => {
  const cases = [
    {
      icon: Bot,
      industry: 'Transformación Digital',
      title: 'Aplicaciones para digitalizar negocios',
      description: 'Diseñamos y desarrollamos aplicaciones a medida que llevan procesos análogos al mundo digital. Desde sistemas internos hasta plataformas cliente, construimos software que transforma la forma en que las empresas operan día a día.',
      metric: '100%',
      metricLabel: 'procesos digitalizados',
      color: 'from-brand-500 to-brand-700'
    },
    {
      icon: FileText,
      industry: 'Comercio Exterior',
      title: '800 horas manuales ahorradas',
      description: 'Automatizamos el proceso completo de ingreso de facturas para una empresa de comercio exterior. Lo que antes requería horas de digitación manual, ahora se procesa de forma automática con validación inteligente.',
      metric: '+800 hrs',
      metricLabel: 'ahorradas al año',
      color: 'from-accent-500 to-brand-600'
    },
    {
      icon: Bot,
      title: 'Facturación 100% automática',
      industry: 'Multi-industria',
      description: 'Construimos automatizaciones que generan facturas de forma autónoma, liberando a los analistas contables del proceso de facturación manual en múltiples áreas de negocio.',
      metric: '0',
      metricLabel: 'intervención manual',
      color: 'from-brand-600 to-accent-600'
    },
    {
      icon: BarChart3,
      title: 'Recolección y análisis de datos automatizado',
      industry: 'Retail · Transporte · Logística',
      description: 'Automatizamos la recolección de datos de distintas fuentes e industrias, transformando información dispersa en análisis accionables para la toma de decisiones.',
      metric: '4',
      metricLabel: 'industrias beneficiadas',
      color: 'from-accent-400 to-accent-600'
    }
  ]

  return (
    <section id="case-studies" className="relative py-20 overflow-hidden bg-white/60">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl" aria-hidden="true">📋</span>
            <span className="text-lg font-semibold text-brand-600">Casos Reales</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-950 mb-6">
            Lo que hemos hecho
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Proyectos concretos con resultados medibles. Sin nombres de fantasía, solo trabajo real.
          </p>
        </motion.div>

        {/* Cases Grid: 2x2 para que las 4 tarjetas queden balanceadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.title}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 flex flex-col
                             border border-brand-100 shadow-card hover:shadow-card-hover
                             transition-shadow duration-300">
                {/* Industry Tag */}
                <span className="inline-block text-xs font-semibold text-brand-800 bg-brand-100 px-3 py-1 rounded-full mb-4 self-start">
                  {caseItem.industry}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${caseItem.color} p-3 mb-6`} aria-hidden="true">
                  <caseItem.icon className="w-full h-full text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-brand-950 mb-4">
                  {caseItem.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                  {caseItem.description}
                </p>

                {/* Metric */}
                <div className="border-t border-brand-100 pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-black bg-gradient-to-r ${caseItem.color} bg-clip-text text-transparent`}>
                      {caseItem.metric}
                    </span>
                    <span className="text-sm text-brand-700 font-medium">
                      {caseItem.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-brand-800 mt-12 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          +20 proyectos completados en retail, transporte, RRHH y logística.
        </motion.p>
      </div>
    </section>
  )
}

export default CaseStudies
