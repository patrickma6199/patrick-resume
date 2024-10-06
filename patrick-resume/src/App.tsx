import React from 'react';
import NavMenu from './components/NavMenu';
import CodeIcon from '@mui/icons-material/Code';
import MainContent from './components/MainContent';

const App: React.FC = () => {

  return (
    <div className="font-mono bg-gradient-to-br from-darker-blue to-light-blue text-white w-full h-screen flex flex-col relative">
      {/* Header Nav Bar */}
      <div className="flex justify-between items-center w-full font-bold min-h-[4vh] shadow-2xl fixed top-0 left-0 z-10 bg-gradient-to-tr from-dark-blue via-light-blue to-light-purple">
        <div className="min-h-[100%] flex flex-row text-white text-lg py-1.5 px-4 m-2 gap-4 items-center rounded-md group hover:shadow-lg cursor-pointer"
          onClick={() => { window.location.hash = '#profile' }}>
          <CodeIcon color="primary" />
          <p className="text-2xl">PATRICK MA</p>
        </div>
        <NavMenu />
      </div>

      {/* Main Content */}
      <div className="flex-1 mt-[4vh] overflow-y-auto no-scrollbar">
        <MainContent />
      </div>
    </div>
  )
};

export default App;