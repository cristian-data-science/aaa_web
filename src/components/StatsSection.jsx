import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      number: "200-400%",
      title: "ROI Primer Año",
      description: "Retorno garantizado",
      icon: "📈"
    },
    {
      number: "40-80%",
      title: "Reducción Tiempo",
      description: "Optimización procesos",
      icon: "⏱️"
    },
    {
      number: "95%",
      title: "Eliminación Errores",
      description: "Precisión automatizada",
      icon: "🎯"
    },
    {
      number: "99.9%",
      title: "Uptime Garantizado",
      description: "Disponibilidad continua",
      icon: "⚡"
    }
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl">🎯</span>
            <span className="text-lg font-semibold gradient-text">Resultados Medibles</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-6">
            Resultados Medibles
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Métricas reales que demuestran el impacto de nuestras soluciones en tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card-stats-datacef">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

