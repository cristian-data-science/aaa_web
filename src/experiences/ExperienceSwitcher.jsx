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
    <div className="fixed top-16 right-4 z-[80]">
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
              aria-label={`Experiencia ${label}`}
              title={`Experiencia ${label}`}
              onClick={() => setExperience(id)}
              className={`relative flex items-center justify-center rounded-full p-1.5 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current ${
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
              <Icon className="relative z-10 h-4 w-4" aria-hidden="true" />
            </button>
          )
        })}
      </motion.div>
    </div>
  )
}

export default ExperienceSwitcher
