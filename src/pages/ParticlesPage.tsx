import React, {useEffect, useMemo, useRef, useState} from 'react';
import CodeIcon from '@mui/icons-material/Code';
import NavMenu from '../components/misc/NavMenu';
import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import {
    AdaptiveDpr,
    CameraControls,
    PerspectiveCamera,
    Line,
    OrbitControls,
    useTexture,
    useHelper,
    Loader,
    Grid,
    ContactShadows,
    Points,
} from '@react-three/drei';
import * as THREE from 'three';
import Stats from 'stats.js';
import {Bloom, EffectComposer, Vignette} from '@react-three/postprocessing';
import {X} from '@mui/icons-material';
import {useControls} from 'leva';

// For Lights
const Lights: React.FC = () => {
    const lightRef = useRef<THREE.PointLight>(null!);

    useHelper(lightRef, THREE.PointLightHelper, 1, 'white');
    return (
        <>
            <pointLight
                ref={lightRef}
                position={[-50, 50, 50]}
                intensity={25}
                color={'#ffffff'}
                decay={0.4}
            />
            <pointLight
                ref={lightRef}
                position={[50, 50, 50]}
                intensity={25}
                color={'#00FFFF'}
                decay={0.4}
            />
            <ambientLight intensity={0.2} color={'#ffffff'} />
        </>
    );
};

// For Particles
interface ParticleSystemProps {
    xModifier: number;
    zModifier: number;
    amplitude: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
    xModifier,
    zModifier,
    amplitude,
}) => {
    const texture = useLoader(
        THREE.TextureLoader,
        '/assets3D/textures/circle.png',
    );
    const numParticles = 40000;

    const positions = useMemo(() => {
        const posArray = new Float32Array(numParticles * 3);
        for (let i = 0; i < Math.sqrt(numParticles); i++) {
            for (let j = 0; j < Math.sqrt(numParticles); j++) {
                posArray[(i * Math.sqrt(numParticles) + j) * 3] = i / 5;
                posArray[(i * Math.sqrt(numParticles) + j) * 3 + 1] = 0;
                posArray[(i * Math.sqrt(numParticles) + j) * 3 + 2] = j / 5;
            }
        }
        return posArray;
    }, [numParticles]);

    const colors = useMemo(() => {
        const colorArray = new Float32Array(numParticles * 3);
        for (let i = 0; i < numParticles; i++) {
            // Generate random bright colors
            colorArray[i * 3] = Math.random() * 0.5 + 0.6;
            colorArray[i * 3 + 1] = Math.random() * 0.5 + 0.6;
            colorArray[i * 3 + 2] = Math.random() * 0.5 + 0.6;
        }
        return colorArray;
    }, [numParticles]);

    const particleRef = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (particleRef.current) {
            const positionsArray = particleRef.current.geometry.attributes
                .position.array as Float32Array;
            const elapsedTime = state.clock.getElapsedTime();
            for (let i = 0; i < positionsArray.length; i += 3) {
                // positionsArray[i] = Math.sin((positionsArray[i + 1] + positionsArray[i+2] + elapsedTime)) * 2;
                positionsArray[i + 1] =
                    Math.sin(
                        positionsArray[i] * xModifier +
                            positionsArray[i + 2] * zModifier +
                            elapsedTime,
                    ) * amplitude;
                // positionsArray[i + 2] = Math.sin((positionsArray[i] + positionsArray[i + 1] + elapsedTime)) * 2;
            }
            particleRef.current.geometry.attributes.position.needsUpdate = true; // inform Three.js of changes
        }
    });

    return (
        <points ref={particleRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={numParticles}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={colors}
                    count={numParticles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                map={texture}
                size={0.25}
                sizeAttenuation
                transparent={true}
                alphaTest={0.5}
                vertexColors={true} // Enable vertex colors
            />
        </points>
    );
};

// For Scene
const Scene: React.FC = () => {
    const {xModifier, zModifier, amplitude} = useControls({
        xModifier: 1,
        zModifier: 1,
        amplitude: 0.5,
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[10, 10, 10]} far={500} />
            <CameraControls makeDefault />
            {/* <Lights /> */}
            <ContactShadows scale={[16, 16]} opacity={1} />
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.9}
                    luminanceSmoothing={0.025}
                    intensity={0.2}
                />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
            <ParticleSystem
                xModifier={xModifier}
                zModifier={zModifier}
                amplitude={amplitude}
            />
        </>
    );
};

const ParticlesPage: React.FC = () => {
    // for hardware stats monitoring
    useEffect(() => {
        const stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: memory
        document.body.appendChild(stats.dom);
        stats.dom.style.position = 'absolute';
        stats.dom.style.left = '0px';
        stats.dom.style.bottom = '0px';
        stats.dom.style.top = 'unset';
        stats.dom.style.zIndex = '1000';

        function animate() {
            stats.update();
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        return () => {
            document.body.removeChild(stats.dom);
        };
    }, []);

    return (
        <div className="font-mono bg-gradient-to-tr from-darker-blue to-light-blue h-[calc(var(--vh)*100)] relative">
            {/* Header Nav Bar */}
            <div className="flex justify-between items-center w-full font-bold h-[6vh] fixed top-0 left-0 bg-transparent z-50">
                <div
                    className="h-full flex flex-row text-white text-lg py-1.5 px-4 m-2 gap-4 items-center rounded-md group hover:shadow-lg cursor-pointer box-border"
                    onClick={() => {
                        window.location.href = '/';
                    }}
                >
                    <CodeIcon className="text-lighter-blue" />
                </div>
                <NavMenu atHomePage={false} />
            </div>

            {/* Three.js Animation */}
            <Canvas>
                <AdaptiveDpr pixelated />
                <Scene />
                {/* <Grid args={[100, 100]} /> */}
            </Canvas>
            <Loader />
        </div>
    );
};

export default ParticlesPage;
