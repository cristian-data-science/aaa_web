import { motion } from 'framer-motion'
import { FileText, Bot, BarChart3 } from 'lucide-react'
import SpotlightCard from './ui-fx/SpotlightCard'
import CountUp from './ui-fx/CountUp'
import ScrambleText from './ui-fx/ScrambleText'

const CaseStudies = () => {
  const cases = [
    {
      icon: Bot,
      industry: 'Transformación Digital',
      title: 'Aplicaciones para digitalizar negocios',
      description: 'Diseñamos y desarrollamos aplicaciones a medida que llevan procesos análogos al mundo digital. Desde sistemas internos hasta plataformas cliente, construimos software que transforma la forma en que las empresas operan día a día.',
      metric: { value: 100, suffix: '%' },
      metricLabel: 'procesos digitalizados',
      color: 'from-brand-500 to-brand-700'
    },
    {
      icon: FileText,
      industry: 'Comercio Exterior',
      title: '800 horas manuales ahorradas',
      description: 'Automatizamos el proceso completo de ingreso de facturas para una empresa de comercio exterior. Lo que antes requería horas de digitación manual, ahora se procesa de forma automática con validación inteligente.',
      metric: { value: 800, prefix: '+', suffix: ' hrs' },
      metricLabel: 'ahorradas al año',
      color: 'from-accent-500 to-brand-600'
    },
    {
      icon: Bot,
      title: 'Facturación 100% automática',
      industry: 'Multi-industria',
      description: 'Construimos automatizaciones que generan facturas de forma autónoma, liberando a los analistas contables del proceso de facturación manual en múltiples áreas de negocio.',
      metric: null,
      metricStatic: '0',
      metricLabel: 'intervención manual',
      color: 'from-brand-600 to-accent-600'
    },
    {
      icon: BarChart3,
      title: 'Recolección y análisis de datos automatizado',
      industry: 'Retail · Transporte · Logística',
      description: 'Automatizamos la recolección de datos de distintas fuentes e industrias, transformando información dispersa en análisis accionables para la toma de decisiones.',
      metric: { value: 4 },
      metricLabel: 'industrias beneficiadas',
      color: 'from-accent-400 to-accent-600'
    }
  ]

  return (
    <section id="case-studies" className="relative py-20 overflow-hidden bg-surface-3">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow mb-6">
            <ScrambleText text="Casos Reales" />
          </p>
          <h2 className="font-display font-bold tracking-tight text-4xl md:text-5xl text-content-1 mb-6">
            Lo que hemos hecho
          </h2>
          <p className="text-xl text-content-2 max-w-3xl mx-auto">
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
              <SpotlightCard tilt className="card-lux border-beam h-full rounded-2xl p-8 flex flex-col">
                {/* Industry Tag */}
                <span className="inline-block text-xs font-semibold text-accent-ink bg-chip px-3 py-1 rounded-full mb-4 self-start">
                  {caseItem.industry}
                </span>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${caseItem.color} p-3 mb-6`} aria-hidden="true">
                  <caseItem.icon className="w-full h-full text-white" />
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-xl text-content-1 mb-4">
                  {caseItem.title}
                </h3>

                {/* Description */}
                <p className="text-content-2 leading-relaxed mb-6 flex-grow">
                  {caseItem.description}
                </p>

                {/* Metric */}
                <div className="border-t border-edge pt-4">
                  <div className="flex items-baseline gap-2">
                    {caseItem.metric ? (
                      <CountUp
                        value={caseItem.metric.value}
                        prefix={caseItem.metric.prefix}
                        suffix={caseItem.metric.suffix}
                        className={`font-display text-3xl font-bold bg-gradient-to-r ${caseItem.color} bg-clip-text text-transparent`}
                      />
                    ) : (
                      <span className={`font-display text-3xl font-bold bg-gradient-to-r ${caseItem.color} bg-clip-text text-transparent`}>
                        {caseItem.metricStatic}
                      </span>
                    )}
                    <span className="text-sm text-accent-ink font-medium">
                      {caseItem.metricLabel}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-content-2 mt-12 text-sm"
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
