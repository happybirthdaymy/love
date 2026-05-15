import { Canvas } from '@react-three/fiber';
import { Stars, Float, Sparkles } from '@react-three/drei';

function FloatingObjects() {
  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[1.5, 2, -5]}>
        <mesh>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5} position={[-1.8, -1.5, -6]}>
        <mesh>
          <icosahedronGeometry args={[1.2]} />
          <meshStandardMaterial color="#f472b6" metalness={0.6} roughness={0.4} wireframe />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2} position={[1.2, -3, -4]}>
         <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#c084fc" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={3} floatIntensity={3} position={[-1.5, 3, -8]}>
        <mesh>
          <dodecahedronGeometry args={[1.5]} />
          <meshStandardMaterial color="#d4af37" metalness={0.5} roughness={0.2} wireframe />
        </mesh>
      </Float>
    </>
  );
}

export default function Scene3D() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 45 }} 
      dpr={1} 
      className="w-full h-full" 
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#d4af37" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#f472b6" />
      
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={1} fade speed={1} />
      <Sparkles count={80} scale={15} size={2} speed={0.4} opacity={0.6} color="#d4af37" />
      <Sparkles count={50} scale={10} size={3} speed={0.6} opacity={0.4} color="#f472b6" />
      
      <FloatingObjects />
    </Canvas>
  );
}
