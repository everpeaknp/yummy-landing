"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Group } from "three";

const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 2;
const LEFT_COLOR = "6366f1"; // Indigo-500
const RIGHT_COLOR = "ec4899"; // Pink-500
const NUM_POINTS = 2500;

const getGradientColor = (angle: number) => {
  const colors = [LEFT_COLOR, RIGHT_COLOR];
  // Simple color approximation/randomization since we don't have the full util
  return "#" + colors[Math.floor(Math.random() * colors.length)];
};

const randomFromInterval = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const pointsInner = Array.from({ length: NUM_POINTS }, (v, k) => k + 1).map(
  (num) => {
    const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
    const randomAngle = Math.random() * Math.PI * 2;

    const x = Math.cos(randomAngle) * randomRadius;
    const y = Math.sin(randomAngle) * randomRadius;
    const z = randomFromInterval(-DEPTH, DEPTH);

    const color = getGradientColor(randomAngle);

    return {
      idx: num,
      position: [x, y, z] as [number, number, number],
      color,
    };
  }
);

const pointsOuter = Array.from({ length: NUM_POINTS / 4 }, (v, k) => k + 1).map(
  (num) => {
    const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
    const randomAngle = Math.random() * Math.PI * 2;

    const x = Math.cos(randomAngle) * randomRadius;
    const y = Math.sin(randomAngle) * randomRadius;
    const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);

    const color = getGradientColor(randomAngle);

    return {
      idx: num,
      position: [x, y, z] as [number, number, number],
      color,
    };
  }
);

const ParticleRing = () => {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        className="bg-transparent"
        gl={{ alpha: true }} 
      >
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef<Group | null>(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;
