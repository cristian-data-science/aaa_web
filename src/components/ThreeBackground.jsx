import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimationTimer, getRendererConfig, getDeviceCapabilities } from '@/lib/animation-utils'

// Sistema de partículas neurales avanzado con efectos de alta tecnología
// Incluye redes neuronales animadas, efectos holográficos y visualizaciones procedurales

const ThreeBackground = () => {
  const containerRef = useRef(null)
  const webglCleanupRef = useRef(() => {})
  const overlayCanvasRef = useRef(null)
  
  // Configuración unificada para desarrollo y producción
  const renderConfig = useMemo(() => getRendererConfig(), [])
  const capabilities = useMemo(() => getDeviceCapabilities(), [])

  // Flags de rendimiento/accesibilidad usando las utilidades
  const { isMobile, prefersReduced } = capabilities

  // --------------------
  // Núcleo 3D (Three.js)
  // --------------------
  useEffect(() => {
    let mounted = true
    let scene, camera, renderer, pointsA, pointsB, animationId
    let animTimer

    const init = async () => {
      const THREE = await import('three')
      if (!mounted || !containerRef.current) return

      // Inicializar timer de animación
      animTimer = new AnimationTimer(60)

      const width = containerRef.current.clientWidth || window.innerWidth
      const height = containerRef.current.clientHeight || window.innerHeight

      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x0f172a, 0.002)

      camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000)
      camera.position.z = 360

      // Configuración de renderer unificada para consistencia
      renderer = new THREE.WebGLRenderer({ 
        antialias: renderConfig.antialias, 
        alpha: true, 
        powerPreference: renderConfig.powerPreference,
        precision: renderConfig.precision,
        preserveDrawingBuffer: false
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(renderConfig.pixelRatio)
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

      // Sistema neuronal avanzado con múltiples capas
      const particleCountBase = isMobile ? 800 : 1500
      const particleCount = Math.floor(particleCountBase * capabilities.particleCountMultiplier * (prefersReduced ? 0.5 : 1.0))
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)
      const phases = new Float32Array(particleCount)
      const speeds = new Float32Array(particleCount)
      const range = 680
      
      // Crear estructura de red neuronal
      for (let i = 0; i < particleCount; i++) {
        // Posiciones con distribución neuronal
        const layer = Math.floor(i / (particleCount / 6)) // 6 capas
        const nodeInLayer = i % Math.floor(particleCount / 6)
        const layerSpread = 100 + layer * 80
        
        positions[i * 3 + 0] = (Math.random() - 0.5) * layerSpread + (layer - 3) * 120
        positions[i * 3 + 1] = (Math.random() - 0.5) * layerSpread
        positions[i * 3 + 2] = (Math.random() - 0.5) * layerSpread
        
        // Colores científicos avanzados
        const colorType = i % 4
        if (colorType === 0) { // Neón cyan
          colors[i * 3] = 0.0; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 1.0
        } else if (colorType === 1) { // Magenta eléctrico
          colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.0; colors[i * 3 + 2] = 0.8
        } else if (colorType === 2) { // Verde láser
          colors[i * 3] = 0.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 0.2
        } else { // Azul quantum
          colors[i * 3] = 0.2; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 1.0
        }
        
        sizes[i] = isMobile ? 0.8 + Math.random() * 1.2 : 1.0 + Math.random() * 2.0
        phases[i] = Math.random() * Math.PI * 2
        speeds[i] = 0.3 + Math.random() * 0.8
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

      // Material holográfico avanzado
      const neuralMaterial = new THREE.PointsMaterial({
        size: isMobile ? 1.5 : 2.2,
        map: circleTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        alphaTest: 0.1,
        sizeAttenuation: true,
      })

      pointsA = new THREE.Points(geometry, neuralMaterial)
      
      // Segunda capa con efecto de profundidad
      const geometry2 = geometry.clone()
      const deepMaterial = new THREE.PointsMaterial({
        size: isMobile ? 0.8 : 1.2,
        map: circleTex,
        color: new THREE.Color(0x00ffff),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      
      pointsB = new THREE.Points(geometry2, deepMaterial)
      pointsB.rotation.x = Math.PI / 8
      pointsB.rotation.z = Math.PI / 6
      pointsB.scale.setScalar(1.2)
      
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
      let lastTime = performance.now()
      const targetFPS = 60
      const frameTime = 1000 / targetFPS
      let lag = 0
      
      const animate = () => {
        if (document.hidden) {
          animationId = requestAnimationFrame(animate)
          return
        }
        
        // Usar el timer consistente
        const { shouldRender, time } = animTimer.update()
        t = time * (prefersReduced ? 0.3 : 1.0)

        // Animación neuronal con velocidad consistente
        const pos = pointsA.geometry.attributes.position
        const col = pointsA.geometry.attributes.color
        const siz = pointsA.geometry.attributes.size
        
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3
          const speed = speeds[i]
          const phase = phases[i] + t * speed
          
          // Movimiento tipo red neuronal - velocidad unificada
          const baseSpeed = speed // Eliminar compensación por minificación
          pos.array[ix + 1] += Math.sin(phase + i * 0.002) * 0.08 * baseSpeed
          pos.array[ix + 0] += Math.cos(phase * 0.8 + i * 0.003) * 0.06 * baseSpeed
          pos.array[ix + 2] += Math.sin(phase * 0.5 + i * 0.001) * 0.04 * baseSpeed
          
          // Pulsación de colores tipo activación neuronal
          const pulse = (Math.sin(phase * 2) + 1) * 0.5
          const colorMult = 0.7 + pulse * 0.8
          col.array[ix] *= colorMult
          col.array[ix + 1] *= colorMult
          col.array[ix + 2] *= colorMult
          
          // Variación de tamaño sincronizada
          siz.array[i] = sizes[i] * (0.8 + pulse * 0.4)
        }
        
        // Renderizar solo cuando hay cambios significativos
        if (shouldRender) {
          pos.needsUpdate = true
          col.needsUpdate = true
          siz.needsUpdate = true

          // Rotación compleja del sistema con velocidad fija
          pointsA.rotation.y += 0.001
          pointsA.rotation.x += 0.0005
          pointsB.rotation.y -= 0.0008
          pointsB.rotation.z += 0.0003

          renderer.render(scene, camera)
        }
        
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
        neuralMaterial.dispose()
        deepMaterial.dispose()
        circleTex.dispose?.()
      }
    }

    init()
    return () => { mounted = false; webglCleanupRef.current?.() }
  }, [isMobile, prefersReduced, capabilities, renderConfig])

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

    // Red de conexiones neurales
    const particles = []
    const particleCount = prefersReduced ? 30 : (isMobile ? 45 : 65)
    const connDist = isMobile ? 130 : 180

    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.vx = (Math.random() - 0.5) * 0.6
        this.vy = (Math.random() - 0.5) * 0.6
        this.r = Math.random() * 1.6 + 1
        // Colores científicos avanzados
        const colorTypes = [180, 300, 120, 240] // Cyan, Magenta, Verde, Azul
        this.hue = colorTypes[Math.floor(Math.random() * colorTypes.length)] + (Math.random() - 0.5) * 20
        this.phase = Math.random() * Math.PI * 2
        this.speed = 0.015 + Math.random() * 0.025
        this.neuralActivity = Math.random()
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1
        this.phase += this.speed
      }
      draw() {
        // Efecto de activación neuronal
        const pulse = 0.6 + 0.4 * Math.sin(this.phase)
        const neuralPulse = 0.7 + 0.3 * Math.sin(this.phase * 3 + this.neuralActivity * 10)
        const rr = this.r * (prefersReduced ? 0.9 : pulse)
        
        // Halo holográfico externo
        const outerGrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, rr * 4)
        outerGrad.addColorStop(0, `hsla(${this.hue},90%,80%,${0.4 * neuralPulse})`)
        outerGrad.addColorStop(0.3, `hsla(${this.hue},85%,70%,${0.25 * neuralPulse})`)
        outerGrad.addColorStop(0.7, `hsla(${this.hue + 30},80%,60%,${0.1 * neuralPulse})`)
        outerGrad.addColorStop(1, 'hsla(0,0%,0%,0)')
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, rr * 4, 0, Math.PI * 2)
        ctx.fillStyle = outerGrad
        ctx.fill()
        
        // Core brillante
        const coreGrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, rr * 1.5)
        coreGrad.addColorStop(0, `hsla(${this.hue},100%,90%,${0.8 * neuralPulse})`)
        coreGrad.addColorStop(0.5, `hsla(${this.hue},95%,75%,${0.5 * neuralPulse})`)
        coreGrad.addColorStop(1, `hsla(${this.hue},85%,60%,${0.2 * neuralPulse})`)
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, rr * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = coreGrad
        ctx.fill()
        
        // Punto central ultra-brillante
        ctx.beginPath()
        ctx.arc(this.x, this.y, rr * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue},100%,95%,${0.9 * neuralPulse})`
        ctx.fill()
      }
    }
    for (let i = 0; i < particleCount; i++) particles.push(new Particle())

    // Ondas cuánticas con efectos holográficos
    const waves = new Array(prefersReduced ? 2 : 4).fill(0).map(() => {
      const scientificHues = [180, 300, 120, 240, 60] // Cyan, Magenta, Verde, Azul, Amarillo
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 0,
        max: Math.random() * 220 + 150,
        speed: Math.random() * 2.2 + 1.0,
        hue: scientificHues[Math.floor(Math.random() * scientificHues.length)],
        alpha: 0.35,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2
      }
    })

    const drawWave = (w) => {
      if (w.alpha <= 0) return
      
      const pulseIntensity = Math.sin(Date.now() * w.frequency + w.phase) * 0.3 + 0.7
      const currentAlpha = w.alpha * pulseIntensity
      
      // Ondas concéntricas múltiples para efecto holográfico
      for (let ring = 0; ring < 4; ring++) {
        const ringRadius = w.r * (0.3 + ring * 0.25)
        const ringAlpha = currentAlpha * (1 - ring * 0.2)
        const ringHue = w.hue + ring * 15
        
        if (ringRadius > 0 && ringAlpha > 0.02) {
          ctx.beginPath()
          ctx.arc(w.x, w.y, ringRadius, 0, Math.PI * 2)
          ctx.strokeStyle = `hsla(${ringHue},85%,${70 + ring * 5}%,${ringAlpha})`
          ctx.lineWidth = 2 - ring * 0.3
          ctx.stroke()
          
          // Efecto de resplandor interno
          if (ring === 0) {
            ctx.beginPath()
            ctx.arc(w.x, w.y, ringRadius * 0.5, 0, Math.PI * 2)
            const innerGrad = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, ringRadius * 0.5)
            innerGrad.addColorStop(0, `hsla(${w.hue},95%,85%,${ringAlpha * 0.3})`)
            innerGrad.addColorStop(1, 'hsla(0,0%,0%,0)')
            ctx.fillStyle = innerGrad
            ctx.fill()
          }
        }
      }
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
          const scientificHues = [180, 300, 120, 240, 60]
          waves[i] = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: 0,
            max: Math.random() * 220 + 150,
            speed: Math.random() * 2.2 + 1.0,
            hue: scientificHues[Math.floor(Math.random() * scientificHues.length)],
            alpha: 0.35,
            frequency: Math.random() * 0.02 + 0.01,
            phase: Math.random() * Math.PI * 2
          }
        }
      }
      // partículas
      for (const p of particles) { p.update(); p.draw() }
      // Conexiones neuronales avanzadas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d < connDist) {
            const strength = 1 - d / connDist
            const activity = (particles[i].neuralActivity + particles[j].neuralActivity) / 2
            const pulse = Math.sin(Date.now() * 0.005 + i + j) * 0.5 + 0.5
            const alpha = strength * 0.4 * (0.6 + activity * 0.4) * (0.7 + pulse * 0.3)
            
            // Gradiente neural con efecto de transmisión
            const g = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
            g.addColorStop(0, `hsla(${particles[i].hue},85%,75%,${alpha})`)
            g.addColorStop(0.5, `hsla(${(particles[i].hue + particles[j].hue) / 2},90%,80%,${alpha * 1.2})`)
            g.addColorStop(1, `hsla(${particles[j].hue},85%,75%,${alpha})`)
            
            // Línea principal
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = g
            ctx.lineWidth = 1.5 + strength * 1.5
            ctx.stroke()
            
            // Efecto de transmisión de datos
            if (strength > 0.7 && pulse > 0.8) {
              const midX = (particles[i].x + particles[j].x) / 2
              const midY = (particles[i].y + particles[j].y) / 2
              const glowGrad = ctx.createRadialGradient(midX, midY, 0, midX, midY, 8)
              glowGrad.addColorStop(0, `hsla(${(particles[i].hue + particles[j].hue) / 2},100%,90%,0.8)`)
              glowGrad.addColorStop(1, 'hsla(0,0%,0%,0)')
              
              ctx.beginPath()
              ctx.arc(midX, midY, 6, 0, Math.PI * 2)
              ctx.fillStyle = glowGrad
              ctx.fill()
            }
          }
        }
      }

      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)

    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [isMobile, prefersReduced])

  // Portales cuánticos con colores científicos avanzados
  const quantumPortals = useMemo(() => {
    const scientificColors = ['#00ffff', '#ff00ff', '#00ff40', '#4080ff', '#ffff00', '#ff4080']
    return new Array(8).fill(0).map((_, i) => ({
      left: 8 + i * 12,
      top: 15 + (i * 11) % 70,
      color: scientificColors[i % scientificColors.length],
      delay: i * 0.8 + (Math.random() * 1.5),
      intensity: 0.7 + Math.random() * 0.3,
      frequency: 0.5 + i * 0.3
    }))
  }, [])

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

      {/* Portales cuánticos holográficos avanzados */}
      {quantumPortals.map((p, i) => (
        <motion.div
          key={`portal-${i}`}
          className="absolute"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: 16, height: 16 }}
          animate={{ 
            scale: [0, 2.5 * p.intensity, 0.3, 2.5 * p.intensity, 0], 
            rotate: [0, 180, 360],
            opacity: [0, 0.8 * p.intensity, 0.2, 0.8 * p.intensity, 0] 
          }}
          transition={{ duration: 4 + p.frequency, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        >
          {/* Anillo exterior holográfico */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${p.color}`,
              background: `conic-gradient(from 0deg, ${p.color}40, transparent 50%, ${p.color}60, transparent)`,
              boxShadow: `0 0 20px ${p.color}60, inset 0 0 20px ${p.color}20`,
            }}
          />
          {/* Core brillante */}
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${p.color}90 0%, ${p.color}40 40%, transparent 80%)`,
              boxShadow: `0 0 12px ${p.color}80`,
            }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Punto central ultra-brillante */}
          <div
            className="absolute inset-1/3 rounded-full"
            style={{
              background: p.color,
              boxShadow: `0 0 8px ${p.color}, 0 0 16px ${p.color}`,
              filter: 'blur(0.5px)'
            }}
          />
        </motion.div>
      ))}

      {/* Ondas cuánticas científicas avanzadas */}
      {[0,1,2,3].map((i) => {
        const scientificColors = [
          'rgba(0,255,255,0.06)', // Cyan
          'rgba(255,0,255,0.06)', // Magenta
          'rgba(0,255,64,0.06)',  // Verde láser
          'rgba(64,128,255,0.06)' // Azul quantum
        ]
        return (
          <motion.div
            key={`qwave-${i}`}
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(ellipse at ${25 + i * 20}% ${35 + i * 15}%, ${scientificColors[i]} 0%, transparent 40%)`,
                `radial-gradient(ellipse at ${25 + i * 20}% ${35 + i * 15}%, ${scientificColors[(i + 1) % 4]} 0%, transparent 60%)`,
                `radial-gradient(ellipse at ${25 + i * 20}% ${35 + i * 15}%, ${scientificColors[(i + 2) % 4]} 0%, transparent 40%)`,
              ],
            }}
            transition={{ duration: 10 + i * 3, repeat: Infinity, ease: 'easeInOut', delay: i * 2.5 }}
            style={{ opacity: 0.7 }}
          />
        )
      })}

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

      {/* Campo electromagnético holográfico */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: 0.5,
          background: `conic-gradient(from 0deg at 50% 50%, 
            transparent 0deg, 
            rgba(0,255,255,0.08) 45deg, 
            transparent 90deg, 
            rgba(255,0,255,0.08) 135deg, 
            transparent 180deg, 
            rgba(0,255,64,0.08) 225deg, 
            transparent 270deg, 
            rgba(64,128,255,0.08) 315deg, 
            transparent 360deg)`,
          filter: 'blur(1px)'
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Campo secundario contrarrotante */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: 0.3,
          background: `conic-gradient(from 0deg at 30% 70%, 
            transparent 0deg, 
            rgba(255,255,0,0.06) 60deg, 
            transparent 120deg, 
            rgba(255,64,128,0.06) 180deg, 
            transparent 240deg, 
            rgba(128,255,64,0.06) 300deg, 
            transparent 360deg)`,
        }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      />

      {/* Sistema de escaneo holográfico avanzado */}
      {[0,1,2,3].map((i) => {
        const scanColors = [
          'linear-gradient(90deg, transparent 0%, #00ffff 15%, #ffffff 25%, #00ffff 35%, transparent 50%)',
          'linear-gradient(90deg, transparent 0%, #ff00ff 15%, #ffffff 25%, #ff00ff 35%, transparent 50%)',
          'linear-gradient(90deg, transparent 0%, #00ff40 15%, #ffffff 25%, #00ff40 35%, transparent 50%)',
          'linear-gradient(90deg, transparent 0%, #4080ff 15%, #ffffff 25%, #4080ff 35%, transparent 50%)'
        ]
        return (
          <motion.div
            key={`scan-${i}`}
            className="absolute top-0 w-full"
            style={{ 
              height: 3, 
              opacity: 0.35, 
              background: scanColors[i],
              boxShadow: `0 0 10px ${['#00ffff', '#ff00ff', '#00ff40', '#4080ff'][i]}40`,
              filter: 'blur(0.3px)'
            }}
            animate={{ 
              top: ['0%', '100%'],
              opacity: [0, 0.35, 0.7, 0.35, 0]
            }}
            transition={{ 
              duration: 6 + i * 1.5, 
              repeat: Infinity, 
              ease: 'easeInOut', 
              delay: i * 1.2 
            }}
          />
        )
      })}
      
      {/* Líneas de escaneo verticales */}
      {[0,1].map((i) => (
        <motion.div
          key={`vscan-${i}`}
          className="absolute left-0 h-full"
          style={{ 
            width: 2, 
            opacity: 0.25, 
            background: i === 0 ? 
              'linear-gradient(180deg, transparent 0%, #00ffff 20%, #ffffff 50%, #00ffff 80%, transparent 100%)' :
              'linear-gradient(180deg, transparent 0%, #ff00ff 20%, #ffffff 50%, #ff00ff 80%, transparent 100%)',
            boxShadow: `0 0 8px ${i === 0 ? '#00ffff' : '#ff00ff'}40`,
          }}
          animate={{ 
            left: ['0%', '100%'],
            opacity: [0, 0.25, 0.5, 0.25, 0]
          }}
          transition={{ 
            duration: 12 + i * 3, 
            repeat: Infinity, 
            ease: 'easeInOut', 
            delay: i * 6 
          }}
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
              <div className="flex items-center justify-between mb-1 pb-1 border-b" style={{ borderColor: relation.table1.color, boxShadow: `0 1px 0 ${relation.table1.color}40` }}>
                <h3 className="font-mono text-[12px] font-bold" style={{ 
                  color: relation.table1.color, 
                  textShadow: `0 0 8px ${relation.table1.color}60`,
                  filter: 'brightness(1.2)'
                }}>{relation.table1.name}</h3>
                <div className="text-[10px] font-mono" style={{
                  color: relation.table1.color,
                  opacity: 0.8
                }}>{relation.table1.records.toLocaleString()} rows</div>
              </div>
              <div className="space-y-0.5">
                {relation.table1.fields.map((f, idx) => (
                  <motion.div key={f} className="flex items-center justify-between text-[11px]"
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + idx * 0.07 }}>
                    <span className="text-gray-300 font-mono">{f}</span>
                    <span className="px-1 py-0.5 rounded text-[10px] font-mono" style={{ 
                      backgroundColor: `${relation.table1.color}25`, 
                      color: relation.table1.color,
                      border: `1px solid ${relation.table1.color}40`,
                      boxShadow: `0 0 4px ${relation.table1.color}30`,
                      textShadow: `0 0 4px ${relation.table1.color}40`
                    }}>
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
              <div className="flex items-center justify-between mb-1 pb-1 border-b" style={{ borderColor: relation.table2.color, boxShadow: `0 1px 0 ${relation.table2.color}40` }}>
                <h3 className="font-mono text-[12px] font-bold" style={{ 
                  color: relation.table2.color, 
                  textShadow: `0 0 8px ${relation.table2.color}60`,
                  filter: 'brightness(1.2)'
                }}>{relation.table2.name}</h3>
                <div className="text-[10px] font-mono" style={{
                  color: relation.table2.color,
                  opacity: 0.8
                }}>{relation.table2.records.toLocaleString()} rows</div>
              </div>
              <div className="space-y-0.5">
                {relation.table2.fields.map((f, idx) => (
                  <motion.div key={f} className="flex items-center justify-between text-[11px]"
                    initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + idx * 0.07 }}>
                    <span className="text-gray-300 font-mono">{f}</span>
                    <span className="px-1 py-0.5 rounded text-[10px] font-mono" style={{ 
                      backgroundColor: `${relation.table2.color}25`, 
                      color: relation.table2.color,
                      border: `1px solid ${relation.table2.color}40`,
                      boxShadow: `0 0 4px ${relation.table2.color}30`,
                      textShadow: `0 0 4px ${relation.table2.color}40`
                    }}>
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
