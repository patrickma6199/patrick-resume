import React from 'react';
import NavMenu, {Page} from '../components/misc/NavMenu';
import CodeIcon from '@mui/icons-material/Code';
import AssistantMainContent from '../components/AssistantMainContent';
import {ScrollProvider} from '../contexts/ScrollContext';

const AtlasAssistant: React.FC = () => {
    const mainContentRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="font-mono bg-gradient-to-br from-darker-blue to-light-blue text-white w-full min-h-min overflow-x-hidden overflow-y-hidden flex flex-col relative">
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
                <NavMenu page={Page.ASSISTANT} />
            </div>

            {/* Main Content */}
            <div
                ref={mainContentRef}
                className="flex-1 my-[6vh] overflow-y-auto no-scrollbar"
            >
                <ScrollProvider parentRef={mainContentRef}>
                    <AssistantMainContent />
                </ScrollProvider>
            </div>
        </div>
    );
};

export default AtlasAssistant;
