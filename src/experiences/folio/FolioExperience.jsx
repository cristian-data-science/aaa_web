import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Menu, X, CheckCircle, AlertCircle } from 'lucide-react'
import CountUp from '@/components/ui-fx/CountUp'
import { scrollToSection } from '@/lib/scroll'
import { useContactForm } from '@/hooks/use-contact-form'
import { BRAND, TECH_STACK, STATS, SERVICES, ABOUT, CASES, CASES_NOTE, CONTACT, NAV_ITEMS } from '@/data/content'
import datacefCity from '@/assets/images/datacef-city.webp'

/* ============================================================
   Experiencia FOLIO — la web contada como una revista editorial
   brutalista: papel, tinta, tipografía gigante, índices 01–06,
   hairlines, reveals por línea y filas que se expanden.
   ============================================================ */

const EASE = [0.22, 1, 0.36, 1]

// Línea que entra desde abajo de una máscara (reveal editorial clásico)
// Ojo: el trigger whileInView/viewport va en el wrapper (.f-mask), que
// nunca se transforma y por tanto siempre es "visible" para el
// IntersectionObserver. Si se pusiera en el hijo trasladado, quedaría
// recortado por el overflow:hidden del padre y nunca se detectaría en
// viewport (círculo vicioso: nunca entra porque nunca se revela).
const Line = ({ children, delay = 0, className = '' }) => (
  <motion.span
    className="f-mask"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
  >
    <motion.span
      className={`inline-block ${className}`}
      variants={{ hidden: { y: '110%' }, visible: { y: 0 } }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.span>
  </motion.span>
)

// Palabra rotativa con flip vertical dentro de una máscara
const FlipWord = ({ words, interval = 2600, className = '' }) => {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words, interval, reduced])

  return (
    <span className={`inline-grid overflow-hidden align-bottom ${className}`}>
      {/* mode="wait": la palabra saliente termina de desvanecerse y se
          desmonta antes de que entre la siguiente, para que nunca convivan
          dos palabras a la vez dentro del mismo recorte (se veía amontonado). */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="inline-block whitespace-nowrap [grid-area:1/1]"
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-40%', opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {reduced ? words[2] : words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// Cabecera de sección editorial: Nº + etiqueta + hairline + título gigante
const FSectionHead = ({ index, label, title }) => (
  <div className="mb-12 md:mb-16">
    <motion.div
      className="flex items-baseline gap-4 mb-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="f-display text-accent-ink text-lg md:text-xl">{index}</span>
      <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-content-3">{label}</span>
      <span className="f-rule flex-1 self-center" aria-hidden="true" />
    </motion.div>
    <h2 className="f-display text-[clamp(2.4rem,7vw,5.5rem)] text-content-1">
      <Line>{title}</Line>
    </h2>
  </div>
)

/* ---------- Nav ---------- */

const FTopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (id) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 border-b border-edge backdrop-blur-md"
        style={{ background: 'var(--header-bg)' }}
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => go('hero')}
            className="f-display text-xl text-content-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
          >
            DataCEF<span className="text-accent-ink align-super text-[0.55em]">®</span>
          </button>

          <nav aria-label="Principal" className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="f-underline text-xs uppercase tracking-[0.18em] text-content-2 hover:text-content-1 cursor-pointer focus-visible:outline-none"
              >
                <span className="text-accent-ink mr-1">0{i + 1}</span> {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => go('contact')} className="f-btn hidden md:inline-flex !py-2 !px-5 text-sm">
              Consulta gratuita <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              className="md:hidden p-2 text-content-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menú móvil: hoja de papel a pantalla completa con links gigantes */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col px-6 pt-6 pb-12"
            style={{ background: 'var(--bg-from)' }}
            initial={{ opacity: 0, y: '-4%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-4%' }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="flex items-center justify-between mb-10">
              <span className="f-display text-xl text-content-1">DataCEF<span className="text-accent-ink align-super text-[0.55em]">®</span></span>
              <button
                className="p-2 text-content-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink rounded"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Principal" className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="f-display text-left text-[13vw] leading-none text-content-1 hover:text-accent-ink transition-colors cursor-pointer focus-visible:outline-none"
                >
                  <span className="text-accent-ink text-[0.35em] align-super mr-3">0{i + 1}</span>
                  {item.name}
                </button>
              ))}
            </nav>
            <button onClick={() => go('contact')} className="f-btn mt-auto w-full">
              Consulta gratuita <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------- Secciones ---------- */

