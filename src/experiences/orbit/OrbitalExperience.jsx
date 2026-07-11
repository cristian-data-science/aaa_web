import { useEffect, useMemo, useRef, useState } from 'react'
import {
  motion, AnimatePresence, useInView, useReducedMotion,
  useMotionValue, useSpring, useTransform, useScroll,
} from 'framer-motion'
import {
  Home, Boxes, Users2, FolderKanban, Mail, MapPin,
  ChevronDown, CheckCircle, AlertCircle,
} from 'lucide-react'
import CountUp from '@/components/ui-fx/CountUp'
import SpotlightCard from '@/components/ui-fx/SpotlightCard'
import { scrollToSection } from '@/lib/scroll'
import { useContactForm } from '@/hooks/use-contact-form'
import { useScrollSpy } from '@/hooks/use-scrollspy'
import { useIsMobile } from '@/hooks/use-mobile'
import { BRAND, TECH_STACK, STATS, SERVICES, ABOUT, CASES, CASES_NOTE, CONTACT, NAV_ITEMS } from '@/data/content'

/* ============================================================
   Experiencia ORBITAL — la web contada como estación espacial:
   núcleo luminoso con el stack orbitando, telemetría en HUDs,
   servicios como constelación y un dock de navegación flotante.
   ============================================================ */

const EASE = [0.22, 1, 0.36, 1]

/* ---------- Fondo espacial con parallax de cursor ---------- */

// Campo de estrellas determinista (sin Math.random en render)
const makeStars = (count, seed, tint) =>
  Array.from({ length: count }, (_, i) => {
    const x = ((i * 73 + seed * 31) % 200) / 2
    const y = ((i * 137 + seed * 57) % 200) / 2
    const o = (25 + ((i * 29 + seed * 13) % 55)) / 100
    return `${x}vw ${y}vh 0 0 rgba(${tint}, ${o})`
  }).join(', ')

const OBackground = () => {
  const reduced = useReducedMotion()
  const [fine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 40, damping: 20, mass: 0.6 })

  // Cada capa se desplaza a distinta velocidad → sensación de profundidad
  const starsFarX = useTransform(sx, (v) => v * -8)
  const starsFarY = useTransform(sy, (v) => v * -8)
  const starsNearX = useTransform(sx, (v) => v * -20)
  const starsNearY = useTransform(sy, (v) => v * -20)
  const nebulaX = useTransform(sx, (v) => v * 26)
  const nebulaY = useTransform(sy, (v) => v * 26)

  useEffect(() => {
    if (!fine || reduced) return
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, reduced, mx, my])

  const starsFar = useMemo(() => makeStars(80, 1, '210, 245, 230'), [])
  const starsNear = useMemo(() => makeStars(45, 7, '170, 240, 215'), [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div style={{ x: nebulaX, y: nebulaY }} className="absolute inset-0">
        <div className="o-nebula-a" />
        <div className="o-nebula-b" />
      </motion.div>
      <motion.div className="o-starfield" style={{ boxShadow: starsFar, x: starsFarX, y: starsFarY }} />
      <motion.div className="o-starfield" style={{ boxShadow: starsNear, x: starsNearX, y: starsNearY }} />
      <div className="noise-overlay opacity-[0.03]" />
    </div>
  )
}

/* ---------- Marca + dock de navegación ---------- */

const OBrand = () => (
  <motion.button
    onClick={() => scrollToSection('hero')}
    className="fixed top-3 left-4 z-[60] o-glass !rounded-full px-4 py-1.5 font-display font-bold text-lg o-holo-text cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink"
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    DataCEF
  </motion.button>
)

const DOCK_ICONS = {
  hero: Home,
  services: Boxes,
  about: Users2,
  'case-studies': FolderKanban,
  contact: Mail,
}

const ODock = () => {
  const active = useScrollSpy(useMemo(() => NAV_ITEMS.map((n) => n.id), []))

  return (
    <motion.nav
      aria-label="Principal"
      className="o-dock fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-1 p-1.5"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = DOCK_ICONS[item.id]
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`o-dock-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink ${
              active === item.id ? 'is-active' : ''
            }`}
            aria-label={item.name}
            aria-current={active === item.id ? 'true' : undefined}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="o-dock-tip" aria-hidden="true">{item.name}</span>
          </button>
        )
      })}
    </motion.nav>
  )
}

