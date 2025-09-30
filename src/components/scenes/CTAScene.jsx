import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, Gift, Clock, Shield, Zap, ArrowRight } from 'lucide-react'

/**
 * CTAScene - Escena final de contacto y CTA
 */
const CTAScene = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simular envío
    setTimeout(() => {
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const benefits = [
    {
      icon: Gift,
      title: 'Consulta Gratuita',
      description: 'Análisis inicial sin costo',
      color: '#00ff88',
      bgColor: 'rgba(0, 255, 136, 0.15)',
      borderColor: 'rgba(0, 255, 136, 0.5)',
    },
    {
      icon: Shield,
      title: 'ROI Garantizado',
      description: 'Mejoras medibles o reembolso',
      color: '#10ffcb',
      bgColor: 'rgba(16, 255, 203, 0.15)',
      borderColor: 'rgba(16, 255, 203, 0.5)',
    },
    {
      icon: Clock,
      title: 'Soporte 24/7',
      description: 'Monitoreo continuo',
      color: '#fb923c',
      bgColor: 'rgba(251, 146, 60, 0.15)',
      borderColor: 'rgba(251, 146, 60, 0.5)',
    },
    {
      icon: Zap,
      title: 'Respuesta Rápida',
      description: 'Resultados en semanas',
      color: '#00ff88',
      bgColor: 'rgba(0, 255, 136, 0.15)',
      borderColor: 'rgba(0, 255, 136, 0.5)',
    },
  ]

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contacto@datacef.com',
      link: 'mailto:contacto@datacef.com',
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+54 9 280 123-4567',
      link: 'tel:+5492801234567',
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Santiago de Chile',
      link: null,
    },
  ]

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-12 md:py-20 bg-gradient-to-br from-black via-slate-950 to-black">
      {/* Fondo con efectos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculos de energía */}
        {!prefersReducedMotion && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${20 + i * 25}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1.3,
                  ease: 'easeInOut',
                }}
              >
                <div className={`
                  w-64 h-64
                  bg-gradient-to-br ${i % 2 === 0 ? 'from-neon-green/20' : 'from-neon-lightGreen/20'} to-transparent
                  rounded-full
                  blur-3xl
                `} />
              </motion.div>
            ))}
          </>
        )}

        {/* Grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 217, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 217, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Lado izquierdo - CTA y beneficios */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            {/* Título principal */}
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Comienza tu <span className="text-neon-green text-shadow-cyan">Transformación</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Agenda una consulta gratuita y descubre cómo la IA puede revolucionar tu negocio
            </p>

            {/* Beneficios */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={!prefersReducedMotion ? { scale: 1.05, x: 5 } : {}}
                  className="
                    glass-dark
                    rounded-xl
                    p-4
                    flex items-start gap-3
                    group
                    cursor-pointer
                  "
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg group-hover:shadow-neon-green transition-all duration-300"
                    style={{
                      backgroundColor: benefit.bgColor,
                      border: `1px solid ${benefit.borderColor}`,
                      color: benefit.color
                    }}>
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Información de contacto */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-neon-green/10 border border-neon-green/30 rounded-lg text-neon-green">
                    <contact.icon className="w-5 h-5" />
                  </div>
                  {contact.link ? (
                    <a 
                      href={contact.link}
                      className="hover:text-neon-green transition-colors"
                    >
                      <span className="text-sm text-gray-500 block">{contact.label}</span>
                      <span className="font-medium">{contact.value}</span>
                    </a>
                  ) : (
                    <div>
                      <span className="text-sm text-gray-500 block">{contact.label}</span>
                      <span className="font-medium">{contact.value}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Lado derecho - Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-darker rounded-2xl p-8 border border-neon-green/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Agenda tu Consulta Gratuita
              </h3>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="
                        w-full px-4 py-3
                        bg-black/50
                        border border-neon-green/20
                        rounded-lg
                        text-white
                        placeholder-gray-500
                        focus:outline-none
                        focus:border-neon-green
                        focus:ring-1
                        focus:ring-neon-green
                        transition-all
                      "
                      placeholder="Juan Pérez"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="
                        w-full px-4 py-3
                        bg-black/50
                        border border-neon-green/20
                        rounded-lg
                        text-white
                        placeholder-gray-500
                        focus:outline-none
                        focus:border-neon-green
                        focus:ring-1
                        focus:ring-neon-green
                        transition-all
                      "
                      placeholder="juan@empresa.com"
                    />
                  </div>

                  {/* Empresa */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      className="
                        w-full px-4 py-3
                        bg-black/50
                        border border-neon-green/20
                        rounded-lg
                        text-white
                        placeholder-gray-500
                        focus:outline-none
                        focus:border-neon-green
                        focus:ring-1
                        focus:ring-neon-green
                        transition-all
                      "
                      placeholder="Mi Empresa S.A."
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cuéntanos sobre tu proyecto
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="
                        w-full px-4 py-3
                        bg-black/50
                        border border-neon-green/20
                        rounded-lg
                        text-white
                        placeholder-gray-500
                        focus:outline-none
                        focus:border-neon-green
                        focus:ring-1
                        focus:ring-neon-green
                        transition-all
                        resize-none
                      "
                      placeholder="Queremos automatizar nuestro proceso de..."
                    />
                  </div>

                  {/* Botón de envío */}
                  <motion.button
                    type="submit"
                    whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                    whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                    className="
                      w-full
                      px-8 py-4
                      bg-neon-green text-black
                      font-bold text-lg
                      rounded-lg
                      shadow-neon-green
                      hover:shadow-neon-green-lg
                      transition-all duration-300
                      flex items-center justify-center gap-2
                      group
                    "
                  >
                    <span>Enviar Solicitud</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                  >
                    <CheckCircle className="w-20 h-20 text-neon-green mx-auto mb-4" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    ¡Mensaje Enviado!
                  </h4>
                  <p className="text-gray-300">
                    Nos pondremos en contacto pronto
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CTAScene

