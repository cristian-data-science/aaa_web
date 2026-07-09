import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    {
      number: "+10.000",
      title: "Horas Manuales Ahorradas",
      description: "Automatizando procesos en múltiples industrias",
      icon: "⏱️",
      color: "from-brand-500 to-brand-400"
    },
    {
      number: "+20",
      title: "Proyectos Completados",
      description: "Automatización, software e IA",
      icon: "🚀",
      color: "from-accent-500 to-accent-400"
    },
    {
      number: "9",
      title: "Industrias Atendidas",
      description: "Retail, transporte, RRHH, logística y más",
      icon: "🏭",
      color: "from-brand-600 to-accent-500"
    },
    {
      number: "100%",
      title: "AI-First",
      description: "Tecnología de punta en cada proyecto",
      icon: "🧠",
      color: "from-accent-600 to-brand-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl" aria-hidden="true">🎯</span>
            <span className="text-lg font-semibold text-brand-600">Nuestro Impacto</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-950 mb-6">
            Lo que hemos logrado
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="min-h-56 flex flex-col justify-center items-center text-center
                         bg-white/90 backdrop-blur-sm rounded-2xl p-6 w-full
                         border border-brand-100 shadow-card hover:shadow-card-hover
                         transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{
                y: -2,
                transition: {
                  duration: 0.25,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
            >
              {/* Icono con halo de marca */}
              <div className="text-5xl mb-4 relative pointer-events-none" aria-hidden="true">
                {stat.icon}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20 rounded-full blur-lg`} />
              </div>

              {/* Número destacado */}
              <motion.div
                className={`text-4xl md:text-[2.75rem] font-black leading-none mb-3
                           bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: index * 0.1 + 0.5,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>

              <div className="text-xl font-bold text-brand-950 mb-2">{stat.title}</div>
              <div className="text-sm text-slate-600 leading-relaxed">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
