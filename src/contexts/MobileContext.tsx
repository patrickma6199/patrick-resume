import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';

// Define the type for the context
interface MobileContextType {
    isMobile: boolean;
}

// Create the context with a default value (false for non-mobile)
const MobileContext = createContext<MobileContextType | undefined>(undefined);

// Define the props for the provider component
interface MobileProviderProps {
    children: ReactNode;
}

// Provider component
export const MobileProvider: React.FC<MobileProviderProps> = ({children}) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <MobileContext.Provider value={{isMobile}}>
            {children}
        </MobileContext.Provider>
    );
};

// Custom hook to use the mobile state
export const useIsMobile = (): boolean => {
    const context = useContext(MobileContext);
    if (context === undefined) {
        throw new Error('useIsMobile must be used within a MobileProvider');
    }
    return context.isMobile;
};
