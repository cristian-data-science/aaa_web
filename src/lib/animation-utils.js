/**
 * Utilidades para mantener timing consistente de animaciones
 * entre desarrollo y producción
 */

// Sistema de timing normalizado
export class AnimationTimer {
  constructor(targetFPS = 60) {
    this.targetFPS = targetFPS
    this.frameTime = 1000 / targetFPS
    this.lastTime = performance.now()
    this.lag = 0
    this.time = 0
  }

  update() {
    const currentTime = performance.now()
    const deltaTime = Math.min((currentTime - this.lastTime), this.frameTime * 2)
    this.lastTime = currentTime
    this.lag += deltaTime
    
    let updated = false
    while (this.lag >= this.frameTime) {
      const normalizedDelta = this.frameTime * 0.001
      this.time += normalizedDelta
      this.lag -= this.frameTime
      updated = true
    }
    
    return {
      shouldRender: updated,
      time: this.time,
      deltaTime: this.frameTime * 0.001
    }
  }
}

// Configuración de renderer consistente
export const getRendererConfig = () => ({
  pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
  antialias: false,
  precision: 'highp',
  powerPreference: 'high-performance'
})

// Detectar capacidades del dispositivo de manera consistente
export const getDeviceCapabilities = () => {
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const lowPower = navigator.hardwareConcurrency <= 2
  
  return {
    isMobile,
    prefersReduced,
    lowPower,
    particleCountMultiplier: isMobile ? 0.5 : (lowPower ? 0.7 : 1.0),
    animationSpeedMultiplier: prefersReduced ? 0.3 : 1.0
  }
}
