import React, { useState } from 'react';
import NavMenu from './components/NavMenu';
import CodeIcon from '@mui/icons-material/Code';

const App: React.FC = () => {

  return (
    <div className="font-mono bg-dark-blue text-white min-w-[100vw] min-h-[100vh]">
      {/* Header Nav Bar */}
      <div className="flex justify-between items-between min-w-[100vw] font-bold min-h-[4vh] shadow-md">
        <div className="min-h-[100%] flex flex-row text-white text-lg py-1.5 px-4 m-2 gap-4 items-center rounded-md group hover:shadow-lg hover:cursor-pointer">
          <CodeIcon
            color="primary"
          />
          <p className="text-2xl">PATRICK MA</p>
        </div>
        <NavMenu />
      </div>

    </div>
  )
};

export default App;
