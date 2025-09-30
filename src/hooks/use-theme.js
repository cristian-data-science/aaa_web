import { useState, useEffect } from 'react'

/**
 * Hook para manejar el tema (claro/oscuro)
 * - Detecta preferencia del sistema por defecto
 * - Persiste la selección del usuario en localStorage
 * - Retorna el tema actual y función para cambiarlo
 */
export function useTheme() {
  // Detectar preferencia del sistema o localStorage
  const getInitialTheme = () => {
    // Primero verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    
    // Si no hay guardada, usar la preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    return 'light'
  }

  const [theme, setTheme] = useState(getInitialTheme)

  // Aplicar tema al documento y guardar en localStorage
  useEffect(() => {
    const root = document.documentElement
    
    // Remover ambas clases primero
    root.classList.remove('light', 'dark')
    
    // Agregar la clase del tema actual
    root.classList.add(theme)
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme)
    
    // Actualizar el color del meta theme para mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#000000' : '#ffffff'
      )
    }
  }, [theme])

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      // Solo actualizar si el usuario NO ha guardado una preferencia
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    
    // Agregar listener (algunos navegadores usan addListener, otros addEventListener)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  const setLightTheme = () => setTheme('light')
  const setDarkTheme = () => setTheme('dark')

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }
}
