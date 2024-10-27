import React, {Fragment, useEffect, useRef, useState} from 'react';
import CodeIcon from '@mui/icons-material/Code';
import NavMenu from '../components/misc/NavMenu';
import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import {
    AdaptiveDpr,
    CameraControls,
    PerspectiveCamera,
    Line,
    OrbitControls,
} from '@react-three/drei';
import {TextureLoader, Texture, Mesh, BackSide, Vector3} from 'three';
import Stats from 'stats.js';
import RenderMenu from '../components/misc/RenderMenu';

// General ObjectProps
type ObjectProps = {
    position: [number, number, number];
    color?: string;
    texture?: string;
    normalMap?: string;
    size: number;
};

interface Planet {
    position?: [number, number, number];
    color?: string;
    texture?: string;
    normalMap?: string;
    size: number;
}

interface PlanetMetadata {
    texture: string;
    size: number;
    rotationSpeed: number;
    distance: number;
    orbitSpeed: number;
}

const planetsMetadata: PlanetMetadata[] = [
    {
        texture: '/assets3D/textures/2k_mercury.jpg',
        size: 0.25,
        rotationSpeed: 2,
        distance: 10,
        orbitSpeed: 4.13,
    },
    {
        texture: '/assets3D/textures/2k_venus.jpg',
        size: 0.5,
        rotationSpeed: 1.5,
        distance: 15,
        orbitSpeed: 1.62,
    },
    {
        texture: '/assets3D/textures/2k_earth.jpg',
        size: 0.55,
        rotationSpeed: 1,
        distance: 20,
        orbitSpeed: 1,
    },
    {
        texture: '/assets3D/textures/2k_mars.jpg',
        size: 0.455,
        rotationSpeed: 1.5,
        distance: 25,
        orbitSpeed: 0.53,
    },
    {
        texture: '/assets3D/textures/2k_jupiter.jpg',
        size: 1.5,
        rotationSpeed: 0.5,
        distance: 30,
        orbitSpeed: 0.084,
    },
    {
        texture: '/assets3D/textures/2k_saturn.jpg',
        size: 1.2,
        rotationSpeed: 0.75,
        distance: 35,
        orbitSpeed: 0.037,
    },
    {
        texture: '/assets3D/textures/2k_uranus.jpg',
        size: 1,
        rotationSpeed: 0.75,
        distance: 40,
        orbitSpeed: 0.012,
    },
    {
        texture: '/assets3D/textures/2k_neptune.jpg',
        size: 1,
        rotationSpeed: 0.75,
        distance: 45,
        orbitSpeed: 0.006,
    },
];

// For Stars
type StarProps = ObjectProps & {
    intensity: number;
};

const Star: React.FC<StarProps> = ({
    position,
    color,
    size,
    intensity,
    texture,
}) => {
    const starTexture: Texture = useLoader(
        TextureLoader,
        texture || '/assets3D/textures/2k_sun.jpg',
    );

    return (
        <>
            <pointLight
                position={position}
                color={color}
                intensity={intensity}
                decay={0.1}
            />
            <mesh position={position}>
                <sphereGeometry args={[size, 128, 128]} />
                <meshPhongMaterial
                    emissiveMap={starTexture}
                    color={color || undefined}
                    emissive={'#ffaa00'}
                    emissiveIntensity={10}
                />
            </mesh>
        </>
    );
};

// For Planets

type PlanetProps = ObjectProps & {
    planetRef: React.RefObject<Mesh>;
};

const Planet: React.FC<PlanetProps> = ({
    position,
    color,
    size,
    texture,
    normalMap,
    planetRef,
}) => {
    const planetTexture: Texture = useLoader(
        TextureLoader,
        texture || '/assets3D/textures/2k_earth.jpg',
    );
    const planetNormalMap: Texture = useLoader(
        TextureLoader,
        normalMap || '/assets3D/normalMaps/2k_earth_normal_map.png',
    );

    return (
        <mesh ref={planetRef} position={position}>
            <sphereGeometry args={[size, 128, 128]} />
            <meshPhongMaterial
                color={color || undefined}
                normalMap={planetNormalMap}
                map={planetTexture}
            />
        </mesh>
    );
};

// For Whole Scene
type SceneProps = {
    timeRate: number;
};

