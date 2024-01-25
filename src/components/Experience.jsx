import {
  Float,
  Line,
  OrbitControls,
  PerspectiveCamera,
  useScroll,
} from "@react-three/drei";
import { Background } from "./Background";
import { Airplane } from "./Airplane";
import { Cloud } from "./Cloud";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

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

  const LINE_NB_POINTS = 12000;

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

  const cameraGroup = useRef();
  const scroll = useScroll();

  const airplane = useRef();

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];
    const pointAhead =
      linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angleRotation
      )
    );

    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        angleRotation,
        airplane.current.rotation.z
      )
    );

    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);

    cameraGroup.current.position.lerp(curPoint, delta * 24);
  });

  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}
      <group ref={cameraGroup}>
        <Background />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        <group ref={airplane}>
          <Float floatIntensity={2} speed={2}>
            <Airplane
              rotation-y={Math.PI / 2}
              scale={[0.2, 0.2, 0.2]}
              position-y={0.1}
            />
          </Float>
        </group>
      </group>

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
