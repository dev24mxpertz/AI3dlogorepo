// import React, { useRef } from "react";
// import { Canvas, extend, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
// import * as THREE from "three";
// import fontData from "three/examples/fonts/helvetiker_regular.typeface.json";

// extend({ TextGeometry });

// const Cube = ({ position, size, color }) => {
//   const ref = useRef();

//   useFrame((state, delta) => {
//     if (ref.current) {
//       ref.current.rotation.x += delta;
//       ref.current.rotation.y += delta * 2.0;
//       ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
//     }
//   });

//   return (
//     <mesh position={position} ref={ref}>
//       <boxGeometry args={size} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// };

// const Sphere = ({ position, size, color }) => {
//   const ref = useRef();

//   useFrame((state, delta) => {
//     if (ref.current) {
//       ref.current.rotation.x += delta;
//       ref.current.rotation.y += delta * 2.0;
//       ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
//     }
//   });

//   return (
//     <mesh position={position} ref={ref}>
//       <sphereGeometry args={size} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// };

// const Torous = ({ position, size, color }) => {
//   const ref = useRef();

//   useFrame((state, delta) => {
//     if (ref.current) {
//       ref.current.rotation.x += delta;
//       ref.current.rotation.y += delta * 2.0;
//       ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
//     }
//   });

//   return (
//     <mesh position={position} ref={ref}>
//       <torusGeometry args={size} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// };

// const TorousKnot = ({ position, size, color }) => {
//   return (
//     <mesh position={position}>
//       <torusKnotGeometry args={size} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// };

// export default function App() {
//   const font = new FontLoader().parse(fontData);

//   return (
//     <div style={{ backgroundColor: "black" }}>
//       <Canvas>
//         <directionalLight position={[0, 0, 2]} intensity={0.8} />
//         <ambientLight intensity={0.2} />
//         <OrbitControls enableZoom={true} />
//         <group position={[0, 0, 0]}>
//           <Sphere position={[0, 0, 0]} size={[1, 32, 32]} color="blue" />
//           <Torous position={[1, 0, 0]} size={[1, 32, 32]} color="red" />
//           <TorousKnot position={[2, 0, 0]} size={[1, 32, 32]} color="white" />
//         </group>
//         <mesh position={[-10, 0, 0]}>
//           <textGeometry args={["ALTUS", { font, size: 5, height: 1 }]} />
//           <meshBasicMaterial color="white" wireframe />
//         </mesh>
//       </Canvas>
//     </div>
//   );
// }

///*-----------------------------------------------------------------Code For Infinite LOGO Transparent Tube like Structure -*-------------------------

// import React, { useRef, useMemo } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";

// class InfinityCurve extends THREE.Curve {
//   constructor(scale = 1) {
//     super();
//     this.scale = scale;
//   }

//   getPoint(t) {
//     if (t < 0 || t > 1) return new THREE.Vector3(0, 0, 0);

//     const angle = t * Math.PI * 2;
//     const x = Math.sin(angle) * this.scale;
//     const y = (Math.sin(2 * angle) * this.scale) / 2;
//     const z = 0;

