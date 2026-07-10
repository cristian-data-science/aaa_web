import { motion, useScroll, useSpring } from 'framer-motion'

// Barra de progreso de lectura fija arriba (2px, gradiente de marca).
// scaleX es transform puro; el spring le da la inercia estilo Linear.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--grad-a), var(--grad-b))',
        boxShadow: '0 0 12px var(--glow)',
      }}
    />
  )
}

export default ScrollProgress
