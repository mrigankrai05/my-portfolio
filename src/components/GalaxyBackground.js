// src/components/GalaxyBackground.js
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// --- Particle Field Component ---
function Stars({ count = 5000 }) {
  const pointsRef = useRef();

  // Generate star positions once
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    const radius = 20; // Increased radius to fill more space
    for (let i = 0; i < count; i++) {
      // Generate points within a sphere to simulate a galaxy cluster
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta) * (0.5 + Math.random() * 0.5); // Add some randomness for depth
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * (0.5 + Math.random() * 0.5);
      p[i * 3 + 2] = radius * Math.cos(phi) * (0.5 + Math.random() * 0.5);

      // Optionally, create a spiral arm effect
      // const armAngle = Math.atan2(p[i * 3 + 1], p[i * 3]) + (Math.random() - 0.5) * 0.5;
      // const armRadius = Math.sqrt(p[i * 3] * p[i * 3] + p[i * 3 + 1] * p[i * 3 + 1]);
      // p[i * 3] = Math.cos(armAngle) * armRadius;
      // p[i * 3 + 1] = Math.sin(armAngle) * armRadius;
    }
    return p;
  }, [count]);

  // Subtle animation for galaxy movement
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      // Rotate the entire star field
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.005;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.002;

      // Optional: slight pulsating/breathing effect for depth
      // pointsRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05);
    }
  });

  return (
    <Points positions={positions} ref={pointsRef} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ffffff" // Base white color for stars
        size={0.05} // Size of individual stars
        sizeAttenuation={true} // Stars further away appear smaller
        depthWrite={false}
      />
    </Points>
  );
}

// --- Dynamic Camera Rig (Optional, can be removed if not desired for galaxy) ---
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    // Make camera slightly follow mouse position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.5, 0.05);
    camera.lookAt(0, 0, 0); // Always look at the center
  });
  return null;
}

// --- Main Galaxy Background Component ---
const GalaxyBackground = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }} // Camera pulled back to see more of the galaxy
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1, // Behind your main content overlay
        pointerEvents: 'none', // Critical: Allows clicks to pass through to HTML content
      }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.2} /> 
      <pointLight position={[5, 0, 0]} intensity={1.0} color="#FF6347" /> 
      <pointLight position={[-5, 0, 0]} intensity={1.0} color="#4682B4" /> 
      <pointLight position={[0, 5, 0]} intensity={1.0} color="#ADFF2F" /> 

      {/* Environment for general background ambiance (can be subtle or removed) */}
      <Environment preset="night" background={false} />

      {/* The field of stars */}
      <Stars count={10000} /> {/* Increased star count for density */}

      {/* Camera movement based on mouse */}
      <CameraRig />

      {/* Post-processing effects for glow and atmosphere */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={-100} // Very low threshold to make many stars bloom
          luminanceSmoothing={0.9}
          height={300}
          opacity={1.5} // Increased bloom intensity
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
        <Noise opacity={0.05} blendFunction={BlendFunction.ADD} /> 
      </EffectComposer>

      {/* No OrbitControls for background */}
    </Canvas>
  );
};

export default GalaxyBackground;