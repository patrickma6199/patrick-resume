import React, {Fragment, useEffect, useMemo, useRef, useState} from 'react';
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
} from '@react-three/drei';
import {
    TextureLoader,
    Texture,
    Mesh,
    BackSide,
    Vector3,
    RepeatWrapping,
    PointLight,
    PointLightHelper,
} from 'three';
import Stats from 'stats.js';
import RenderMenu from '../components/misc/RenderMenu';
import {Baseball} from '../assets/models/Baseball/Draco_baseball';

// For Rocky Floor
const RockyFloor: React.FC = () => {
    const textures = useTexture({
        normalMap: '/assets3D/environmentMaps/rockyFloor/nor_gl_4k.jpg',
        aoMap: '/assets3D/environmentMaps/rockyFloor/arm_4k.jpg',
        displacementMap: '/assets3D/environmentMaps/rockyFloor/disp_4k.jpg',
        map: '/assets3D/environmentMaps/rockyFloor/diff_4k.jpg',
        roughnessMap: '/assets3D/environmentMaps/rockyFloor/arm_4k.jpg',
        metalnessMap: '/assets3D/environmentMaps/rockyFloor/arm_4k.jpg',
    });

    // Apply RepeatWrapping and set repeat values for each texture
    useMemo(() => {
        Object.values(textures).forEach(texture => {
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
            texture.repeat.set(2, 2); // Adjust this for the desired tiling effect
        });
    }, [textures]);

    return (
        <>
            <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[100, 100, 256, 256]} />
                <meshStandardMaterial {...textures} displacementScale={2} />
            </mesh>

            {/* <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2} position-y={1}>
                <planeGeometry args={[100, 100, 256, 256]} />
                <meshStandardMaterial
                    normalMap={textures.normalMap}
                    aoMap={textures.aoMap}
                    displacementMap={textures.displacementMap}
                    wireframe color='white' />
            </mesh> */}
        </>
    );
};

// For Lights
const Lights: React.FC = () => {
    const lightRef = useRef<PointLight>(null!);

    useHelper(lightRef, PointLightHelper, 1, 'white');
    return (
        <>
            <pointLight
                ref={lightRef}
                position={[-50, 50, 50]}
                intensity={25}
                color={'#ffffff'}
                decay={0.4}
            />
            <ambientLight intensity={1} color={'#ffffff'} />
        </>
    );
};

// For Sky Background
const SkyBackground: React.FC = () => {
    const spaceEnvMap: Texture = useLoader(
        TextureLoader,
        '/assets3D/environmentMaps/quarry_01_puresky.jpg',
    );

    return (
        <mesh rotation-y={Math.PI} position={[0, 0, 0]}>
            <sphereGeometry args={[1000, 32, 32]} /> {/* Large sphere */}
            <meshPhongMaterial
                map={spaceEnvMap}
                side={BackSide} // Render the inside of the sphere
            />
        </mesh>
    );
};

// For Scene
const Scene: React.FC = () => {
    return (
        <>
            <RockyFloor />
            {/* <gridHelper args={[100, 100]} /> */}
        </>
    );
};

const ThreeBodyProblemPage: React.FC = () => {
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
        <div className="font-mono bg-black h-[calc(var(--vh)*100)] relative">
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
                <PerspectiveCamera makeDefault position={[2, 10, 2]} />
                <OrbitControls
                    makeDefault
                    enableZoom={true} // Allow zooming
                    minDistance={0.1} // Minimum zoom distance
                    maxDistance={0.3} // Maximum zoom distance
                    enablePan={true}
                    enableDamping={true} // Smooth movement
                    enableRotate={true}
                    dampingFactor={0.25}
                    rotateSpeed={0.5}
                    target={new Vector3(0, 10, 0)}
                />
                <Scene />
                <Lights />
                <SkyBackground />
                <Baseball position={[0, 10, 0]} />
            </Canvas>
        </div>
    );
};

export default ThreeBodyProblemPage;
