import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'regenerator-runtime/runtime';
import SmoothScrollWrapper from './contexts/SmoothScrollWrapper.tsx';
import {MobileProvider} from './contexts/MobileContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MobileProvider>
      <SmoothScrollWrapper>
        <App />
      </SmoothScrollWrapper>
    </MobileProvider>
  </StrictMode>,
);