// Sello circular giratorio con el nombre de la casa
const FStamp = () => (
  <div className="f-stamp relative h-28 w-28 md:h-36 md:w-36" aria-hidden="true">
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <path id="f-stamp-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
      </defs>
      <text className="fill-current text-content-1" style={{ fontSize: '10.5px', letterSpacing: '2.5px', fontFamily: 'var(--font-display)' }}>
        <textPath href="#f-stamp-circle">DATACEF · AI-FIRST · SANTIAGO · LATAM ·</textPath>
      </text>
      <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <text x="50" y="54" textAnchor="middle" style={{ fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 700 }} className="fill-current">
        Nº 01
      </text>
    </svg>
  </div>
)

const FHero = () => (
  <section id="hero" className="relative min-h-screen flex flex-col justify-end pt-32 pb-0">
    <div className="container mx-auto px-4">
      {/* Eyebrow de portada */}
      <motion.div
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm uppercase tracking-[0.25em] text-content-3 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="text-accent-ink">Vol. 2026</span>
        <span className="f-rule w-10" aria-hidden="true" />
        <span>{BRAND.badge}</span>
        <span className="f-rule w-10 hidden md:block" aria-hidden="true" />
        <span className="hidden md:inline">Santiago de Chile</span>
      </motion.div>

      {/* Titular de portada */}
      <h1 className="f-display text-content-1 text-[clamp(3rem,11vw,10rem)] mb-2">
        <Line delay={0.1}>Transformamos</Line>
        <Line delay={0.22} className="f-outline">tu negocio</Line>
      </h1>
      <p className="f-display text-[clamp(1.6rem,4.5vw,3.6rem)] text-content-1 mb-10">
        <Line delay={0.34}>
          {BRAND.heroConnector}&nbsp;
          <FlipWord words={BRAND.heroWords} className="text-accent-ink" />
        </Line>
      </p>

      {/* Bajada + CTAs + sello */}
      <div className="grid md:grid-cols-12 gap-8 items-end pb-14">
        <motion.p
          className="md:col-span-5 text-base md:text-lg text-content-2 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          {BRAND.heroSubtitle}
        </motion.p>

        <motion.div
          className="md:col-span-5 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <button className="f-btn" onClick={() => scrollToSection('contact')}>
            {BRAND.ctaPrimary} <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <button className="f-btn f-btn-ghost" onClick={() => scrollToSection('services')}>
            {BRAND.ctaSecondary}
          </button>
        </motion.div>

        <motion.div
          className="md:col-span-2 hidden md:flex justify-end text-content-1"
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <FStamp />
        </motion.div>
      </div>
    </div>

    {/* Marquee gigante de stack: tipografía hueca desfilando */}
    <motion.div
      className="f-marquee border-y-2 border-content-1/80 py-3 md:py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.9 }}
    >
      <div className="f-marquee-track">
        {[0, 1].map((copy) => (
          <span key={copy} aria-hidden={copy === 1} className="inline-flex items-baseline">
            {TECH_STACK.map(({ name }) => (
              <span key={name} className="f-display inline-flex items-baseline text-[clamp(1.8rem,4vw,3.2rem)]">
                <span className="f-outline-soft px-5">{name}</span>
                <span className="text-accent-ink text-[0.5em]" aria-hidden="true">✺</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </motion.div>
  </section>
)

const FStats = () => (
  <section id="stats" className="relative py-24 md:py-32">
    <div className="container mx-auto px-4">
      <FSectionHead index="02" label="Nuestro impacto" title="Lo que hemos logrado" />
      <p className="text-content-2 text-lg max-w-xl -mt-8 mb-14">
        Números reales de proyectos reales. Así medimos nuestro trabajo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.title}
            className="border-t-2 border-content-1 pt-6 pb-10 lg:pr-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-content-3 mb-6">
              <span className="text-accent-ink">0{i + 1}</span> — {stat.title}
            </p>
            <CountUp
              value={stat.value}
              prefix={stat.prefix}
              className="f-display block text-[clamp(3.2rem,6.5vw,5.8rem)] text-content-1 mb-4"
            />
            <p className="text-sm text-content-2 leading-relaxed max-w-[26ch]">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const FServices = () => (
  <section id="services" className="relative py-24 md:py-32">
    <div className="container mx-auto px-4">
      <FSectionHead index="03" label="Lo que hacemos" title="Nuestros Servicios" />
      <p className="text-content-2 text-lg max-w-2xl -mt-8 mb-16">
        Cada empresa es distinta. Por eso combinamos desarrollo de software, automatización e IA para armar la solución que tu negocio realmente necesita.
      </p>

      {/* Pila sticky: cada tarjeta se queda pegada y la siguiente la cubre */}
      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <div key={service.title} className="f-stack-card rounded-2xl p-7 md:p-12 mb-8" style={{ top: `${88 + i * 24}px` }}>
            <div className="flex items-start justify-between gap-6 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-content-3 mb-3">Servicio</p>
                <h3 className="f-display text-[clamp(1.5rem,3.6vw,2.9rem)] text-content-1 max-w-[16ch]">{service.title}</h3>
              </div>
              <span className="f-display f-outline text-[clamp(3rem,7vw,6rem)] leading-none select-none" aria-hidden="true">
                0{i + 1}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <p className="text-content-2 leading-relaxed">{service.description}</p>
              <div>
                <ul className="space-y-0 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 border-b border-edge py-3 text-sm text-content-1">
                      <ArrowRight className="h-3.5 w-3.5 text-accent-ink shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="f-underline text-sm uppercase tracking-[0.18em] text-accent-ink cursor-pointer focus-visible:outline-none"
                >
                  Más información ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Banda CTA */}
      <motion.div
        className="max-w-5xl mx-auto border-2 border-content-1 rounded-2xl p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6"
        style={{ background: 'var(--surface-3)' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex-1">
          <p className="f-display text-xl md:text-2xl text-content-1 mb-2">¿Tienes un proceso que te quita tiempo?</p>
          <p className="text-content-2">Contáctanos y te mostramos cómo podemos automatizarlo o mejorarlo con tecnología.</p>
        </div>
        <button className="f-btn" onClick={() => scrollToSection('contact')}>
          {BRAND.ctaPrimary} <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </motion.div>
    </div>
  </section>
)

const FAbout = () => (
  <section id="about" className="relative py-24 md:py-32">
    <div className="container mx-auto px-4">
      <FSectionHead index="04" label="La casa" title="Quiénes Somos" />

      {/* Misión como pull-quote editorial */}
      <motion.blockquote
        className="max-w-4xl mb-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="f-display text-accent-ink text-4xl md:text-6xl leading-none mb-4 select-none" aria-hidden="true">“</p>
        <p className="text-xl md:text-3xl text-content-1 leading-snug font-medium -mt-8 md:-mt-12 pl-8 md:pl-12">
          {ABOUT.mission.text}
        </p>
        <footer className="pl-8 md:pl-12 mt-4 text-xs uppercase tracking-[0.25em] text-content-3">
          — {ABOUT.mission.title}
        </footer>
      </motion.blockquote>

      {/* Visión + Compromiso en dos columnas, imagen con reveal */}
      <div className="grid lg:grid-cols-12 gap-10 mb-20">
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
          {[ABOUT.vision, ABOUT.commitment].map((block, i) => (
            <motion.div
              key={block.title}
              className="border-t-2 border-content-1 pt-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            >
              <h3 className="f-display text-xl md:text-2xl text-content-1 mb-4">{block.title}</h3>
              <p className="text-content-2 leading-relaxed">{block.text}</p>
            </motion.div>
          ))}
          <motion.p
            className="sm:col-span-2 text-xs uppercase tracking-[0.25em] text-content-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Desde Santiago · para todo Chile y Latinoamérica
          </motion.p>
        </div>

        <motion.figure
          className="lg:col-span-5 relative"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <img
            src={datacefCity}
            alt="DATACEF - Letras luminosas sobre una ciudad"
            className="w-full h-full max-h-[26rem] object-cover border-2 border-content-1"
            width="1024"
            height="1024"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="absolute bottom-3 left-3 border-2 border-content-1 px-3 py-2 text-xs uppercase tracking-[0.2em]" style={{ background: 'var(--surface-1)' }}>
            <span className="f-display text-lg text-accent-ink block leading-none">+20</span>
            proyectos entregados
          </figcaption>
        </motion.figure>
      </div>

      {/* Valores como índice editorial */}
      <div className="max-w-4xl">
        <motion.p
          className="text-xs uppercase tracking-[0.25em] text-content-3 mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Índice — Lo que nos mueve
        </motion.p>
        <p className="text-content-2 mb-8">Cómo trabajamos y qué nos mueve como equipo.</p>

        <div className="border-t-2 border-content-1">
          {ABOUT.values.map((value, i) => (
            <motion.div
              key={value.title}
              className="f-value-row grid sm:grid-cols-12 gap-2 sm:gap-6 items-baseline border-b border-edge py-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
            >
              <span className="sm:col-span-1 f-display text-accent-ink text-lg">0{i + 1}</span>
              <h4 className="sm:col-span-4 f-display text-xl md:text-2xl text-content-1">{value.title}</h4>
              <p className="sm:col-span-7 text-sm md:text-base text-content-2 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

const FCases = () => (
  <section id="case-studies" className="relative py-24 md:py-32">
    <div className="container mx-auto px-4">
      <FSectionHead index="05" label="Casos reales" title="Lo que hemos hecho" />
      <p className="text-content-2 text-lg max-w-xl -mt-8 mb-14">
        Proyectos concretos con resultados medibles. Sin nombres de fantasía, solo trabajo real.
      </p>

      {/* Índice de proyectos: la fila se expande al pasar el cursor */}
      <div className="border-t-2 border-content-1">
        {CASES.map((c, i) => (
          <motion.article
            key={c.title}
            className="f-case border-b border-edge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
          >
            <button
              className="w-full grid md:grid-cols-12 gap-2 md:gap-6 items-baseline text-left px-2 md:px-4 py-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink"
              onClick={() => scrollToSection('contact')}
            >
              <span className="md:col-span-1 f-display f-outline text-2xl md:text-3xl">0{i + 1}</span>
              <span className="md:col-span-3 text-xs uppercase tracking-[0.22em] text-content-3">{c.industry}</span>
              <span className="md:col-span-7 f-display text-xl md:text-3xl text-content-1">{c.title}</span>
              <ArrowUpRight className="hidden md:block md:col-span-1 h-6 w-6 text-accent-ink justify-self-end" aria-hidden="true" />
            </button>

            <div className="f-case-body">
              <div>
                <div className="grid md:grid-cols-12 gap-6 px-2 md:px-4 pb-8">
                  <p className="md:col-span-7 md:col-start-2 text-content-2 leading-relaxed">{c.description}</p>
                  <p className="md:col-span-4 flex items-baseline gap-3 md:justify-end">
                    {c.metric ? (
                      <CountUp
                        value={c.metric.value}
                        prefix={c.metric.prefix}
                        suffix={c.metric.suffix}
                        className="f-display text-4xl md:text-5xl text-accent-ink"
                      />
                    ) : (
                      <span className="f-display text-4xl md:text-5xl text-accent-ink">{c.metricStatic}</span>
                    )}
                    <span className="text-xs uppercase tracking-[0.18em] text-content-3 max-w-[14ch]">{c.metricLabel}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="text-sm text-content-3 mt-8 uppercase tracking-[0.15em]"
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

const FContact = () => {
  const { formData, isSending, isSubmitted, error, handleInputChange, handleSubmit } = useContactForm()

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <FSectionHead index="06" label="Correspondencia" title="Hablemos de tu Proyecto" />

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Columna editorial */}
          <div>
            <motion.p
              className="text-lg text-content-2 leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {CONTACT.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-content-3 mb-5">{CONTACT.whyTitle}</p>
              <div className="border-t-2 border-content-1 mb-10">
                {CONTACT.benefits.map((b, i) => (
                  <div key={b.title} className="grid sm:grid-cols-12 gap-2 sm:gap-4 border-b border-edge py-4 items-baseline">
                    <span className="sm:col-span-1 text-accent-ink f-display">0{i + 1}</span>
                    <p className="sm:col-span-4 font-semibold text-content-1">{b.title}</p>
                    <p className="sm:col-span-7 text-sm text-content-2 leading-relaxed">{b.description}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs uppercase tracking-[0.25em] text-content-3 mb-3">Escríbenos</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="f-display f-underline text-[clamp(1.3rem,3.2vw,2.6rem)] text-content-1 break-all focus-visible:outline-none"
              >
                {CONTACT.email}
              </a>
              <p className="text-sm text-content-2 mt-4">{CONTACT.location}</p>

              <div className="flex flex-wrap gap-2 mt-6">
                {CONTACT.industries.map((ind) => (
                  <span key={ind} className="border border-content-1 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-content-1">
                    {ind}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Formulario minimal de subrayado */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
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
              <label htmlFor="f-name" className="block text-xs uppercase tracking-[0.22em] text-content-3 mb-1">
                Nombre completo *
              </label>
              <input
                id="f-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="f-input text-lg"
                placeholder="Tu nombre"
                autoComplete="name"
                required
              />
            </div>

            <div>
              <label htmlFor="f-email" className="block text-xs uppercase tracking-[0.22em] text-content-3 mb-1">
                Email *
              </label>
              <input
                id="f-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="f-input text-lg"
                placeholder="tu@empresa.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="f-company" className="block text-xs uppercase tracking-[0.22em] text-content-3 mb-1">
                Empresa
              </label>
              <input
                id="f-company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="f-input text-lg"
                placeholder="Nombre de tu empresa"
                autoComplete="organization"
              />
            </div>

            <div>
              <label htmlFor="f-message" className="block text-xs uppercase tracking-[0.22em] text-content-3 mb-1">
                Mensaje *
              </label>
              <textarea
                id="f-message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={4}
                className="f-input text-lg resize-none"
                placeholder="Cuéntanos sobre tu proyecto de automatización..."
                required
              />
            </div>

            <button type="submit" className="f-btn w-full !py-5 text-lg" disabled={isSending || isSubmitted}>
              {isSubmitted ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" aria-hidden="true" /> ¡Mensaje enviado!
                </span>
              ) : isSending ? (
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  Enviando…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Enviar mensaje <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
            </button>

            {error && (
              <p className="flex items-center gap-2 text-red-600 text-sm" role="alert">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                {error}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

const FFooter = () => (
  <footer className="relative pt-16 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-10 border-t-2 border-content-1 pt-10 pb-14 text-sm">
        <div>
          <p className="f-display text-2xl text-content-1 mb-4">DataCEF<span className="text-accent-ink align-super text-[0.55em]">®</span></p>
          <p className="text-content-2 leading-relaxed max-w-xs">{BRAND.footerBlurb}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-content-3 mb-4">Servicios</p>
          <ul className="space-y-2">
            {SERVICES.map((s) => (
              <li key={s.title}>
                <button
                  onClick={() => scrollToSection('services')}
                  className="f-underline text-content-2 hover:text-content-1 text-left cursor-pointer focus-visible:outline-none"
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-content-3 mb-4">Navegación</p>
          <ul className="space-y-2">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollToSection(n.id)}
                  className="f-underline text-content-2 hover:text-content-1 cursor-pointer focus-visible:outline-none"
                >
                  {n.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-1 text-content-2">
            <a href={`mailto:${CONTACT.email}`} className="f-underline focus-visible:outline-none">{CONTACT.email}</a>
            <p className="text-content-3">{CONTACT.locationShort}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Colofón: wordmark gigante hueco */}
    <div className="border-t border-edge">
      <div className="container mx-auto px-4">
        <p className="f-display f-outline text-[clamp(4rem,17vw,16rem)] leading-[0.85] text-center select-none -mb-[0.12em]" aria-hidden="true">
          DATACEF
        </p>
      </div>
    </div>
    <div className="border-t-2 border-content-1 py-4">
      <p className="container mx-auto px-4 text-xs uppercase tracking-[0.2em] text-content-3 flex flex-wrap justify-between gap-2">
        <span>© {new Date().getFullYear()} DataCEF — Todos los derechos reservados</span>
        <span>Santiago · LATAM</span>
      </p>
    </div>
  </footer>
)

/* ---------- Raíz de la experiencia ---------- */

const FolioExperience = () => (
  <div className="min-h-screen relative overflow-x-hidden text-content-1">
    <FTopBar />
    <main className="relative z-10">
      <FHero />
      <FStats />
      <FServices />
      <FAbout />
      <FCases />
      <FContact />
    </main>
    <FFooter />
  </div>
)

export default FolioExperience
