import React from 'react';

const Services = () => {
  const services = [
    {
      icon: "🤖",
      title: "Automatización Inteligente",
      description: "RPA avanzado con IA que aprende y se adapta. Robots que no solo ejecutan tareas, sino que toman decisiones inteligentes.",
      features: [
        "Agentes de IA autónomos",
        "Procesamiento de documentos",
        "Automatización de back-office"
      ]
    },
    {
      icon: "📊",
      title: "Datos & Inteligencia Artificial",
      description: "Transformamos datos en insights accionables con infraestructuras modernas y modelos de ML avanzados.",
      features: [
        "RAG & IA Conversacional",
        "Análisis predictivo",
        "Data Lakes/Warehouses"
      ]
    },
    {
      icon: "📈",
      title: "Marketing & Ventas",
      description: "Automatización inteligente de procesos comerciales que acelera el crecimiento y optimiza conversiones.",
      features: [
        "Email marketing automation",
        "Lead scoring",
        "Revenue operations"
      ]
    },
    {
      icon: "👥",
      title: "Consultoría & Adopción",
      description: "Te acompañamos en la transformación digital con estrategias personalizadas y gestión del cambio.",
      features: [
        "Estrategia digital",
        "Gestión del cambio",
        "Capacitación especializada"
      ]
    },
    {
      icon: "🏭",
      title: "Soluciones Verticales",
      description: "Soluciones especializadas para industrias específicas con expertise profundo en cada sector.",
      features: [
        "Manufactura",
        "Retail",
        "Servicios financieros"
      ]
    },
    {
      icon: "🔧",
      title: "Open Source Enablement",
      description: "Implementación y desarrollo de soluciones open source adaptadas a tus necesidades específicas.",
      features: [
        "Herramientas propias",
        "Integración open source",
        "Desarrollo personalizado"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-950">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl">⚡</span>
            <span className="text-lg font-semibold gradient-text">Nuestros Servicios</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-6">
            Soluciones Integrales
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluciones integrales de automatización e IA que transforman tu empresa y 
            generan resultados medibles desde el primer día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <button className="btn btn-secondary mt-4">
                Más información
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl glass">
            <span className="text-2xl">🚀</span>
            <div className="text-left">
              <p className="text-lg font-semibold text-white mb-2">
                ¿Listo para transformar tu empresa?
              </p>
              <p className="text-gray-300">
                Descubre cómo nuestras soluciones pueden generar un ROI del 200-400% en tu primer año.
              </p>
            </div>
            <button className="btn btn-primary">
              Comenzar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

