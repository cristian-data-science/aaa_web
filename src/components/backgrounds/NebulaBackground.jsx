// Fondo del tema Nebula: viñeta casi negra, starfield determinista,
// piso de grid en perspectiva, beams cónicos y estrella fugaz.
// Estrellas precomputadas a nivel de módulo (LCG con semilla, sin
// Math.random en render — convención del proyecto).
const makeStars = (count, seed, alpha) => {
  let s = seed
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
  const shadows = []
  for (let i = 0; i < count; i++) {
    const x = (rnd() * 100).toFixed(1)
    const y = (rnd() * 100).toFixed(1)
    const spread = rnd() > 0.85 ? 1 : 0
    shadows.push(`${x}vw ${y}vh 0 ${spread}px rgb(226 232 255 / ${alpha})`)
  }
  return shadows.join(', ')
}

const STARS_A = makeStars(60, 7, 0.55)
const STARS_B = makeStars(40, 21, 0.3)

const NebulaBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ contain: 'strict' }}
    >
      <div className="nebula-vignette" />
      <div className="nebula-stars nebula-stars-a" style={{ boxShadow: STARS_A }} />
      <div className="nebula-stars nebula-stars-b fx-heavy" style={{ boxShadow: STARS_B }} />
      <div className="nebula-beam-a fx-heavy" />
      <div className="nebula-beam-b fx-heavy" />
      <div className="nebula-horizon">
        <div className="nebula-horizon-lines" />
      </div>
      <div className="nebula-shooting fx-heavy" />
      <div className="noise-overlay" />
    </div>
  )
}

export default NebulaBackground
