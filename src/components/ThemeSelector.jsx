import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check } from 'lucide-react'

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    {
      id: 'dark-green-orange',
      name: 'Dark Green Orange',
      description: 'Moderno y energético',
      colors: ['#22c55e', '#f97316', '#a855f7'],
      isDefault: true
    },
    {
      id: 'dark-purple-pink',
      name: 'Dark Purple Pink',
      description: 'Futurista y disruptivo',
      colors: ['#a855f7', '#ec4899', '#8b5cf6']
    },
    {
      id: 'tech-blue',
      name: 'Tech Blue',
      description: 'Profesional y corporativo',
      colors: ['#3b82f6', '#06b6d4', '#8b5cf6']
    },
    {
      id: 'ai-purple',
      name: 'AI Purple',
      description: 'Inteligente y sofisticado',
      colors: ['#8b5cf6', '#a855f7', '#ec4899']
    },
    {
      id: 'data-green',
      name: 'Data Green',
      description: 'Sostenible y crecimiento',
      colors: ['#22c55e', '#16a34a', '#059669']
    },
    {
      id: 'dark-mode',
      name: 'Dark Mode',
      description: 'Elegante y premium',
      colors: ['#666666', '#999999', '#cccccc']
    }
  ]

  const handleThemeSelect = (themeId) => {
    // Aplicar el tema al documento
    document.documentElement.setAttribute('data-theme', themeId)
    
    // Guardar en localStorage
    localStorage.setItem('datacef-theme', themeId)
    
    // Notificar al componente padre
    onThemeChange(themeId)
    
    // Cerrar el selector
    setIsOpen(false)
  }

  // Cargar tema guardado al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('datacef-theme') || 'dark-green-orange'
    document.documentElement.setAttribute('data-theme', savedTheme)
    onThemeChange(savedTheme)
  }, [onThemeChange])

  return (
    <div className="relative">
      {/* Botón del selector */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
        }}
        
        whileTap={{ scale: 0.95 }}
      >
        <Palette className="w-5 h-5 text-white" />
        <span className="text-white font-medium hidden sm:block">Temas</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white"
        >
          ▼
        </motion.div>
      </motion.button>

      {/* Panel de temas */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para cerrar */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel de selección */}
            <motion.div
              className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-2xl backdrop-blur-md border border-white/20 z-50"
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
              }}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Seleccionar Tema
                </h3>
                
                <div className="space-y-3">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme.id)}
                      className="w-full p-3 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 text-left group"
                      style={{
                        background: currentTheme === theme.id 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(255, 255, 255, 0.05)',
                      }}
                      
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {/* Muestra de colores */}
                            <div className="flex gap-1">
                              {theme.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-4 h-4 rounded-full border border-white/20"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            
                            <div>
                              <h4 className="text-white font-semibold text-sm">
                                {theme.name}
                                {theme.isDefault && (
                                  <span className="ml-2 text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                                    Por defecto
                                  </span>
                                )}
                              </h4>
                              <p className="text-gray-400 text-xs">
                                {theme.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Indicador de selección */}
                        {currentTheme === theme.id && (
                          <motion.div
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 text-center">
                    Los temas se aplican instantáneamente y se guardan automáticamente
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeSelector

