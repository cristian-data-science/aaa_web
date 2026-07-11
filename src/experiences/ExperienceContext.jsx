import { createContext, useCallback, useContext, useState } from 'react'
import { flushSync } from 'react-dom'

// Las tres experiencias visuales del sitio. A diferencia de un tema de
// colores, cada una es un árbol de componentes completo: misma información,
// contada con estructura, layout y animaciones radicalmente distintas.
export const EXPERIENCES = [
  { id: 'orbit', label: 'Orbital', metaColor: '#050510' },
  { id: 'kernel', label: 'Kernel', metaColor: '#030905' },
  { id: 'folio', label: 'Folio', metaColor: '#f5f1e8' },
]

const STORAGE_KEY = 'datacef-experience'

const ExperienceContext = createContext(null)

// Refleja la experiencia en el DOM + persistencia (el script inline de
// index.html hace lo mismo antes del primer paint para evitar FOUC)
const applyExperience = (id) => {
  document.documentElement.setAttribute('data-experience', id)
  const exp = EXPERIENCES.find((e) => e.id === id)
  document.documentElement.style.colorScheme = id === 'folio' ? 'light' : 'dark'
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // Almacenamiento bloqueado: la elección vive solo durante la sesión
  }
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta && exp) meta.setAttribute('content', exp.metaColor)
}

export const ExperienceProvider = ({ children }) => {
  // El script inline ya dejó el atributo en <html> antes de montar React
  const [experience, setExperienceState] = useState(
    () => document.documentElement.getAttribute('data-experience') || 'orbit'
  )

  const setExperience = useCallback((id) => {
    if (!EXPERIENCES.some((e) => e.id === id)) return

    const commit = () => {
      // flushSync para que el snapshot de la View Transition capture la
      // experiencia nueva en el mismo frame
      flushSync(() => setExperienceState(id))
      applyExperience(id)
      window.scrollTo(0, 0)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduced) {
      document.startViewTransition(commit)
    } else {
      commit()
    }
  }, [])

  return (
    <ExperienceContext.Provider value={{ experience, setExperience }}>
      {children}
    </ExperienceContext.Provider>
  )
}

export const useExperience = () => {
  const ctx = useContext(ExperienceContext)
  if (!ctx) throw new Error('useExperience debe usarse dentro de <ExperienceProvider>')
  return ctx
}
