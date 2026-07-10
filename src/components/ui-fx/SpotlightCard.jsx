import { useRef, useCallback } from 'react'

// Tarjeta con foco de luz que sigue al cursor. Escribe las coordenadas en
// custom properties (--mx/--my) con rAF-throttle: cero re-renders de React.
const SpotlightCard = ({ as: Tag = 'div', className = '', children, ...rest }) => {
  const ref = useRef(null)
  const frame = useRef(0)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${clientX - r.left}px`)
      el.style.setProperty('--my', `${clientY - r.top}px`)
    })
  }, [])

  return (
    <Tag ref={ref} onMouseMove={onMouseMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export default SpotlightCard
