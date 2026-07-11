import { motion } from 'framer-motion'
import { Orbit, Terminal, Newspaper } from 'lucide-react'
import { useExperience, EXPERIENCES } from './ExperienceContext'

const ICONS = {
  orbit: Orbit,
  kernel: Terminal,
  folio: Newspaper,
}

// Cápsula flotante fija arriba-centro, por sobre las 3 experiencias.
// Cambia la experiencia completa (estructura + visual), no solo colores.
// El estilo vive en index.css (.xp-switcher) con variantes por experiencia.
const ExperienceSwitcher = () => {
  const { experience, setExperience } = useExperience()

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[80]">
      <motion.div
        role="radiogroup"
        aria-label="Experiencia visual"
        className="xp-switcher inline-flex items-center gap-0.5 rounded-full p-1"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {EXPERIENCES.map(({ id, label }) => {
          const Icon = ICONS[id]
          const active = experience === id
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              title={`Experiencia ${label}`}
              onClick={() => setExperience(id)}
              className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current ${
                active ? 'xp-switcher-active' : 'xp-switcher-idle'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="xp-switcher-pill"
                  className="xp-switcher-pill absolute inset-0 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  aria-hidden="true"
                />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5" aria-hidden="true" />
              <span className="relative z-10 hidden sm:inline">{label}</span>
            </button>
          )
        })}
      </motion.div>
    </div>
  )
}

export default ExperienceSwitcher
