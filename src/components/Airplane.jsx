/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/Airplane.glb 
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const HELIX_SPEED = 6;

export function Airplane(props) {
  const { nodes, materials } = useGLTF("./models/Airplane.glb");

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.PUSHILIN_Plane_Circle000.geometry}>
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/Airplane.glb");
