import { Text } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

export const TextSection = ({ title, subtitle, ...props }) => {
  return (
    <group {...props}>
      {!!title && (
        <Text
          color="white"
          anchorX={"left"}
          anchorY="bottom"
          fontSize={0.52}
          maxWidth={2.5}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
        >
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
          {title}
        </Text>
      )}
      <Text
        color="white"
        anchorX={"left"}
        anchorY="top"
        fontSize={0.22}
        maxWidth={2.5}
        font={"./fonts/Inter-Regular.ttf"}
      >
        <meshStandardMaterial
          color={"white"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
        {subtitle}
      </Text>
    </group>
  );
};