//     return new THREE.Vector3(x, y, z);
//   }
// }

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, info) {
//     console.error("ErrorBoundary caught an error:", error, info);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <h2>
//           Something went wrong with the InfinitySymbol. Please try again later.
//         </h2>
//       );
//     }
//     return this.props.children;
//   }
// }

// function InfinitySymbol() {
//   const ref = useRef();
//   const path = new InfinityCurve(2);
//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.x += 0.01;
//       ref.current.rotation.y += 0.01;
//     }
//   });

//   const tubeGeometry = useMemo(() => {
//     const path = new InfinityCurve(2);
//     return new THREE.TubeGeometry(path, 200, 0.3, 16, true);
//   }, []);

//   const points = [];
//   const linePath = new InfinityCurve(2);
//   for (let i = 0; i <= 100; i++) {
//     const t = i / 100;
//     points.push(linePath.getPoint(t));
//   }

//   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//   const lineMaterial = new THREE.LineBasicMaterial({ color: "red" });

//   const combinedGeometry = new THREE.BufferGeometry();

//   const tubePosition = tubeGeometry.attributes.position.array;
//   combinedGeometry.setAttribute(
//     "position",
//     new THREE.BufferAttribute(tubePosition, 3)
//   );

//   const linePosition = lineGeometry.attributes.position.array;

//   combinedGeometry.setAttribute(
//     "linePosition",
//     new THREE.BufferAttribute(linePosition, 3)
//   );

//   if (!tubeGeometry) {
//     console.error("TubeGeometry is null.");
//     return null;
//   }

//   const wireframeMaterial = new THREE.MeshBasicMaterial({
//     color: "white",
//     wireframe: true,
//   });

//   return (
//     <mesh ref={ref} geometry={combinedGeometry} material={wireframeMaterial} />
//   );
// }

// function App() {
//   return (
//     <ErrorBoundary>
//       <Canvas style={{ backgroundColor: "black", height: "100vh" }}>
//         <ambientLight />
//         <pointLight position={[10, 10, 10]} />
//         <InfinitySymbol />
//         <OrbitControls />
//       </Canvas>
//     </ErrorBoundary>
//   );
// }

// export default App;

// ----------------------------------------------------------------   Code for the SkyBlue tube logo  -------------------------------

// import React, { useRef, useMemo } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";

// class InfinityCurve extends THREE.Curve {
//   constructor(scale = 1) {
//     super();
//     this.scale = scale;
//   }

//   getPoint(t) {
//     if (t < 0 || t > 1) return new THREE.Vector3(0, 0, 0);

//     const angle = t * Math.PI * 2;
//     const x = Math.sin(angle) * this.scale;
//     const y = (Math.sin(2 * angle) * this.scale) / 2;
//     const z = 0;

//     return new THREE.Vector3(x, y, z);
//   }
// }

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, info) {
//     console.error("ErrorBoundary caught an error:", error, info);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <h2>
//           Something went wrong with the InfinitySymbol. Please try again later.
//         </h2>
//       );
//     }
//     return this.props.children;
//   }
// }

// function InfinitySymbol() {
//   const ref = useRef();
//   const path = new InfinityCurve(2);

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.x += 0.01;
//       ref.current.rotation.y += 0.01;
//     }
//   });

//   const tubeGeometry = useMemo(() => {
//     const path = new InfinityCurve(2);
//     return new THREE.TubeGeometry(path, 200, 0.3, 16, true);
//   }, []);

//   const tubeMaterial = new THREE.MeshStandardMaterial({
//     color: new THREE.Color("skyblue"),
//     metalness: 0.6,
//     roughness: 0.4,
//   });

//   if (!tubeGeometry) {
//     console.error("TubeGeometry is null.");
//     return null;
//   }

//   return <mesh ref={ref} geometry={tubeGeometry} material={tubeMaterial} />;
// }

// function App() {
//   return (
//     <ErrorBoundary>
//       <Canvas style={{ backgroundColor: "black", height: "100vh" }}>
//         <ambientLight intensity={0.5} />{" "}
//         <directionalLight
//           position={[0, 0, 2]}
//           intensity={2}
//           color={new THREE.Color("white")}
//           castShadow
//         />
//         <InfinitySymbol />
//         <OrbitControls />
//       </Canvas>
//     </ErrorBoundary>
//   );
// }

// export default App;

// -----------------------------------------------------------------------------------   noraml ring like structure

// import * as THREE from "three";
// import { Canvas } from "@react-three/fiber";
// import { useRef } from "react";
// import { OrbitControls } from "@react-three/drei";

// const InfiniteWavyRing = ({
//   innerRadius,
//   outerRadius,
//   waveHeight,
//   waveFrequency,
// }) => {
//   const meshRef = useRef();

//   // Create a RingGeometry
//   const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 128, 1);

//   const position = geometry.attributes.position;

//   for (let i = 0; i < position.count; i++) {
//     const x = position.getX(i);
//     const y = position.getY(i);

//     // Smooth transition at the X boundary for opposite bending
//     const waveFactor = Math.sin((x + y) * waveFrequency);

//     // Smooth transition using a cosine function to blend the wave
//     const smoothTransition = Math.cos(
//       ((Math.abs(x) % (2 * Math.PI)) / (2 * Math.PI)) * Math.PI
//     );

//     // Calculate the wave offset using smooth transition
//     let waveOffset = waveFactor * waveHeight * smoothTransition;

//     // Modify the Z-coordinate to create the wave effect
//     const z = waveOffset;

//     position.setZ(i, z);
//   }

//   // Mark position for update
//   position.needsUpdate = true;

//   return (
//     <mesh ref={meshRef} geometry={geometry}>
//       <meshStandardMaterial color="orange" side={THREE.DoubleSide} />
//     </mesh>
//   );
// };

// const Scene = () => {
//   return (
//     <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
//       {/* Lighting */}
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <OrbitControls />
//       {/* Infinite Wavy Ring */}
//       <InfiniteWavyRing
//         innerRadius={1.5}
//         outerRadius={2}
//         waveHeight={0.5}
//         waveFrequency={1}
//       />
//     </Canvas>
//   );
// };

// export default Scene;

// -------------------------------------------------Final Code  ---

// import * as THREE from "three";
// import { Canvas } from "@react-three/fiber";
// import { useRef, useMemo } from "react";
// import { OrbitControls } from "@react-three/drei";
// import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";

// const createCircularPath = (radius) => {
//   const curve = new THREE.Curve();
//   curve.getPoint = (t) => {
//     const angle = t * 1 * Math.PI;
//     const bendFactor = 0.1;
//     return new THREE.Vector3(
//       Math.cos(angle) * radius,
//       Math.sin(angle) * radius - bendFactor * radius * Math.sin(angle),
//       -bendFactor * radius * 2 * Math.cos(angle)
//     );
//   };
//   return curve;
// };

// const InfiniteWavyRing = ({
//   innerRadius,
//   outerRadius,
//   waveHeight,
//   waveFrequency,
// }) => {
//   const meshRef = useRef();

//   const path = useMemo(
//     () => createCircularPath((innerRadius + outerRadius) / 2),
//     [innerRadius, outerRadius]
//   );
//   const tubeRadius = (outerRadius - innerRadius) / 3.5; // Increased tube radius by 0.5

//   const geometry = new THREE.TubeGeometry(path, 128, tubeRadius, 64, false); // More radial segments for roundness
//   const position = geometry.attributes.position;

//   // Apply wave transformations to geometry 1
//   for (let i = 0; i < position.count; i++) {
//     const x = position.getX(i);
//     const y = position.getY(i);

//     const waveFactor = Math.sin((y + x / 2) * waveFrequency);
//     const smoothTransition = Math.cos(
//       ((Math.abs(y) % (1400 * Math.PI)) / (1400 * Math.PI)) * Math.PI
//     );
//     const waveOffset = waveFactor * waveHeight * smoothTransition;

//     position.setZ(i, position.getZ(i) + waveOffset);
//   }

//   position.needsUpdate = true;

//   return geometry;
// };

// const InfiniteMergedRing = ({
//   innerRadius,
//   outerRadius,
//   waveHeight,
//   waveFrequency,
// }) => {
//   const meshRef = useRef();

//   const path = useMemo(
//     () => createCircularPath((innerRadius + outerRadius) / 2),
//     [innerRadius, outerRadius]
//   );
//   const tubeRadius = (outerRadius - innerRadius) / 3.5; // Increased tube radius by 0.5

//   const geometry = new THREE.TubeGeometry(path, 128, tubeRadius, 64, false); // More radial segments for roundness
//   const position = geometry.attributes.position;

//   // Apply wave transformations to geometry 2
//   for (let i = 0; i < position.count; i++) {
//     const x = position.getX(i);
//     const y = position.getY(i);

//     const waveFactor = Math.sin((y + x / 2) * waveFrequency);
//     const smoothTransition = Math.cos(
//       ((Math.abs(y) % (1400 * Math.PI)) / (1400 * Math.PI)) * Math.PI
//     );
//     const waveOffset = waveFactor * waveHeight * smoothTransition;

//     position.setZ(i, position.getZ(i) + waveOffset);
//   }

//   position.needsUpdate = true;

//   // Rotate geometry 2 to align edges with geometry 1
//   geometry.rotateY(Math.PI); // Rotate 180 degrees (π radians) to align edges

//   return geometry;
// };

// const Scene = () => {
//   const parentGroupRef = useRef();

//   const mergedGeometry = useMemo(() => {
//     const innerRadius = 1;
//     const outerRadius = 1.5;
//     const waveHeight = 2;
//     const waveFrequency = 1;

//     // Create both geometries
//     const geometry1 = InfiniteWavyRing({
//       innerRadius,
//       outerRadius,
//       waveHeight,
//       waveFrequency,
//     });

//     const geometry2 = InfiniteMergedRing({
//       innerRadius,
//       outerRadius,
//       waveHeight,
//       waveFrequency,
//     });

//     // Merge the two geometries by adjacent edges
//     const merged = mergeGeometries([geometry1, geometry2], false);
//     // Recalculate vertex normals for smooth shading
//     merged.computeVertexNormals();
//     // Optionally, log the positions to check for overlap
//     // Adjust positions at the seam (this is just an example)
//     const positionArray = merged.attributes.position.array;
//     positionArray[0] = positionArray[0] - 0.001; // Adjust first vertex x-coordinate
//     positionArray[positionArray.length - 1] =
//       positionArray[positionArray.length - 1] + 0.001; // Adjust last vertex

//     return merged;
//   }, []);

//   const material = useMemo(() => {
//     return new THREE.MeshStandardMaterial({
//       color: new THREE.Color("BLACK"),
//       wireframe: false,
//     });
//   }, []);

//   return (
//     <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
//       <ambientLight intensity={.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} />
//       <OrbitControls />

//       {/* Mesh with merged geometry */}
//       <mesh
//         ref={parentGroupRef}
//         geometry={mergedGeometry}
//         material={material}
//       />
//     </Canvas>
//   );
// };

// export default Scene;




import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";

const createCircularPath = (radius) => {
  const curve = new THREE.Curve();
  curve.getPoint = (t) => {
    const angle = t * 1 * Math.PI;
    const bendFactor = 0.1;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius - bendFactor * radius * Math.sin(angle),
      -bendFactor * radius * 2 * Math.cos(angle)
    );
  };
  return curve;
};

