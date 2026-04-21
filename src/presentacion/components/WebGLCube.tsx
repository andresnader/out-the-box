import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Float, RoundedBox, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Helper component to render crisp text without @react-three/drei's Text to avoid hook errors
const CanvasText = ({ text, position, rotation }: { text: string, position: [number, number, number], rotation: [number, number, number] }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 1024, 256);
      ctx.font = 'bold 90px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add slight glow to text to match Gamecube OS
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fillText(text, 512, 128);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    return tex;
  }, [text]);

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[3, 0.75]} />
      <meshBasicMaterial map={texture} transparent={true} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
};

const GamecubeStyleComposition = () => {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Group>(null);

  const centerTexture = useLoader(THREE.TextureLoader, '/box-imagotipo.jpeg');
  // Enhance texture quality
  centerTexture.colorSpace = THREE.SRGBColorSpace;
  centerTexture.minFilter = THREE.LinearFilter;
  centerTexture.magFilter = THREE.LinearFilter;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating rotation for the inner core
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (outerRef.current) {
      // Constant slow spin for the outer glass cube
      outerRef.current.rotation.y += delta * 0.3;
      outerRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0} floatIntensity={1.5}>
        <group ref={outerRef}>
          {/* INNER CORE - Imagotipo via transparent planes */}
          <group ref={groupRef}>
            <mesh>
              <planeGeometry args={[1.5, 1.5]} />
              <meshBasicMaterial map={centerTexture} transparent={true} side={THREE.DoubleSide} depthWrite={false} blending={THREE.MultiplyBlending} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[1.5, 1.5]} />
              <meshBasicMaterial map={centerTexture} transparent={true} side={THREE.DoubleSide} depthWrite={false} blending={THREE.MultiplyBlending} />
            </mesh>
          </group>

          {/* OUTER SHELL - Solid Iridescent Glass Cube */}
          <RoundedBox args={[3.2, 3.2, 3.2]} radius={0.15} smoothness={4}>
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={1.2}
              chromaticAberration={0.08}
              anisotropy={0.2}
              distortion={0.1}
              distortionScale={0.3}
              temporalDistortion={0.1}
              iridescence={1}
              iridescenceIOR={1.6}
              iridescenceThicknessRange={[100, 400]}
              color="#ffffff"
              roughness={0.1}
              metalness={0.2}
              clearcoat={1}
            />
          </RoundedBox>

          {/* ATTACHED UI OVERLAY - Glued to the front face of the cube */}
          <group position={[0, 0, 1.61]}>
            <CanvasText text="Analítica" position={[0, 1.4, 0]} rotation={[0, 0, 0]} />
            <CanvasText text="Resultados" position={[0, -1.4, 0]} rotation={[0, 0, 0]} />
            <CanvasText text="Crecimiento" position={[-1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
            <CanvasText text="Alcance" position={[1.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]} />
          </group>
        </group>
      </Float>
    </group>
  );
};

export const WebGLCube = () => {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '500px' }}>
      {/* Ambient pink glow behind the canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#fe0065] opacity-30 blur-[100px] rounded-full pointer-events-none" />

      <Canvas camera={{ position: [6, 5, 6], fov: 45 }} className="w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#fe0065" />
        <pointLight position={[0, 0, 0]} intensity={3} color="#fe0065" distance={10} />

        <GamecubeStyleComposition />

        {/* Floor reflection shadow */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.6}
          scale={15}
          blur={3}
          far={5}
          color="#fe0065"
        />

        <Environment preset="studio" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};
