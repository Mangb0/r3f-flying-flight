import { Float, Line, OrbitControls } from "@react-three/drei";
import { Background } from "./Background";
import { Airplane } from "./Airplane";
import { Cloud } from "./Cloud";
import { useMemo } from "react";
import * as THREE from "three";

export const Experience = () => {
  const cloudRender = () => {
    const result = [];
    const opacity = Math.random() * 0.5 + 0.3;
    const rotation = Math.random() > 0.5 ? Math.PI / 9 : 0;

    for (let i = 0; i < 10; i++) {
      result.push(
        <Cloud
          opacity={opacity}
          scale={[
            Math.random() * 0.5 + 0.3,
            Math.random() * 0.5 + 0.3,
            Math.random() * 0.5 + 0.3,
          ]}
          position={[
            Math.random() * 4 - 2,
            Math.random() * 4 - 2,
            Math.random() * 100 - 100,
          ]}
          rotation-y={rotation}
        />
      );
    }
    return result;
  };

  const LINE_NB_POINTS = 2000;

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(-2, 0, -20),
        new THREE.Vector3(-3, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(5, 0, -50),
        new THREE.Vector3(7, 0, -60),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  return (
    <>
      <OrbitControls />
      <Background />
      <Float floatIntensity={2} speed={2}>
        <Airplane
          rotation-y={Math.PI / 2}
          scale={[0.3, 0.3, 0.3]}
          position-y={0.1}
        />
      </Float>

      <group position-y={-2}>
        {/* <Line
          points={linePoints}
          color={"white"}
          opacity={0.7}
          transparent
          lineWidth={8}
        /> */}
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color={"white"} opacity={0.7} transparent />
        </mesh>
      </group>
      {cloudRender()}
    </>
  );
};
