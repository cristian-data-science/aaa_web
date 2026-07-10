import { useRef, useCallback } from 'react'

// Tarjeta con foco de luz que sigue al cursor. Escribe las coordenadas en
// custom properties (--mx/--my) con rAF-throttle: cero re-renders de React.
// Con tilt, además escribe --rx/--ry para el giro 3D (clase .tilt-3d en CSS).
const MAX_TILT_X = 6 // grados
const MAX_TILT_Y = 8

const SpotlightCard = ({ className = '', tilt = false, children, ...rest }) => {
  const ref = useRef(null)
  const frame = useRef(0)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      const x = clientX - r.left
      const y = clientY - r.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
      if (tilt) {
        el.style.setProperty('--rx', `${((0.5 - y / r.height) * MAX_TILT_X).toFixed(2)}deg`)
        el.style.setProperty('--ry', `${((x / r.width - 0.5) * MAX_TILT_Y).toFixed(2)}deg`)
      }
    })
  }, [tilt])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el || !tilt) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [tilt])

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`spotlight ${tilt ? 'tilt-3d' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export default SpotlightCard
