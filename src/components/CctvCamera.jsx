import { useRef, useEffect, Suspense, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import cameraModel from "../assets/3D Assets/cctv_cameras.glb";

// Preload model for faster initial render
useGLTF.preload(cameraModel);

function CctvModel({ onReady, rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(cameraModel);
  // Clone the scene so HMR/re-renders don't detach the original
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothRotation = useRef({ x: 0, y: 0 });

  // Find the "Group" node (camera head) in the cloned scene
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.name === "Group") {
        groupRef.current = child;
      }
    });
    onReady?.();
  }, [clonedScene]);

  // Track mouse position
  useEffect(() => {
    function handleMouseMove(e) {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smoothly rotate the camera head every frame
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetY = mouse.current.x * 0.5;
    const targetX = mouse.current.y * 0.25;

    const lerpSpeed = 4;
    smoothRotation.current.y = THREE.MathUtils.lerp(
      smoothRotation.current.y,
      targetY,
      1 - Math.exp(-lerpSpeed * delta),
    );
    smoothRotation.current.x = THREE.MathUtils.lerp(
      smoothRotation.current.x,
      targetX,
      1 - Math.exp(-lerpSpeed * delta),
    );

    groupRef.current.rotation.y = smoothRotation.current.y;
    groupRef.current.rotation.x = smoothRotation.current.x;
  });

  return (
    <Center>
      <group rotation={rotation}>
        <primitive object={clonedScene} />
      </group>
    </Center>
  );
}

function Loader() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "3px solid rgba(255,255,255,0.15)",
          borderTop: "3px solid #e93d59",
          borderRadius: "50%",
          animation: "cctv-spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes cctv-spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

export default function CctvCamera({ style, rotation }) {
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{ width: "100%", height: "100%", position: "relative", ...style }}
    >
      {loading && <Loader />}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <Suspense fallback={null}>
          <CctvModel onReady={() => setLoading(false)} rotation={rotation} />
        </Suspense>
      </Canvas>
    </div>
  );
}
