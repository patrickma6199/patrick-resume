import React, { useEffect } from 'react';
import Profile from './sections/Profile';
import Work from './sections/Work';
import Projects from './sections/Projects';
import Awards from './sections/Awards';


const MainContent: React.FC = () => {

    useEffect(() => {
        scroll();
    }, []);

    return (
        <div className="flex flex-col min-w-[100vw] mt-4 items-center overflow-auto px-40 gap-8">
            <div id="profile" className="min-w-[100%] min-h-[100%]">
                <Profile />
            </div>
            <div id="projects" className="min-w-[100%]">
                <Projects />
            </div>
            <div id="awards" className="min-w-[100%]">
                <Awards />
            </div>
            <div id="work" className="min-w-[100%]">
                <Work />
            </div>
        </div>
    );
}

export default MainContent;