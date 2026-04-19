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
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: FileText,
      industry: 'Comercio Exterior',
      title: '800 horas manuales ahorradas',
      description: 'Automatizamos el proceso completo de ingreso de facturas para una empresa de comercio exterior. Lo que antes requería horas de digitación manual, ahora se procesa de forma automática con validación inteligente.',
      metric: '+800 hrs',
      metricLabel: 'ahorradas al año',
      color: 'from-emerald-500 to-green-600'
    },
    {
      icon: Bot,
      title: 'Facturación 100% automática',
      industry: 'Multi-industria',
      description: 'Construimos automatizaciones que generan facturas de forma autónoma, liberando a los analistas contables del proceso de facturación manual en múltiples áreas de negocio.',
      metric: '0',
      metricLabel: 'intervención manual',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: BarChart3,
      title: 'Recolección y análisis de datos automatizado',
      industry: 'Retail · Transporte · Logística',
      description: 'Automatizamos la recolección de datos de distintas fuentes e industrias, transformando información dispersa en análisis accionables para la toma de decisiones.',
      metric: '4',
      metricLabel: 'industrias beneficiadas',
      color: 'from-orange-500 to-amber-600'
    }
  ]

  return (
    <section id="case-studies" className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-white">
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
            <span className="text-2xl">📋</span>
            <span className="text-lg font-semibold text-emerald-800">Casos Reales</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-emerald-900 mb-6" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.1)'}}>
            Lo que hemos hecho
          </h2>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
            Proyectos concretos con resultados medibles. Sin nombres de fantasía, solo trabajo real.
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="gradient-border-wrapper full-width rounded-2xl">
                <div className="gradient-border-inner">
                  <div className="bg-gradient-to-br from-white/95 via-emerald-50/80 to-white/98 rounded-2xl p-8 min-h-[400px] flex flex-col transition-all duration-200">
                    {/* Industry Tag */}
                    <span className="inline-block text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full mb-4 self-start">
                      {caseItem.industry}
                    </span>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${caseItem.color} p-3 mb-6`}>
                      <caseItem.icon className="w-full h-full text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {caseItem.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                      {caseItem.description}
                    </p>

                    {/* Metric */}
                    <div className="border-t border-emerald-100 pt-4">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-3xl font-black bg-gradient-to-r ${caseItem.color} bg-clip-text text-transparent`}>
                          {caseItem.metric}
                        </span>
                        <span className="text-sm text-emerald-700 font-medium">
                          {caseItem.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-emerald-600 mt-12 text-sm"
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
