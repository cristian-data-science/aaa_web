import { useState } from 'react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const EMPTY = { name: '', email: '', company: '', message: '', _honeypot: '' }

// Lógica compartida del formulario de contacto (EmailJS + honeypot).
// Cada experiencia visual renderiza su propia UI encima de este hook.
export const useContactForm = () => {
  const [formData, setFormData] = useState(EMPTY)
  const [isSending, setIsSending] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot: si un bot llena este campo oculto, ignoramos el envío
    if (formData._honeypot) return

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
          time: new Date().toLocaleString('es-CL'),
        },
        EMAILJS_PUBLIC_KEY
      )

      setFormData(EMPTY)
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (err) {
      console.error('Error al enviar el formulario de contacto:', err)
      setError('No se pudo enviar el mensaje. Intenta nuevamente o escríbenos a contacto@datacef.com')
    } finally {
      setIsSending(false)
    }
  }

  return { formData, isSending, isSubmitted, error, handleInputChange, handleSubmit }
}
