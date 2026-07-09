// Fondo de marca ligero: grid sutil + orbes difuminados en la paleta esmeralda.
// Solo CSS (clases en index.css); las animaciones se pausan con prefers-reduced-motion.
const BrandBackground = () => {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 brand-grid" />
      <div className="brand-orb-a absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-brand-400/15 blur-3xl" />
      <div className="brand-orb-b absolute top-1/3 -right-48 w-[42rem] h-[42rem] rounded-full bg-accent-400/10 blur-3xl" />
      <div className="brand-orb-c absolute -bottom-48 left-1/4 w-[38rem] h-[38rem] rounded-full bg-brand-300/15 blur-3xl" />
    </div>
  )
}

export default BrandBackground
