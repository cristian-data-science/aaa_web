import { motion } from 'framer-motion'

/**
 * Logo DataCEF - Inspirado exactamente en Morningside.ai
 * Mismo diseño geométrico: 2 trapecios + 1 cuadrado + texto
 * MOBILE: Layout horizontal forzado con flexbox
 */
const Logo = ({ className = '', size = 'default' }) => {
  const sizes = {
    small: { width: 140, height: 28 },
    default: { width: 200, height: 40 },
    large: { width: 280, height: 56 },
  }

  const { width, height } = sizes[size] || sizes.default
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  // En mobile igualar EXACTAMENTE al LogoIntro final: 70px × scale(0.45) = 31.5px
  const mobileHeight = isMobile ? 31.5 : height

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`inline-flex items-center ${className}`}
    >
      {isMobile ? (
        /* MOBILE: Layout horizontal forzado con flexbox - igual que LogoIntro */
        <div className="flex items-center gap-1.5" style={{ height: `${mobileHeight}px` }}>
          {/* SVG SOLO formas */}
          <svg
            width={mobileHeight * 1.8}
            height={mobileHeight}
            viewBox="0 0 126.3 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_10px_rgba(0,255,136,0.4)] flex-shrink-0"
          >
            <defs>
              <style>{`
                .logo-shape {
                  fill: #00ff88;
                }
              `}</style>
            </defs>

            <g>
              {/* Forma 1: Trapecio izquierdo */}
              <motion.path
                className="logo-shape"
                d="M 0 31.6 v 31.6 l 47.3 -31.6 V 0 L 0 31.6 Z"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              
              {/* Forma 2: Trapecio central */}
              <motion.path
                className="logo-shape"
                d="M 47.3 31.6 v 31.6 l 47.3 -31.6 V 0 l -47.3 31.6 Z"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              
              {/* Forma 3: Cuadrado derecho */}
              <motion.path
                className="logo-shape"
                d="M 94.7 63.1 h 31.6 v -31.6 h -31.6 v 31.6 Z"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </g>
          </svg>

          {/* Texto HTML separado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="drop-shadow-[0_0_10px_rgba(0,255,136,0.4)] flex-shrink-0"
            style={{
              fontSize: `${mobileHeight * 1.06}px`,
              fontWeight: '500',
              color: '#fff',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              letterSpacing: '0.5px',
              lineHeight: `${mobileHeight}px`,
              whiteSpace: 'nowrap'
            }}
          >
            DataCEF
          </motion.div>
        </div>
      ) : (
        /* DESKTOP: SVG original completo */
        <svg
        width={width}
        height={height}
        viewBox="0 0 385.6 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_10px_rgba(0,255,136,0.4)]"
      >
        <defs>
          <style>{`
            .logo-shape {
              fill: #00ff88;
            }
            .logo-text {
              fill: #fff;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-size: 42.4px;
              font-weight: 500;
              letter-spacing: 0.5px;
            }
          `}</style>
        </defs>

        <g>
          {/* Forma 1: Trapecio izquierdo - EXACTAMENTE como Morningside */}
          <motion.path
            className="logo-shape"
            d="M 0 31.6 v 31.6 l 47.3 -31.6 V 0 L 0 31.6 Z"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          
          {/* Forma 2: Trapecio central - EXACTAMENTE como Morningside */}
          <motion.path
            className="logo-shape"
            d="M 47.3 31.6 v 31.6 l 47.3 -31.6 V 0 l -47.3 31.6 Z"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          {/* Forma 3: Cuadrado derecho - EXACTAMENTE como Morningside */}
          <motion.path
            className="logo-shape"
            d="M 94.7 63.1 h 31.6 v -31.6 h -31.6 v 31.6 Z"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </g>

        {/* Texto "DataCEF" - mismo estilo que "morningside" */}
        <motion.text
          className="logo-text"
          transform="translate(134.1 59.5)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <tspan x="0" y="0">DataCEF</tspan>
        </motion.text>
      </svg>
      )}
    </motion.div>
  )
}

export default Logo
