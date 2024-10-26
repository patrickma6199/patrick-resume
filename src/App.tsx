import React from 'react';
import NavMenu from './components/misc/NavMenu';
import CodeIcon from '@mui/icons-material/Code';
import MainContent from './components/MainContent';
import {ScrollProvider} from './contexts/ScrollContext';
import WaveAnimation from './components/misc/animatedComponents/WaveAnimation';

const App: React.FC = () => {
    const mainContentRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="font-mono bg-gradient-to-br from-darker-blue to-light-blue text-white w-full min-h-min md:h-[310vh] overflow-x-hidden overflow-y-hidden flex flex-col relative">
            {/* Header Nav Bar */}
            <div className="flex justify-between items-center w-full font-bold h-[6vh] fixed top-0 left-0 z-10 bg-transparent">
                <div
                    className="h-full flex flex-row text-white text-lg py-1.5 px-4 m-2 gap-4 items-center rounded-md group hover:shadow-lg cursor-pointer box-border"
                    onClick={() => {
                        const element = document.getElementById('landing');
                        if (element) {
                            element.scrollIntoView({behavior: 'smooth'});
                        }
                        window.history.pushState(null, '', `#landing`);
                    }}
                >
                    <CodeIcon className="text-lighter-blue" />
                </div>
                <NavMenu />
            </div>

            {/* Main Content */}
            <div
                ref={mainContentRef}
                className="flex-1 mt-[6vh] overflow-y-auto no-scrollbar"
            >
                <ScrollProvider parentRef={mainContentRef}>
                    <MainContent />
                </ScrollProvider>
            </div>
            <WaveAnimation />
        </div>
    );
};

export default App;
