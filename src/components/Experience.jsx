import { Float, OrbitControls } from "@react-three/drei";
import { Background } from "./Background";
import { Airplane } from "./Airplane";
import { Cloud } from "./Cloud";

let cloudArray = new Array(10);

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

  return (
    <>
      <OrbitControls />
      <Background />
      <Float floatIntensity={2} speed={2}>
        <Airplane
          rotation-y={Math.PI / 2}
          scale={[0.2, 0.2, 0.2]}
          position-y={0.1}
        />
      </Float>
      {cloudRender()}
    </>
  );
};
