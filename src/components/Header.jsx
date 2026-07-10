import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from '@/lib/scroll'
import ThemeSwitcher from './ThemeSwitcher'
import Magnetic from './ui-fx/Magnetic'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Compactar y dar sombra al header al scrollear (listener pasivo + rAF)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#services' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Contacto', href: '#contact' }
  ]

  // Scroll suave (el offset del header lo compensa scroll-margin-top)
  const handleNavClick = (e, href) => {
    e.preventDefault()
    scrollToSection(href.substring(1))
    setIsMenuOpen(false)
  }

  const navLinkClasses = "text-sm font-medium text-content-1 hover:text-accent-ink transition-colors duration-200 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled
          ? 'bg-header-solid border-edge shadow-[0_4px_20px_var(--glow)]'
          : 'bg-header border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`container mx-auto px-4 transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4'}`}>
        <div className="flex items-center justify-between">
          {/* Brand Name con degradado */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-display text-3xl font-bold tracking-tight gradient-text rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            DataCEF
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Principal" className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={navLinkClasses}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Right side - Switcher de tema + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ThemeSwitcher instanceId="desktop" />
            </motion.div>

            <Magnetic>
              <motion.button
                className="btn-primary px-6 py-2 min-h-0 text-sm"
                onClick={(e) => handleNavClick(e, '#contact')}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                Consulta Gratuita
              </motion.button>
            </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-content-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Principal"
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4 bg-surface-1 backdrop-blur-xl rounded-2xl p-4 shadow-card border border-edge">
              {/* Switcher de tema (versión con etiquetas) */}
              <ThemeSwitcher instanceId="mobile" showLabels className="w-full" />

              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`${navLinkClasses} py-2`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.button
                className="btn-primary mt-4 w-full"
                onClick={(e) => handleNavClick(e, '#contact')}
                whileTap={{ scale: 0.98 }}
              >
                Consulta Gratuita
              </motion.button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}

export default Header
