import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Nuevo fondo unificado: integra partículas 3D redondas (Three.js) +
// overlays inspirados en HeroBackground, QuantumEffects, TechBackground y DynamicBackground.
// Cambios encapsulados en este archivo.

const ThreeBackground = () => {
  const containerRef = useRef(null)
  const webglCleanupRef = useRef(() => {})
  const overlayCanvasRef = useRef(null)

  // Flags de rendimiento/accesibilidad
  const prefersReduced = useMemo(
    () => (typeof window !== 'undefined') && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )
  const isMobile = useMemo(
    () => (typeof window !== 'undefined') && window.matchMedia('(max-width: 767px)').matches,
    []
  )

  // --------------------
  // Núcleo 3D (Three.js)
  // --------------------
  useEffect(() => {
    let mounted = true
    let scene, camera, renderer, pointsA, pointsB, animationId

    const init = async () => {
      const THREE = await import('three')
      if (!mounted || !containerRef.current) return

      const width = containerRef.current.clientWidth || window.innerWidth
      const height = containerRef.current.clientHeight || window.innerHeight

      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x0f172a, 0.002)

      camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000)
      camera.position.z = 360

      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.setClearColor(0x0b1220, 0)
      containerRef.current.appendChild(renderer.domElement)

      // Utilidad: textura circular para puntos redondos (evita "puntos cuadrados")
      const makeCircleTexture = (size = 64) => {
        const cvs = document.createElement('canvas')
        cvs.width = size
        cvs.height = size
        const ctx = cvs.getContext('2d')
        const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
        g.addColorStop(0, 'rgba(255,255,255,1)')
        g.addColorStop(0.6, 'rgba(255,255,255,0.6)')
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2)
        ctx.fill()
        const tex = new THREE.CanvasTexture(cvs)
        tex.colorSpace = THREE.SRGBColorSpace
        tex.needsUpdate = true
        return tex
      }

      const circleTex = makeCircleTexture()

      // Partículas 3D (dos nubes en colores del tema)
      const particleCountBase = isMobile ? 500 : 1000
      const particleCount = prefersReduced ? Math.floor(particleCountBase * 0.5) : particleCountBase
      const positions = new Float32Array(particleCount * 3)
      const speeds = new Float32Array(particleCount)
      const range = 580
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * range
        positions[i * 3 + 1] = (Math.random() - 0.5) * range
        positions[i * 3 + 2] = (Math.random() - 0.5) * range
        speeds[i] = 0.2 + Math.random() * 0.6
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const makeMat = (hex, size) => new THREE.PointsMaterial({
        size,
        map: circleTex,
        color: new THREE.Color(hex),
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        alphaTest: 0.05,
        sizeAttenuation: true,
      })

      const matA = makeMat(0x22c55e, isMobile ? 1.1 : 1.4)
      const matB = makeMat(0xa855f7, isMobile ? 0.9 : 1.2)

      pointsA = new THREE.Points(geometry, matA)
      pointsB = new THREE.Points(geometry.clone(), matB)
      pointsB.rotation.z = Math.PI / 7
      scene.add(pointsA)
      scene.add(pointsB)

      const onResize = () => {
        const w = containerRef.current?.clientWidth || window.innerWidth
        const h = containerRef.current?.clientHeight || window.innerHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      let t = 0
      const animate = () => {
        if (document.hidden) {
          animationId = requestAnimationFrame(animate)
          return
        }
        t += prefersReduced ? 0.002 : 0.006

        const pos = pointsA.geometry.attributes.position
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3
          const speed = speeds[i]
          pos.array[ix + 1] += Math.sin(t + i * 0.001) * 0.05 * speed
          pos.array[ix + 0] += Math.cos(t * 0.7 + i * 0.001) * 0.03 * speed
        }
        pos.needsUpdate = true

        pointsA.rotation.y += 0.0008
        pointsB.rotation.y -= 0.0006

        renderer.render(scene, camera)
        animationId = requestAnimationFrame(animate)
      }
      animationId = requestAnimationFrame(animate)

      webglCleanupRef.current = () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('resize', onResize)
        try {
          renderer.dispose()
          const el = renderer.domElement
          el?.parentElement?.removeChild(el)
        } catch (error) {
          console.warn('Error disposing renderer:', error)
        }
        geometry.dispose()
        matA.dispose()
        matB.dispose()
        circleTex.dispose?.()
      }
    }

    init()
    return () => { mounted = false; webglCleanupRef.current?.() }
  }, [isMobile, prefersReduced])

  // -----------------------------------
  // Overlay 2D: red de partículas + ondas
  // -----------------------------------
  useEffect(() => {
    const canvas = overlayCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Partículas
    const particles = []
    const particleCount = prefersReduced ? 24 : (isMobile ? 36 : 48)
    const connDist = isMobile ? 110 : 150

    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.vx = (Math.random() - 0.5) * 0.6
        this.vy = (Math.random() - 0.5) * 0.6
        this.r = Math.random() * 1.6 + 1
        this.hue = 160 + Math.random() * 60
        this.phase = Math.random() * Math.PI * 2
        this.speed = 0.01 + Math.random() * 0.02
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1
        this.phase += this.speed
      }
      draw() {
        const pulse = 0.7 + 0.3 * Math.sin(this.phase)
        const rr = this.r * (prefersReduced ? 0.9 : pulse)
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, rr * 3)
        g.addColorStop(0, `hsla(${this.hue},70%,60%,0.35)`)
        g.addColorStop(0.5, `hsla(${this.hue},70%,50%,0.18)`)
        g.addColorStop(1, 'hsla(0,0%,0%,0)')
        ctx.beginPath()
        ctx.arc(this.x, this.y, rr * 3, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
        ctx.beginPath()
        ctx.arc(this.x, this.y, rr, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue},80%,70%,0.6)`
        ctx.fill()
      }
    }
    for (let i = 0; i < particleCount; i++) particles.push(new Particle())

    // Ondas
    const waves = new Array(prefersReduced ? 1 : 3).fill(0).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0,
      max: Math.random() * 180 + 120,
      speed: Math.random() * 1.6 + 0.8,
      hue: 160 + Math.random() * 60,
      alpha: 0.28,
    }))

    const drawWave = (w) => {
      if (w.alpha <= 0) return
      ctx.beginPath()
      ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2)
      ctx.strokeStyle = `hsla(${w.hue},70%,60%,${w.alpha})`
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(w.x, w.y, w.r * 0.7, 0, Math.PI * 2)
      ctx.strokeStyle = `hsla(${w.hue + 20},70%,70%,${w.alpha * 0.5})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const step = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      // ondas
      for (let i = 0; i < waves.length; i++) {
        const w = waves[i]
        w.r += w.speed
        w.alpha = Math.max(0, w.alpha - 0.004)
        drawWave(w)
        if (w.r > w.max || w.alpha <= 0) {
          waves[i] = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: 0,
            max: Math.random() * 180 + 120,
            speed: Math.random() * 1.6 + 0.8,
            hue: 160 + Math.random() * 60,
            alpha: 0.28,
          }
        }
      }
      // partículas
      for (const p of particles) { p.update(); p.draw() }
      // conexiones
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d < connDist) {
            const a = (1 - d / connDist) * 0.22
            const g = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
            g.addColorStop(0, `hsla(${particles[i].hue},70%,60%,${a})`)
            g.addColorStop(1, `hsla(${particles[j].hue},70%,60%,${a})`)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = g
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)

    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [isMobile, prefersReduced])

  // Puntos/portales para efecto cuántico tipo QuantumEffects
  const quantumPortals = useMemo(() => (
    new Array(5).fill(0).map((_, i) => ({
      left: 10 + i * 20,
      top: 20 + i * 15,
      color: i % 3 === 0 ? '#22c55e' : (i % 3 === 1 ? '#f97316' : '#a855f7'),
      delay: i * 1.2 + (Math.random() * 2),
    }))
  ), [])

  // ---------------------------------------
  // Overlay de relaciones de base de datos
  // ---------------------------------------
  const fieldTypes = useMemo(() => ['FK', 'VAR', 'INT'], [])
  const tableData = useMemo(() => ({
    leftSideTables: [
      { name: 'products', fields: ['id', 'name', 'price', 'category_id'], color: '#22C55E', records: 1653, side: 'left' },
      { name: 'clients', fields: ['id', 'company', 'contact', 'location'], color: '#06B6D4', records: 892, side: 'left' },
    ],
    rightSideTables: [
      { name: 'transactions', fields: ['id', 'amount', 'type', 'product_id'], color: '#A855F7', records: 5834, side: 'right' },
      { name: 'stock', fields: ['id', 'quantity', 'reserved', 'location'], color: '#EF4444', records: 2341, side: 'right' },
    ],
  }), [])

  const [dbCycle, setDbCycle] = useState(0)
  const [relation, setRelation] = useState(null)
  const timersRef = useRef({ show: null, hide: null, next: null })

  useEffect(() => {
    const isLeft = dbCycle % 2 === 0
    const tables = isLeft ? tableData.leftSideTables : tableData.rightSideTables
    const screenWidth = window.innerWidth || 1200
    const approxTableW = 240
    const margin = 20
    const baseX = isLeft ? margin : Math.max(margin, screenWidth - (approxTableW + margin))
    const baseY = isMobile ? 160 : 200
    const vGap = isMobile ? 140 : 180
    const duration = 5000

    // Limpiar timers previos
    clearTimeout(timersRef.current.show)
    clearTimeout(timersRef.current.hide)
    clearTimeout(timersRef.current.next)

    // Mostrar relación para este lado
    const show = () => {
      const table1 = { ...tables[0], id: `t1-${dbCycle}`, x: baseX, y: baseY, duration }
      const table2 = { ...tables[1], id: `t2-${dbCycle}`, x: baseX, y: baseY + vGap, duration }
      setRelation({ id: `rel-${dbCycle}`, table1, table2, side: isLeft ? 'left' : 'right', duration, vGap })
    }
    const hide = () => setRelation(null)

    show()
    timersRef.current.hide = setTimeout(hide, duration) // ocultar tras 5s
    timersRef.current.next = setTimeout(() => setDbCycle(c => c + 1), duration + 200) // cambiar lado

    return () => {
      clearTimeout(timersRef.current.show)
      clearTimeout(timersRef.current.hide)
      clearTimeout(timersRef.current.next)
    }
  }, [dbCycle, tableData, isMobile])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Canvas overlay 2D tipo DynamicBackground */}
      <canvas
        ref={overlayCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.45 }}
      />

      {/* Grid tecnológico (HeroBackground) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.06,
          backgroundImage: `linear-gradient(rgba(34,197,94,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Líneas de circuito estáticas (HeroBackground/TechBackground) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" style={{ opacity: 0.15 }}>
        <defs>
          <linearGradient id="bgCircuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path d="M 0 250 L 1200 250" stroke="url(#bgCircuitGrad)" strokeWidth="1" fill="none" />
        <path d="M 0 450 L 1200 450" stroke="url(#bgCircuitGrad)" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 400 0 L 400 800" stroke="url(#bgCircuitGrad)" strokeWidth="1" fill="none" opacity="0.7" />
        <path d="M 800 0 L 800 800" stroke="url(#bgCircuitGrad)" strokeWidth="1" fill="none" opacity="0.6" />
        <circle cx="400" cy="250" r="2" fill="#22c55e" opacity="0.5" />
        <circle cx="800" cy="450" r="2" fill="#f97316" opacity="0.5" />
      </svg>

      {/* Portales cuánticos sutiles (QuantumEffects) */}
      {quantumPortals.map((p, i) => (
        <motion.div
          key={`portal-${i}`}
          className="absolute"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: 10, height: 10 }}
          animate={{ scale: [0, 2, 0], rotate: [0, 360], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              border: `2px solid ${p.color}`,
              background: `radial-gradient(circle, ${p.color}30 0%, transparent 70%)`,
              boxShadow: `0 0 16px ${p.color}40`,
            }}
          />
        </motion.div>
      ))}

      {/* Ondas cuánticas suaves (QuantumEffects) */}
      {[0,1,2].map((i) => (
        <motion.div
          key={`qwave-${i}`}
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at ${30 + i * 25}% ${40 + i * 20}%, rgba(34,197,94,0.04) 0%, transparent 45%)`,
              `radial-gradient(circle at ${30 + i * 25}% ${40 + i * 20}%, rgba(249,115,22,0.05) 0%, transparent 60%)`,
              `radial-gradient(circle at ${30 + i * 25}% ${40 + i * 20}%, rgba(168,85,247,0.04) 0%, transparent 45%)`,
            ],
          }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 3 }}
          style={{ opacity: 0.5 }}
        />
      ))}

      {/* Interferencias verticales suaves (QuantumEffects) */}
      {[0,1,2,3].map((i) => (
        <motion.div
          key={`interf-${i}`}
          className="absolute"
          style={{ left: `${25 * i}%`, top: '50%', width: 1, height: 200, transform: 'translateY(-50%)' }}
          animate={{ scaleY: [0.2, 1, 0.4, 1, 0.2], opacity: [0, 0.4, 0.15, 0.4, 0], x: [0, 18, -18, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: i * 1.2, ease: 'easeInOut' }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${i%3===0?'#22c55e':i%3===1?'#f97316':'#a855f7'}40 30%, ${i%3===0?'#22c55e':i%3===1?'#f97316':'#a855f7'}80 50%, ${i%3===0?'#22c55e':i%3===1?'#f97316':'#a855f7'}40 70%, transparent 100%)`,
              filter: 'blur(1px)', opacity: 0.6,
            }}
          />
        </motion.div>
      ))}

      {/* Campo de fuerza en rotación (QuantumEffects) */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: 0.45,
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(34,197,94,0.04) 60deg, transparent 120deg, rgba(249,115,22,0.04) 180deg, transparent 240deg, rgba(168,85,247,0.04) 300deg, transparent 360deg)`,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* Líneas de escaneo (antes CSS, ahora motion) */}
      {[0,1,2].map((i) => (
        <motion.div
          key={`scan-${i}`}
          className="absolute top-0 w-full"
          style={{ height: 2, opacity: 0.22, filter: 'blur(0.5px)', background: 'linear-gradient(90deg, transparent 0%, #22c55e 20%, #f97316 50%, #a855f7 80%, transparent 100%)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
        />
      ))}

      {/* Relaciones de base de datos (sutil y optimizado) */}
  <AnimatePresence mode="wait">
        {relation && (
          <motion.div
            key={relation.id}
            className="absolute inset-0"
            style={{ zIndex: 2, opacity: prefersReduced ? 0.55 : 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Tabla 1 */}
            <motion.div
              className="absolute bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-lg p-2 min-w-[200px] shadow-xl pointer-events-none"
              style={{ left: relation.table1.x, top: relation.table1.y, boxShadow: `0 0 16px ${relation.table1.color}30` }}
              initial={{ scale: 0.96, opacity: 0, x: -10 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.96, opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between mb-1 pb-1 border-b" style={{ borderColor: relation.table1.color }}>
                <h3 className="font-mono text-[12px] font-bold" style={{ color: relation.table1.color }}>{relation.table1.name}</h3>
                <div className="text-[10px] text-gray-400">{relation.table1.records.toLocaleString()} rows</div>
              </div>
              <div className="space-y-0.5">
                {relation.table1.fields.map((f, idx) => (
                  <motion.div key={f} className="flex items-center justify-between text-[11px]"
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + idx * 0.07 }}>
                    <span className="text-gray-300 font-mono">{f}</span>
                    <span className="px-1 py-0.5 rounded text-[10px] font-mono" style={{ backgroundColor: `${relation.table1.color}20`, color: relation.table1.color }}>
                      {fieldTypes[idx % fieldTypes.length]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tabla 2 (debajo) */}
            <motion.div
              className="absolute bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-lg p-2 min-w-[200px] shadow-xl pointer-events-none"
              style={{ left: relation.table2.x, top: relation.table2.y, boxShadow: `0 0 16px ${relation.table2.color}30` }}
              initial={{ scale: 0.96, opacity: 0, x: 10 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.96, opacity: 0, x: 10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between mb-1 pb-1 border-b" style={{ borderColor: relation.table2.color }}>
                <h3 className="font-mono text-[12px] font-bold" style={{ color: relation.table2.color }}>{relation.table2.name}</h3>
                <div className="text-[10px] text-gray-400">{relation.table2.records.toLocaleString()} rows</div>
              </div>
              <div className="space-y-0.5">
                {relation.table2.fields.map((f, idx) => (
                  <motion.div key={f} className="flex items-center justify-between text-[11px]"
                    initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + idx * 0.07 }}>
                    <span className="text-gray-300 font-mono">{f}</span>
                    <span className="px-1 py-0.5 rounded text-[10px] font-mono" style={{ backgroundColor: `${relation.table2.color}20`, color: relation.table2.color }}>
                      {fieldTypes[(idx + 1) % fieldTypes.length]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Línea recta vertical con crecimiento gradual de arriba hacia abajo */}
            <svg className="absolute top-0 left-0 pointer-events-none" style={{ width: '100vw', height: '100vh', zIndex: 5 }}>
              <defs>
                <linearGradient id={`db-rel-grad-${relation.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={relation.table1.color} />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor={relation.table2.color} />
                </linearGradient>
                <filter id={`db-rel-glow-${relation.id}`}>
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              {(() => {
                const tableW = 220
                const elbow = 80
                const yTop = relation.table1.y + 50
                const yBottom = relation.table2.y + 10
                const isLeftSide = relation.side === 'left'
                // Puntos de anclaje según lado (invertido para izquierda)
                const startX = isLeftSide ? relation.table1.x + tableW : relation.table1.x
                const endX = isLeftSide ? relation.table2.x + tableW : relation.table2.x
                const xElbow = isLeftSide ? startX + elbow : startX - elbow
                const d = `M ${startX} ${yTop} L ${xElbow} ${yTop} L ${xElbow} ${yBottom} L ${endX} ${yBottom}`
                const pathId = `dbRelPath-${relation.id}`
                return (
                  <g>
                    {/* Línea base visible con esquinas rectas */}
                    <motion.path
                      d={d}
                      stroke={`url(#db-rel-grad-${relation.id})`}
                      strokeWidth="3"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      fill="none"
                      filter={`url(#db-rel-glow-${relation.id})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.98 }}
                      transition={{ duration: prefersReduced ? 0.5 : 0.9, ease: 'easeOut' }}
                    />

                    {/* Path auxiliar para animar la chispa */}
                    <path id={pathId} d={d} fill="none" stroke="none" />

                    {/* Chispa multicolor que recorre el conducto */}
                    {!prefersReduced && (
                      <g filter={`url(#db-rel-glow-${relation.id})`}>
                        <circle r="4" fill="#22c55e">
                          <animateMotion dur="1.4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                          <animate attributeName="fill" values="#22c55e;#f97316;#a855f7;#22c55e" dur="1.4s" repeatCount="indefinite" />
                        </circle>
                        <circle r="8" fill="#ffffff" opacity="0.15">
                          <animateMotion dur="1.4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                          <animate attributeName="opacity" values="0.10;0.25;0.10" dur="1.4s" repeatCount="indefinite" />
                        </circle>
                      </g>
                    )}
                  </g>
                )
              })()}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThreeBackground
