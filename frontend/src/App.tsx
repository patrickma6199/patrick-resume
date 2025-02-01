import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SpaceDemoPage from './pages/SpaceDemoPage';
import ThreeBodyProblemPage from './pages/ZinePage';
import AtlasAssistant from './pages/AtlasAssistant';

const App: React.FC = () => {
    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);

        return () => window.removeEventListener('resize', setVH);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/space" element={<SpaceDemoPage />} />
                <Route path="/three_body" element={<ThreeBodyProblemPage />} />
                <Route path="/assistant" element={<AtlasAssistant />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
