import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Target = (props) => {
  const targetRef = useRef();

  useFrame((state) => {
    if (!targetRef.current) {
      return;
    }

    targetRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    targetRef.current.position.y = props.position?.[1] ?? 0;
  });

  return (
    <group
      {...props}
      ref={targetRef}
      rotation={[0, Math.PI / 5, 0]}
      scale={1.5}
    >
      <group position={[0, -0.35, 0]}>
        <mesh position={[0, -0.95, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 1.8, 16]} />
          <meshStandardMaterial
            color="#6b7280"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        <mesh position={[0, -1.85, 0]}>
          <cylinderGeometry args={[0.32, 0.36, 0.08, 24]} />
          <meshStandardMaterial
            color="#111111"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
          <meshStandardMaterial color="#ef4444" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.11, 0.02]}>
          <cylinderGeometry args={[0.48, 0.48, 0.12, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.12, 0.04]}>
          <cylinderGeometry args={[0.24, 0.24, 0.14, 32]} />
          <meshStandardMaterial color="#111111" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

export default Target;
