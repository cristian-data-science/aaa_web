import { Mail, MapPin } from 'lucide-react'
import logo1 from '../assets/logos/datacef-logo-1.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    'Desarrollo de Software a Medida',
    'Automatización Inteligente',
    'Datos & Inteligencia Artificial',
    'Consultoría & Adopción Tecnológica',
    'Soluciones Open Source'
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
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
              Empresa AI-first de automatización e ingeniería de software. 
              Resolvemos problemas reales de negocio con tecnología de punta, desde Santiago para toda Latinoamérica.
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-emerald-400" />
                <a href="mailto:contacto@datacef.com" className="hover:text-emerald-400 transition-colors">contacto@datacef.com</a>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-emerald-400" />
                <span>Santiago, Chile · Remoto LATAM</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              Servicios
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services" 
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              Navegación
            </h3>
            <ul className="space-y-3">
              <li><a href="#hero" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Inicio</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Servicios</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Nosotros</a></li>
              <li><a href="#case-studies" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Casos de Éxito</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Contacto</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="text-center text-gray-400 text-sm">
            © {currentYear} DataCEF. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

