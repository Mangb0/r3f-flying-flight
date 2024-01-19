import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

const App = () => {
  return (
    <Canvas>
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
  );
};

export default App;
