/**
 * Experience.jsx
 *
 * Because the HTML now lives in the native DOM (not inside R3F <Scroll html>),
 * we read the scroll progress from window.scrollY instead of useScroll().
 * Everything else is identical to the original.
 */

import {
  Float,
  MeshDistortMaterial,
  GradientTexture,
  ContactShadows,
  Stars,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function useWindowScrollOffset() {
  const offsetRef = useRef(0);

  useEffect(() => {
    const handler = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      offsetRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return offsetRef;
}

export default function Experience() {
  const offsetRef = useWindowScrollOffset();

  const groupRef = useRef();
  const materialRef = useRef();
  const secondaryRef = useRef();
  const secondaryMatRef = useRef();

  useFrame(({ clock }) => {
    const t = offsetRef.current;
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.x = 2 + Math.sin(elapsed * 0.4) * 0.15;
      groupRef.current.position.y = THREE.MathUtils.lerp(0, -8, t);
      groupRef.current.rotation.y = elapsed * 0.3;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 0.5, t);
    }

    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(0.3, 0.75, t);
      materialRef.current.speed = THREE.MathUtils.lerp(2, 5, t);
    }

    if (secondaryRef.current) {
      secondaryRef.current.position.x = -2.5 + Math.cos(elapsed * 0.5) * 0.2;
      secondaryRef.current.position.y = THREE.MathUtils.lerp(1, -6, t);
      secondaryRef.current.rotation.z = elapsed * 0.6;
      if (secondaryMatRef.current) {
        secondaryMatRef.current.distort = THREE.MathUtils.lerp(0.2, 0.6, t);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[3, 4, 2]} intensity={0.4} color="#10b981" />

      <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.35}
        scale={10}
        blur={2}
        far={10}
        resolution={256}
        color="#000000"
      />

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        <group ref={groupRef}>
          <mesh>
            <sphereGeometry args={[1.5, 64, 64]} />
            <MeshDistortMaterial
              ref={materialRef}
              distort={0.3}
              speed={2}
              radius={1}
              metalness={0.1}
              roughness={0.05}
            >
              <GradientTexture
                stops={[0, 0.5, 1]}
                colors={['#3b82f6', '#6366f1', '#10b981']}
                size={1024}
              />
            </MeshDistortMaterial>
          </mesh>
        </group>
      </Float>

      <Float speed={2.4} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={secondaryRef} position={[-2.5, 1, -1]} scale={0.65}>
          <sphereGeometry args={[1.5, 48, 48]} />
          <MeshDistortMaterial
            ref={secondaryMatRef}
            distort={0.2}
            speed={3}
            radius={1}
            metalness={0.05}
            roughness={0.1}
          >
            <GradientTexture
              stops={[0, 1]}
              colors={['#f43f5e', '#fbbf24']}
              size={512}
            />
          </MeshDistortMaterial>
        </mesh>
      </Float>
    </>
  );
}