const InfiniteWavyRing = ({
  innerRadius,
  outerRadius,
  waveHeight,
  waveFrequency,
}) => {
  const meshRef = useRef();

  const path = useMemo(
    () => createCircularPath((innerRadius + outerRadius) / 2),
    [innerRadius, outerRadius]
  );
  const tubeRadius = (outerRadius - innerRadius) / 4;

  const geometry = new THREE.TubeGeometry(path, 128, tubeRadius, 32, false);
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i + 1);
    const y = position.getY(i + 1);

    const waveFactor = Math.sin((y + x / 2) * waveFrequency);
    const smoothTransition = Math.cos(
      ((Math.abs(y) % (3800 * Math.PI)) / (3800 * Math.PI)) * Math.PI
    );
    const waveOffset = waveFactor * waveHeight * smoothTransition;

    position.setZ(i, position.getZ(i) + waveOffset);
  }

  position.needsUpdate = true;

  // // Add UV mapping
  // const uv = new Float32Array(position.count * 2); // UV coordinates
  // for (let i = 0; i < position.count; i++) {
  //   uv[i * 2] = position.getX(i) / (outerRadius * Math.PI * 2); // U
  //   uv[i * 2 + 1] = position.getY(i) / (tubeRadius * 2); // V
  // }
  // geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));

  // geometry.rotateY(Math.PI); // Rotate for alignment
  return geometry;

  // return geometry;
};

