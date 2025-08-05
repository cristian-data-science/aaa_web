import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    {
      number: "200-400%",
      title: "ROI Primer Año",
      description: "Retorno garantizado",
      icon: "📈",
      color: "from-green-500 to-emerald-400"
    },
    {
      number: "40-80%",
      title: "Reducción Tiempo",
      description: "Optimización procesos",
      icon: "⏱️",
      color: "from-orange-500 to-amber-400"
    },
    {
      number: "95%",
      title: "Eliminación Errores",
      description: "Precisión automatizada",
      icon: "🎯",
      color: "from-purple-500 to-violet-400"
    },
    {
      number: "99.9%",
      title: "Uptime Garantizado",
      description: "Disponibilidad continua",
      icon: "⚡",
      color: "from-blue-500 to-cyan-400"
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
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <motion.span 
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🎯
            </motion.span>
            <span className="text-lg font-semibold gradient-text">Resultados Medibles</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-6">
            Resultados Medibles
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Métricas reales que demuestran el impacto de nuestras soluciones en tu empresa.
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
              key={index} 
              className="card-stats-datacef group cursor-pointer"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {/* Icono con efecto de gradiente */}
              <motion.div 
                className="text-5xl mb-4 relative"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {stat.icon}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20 rounded-full blur-lg`} />
              </motion.div>
              
              {/* Número con contador animado */}
              <motion.div 
                className="stat-number"
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
              
              <div className="stat-title">{stat.title}</div>
              <div className="stat-description">{stat.description}</div>

              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;

