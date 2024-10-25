import React, {createContext, useContext} from 'react';
import {useScroll, MotionValue, useMotionValueEvent} from 'framer-motion';

interface ScrollContextProps {
    scrollYProgress: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextProps | null>(null);

export const ScrollProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const {scrollYProgress} = useScroll();

    useMotionValueEvent(scrollYProgress, 'change', latest => {
        console.log('scrollYProgress is: ' + latest);
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
