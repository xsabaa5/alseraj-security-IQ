import { useRef, useEffect, Suspense, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import cameraModel from "../assets/3D Assets/cctv_cameras.glb";

// Preload model for faster initial render
useGLTF.preload(cameraModel);

function CctvModel({
  onReady,
  rotation = [0, 0, 0],
  headTilt = [0, 0, 0],
  headPosition = [15, 50, 60],
}) {
  const { scene } = useGLTF(cameraModel);
  // Clone the scene so HMR/re-renders don't detach the original
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const pivotRef = useRef(null);
  const pivotOrigin = useRef(new THREE.Vector3());
  const mouse = useRef({ x: 0, y: 0 });
  const smoothRotation = useRef({ x: 0, y: 0 });

  // Find camera head + Cylinder 2 (pivot joint) and set up pivot-based rotation
  useEffect(() => {
    let cameraHead = null;
    let cylinder2 = null;

    clonedScene.traverse((child) => {
      // Find camera head group
      if (
        !cameraHead &&
        (child.name === "Camera Head" ||
          child.name === "Camera_Head" ||
          child.name === "Group")
      ) {
        cameraHead = child;
      }
      // Find the neck joint (Cylinder 2) — this is where the pivot should be
      if (
        !cylinder2 &&
        (child.name === "Cylinder 2" || child.name === "Cylinder_2")
      ) {
        cylinder2 = child;
      }
    });

    if (cameraHead && cylinder2) {
      // Get Cylinder 2's world position (the realistic pivot/joint point)
      const pivotWorldPos = new THREE.Vector3();
      cylinder2.getWorldPosition(pivotWorldPos);

      const parent = cameraHead.parent;
      if (parent) {
        // Convert pivot position to parent's local coordinate space
        const pivotLocalPos = parent.worldToLocal(pivotWorldPos.clone());

        // Create a pivot group positioned at the neck joint
        const pivot = new THREE.Group();
        pivot.name = "CameraPivot";
        pivot.position.copy(pivotLocalPos);

        // Reparent: remove camera head from its current parent
        // and offset it so it stays visually in the same place
        parent.remove(cameraHead);
        cameraHead.position.sub(pivotLocalPos);
        pivot.add(cameraHead);
        parent.add(pivot);

        pivotRef.current = pivot;
        pivotOrigin.current.copy(pivotLocalPos);
      }
    } else if (cameraHead) {
      // Fallback: rotate camera head directly if Cylinder 2 not found
      pivotRef.current = cameraHead;
      pivotOrigin.current.copy(cameraHead.position);
    }

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

  // Realistic CCTV camera rotation — pivots from Cylinder 2 (neck joint)
  useFrame((_, delta) => {
    if (!pivotRef.current) return;

    const targetY = mouse.current.x * 0.5;
    const targetX = mouse.current.y * 0.25;

    // Smooth interpolation with inertia for realistic weight/momentum
    const lerpSpeed = 2.5;
    const factor = 1 - Math.exp(-lerpSpeed * delta);
    smoothRotation.current.y = THREE.MathUtils.lerp(
      smoothRotation.current.y,
      targetY,
      factor,
    );
    smoothRotation.current.x = THREE.MathUtils.lerp(
      smoothRotation.current.x,
      targetX,
      factor,
    );

    // Head rotation offset (tilt) + position offset for full control
    pivotRef.current.rotation.x = smoothRotation.current.x + headTilt[0];
    pivotRef.current.rotation.y = smoothRotation.current.y + headTilt[1];
    pivotRef.current.rotation.z = headTilt[2];
    pivotRef.current.position.x = pivotOrigin.current.x + headPosition[0];
    pivotRef.current.position.y = pivotOrigin.current.y + headPosition[1];
    pivotRef.current.position.z = pivotOrigin.current.z + headPosition[2];
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

export default function CctvCamera({
  style,
  rotation,
  headTilt,
  headPosition,
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{ width: "100%", height: "100%", position: "relative", ...style }}
    >
      {loading && <Loader />}
      <Canvas
        camera={{ position: [10, 0, 0], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <Suspense fallback={null}>
          <CctvModel
            onReady={() => setLoading(false)}
            rotation={rotation}
            headTilt={headTilt}
            headPosition={headPosition}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
