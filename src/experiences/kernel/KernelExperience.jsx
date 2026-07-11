import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { ChevronRight, CheckCircle, AlertCircle } from 'lucide-react'
import Marquee from '@/components/ui-fx/Marquee'
import CountUp from '@/components/ui-fx/CountUp'
import { scrollToSection } from '@/lib/scroll'
import { useContactForm } from '@/hooks/use-contact-form'
import { useScrollSpy } from '@/hooks/use-scrollspy'
import { BRAND, TECH_STACK, STATS, SERVICES, ABOUT, CASES, CASES_NOTE, CONTACT, NAV_ITEMS } from '@/data/content'

/* ============================================================
   Experiencia KERNEL — la web contada como una terminal viva.
   Cada sección es un "módulo del sistema": boot, htop, ls,
   README, access logs y un canal ssh para el contacto.
   ============================================================ */

const BOOT_LINES = [
  'DATACEF BIOS v5.0 — secure boot',
  'montando /negocio ................ [ OK ]',
  'cargando módulo automatización ... [ OK ]',
  'cargando módulo software ......... [ OK ]',
  'cargando módulo ia ............... [ OK ]',
  'conectando agentes ............... [ OK ]',
  'iniciando datacef.exe',
]

// Overlay de arranque: aparece una vez por sesión y cede el control
const BootOverlay = ({ onDone }) => {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible >= BOOT_LINES.length) {
      const t = setTimeout(onDone, 420)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 120 : 170)
    return () => clearTimeout(t)
  }, [visible, onDone])

  return (
    <motion.div
      className="k-boot"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      aria-hidden="true"
    >
      <div className="w-full max-w-xl px-6 text-sm md:text-base text-content-2">
        {BOOT_LINES.slice(0, visible).map((line, i) => (
          <p key={i} className="leading-7 whitespace-pre">
            <span className="text-accent-ink">&gt; </span>
            {line}
          </p>
        ))}
        <span className="k-caret" />
      </div>
    </motion.div>
  )
}

// Reloj del sistema para la barra de estado
const useClock = () => {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now.toLocaleTimeString('es-CL', { hour12: false })
}

