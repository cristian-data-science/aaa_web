import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import TypewriterAnimation from './TypewriterAnimation'
import Marquee from './ui-fx/Marquee'
import RevealText from './ui-fx/RevealText'
import { useIsMobile } from '@/hooks/use-mobile'
import { scrollToSection } from '@/lib/scroll'

const TECH_STACK = [
  'Python', 'JavaScript', 'React', 'N8N', 'Make', 'OpenAI',
  'PostgreSQL', 'AWS', 'Docker', 'Supabase'
]

const Hero = () => {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef(null)

  // Parallax suave: el contenido sube y se desvanece al scrollear
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, 90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const parallaxStyle = reducedMotion ? {} : { y: contentY, opacity: contentOpacity }

  // Partículas flotantes sutiles (solo desktop)
  const floatingParticles = useMemo(() => {
    const count = isMobile ? 0 : 6
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: 10 + (i * 14) % 80,
      y: 20 + (i * 17) % 60,
      size: 2 + (i % 3),
      delay: i * 0.8,
      duration: 4 + (i % 3),
      color: i % 3 === 0 ? 'rgba(22, 163, 74, 0.4)' :
             i % 3 === 1 ? 'rgba(134, 239, 172, 0.35)' : 'rgba(16, 185, 129, 0.3)'
    }))
  }, [isMobile])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-transparent">
      {/* Partículas flotantes para desktop */}
      {!isMobile && floatingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: particle.color,
              boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
            }}
          />
        </motion.div>
      ))}

      <motion.div style={parallaxStyle} className="container mx-auto px-4 relative z-10 pt-28 pb-10">
        {/* Centered Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 backdrop-blur-sm shadow-sm">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Empresa AI-first · Santiago, Chile
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="mb-10">
            <RevealText
              as="h1"
              text="Transformamos tu negocio"
              highlightFrom={1}
              delay={0.15}
              stagger={0.08}
              className="font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-950 leading-tight"
            />

            <motion.div
              className="font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-900 mt-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              con
            </motion.div>

            {/* Typewriter Animation */}
            <div className="flex justify-center items-end min-h-[120px] md:min-h-[160px] pb-4">
              <TypewriterAnimation />
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-brand-800 mb-12 leading-relaxed max-w-3xl mx-auto text-center font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Somos una empresa AI-first que combina ingeniería de software con lo último en inteligencia artificial para resolver problemas reales de negocio.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="btn-primary px-8 py-4 text-lg font-bold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact')}
            >
              Conversemos
              <span aria-hidden="true">→</span>
            </motion.button>

            <motion.button
              className="btn-secondary px-8 py-4 text-lg font-bold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('services')}
            >
              Nuestros Servicios
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-14 flex justify-center"
            style={reducedMotion ? {} : { opacity: hintOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.button
              onClick={() => scrollToSection('stats')}
              aria-label="Bajar a la siguiente sección"
              className="rounded-full border border-brand-200/70 bg-white/60 p-2 text-brand-600 backdrop-blur-sm hover:bg-brand-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stack tecnológico */}
      <motion.div
        className="relative z-10 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <p className="text-center uppercase text-xs font-semibold tracking-[0.2em] text-brand-600/80 mb-4">
          Tecnología que dominamos
        </p>
        <Marquee items={TECH_STACK} duration={38} className="max-w-4xl mx-auto" />
      </motion.div>
    </section>
  )
}

export default Hero
