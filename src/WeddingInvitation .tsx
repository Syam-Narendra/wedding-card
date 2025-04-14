import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import './WeddingInvitation.css';

// Interface for Diya props
interface DiyaProps {
  position: [number, number, number];
  onClick: (message: string) => void;
}

// Diya component (interactive oil lamp with flickering flame)
function Diya({ position, onClick }: DiyaProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [lit, setLit] = useState(false);

  // Flickering animation for the flame
  useFrame(() => {
    if (lit && lightRef.current) {
      lightRef.current.intensity = 0.5 + Math.sin(Date.now() * 0.005) * 0.2;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={() => {
        setLit(!lit);
        onClick(lit ? 'Diya extinguished' : 'Diya lit! Blessings to the couple!');
      }}
    >
      {/* Diya base */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Flame (point light) */}
      {lit && (
        <pointLight
          ref={lightRef}
          color="#FF4500"
          intensity={0.5}
          distance={5}
          position={[0, 0.3, 0]}
        />
      )}
    </group>
  );
}

// Rangoli component (rotating pattern with procedural texture)
function Rangoli() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.z = clock.getElapsedTime() * 0.1;
    }
  });

  // Procedural texture for rangoli
  const texture = new THREE.CanvasTexture(
    (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d')!;
      const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, '#FF9933');
      gradient.addColorStop(0.5, '#C21807');
      gradient.addColorStop(1, '#138808');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 256);
      return canvas;
    })()
  );

  return (
    <mesh ref={mesh} position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.5, 0.05, 16, 100]} />
      <meshStandardMaterial map={texture} roughness={0.5} />
    </mesh>
  );
}

// Falling Petals component (simple particle system)
function Petals() {
  const count = 50;
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  // Initialize positions and velocities
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10; // x
    positions[i * 3 + 1] = Math.random() * 10; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    velocities[i * 3] = (Math.random() - 0.5) * 0.02; // vx
    velocities[i * 3 + 1] = -Math.random() * 0.05; // vy
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02; // vz
  }

  const points = useRef<THREE.Points>(null);

  useFrame(() => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset if petal falls below the ground
        if (positions[i * 3 + 1] < -2) {
          positions[i * 3 + 1] = 10;
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
                  attach="attributes-position"
                  array={positions}
                  itemSize={3}
                  count={count} args={[]}        />
      </bufferGeometry>
      <pointsMaterial color="#FF4040" size={0.1} />
    </points>
  );
}

// Mandap component (wedding stage with floral decor)
function Mandap() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Glow effect on hover
  useEffect(() => {
    if (groupRef.current) {
      const material = (groupRef.current.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
      material.emissive.set(hovered ? '#FFD700' : '#000000');
      material.emissiveIntensity = hovered ? 0.5 : 0;
    }
  }, [hovered]);

  return (
    <group
      ref={groupRef}
      position={[0, -1, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Platform */}
      <mesh>
        <boxGeometry args={[5, 0.5, 5]} />
        <meshStandardMaterial color="#8B0000" roughness={0.3} />
      </mesh>
      {/* Pillars */}
      {[-2, 2].map((x) =>
        [-2, 2].map((z) => (
          <group key={`${x}-${z}`} position={[x, 1.5, z]}>
            <mesh>
              <cylinderGeometry args={[0.2, 0.2, 3, 32]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
            {/* Floral garland on pillar */}
            <mesh position={[0, 1, 0]}>
              <torusGeometry args={[0.3, 0.05, 16, 32]} />
              <meshStandardMaterial color="#FF4040" />
            </mesh>
          </group>
        ))
      )}
      {/* Roof */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[5.5, 0.3, 5.5]} />
        <meshStandardMaterial color="#C21807" />
      </mesh>
    </group>
  );
}

// Om Symbol component
function OmSymbol() {
  return (
    <Text
      position={[0, 4, 0]}
      fontSize={0.5}
      color="#FFD700"
      anchorX="center"
      anchorY="middle"
      font="https://fonts.googleapis.com/css2?family=Devanagari&display=swap"
    >
      ॐ
    </Text>
  );
}

// Interface for Scene props
interface SceneProps {
  setMessage: (message: string) => void;
}

// Main Scene component
function Scene({ setMessage }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Mandap />
      <Rangoli />
      <Petals />
      <Diya
        position={[-1, -0.9, 1]}
        onClick={(msg) => setMessage(msg)}
      />
      <Diya
        position={[1, -0.9, -1]}
        onClick={(msg) => setMessage(msg)}
      />
      <OmSymbol />
      <Stars radius={100} depth={50} count={5000} factor={4} />
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.googleapis.com/css2?family=Playfair+Display"
      >
        Anand & Priya
      </Text>
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        rotateSpeed={0.5}
      />
    </>
  );
}

// Overlay component with RSVP form
function Overlay() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('Yes');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Placeholder for backend submission
    console.log('RSVP:', { name, attending });
  };

  return (
    <div className="overlay">
      <h1>Anand weds Priya</h1>
      <p>
        Join us to celebrate our union<br />
        Date: June 15, 2025<br />
        Time: 6:00 PM<br />
        Venue: Lotus Gardens, Jaipur<br />
      </p>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
          <select
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
            className="select"
          >
            <option value="Yes">Yes, I'll attend</option>
            <option value="No">No, I can't attend</option>
          </select>
          <button type="submit" className="button">RSVP</button>
        </form>
      ) : (
        <p className="thank-you">Thank you for your RSVP, {name}!</p>
      )}
    </div>
  );
}

// Main App component
export default function App() {
  const [message, setMessage] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Play ambient shehnai music
  useEffect(() => {
    const audio = new Audio(
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Placeholder URL
    );
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => console.log('Audio play failed'));
    return () => audio.pause();
  }, []);

  return (
    <div className="container">
      <Suspense fallback={<div className="loader">Loading...</div>}>
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }} onCreated={() => setIsLoaded(true)}>
          <Scene setMessage={setMessage} />
        </Canvas>
      </Suspense>
      {isLoaded && <Overlay />}
      {message && <div className="message">{message}</div>}
    </div>
  );
}