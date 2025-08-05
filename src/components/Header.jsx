import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeSelector from './ThemeSelector'

const Header = ({ currentTheme, onThemeChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#services' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Calculadora ROI', href: '#roi-calculator' },
    { name: 'Contacto', href: '#contact' }
  ]

  // Función para scroll suave
  const handleNavClick = (e, href) => {
    e.preventDefault()
    const targetId = href.substring(1) // Remover el #
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80 // Offset para el header fixed
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    
    // Cerrar menú móvil si está abierto
    setIsMenuOpen(false)
  }

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10"
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Name con degradado */}
          <motion.div 
            className="flex items-center space-x-3"
            
            transition={{ duration: 0.2 }}
          >
            <motion.span 
              className="text-3xl font-black"
              style={{
                background: 'linear-gradient(45deg, #22c55e, #f97316, #a855f7)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              DataCEF
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-white hover:text-green-400 transition-colors duration-200 cursor-pointer"
                
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Right side - Theme Selector and CTA */}
          <div className="flex items-center gap-4">
            {/* Theme Selector */}
            <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
            
            {/* CTA Button */}
            <motion.button
              className="hidden md:block px-6 py-2 rounded-xl font-semibold text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(45deg, #22c55e, #f97316)',
              }}
              
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              Consulta Gratuita
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
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
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-white hover:text-green-400 transition-colors duration-200 py-2 cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
              
              {/* Mobile Theme Selector */}
              <div className="pt-4 border-t border-white/10">
                <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
              </div>
              
              <motion.button
                className="px-6 py-3 rounded-xl font-semibold text-white mt-4 w-full"
                style={{
                  background: 'linear-gradient(45deg, #22c55e, #f97316)',
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

