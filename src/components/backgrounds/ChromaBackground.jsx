// Fondo del tema Chroma: cintas aurora iridiscentes (violeta→cyan→magenta)
// con deriva de tono lenta, destellos prismáticos y viñeta profunda.
const ChromaBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ contain: 'strict' }}
    >
      {/* El wrapper .chroma-hue rota el tono de todas las cintas a la vez */}
      <div className="chroma-hue">
        <div className="chroma-ribbon-a" />
        <div className="chroma-ribbon-b fx-heavy" />
        <div className="chroma-glint chroma-glint-a fx-heavy" />
        <div className="chroma-glint chroma-glint-b fx-heavy" />
      </div>
      <div className="chroma-vignette" />
      <div className="noise-overlay" />
    </div>
  )
}

export default ChromaBackground
