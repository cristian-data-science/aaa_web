// Cinta infinita CSS-only (dos copias del contenido, la segunda oculta a
// lectores de pantalla). Se detiene con prefers-reduced-motion.
const Marquee = ({ items, duration = 40, className = '', itemClassName = '' }) => (
  <div className={`marquee ${className}`}>
    <div className="marquee-track" style={{ '--marquee-duration': `${duration}s` }}>
      {[0, 1].map((copy) => (
        <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
          {items.map((item) => (
            <span
              key={item}
              className={`flex items-center gap-10 pr-10 whitespace-nowrap text-sm font-medium ${itemClassName || 'text-brand-700/70'}`}
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-brand-400/60" aria-hidden="true" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
)

export default Marquee
