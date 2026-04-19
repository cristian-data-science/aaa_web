import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const StatsSection = () => {
  const isMobile = useIsMobile()
  const stats = [
    {
      number: "+10.000",
      title: "Horas Manuales Ahorradas",
      description: "Automatizando procesos en múltiples industrias",
      icon: "⏱️",
      color: "from-green-500 to-emerald-400"
    },
    {
      number: "+20",
      title: "Proyectos Completados",
      description: "Automatización, software e IA",
      icon: "🚀",
      color: "from-orange-500 to-amber-400"
    },
    {
      number: "9",
      title: "Industrias Atendidas",
      description: "Retail, transporte, RRHH, logística y más",
      icon: "🏭",
      color: "from-purple-500 to-violet-400"
    },
    {
      number: "100%",
      title: "AI-First",
      description: "Tecnología de punta en cada proyecto",
      icon: "🧠",
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
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white/98 via-emerald-50/20 to-white/98">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(187, 247, 208, 0.45) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(110, 231, 183, 0.35) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(226, 252, 239, 0.6) 0%, transparent 50%)
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
            <span className="text-lg font-semibold text-emerald-800">Nuestro Impacto</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-emerald-900 mb-6" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.1)'}}>
            Lo que hemos logrado
          </h2>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
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
            <div key={`wrapper-${index}`} className="gradient-border-wrapper full-width">
              <motion.div 
                key={index} 
                className="h-56 flex flex-col justify-center items-center text-center bg-gradient-to-br from-emerald-50/90 via-emerald-100/80 to-emerald-200/90 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 relative overflow-hidden group w-full"
                variants={cardVariants}
                whileHover={{ 
                  y: -2,
                  transition: { 
                    duration: 0.25, 
                    ease: [0.4, 0, 0.2, 1] 
                  }
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ cursor: 'default' }}
              >
              {/* Icono con efecto de gradiente */}
              <motion.div 
                className="text-5xl mb-4 relative pointer-events-none"
                whileHover={!isMobile ? { 
                  scale: 1.03,
                  transition: { 
                    duration: 0.25, 
                    ease: [0.4, 0, 0.2, 1] 
                  }
                } : {}}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
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

              {/* Efecto de brillo en hover - simplificado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none" />
            </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
