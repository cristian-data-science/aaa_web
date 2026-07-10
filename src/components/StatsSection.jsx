import { motion } from 'framer-motion';
import { Clock, Rocket, Factory, Award } from 'lucide-react';
import SpotlightCard from './ui-fx/SpotlightCard';
import CountUp from './ui-fx/CountUp';
import ScrambleText from './ui-fx/ScrambleText';

const StatsSection = () => {
  const stats = [
    {
      value: 10000,
      prefix: '+',
      title: "Horas Ahorradas",
      description: "Automatizando procesos en múltiples industrias",
      icon: Clock,
      color: "from-brand-500 to-brand-400"
    },
    {
      value: 20,
      prefix: '+',
      title: "Proyectos Completados",
      description: "Automatización, software e IA",
      icon: Rocket,
      color: "from-accent-500 to-accent-400"
    },
    {
      value: 9,
      title: "Industrias Atendidas",
      description: "Retail, transporte, RRHH, logística y más",
      icon: Factory,
      color: "from-brand-600 to-accent-500"
    },
    {
      value: 10,
      prefix: '+',
      title: "Años de Trayectoria",
      description: "Experiencia combinada del equipo",
      icon: Award,
      color: "from-accent-600 to-brand-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="stats" className="on-contrast relative py-24 overflow-hidden bg-surface-contrast rounded-[2.5rem] md:rounded-[3rem] mx-2 md:mx-4">
      {/* Hairlines de luz arriba y abajo */}
      <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent" aria-hidden="true" />

      {/* Decoración interna */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl bg-brand-500/15" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl bg-accent-500/10" />
        <div className="noise-overlay opacity-[0.04]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow mb-6">
            <ScrambleText text="Nuestro Impacto" />
          </p>
          <h2 className="font-display font-bold tracking-tight text-4xl md:text-5xl text-content-1 mb-6">
            Lo que hemos logrado
          </h2>
          <p className="text-xl text-content-2 max-w-3xl mx-auto">
            Números reales de proyectos reales. Así medimos nuestro trabajo.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.title} variants={cardVariants}>
              <SpotlightCard tilt className="card-lux border-beam h-full min-h-56 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                {/* Icono en chip gradiente */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-2.5 mb-5`} aria-hidden="true">
                  <stat.icon className="w-full h-full text-white" />
                </div>

                {/* Contador animado */}
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="font-display font-bold text-4xl md:text-5xl leading-none mb-3 bg-gradient-to-r from-brand-300 to-accent-300 bg-clip-text text-transparent"
                />

                <div className="font-display font-semibold text-xl text-content-1 mb-2 min-h-[3.5rem] flex items-center justify-center leading-snug">{stat.title}</div>
                <div className="text-sm text-content-3 leading-relaxed min-h-[2.75rem] flex items-center justify-center">{stat.description}</div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
