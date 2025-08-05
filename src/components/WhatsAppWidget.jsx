import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const demoMessages = [
    {
      type: 'received',
      text: '¡Hola! 👋 Soy el asistente virtual de DataCEF',
      time: '10:30'
    },
    {
      type: 'received', 
      text: '¿En qué puedo ayudarte con la automatización de tu empresa?',
      time: '10:30'
    }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // En una implementación real, aquí se enviaría el mensaje
      console.log('Mensaje enviado:', message)
      setMessage('')
      // Simular respuesta automática
      setTimeout(() => {
        console.log('Respuesta automática: Gracias por tu mensaje. Te contactaremos pronto.')
      }, 1000)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mb-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80 h-96 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-500 font-bold text-lg">D</span>
                </div>
                <div>
                  <div className="font-semibold">DataCEF</div>
                  <div className="text-xs opacity-90">En línea</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-green-600 p-1 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {demoMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.5 }}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      msg.type === 'sent'
                        ? 'bg-green-500 text-white rounded-br-sm'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <div className="text-sm">{msg.text}</div>
                    <div className={`text-xs mt-1 ${
                      msg.type === 'sent' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Float Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.7)",
            "0 0 0 10px rgba(34, 197, 94, 0)",
            "0 0 0 0 rgba(34, 197, 94, 0)"
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            1
          </motion.div>
        )}
      </motion.button>
    </div>
  )
}

export default WhatsAppWidget

