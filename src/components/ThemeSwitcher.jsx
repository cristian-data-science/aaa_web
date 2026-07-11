import { motion } from 'framer-motion'
import { Sun, MoonStar } from 'lucide-react'
import { useTheme, THEMES } from '@/theme/ThemeContext'

const ICONS = {
  aurora: Sun,
  nebula: MoonStar,
}

// Pill segmentada para alternar entre los 2 temas visuales.
// El indicador activo se desliza con layoutId (spring estilo Linear).
// instanceId evita que las copias desktop/móvil compartan layoutId.
const ThemeSwitcher = ({ showLabels = false, instanceId = 'desktop', className = '' }) => {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="Tema visual"
      className={`inline-flex items-center gap-1 rounded-full border border-edge bg-surface-2 p-1 backdrop-blur-md ${className}`}
    >
      {THEMES.map(({ id, label }) => {
        const Icon = ICONS[id]
        const active = theme === id
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            title={label}
            onClick={() => setTheme(id)}
            className={`relative flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              active ? 'text-white' : 'text-content-3 hover:text-content-1'
            } ${showLabels ? 'flex-1' : ''}`}
          >
            {active && (
              <motion.span
                layoutId={`theme-pill-${instanceId}`}
                className="absolute inset-0 rounded-full"
                style={{ background: 'linear-gradient(135deg, var(--grad-a), var(--grad-b))' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                aria-hidden="true"
              />
            )}
            <Icon className="relative z-10 h-4 w-4" aria-hidden="true" />
            {showLabels && <span className="relative z-10">{label}</span>}
          </button>
        )
      })}
    </div>
  )
}

export default ThemeSwitcher
