import React, {useEffect} from 'react';
import Profile from './sections/Profile';
import Work from './sections/Work';
import Projects from './sections/Projects';
import Awards from './sections/Awards';
import HomeLogo from './HomeLogo';

const MainContent: React.FC = () => {
    //TODO: remove
    //const mainContentRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scroll();
    }, []);

    return (
        <div className="flex flex-col w-full mt-4 items-center overflow-y-auto overflow-x-hidden px-0 gap-8 box-border lg:px-40">
            <div
                id="landing"
                className="w-full min-h-[100vh] flex justify-center items-center box-border"
            >
                <HomeLogo />
            </div>
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
