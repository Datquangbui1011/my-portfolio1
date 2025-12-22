"use client";

import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

export function Globe() {
  const mesh = useRef<THREE.Mesh>(null!);

  // Load textures
  const map = useLoader(THREE.TextureLoader, "/earthmap.jpg");
  const bumpMap = useLoader(THREE.TextureLoader, "/earthbump.jpg");
  const specularMap = useLoader(THREE.TextureLoader, "/earthspec.jpg");

  // Rotate the globe
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[40, 40, 40]} />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={mesh}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhongMaterial
          map={map}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color("grey")}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
}