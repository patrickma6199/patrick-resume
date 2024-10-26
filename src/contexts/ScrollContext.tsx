import React, {createContext, useContext} from 'react';
import {useScroll, MotionValue, useMotionValueEvent} from 'framer-motion';

interface ScrollContextProps {
    scrollYProgress: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextProps | null>(null);

export const ScrollProvider: React.FC<{
    parentRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}> = ({parentRef, children}) => {
    const {scrollYProgress} = useScroll({
        target: parentRef,
        offset: ['start start', 'end 100vh'],
    });

    return (
        <ScrollContext.Provider value={{scrollYProgress}}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScrollContext = () => {
    const context = useContext(ScrollContext);
    if (!context)
        throw new Error('useScrollContext must be used within ScrollProvider');
    return context;
};