const Scene: React.FC<SceneProps> = ({timeRate}) => {
    const planetRefs = useRef<(React.RefObject<Mesh> | null)[]>([]);

    const planets: React.JSX.Element[] = [];

    for (let i = 0; i < planetsMetadata.length; i++) {
        const planetRef = React.createRef<Mesh>();
        planetRefs.current[i] = planetRef;

        planets.push(
            <Fragment key={i}>
                <Planet
                    key={i}
                    position={[
                        Math.cos(i) * planetsMetadata[i].distance,
                        0,
                        Math.sin(i) * planetsMetadata[i].distance,
                    ]}
                    planetRef={planetRef}
                    normalMap={
                        i === 2
                            ? '/assets3D/normalMaps/2k_earth_normal_map.png'
                            : undefined
                    }
                    size={planetsMetadata[i].size}
                    texture={planetsMetadata[i].texture}
                />
            </Fragment>,
        );
    }

    // Rotate the planets and manage trail visibility
    useFrame((state, delta) => {
        planetRefs.current.forEach((planetRef, index) => {
            if (planetRef && planetRef.current) {
                planetRef.current.rotation.y +=
                    delta * planetsMetadata[index].rotationSpeed;

                // Update position to make it orbit around the sun
                const distance = planetsMetadata[index].distance;
                const elapsedTime = state.clock.getElapsedTime();
                const angle =
                    elapsedTime *
                    planetsMetadata[index].orbitSpeed *
                    2 *
                    Math.PI *
                    timeRate;

                planetRef.current.position.x = Math.cos(angle) * distance;
                planetRef.current.position.z = Math.sin(angle) * distance;
            }
        });
    });

    return (
        <>
            <Star position={[0, 0, 0]} size={2} intensity={10} />
            <ambientLight intensity={0.1} />
            {planets}
        </>
    );
};

// For Orbits
const Orbit: React.FC<{distance: number; visible: boolean}> = ({
    distance,
    visible,
}) => {
    const numPoints = 200;
    const points = Array.from({length: numPoints}, (_, i) => {
        const angle = (i / numPoints) * 2 * Math.PI;
        return new Vector3(
            Math.cos(angle) * distance,
            0,
            Math.sin(angle) * distance,
        );
    });

    return visible ? (
        <Line
            points={points}
            color="white"
            lineWidth={0.5}
            dashed
            dashSize={0.1} // length of each dash
            gapSize={0.1} // gap between dashes
        />
    ) : null;
};

// For Space Background
const SpaceBackground: React.FC = () => {
    const spaceEnvMap: Texture = useLoader(
        TextureLoader,
        '/assets3D/environmentMaps/2k_stars_milky_way.jpg',
    );

    return (
        <mesh>
            <sphereGeometry args={[200, 32, 32]} /> {/* Large sphere */}
            <meshBasicMaterial
                map={spaceEnvMap}
                side={BackSide} // Render the inside of the sphere
            />
        </mesh>
    );
};

const BonusPage: React.FC = () => {
    const [timeRate, setTimeRate] = useState<number>(0.1);
    const [showOrbits, setShowOrbits] = useState<boolean>(false);

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

    const resetTimeRate = () => {
        setTimeRate(0.1);
    };

    return (
        <div className="font-mono bg-darker-blue h-screen relative">
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
                <PerspectiveCamera makeDefault position={[0, 50, 50]} />
                <OrbitControls
                    makeDefault
                    enableZoom={true} // Allow zooming
                    minDistance={5} // Minimum zoom distance
                    maxDistance={100} // Maximum zoom distance
                    enablePan={false}
                    enableRotate={true}
                    enableDamping={true} // Smooth movement
                    dampingFactor={0.25}
                    rotateSpeed={1}
                />
                <SpaceBackground />
                <Scene timeRate={timeRate} />
                {planetsMetadata.map((planet, index) => (
                    <Orbit
                        key={index}
                        distance={planet.distance}
                        visible={showOrbits}
                    />
                ))}
            </Canvas>
            <RenderMenu
                timeRate={{
                    value: timeRate,
                    setValue: setTimeRate,
                    resetValue: resetTimeRate,
                }}
                showOrbits={{value: showOrbits, setValue: setShowOrbits}}
            />
        </div>
    );
};

export default BonusPage;
