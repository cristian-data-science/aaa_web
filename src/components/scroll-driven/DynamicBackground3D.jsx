import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/**
 * ParticleField - Campo de partículas 3D con movimiento fluido
 */
function ParticleField({ count = 2000, color = '#00d9ff' }) {
  const points = useRef()
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Distribución en esfera
      const radius = 8 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    
    return positions
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (points.current) {
      // Rotación suave del campo de partículas
      points.current.rotation.x = Math.sin(time * 0.1) * 0.2
      points.current.rotation.y = time * 0.05
      
      // Efecto de pulsación sutil
      const scale = 1 + Math.sin(time * 0.3) * 0.05
      points.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

/**
 * MorphingGeometry - Geometría que se transforma entre formas
 */
function MorphingGeometry({ position = [0, 0, 0], color = '#8b5cf6' }) {
  const mesh = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (mesh.current) {
      // Morph entre formas usando scale y rotation
      mesh.current.rotation.x = time * 0.2
      mesh.current.rotation.y = time * 0.3
      
      // Efecto de breathing
      const breath = 1 + Math.sin(time * 0.5) * 0.3
      mesh.current.scale.set(breath, breath, breath)
      
      // Movimiento flotante
      mesh.current.position.y = position[1] + Math.sin(time * 0.4) * 0.5
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

/**
 * WaveGrid - Grid ondulante en el fondo
 */
function WaveGrid() {
  const mesh = useRef()
  
  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime()
      const positions = mesh.current.geometry.attributes.position.array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        positions[i + 2] = Math.sin(x * 0.5 + time) * 0.3 + Math.cos(y * 0.5 + time) * 0.3
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true
      mesh.current.rotation.z = time * 0.05
    }
  })

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, -2]}>
      <planeGeometry args={[20, 20, 30, 30]} />
      <meshBasicMaterial 
        color="#00ffd9" 
        wireframe 
        transparent 
        opacity={0.1}
      />
    </mesh>
  )
}

/**
 * DynamicBackground3D - Componente principal del fondo 3D
 */
const DynamicBackground3D = ({ 
  className = '', 
  enableParticles = true,
  enableGeometry = true,
  enableGrid = true,
}) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // No renderizar si el usuario prefiere movimiento reducido
  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 bg-black ${className}`}>
        {/* Fondo estático alternativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black opacity-80" />
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]} // Adaptive pixel ratio para performance
      >
        {/* Iluminación ambiental */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d9ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

        {/* Campo de partículas cyan */}
        {enableParticles && <ParticleField count={2000} color="#00d9ff" />}
        
        {/* Geometrías morfables */}
        {enableGeometry && (
          <>
            <MorphingGeometry position={[-2, 0, -2]} color="#8b5cf6" />
            <MorphingGeometry position={[2, 1, -3]} color="#00ffd9" />
            <MorphingGeometry position={[0, -1, -1]} color="#00d9ff" />
          </>
        )}

        {/* Grid ondulante */}
        {enableGrid && <WaveGrid />}

        {/* Controles de órbita suaves (solo para interacción sutil) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Gradiente overlay para mezclar con el contenido */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
    </div>
  )
}

export default DynamicBackground3D
