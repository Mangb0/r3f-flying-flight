import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

const App = () => {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
  );
};

export default App;