// Palabra rotativa tipeada carácter a carácter (el "argumento" del comando)
const TypeCycle = ({ words }) => {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('typing') // typing | pause | deleting

  useEffect(() => {
    if (reduced) return
    const word = words[index]
    const delay = phase === 'typing' ? 70 : phase === 'deleting' ? 35 : 1900
    const t = setTimeout(() => {
      if (phase === 'typing') {
        if (text.length < word.length) setText(word.slice(0, text.length + 1))
        else setPhase('pause')
      } else if (phase === 'pause') {
        setPhase('deleting')
      } else {
        if (text.length > 0) setText(text.slice(0, -1))
        else {
          setIndex((i) => (i + 1) % words.length)
          setPhase('typing')
        }
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, phase, index, words, reduced])

  return (
    <span className="text-accent-ink k-phosphor">
      "{reduced ? words[2] : text}"
      <span className="k-caret" aria-hidden="true" />
    </span>
  )
}

// Encabezado de sección estilo comando: [NN] TÍTULO — cmd
const KSectionHead = ({ index, title, cmd }) => (
  <motion.div
    className="mb-10"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-xs md:text-sm text-content-3 tracking-[0.2em] uppercase mb-2">
      <span className="text-accent-ink">[{index}]</span> {cmd}
    </p>
    <h2 className="k-glitch k-phosphor font-bold text-2xl md:text-4xl text-content-1 uppercase tracking-tight" data-text={title}>
      {title}
    </h2>
  </motion.div>
)

/* ---------- Nav superior + barra de estado ---------- */

const KTopBar = () => (
  <motion.header
    className="fixed top-0 inset-x-0 z-50 border-b border-edge backdrop-blur-md"
    style={{ background: 'var(--header-bg)' }}
    initial={{ y: -60 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="container mx-auto px-4 h-12 flex items-center justify-between gap-4">
      <button
        onClick={() => scrollToSection('hero')}
        className="flex items-center gap-2 text-sm font-bold text-content-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
      >
        <span className="k-led" aria-hidden="true" />
        <span className="text-accent-ink">~/</span>datacef
      </button>

      <nav aria-label="Principal" className="k-nav-scroll flex items-center gap-4 md:gap-6 overflow-x-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-xs md:text-sm text-content-3 hover:text-accent-ink transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
          >
            ./{item.name.toLowerCase()}
          </button>
        ))}
      </nav>
    </div>
  </motion.header>
)

const KStatusBar = () => {
  const clock = useClock()
  const active = useScrollSpy(useMemo(() => NAV_ITEMS.map((n) => n.id), []))
  const activeName = NAV_ITEMS.find((n) => n.id === active)?.name ?? 'Inicio'

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 border-t border-edge backdrop-blur-md text-[11px] md:text-xs"
      style={{ background: 'var(--header-bg-solid)' }}
      aria-hidden="true"
    >
      <div className="container mx-auto px-4 h-7 flex items-center justify-between text-content-3">
        <span className="hidden sm:inline">MODO: <span className="text-accent-ink">KERNEL</span></span>
        <span>
          sección: <span className="text-content-1">~/{activeName.toLowerCase()}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="k-led" /> online · {clock}
        </span>
      </div>
    </div>
  )
}

/* ---------- Secciones ---------- */

const KHero = () => {
  const pkgItems = useMemo(
    () => TECH_STACK.map(({ name, Icon }) => ({ name: `pkg add ${name.toLowerCase().replace(/\s+/g, '-')}`, Icon })),
    []
  )

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-24 pb-10">
      <div className="container mx-auto px-4">
        <motion.div
          className="k-window max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="k-window-bar">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/70" />
            </span>
            <span className="mx-auto">datacef@latam: ~</span>
          </div>

          <div className="p-6 md:p-10 text-sm md:text-base">
            {/* whoami */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <p className="text-content-3">
                <span className="text-accent-ink">$</span> whoami
              </p>
              <p className="text-content-2 mb-6">{BRAND.badge} · Santiago, Chile</p>
            </motion.div>

            {/* comando principal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <p className="text-content-3 mb-3">
                <span className="text-accent-ink">$</span> datacef --transformar
              </p>
              <h1
                className="k-glitch k-phosphor font-bold uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-content-1 leading-[1.05] mb-4"
                data-text="Transformamos tu negocio"
              >
                Transformamos tu negocio
              </h1>
              <p className="text-lg md:text-2xl mb-6 text-content-2">
                {BRAND.heroConnector} <TypeCycle words={BRAND.heroWords} />
              </p>
            </motion.div>

            {/* subtítulo como comentario */}
            <motion.p
              className="text-content-3 leading-relaxed max-w-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="select-none"># </span>
              {BRAND.heroSubtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <button className="k-btn" onClick={() => scrollToSection('contact')}>
                [ ▸ {BRAND.ctaPrimary.toLowerCase()} ]
              </button>
              <button className="k-btn k-btn-ghost" onClick={() => scrollToSection('services')}>
                [ ls ./servicios ]
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stack tecnológico como stream de instalación */}
        <motion.div
          className="max-w-4xl mx-auto mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <p className="text-xs text-content-3 tracking-[0.2em] uppercase text-center mb-3">
            <span className="text-accent-ink">$</span> instalando stack tecnológico…
          </p>
          <Marquee items={pkgItems} duration={42} itemClassName="text-content-3" />
        </motion.div>
      </div>
    </section>
  )
}

// Panel de métrica con barra ASCII que se llena a saltos
const KStat = ({ stat, pct, delay }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="k-window p-5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-between mb-4 text-xs text-content-3">
        <span className="flex items-center gap-2">
          <stat.icon className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
          proc/{stat.title.toLowerCase().replace(/\s+/g, '_')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="k-led" aria-hidden="true" /> RUNNING
        </span>
      </div>

      <CountUp
        value={stat.value}
        prefix={stat.prefix}
        className="k-phosphor font-bold text-4xl md:text-5xl text-content-1 block mb-3"
      />

      <div className={`k-bar mb-3 ${inView ? 'is-on' : ''}`} style={{ '--k-bar-pct': `${pct}%` }} aria-hidden="true">
        <div className="k-bar-fill" />
      </div>

      <p className="text-sm font-semibold text-content-1 mb-1">{stat.title}</p>
      <p className="text-xs text-content-3 leading-relaxed">{stat.description}</p>
    </motion.div>
  )
}

const KStats = () => {
  const pcts = [92, 68, 54, 76]
  return (
    <section id="stats" className="relative py-20">
      <div className="container mx-auto px-4">
        <KSectionHead index="01" title="Lo que hemos logrado" cmd="htop — métricas del sistema" />
        <p className="text-content-2 max-w-2xl mb-10 -mt-6">
          Números reales de proyectos reales. Así medimos nuestro trabajo.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <KStat key={stat.title} stat={stat} pct={pcts[i]} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

const KServices = () => {
  const [open, setOpen] = useState(0)

  return (
    <section id="services" className="relative py-20">
      <div className="container mx-auto px-4">
        <KSectionHead index="02" title="Nuestros Servicios" cmd="ls -la ./servicios — módulos disponibles" />
        <p className="text-content-2 max-w-2xl mb-10 -mt-6">
          Cada empresa es distinta. Por eso combinamos desarrollo de software, automatización e IA para armar la solución que tu negocio realmente necesita.
        </p>

        <div className="max-w-4xl space-y-3">
          {SERVICES.map((service, i) => {
            const isOpen = open === i
            const slug = service.title.toLowerCase().replace(/[&,]/g, '').replace(/\s+/g, '_')
            return (
              <motion.div
                key={service.title}
                className={`k-row ${isOpen ? 'is-open' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <button
                  className="w-full flex items-center gap-3 px-4 py-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded-lg"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-accent-ink shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.span>
                  <span className="hidden md:inline text-xs text-content-3 shrink-0">drwxr-xr-x</span>
                  <span className="text-xs text-accent-ink shrink-0">0{i + 1}</span>
                  <span className="text-sm md:text-base font-semibold text-content-1 truncate">
                    {slug}/
                  </span>
                  <service.icon className="ml-auto h-4 w-4 text-content-3 shrink-0" aria-hidden="true" />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 pl-11">
                        <p className="text-sm md:text-base font-bold text-accent-ink mb-2">{service.title}</p>
                        <p className="text-sm text-content-2 leading-relaxed max-w-2xl mb-4">{service.description}</p>
                        <ul className="space-y-1.5 mb-4">
                          {service.features.map((f) => (
                            <li key={f} className="text-sm text-content-2">
                              <span className="text-accent-ink">- [x]</span> {f}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => scrollToSection('contact')}
                          className="text-sm text-accent-ink hover:underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
                        >
                          $ ./contacto --sobre="{service.title}" ▸
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="k-window max-w-4xl mt-10 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1">
            <p className="font-bold text-content-1 mb-1">¿Tienes un proceso que te quita tiempo?</p>
            <p className="text-sm text-content-2">
              Contáctanos y te mostramos cómo podemos automatizarlo o mejorarlo con tecnología.
            </p>
          </div>
          <button className="k-btn" onClick={() => scrollToSection('contact')}>
            [ ▸ conversemos ]
          </button>
        </motion.div>
      </div>
    </section>
  )
}

const KAbout = () => (
  <section id="about" className="relative py-20">
    <div className="container mx-auto px-4">
      <KSectionHead index="03" title="Quiénes Somos" cmd="cat ./nosotros/README.md" />

      {/* README */}
      <div className="grid lg:grid-cols-3 gap-5 mb-12">
        {[ABOUT.mission, ABOUT.vision, ABOUT.commitment].map((block, i) => (
          <motion.div
            key={block.title}
            className="k-window p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <p className="text-accent-ink font-bold mb-3">
              <span className="text-content-3"># </span>
              {block.title}
            </p>
            <p className="text-sm text-content-2 leading-relaxed">{block.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Valores */}
      <motion.p
        className="text-xs text-content-3 tracking-[0.2em] uppercase mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="text-accent-ink">$</span> cat valores.txt — lo que nos mueve
      </motion.p>
      <p className="text-content-2 mb-8">Cómo trabajamos y qué nos mueve como equipo.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ABOUT.values.map((value, i) => (
          <motion.div
            key={value.title}
            className="k-row p-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <p className="flex items-center gap-2 font-bold text-accent-ink mb-2 text-sm">
              <value.icon className="h-4 w-4" aria-hidden="true" />
              [ {value.title.toUpperCase()} ]
            </p>
            <p className="text-sm text-content-2 leading-relaxed">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// Timestamps decorativos del log (deterministas, solo ambientación)
const LOG_STAMPS = ['02:14:07', '09:41:52', '14:03:18', '21:37:44']

const KCases = () => (
  <section id="case-studies" className="relative py-20">
    <div className="container mx-auto px-4">
      <KSectionHead index="04" title="Lo que hemos hecho" cmd="tail -f ./casos.log — registro de operaciones" />
      <p className="text-content-2 max-w-2xl mb-10 -mt-6">
        Proyectos concretos con resultados medibles. Sin nombres de fantasía, solo trabajo real.
      </p>

      <div className="max-w-4xl space-y-4">
        {CASES.map((c, i) => (
          <motion.article
            key={c.title}
            className="k-window p-5 md:p-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <p className="text-xs text-content-3 mb-2">
              [{LOG_STAMPS[i]}] <span className="text-accent-ink">STATUS=200</span> industria="{c.industry}"
            </p>
            <h3 className="font-bold text-content-1 text-base md:text-lg mb-2">{c.title}</h3>
            <p className="text-sm text-content-2 leading-relaxed mb-4">{c.description}</p>
            <p className="flex items-baseline gap-2 border-t border-edge pt-3">
              {c.metric ? (
                <CountUp
                  value={c.metric.value}
                  prefix={c.metric.prefix}
                  suffix={c.metric.suffix}
                  className="k-phosphor font-bold text-2xl md:text-3xl text-accent-ink"
                />
              ) : (
                <span className="k-phosphor font-bold text-2xl md:text-3xl text-accent-ink">{c.metricStatic}</span>
              )}
              <span className="text-xs text-content-3">{c.metricLabel}</span>
            </p>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="max-w-4xl text-sm text-content-3 mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <span className="select-none"># </span>
        {CASES_NOTE}
      </motion.p>
    </div>
  </section>
)

const KContact = () => {
  const { formData, isSending, isSubmitted, error, handleInputChange, handleSubmit } = useContactForm()

  return (
    <section id="contact" className="relative py-20">
      <div className="container mx-auto px-4">
        <KSectionHead index="05" title="Hablemos de tu Proyecto" cmd="ssh contacto@datacef.com — canal abierto" />
        <p className="text-content-2 max-w-2xl mb-12 -mt-6">{CONTACT.subtitle}</p>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">
          {/* Beneficios como flags + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs text-content-3 tracking-[0.2em] uppercase mb-4">
              <span className="text-accent-ink">$</span> datacef --help · {CONTACT.whyTitle}
            </p>
            <div className="space-y-4 mb-10">
              {CONTACT.benefits.map((b) => (
                <div key={b.title} className="flex gap-3">
                  <b.icon className="h-4 w-4 mt-1 text-accent-ink shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-content-1">
                      --{b.title.toLowerCase().replace(/\s+/g, '-')}
                    </p>
                    <p className="text-sm text-content-2 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="k-window p-5 text-sm space-y-2">
              <p className="text-content-3">
                <span className="text-accent-ink">$</span> ping datacef.com
              </p>
              <p className="text-content-1">
                ↳ email:{' '}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-accent-ink hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
                >
                  {CONTACT.email}
                </a>
              </p>
              <p className="text-content-1">↳ ubicación: {CONTACT.location}</p>
              <p className="text-content-3 pt-2">
                <span className="text-accent-ink">$</span> ls ./industrias
              </p>
              <p className="text-content-2">{CONTACT.industries.join('  ·  ')}</p>
            </div>
          </motion.div>

          {/* Formulario terminal */}
          <motion.div
            className="k-window p-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-xs text-content-3 tracking-[0.2em] uppercase mb-6">
              <span className="text-accent-ink">$</span> ./enviar_mensaje.sh
            </p>

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
                <label htmlFor="k-name" className="block text-xs text-content-3 mb-1.5">
                  <span className="text-accent-ink">&gt;</span> nombre_completo: *
                </label>
                <input
                  id="k-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="k-input"
                  placeholder="Tu nombre"
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <label htmlFor="k-email" className="block text-xs text-content-3 mb-1.5">
                  <span className="text-accent-ink">&gt;</span> email: *
                </label>
                <input
                  id="k-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="k-input"
                  placeholder="tu@empresa.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="k-company" className="block text-xs text-content-3 mb-1.5">
                  <span className="text-accent-ink">&gt;</span> empresa:
                </label>
                <input
                  id="k-company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="k-input"
                  placeholder="Nombre de tu empresa"
                  autoComplete="organization"
                />
              </div>

              <div>
                <label htmlFor="k-message" className="block text-xs text-content-3 mb-1.5">
                  <span className="text-accent-ink">&gt;</span> mensaje: *
                </label>
                <textarea
                  id="k-message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="k-input resize-none"
                  placeholder="Cuéntanos sobre tu proyecto de automatización..."
                  required
                />
              </div>

              <button type="submit" className="k-btn w-full" disabled={isSending || isSubmitted}>
                {isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" aria-hidden="true" /> ✓ mensaje_enviado
                  </span>
                ) : isSending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    transmitiendo…
                  </span>
                ) : (
                  '[ ENVIAR ▸▸ ]'
                )}
              </button>

              {error && (
                <p className="flex items-center gap-2 text-red-400 text-xs" role="alert">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const KFooter = () => (
  <footer className="border-t border-edge py-10 pb-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8 text-sm">
        <div>
          <p className="font-bold text-content-1 mb-3">
            <span className="text-accent-ink">~/</span>datacef
          </p>
          <p className="text-content-3 leading-relaxed">{BRAND.footerBlurb}</p>
        </div>
        <div>
          <p className="text-xs text-content-3 tracking-[0.2em] uppercase mb-3">./servicios</p>
          <ul className="space-y-1.5">
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
          <p className="text-xs text-content-3 tracking-[0.2em] uppercase mb-3">./navegación</p>
          <ul className="space-y-1.5">
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
          <div className="mt-4 space-y-1 text-content-2">
            <p>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-accent-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded">
                {CONTACT.email}
              </a>
            </p>
            <p className="text-content-3">{CONTACT.locationShort}</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-content-3 border-t border-edge pt-5 flex flex-wrap items-center gap-2">
        © {new Date().getFullYear()} DataCEF — todos los derechos reservados
        <span className="flex items-center gap-1.5 ml-auto">
          <span className="k-led" aria-hidden="true" /> todos los sistemas operativos
        </span>
      </p>
    </div>
  </footer>
)

/* ---------- Raíz de la experiencia ---------- */

const KernelExperience = () => {
  const reduced = useReducedMotion()
  const [booting, setBooting] = useState(() => {
    if (reduced) return false
    try {
      return sessionStorage.getItem('datacef-kernel-boot') !== '1'
    } catch {
      return true
    }
  })

  const finishBoot = () => {
    try {
      sessionStorage.setItem('datacef-kernel-boot', '1')
    } catch {
      // sin almacenamiento: el boot se repetirá, no es crítico
    }
    setBooting(false)
  }

  return (
    <div className="k-flicker min-h-screen relative overflow-x-hidden text-content-1">
      {/* Capas CRT */}
      <div className="k-grid" aria-hidden="true" />
      <div className="k-sweep" aria-hidden="true" />
      <div className="k-vignette" aria-hidden="true" />
      <div className="k-scanlines" aria-hidden="true" />

      <AnimatePresence>{booting && <BootOverlay onDone={finishBoot} />}</AnimatePresence>

      <KTopBar />

      <main className="relative z-10">
        <KHero />
        <KStats />
        <KServices />
        <KAbout />
        <KCases />
        <KContact />
      </main>

      <KFooter />
      <KStatusBar />
    </div>
  )
}

export default KernelExperience
