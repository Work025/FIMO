import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Float, useGLTF } from '@react-three/drei';

export default function TshirtModel({ color = "#ffffff" }) {
    const groupRef = useRef();
    const { scene } = useGLTF('/t-shirt.glb');
    const copiedScene = useMemo(() => scene.clone(), [scene]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
        }
    });

    // Update material color
    useEffect(() => {
        copiedScene.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.material.color.set(color);
                child.material.map = null; // Ensure no textures are applied
                child.material.needsUpdate = true;
            }
        });
    }, [copiedScene, color]);

    return (
        <group ref={groupRef} dispose={null}>
            <Center>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <primitive object={copiedScene} scale={7} />
                </Float>
            </Center>
        </group>
    );
}

useGLTF.preload('/t-shirt.glb');
