import { createContext, useCallback, useContext, useState } from 'react'
import { flushSync } from 'react-dom'

// Los tres temas visuales del sitio. El id se refleja en
// html[data-theme] y las hojas de styles/themes/ hacen el resto.
export const THEMES = [
  { id: 'aurora', label: 'Aurora', metaColor: '#059669' },
  { id: 'nebula', label: 'Nebula', metaColor: '#060913' },
  { id: 'chroma', label: 'Chroma', metaColor: '#0b0a10' },
]

const STORAGE_KEY = 'datacef-theme'

const ThemeContext = createContext(null)

// Escribe el tema en el DOM + persistencia (el script inline de index.html
// hace lo mismo antes del primer paint para evitar FOUC)
const applyTheme = (id) => {
  document.documentElement.setAttribute('data-theme', id)
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // Almacenamiento bloqueado: el tema vive solo durante la sesión
  }
  const meta = document.querySelector('meta[name="theme-color"]')
  const themeMeta = THEMES.find((t) => t.id === id)
  if (meta && themeMeta) meta.setAttribute('content', themeMeta.metaColor)
}

export const ThemeProvider = ({ children }) => {
  // El script inline ya dejó el tema en <html> antes de montar React
  const [theme, setThemeState] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'aurora'
  )

  const setTheme = useCallback((id) => {
    if (!THEMES.some((t) => t.id === id)) return

    const commit = () => {
      // flushSync para que el snapshot de la View Transition capture el
      // fondo/estilos nuevos en el mismo frame
      flushSync(() => setThemeState(id))
      applyTheme(id)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduced) {
      document.startViewTransition(commit)
    } else {
      commit()
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return ctx
}
