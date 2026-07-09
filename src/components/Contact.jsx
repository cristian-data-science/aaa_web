import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Gift, Clock, Zap, Code } from 'lucide-react'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    _honeypot: ''
  })
  const [isSending, setIsSending] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot: si un bot llena este campo oculto, ignoramos el envío silenciosamente
    if (formData._honeypot) {
      return
    }

    setError('')
    setIsSending(true)

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || 'No especificada',
          message: formData.message,
          time: new Date().toLocaleString('es-CL')
        },
        EMAILJS_PUBLIC_KEY
      )

      setFormData({ name: '', email: '', company: '', message: '', _honeypot: '' })
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (err) {
      console.error('Error al enviar el formulario de contacto:', err)
      setError('No se pudo enviar el mensaje. Intenta nuevamente o escríbenos a contacto@datacef.com')
    } finally {
      setIsSending(false)
    }
  }

  const focusForm = () => {
    const form = document.getElementById('contact-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' })
      const firstInput = form.querySelector('input:not([type="hidden"]):not([tabindex="-1"])')
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: true }), 400)
      }
    }
  }

  const inputClasses = "w-full bg-slate-700/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30 transition-all duration-300"

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
      {/* Decoración sutil en paleta de marca */}
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
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
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
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-brand-300 via-accent-300 to-brand-400 bg-clip-text text-transparent">
            Hablemos de tu Proyecto
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            ¿Tienes un proceso manual que te quita horas? ¿Una idea que quieres llevar a la realidad con tecnología? Escríbenos — la primera conversación es sin costo.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            ¿Por qué trabajar con DataCEF?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group text-center h-full bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8
                           border border-white/10 hover:border-brand-400/40 transition-colors duration-300"
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 p-4" aria-hidden="true">
                    <benefit.icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors duration-300">
                  {benefit.title}
                </h4>

                {/* Description */}
                <p className="text-slate-300">
                  {benefit.description}
                </p>
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
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 p-3 mr-4" aria-hidden="true">
                  <Mail className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Envíanos un Mensaje</h3>
              </div>

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot anti-spam: campo oculto, invisible para personas */}
                <input
                  type="text"
                  name="_honeypot"
                  value={formData._honeypot}
                  onChange={(e) => handleInputChange('_honeypot', e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-slate-200 text-sm font-medium mb-2">
                    Nombre completo *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={inputClasses}
                    placeholder="Tu nombre"
                    autoComplete="name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-slate-200 text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={inputClasses}
                    placeholder="tu@empresa.com"
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="contact-company" className="block text-slate-200 text-sm font-medium mb-2">
                    Empresa
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={inputClasses}
                    placeholder="Nombre de tu empresa"
                    autoComplete="organization"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-slate-200 text-sm font-medium mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    placeholder="Cuéntanos sobre tu proyecto de automatización..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  whileTap={{ scale: 0.98 }}
                  disabled={isSending || isSubmitted}
                >
                  {isSubmitted ? (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                      ¡Mensaje Enviado!
                    </span>
                  ) : isSending ? (
                    <span className="flex items-center justify-center">
                      <span className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                      Enviar Mensaje
                    </span>
                  )}
                </motion.button>

                {error && (
                  <p className="flex items-center gap-2 text-red-400 text-sm" role="alert">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    {error}
                  </p>
                )}
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
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 p-2 mr-4" aria-hidden="true">
                    <Mail className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white font-semibold">
                      <a href="mailto:contacto@datacef.com" className="hover:text-brand-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded">
                        contacto@datacef.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 p-2 mr-4" aria-hidden="true">
                    <MapPin className="w-full h-full text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Ubicación</p>
                    <p className="text-white font-semibold">Santiago, Chile · Remoto en toda Latinoamérica</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Industries */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Industrias que Atendemos</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Retail', 'Transporte', 'Recursos Humanos', 'Operaciones y Logística'].map((industry) => (
                  <div key={industry} className="flex items-center gap-2 text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-400" aria-hidden="true" />
                    <span>{industry}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={focusForm}
                className="btn-primary px-8 py-4 text-lg font-bold"
              >
                ¿Tienes un proyecto en mente?
                <span aria-hidden="true">🚀</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
