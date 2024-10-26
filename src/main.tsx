import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import SmoothScrollWrapper from './contexts/SmoothScrollWrapper.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SmoothScrollWrapper>
            <App />
        </SmoothScrollWrapper>
    </StrictMode>,
);
