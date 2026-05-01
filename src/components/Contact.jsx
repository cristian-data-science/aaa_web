import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, Gift, Clock, Zap, Code } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTimeout(() => {
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  const benefits = [
    {
      icon: Gift,
      title: 'Consulta Sin Costo',
      description: 'Conversemos sobre tu caso. Analizamos tus procesos y te decimos honestamente cómo podemos ayudarte.'
    },
    {
      icon: Code,
      title: 'Equipo Técnico Real',
      description: 'Data scientists, ingenieros de software y expertos en IA trabajando en tu proyecto.'
    },
    {
      icon: Clock,
      title: 'Resultados Rápidos',
      description: 'Implementación ágil con resultados visibles en semanas, no en meses.'
    },
    {
      icon: Zap,
      title: 'Tecnología de Punta',
      description: 'Python, JavaScript, modelos de IA de última generación, N8N y las mejores herramientas del mercado.'
    }
  ]

  return (
    <section id="contact" className="relative py-20 overflow-hidden bg-slate-950">
      {/* Background estático de contacto */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid de comunicación */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Efectos estáticos sutiles */}
        <div className="absolute inset-0 opacity-[0.005]">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 bg-gradient-to-r from-emerald-400 via-orange-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            Hablemos de tu Proyecto
          </h2>
          
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            ¿Tienes un proceso manual que te quita horas? ¿Una idea que quieres llevar a la realidad con tecnología? Escríbenos — la primera conversación es sin costo.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            ¿Por qué trabajar con DataCEF?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="gradient-border-wrapper full-width rounded-3xl">
                  <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 transition-all duration-300 group-hover:shadow-lg">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-orange-500 p-4 group-hover:shadow-lg transition-all duration-300">
                      <benefit.icon className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors duration-300">
                    {benefit.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {benefit.description}
                  </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form and Info Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="gradient-border-wrapper rounded-3xl">
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-orange-500 p-3 mr-4">
                  <Mail className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Envíanos un Mensaje</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-200 text-sm font-medium mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-slate-700/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-200 text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-slate-700/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                    placeholder="tu@empresa.com"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-gray-200 text-sm font-medium mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full bg-slate-700/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-200 text-sm font-medium mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full bg-slate-700/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300 resize-none"
                    placeholder="Cuéntanos sobre tu proyecto de automatización..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      ¡Mensaje Enviado!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensaje
                    </span>
                  )}
                </motion.button>
              </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info and Newsletter */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Info */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-orange-500 p-2 mr-4">
                    <Mail className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Email</p>
                    <p className="text-white font-semibold">contacto@datacef.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-orange-500 p-2 mr-4">
                    <MapPin className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Ubicación</p>
                    <p className="text-white font-semibold">Santiago, Chile · Remoto en toda Latinoamérica</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Industries */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-4">Industrias que Atendemos</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Retail', 'Transporte', 'Recursos Humanos', 'Operaciones y Logística'].map((industry, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />
                    <span>{industry}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              className="text-center"
              
              whileTap={{ scale: 0.95 }}
            >
              <button className="bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center">
                  ¿Tienes un proyecto en mente?
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

