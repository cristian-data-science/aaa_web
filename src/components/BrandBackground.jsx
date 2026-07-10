// Fondo de marca ligero: grid sutil + orbes difuminados en la paleta esmeralda.
// Solo CSS (clases en index.css); las animaciones se pausan con prefers-reduced-motion.
const BrandBackground = () => {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 brand-grid" />
      <div className="brand-orb-a aurora-a absolute -top-32 -left-32 w-[38rem] h-[38rem] rounded-full blur-3xl" />
      <div className="brand-orb-b aurora-b absolute top-1/3 -right-48 w-[44rem] h-[44rem] rounded-full blur-3xl" />
      <div className="brand-orb-c aurora-c absolute -bottom-48 left-1/4 w-[40rem] h-[40rem] rounded-full blur-3xl" />
      <div className="noise-overlay" />
    </div>
  )
}

export default BrandBackground
