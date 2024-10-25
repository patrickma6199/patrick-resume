import React from 'react';
import Profile from './sections/Profile';
import Work from './sections/Work';
import Projects from './sections/Projects';
import Awards from './sections/Awards';
import HomeLogo from './misc/HomeLogo';
import CircuitAnimation from './misc/CircuitAnimation';

const MainContent: React.FC = () => {
    return (
        <div className="relative flex flex-col w-full mt-4 items-center px-0 gap-8 box-border lg:px-40">
            <div
                id="landing"
                className="w-full min-h-[100vh] flex justify-center items-center box-border"
            >
                <HomeLogo />
            </div>
            <CircuitAnimation />
            <div
                id="profile"
                className="w-full min-h-[100vh] flex justify-center items-center box-border"
            >
                <Profile />
            </div>
            <div
                id="projects"
                className="w-full min-h-[100vh] flex justify-center items-center box-border"
            >
                <Projects />
            </div>
            <div
                id="awards"
                className="w-full min-h-[100vh] flex justify-center items-center box-border"
            >
                <Awards />
            </div>
            <div
                id="work"
                className="w-full min-h-[100vh] flex justify-center items-center box-border"
            >
                <Work />
            </div>
        </div>
    );
};

export default MainContent;
