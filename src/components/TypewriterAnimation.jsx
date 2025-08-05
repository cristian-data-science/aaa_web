import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TypewriterAnimation = () => {
  const words = [
    'Agentes',
    'Automatizaciones', 
    'Inteligencia Artificial',
    'Análisis de Datos',
    'Vendedores Autónomos',
    'Infraestructura Tecnológica'
  ]

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
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
    }, isDeleting ? 50 : isPaused ? 2000 : 100) // Velocidades diferentes para escribir, borrar y pausar

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, isPaused, currentWordIndex, words])

  return (
    <div className="relative flex items-center justify-center">
      {/* Contenedor con altura fija para evitar saltos */}
      <div className="flex items-center justify-center min-h-[80px] md:min-h-[100px]">
        <motion.span
          className="inline-block text-5xl md:text-6xl lg:text-7xl font-black"
          style={{
            background: 'linear-gradient(45deg, #22C55E, #F97316, #A855F7)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundSize: '200% 200%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {currentText}
        </motion.span>
        
        {/* Cursor parpadeante más suave */}
        <motion.span
          className="inline-block w-1 h-12 md:h-16 lg:h-20 ml-2"
          style={{
            background: 'linear-gradient(45deg, #22C55E, #F97316, #A855F7)',
          }}
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

export default TypewriterAnimation

