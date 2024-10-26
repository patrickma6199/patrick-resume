import React from 'react';
import Profile from './sections/Profile';
import Work from './sections/Work';
import Projects from './sections/Projects';
import Awards from './sections/Awards';
import HomeLogo from './misc/animatedComponents/HomeLogo';
import CircuitAnimation from './misc/animatedComponents/CircuitAnimation';
import WaveAnimation from './misc/animatedComponents/WaveAnimation';

const MainContent: React.FC = () => {
    return (
        <div className="relative flex flex-col w-full items-center px-0 gap-8 box-border lg:px-40">
            <div
                id="landing"
                className="w-full min-h-[90vh] flex justify-center items-center box-border z-1"
            >
                <HomeLogo />
            </div>
            <CircuitAnimation />
            <div
                id="profile"
                className="w-full min-h-[100vh] flex justify-center items-center box-border z-1"
            >
                <Profile />
            </div>
            <div
                id="projects"
                className="w-full min-h-[100vh] flex justify-center items-center box-border z-1"
            >
                <Projects />
            </div>
            {/* <div
                id="awards"
                className="w-full min-h-[100vh] flex justify-center items-center box-border z-1"
            >
                <Awards />
            </div>
            <div
                id="work"
                className="w-full min-h-[100vh] flex justify-center items-center box-border z-1"
            >
                <Work />
            </div> */}
        </div>
    );
};

export default MainContent;
