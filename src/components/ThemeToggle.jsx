import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

/**
 * ThemeToggle - Botón flotante para cambiar entre modo claro y oscuro
 */
const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.9 } : {}}
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14
        rounded-full
        flex items-center justify-center
        shadow-lg
        transition-all duration-300
        group
        bg-theme-toggle
        border-2 border-theme-toggle-border
        hover:shadow-theme-toggle
      "
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
    >
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 rounded-full bg-theme-toggle-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      {/* Iconos con animación de rotación */}
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-6 h-6 text-amber-500" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-6 h-6 text-neon-green" />
        </motion.div>
      </div>

      {/* Tooltip */}
      <span className="
        absolute bottom-full mb-2 right-0
        px-3 py-1
        bg-black/90 text-white text-sm
        rounded-lg
        whitespace-nowrap
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        pointer-events-none
      ">
        Modo {isDark ? 'claro' : 'oscuro'}
      </span>
    </motion.button>
  )
}

export default ThemeToggle