const InfiniteMergedRing = ({
  innerRadius,
  outerRadius,
  waveHeight,
  waveFrequency,
}) => {
  const meshRef = useRef();

  const path = useMemo(
    () => createCircularPath((innerRadius + outerRadius) / 2),
    [innerRadius, outerRadius]
  );
  const tubeRadius = (outerRadius - innerRadius) / 4;

  const geometry = new THREE.TubeGeometry(path, 128, tubeRadius, 64, false);
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i + 1);
    const y = position.getY(i + 1);

    const waveFactor = Math.sin((y + x / 2) * waveFrequency);
    const smoothTransition = Math.cos(
      ((Math.abs(y) % (3800 * Math.PI)) / (3800 * Math.PI)) * Math.PI
    );
    const waveOffset = waveFactor * waveHeight * smoothTransition;

    position.setZ(i, position.getZ(i) + waveOffset);
  }

  position.needsUpdate = true;

  // geometry.rotateY(Math.PI);

  // // Add UV mapping
  // const uv = new Float32Array(position.count * 2); // UV coordinates
  // for (let i = 0; i < position.count; i++) {
  //   uv[i * 2] = position.getX(i) / (outerRadius * Math.PI * 2); // U
  //   uv[i * 2 + 1] = position.getY(i) / (tubeRadius * 2); // V
  // }
  // geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));

  geometry.rotateY(Math.PI); // Rotate for alignment
  return geometry;

  // return geometry;
};

const Scene = () => {
  const parentGroupRef = useRef();
  const mergedGeometry = useMemo(() => {
    const innerRadius = 1;
    const outerRadius = 1.5;
    const waveHeight = 2;
    const waveFrequency = 1;
    const geometry1 = InfiniteWavyRing({
      innerRadius,
      outerRadius,
      waveHeight,
      waveFrequency,
    });
    const geometry2 = InfiniteMergedRing({
      innerRadius,
      outerRadius,
      waveHeight,
      waveFrequency,
    });
    const merged = mergeGeometries([geometry1, geometry2], false);
    merged.computeVertexNormals();
    return merged;
  }, []);

  const material = useMemo(() => {

        // const stripeTexture = new THREE.TextureLoader().load(
        //   "https://i.pinimg.com/736x/0f/aa/4b/0faa4be4e346ed333ccec10dae15b9a9.jpg"
        // ); // Add a stripe texture
        // // const stripeTexture  =  new THREE.Color("ORANGE")
        // stripeTexture.wrapS = THREE.RepeatWrapping;
        // stripeTexture.wrapT = THREE.RepeatWrapping;
        // stripeTexture.repeat.set(1, 1);


    return new THREE.MeshStandardMaterial({
      // map: stripeTexture,
      color: new THREE.Color("BLACK"),
      wireframe: false,
    });
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls />
      <mesh
        ref={parentGroupRef}
        geometry={mergedGeometry}
        material={material}
      />
    </Canvas>
  );
};

export default Scene;