/* ---------- Piezas reutilizables ---------- */

// Palabra rotativa con flip 3D sobre el eje X
const Flip3D = ({ words, interval = 2600 }) => {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words, interval, reduced])

  return (
    <span className="inline-grid align-bottom [perspective:900px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="o-holo-text inline-block whitespace-nowrap [grid-area:1/1] origin-bottom"
          initial={{ rotateX: 90, opacity: 0, y: 8 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: -90, opacity: 0, y: -8 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {reduced ? words[2] : words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const OSectionHead = ({ kicker, title, sub }) => (
  <motion.div
    className="text-center max-w-3xl mx-auto mb-14"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, ease: EASE }}
  >
    <p className="inline-flex items-center gap-2 o-chip !text-accent-ink uppercase tracking-[0.2em] !text-[11px] mb-5">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--grad-b)' }} aria-hidden="true" />
      {kicker}
    </p>
    <h2 className="font-display font-bold tracking-tight text-4xl md:text-5xl text-content-1 mb-4">{title}</h2>
    {sub && <p className="text-lg text-content-2">{sub}</p>}
  </motion.div>
)

/* ---------- Hero: sistema orbital ---------- */

// Reparto del stack en 3 anillos (interior → exterior)
const RINGS = [
  { size: '48%', spin: 'o-spin-slow', counter: 'o-counter-slow', dashed: false, items: TECH_STACK.slice(0, 4) },
  { size: '74%', spin: 'o-spin-slower', counter: 'o-counter-slower', dashed: true, items: TECH_STACK.slice(4, 10) },
  { size: '100%', spin: 'o-spin-slowest', counter: 'o-counter-slowest', dashed: false, items: TECH_STACK.slice(10, 16) },
]

const OrbitSystem = () => (
  <div className="relative aspect-square w-full max-w-[560px] mx-auto" role="img" aria-label="Stack tecnológico orbitando: Python, JavaScript, React, IA y más">
    {/* Núcleo */}
    <div className="o-core h-20 w-20 md:h-24 md:w-24" aria-hidden="true" />

    {/* Anillos con satélites */}
    {RINGS.map(({ size, spin, counter, dashed, items }, r) => (
      <div key={r} className="absolute inset-0 m-auto" style={{ width: size, height: size }} aria-hidden="true">
        <div className={`absolute inset-0 ${spin}`}>
          <div className={`o-ring ${dashed ? 'o-ring-dashed' : ''}`} />
          {items.map((tech, i) => {
            const a = (i / items.length) * 2 * Math.PI
            return (
              <span
                key={tech.name}
                className="o-sat"
                title={tech.name}
                style={{
                  left: `${50 + 50 * Math.cos(a)}%`,
                  top: `${50 + 50 * Math.sin(a)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span className={`flex ${counter}`}>
                  <tech.Icon className="h-4 w-4" />
                </span>
              </span>
            )
          })}
        </div>
      </div>
    ))}
  </div>
)

const OHero = () => {
  const isMobile = useIsMobile()

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto de misión */}
          <div className="text-center lg:text-left">
            <motion.span
              className="o-chip mb-7 inline-flex"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: 'var(--grad-b)' }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--grad-b)' }} />
              </span>
              {BRAND.badge}
            </motion.span>

            <motion.h1
              className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-content-1 leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              {BRAND.heroTitle}
              <span className="block mt-3 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                {BRAND.heroConnector} <Flip3D words={BRAND.heroWords} />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-content-2 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            >
              {BRAND.heroSubtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            >
              <button className="o-btn text-lg" onClick={() => scrollToSection('contact')}>
                {BRAND.ctaPrimary} <span aria-hidden="true">→</span>
              </button>
              <button className="o-btn o-btn-ghost text-lg" onClick={() => scrollToSection('services')}>
                {BRAND.ctaSecondary}
              </button>
            </motion.div>
          </div>

          {/* Sistema orbital (más compacto en móvil) */}
          <motion.div
            className={isMobile ? 'max-w-[320px] mx-auto w-full' : ''}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
          >
            <OrbitSystem />
          </motion.div>
        </div>

        {/* Indicador de descenso */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={() => scrollToSection('stats')}
            aria-label="Bajar a la siguiente sección"
            className="o-glass !rounded-full p-2.5 text-accent-ink cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Telemetría (stats como HUD circular) ---------- */

const Gauge = ({ pct, delay, children }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const R = 52
  const C = 2 * Math.PI * R

  return (
    <div ref={ref} className="relative h-36 w-36 md:h-40 md:w-40 mx-auto">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={R} fill="none" stroke="var(--edge)" strokeWidth="5" />
        <motion.circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke="url(#o-gauge-grad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={inView ? { strokeDashoffset: C * (1 - pct / 100) } : {}}
          transition={{ duration: 1.6, ease: EASE, delay }}
          style={{ filter: 'drop-shadow(0 0 6px var(--glow))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

const OStats = () => {
  const pcts = [92, 68, 54, 76]

  return (
    <section id="stats" className="relative py-24">
      <div className="container mx-auto px-4">
        {/* Gradiente compartido por los 4 anillos */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <linearGradient id="o-gauge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--grad-a)" />
              <stop offset="55%" stopColor="var(--grad-b)" />
              <stop offset="100%" stopColor="var(--grad-c)" />
            </linearGradient>
          </defs>
        </svg>

        <OSectionHead
          kicker="Telemetría"
          title="Lo que hemos logrado"
          sub="Números reales de proyectos reales. Así medimos nuestro trabajo."
        />

        <div className="o-glass o-corners max-w-6xl mx-auto p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.title}
                className="text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              >
                <Gauge pct={pcts[i]} delay={i * 0.15}>
                  <stat.icon className="h-4 w-4 text-accent-ink mb-1" aria-hidden="true" />
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    className="font-display font-bold text-2xl md:text-[1.7rem] text-content-1 leading-none"
                  />
                </Gauge>
                <p className="font-display font-semibold text-lg text-content-1 mt-4 mb-1.5">{stat.title}</p>
                <p className="text-sm text-content-3 leading-relaxed">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Servicios como constelación ---------- */

const OServices = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.75'] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <section id="services" className="relative py-24">
      <div className="container mx-auto px-4">
        <OSectionHead
          kicker="Constelación de capacidades"
          title="Nuestros Servicios"
          sub="Cada empresa es distinta. Por eso combinamos desarrollo de software, automatización e IA para armar la solución que tu negocio realmente necesita."
        />

        <div ref={ref} className="relative max-w-5xl mx-auto">
          {/* Riel apagado + línea de energía que se dibuja con el scroll */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-edge" aria-hidden="true" />
          <motion.div
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 origin-top"
            style={{
              scaleY: lineScale,
              background: 'linear-gradient(180deg, var(--grad-a), var(--grad-b), var(--grad-c))',
              boxShadow: '0 0 10px var(--glow)',
            }}
            aria-hidden="true"
          />

          {SERVICES.map((service, i) => {
            const right = i % 2 === 1
            return (
              <div key={service.title} className="relative pl-12 md:pl-0 pb-10 last:pb-0">
                {/* Nodo en la línea */}
                <span
                  className="absolute left-4 md:left-1/2 top-10 -translate-x-1/2 h-3 w-3 rounded-full z-10"
                  style={{ background: 'var(--grad-b)', boxShadow: '0 0 14px var(--glow)' }}
                  aria-hidden="true"
                />

                <motion.div
                  className={`md:w-[calc(50%-3rem)] ${right ? 'md:ml-auto' : ''}`}
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <SpotlightCard tilt className="o-glass border-beam p-6 md:p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                        style={{ background: 'linear-gradient(135deg, var(--grad-a), var(--grad-b))' }}
                        aria-hidden="true"
                      >
                        <service.icon className="h-5 w-5" />
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-content-3">Módulo 0{i + 1}</span>
                    </div>

                    <h3 className="font-display font-semibold text-xl md:text-2xl text-content-1 mb-3">{service.title}</h3>
                    <p className="text-content-2 leading-relaxed mb-5">{service.description}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.features.map((f) => (
                        <span key={f} className="o-chip">{f}</span>
                      ))}
                    </div>

                    <button
                      onClick={() => scrollToSection('contact')}
                      className="text-sm font-semibold text-accent-ink hover:brightness-125 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
                    >
                      Más información →
                    </button>
                  </SpotlightCard>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="o-glass max-w-3xl mx-auto mt-14 p-7 rounded-2xl flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex-1">
            <p className="font-display font-semibold text-lg text-content-1 mb-1">¿Tienes un proceso que te quita tiempo?</p>
            <p className="text-content-2 text-sm">Contáctanos y te mostramos cómo podemos automatizarlo o mejorarlo con tecnología.</p>
          </div>
          <button className="o-btn" onClick={() => scrollToSection('contact')}>
            {BRAND.ctaPrimary}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Núcleo (quiénes somos) ---------- */

const OAbout = () => (
  <section id="about" className="relative py-24">
    <div className="container mx-auto px-4">
      <OSectionHead kicker="El núcleo" title="Quiénes Somos" />

      {/* Misión / Visión / Compromiso como placas de vidrio */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
        {[ABOUT.mission, ABOUT.vision, ABOUT.commitment].map((block, i) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0, y: 40 - i * 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
          >
            <SpotlightCard tilt className="o-glass h-full p-7 rounded-2xl">
              <span
                className="block h-1 w-10 rounded-full mb-5"
                style={{ background: 'linear-gradient(90deg, var(--grad-a), var(--grad-b))' }}
                aria-hidden="true"
              />
              <h3 className="font-display font-semibold text-xl text-content-1 mb-3">{block.title}</h3>
              <p className="text-content-2 leading-relaxed text-sm md:text-base">{block.text}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* Valores como constelación de chips */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="font-display font-bold tracking-tight text-3xl md:text-4xl text-content-1 mb-3">Lo Que Nos Mueve</h3>
        <p className="text-content-2">Cómo trabajamos y qué nos mueve como equipo.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {ABOUT.values.map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
          >
            <SpotlightCard className="o-glass h-full p-6 rounded-2xl flex gap-4">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-accent-ink"
                style={{ borderColor: 'var(--edge)', boxShadow: 'inset 0 0 14px rgb(52 211 153 / 0.15)' }}
                aria-hidden="true"
              >
                <value.icon className="h-5 w-5" />
              </span>
              <div>
                <h4 className="font-display font-semibold text-lg text-content-1 mb-1.5">{value.title}</h4>
                <p className="text-sm text-content-2 leading-relaxed">{value.description}</p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

/* ---------- Misiones (casos) ---------- */

const OCases = () => (
  <section id="case-studies" className="relative py-24">
    <div className="container mx-auto px-4">
      <OSectionHead
        kicker="Bitácora de misiones"
        title="Lo que hemos hecho"
        sub="Proyectos concretos con resultados medibles. Sin nombres de fantasía, solo trabajo real."
      />

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {CASES.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
          >
            <SpotlightCard tilt className="o-glass o-corners border-beam h-full p-7 rounded-2xl flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="o-chip !text-accent-ink">{c.industry}</span>
                <span className="text-xs text-content-3 uppercase tracking-[0.2em]">Misión 0{i + 1} ✓</span>
              </div>

              <h3 className="font-display font-semibold text-xl text-content-1 mb-3">{c.title}</h3>
              <p className="text-content-2 text-sm md:text-base leading-relaxed mb-6 flex-grow">{c.description}</p>

              <div className="border-t border-edge pt-4 flex items-baseline gap-2.5">
                {c.metric ? (
                  <CountUp
                    value={c.metric.value}
                    prefix={c.metric.prefix}
                    suffix={c.metric.suffix}
                    className="gradient-text font-display font-bold text-3xl md:text-4xl"
                  />
                ) : (
                  <span className="gradient-text font-display font-bold text-3xl md:text-4xl">{c.metricStatic}</span>
                )}
                <span className="text-sm text-content-3">{c.metricLabel}</span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-center text-content-3 text-sm mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {CASES_NOTE}
      </motion.p>
    </div>
  </section>
)

/* ---------- Estación de contacto ---------- */

const OContact = () => {
  const { formData, isSending, isSubmitted, error, handleInputChange, handleSubmit } = useContactForm()

  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-4">
        <OSectionHead kicker="Estación de contacto" title={CONTACT.title} sub={CONTACT.subtitle} />

        <motion.div
          className="o-glass o-corners relative max-w-6xl mx-auto p-7 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="o-scan" aria-hidden="true" />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Panel de datos */}
            <div>
              <h3 className="font-display font-semibold text-2xl text-content-1 mb-7">{CONTACT.whyTitle}</h3>
              <div className="space-y-5 mb-10">
                {CONTACT.benefits.map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-accent-ink"
                      style={{ borderColor: 'var(--edge)' }}
                      aria-hidden="true"
                    >
                      <b.icon className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="font-semibold text-content-1">{b.title}</p>
                      <p className="text-sm text-content-2 leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-3 text-content-2">
                  <Mail className="h-4 w-4 text-accent-ink shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-content-1 font-semibold hover:text-accent-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
                  >
                    {CONTACT.email}
                  </a>
                </p>
                <p className="flex items-center gap-3 text-content-2">
                  <MapPin className="h-4 w-4 text-accent-ink shrink-0" aria-hidden="true" />
                  {CONTACT.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {CONTACT.industries.map((ind) => (
                  <span key={ind} className="o-chip">{ind}</span>
                ))}
              </div>
            </div>

            {/* Consola de transmisión */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot anti-spam: campo oculto, invisible para personas */}
              <input
                type="text"
                name="_honeypot"
                value={formData._honeypot}
                onChange={(e) => handleInputChange('_honeypot', e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="o-name" className="block text-sm font-medium text-content-2 mb-2">Nombre completo *</label>
                <input
                  id="o-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="o-input"
                  placeholder="Tu nombre"
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <label htmlFor="o-email" className="block text-sm font-medium text-content-2 mb-2">Email *</label>
                <input
                  id="o-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="o-input"
                  placeholder="tu@empresa.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="o-company" className="block text-sm font-medium text-content-2 mb-2">Empresa</label>
                <input
                  id="o-company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="o-input"
                  placeholder="Nombre de tu empresa"
                  autoComplete="organization"
                />
              </div>

              <div>
                <label htmlFor="o-message" className="block text-sm font-medium text-content-2 mb-2">Mensaje *</label>
                <textarea
                  id="o-message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="o-input resize-none"
                  placeholder="Cuéntanos sobre tu proyecto de automatización..."
                  required
                />
              </div>

              <button type="submit" className="o-btn w-full text-lg" disabled={isSending || isSubmitted}>
                {isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" aria-hidden="true" /> ¡Mensaje enviado!
                  </span>
                ) : isSending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    Transmitiendo…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Enviar mensaje <span aria-hidden="true">→</span>
                  </span>
                )}
              </button>

              {error && (
                <p className="flex items-center gap-2 text-red-400 text-sm" role="alert">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Footer con horizonte ---------- */

const OFooter = () => (
  <footer className="relative pt-16 pb-28 overflow-hidden">
    <div className="o-horizon" aria-hidden="true" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid md:grid-cols-3 gap-10 border-t border-edge pt-10 text-sm">
        <div>
          <p className="font-display text-2xl font-bold gradient-text mb-4">DataCEF</p>
          <p className="text-content-2 leading-relaxed max-w-xs">{BRAND.footerBlurb}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-content-3 mb-4">Servicios</p>
          <ul className="space-y-2">
            {SERVICES.map((s) => (
              <li key={s.title}>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-content-2 hover:text-accent-ink transition-colors text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-content-3 mb-4">Navegación</p>
          <ul className="space-y-2">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollToSection(n.id)}
                  className="text-content-2 hover:text-accent-ink transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
                >
                  {n.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-1">
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-content-2 hover:text-accent-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
            >
              {CONTACT.email}
            </a>
            <p className="text-content-3">{CONTACT.locationShort}</p>
          </div>
        </div>
      </div>
      <p className="text-center text-content-3 text-xs border-t border-edge mt-10 pt-6">
        © {new Date().getFullYear()} DataCEF. Todos los derechos reservados.
      </p>
    </div>
  </footer>
)

/* ---------- Raíz de la experiencia ---------- */

const OrbitalExperience = () => (
  <div className="min-h-screen relative overflow-x-hidden text-content-1">
    <OBackground />
    <OBrand />
    <ODock />
    <main className="relative z-10">
      <OHero />
      <OStats />
      <OServices />
      <OAbout />
      <OCases />
      <OContact />
    </main>
    <OFooter />
  </div>
)

export default OrbitalExperience
