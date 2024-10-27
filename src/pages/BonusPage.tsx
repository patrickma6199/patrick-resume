import React from 'react';
import CodeIcon from '@mui/icons-material/Code';
import NavMenu from '../components/misc/NavMenu';
import {Canvas} from '@react-three/fiber';
import {CameraControls, PerspectiveCamera, useHelper} from '@react-three/drei';
import {PointLightHelper, PointLight} from 'three';

const BonusPage: React.FC = () => {
    const lightRef = React.useRef<PointLight>(null!);

    return (
        <div className="font-mono bg-light-blue h-screen relative">
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
                <NavMenu />
            </div>

            {/* Three.js Animation */}
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <CameraControls
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 1.6}
                />
                <directionalLight intensity={0.9} position={[0, 0, 5]} />
                <ambientLight intensity={Math.PI / 2} />
                <mesh>
                    <sphereGeometry />
                    <meshStandardMaterial color="hotpink" />
                </mesh>
            </Canvas>
        </div>
    );
};

export default BonusPage;
