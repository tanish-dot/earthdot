import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { MeshReflectorMaterial, Environment, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function Monolith() {
  const meshRef = useRef()
  const screenRef = useRef()
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/images/hg/hg-000.jpg', (t) => {
      t.colorSpace = THREE.SRGBColorSpace
      setTexture(t)
    })
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.15) * 0.08
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.03
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={meshRef}>
        {/* Main dark frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.4, 3.8, 0.06]} />
          <meshStandardMaterial color="#050505" metalness={0.95} roughness={0.05} envMapIntensity={0.8} />
        </mesh>

        {/* Inner screen showing real image */}
        <mesh ref={screenRef} position={[0, 0, 0.04]}>
          <planeGeometry args={[2.18, 3.54]} />
          {texture ? (
            <meshStandardMaterial map={texture} metalness={0.0} roughness={0.6} toneMapped />
          ) : (
            <meshStandardMaterial color="#0a1a0a" emissive="#0d1f0d" emissiveIntensity={0.4} />
          )}
        </mesh>

        {/* Dark vignette overlay on screen */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.18, 3.54]} />
          <meshStandardMaterial color="#000000" transparent opacity={0.35} depthWrite={false} />
        </mesh>

        {/* Edge glow strips */}
        {[-1.21, 1.21].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.004, 3.8, 0.06]} />
            <meshStandardMaterial color="#f5f0e8" emissive="#f5f0e8" emissiveIntensity={0.2} transparent opacity={0.5} />
          </mesh>
        ))}
        {[-1.91, 1.91].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[2.4, 0.004, 0.06]} />
            <meshStandardMaterial color="#f5f0e8" emissive="#f5f0e8" emissiveIntensity={0.2} transparent opacity={0.5} />
          </mesh>
        ))}

        {/* Soft bloom halo */}
        <mesh position={[0, 0, -0.12]}>
          <planeGeometry args={[4.5, 6.5]} />
          <meshStandardMaterial color="#1a3a1a" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>
      </group>
    </Float>
  )
}

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        blur={[800, 100]} resolution={1024} mixBlur={0.9} mixStrength={0.4}
        roughness={1} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4}
        color="#040404" metalness={0.6} mirror={0.35}
      />
    </mesh>
  )
}

function AtmosphericParticles() {
  const count = 140
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3
    }
    return arr
  }, [])

  const particlesRef = useRef()
  useFrame(({ clock }) => {
    if (particlesRef.current) particlesRef.current.rotation.y = clock.getElapsedTime() * 0.018
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.01} color="#c8c0b0" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

export default function FloatingMonolith() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.85 }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#080808']} />
        <fog attach="fog" args={['#080808', 8, 20]} />
        <ambientLight intensity={0.03} />
        <pointLight position={[0, 4, 2]} intensity={0.5} color="#f0ece4" decay={2} />
        <pointLight position={[-3, 2, 1]} intensity={0.2} color="#2d5a2d" decay={2} />
        <pointLight position={[3, 2, 1]} intensity={0.2} color="#2d5a2d" decay={2} />
        <pointLight position={[0, -1, 3]} intensity={0.08} color="#1a3a1a" decay={3} />
        <Environment preset="night" />
        <Stars radius={60} depth={50} count={800} factor={2} saturation={0} fade speed={0.3} />
        <Monolith />
        <ReflectiveFloor />
        <AtmosphericParticles />
      </Canvas>
    </div>
  )
}
