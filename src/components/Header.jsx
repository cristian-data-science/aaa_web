import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#services' },
    { name: 'Nosotros', href: '#about' },
    { name: 'ROI', href: '#demo' },
    { name: 'Contacto', href: '#contact' }
  ]

  // Función para scroll suave
  const handleNavClick = (e, href) => {
    e.preventDefault()
    const targetId = href.substring(1) // Remover el #
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    
    // Cerrar menú móvil si está abierto
    setIsMenuOpen(false)
  }

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-neon-green/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo DataCEF */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group"
            aria-label="DataCEF - Ir al inicio"
          >
            <Logo size="default" className="transition-transform duration-300 group-hover:scale-105" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-neon-green hover:text-green-400 transition-colors duration-200 cursor-pointer relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Right side - CTA */}
          <div className="flex items-center gap-4">
            {/* CTA Button */}
            <motion.button
              className="hidden md:block px-6 py-2 rounded-xl font-semibold text-black bg-neon-green hover:bg-green-400 transition-all duration-300 shadow-lg shadow-neon-green/20"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(0, 255, 136, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              Consulta Gratuita
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-neon-green"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4 bg-black/95 rounded-2xl p-4 shadow-xl border border-neon-green/20">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-neon-green hover:text-green-400 transition-colors duration-200 py-2 cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.button
                className="px-6 py-3 rounded-xl font-semibold text-black bg-neon-green hover:bg-green-400 transition-all duration-300 mt-4 w-full shadow-lg"
                whileHover={{
                  scale: 1.02
                }}
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
