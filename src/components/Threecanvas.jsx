/**
 * ThreeCanvas.jsx
 *
 * This file is intentionally isolated so that React.lazy() can code-split
 * the entire Three.js / @react-three/fiber / @react-three/drei bundle away
 * from the initial JS parse. The HTML content renders and is scrollable
 * before this module ever loads.
 *
 * The canvas is fixed behind the HTML layer (z-index: 0). It listens to the
 * page's native scroll (window.scrollY) instead of R3F ScrollControls so
 * that HTML sections can use their own native GSAP ScrollTrigger animations.
 */

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

export default function ThreeCanvas() {
  const [mounted, setMounted] = useState(false);

  // Small delay so the canvas never competes with the initial HTML paint
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]} // cap pixel ratio — huge perf win on retina displays
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
}