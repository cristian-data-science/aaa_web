import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

const TypewriterAnimation = () => {
  const isMobile = useIsMobile()
  
  const words = useMemo(() => [
    'Agentes',
    'Automatizaciones', 
    'Inteligencia Artificial',
    'Análisis de Datos',
    'Vendedores Autónomos',
    'Infraestructura Tecnológica'
  ], [])

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  
  // Configuración optimizada para móviles
  const config = useMemo(() => ({
    typingSpeed: isMobile ? 150 : 100,    // Más lento en móvil
    deletingSpeed: isMobile ? 80 : 50,    // Más lento en móvil
    pauseTime: isMobile ? 3000 : 2000,    // Pausa más larga en móvil
    enableAnimation: !isMobile || (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches),
    showStatic: isMobile && typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }), [isMobile])

  useEffect(() => {
    // No ejecutar efecto si es modo estático
    if (config.showStatic) return
    
    const currentWord = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false)
        setIsDeleting(true)
        return
      }

      if (isDeleting) {
        // Borrando texto
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Terminó de borrar, pasar a la siguiente palabra
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      } else {
        // Escribiendo texto
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        } else {
          // Terminó de escribir, pausar antes de borrar
          setIsPaused(true)
        }
      }
    }, isDeleting ? config.deletingSpeed : isPaused ? config.pauseTime : config.typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, config])

  // Renderizado condicional SIN early return
  if (config.showStatic) {
    return (
      <div className="relative flex items-center justify-center">
        <div className="flex items-center justify-center min-h-[80px] md:min-h-[100px]">
          <span
            className="inline-block text-4xl md:text-6xl lg:text-7xl font-black"
            style={{
              background: 'linear-gradient(45deg, #059669, #dc2626, #7c3aed)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))'
            }}
          >
            Inteligencia Artificial
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Contenedor con altura fija para evitar saltos */}
      <div className="flex items-baseline justify-center min-h-[100px] md:min-h-[140px] py-4">
        <motion.span
          className="inline-block text-4xl md:text-6xl lg:text-7xl font-black leading-relaxed"
          style={{
            background: 'linear-gradient(45deg, #059669, #dc2626, #7c3aed)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundSize: isMobile ? '100% 100%' : '200% 200%',
            filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
            lineHeight: '1.3'
          }}
          animate={config.enableAnimation ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          } : {}}
          transition={config.enableAnimation ? {
            duration: isMobile ? 4 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          } : {}}
        >
          {currentText}
        </motion.span>
        
        {/* Cursor optimizado para móviles */}
        <motion.span
          className="inline-block w-1 h-10 md:h-16 lg:h-20 ml-2"
          style={{
            background: isMobile ? '#059669' : 'linear-gradient(45deg, #059669, #dc2626, #7c3aed)',
          }}
          animate={config.enableAnimation ? {
            opacity: [1, 0.3, 1],
          } : { opacity: 1 }}
          transition={config.enableAnimation ? {
            duration: isMobile ? 1.5 : 2,
            repeat: Infinity,
            ease: "easeInOut",
          } : {}}
        />
      </div>
    </div>
  )
}

export default TypewriterAnimation

