import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function TshirtModel({ color = "#ffffff" }) {
    const groupRef = useRef();
    const { scene } = useGLTF('/t-shirt.glb');
    const copiedScene = useMemo(() => scene.clone(), [scene]);

    // Track meshes to update their materials directly
    const meshesRef = useRef([]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
        }
    });

    useEffect(() => {
        const applyMaterial = (child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color(color),
                    metalness: 0.1,
                    roughness: 0.5,
                });
            }
        };
        copiedScene.traverse(applyMaterial);
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
