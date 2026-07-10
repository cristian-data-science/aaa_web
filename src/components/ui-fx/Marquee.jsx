// Cinta infinita CSS-only (dos copias del contenido, la segunda oculta a
// lectores de pantalla). Se detiene con prefers-reduced-motion.
// items: [{ name, Icon }] — Icon es opcional, un componente de ícono.
const Marquee = ({ items, duration = 40, className = '', itemClassName = '' }) => (
  <div className={`marquee ${className}`}>
    <div className="marquee-track" style={{ '--marquee-duration': `${duration}s` }}>
      {[0, 1].map((copy) => (
        <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
          {items.map(({ name, Icon }) => (
            <span
              key={name}
              className={`flex items-center gap-3 pr-10 whitespace-nowrap text-sm font-medium ${itemClassName || 'text-content-3'}`}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
              <span>{name}</span>
              <span className="h-1 w-1 rounded-full bg-accent-ink/60" aria-hidden="true" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
)

export default Marquee
