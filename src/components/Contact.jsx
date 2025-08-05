import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Gift, Clock, Shield, Zap } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Simulate newsletter subscription
    setTimeout(() => {
      setIsNewsletterSubmitted(true)
      setNewsletterEmail('')
      setTimeout(() => setIsNewsletterSubmitted(false), 3000)
    }, 1000)
  }

  const benefits = [
    {
      icon: Gift,
      title: 'Consulta Gratuita',
      description: 'Análisis inicial sin costo para identificar oportunidades de automatización.'
    },
    {
      icon: Shield,
      title: 'ROI Garantizado',
      description: 'Comprometemos mejoras medibles o reembolso de la inversión.'
    },
    {
      icon: Clock,
      title: 'Soporte 24/7',
      description: 'Monitoreo continuo y soporte técnico para sistemas críticos.'
    },
    {
      icon: Zap,
      title: 'Respuesta Rápida',
      description: 'Implementación ágil con resultados visibles en semanas.'
    }
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 30}%`,
              width: `${120 + i * 40}px`,
              height: `${120 + i * 40}px`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="w-full h-full opacity-5"
              style={{
                background: `conic-gradient(from 0deg, transparent, rgba(34, 197, 94, 0.4), transparent)`,
                borderRadius: '50%',
                filter: 'blur(40px)',
              }}
            />
          </motion.div>
        ))}
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
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            animate={{
              backgroundImage: [
                'linear-gradient(45deg, #22C55E, #F97316, #A855F7)',
                'linear-gradient(45deg, #F97316, #A855F7, #22C55E)',
                'linear-gradient(45deg, #A855F7, #22C55E, #F97316)',
                'linear-gradient(45deg, #22C55E, #F97316, #A855F7)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Hablemos de tu Negocio
          </motion.h2>
          
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Estamos listos para ayudarte a automatizar tus procesos y acelerar tu crecimiento. Contáctanos para una consulta gratuita.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            ¿Por qué elegir DataCEF?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 group-hover:shadow-2xl">
                  {/* Icon */}
                  <motion.div 
                    className="mb-6 flex justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-orange-500 p-4 group-hover:shadow-lg transition-all duration-300">
                      <benefit.icon className="w-full h-full text-white" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors duration-300">
                    {benefit.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500">
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
                  whileHover={{ scale: 1.02 }}
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
                    <Phone className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Teléfono</p>
                    <p className="text-white font-semibold">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-orange-500 p-2 mr-4">
                    <MapPin className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Ubicación</p>
                    <p className="text-white font-semibold">América Latina</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-6">
                Recibe las últimas tendencias en automatización e IA directamente en tu inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-700/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="tu@email.com"
                  required
                />

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isNewsletterSubmitted}
                >
                  {isNewsletterSubmitted ? (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      ¡Suscrito!
                    </span>
                  ) : (
                    'Suscribirse'
                  )}
                </motion.button>
              </form>
            </div>

            {/* CTA Button */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center">
                  ¿Listo para transformar tu empresa?
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

