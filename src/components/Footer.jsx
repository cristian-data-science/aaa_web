import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'
import logo1 from '../assets/logos/datacef-logo-1.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Servicios',
      links: [
        'Automatización Inteligente',
        'Datos & IA',
        'Marketing & Ventas',
        'Consultoría & Adopción',
        'Soluciones Verticales',
        'Open Source Enablement'
      ]
    },
    {
      title: 'Empresa',
      links: [
        'Sobre Nosotros',
        'Nuestro Equipo',
        'Casos de Éxito',
        'Blog',
        'Carreras',
        'Contacto'
      ]
    },
    {
      title: 'Recursos',
      links: [
        'Calculadora ROI',
        'Documentación',
        'Whitepapers',
        'Webinars',
        'Centro de Ayuda',
        'API Documentation'
      ]
    }
  ]

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logo1} 
                alt="DataCEF Logo" 
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold text-gradient">
                DataCEF
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformamos empresas mediante automatización inteligente e IA, 
              liberando el potencial humano para la innovación y el crecimiento estratégico.
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span>contacto@datacef.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                <span>América Latina</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div
              key={section.title}
            >
              <h3 className="text-xl font-bold mb-6 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="border-t border-gray-800 pt-8 mt-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Mantente Actualizado
              </h3>
              <p className="text-gray-300">
                Recibe las últimas noticias sobre automatización e IA directamente en tu inbox.
              </p>
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t border-gray-800 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} DataCEF. Todos los derechos reservados.
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Política de Privacidad
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Términos de Servicio
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookies
                </a>
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern - Static */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gray-800"></div>
      </div>
    </footer>
  )
}

export default Footer

