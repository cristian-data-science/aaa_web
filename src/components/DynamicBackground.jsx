import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const DynamicBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Partículas
    const particles = []
    const particleCount = 80
    const connectionDistance = 150

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.2
        this.hue = Math.random() * 60 + 160 // Verde-azul
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Rebote en bordes
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        // Mantener dentro del canvas
        this.x = Math.max(0, Math.min(canvas.width, this.x))
        this.y = Math.max(0, Math.min(canvas.height, this.y))

        // Efecto pulsante
        this.pulsePhase += this.pulseSpeed
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7
        const currentRadius = this.radius * pulse
        const currentOpacity = this.opacity * pulse

        // Gradiente radial para cada partícula
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentRadius * 3
        )
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, ${currentOpacity})`)
        gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, 50%, ${currentOpacity * 0.5})`)
        gradient.addColorStop(1, `hsla(${this.hue}, 70%, 40%, 0)`)

        ctx.beginPath()
        ctx.arc(this.x, this.y, currentRadius * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Núcleo brillante
        ctx.beginPath()
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${currentOpacity * 1.5})`
        ctx.fill()
      }
    }

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Ondas de energía
    const waves = []
    class EnergyWave {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = 0
        this.maxRadius = Math.random() * 200 + 100
        this.speed = Math.random() * 2 + 1
        this.opacity = 0.3
        this.hue = Math.random() * 60 + 160
      }

      update() {
        this.radius += this.speed
        this.opacity = Math.max(0, this.opacity - 0.005)
      }

      draw() {
        if (this.opacity <= 0) return

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Onda interior
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 0.7, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${this.hue + 20}, 70%, 70%, ${this.opacity * 0.5})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      isDead() {
        return this.radius > this.maxRadius || this.opacity <= 0
      }
    }

    // Generar ondas periódicamente
    setInterval(() => {
      if (waves.length < 5) {
        waves.push(new EnergyWave())
      }
    }, 3000)

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizar y dibujar ondas
      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].update()
        waves[i].draw()
        if (waves[i].isDead()) {
          waves.splice(i, 1)
        }
      }

      // Actualizar y dibujar partículas
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Dibujar conexiones entre partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.2
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            )
            gradient.addColorStop(0, `hsla(${particles[i].hue}, 70%, 60%, ${opacity})`)
            gradient.addColorStop(1, `hsla(${particles[j].hue}, 70%, 60%, ${opacity})`)

            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      {/* Canvas de fondo */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.4 }}
      />
      
      {/* Formas orgánicas flotantes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          >
            <div
              className="w-full h-full opacity-10"
              style={{
                background: `radial-gradient(ellipse at center, 
                  hsl(${160 + Math.random() * 60}, 70%, 60%) 0%, 
                  hsl(${180 + Math.random() * 40}, 60%, 50%) 50%, 
                  transparent 70%)`,
                borderRadius: `${Math.random() * 50 + 30}% ${Math.random() * 50 + 30}% ${Math.random() * 50 + 30}% ${Math.random() * 50 + 30}%`,
                filter: 'blur(20px)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Gradiente de overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-transparent via-transparent to-gray-900/20 dark:to-gray-900/40" />
    </>
  )
}

export default DynamicBackground

