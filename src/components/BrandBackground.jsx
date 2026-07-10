// Fondo de marca ligero: grid sutil + orbes difuminados en la paleta esmeralda.
// Solo CSS (clases en index.css); las animaciones se pausan con prefers-reduced-motion.

// Posiciones precomputadas (no aleatorias en cada render) para las particulas de fondo.
const PARTICLES = [
  { top: '12%', left: '8%', size: 3, duration: 16, delay: 0 },
  { top: '22%', left: '82%', size: 2, duration: 20, delay: 2 },
  { top: '38%', left: '18%', size: 2, duration: 18, delay: 4 },
  { top: '48%', left: '65%', size: 3, duration: 22, delay: 1 },
  { top: '58%', left: '30%', size: 2, duration: 19, delay: 6 },
  { top: '68%', left: '88%', size: 2, duration: 24, delay: 3 },
  { top: '76%', left: '12%', size: 3, duration: 17, delay: 5 },
  { top: '84%', left: '55%', size: 2, duration: 21, delay: 7 },
  { top: '30%', left: '48%', size: 2, duration: 23, delay: 8 },
  { top: '92%', left: '75%', size: 2, duration: 18, delay: 2.5 },
  { top: '15%', left: '60%', size: 2, duration: 20, delay: 5.5 },
  { top: '64%', left: '5%', size: 2, duration: 25, delay: 4.5 }
]

const BrandBackground = () => {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 brand-grid" />
      <div className="brand-orb-a aurora-a absolute -top-32 -left-32 w-[38rem] h-[38rem] rounded-full blur-3xl" />
      <div className="brand-orb-b aurora-b absolute top-1/3 -right-48 w-[44rem] h-[44rem] rounded-full blur-3xl" />
      <div className="brand-orb-c aurora-c absolute -bottom-48 left-1/4 w-[40rem] h-[40rem] rounded-full blur-3xl" />
      <div className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="brand-particle absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>
      <div className="noise-overlay" />
    </div>
  )
}

export default BrandBackground
